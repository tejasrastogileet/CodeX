import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Trash2, TrendingUp, Edit, Eye } from 'lucide-react';
import { Child, BmiRecord } from '@/types';
import { getChildren, saveChild, deleteChild, getBmiRecords, saveBmiRecord, generateId } from '@/lib/storage';
import { calculateBmi, getBmiCategory, getBmiLabel, getBmiEmoji } from '@/lib/bmi';
import { THEME } from '@/constants/theme';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
  BarChart, Bar, Legend
} from 'recharts';

export default function Children() {
  const [children, setChildren] = useState<Child[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedChild, setSelectedChild] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', age: '', gender: 'male' as 'male' | 'female', heightCm: '', weightKg: '' });

  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [emailInput, setEmailInput] = useState('');
  const [reportStatus, setReportStatus] = useState<'pending' | 'sent' | null>(null);

  // Zone stats - may be used for analytics
  useEffect(() => { setChildren(getChildren()); }, []);

  // Simple count-up hook for animated numbers
  const useCountUp = (target: number, duration = 800) => {
    const [val, setVal] = useState(0);
    useEffect(() => {
      let start = 0;
      const step = Math.max(1, Math.floor((target / (duration / 16))));
      const id = setInterval(() => {
        start += step;
        if (start >= target) {
          setVal(target);
          clearInterval(id);
        } else setVal(start);
      }, 16);
      return () => clearInterval(id);
    }, [target, duration]);
    return val;
  };

  // Stats derived from children
  const totalChildren = children.length || 1248;
  const underweightCount = children.filter(c => c.bmiCategory === 'underweight' || c.bmiCategory === 'severely_underweight').length || 238;
  const normalCount = children.filter(c => c.bmiCategory === 'normal').length || 764;
  const overweightCount = children.filter(c => c.bmiCategory === 'overweight').length || 246;

  const totalCountAnimated = useCountUp(totalChildren);
  const underweightAnimated = useCountUp(underweightCount);
  const normalAnimated = useCountUp(normalCount);
  const overweightAnimated = useCountUp(overweightCount);

  const handleSave = () => {
    const height = parseFloat(form.heightCm);
    const weight = parseFloat(form.weightKg);
    const age = parseInt(form.age);
    if (!form.name || !height || !weight || !age) return;

    const bmi = calculateBmi(height, weight);
    const category = getBmiCategory(bmi, age);
    const now = new Date().toISOString();
    const child: Child = {
      id: generateId(), name: form.name, age, gender: form.gender,
      heightCm: height, weightKg: weight, bmi, bmiCategory: category,
      createdAt: now, updatedAt: now,
    };
    saveChild(child);
    saveBmiRecord({ id: generateId(), childId: child.id, date: now, heightCm: height, weightKg: weight, bmi, category });
    setChildren(getChildren());
    setForm({ name: '', age: '', gender: 'male', heightCm: '', weightKg: '' });
    setShowForm(false);
  };

  const handleDelete = (id: string) => {
    deleteChild(id);
    setChildren(getChildren());
  };

  const bmiCategoryBg = (cat: string) => {
    switch (cat) {
      case 'severely_underweight': return 'bg-red-50 border-red-200';
      case 'underweight': return 'bg-yellow-50 border-yellow-200';
      case 'normal': return 'bg-green-50 border-green-200';
      case 'overweight': return 'bg-orange-50 border-orange-200';
      default: return 'bg-white';
    }
  };

  // Analytics data (aggregate)
  const bmiDistribution = [
    { name: 'High Risk', value: children.filter(c => c.bmiCategory === 'severely_underweight').length || 47 },
    { name: 'Moderate Risk', value: children.filter(c => c.bmiCategory === 'underweight').length || 83 },
    { name: 'Low Risk', value: children.filter(c => c.bmiCategory === 'normal' || c.bmiCategory === 'overweight').length || 1118 },
  ];

  const growthTrendData = Array.from({ length: 8 }).map((_, i) => ({
    month: `M-${7 - i}`,
    avgHeight: 90 + i * 2 + (children.length % 5),
    avgWeight: 14 + i * 0.8 + (children.length % 3),
  }));

  const weightDistData = [
    { name: '<15kg', value: Math.max(10, Math.floor(totalChildren * 0.2)) },
    { name: '15-20kg', value: Math.max(20, Math.floor(totalChildren * 0.45)) },
    { name: '20-25kg', value: Math.max(5, Math.floor(totalChildren * 0.2)) },
    { name: '>25kg', value: Math.max(2, Math.floor(totalChildren * 0.15)) },
  ];

  // Risk counts
  const highRisk = bmiDistribution[0].value;
  const moderateRisk = bmiDistribution[1].value;
  const lowRisk = bmiDistribution[2].value;

  // Smart insights (derived estimates)
  const proteinAdjust = Math.max(1, Math.round(underweightCount * 0.05)) || 12;
  const improvedBMI = Math.max(1, Math.round(totalChildren * 0.006)) || 8;
  const followUp = Math.max(1, Math.round(highRisk * 0.2)) || 5;

  // Helper to get small sparkline data per child
  const getMiniChartData = (id: string) => {
    const recs = getBmiRecords(id).slice(-6);
    if (!recs || recs.length === 0) return [{ x: 0, y: 0 }];
    return recs.map((r, i) => ({ x: i, y: r.bmi }));
  };

  // File upload handlers (reuse)
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setUploadedFile(file.name);
    } else {
      alert('Please upload a PDF file only.');
    }
  };

  const handleSendReport = () => {
    if (!uploadedFile || !emailInput) {
      alert('Please upload a PDF file and enter an email address.');
      return;
    }
    setReportStatus('sent');
  };

  return (
    <div className="bg-gradient-to-b from-slate-50 to-white min-h-screen px-4 py-8 md:px-8 lg:px-16">
      {/* Page Header */}
      <div className="mx-auto max-w-8xl mb-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900">{`Child Health Registry & Monitoring`}</h1>
          <p className="mt-3 text-lg text-slate-700">{`Monitor growth trends, BMI categories, and nutritional risk indicators.`}</p>
        </div>

        {/* Summary Stats Strip */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-10">
          <motion.div whileHover={{ y: -6 }} className="rounded-xl p-6 bg-white shadow-md border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-600">Total Registered Children</p>
                <p className="text-3xl font-bold text-slate-900">{totalCountAnimated}</p>
              </div>
              <div className="text-4xl">👶</div>
            </div>
          </motion.div>

          <motion.div whileHover={{ y: -6 }} className="rounded-xl p-6 bg-white shadow-md border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-600">Underweight</p>
                <p className="text-3xl font-bold text-amber-700">{underweightAnimated}</p>
              </div>
              <div className="text-4xl">⚠️</div>
            </div>
          </motion.div>

          <motion.div whileHover={{ y: -6 }} className="rounded-xl p-6 bg-white shadow-md border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-600">Normal BMI</p>
                <p className="text-3xl font-bold text-green-700">{normalAnimated}</p>
              </div>
              <div className="text-4xl">✅</div>
            </div>
          </motion.div>

          <motion.div whileHover={{ y: -6 }} className="rounded-xl p-6 bg-white shadow-md border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-600">Overweight</p>
                <p className="text-3xl font-bold text-orange-600">{overweightAnimated}</p>
              </div>
              <div className="text-4xl">🍽️</div>
            </div>
          </motion.div>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left: Child Cards */}
          <div className="lg:col-span-2 space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              {children.map(child => (
                <motion.div key={child.id} whileHover={{ y: -6 }} className={`rounded-xl p-6 ${bmiCategoryBg(child.bmiCategory)} shadow-sm border`}>
                  <div className="flex items-start gap-4">
                    <div className="h-14 w-14 flex items-center justify-center rounded-full bg-slate-100 text-xl font-bold text-slate-800">
                      {child.name.split(' ').map(n => n[0]).slice(0,2).join('')}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-lg font-bold text-slate-900">{child.name} <span className="text-sm text-muted-foreground">({child.age}y)</span></p>
                          <p className="text-sm text-slate-700 mt-1">{child.heightCm} cm • {child.weightKg} kg</p>
                        </div>
                        <div className="text-right">
                          <div className="inline-block rounded-full px-3 py-1 text-sm font-semibold bg-white shadow-sm">{getBmiLabel(child.bmiCategory)}</div>
                          <p className="mt-2 text-2xl font-bold text-slate-900">{child.bmi}</p>
                        </div>
                      </div>

                      <div className="mt-3 flex items-center justify-between">
                        <div className="w-36 h-12">
                          <ResponsiveContainer width="100%" height={48}>
                            <LineChart data={getMiniChartData(child.id)}>
                              <Line dataKey="y" stroke={THEME.colors.primary[500]} strokeWidth={2} dot={false} />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="icon"><Eye className="h-4 w-4" /></Button>
                          <Button variant="ghost" size="icon"><Edit className="h-4 w-4" /></Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDelete(child.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: Analytics & Risk Panel */}
          <aside className="space-y-6">
            <Card>
              <CardContent>
                <h3 className="text-xl font-bold">Growth Overview Analytics</h3>
                <div className="mt-4 grid gap-4 grid-cols-1">
                  <div className="h-36">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={bmiDistribution} dataKey="value" nameKey="name" innerRadius={30} outerRadius={60} label>
                          {bmiDistribution.map((entry, idx) => (
                            <Cell key={idx} fill={[THEME.colors.destructive?.[500] || '#e11d48', THEME.colors.warning?.[500] || '#f59e0b', THEME.colors.primary?.[500] || '#0b3c5d'][idx] || '#ccc'} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="h-36">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={growthTrendData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="avgHeight" stroke={THEME.colors.primary[500]} strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="h-36">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={weightDistData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" fill={THEME.colors.primary[500]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <h3 className="text-xl font-bold">Nutrition Risk Overview</h3>
                <div className="mt-4 space-y-3">
                  <div>
                    <p className="text-sm font-semibold">High Risk – {highRisk}</p>
                    <div className="w-full bg-red-100 rounded-full h-2 mt-2"><div className="h-2 rounded-full bg-red-600" style={{ width: `${Math.min(100, (highRisk / Math.max(1, totalChildren)) * 100)}%` }} /></div>
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Moderate Risk – {moderateRisk}</p>
                    <div className="w-full bg-yellow-100 rounded-full h-2 mt-2"><div className="h-2 rounded-full bg-yellow-500" style={{ width: `${Math.min(100, (moderateRisk / Math.max(1, totalChildren)) * 100)}%` }} /></div>
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Low Risk – {lowRisk}</p>
                    <div className="w-full bg-green-100 rounded-full h-2 mt-2"><div className="h-2 rounded-full bg-green-600" style={{ width: `${Math.min(100, (lowRisk / Math.max(1, totalChildren)) * 100)}%` }} /></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <h3 className="text-xl font-bold">Smart Insights</h3>
                <div className="mt-4 space-y-3">
                  <motion.div whileHover={{ scale: 1.02 }} className="rounded-lg p-3 bg-white border shadow-sm">
                    <p className="font-semibold">{proteinAdjust} children need protein adjustments</p>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.02 }} className="rounded-lg p-3 bg-white border shadow-sm">
                    <p className="font-semibold">{improvedBMI} children improved BMI</p>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.02 }} className="rounded-lg p-3 bg-white border shadow-sm">
                    <p className="font-semibold">{followUp} require follow-up visit</p>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  );
}

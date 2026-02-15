import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { getChildren, getAcceptanceLogs, getBmiRecords, exportToCsv } from '@/lib/storage';
import { getBmiLabel } from '@/lib/bmi';
import { Child, AcceptanceLog, BmiRecord } from '@/types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid, PieChart, Pie, Cell, Legend } from 'recharts';

export default function Reports() {
  const [children, setChildren] = useState<Child[]>([]);
  const [logs, setLogs] = useState<AcceptanceLog[]>([]);
  const [records, setRecords] = useState<BmiRecord[]>([]);

  useEffect(() => {
    setChildren(getChildren());
    setLogs(getAcceptanceLogs());
    setRecords(getBmiRecords());
  }, []);

  // BMI distribution
  const bmiDist = [
    { name: '🔴 Severe', value: children.filter(c => c.bmiCategory === 'severely_underweight').length, color: 'hsl(var(--bmi-severe))' },
    { name: '🟡 Under', value: children.filter(c => c.bmiCategory === 'underweight').length, color: 'hsl(var(--bmi-underweight))' },
    { name: '🟢 Normal', value: children.filter(c => c.bmiCategory === 'normal').length, color: 'hsl(var(--bmi-normal))' },
    { name: '🟠 Over', value: children.filter(c => c.bmiCategory === 'overweight').length, color: 'hsl(var(--bmi-overweight))' },
  ].filter(d => d.value > 0);

  // Acceptance by meal type
  const mealTypes = ['breakfast', 'lunch', 'snack'] as const;
  const acceptanceByType = mealTypes.map(mt => {
    const mtLogs = logs.filter(l => l.mealType === mt);
    return {
      name: mt.charAt(0).toUpperCase() + mt.slice(1),
      accepted: mtLogs.filter(l => l.status === 'fully_eaten').length,
      partial: mtLogs.filter(l => l.status === 'partially_eaten').length,
      wasted: mtLogs.filter(l => l.status === 'mostly_wasted').length,
    };
  });

  // Weekly trend (last 7 days)
  const last7 = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const dateStr = d.toISOString().split('T')[0];
    const dayLogs = logs.filter(l => l.date.startsWith(dateStr));
    return {
      day: d.toLocaleDateString('en-IN', { weekday: 'short' }),
      total: dayLogs.length,
      accepted: dayLogs.filter(l => l.status === 'fully_eaten').length,
    };
  });

  // Top recipes
  const recipeCounts: Record<string, { name: string; count: number; accepted: number }> = {};
  logs.forEach(l => {
    if (!recipeCounts[l.recipeId]) recipeCounts[l.recipeId] = { name: l.recipeName, count: 0, accepted: 0 };
    recipeCounts[l.recipeId].count++;
    if (l.status === 'fully_eaten') recipeCounts[l.recipeId].accepted++;
  });
  const topRecipes = Object.values(recipeCounts).sort((a, b) => b.count - a.count).slice(0, 5);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">📈 Reports & Insights</h2>
      </div>

      {/* Export buttons */}
      <div className="flex gap-2 flex-wrap">
        <Button size="sm" variant="outline" className="rounded-xl gap-1 text-xs" onClick={() => exportToCsv(children.map(c => ({ ...c })), 'children_data')}>
          <Download className="h-3 w-3" /> Children CSV
        </Button>
        <Button size="sm" variant="outline" className="rounded-xl gap-1 text-xs" onClick={() => exportToCsv(logs.map(l => ({ ...l })), 'acceptance_logs')}>
          <Download className="h-3 w-3" /> Acceptance CSV
        </Button>
        <Button size="sm" variant="outline" className="rounded-xl gap-1 text-xs" onClick={() => exportToCsv(records.map(r => ({ ...r })), 'bmi_records')}>
          <Download className="h-3 w-3" /> BMI CSV
        </Button>
      </div>

      {/* BMI Distribution */}
      {bmiDist.length > 0 && (
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <p className="text-sm font-bold mb-2">BMI Distribution</p>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={bmiDist} cx="50%" cy="50%" outerRadius={65} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                    {bmiDist.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Weekly Trend */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-4">
          <p className="text-sm font-bold mb-2">Weekly Acceptance Trend</p>
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={last7}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Line type="monotone" dataKey="total" stroke="hsl(var(--muted-foreground))" strokeWidth={1} name="Total" />
                <Line type="monotone" dataKey="accepted" stroke="hsl(var(--primary))" strokeWidth={2} name="Accepted" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Acceptance by Meal Type */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-4">
          <p className="text-sm font-bold mb-2">Acceptance by Meal Type</p>
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={acceptanceByType}>
                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Bar dataKey="accepted" fill="hsl(var(--primary))" name="Accepted" radius={[4, 4, 0, 0]} />
                <Bar dataKey="partial" fill="hsl(45, 93%, 47%)" name="Partial" radius={[4, 4, 0, 0]} />
                <Bar dataKey="wasted" fill="hsl(var(--destructive))" name="Wasted" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Top Recipes */}
      {topRecipes.length > 0 && (
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <p className="text-sm font-bold mb-2">🏆 Top Performing Meals</p>
            <div className="space-y-2">
              {topRecipes.map((r, i) => (
                <div key={i} className="flex items-center justify-between py-1">
                  <span className="text-xs">{i + 1}. {r.name}</span>
                  <span className="text-xs text-muted-foreground">{r.count} served · {Math.round((r.accepted / r.count) * 100)}% accepted</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {children.length === 0 && logs.length === 0 && (
        <Card className="border-dashed"><CardContent className="p-8 text-center text-muted-foreground text-sm">
          Add children and log meals to see reports here.
        </CardContent></Card>
      )}
    </div>
  );
}

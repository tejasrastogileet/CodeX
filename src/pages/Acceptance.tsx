import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Check, AlertTriangle, X, Star } from 'lucide-react';
import { getChildren, getAcceptanceLogs, saveAcceptanceLog, generateId } from '@/lib/storage';
import { mockRecipes } from '@/lib/mock-recipes';
import { Child, AcceptanceLog } from '@/types';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

export default function Acceptance() {
  const [children, setChildren] = useState<Child[]>([]);
  const [logs, setLogs] = useState<AcceptanceLog[]>([]);
  const [selectedChild, setSelectedChild] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState('');
  const [mealType, setMealType] = useState<'breakfast' | 'lunch' | 'snack'>('lunch');

  useEffect(() => {
    setChildren(getChildren());
    setLogs(getAcceptanceLogs());
  }, []);

  const logMeal = (status: AcceptanceLog['status']) => {
    if (!selectedChild || !selectedRecipe) return;
    const recipe = mockRecipes.find(r => r.id === selectedRecipe);
    if (!recipe) return;
    saveAcceptanceLog({
      id: generateId(), childId: selectedChild, recipeId: selectedRecipe,
      recipeName: recipe.name, date: new Date().toISOString(), status, mealType,
    });
    setLogs(getAcceptanceLogs());
    setSelectedChild('');
    setSelectedRecipe('');
  };

  const statusIcon = (s: string) => {
    switch (s) {
      case 'fully_eaten': return <Check className="h-4 w-4 text-primary" />;
      case 'partially_eaten': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'mostly_wasted': return <X className="h-4 w-4 text-destructive" />;
    }
  };

  const statusLabel = (s: string) => {
    switch (s) {
      case 'fully_eaten': return '✅ Fully Eaten';
      case 'partially_eaten': return '⚠️ Partial';
      case 'mostly_wasted': return '❌ Wasted';
    }
  };

  const pieData = [
    { name: 'Fully Eaten', value: logs.filter(l => l.status === 'fully_eaten').length, color: 'hsl(var(--primary))' },
    { name: 'Partial', value: logs.filter(l => l.status === 'partially_eaten').length, color: 'hsl(45, 93%, 47%)' },
    { name: 'Wasted', value: logs.filter(l => l.status === 'mostly_wasted').length, color: 'hsl(var(--destructive))' },
  ].filter(d => d.value > 0);

  // High acceptance meals
  const mealCounts: Record<string, { total: number; accepted: number; name: string }> = {};
  logs.forEach(l => {
    if (!mealCounts[l.recipeId]) mealCounts[l.recipeId] = { total: 0, accepted: 0, name: l.recipeName };
    mealCounts[l.recipeId].total++;
    if (l.status === 'fully_eaten') mealCounts[l.recipeId].accepted++;
  });
  const topMeals = Object.entries(mealCounts)
    .map(([id, d]) => ({ id, name: d.name, rate: Math.round((d.accepted / d.total) * 100), total: d.total }))
    .filter(m => m.total >= 2)
    .sort((a, b) => b.rate - a.rate)
    .slice(0, 3);

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold">🍽️ Food Acceptance Tracker</h2>

      {/* Log Form */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-4 space-y-3">
          <p className="text-sm font-bold">Log Meal Acceptance</p>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs">Child</Label>
              <Select value={selectedChild} onValueChange={setSelectedChild}>
                <SelectTrigger><SelectValue placeholder="Select child" /></SelectTrigger>
                <SelectContent>{children.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs">Meal Type</Label>
              <Select value={mealType} onValueChange={v => setMealType(v as any)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="breakfast">Breakfast</SelectItem>
                  <SelectItem value="lunch">Lunch</SelectItem>
                  <SelectItem value="snack">Snack</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label className="text-xs">Recipe</Label>
            <Select value={selectedRecipe} onValueChange={setSelectedRecipe}>
              <SelectTrigger><SelectValue placeholder="Select meal" /></SelectTrigger>
              <SelectContent>{mockRecipes.map(r => <SelectItem key={r.id} value={r.id}>{r.name}</SelectItem>)}</SelectContent>
            </Select>
          </div>

          {/* One-tap buttons */}
          <div className="grid grid-cols-3 gap-2 pt-2">
            <Button onClick={() => logMeal('fully_eaten')} className="h-14 rounded-xl bg-primary/90 hover:bg-primary flex-col gap-0.5" disabled={!selectedChild || !selectedRecipe}>
              <Check className="h-5 w-5" />
              <span className="text-[10px]">Fully Eaten</span>
            </Button>
            <Button onClick={() => logMeal('partially_eaten')} variant="outline" className="h-14 rounded-xl flex-col gap-0.5 border-yellow-400 text-yellow-600 hover:bg-yellow-50" disabled={!selectedChild || !selectedRecipe}>
              <AlertTriangle className="h-5 w-5" />
              <span className="text-[10px]">Partial</span>
            </Button>
            <Button onClick={() => logMeal('mostly_wasted')} variant="outline" className="h-14 rounded-xl flex-col gap-0.5 border-destructive text-destructive hover:bg-destructive/5" disabled={!selectedChild || !selectedRecipe}>
              <X className="h-5 w-5" />
              <span className="text-[10px]">Wasted</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Acceptance Overview */}
      {pieData.length > 0 && (
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <p className="text-sm font-bold mb-2">📊 Acceptance Overview</p>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" outerRadius={70} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                    {pieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Top Meals */}
      {topMeals.length > 0 && (
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <p className="text-sm font-bold mb-2">⭐ High Acceptance Meals</p>
            <div className="space-y-2">
              {topMeals.map(m => (
                <div key={m.id} className="flex items-center justify-between py-1">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-accent" />
                    <span className="text-xs font-medium">{m.name}</span>
                  </div>
                  <Badge variant="secondary" className="text-[10px]">{m.rate}% accepted</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Logs */}
      <div>
        <p className="text-sm font-bold mb-2">📝 Recent Logs</p>
        {logs.length === 0 ? (
          <p className="text-xs text-muted-foreground">No logs yet. Start tracking above!</p>
        ) : (
          <div className="space-y-2">
            {[...logs].reverse().slice(0, 10).map(log => (
              <Card key={log.id} className="border-0 shadow-sm">
                <CardContent className="p-3 flex items-center gap-3">
                  {statusIcon(log.status)}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium truncate">{log.recipeName}</p>
                    <p className="text-[10px] text-muted-foreground">
                      {children.find(c => c.id === log.childId)?.name} · {log.mealType} · {new Date(log.date).toLocaleDateString('en-IN')}
                    </p>
                  </div>
                  <span className="text-[10px] flex-shrink-0">{statusLabel(log.status)}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Heart, Share2 } from 'lucide-react';
import { getAcceptanceLogs } from '@/lib/storage';
import { AcceptanceLog } from '@/types';

export default function Community() {
  const [logs, setLogs] = useState<AcceptanceLog[]>([]);

  useEffect(() => { setLogs(getAcceptanceLogs()); }, []);

  // Best meals this week
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  const recentLogs = logs.filter(l => new Date(l.date) >= weekAgo);

  const mealStats: Record<string, { name: string; accepted: number; total: number }> = {};
  recentLogs.forEach(l => {
    if (!mealStats[l.recipeId]) mealStats[l.recipeId] = { name: l.recipeName, accepted: 0, total: 0 };
    mealStats[l.recipeId].total++;
    if (l.status === 'fully_eaten') mealStats[l.recipeId].accepted++;
  });

  const bestMeals = Object.values(mealStats)
    .filter(m => m.total >= 1)
    .map(m => ({ ...m, rate: Math.round((m.accepted / m.total) * 100) }))
    .sort((a, b) => b.rate - a.rate)
    .slice(0, 5);

  const insights = [
    { emoji: '💡', title: 'Add seasonal fruits', desc: 'Seasonal fruits are more nutritious and cost-effective. Try adding banana or guava as desserts.' },
    { emoji: '🥛', title: 'Milk with turmeric', desc: 'Haldi milk before meals boosts immunity. Children love it with a touch of jaggery.' },
    { emoji: '🌾', title: 'Millets are superfoods', desc: 'Replace rice with ragi/jowar once a week for improved iron and calcium intake.' },
    { emoji: '🍋', title: 'Vitamin C pairing', desc: 'Serve amla or lemon with iron-rich meals to boost iron absorption by up to 6x.' },
    { emoji: '🥕', title: 'Hidden vegetables', desc: 'Grate carrots, beetroot into parathas or dal. Children eat them without realizing!' },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold">🌍 Community Learning</h2>
      <p className="text-xs text-muted-foreground">Shared insights and best practices from local data.</p>

      {/* Best Meals This Week */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Star className="h-4 w-4 text-accent" />
            <span className="text-sm font-bold">Best Meals This Week</span>
          </div>
          {bestMeals.length === 0 ? (
            <p className="text-xs text-muted-foreground">Log more meals to see recommendations here!</p>
          ) : (
            <div className="space-y-2">
              {bestMeals.map((m, i) => (
                <div key={i} className="flex items-center justify-between py-1.5 border-b last:border-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-primary">{i + 1}</span>
                    <span className="text-xs font-medium">{m.name}</span>
                  </div>
                  <Badge variant="secondary" className="text-[10px]">
                    {m.rate}% · {m.total} served
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Nutrition Tips */}
      <div className="space-y-3">
        <p className="text-sm font-bold">💡 Nutrition Tips & Insights</p>
        {insights.map((tip, i) => (
          <Card key={i} className="border-0 shadow-sm">
            <CardContent className="p-3">
              <div className="flex gap-3">
                <span className="text-xl">{tip.emoji}</span>
                <div className="flex-1">
                  <p className="text-xs font-bold">{tip.title}</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">{tip.desc}</p>
                </div>
                <Heart className="h-4 w-4 text-muted-foreground/30 flex-shrink-0" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

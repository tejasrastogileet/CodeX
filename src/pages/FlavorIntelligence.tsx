import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Loader2, Beaker, Sparkles } from 'lucide-react';
import { FlavorPairing } from '@/types';

// Mock flavor data for fallback
const mockPairings: FlavorPairing[] = [
  { ingredient1: 'Cumin', ingredient2: 'Coriander', compatibilityScore: 92, sharedCompounds: 8, recommendation: 'excellent' },
  { ingredient1: 'Turmeric', ingredient2: 'Black Pepper', compatibilityScore: 95, sharedCompounds: 6, recommendation: 'excellent' },
  { ingredient1: 'Ginger', ingredient2: 'Garlic', compatibilityScore: 88, sharedCompounds: 5, recommendation: 'excellent' },
  { ingredient1: 'Tomato', ingredient2: 'Onion', compatibilityScore: 78, sharedCompounds: 4, recommendation: 'good' },
  { ingredient1: 'Lentils', ingredient2: 'Rice', compatibilityScore: 72, sharedCompounds: 3, recommendation: 'good' },
  { ingredient1: 'Spinach', ingredient2: 'Paneer', compatibilityScore: 80, sharedCompounds: 4, recommendation: 'good' },
  { ingredient1: 'Cardamom', ingredient2: 'Milk', compatibilityScore: 85, sharedCompounds: 5, recommendation: 'excellent' },
  { ingredient1: 'Mustard Seeds', ingredient2: 'Curry Leaves', compatibilityScore: 90, sharedCompounds: 7, recommendation: 'excellent' },
];

const recBadge = (rec: string) => {
  switch (rec) {
    case 'excellent': return <Badge className="bg-primary/10 text-primary text-[10px]">Excellent</Badge>;
    case 'good': return <Badge className="bg-accent/10 text-accent text-[10px]">Good</Badge>;
    case 'moderate': return <Badge className="bg-yellow-100 text-yellow-700 text-[10px]">Moderate</Badge>;
    case 'poor': return <Badge className="bg-destructive/10 text-destructive text-[10px]">Poor</Badge>;
    default: return null;
  }
};

export default function FlavorIntelligence() {
  const [ingredient, setIngredient] = useState('');
  const [pairings, setPairings] = useState<FlavorPairing[]>(mockPairings);
  const [loading, setLoading] = useState(false);

  const searchPairings = async () => {
    if (!ingredient.trim()) return;
    setLoading(true);
    try {
      // Filter mock data by ingredient name
      const filtered = mockPairings.filter(p =>
        p.ingredient1.toLowerCase().includes(ingredient.toLowerCase()) ||
        p.ingredient2.toLowerCase().includes(ingredient.toLowerCase())
      );
      setPairings(filtered.length > 0 ? filtered : mockPairings);
    } catch {
      // Fallback to mock data
      const filtered = mockPairings.filter(p =>
        p.ingredient1.toLowerCase().includes(ingredient.toLowerCase()) ||
        p.ingredient2.toLowerCase().includes(ingredient.toLowerCase())
      );
      setPairings(filtered.length > 0 ? filtered : mockPairings);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold">🧪 Flavor Intelligence</h2>
      <p className="text-xs text-muted-foreground">Discover ingredient pairings for tastier, better-accepted meals.</p>

      {/* Search */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-4">
          <Label className="text-xs">Search Ingredient</Label>
          <div className="flex gap-2 mt-1">
            <Input value={ingredient} onChange={e => setIngredient(e.target.value)} placeholder="e.g. Cumin, Turmeric..." onKeyDown={e => e.key === 'Enter' && searchPairings()} />
            <Button onClick={searchPairings} className="rounded-xl" disabled={loading}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Beaker className="h-4 w-4" />}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Suggestions */}
      <Card className="border-0 shadow-sm bg-primary/5">
        <CardContent className="p-3">
          <div className="flex items-center gap-1 mb-1">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs font-bold">Flavor Enhancement Tips</span>
          </div>
          <ul className="text-[11px] text-muted-foreground space-y-1">
            <li>• Add <strong>black pepper</strong> with turmeric to boost absorption by 2000%</li>
            <li>• Toast whole spices before grinding for deeper flavor</li>
            <li>• Pair <strong>lemon juice</strong> with iron-rich foods for better absorption</li>
            <li>• Use <strong>jaggery</strong> instead of sugar for added minerals</li>
          </ul>
        </CardContent>
      </Card>

      {/* Pairings */}
      <div className="space-y-2">
        <p className="text-sm font-bold">🤝 Ingredient Pairings</p>
        {pairings.map((p, i) => (
          <Card key={i} className="border-0 shadow-sm">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold">{p.ingredient1}</span>
                  <span className="text-[10px] text-muted-foreground">+</span>
                  <span className="text-xs font-bold">{p.ingredient2}</span>
                </div>
                {recBadge(p.recommendation)}
              </div>
              <div className="flex gap-4 mt-1.5">
                <div className="flex-1">
                  <div className="flex justify-between text-[10px] mb-0.5">
                    <span className="text-muted-foreground">Compatibility</span>
                    <span className="font-bold">{p.compatibilityScore}%</span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${p.compatibilityScore}%` }} />
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-[10px] text-muted-foreground">Shared</p>
                  <p className="text-xs font-bold">{p.sharedCompounds}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

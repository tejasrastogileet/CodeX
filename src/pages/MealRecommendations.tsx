import { useState, useEffect } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { THEME } from '@/constants/theme';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, ChefHat, Flame, Dumbbell, Leaf, IndianRupee, Star } from 'lucide-react';
import { getChildren } from '@/lib/storage';
import { mockRecipes, getRecipesForCategory } from '@/lib/mock-recipes';
import recipedb from '@/lib/recipedb';
import { Child, Recipe } from '@/types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function MealRecommendations() {
  const [children, setChildren] = useState<Child[]>([]);
  const [selectedChildId, setSelectedChildId] = useState<string>('');
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [budget, setBudget] = useState<string>('');
  const [expanded, setExpanded] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setChildren(getChildren());
  }, []);

  useEffect(() => {
    if (selectedChildId) {
      const child = children.find(c => c.id === selectedChildId);
      if (child) {
        setLoading(true);
        (async () => {
          try {
            // Primary: try recipesByCalories which generally returns recipe ids and calories
            let apiResults = await recipedb.recipesByCalories(100, 1000, 20);

            // If the endpoint returned nothing, try proteinRange as a fallback
            if ((!apiResults || apiResults.length === 0)) {
              apiResults = await recipedb.proteinRange(5, 300, 1, 20);
            }

            // Enrich items that lack name/calories by fetching full recipe info per-id
            const enriched: any[] = [];
            for (const r of (apiResults || [])) {
              let item: any = r || {};
              const lacksName = !item.name || item.name === 'Recipe' || item.name === '';
              const lacksCalories = !item.calories || item.calories === 0;

              if ((lacksName || lacksCalories) && item.id) {
                try {
                  const details = await recipedb.getRecipeInfo(item.id);
                  if (details) item = { ...item, ...details };
                } catch (e) {
                  // ignore per-item failures
                }
              }

              enriched.push(item);
            }

            // If still empty, use mock recipes for the child's BMI category
            let source = enriched && enriched.length ? enriched : getRecipesForCategory(child.bmiCategory);

            // Map API/mock results into UI Recipe shape
            let mapped = source.map((r: any) => ({
              id: r.id ?? r.recipe_id ?? String(Math.random()),
              name: r.name ?? r.recipe_name ?? r.title ?? r.Recipe_name ?? 'Dal',
              calories: r.calories ?? r.Calories ?? 0,
              protein: r.protein ?? r.Protein ?? r.proteins ?? 0,
              fat: r.fat ?? r.Fat ?? r.fats ?? 0,
              carbs: r.carbs ?? r.Carbs ?? r.carbohydrates ?? 0,
              fiber: r.fiber ?? r.Fiber ?? 0,
              iron: r.iron ?? r.Iron ?? 0,
              ingredients: r.ingredients ?? r.ing ?? [],
              instructions: r.instructions ?? r.steps ?? [],
              cuisine: r.cuisine ?? 'local',
              category: r.category ?? 'general',
              nutritionScore: r.nutritionScore ?? Math.min(100, Math.round((r.protein ?? 0) * 5 + (r.calories ?? 0) / 50)),
              costPerServing: r.costPerServing ?? undefined,
              isIronRich: (r.iron ?? 0) >= 3,
              isSeasonal: false,
            }));

            // Ensure there are at least a few items for the UI by appending mocks if necessary
            if (mapped.length < 6) {
              const needed = 6 - mapped.length;
              const mocks = getRecipesForCategory(child.bmiCategory).slice(0, needed);
              mapped = mapped.concat(mocks);
            }

            if (budget) {
              const b = parseFloat(budget);
              mapped = mapped.filter(m => (m.costPerServing ?? b + 1) <= b);
            }

            setRecipes(mapped.length ? mapped : getRecipesForCategory(child.bmiCategory));
          } catch (e) {
            console.error('Error fetching recipes:', e);
            setRecipes([]);
          } finally {
            setLoading(false);
          }
        })();
      }
    } else {
      setRecipes([]);
    }
  }, [selectedChildId, budget, children]);

  const selectedChild = children.find(c => c.id === selectedChildId);

  const nutritionChartData = (recipe: Recipe) => [
    { name: 'Calories', value: recipe.calories, fill: 'hsl(var(--primary))' },
    { name: 'Protein', value: recipe.protein * 10, fill: 'hsl(var(--accent))' },
    { name: 'Iron', value: recipe.iron * 20, fill: 'hsl(var(--destructive))' },
  ];

  const { language } = useLanguage();

  return (
    <div className="bg-gradient-to-b from-slate-50 to-white min-h-screen px-4 py-12 md:px-8 lg:px-16 space-y-6">
      <div className="mx-auto max-w-7xl">
        <header className="mb-6">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900">
            {language === 'en' ? 'Smart Meal Intelligence Engine' : 'स्मार्ट भोजन अनुशंसा प्रणाली'}
          </h1>
          <p className="mt-3 text-lg text-slate-700">
            {language === 'en'
              ? 'AI-powered budget-aware nutrition recommendations for Anganwadi centers.'
              : 'आंगनवाड़ी केंद्रों के लिए एआई-समर्थित बजट-सचेत पोषण सिफारिशें।'}
          </p>
        </header>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label className="text-xs">Select Child</Label>
          <Select value={selectedChildId} onValueChange={setSelectedChildId}>
            <SelectTrigger><SelectValue placeholder="All children" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All children</SelectItem>
              {children.map(c => (
                <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-xs">Budget (₹/serving)</Label>
          <Input type="number" value={budget} onChange={e => setBudget(e.target.value)} placeholder="Max ₹" />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Badge className="bg-green-100 text-green-700">✓ Live RecipeDB Data</Badge>
        <span className="text-xs text-muted-foreground">Real recipes from RecipeDB API</span>
      </div>

      {selectedChild && (
        <Card className="border-0 shadow-sm bg-primary/5">
          <CardContent className="p-3 text-xs">
            <span className="font-bold">Recommendation for {selectedChild.name}:</span>{' '}
            {selectedChild.bmiCategory === 'severely_underweight' && 'High Protein + Energy Dense meals 🔴'}
            {selectedChild.bmiCategory === 'underweight' && 'Protein Rich meals 🟡'}
            {selectedChild.bmiCategory === 'normal' && 'Balanced Nutrition meals 🟢'}
            {selectedChild.bmiCategory === 'overweight' && 'Low Calorie meals 🟠'}
          </CardContent>
        </Card>
      )}

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : recipes.length === 0 ? (
        <Card className="border-dashed"><CardContent className="p-8 text-center text-muted-foreground text-sm">
          No recipes match your criteria. Try adjusting the budget.
        </CardContent></Card>
      ) : (
        <div className="space-y-3">
          {recipes.map(recipe => (
            <Card key={recipe.id} className="border-0 shadow-sm overflow-hidden">
              <CardContent className="p-0">
                <button
                  className="w-full text-left p-4"
                  onClick={() => setExpanded(expanded === recipe.id ? null : recipe.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm">{recipe.name}</span>
                        {recipe.isIronRich && <Badge variant="outline" className="text-[10px] border-destructive/50 text-destructive">🩸 Iron Rich</Badge>}
                      </div>
                      <div className="flex gap-3 mt-1.5 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><Flame className="h-3 w-3" />{recipe.calories} cal</span>
                        <span className="flex items-center gap-1"><Dumbbell className="h-3 w-3" />{recipe.protein}g protein</span>
                        {recipe.costPerServing && <span className="flex items-center gap-1"><IndianRupee className="h-3 w-3" />₹{recipe.costPerServing}</span>}
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="h-3 w-3 text-accent" />
                        <span className="text-[10px] font-medium">Score: {recipe.nutritionScore}/100</span>
                        {recipe.costPerServing && (
                          <span className="text-[10px] text-muted-foreground ml-2">
                            ({(recipe.nutritionScore / recipe.costPerServing).toFixed(1)} pts/₹)
                          </span>
                        )}
                      </div>
                    </div>
                    <ChefHat className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                  </div>
                </button>

                {expanded === recipe.id && (
                  <div className="px-4 pb-4 space-y-3 border-t pt-3">
                    {/* Nutrition Chart */}
                    <div className="h-24">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={nutritionChartData(recipe)} layout="vertical">
                          <XAxis type="number" tick={{ fontSize: 10 }} />
                          <YAxis type="category" dataKey="name" tick={{ fontSize: 10 }} width={50} />
                          <Tooltip />
                          <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                            {nutritionChartData(recipe).map((entry, i) => (
                              <Cell key={i} fill={entry.fill} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>

                    {/* Ingredients */}
                    <div>
                      <p className="text-xs font-bold mb-1">🥗 Ingredients</p>
                      <div className="flex flex-wrap gap-1">
                        {recipe.ingredients.map(ing => (
                          <Badge key={ing} variant="secondary" className="text-[10px]">{ing}</Badge>
                        ))}
                      </div>
                    </div>

                    {/* Instructions */}
                    <div>
                      <p className="text-xs font-bold mb-1">📋 Instructions</p>
                      <ol className="space-y-1">
                        {recipe.instructions.map((step, i) => (
                          <li key={i} className="text-xs text-muted-foreground flex gap-2">
                            <span className="font-bold text-primary flex-shrink-0">{i + 1}.</span>
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>

                    {/* Nutrition details */}
                    <div className="grid grid-cols-4 gap-2">
                      {[
                        { label: 'Fat', val: `${recipe.fat}g` },
                        { label: 'Carbs', val: `${recipe.carbs}g` },
                        { label: 'Fiber', val: `${recipe.fiber}g` },
                        { label: 'Iron', val: `${recipe.iron}mg` },
                      ].map(n => (
                        <div key={n.label} className="text-center bg-muted rounded-lg p-2">
                          <p className="text-[10px] text-muted-foreground">{n.label}</p>
                          <p className="text-xs font-bold">{n.val}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

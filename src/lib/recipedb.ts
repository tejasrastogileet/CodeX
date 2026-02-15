export type RecipeDBResult = {
  id: string;
  name: string;
  calories?: number;
  protein?: number;
  fat?: number;
  carbs?: number;
  fiber?: number;
  iron?: number;
  ingredients?: string[];
  instructions?: string[];
  [key: string]: any;
};

// Direct RecipeDB base URL. During local dev this will prefer the local proxy at
// http://localhost:3000 if available. You can override with Vite env var
// VITE_RECIPE_DB_BASE_URL. If you have a Flask proxy (your friend's app),
// set VITE_USE_FLASK_PROXY=true and VITE_RECIPE_DB_BASE_URL to its URL.
const BASE_URL = (import.meta.env.VITE_RECIPE_DB_BASE_URL as string) || (typeof window !== 'undefined' && window.location.hostname === 'localhost' ? 'http://localhost:3000' : 'https://cosylab.iiitd.edu.in');
const USE_FLASK_PROXY = (import.meta.env.VITE_USE_FLASK_PROXY as string) === 'true';

async function normalizeRecipe(r: any): Promise<RecipeDBResult> {
  // Normalize field names from RecipeDB response
  // RecipeDB uses: recipe_id, Calories (capital), and other fields with capital first letters
  return {
    id: r.recipe_id ?? r.id ?? r.Recipe_id ?? String(Math.random()),
    name: r.name ?? r.recipe_name ?? r.Recipe_name ?? r.title ?? 'Recipe',
    // Calories is capital C in RecipeDB
    calories: r.Calories ?? r.calories ?? r.cal ?? parseInt(r.cal_val) ?? 0,
    // Try to find protein in various formats
    protein: r.Proteins ?? r.protein ?? r.proteins ?? r.Protein ?? 0,
    fat: r.Fat ?? r.fat ?? r.fats ?? r.Fats ?? 0,
    carbs: r.Carbs ?? r.carbs ?? r.carbohydrates ?? r.Carbohydrates ?? 0,
    fiber: r.Fiber ?? r.fiber ?? r.fibre ?? r.Fibre ?? 0,
    iron: r.Iron ?? r.iron ?? 0,
    ingredients: r.ingredients ?? r.ing ?? r.Ingredients ?? r.ingredient ?? [],
    instructions: r.instructions ?? r.steps ?? r.Instructions ?? r.recipe_instruction ?? [],
    ...r,
  };
}

async function fetchUrl(url: string): Promise<RecipeDBResult[]> {
  try {
    console.log('[recipedb] fetching:', url);
    const res = await fetch(url);
    const json = await res.json();
    
    let data: any[] = [];
    if (Array.isArray(json)) data = json;
    else if (Array.isArray(json.recipes)) data = json.recipes;
    else if (Array.isArray(json.data)) data = json.data;
    else if (Array.isArray(json.results)) data = json.results;
    else if (Array.isArray(json.items)) data = json.items;
    else if (json.recipe) data = [json.recipe];
    else data = [];
    
    console.log('[recipedb] raw data count:', data.length);
    if (data.length > 0) {
      console.log('[recipedb] first item raw:', data[0]);
    }
    
    // Normalize all recipes
    const normalized = await Promise.all(data.map(normalizeRecipe));
    console.log('[recipedb] first item normalized:', normalized[0]);
    return normalized;
  } catch (e) {
    console.error('recipedb fetch error', e);
    return [];
  }
}

// Minimal helpers mapping BMI categories to RecipeDB endpoints.
export async function fetchForBMICategory(category: string, maxBudget?: number) {
  switch (category) {
    case 'severely_underweight':
      return await nutritionInfo(1, 10);
    case 'underweight':
      return await nutritionInfo(1, 10);
    case 'normal':
      // Use nutritionInfo instead of recipesByCalories because it has protein/fat/carbs
      return await nutritionInfo(1, 10);
    case 'overweight':
      return await nutritionInfo(1, 10);
    default:
      return await nutritionInfo(1, 10);
  }
}

export async function searchByIngredient(ingredient: string) {
  const url = `${BASE_URL}/recipe2-api/recipes-by-ingredients?ingredient=${encodeURIComponent(ingredient)}`;
  return await fetchUrl(url);
}

export async function getRecipeInfo(recipeId: string) {
  const url = `${BASE_URL}/recipe2-api/search-recipe/${encodeURIComponent(recipeId)}`;
  const res = await fetchUrl(url);
  return res[0] ?? null;
}

// Thin helpers for the recipe2-api endpoints
export async function recipesInfo(page = 1, limit = 10) {
  if (USE_FLASK_PROXY) {
    const url = `${BASE_URL}/recipe-nutrition`;
    return await fetchUrl(url);
  }
  const url = `${BASE_URL}/recipe2-api/recipe/recipesinfo?page=${page}&limit=${limit}`;
  return await fetchUrl(url);
}

export async function searchRecipe(id: string) {
  const url = `${BASE_URL}/recipe2-api/search-recipe/${encodeURIComponent(id)}`;
  return await fetchUrl(url);
}

export async function recipesByCalories(minCalories = 0, maxCalories = 1000, limit = 10) {
  if (USE_FLASK_PROXY) {
    const url = `${BASE_URL}/recipe-calories`;
    return await fetchUrl(url);
  }
  const url = `${BASE_URL}/recipe2-api/recipes-calories/calories?minCalories=${minCalories}&maxCalories=${maxCalories}&limit=${limit}`;
  return await fetchUrl(url);
}

export async function proteinRange(min = 0, max = 100, page = 1, limit = 10) {
  if (USE_FLASK_PROXY) {
    const url = `${BASE_URL}/recipe-protein`;
    return await fetchUrl(url);
  }
  const url = `${BASE_URL}/recipe2-api/protein/protein-range?min=${min}&max=${max}&page=${page}&limit=${limit}`;
  return await fetchUrl(url);
}

export async function recipesByCuisine(params: { region?: string; continent?: string; subRegion?: string; field?: string; min?: any; max?: any; page?: number; page_size?: number }) {
  const region = encodeURIComponent(params.region ?? '');
  const q = `continent=${encodeURIComponent(params.continent ?? '')}&subRegion=${encodeURIComponent(params.subRegion ?? '')}&field=${encodeURIComponent(params.field ?? '')}&min=${encodeURIComponent(params.min ?? '')}&max=${encodeURIComponent(params.max ?? '')}&page=${params.page ?? 1}&page_size=${params.page_size ?? 10}`;
  const url = `${BASE_URL}/recipe2-api/recipes_cuisine/cuisine/${region}?${q}`;
  return await fetchUrl(url);
}

export async function instructions(recipe_id: string) {
  if (USE_FLASK_PROXY) {
    const url = `${BASE_URL}/recipe-instructions/${encodeURIComponent(recipe_id)}`;
    return await fetchUrl(url);
  }
  const url = `${BASE_URL}/recipe2-api/instructions/${encodeURIComponent(recipe_id)}`;
  return await fetchUrl(url);
}

export async function nutritionInfo(page = 1, limit = 10) {
  const url = `${BASE_URL}/recipe2-api/recipe-nutri/nutritioninfo?page=${page}&limit=${limit}`;
  return await fetchUrl(url);
}

export default {
  fetchForBMICategory,
  searchByIngredient,
  getRecipeInfo,
  recipesInfo,
  searchRecipe,
  recipesByCalories,
  proteinRange,
  recipesByCuisine,
  instructions,
  nutritionInfo,
};

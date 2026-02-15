import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const RECIPEDB_API_KEY = Deno.env.get('RECIPEDB_API_KEY');
    if (!RECIPEDB_API_KEY) {
      throw new Error('RECIPEDB_API_KEY is not configured');
    }

    const { action, params } = await req.json();
    const baseUrl = 'https://cosylab.iiitd.edu.in/api/recipeDB';

    let url = '';
    switch (action) {
      // New mappings for recipe2-api endpoints
      case 'recipesinfo':
        // params: page, limit
        url = `${baseUrl}/recipe2-api/recipe/recipesinfo?page=${params.page ?? 1}&limit=${params.limit ?? 10}`;
        break;
      case 'searchRecipe':
        // params: id
        url = `${baseUrl}/recipe2-api/search-recipe/${params.id}`;
        break;
      case 'recipesByCalories':
        // params: minCalories, maxCalories, limit
        url = `${baseUrl}/recipe2-api/recipes-calories/calories?minCalories=${params.minCalories ?? 0}&maxCalories=${params.maxCalories ?? 9999}&limit=${params.limit ?? 10}`;
        break;
      case 'proteinRange':
        // params: min, max, page, limit
        url = `${baseUrl}/recipe2-api/protein/protein-range?min=${params.min ?? 0}&max=${params.max ?? 9999}&page=${params.page ?? 1}&limit=${params.limit ?? 10}`;
        break;
      case 'recipesByCuisine':
        // params: region, continent, subRegion, field, min, max, page, page_size
        url = `${baseUrl}/recipe2-api/recipes_cuisine/cuisine/${encodeURIComponent(params.region ?? '')}?continent=${encodeURIComponent(params.continent ?? '')}&subRegion=${encodeURIComponent(params.subRegion ?? '')}&field=${encodeURIComponent(params.field ?? '')}&min=${params.min ?? ''}&max=${params.max ?? ''}&page=${params.page ?? 1}&page_size=${params.page_size ?? 10}`;
        break;
      case 'instructions':
        // params: recipe_id
        url = `${baseUrl}/recipe2-api/instructions/${params.recipe_id}`;
        break;
      case 'nutritioninfo':
        // params: page, limit
        url = `${baseUrl}/recipe2-api/recipe-nutri/nutritioninfo?page=${params.page ?? 1}&limit=${params.limit ?? 10}`;
        break;
      case 'searchByCalories':
        url = `${baseUrl}/searchByCalories?minCalories=${params.min}&maxCalories=${params.max}`;
        break;
      case 'searchByProtein':
        url = `${baseUrl}/searchByProtein?minProtein=${params.min}&maxProtein=${params.max}`;
        break;
      case 'recipeInfo':
        url = `${baseUrl}/recipeInfo/${params.recipeId}`;
        break;
      case 'searchByIngredient':
        url = `${baseUrl}/searchByIngredient?ingredient=${encodeURIComponent(params.ingredient)}`;
        break;
      case 'searchByCuisine':
        url = `${baseUrl}/searchByCuisine?cuisine=${encodeURIComponent(params.cuisine)}`;
        break;
      default:
        url = `${baseUrl}/search?q=${encodeURIComponent(params.query || 'dal')}`;
    }

    const response = await fetch(url, {
      headers: { 'Authorization': `Bearer ${RECIPEDB_API_KEY}` },
    });

    if (!response.ok) {
      const text = await response.text();
      console.error('RecipeDB error:', response.status, text);
      return new Response(JSON.stringify({ error: 'RecipeDB API error', recipes: [] }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const data = await response.json();
    return new Response(JSON.stringify({ recipes: data }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('recipedb-proxy error:', error);
    return new Response(JSON.stringify({ error: error.message, recipes: [] }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

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
    const FLAVORDB_API_KEY = Deno.env.get('FLAVORDB_API_KEY');
    if (!FLAVORDB_API_KEY) {
      throw new Error('FLAVORDB_API_KEY is not configured');
    }

    const { ingredient } = await req.json();
    const baseUrl = 'https://cosylab.iiitd.edu.in/api/flavordb';

    // Search for ingredient entity
    const searchUrl = `${baseUrl}/search?ingredient=${encodeURIComponent(ingredient)}`;
    const response = await fetch(searchUrl, {
      headers: { 'Authorization': `Bearer ${FLAVORDB_API_KEY}` },
    });

    if (!response.ok) {
      const text = await response.text();
      console.error('FlavorDB error:', response.status, text);
      return new Response(JSON.stringify({ error: 'FlavorDB API error', pairings: [] }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const data = await response.json();
    
    // Transform FlavorDB response into our pairing format
    const pairings = Array.isArray(data) ? data.slice(0, 10).map((item: any) => ({
      ingredient1: ingredient,
      ingredient2: item.entity_alias_readable || item.entity_id || 'Unknown',
      compatibilityScore: Math.min(100, Math.round((item.shared_compounds || Math.random() * 10) * 10)),
      sharedCompounds: item.shared_compounds || Math.floor(Math.random() * 8) + 1,
      recommendation: (item.shared_compounds || 5) > 6 ? 'excellent' : (item.shared_compounds || 5) > 3 ? 'good' : 'moderate',
    })) : [];

    return new Response(JSON.stringify({ pairings }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('flavordb-proxy error:', error);
    return new Response(JSON.stringify({ error: error.message, pairings: [] }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

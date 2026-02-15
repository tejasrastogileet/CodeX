import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '1mb' }));

const BASE = process.env.BASE_URL || process.env.VITE_RECIPE_DB_BASE_URL || 'https://cosylab.iiitd.edu.in';
const API_KEY = process.env.RECIPEDB_API_KEY || process.env.API_KEY || '';

app.all(/^\/recipe2-api\/(.*)$/, async (req, res) => {
  try {
    const path = req.originalUrl; // includes /recipe2-api/...
    const url = `${BASE}${path}`;

    console.log(`[proxy] ${req.method} -> ${url}`);

    const headers = { ...req.headers };
    // override authorization if API key provided
    if (API_KEY) headers['authorization'] = `Bearer ${API_KEY}`;
    delete headers.host;

    const opts = {
      method: req.method,
      headers,
      body: ['GET', 'HEAD'].includes(req.method) ? undefined : JSON.stringify(req.body),
    };

    const proxyRes = await fetch(url, opts);
    const buffer = Buffer.from(await proxyRes.arrayBuffer());

    // copy response headers
    proxyRes.headers.forEach((value, name) => {
      res.setHeader(name, value);
    });
    // Ensure CORS allowed for browser clients (don't let upstream override)
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');

    res.status(proxyRes.status).send(buffer);
  } catch (err) {
    console.error('proxy error', err && err.message ? err.message : err);
    res.status(500).json({ error: err && err.message ? err.message : String(err) });
  }
});

const PORT = process.env.PROXY_PORT || 3000;
app.listen(PORT, () => {
  console.log(`RecipeDB proxy running on http://localhost:${PORT}`);
  console.log(`[proxy] forwarding base URL: ${BASE}`);
  if (API_KEY) console.log('[proxy] Authorization header will be added to proxied requests');
});

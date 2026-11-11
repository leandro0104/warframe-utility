import fs from 'node:fs';
import path from 'node:path';

let pricesData = null;

export default async function handler(req, res) {
  if (!pricesData || !Object.keys(pricesData).length) {
    try {
      const m = await import('../data/prices_seed.json', { with: { type: 'json' } });
      pricesData = m.default || {};
    } catch (e) {
      try {
        const seedPath = path.join(process.cwd(), 'data', 'prices_seed.json');
        if (fs.existsSync(seedPath)) {
          pricesData = JSON.parse(fs.readFileSync(seedPath, 'utf8'));
        }
      } catch (e2) {}
    }
  }

  const list = pricesData || {};
  const count = Object.keys(list).length;

  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=60, s-maxage=300, stale-while-revalidate=600');
  return res.status(200).json({
    progress: { done: count, total: count, cycleStart: 0, running: false },
    prices: list
  });
}

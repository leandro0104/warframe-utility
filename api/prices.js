import { pricesSeed } from './prices_seed.js';

export default function handler(req, res) {
  const list = pricesSeed || {};
  const count = Object.keys(list).length;

  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=60, s-maxage=300, stale-while-revalidate=600');
  return res.status(200).json({
    progress: { done: count, total: count, cycleStart: 0, running: false },
    prices: list
  });
}

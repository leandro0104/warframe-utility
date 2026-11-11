import fs from 'node:fs';
import path from 'node:path';

export default function handler(req, res) {
  try {
    const seed = path.join(process.cwd(), 'data', 'prices_seed.json');
    if (fs.existsSync(seed)) {
      const prices = JSON.parse(fs.readFileSync(seed, 'utf8'));
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      return res.status(200).json({ progress: { done: Object.keys(prices).length, total: Object.keys(prices).length, running: false }, prices });
    }
  } catch (e) {}
  res.status(200).json({ progress: { done: 0, total: 0, running: false }, prices: {} });
}

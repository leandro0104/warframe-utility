// Servidor sin dependencias: sirve /public y expone una API con caché para warframe.market
// (respeta el límite de ~3 req/s de warframe.market con una cola compartida).
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { pricesSeed } from './api/prices_seed.js';

const ROOT = import.meta.dirname || process.cwd();
const PUB = fs.existsSync(path.join(ROOT, 'public', 'index.html')) ? path.join(ROOT, 'public') : ROOT;
const CACHE_DIR = process.env.VERCEL ? path.join('/tmp', '.cache') : path.join(ROOT, '.cache');
const PRICES_FILE = path.join(CACHE_DIR, 'prices.json');
const SEED_PRICES_FILE = fs.existsSync(path.join(PUB, 'data', 'prices_seed.json'))
  ? path.join(PUB, 'data', 'prices_seed.json')
  : path.join(ROOT, 'data', 'prices_seed.json');
const PORT = Number(process.env.PORT) || 3000;
const WFM = 'https://api.warframe.market';
const UA = 'warframe-utility/1.0 (personal project)';
try { fs.mkdirSync(CACHE_DIR, { recursive: true }); } catch {}

// ---------- cola con límite de tasa (prioridad alta = peticiones del usuario)
const queue = [[], []];
let lastCall = 0;
let pumping = false;
const GAP = 400;
function schedule(fn, prio = 1) {
  return new Promise((resolve, reject) => {
    queue[prio].push({ fn, resolve, reject });
    pump();
  });
}
async function pump() {
  if (pumping) return;
  pumping = true;
  while (queue[0].length || queue[1].length) {
    const job = queue[0].shift() || queue[1].shift();
    const wait = lastCall + GAP - Date.now();
    if (wait > 0) await new Promise((r) => setTimeout(r, wait));
    lastCall = Date.now();
    try { job.resolve(await job.fn()); } catch (e) { job.reject(e); }
  }
  pumping = false;
}
async function wfm(pathname, { prio = 1, headers = {} } = {}) {
  return schedule(async () => {
    for (let attempt = 0; attempt < 3; attempt++) {
      const r = await fetch(WFM + pathname, { headers: { 'User-Agent': UA, Language: 'en', Platform: 'pc', Crossplay: 'true', ...headers } });
      if (r.status === 429) { await new Promise((x) => setTimeout(x, 2000 * (attempt + 1))); lastCall = Date.now(); continue; }
      if (!r.ok) throw new Error(`${pathname} -> ${r.status}`);
      return r.json();
    }
    throw new Error('rate limited');
  }, prio);
}

// ---------- precios (crawler en segundo plano)
let prices = { ...(pricesSeed || {}) };
try {
  if (fs.existsSync(PRICES_FILE)) {
    prices = { ...prices, ...JSON.parse(fs.readFileSync(PRICES_FILE, 'utf8')) };
  } else if (fs.existsSync(SEED_PRICES_FILE)) {
    prices = { ...prices, ...JSON.parse(fs.readFileSync(SEED_PRICES_FILE, 'utf8')) };
  }
} catch {}
const progress = { done: Object.keys(prices).length, total: Object.keys(prices).length, cycleStart: 0, running: false };

function summarize(top) {
  const sell = (top?.data?.sell || []).map((o) => o.platinum).sort((a, b) => a - b);
  const buy = (top?.data?.buy || []).map((o) => o.platinum).sort((a, b) => b - a);
  return { s: sell[0] ?? null, s3: sell[2] ?? sell[sell.length - 1] ?? null, b: buy[0] ?? null, n: sell.length, t: Date.now() };
}
async function crawl() {
  const file = path.join(PUB, 'data', 'crawl.json');
  if (!fs.existsSync(file)) { console.log('Falta public/data/crawl.json — ejecuta: npm run build-data'); return; }
  const c = JSON.parse(fs.readFileSync(file, 'utf8'));
  const order = [...new Set([...c.primeSets, ...c.primeParts, ...c.arcanes, ...c.mods])];
  progress.total = order.length; progress.done = 0; progress.running = true; progress.cycleStart = Date.now();
  let sinceSave = 0;
  for (const slug of order) {
    const p = prices[slug];
    if (p && Date.now() - p.t < 20 * 60e3) { progress.done++; continue; }
    try { prices[slug] = summarize(await wfm(`/v2/orders/item/${slug}/top`, { prio: 1 })); }
    catch (e) { if (!prices[slug]) prices[slug] = { s: null, b: null, n: 0, t: Date.now() - 15 * 60e3 }; }
    progress.done++;
    if (++sinceSave >= 30) { sinceSave = 0; fs.writeFileSync(PRICES_FILE, JSON.stringify(prices)); }
  }
  fs.writeFileSync(PRICES_FILE, JSON.stringify(prices));
  progress.running = false;
}
if (!process.env.VERCEL) {
  (async function loop() {
    for (;;) {
      try { await crawl(); } catch (e) { console.error('crawl error', e.message); }
      await new Promise((r) => setTimeout(r, 5 * 60e3));
    }
  })();
}

// ---------- caché simple para endpoints on-demand
const memo = new Map();
async function cached(key, ttl, fn) {
  const hit = memo.get(key);
  if (hit && Date.now() - hit.t < ttl) return hit.v;
  const v = await fn();
  memo.set(key, { v, t: Date.now() });
  return v;
}

async function rivenAuctions(slug) {
  return cached('riven:' + slug, 5 * 60e3, async () => {
    const j = await wfm(`/v1/auctions/search?type=riven&weapon_url_name=${encodeURIComponent(slug)}&sort_by=price_asc&buyout_policy=with`, { prio: 0, headers: {} });
    const list = (j.payload?.auctions || [])
      .filter((a) => a.buyout_price && !a.closed && a.visible)
      .slice(0, 120)
      .map((a) => ({
        p: a.buyout_price, name: a.item.name, pol: a.item.polarity, mr: a.item.mastery_level, rr: a.item.re_rolls, rank: a.item.mod_rank,
        a: a.item.attributes.map((x) => ({ u: x.url_name, v: x.value, pos: x.positive })),
        o: a.owner?.ingame_name, st: a.owner?.status,
      }));
    return list;
  });
}
async function itemOrders(slug) {
  return cached('orders:' + slug, 2 * 60e3, async () => {
    const j = await wfm(`/v2/orders/item/${encodeURIComponent(slug)}/top`, { prio: 0 });
    const pick = (o) => ({ p: o.platinum, q: o.quantity, u: o.user?.ingameName, st: o.user?.status, rep: o.user?.reputation, rank: o.rank });
    const out = { sell: (j.data?.sell || []).map(pick), buy: (j.data?.buy || []).map(pick) };
    prices[slug] = summarize(j);
    return out;
  });
}

let arbySchedule = null;
try {
  const arbyFile = fs.existsSync(path.join(PUB, 'data', 'arbitration_schedule.json'))
    ? path.join(PUB, 'data', 'arbitration_schedule.json')
    : path.join(ROOT, 'data', 'arbitration_schedule.json');
  arbySchedule = JSON.parse(fs.readFileSync(arbyFile, 'utf8'));
} catch (e) {
  console.log('No arbitration schedule found');
}

function resolveArbitration() {
  const nowSec = Math.floor(Date.now() / 1000);
  const hourSec = nowSec - (nowSec % 3600);
  const expirySec = hourSec + 3600;
  const match = arbySchedule ? arbySchedule[hourSec] : null;

  return {
    node: match?.node || 'Mapa Estelar',
    type: match?.type || 'Misión Infinita',
    enemy: match?.enemy || 'Enemigos',
    activation: new Date(hourSec * 1000).toISOString(),
    expiry: new Date(expirySec * 1000).toISOString(),
    expired: false,
    resolved: !!match,
  };
}

async function worldState() {
  return cached('worldstate:pc', 15e3, async () => {
    const headers = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
      'Accept': 'application/json'
    };
    let r;
    try {
      r = await fetch('https://api.warframestat.us/pc?language=es', { headers, signal: AbortSignal.timeout(8000) });
    } catch {
      r = await fetch('https://api.warframestat.us/pc', { headers, signal: AbortSignal.timeout(8000) });
    }
    if (!r.ok) throw new Error('Status API: ' + r.status);
    const data = await r.json();

    // Si la API pública devuelve SolNode000 o vacío, inyectamos la misión real calculada:
    if (!data.arbitration || data.arbitration.node === 'SolNode000' || data.arbitration.expired) {
      data.arbitration = resolveArbitration();
    }
    return data;
  });
}

const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.ico': 'image/x-icon' };
const send = (res, code, body, type = 'application/json; charset=utf-8', extra = {}) => { res.writeHead(code, { 'Content-Type': type, ...extra }); res.end(typeof body === 'string' || Buffer.isBuffer(body) ? body : JSON.stringify(body)); };

export default async function handler(req, res) {
  const rawPath = req.headers?.['x-matched-path'] || req.url || '';
  const url = new URL(rawPath.startsWith('http') ? rawPath : 'http://x' + (rawPath.startsWith('/') ? '' : '/') + rawPath);
  try {
    if (url.pathname.includes('/prices')) return send(res, 200, { progress, prices }, undefined, { 'Cache-Control': 'no-cache' });
    if (url.pathname.includes('/worldstate')) return send(res, 200, await worldState(), undefined, { 'Cache-Control': 'no-cache' });
    let m;
    if ((m = url.pathname.match(/\/riven\/([\w-]+)$/))) return send(res, 200, await rivenAuctions(m[1]));
    if ((m = url.pathname.match(/\/orders\/([\w-]+)$/))) return send(res, 200, await itemOrders(m[1]));

    let file = path.normalize(path.join(ROOT, decodeURIComponent(url.pathname)));
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
    if (!fs.existsSync(file)) file = path.join(PUB, 'index.html');
    if (!fs.existsSync(file)) file = path.join(ROOT, 'index.html');
    if (fs.existsSync(file)) {
      return send(res, 200, fs.readFileSync(file), MIME[path.extname(file)] || 'text/html; charset=utf-8', { 'Cache-Control': 'no-cache' });
    }

    send(res, 404, 'Not Found', 'text/plain');
  } catch (e) {
    send(res, 502, { error: e.message });
  }
}

if (!process.env.VERCEL && !process.env.NOW_REGION) {
  http.createServer(handler).listen(PORT, () => console.log(`Warframe Utility en http://localhost:${PORT}`));
}

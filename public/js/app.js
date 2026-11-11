import { $, D, P } from './util.js';
import './ui.js';
import * as V1 from './views1.js';
import * as V2 from './views2.js';
import { worldStateView } from './viewStatus.js';

const ROUTES = {
  '': V1.home,
  primes: V1.primes,
  status: worldStateView,
  arcanes: V1.arcanes,
  mods: V1.mods,
  tiers: V2.tiers,
  builds: V2.builds,
  farm: V2.farm,
  warframes: V2.warframes,
  rivens: V2.rivens,
};
let refresh = null;
const view = $('#view');

async function loadData() {
  const files = {
    mk: 'market',
    cat: 'catalog',
    relics: 'relics',
    primes: 'primes',
    frames: 'warframes',
    arcanes: 'arcanes',
    mods: 'mods',
    res: 'resources',
    relicfarm: 'relicfarm',
    rivens: 'rivens',
    modimg: 'modimg',
    i18n: 'i18n',
    arbySchedule: 'arbitration_schedule'
  };
  await Promise.all(Object.entries(files).map(async ([k, f]) => {
    try {
      D[k] = await (await fetch(`/data/${f}.json`)).json();
    } catch {
      D[k] = {};
    }
  }));
}

async function loadPrices() {
  try {
    const j = await (await fetch('/api/prices')).json();
    if (j.prices && Object.keys(j.prices).length > 0) {
      P.prices = j.prices;
      P.progress = j.progress;
      return true;
    }
  } catch {}
  try {
    const p = await (await fetch('/data/prices_seed.json')).json();
    P.prices = p;
    P.progress = { done: Object.keys(p).length, total: Object.keys(p).length, running: false };
    return true;
  } catch {}
  return false;
}

function route() {
  const h = (location.hash.replace(/^#\/?/, '') || '').split('/')[0];
  const fn = ROUTES[h] || ROUTES[''];
  document.querySelectorAll('nav a').forEach((a) => a.classList.toggle('active', a.getAttribute('href') === `#/${h}`));
  const el = document.createElement('div');
  view.replaceChildren(el);
  refresh = fn(el) || null;
  scrollTo(0, 0);
}

async function boot() {
  try {
    await Promise.all([loadData(), loadPrices()]);
  } catch (e) {
    view.innerHTML = `<div class="notice">No se pudieron cargar los datos (${e.message}). Ejecuta <code>npm run build-data</code> y reinicia el servidor.</div>`;
    return;
  }
  route();
  addEventListener('hashchange', route);
  setInterval(async () => {
    if (document.hidden || document.querySelector('.modal-back')) return;
    const before = P.progress.done;
    if (await loadPrices() && refresh && (P.progress.running || P.progress.done !== before) && !document.activeElement?.matches('input,select')) {
      refresh();
    }
  }, 20000);
}
boot();

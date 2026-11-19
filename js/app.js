import { $, D, P } from './util.js';
import './ui.js';
import * as V1 from './views1.js?v=22.0';
import * as V2 from './views2.js?v=22.0';
import { worldStateView, fetchWorldState } from './viewStatus.js?v=22.0';
import { tennoToolsMainView, initGlobalSearch, checkBackgroundNotifications } from './tennoTools.js?v=22.0';

// Gestión del Tema Claro / Oscuro
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const btn = $('#theme-toggle-btn');
  if (btn) {
    btn.innerHTML = theme === 'light' ? '🌙 Modo Oscuro' : '☀️ Modo Claro';
  }
}

function initTheme() {
  const saved = localStorage.getItem('wf_theme') || 'light';
  applyTheme(saved);

  document.addEventListener('click', (e) => {
    if (e.target.closest('#theme-toggle-btn')) {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      const next = current === 'light' ? 'dark' : 'light';
      applyTheme(next);
      localStorage.setItem('wf_theme', next);
    }
  });
}

const ROUTES = {
  '': V1.home,
  primes: V1.primes,
  status: worldStateView,
  tools: tennoToolsMainView,
  mastery: (root) => tennoToolsMainView(root, 'mastery'),
  arcanes: V1.arcanes,
  mods: V1.mods,
  tiers: V2.tiers,
  builds: V2.builds,
  farm: V2.farm,
  plat: V2.platGuide,
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
  const h = (location.hash.replace(/^#\/?/, '') || '').split('/')[0].split('?')[0];
  const fn = ROUTES[h] || ROUTES[''];
  document.querySelectorAll('nav a').forEach((a) => {
    const href = a.getAttribute('href');
    a.classList.toggle('active', href === `#/${h}` || href?.startsWith(`#/${h}?`));
  });
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
  initTheme();
  initGlobalSearch();
  route();
  addEventListener('hashchange', route);

  // Monitoreo de notificaciones en tiempo real en segundo plano
  fetchWorldState().then(ws => checkBackgroundNotifications(ws)).catch(() => {});
  setInterval(() => {
    fetchWorldState().then(ws => checkBackgroundNotifications(ws)).catch(() => {});
  }, 60000);

  setInterval(async () => {
    if (document.hidden || document.querySelector('.modal-back')) return;
    const before = P.progress.done;
    if (await loadPrices() && refresh && (P.progress.running || P.progress.done !== before) && !document.activeElement?.matches('input,select')) {
      refresh();
    }
  }, 20000);
}
boot();

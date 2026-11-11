// Utilidades compartidas con soporte i18n español
import { PLANET_ES, MODE_ES as MODES, RARITY_ES as RARITIES, TYPE_ES, translatePart, translateNode } from './lang.js';

export const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
export const $ = (sel, root = document) => root.querySelector(sel);
export const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

export const D = {}; // datos cargados (incluye D.i18n)
export const P = { prices: {}, progress: { done: 0, total: 0, running: false } };

// Función de traducción oficial al español
export function t(key, fallback) {
  if (!key) return fallback || '';
  const str = String(key);
  if (D.i18n) {
    if (D.i18n['slug:' + str]) return D.i18n['slug:' + str];
    const low = str.toLowerCase();
    if (D.i18n['name:' + low]) return D.i18n['name:' + low];
  }
  return translatePart(fallback || str, (s) => (D.i18n ? D.i18n['name:' + s.toLowerCase()] : null));
}

const WFM_IMG = 'https://warframe.market/static/assets/';
const CDN_IMG = 'https://cdn.warframestat.us/img/';
export const imgM = (p) => (p ? WFM_IMG + p : '');
export const imgC = (n) => (n ? CDN_IMG + n : '');
export const img = (src, cls = '', alt = '') =>
  src ? `<img class="${cls}" src="${esc(src)}" alt="${esc(alt)}" loading="lazy" onerror="this.style.visibility='hidden'">` : `<span class="${cls} noimg"></span>`;

export function modImg(name) {
  const m = D.modimg[name.toLowerCase()];
  if (!m) return '';
  return m.i ? imgM(m.i) : imgC(m.w);
}
export const slugImg = (slug) => (slug && D.mk[slug] ? imgM(D.mk[slug].i) : '');

export const fmt = (n) => (n == null ? '—' : Number(n).toLocaleString('es-AR'));
export const price = (slug) => P.prices[slug]?.s ?? null;
export function plat(n, cls = '') {
  if (n == null) return `<span class="plat none ${cls}">sin datos</span>`;
  return `<span class="plat ${cls}"><b>${fmt(n)}</b><i class="coin"></i></span>`;
}
export const platBtn = (slug, n, label = '') =>
  slug ? `<button class="plat-btn" data-act="orders" data-slug="${esc(slug)}" title="Ver vendedores en warframe.market">${plat(n)}${label}</button>` : plat(n);

export const RARITY_CLASS = { Common: 'common', Uncommon: 'uncommon', Rare: 'rare', Legendary: 'legendary' };
export const rar = (r) => `<span class="rar ${RARITY_CLASS[r] || ''}">${RARITIES[r] || esc(r || '')}</span>`;

export function chance(c) {
  if (c == null) return '';
  return c >= 10 ? Math.round(c * 10) / 10 + '%' : (Math.round(c * 100) / 100) + '%';
}

export function srcLine(s) {
  const mode = s.mode ? ` (${MODES[s.mode] || s.mode}${s.rot ? ' · rot. ' + s.rot : ''})` : s.rot ? ` · rot. ${s.rot}` : '';
  const kind = { M: '🎯', T: '🎯', S: '🏆', K: '🗝️', B: '📜', E: '☠️', V: '🏛️' }[s.t] || '•';
  const nodeName = translateNode(s.w);
  return `<li><span class="k">${kind}</span><span class="w">${esc(nodeName)}${esc(mode)}${s.q ? ` <em>×${esc(s.q)}</em>` : ''}${s.x ? ` <small>${esc(s.x)}</small>` : ''}</span><span class="c">${chance(s.c)}</span></li>`;
}
export const srcList = (list) => (list?.length ? `<ul class="srcs">${list.map(srcLine).join('')}</ul>` : '');

export function debounce(fn, ms = 200) {
  let t;
  return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); };
}
export const norm = (s) => String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

export const wikiLink = (name) => D.cat[name]?.wiki || `https://wiki.warframe.com/w/${encodeURIComponent(name.replace(/ /g, '_'))}`;
export const overframeSearch = (name) => `https://www.google.com/search?q=${encodeURIComponent('overframe warframe ' + name + ' best build')}`;

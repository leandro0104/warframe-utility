import { $, esc, D, imgM, img, fmt, plat, chance, rar, slugImg, imgC, srcList, modImg, P } from './util.js';

export function openModal(html, cls = '') {
  closeModal();
  const m = document.createElement('div');
  m.className = 'modal-back';
  m.innerHTML = `<div class="modal ${cls}" role="dialog"><button class="modal-x" data-act="close" aria-label="Cerrar">✕</button>${html}</div>`;
  m.addEventListener('click', (e) => { if (e.target === m) closeModal(); });
  document.body.appendChild(m);
  document.body.classList.add('noscroll');
}
export function closeModal() {
  $('.modal-back')?.remove();
  document.body.classList.remove('noscroll');
}
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

// ---- Modal de vendedores (warframe.market)
export async function showOrders(slug) {
  const it = D.mk[slug];
  const name = it?.n || slug;
  openModal(`<div class="m-head">${img(slugImg(slug), 'm-img', name)}<div><h2>${esc(name)}</h2><p class="muted">Cargando ofertas de warframe.market…</p></div></div>`);
  try {
    const r = await fetch(`/api/orders/${slug}`);
    if (!r.ok) throw new Error(r.status);
    const o = await r.json();
    const row = (x, type) => {
      const msg = type === 'sell'
        ? `/w ${x.u} Hi! I want to buy: "${name}" for ${x.p} platinum. (warframe.market)`
        : `/w ${x.u} Hi! I want to sell: "${name}" for ${x.p} platinum. (warframe.market)`;
      return `<tr><td>${plat(x.p)}</td><td>${x.rank != null ? 'R' + x.rank : ''}</td><td>x${x.q}</td><td><span class="dot ${esc(x.st)}"></span>${esc(x.u)}</td><td><button class="mini" data-act="copy" data-text="${esc(msg)}">Copiar /w</button></td></tr>`;
    };
    const wm = `https://warframe.market/items/${slug}`;
    openModal(`<div class="m-head">${img(slugImg(slug), 'm-img', name)}<div><h2>${esc(name)}</h2><p class="muted">Ofertas más baratas de jugadores conectados · <a target="_blank" rel="noopener" href="${wm}">abrir en warframe.market ↗</a></p></div></div>
      <h3>🟢 Vendedores</h3><table class="tbl"><thead><tr><th>Precio</th><th>Rango</th><th>Cant.</th><th>Jugador</th><th></th></tr></thead><tbody>${o.sell.map((x) => row(x, 'sell')).join('') || '<tr><td colspan=5>Sin vendedores</td></tr>'}</tbody></table>
      <h3>🔵 Compradores</h3><table class="tbl"><thead><tr><th>Precio</th><th>Rango</th><th>Cant.</th><th>Jugador</th><th></th></tr></thead><tbody>${o.buy.map((x) => row(x, 'buy')).join('') || '<tr><td colspan=5>Sin compradores</td></tr>'}</tbody></table>`);
  } catch (e) {
    openModal(`<div class="m-head"><div><h2>${esc(name)}</h2><p class="muted">No se pudo cargar (${esc(e.message)}). Reintentá en unos segundos.</p></div></div>`);
  }
}

// ---- Modal de reliquia
export function showRelic(key) {
  const r = D.relics[key];
  if (!r) return;
  const farm = D.relicfarm[r.t] || [];
  const rewards = r.r.map(([n, rr, ch, slug]) => {
    const p = slug ? P.prices[slug]?.s : null;
    return `<li class="rew ${rr?.toLowerCase()}">${img(slugImg(slug), 'ri', n)}<span class="n">${esc(n)}</span>${rar(rr)}<span class="c">${chance(ch)}</span>${slug ? plat(p) : ''}</li>`;
  }).join('');
  openModal(`<div class="m-head"><div class="relic-ico ${r.t}">${esc(r.t)}</div><div><h2>${esc(key)} ${r.av ? '' : '<span class="badge vault">Vaulted</span>'}</h2><p class="muted">Recompensas con la reliquia Intacta (sin refinar)</p></div></div>
    <ul class="rewlist">${rewards}</ul>
    ${r.loc.length ? `<h3>Dónde cae esta reliquia</h3>${srcList(r.loc)}` : ''}
    <h3>Mejores nodos para conseguir reliquias ${esc(r.t)}</h3>
    <p class="muted small">Suma de probabilidades de reliquias ${esc(r.t)} por rotación; ≈100% = al menos una casi asegurada (tu reliquia concreta es una entre varias).</p>
    <ul class="srcs">${farm.slice(0, 8).map((f) => `<li><span class="k">🎯</span><span class="w">${esc(f.w)} (${esc(f.mode)}${f.rot ? ' · rot. ' + esc(f.rot) : ''}) <small>${f.n} reliquias distintas</small></span><span class="c">${f.c}%</span></li>`).join('')}</ul>`, 'wide');
}

document.addEventListener('click', (e) => {
  const t = e.target.closest('[data-act]');
  if (!t) return;
  const a = t.dataset.act;
  if (a === 'close') closeModal();
  else if (a === 'orders') showOrders(t.dataset.slug);
  else if (a === 'relic') showRelic(t.dataset.relic);
  else if (a === 'copy') {
    navigator.clipboard?.writeText(t.dataset.text);
    t.textContent = '¡Copiado!';
    setTimeout(() => (t.textContent = 'Copiar /w'), 1200);
  }
});


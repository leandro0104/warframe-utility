import { $, $$, esc, D, P, img, imgM, imgC, fmt, plat, platBtn, price, chance, rar, slugImg, srcList, modImg, debounce, norm, t } from './util.js';
import { TYPE_ES, translateLocation } from './lang.js';
import { formatCountdown, fetchWorldState } from './viewStatus.js';

const relicChip = (r) => `<button class="chip relic ${r.rar?.toLowerCase()}" data-act="relic" data-relic="${esc(r.id)}" title="${esc(r.id)} · ${esc(r.rar)} · ${chance(r.ch)}${r.av ? '' : ' · vaulted'}">${esc(r.id)}<small>${chance(r.ch)}</small></button>`;

function partImg(p, set) {
  return slugImg(p.slug) || (set.img ? imgC(set.img) : '');
}
const setImg = (s) => slugImg(s.slug) || (s.img ? imgC(s.img) : '');

function priceStatus() {
  const { done, total, running } = P.progress;
  if (!total) return '';
  const pct = Math.round((done / total) * 100);
  return running && pct < 100
    ? `<div class="notice">⏳ Cargando precios en vivo de warframe.market… <b>${pct}%</b> (${done}/${total}). Se actualizan solos.<div class="bar"><span style="width:${pct}%"></span></div></div>`
    : '';
}

// ========================= PRIME SETS / PARTES =========================
export function primes(root) {
  const S = { tab: 'sets', type: 'all', vault: 'all', q: '', sort: 'price' };
  root.innerHTML = `
    <section class="page-head"><h1>💎 Partes Prime que más valen</h1>
      <p>Precio mínimo actual en warframe.market con nombres en español, reliquias que las dropean (con probabilidad y rareza) y dónde farmearlas. Tocá una reliquia para ver su contenido y mejores nodos; tocá un precio para ver vendedores en vivo.</p></section>
    <div class="status"></div>
    <div class="toolbar">
      <div class="seg" data-k="tab"><button data-v="sets" class="on">Sets completos</button><button data-v="parts">Piezas sueltas</button></div>
      <select data-k="type"><option value="all">Todo tipo</option><option value="warframe">Warframes</option><option value="weapon">Armas</option><option value="companion">Compañeros</option><option value="archwing">Archwing</option></select>
      <select data-k="vault"><option value="all">Vaulted y disponibles</option><option value="vaulted">Solo vaulted 🔒</option><option value="av">Solo disponibles</option></select>
      <select data-k="sort"><option value="price">Mayor precio</option><option value="ducats">Más ducados</option><option value="ratio">Mejor ducados/plat</option></select>
      <input type="search" data-k="q" placeholder="Buscar en español o inglés (ej. Saryn, Rhino, Cedo…)">
    </div>
    <div class="results"></div>`;

  const setPrice = (s) => (s.slug ? price(s.slug) : null);
  const partsSum = (s) => s.parts.reduce((a, p) => a + (price(p.slug) || 0), 0);

  function draw() {
    $('.status', root).innerHTML = priceStatus();
    const q = norm(S.q);
    let list = D.primes.filter((s) => {
      const matchType = (S.type === 'all' || s.type === S.type);
      if (!matchType) return false;
      if (!q) return true;
      const sEs = norm(t(s.set, s.set));
      const sEn = norm(s.set);
      return sEs.includes(q) || sEn.includes(q) || s.parts.some((p) => {
        const pEs = norm(t(p.name, p.name));
        return pEs.includes(q) || norm(p.name).includes(q);
      });
    });

    if (S.vault === 'vaulted') list = list.filter((s) => s.vaulted);
    if (S.vault === 'av') list = list.filter((s) => !s.vaulted);
    const res = $('.results', root);

    if (S.tab === 'sets') {
      list.sort((a, b) => S.sort === 'ducats' ? (b.parts.reduce((x, p) => x + (p.d || 0), 0) - a.parts.reduce((x, p) => x + (p.d || 0), 0)) : ((setPrice(b) ?? partsSum(b)) - (setPrice(a) ?? partsSum(a))));
      res.innerHTML = `<div class="grid cards">${list.slice(0, 80).map(setCard).join('')}</div>${list.length > 80 ? '<p class="muted center">Mostrando 80 — usa el buscador para filtrar.</p>' : ''}`;
    } else {
      let parts = [];
      for (const s of list) for (const p of s.parts) parts.push({ s, p, pr: price(p.slug) });
      if (q) parts = parts.filter((x) => norm(t(x.p.name, x.p.name)).includes(q) || norm(x.p.name).includes(q) || norm(t(x.s.set, x.s.set)).includes(q));
      const ratio = (x) => (x.pr ? (x.p.d || 0) / x.pr : 0);
      parts.sort((a, b) => S.sort === 'ducats' ? (b.p.d || 0) - (a.p.d || 0) : S.sort === 'ratio' ? ratio(b) - ratio(a) : (b.pr ?? -1) - (a.pr ?? -1));
      res.innerHTML = `<table class="tbl big"><thead><tr><th></th><th>Pieza (Español)</th><th>Precio</th><th>Ducados</th><th>Reliquias (mejor probabilidad primero)</th></tr></thead><tbody>${parts.slice(0, 150).map(({ s, p, pr }) => `<tr>
        <td>${img(partImg(p, s), 'ti', p.name)}</td>
        <td><b>${esc(t(p.name, p.name))}</b> ${s.vaulted ? '<span class="badge vault">Vaulted</span>' : ''}<br><small class="muted">${esc(t(s.set, s.set))}</small></td>
        <td>${platBtn(p.slug, pr)}</td><td>${p.d ? `<span class="duc">${p.d}</span>` : '—'}</td>
        <td class="chips">${p.relics.slice(0, 6).map(relicChip).join('')}</td></tr>`).join('')}</tbody></table>`;
    }
  }

  function setCard(s) {
    const sp = setPrice(s);
    const sum = partsSum(s);
    const setNameEs = t(s.set, s.set);
    return `<article class="card prime ${s.vaulted ? 'is-vaulted' : ''}">
      <header>${img(setImg(s), 'big-img', s.set)}<div><h3>${esc(setNameEs)}</h3>
        <div class="meta">${s.vaulted ? '<span class="badge vault">🔒 Vaulted</span>' : '<span class="badge ok">Disponible</span>'}<span class="badge type">${esc(TYPE_ES[s.type] || s.type)}</span></div></div>
        <div class="price-col"><small>Set</small>${platBtn(s.slug, sp)}${sum ? `<small class="muted">piezas: ${fmt(sum)}p</small>` : ''}</div></header>
      <ul class="parts">${s.parts.slice().sort((a, b) => (price(b.slug) ?? -1) - (price(a.slug) ?? -1)).map((p) => `<li>
        ${img(partImg(p, s), 'pi', p.name)}<div class="pn"><b>${esc(t(p.name, p.name))}</b>
        <div class="chips">${p.relics.slice(0, 5).map(relicChip).join('')}</div></div>
        <div class="pp">${platBtn(p.slug, price(p.slug))}${p.d ? `<span class="duc">${p.d}</span>` : ''}</div></li>`).join('')}</ul>
    </article>`;
  }

  root.addEventListener('input', debounce((e) => { const k = e.target.dataset.k; if (k) { S[k] = e.target.value; draw(); } }, 150));
  root.addEventListener('click', (e) => {
    const b = e.target.closest('.seg button');
    if (!b) return;
    S[b.parentElement.dataset.k] = b.dataset.v;
    $$('button', b.parentElement).forEach((x) => x.classList.toggle('on', x === b));
    draw();
  });
  draw();
  return draw;
}

// ========================= ARCANOS =========================
export function arcanes(root) {
  const S = { q: '', type: 'all', sort: 'price' };
  const types = [...new Set(D.arcanes.map((a) => a.type))].sort();
  root.innerHTML = `
    <section class="page-head"><h1>🔮 Arcanos</h1>
      <p>Nombres y descripciones en español. Consulta cómo conseguir cada arcano: probabilidad de drop, enemigo o jefe que lo suelta y precio de venta actual en platino.</p></section>
    <div class="status"></div>
    <div class="toolbar">
      <select data-k="type"><option value="all">Todos los tipos</option>${types.map((typeKey) => `<option value="${esc(typeKey)}">${esc(TYPE_ES[typeKey] || typeKey)}</option>`).join('')}</select>
      <select data-k="sort"><option value="price">Mayor precio</option><option value="name">Nombre</option></select>
      <input type="search" data-k="q" placeholder="Buscar arcano en español (ej. Energizar, Gracia, Furia…)">
    </div><div class="results"></div>`;

  function draw() {
    $('.status', root).innerHTML = priceStatus();
    const q = norm(S.q);
    let list = D.arcanes.filter((a) => {
      if (S.type !== 'all' && a.type !== S.type) return false;
      if (!q) return true;
      const esName = norm(t(a.name, a.name));
      return esName.includes(q) || norm(a.name).includes(q);
    });
    list.sort((a, b) => S.sort === 'name' ? t(a.name, a.name).localeCompare(t(b.name, b.name)) : (price(b.slug) ?? -1) - (price(a.slug) ?? -1));
    $('.results', root).innerHTML = `<div class="grid cards">${list.slice(0, 90).map((a) => {
      const nameEs = t(a.name, a.name);
      return `<article class="card arcane">
      <header>${img(slugImg(a.slug) || imgC(a.img), 'big-img', a.name)}<div><h3>${esc(nameEs)}</h3><div class="meta">${rar(a.rarity)}<span class="badge type">${esc(TYPE_ES[a.type] || a.type)}</span></div></div>
      <div class="price-col"><small>Precio</small>${platBtn(a.slug, price(a.slug))}</div></header>
      ${a.effect ? `<p class="effect">${esc(a.effect)}</p>` : ''}
      <h4>Dónde conseguirlo</h4>
      ${a.drops.length ? `<ul class="srcs">${a.drops.slice(0, 5).map((d) => `<li><span class="k">☠️</span><span class="w">${esc(translateLocation(d.l))}</span><span class="c">${chance(d.c)}</span></li>`).join('')}</ul>` : '<p class="muted small">Sin tabla de drop directa (se compra con Vosfor en Necralisk, sindicatos o eventos). Ver wiki.</p>'}
    </article>`;
    }).join('')}</div>`;
  }
  root.addEventListener('input', debounce((e) => { const k = e.target.dataset.k; if (k) { S[k] = e.target.value; draw(); } }, 150));
  draw();
  return draw;
}

// ========================= MODS =========================
export function mods(root) {
  const S = { q: '', rarity: 'all', type: 'all', view: 'grid' };
  const types = [...new Set(D.mods.map((m) => m.type))].filter(Boolean).sort();
  root.innerHTML = `
    <section class="page-head"><h1>🪙 Mejores mods para vender por platino</h1>
      <p>Cartas de mods en <b>alta resolución HD</b> y en español (Sierra, Flujo Prime, Acondicionamiento de sobrecarga, etc.). Descubre cuáles se pagan más caro en warframe.market y dónde farmearlos.</p></section>
    <div class="status"></div>
    <div class="toolbar">
      <div class="seg" id="modviewseg">
        <button data-v="grid" class="on">🎴 Cuadrícula Grande</button>
        <button data-v="table">📋 Tabla</button>
      </div>
      <select data-k="rarity"><option value="all">Toda rareza</option><option value="Rare">Raro</option><option value="Legendary">Legendario</option></select>
      <select data-k="type"><option value="all">Todo tipo</option>${types.map((typeKey) => `<option value="${esc(typeKey)}">${esc(TYPE_ES[typeKey] || typeKey)}</option>`).join('')}</select>
      <input type="search" data-k="q" placeholder="Buscar mod en español o inglés…">
    </div><div class="results"></div>`;

  function draw() {
    $('.status', root).innerHTML = priceStatus();
    const q = norm(S.q);
    
    // Filtrar por rareza, tipo y término de búsqueda
    let list = D.mods.filter((m) => {
      if (S.rarity !== 'all' && m.rarity !== S.rarity) return false;
      if (S.type !== 'all' && m.type !== S.type) return false;
      if (!q) return true;
      const mEs = norm(t(m.name, m.name));
      return mEs.includes(q) || norm(m.name).includes(q);
    });

    // Ordenar de mayor a menor precio; los que tienen precio van primero
    list.sort((a, b) => (price(b.slug) || 0) - (price(a.slug) || 0));

    const res = $('.results', root);
    if (!list.length) {
      res.innerHTML = '<p class="muted center">No se encontraron mods que coincidan con la búsqueda.</p>';
      return;
    }

    if (S.view === 'grid') {
      res.innerHTML = `<div class="grid mod-showcase-grid">${list.slice(0, 96).map((m, i) => {
        const nameEs = t(m.name, m.name);
        return `<article class="card mod-card-large ${(m.rarity || '').toLowerCase()}">
          <div class="mod-poster-box">
            ${img(slugImg(m.slug) || imgC(m.img), 'mod-full-img', m.name)}
            <span class="mod-rank-badge">#${i + 1}</span>
          </div>
          <div class="mod-info">
            <h3 title="${esc(nameEs)} (${esc(m.name)})">${esc(nameEs)}</h3>
            <div class="meta">${rar(m.rarity)}<span class="badge type">${esc(TYPE_ES[m.type] || m.type || '')}</span></div>
            <div class="price-row"><span class="price-label">Precio mínimo:</span> ${platBtn(m.slug, price(m.slug))}</div>
            <div class="mod-drops">
              <b>Dónde dropea:</b>
              ${m.drops.length ? srcList(m.drops.slice(0, 2)) : '<p class="muted small">Jefe, evento, Baro Ki\'Teer o arbitrajes.</p>'}
            </div>
          </div>
        </article>`;
      }).join('')}</div>`;
    } else {
      res.innerHTML = `<table class="tbl big mod-table"><thead><tr><th>#</th><th>Mod HD</th><th>Nombre & Tipo</th><th>Precio</th><th>Dónde dropea</th></tr></thead><tbody>${list.slice(0, 120).map((m, i) => `<tr>
        <td class="muted">${i + 1}</td>
        <td class="mod-cell">${img(slugImg(m.slug) || imgC(m.img), 'mod-card-img', m.name)}</td>
        <td><b>${esc(t(m.name, m.name))}</b><br>${rar(m.rarity)} <small class="muted">${esc(TYPE_ES[m.type] || m.type || '')}</small></td>
        <td>${platBtn(m.slug, price(m.slug))}</td>
        <td>${m.drops.length ? srcList(m.drops.slice(0, 3)) : '<small class="muted">Jefe, evento, Baro Ki\'Teer o arbitrajes.</small>'}</td></tr>`).join('')}</tbody></table>`;
    }
  }

  root.addEventListener('input', debounce((e) => { const k = e.target.dataset.k; if (k) { S[k] = e.target.value; draw(); } }, 150));
  root.addEventListener('click', (e) => {
    const b = e.target.closest('#modviewseg button');
    if (b) {
      S.view = b.dataset.v;
      $$('#modviewseg button', root).forEach((x) => x.classList.toggle('on', x === b));
      draw();
    }
  });
  draw();
  return draw;
}

// ========================= HOME =========================
function drawHomeCascade(el, ws) {
  if (!ws || !ws.fissures) return;
  const now = Date.now();
  const activeFissures = (ws.fissures || []).filter((f) => f.expiry && new Date(f.expiry).getTime() > now);
  const isCascade = (f) => /cascade|cascada/i.test(f.missionType || '') || /cascade|cascada/i.test(f.missionTypeKey || '') || /tuvul/i.test(f.node || '');
  const spCascade = activeFissures.find((f) => isCascade(f) && f.isHard);
  const normalCascade = activeFissures.find((f) => isCascade(f) && !f.isHard);

  if (spCascade) {
    el.innerHTML = `
      <a href="#/status" class="featured-mission-card cascade-active" style="text-decoration:none; color:inherit; display:flex;">
        <div class="sb-icon">🔥</div>
        <div class="sb-info">
          <div class="sb-tag-row">
            <span class="badge vault pulse-badge">⚡ ¡ACTIVA AHORA!</span>
            <span class="badge vault">⚔️ CAMINO DE ACERO (STEEL PATH)</span>
            <span class="relic-badge ${spCascade.tier}">${spCascade.tier}</span>
          </div>
          <h2>🌀 Cascada del Vacío: Camino de Acero</h2>
          <p><b>Nodo:</b> ${esc(spCascade.node)} · <b>Facción:</b> ${esc(spCascade.enemy)} · <b>Modo:</b> <span class="badge vault">Camino de Acero (+100 Lvl, +100% Drops)</span></p>
          <p class="small muted">¡El mejor método del juego para quemar reliquias a máxima velocidad, acumular Esencia de Acero y arcanos de Zariman!</p>
        </div>
        <div class="sb-timer-box">
          <span class="small muted">Tiempo restante:</span>
          <span class="countdown-large" data-expiry="${esc(spCascade.expiry)}">${formatCountdown(spCascade.expiry)}</span>
        </div>
      </a>
    `;
  } else if (normalCascade) {
    el.innerHTML = `
      <a href="#/status" class="featured-mission-card cascade-normal" style="text-decoration:none; color:inherit; display:flex;">
        <div class="sb-icon">🌀</div>
        <div class="sb-info">
          <div class="sb-tag-row">
            <span class="badge ok pulse-badge">⚡ ¡ACTIVA AHORA!</span>
            <span class="badge ok">🛡️ MODO NORMAL (ESTÁNDAR)</span>
            <span class="relic-badge ${normalCascade.tier}">${normalCascade.tier}</span>
          </div>
          <h2>🌀 Cascada del Vacío: Modo Normal</h2>
          <p><b>Nodo:</b> ${esc(normalCascade.node)} · <b>Facción:</b> ${esc(normalCascade.enemy)} · <b>Modo:</b> <span class="badge ok">Nivel Estándar (Sin modificadores de Acero)</span></p>
          <p class="small muted">Disponible en modo normal para abrir reliquias ${normalCascade.tier}. La variante de Camino de Acero está actualmente en espera.</p>
        </div>
        <div class="sb-timer-box">
          <span class="small muted">Tiempo restante:</span>
          <span class="countdown-large" data-expiry="${esc(normalCascade.expiry)}">${formatCountdown(normalCascade.expiry)}</span>
        </div>
      </a>
    `;
  } else {
    el.innerHTML = `
      <a href="#/status" class="featured-mission-card cascade-inactive" style="text-decoration:none; color:inherit; display:flex;">
        <div class="sb-icon">⏸️</div>
        <div class="sb-info">
          <div class="sb-tag-row">
            <span class="badge">ESTADO: EN ESPERA</span>
          </div>
          <h3>Cascada del Vacío (Zariman): Inactiva en este momento</h3>
          <p class="small muted">No hay fisura activa de Cascada del Vacío en Zariman en este momento. Toca aquí para ver todas las fisuras en vivo en Estado del Mundo.</p>
        </div>
      </a>
    `;
  }
}

export function home(root) {
  const cards = [
    ['#/primes', '💎', 'Partes Prime', 'Nombres en español, reliquias y precios'],
    ['#/status', '⚡', 'Estado en Vivo', 'Fisuras, Baro Ki\'Teer, ciclos y camino de acero'],
    ['#/farm', '📍', 'Dónde farmear', 'Células Orokin (+35% Gabii) y Sectores Oscuros'],
    ['#/tiers', '🏆', 'Tier lists', 'Warframes Prime, Cedo Prime, Bassocyst, etc.'],
    ['#/arcanes', '🔮', 'Arcanos', 'Drops, jefes y valor en platino'],
    ['#/mods', '🪙', 'Mods valiosos', 'Los mods más cotizados del mercado'],
    ['#/rivens', '🌀', 'Rivens (Agrietados)', 'Mejores stats, negativos y precios'],
    ['#/warframes', '🛡️', 'Conseguir Warframes', 'Probabilidad de piezas y reliquias'],
    ['#/builds', '🛠️', 'Builds', 'Top configuraciones de Warframe y arma'],
  ];
  root.innerHTML = `
    <section class="hero"><h1>WARFRAME <span>UTILITY</span></h1><p>Herramienta en español para Tenno: precios en vivo de warframe.market, tablas de drop oficiales, estado del mundo en tiempo real (Fisuras/Baro) y guías de farmeo.</p></section>
    
    <!-- ALERTA DESTACADA DE CASCADA DEL VACÍO EN EL INICIO -->
    <div id="home-cascade-highlight">
      <div class="featured-mission-card cascade-inactive" style="opacity:0.8">
        <div class="sb-icon">🌀</div>
        <div class="sb-info">
          <h3>Consultando estado de Cascada del Vacío en tiempo real…</h3>
          <p class="small muted">Verificando fisuras activas en Zariman y Camino de Acero...</p>
        </div>
      </div>
    </div>

    <div class="status"></div>
    <div class="grid tiles">${cards.map(([h, i, tTitle, d]) => `<a class="tile" href="${h}"><span class="ico">${i}</span><b>${tTitle}</b><small>${d}</small></a>`).join('')}</div>
    <div class="results"></div>`;

  fetchWorldState().then((ws) => {
    const box = $('#home-cascade-highlight', root);
    if (box && ws) drawHomeCascade(box, ws);
  }).catch(() => {});

  const homeTimer = setInterval(() => {
    if (!root.isConnected) { clearInterval(homeTimer); return; }
    $$('[data-expiry]', root).forEach((el) => {
      const exp = el.dataset.expiry;
      if (exp) el.textContent = formatCountdown(exp);
    });
  }, 1000);

  function draw() {
    $('.status', root).innerHTML = priceStatus();
    const topSets = D.primes.filter((s) => s.slug && price(s.slug) != null).sort((a, b) => price(b.slug) - price(a.slug)).slice(0, 8);
    const topArc = D.arcanes.filter((a) => a.slug && price(a.slug) != null).sort((a, b) => price(b.slug) - price(a.slug)).slice(0, 8);
    const topMods = D.mods.filter((m) => price(m.slug) != null).sort((a, b) => price(b.slug) - price(a.slug)).slice(0, 8);
    const strip = (title, link, items) => `<section class="strip"><div class="strip-h"><h2>${title}</h2><a href="${link}">Ver todo →</a></div><div class="mini-grid">${items.join('') || '<p class="muted">Cargando precios…</p>'}</div></section>`;
    const mini = (src, name, slug) => `<div class="mini-card">${img(src, 'mi', name)}<b>${esc(t(name, name))}</b>${platBtn(slug, price(slug))}</div>`;
    $('.results', root).innerHTML =
      strip('💎 Sets Prime más caros', '#/primes', topSets.map((s) => mini(setImg(s), s.set, s.slug))) +
      strip('🔮 Arcanos más cotizados', '#/arcanes', topArc.map((a) => mini(slugImg(a.slug) || imgC(a.img), a.name, a.slug))) +
      strip('🪙 Mods más caros', '#/mods', topMods.map((m) => mini(slugImg(m.slug) || imgC(m.img), m.name, m.slug)));
  }
  draw();
  return draw;
}

import { $, $$, esc, D, P, img, imgM, imgC, fmt, plat, platBtn, price, chance, rar, slugImg, srcList, srcLine, modImg, debounce, norm, wikiLink, overframeSearch, t } from './util.js';
import { openModal } from './ui.js';
import { TIERS, TIER_COLORS } from './tiers.js';
import { FRAME_BUILDS, WEAPON_BUILDS } from './builds.js';
import { DARK_SECTOR_SURVIVALS, RESOURCE_GUIDE } from './darksector.js';
import { TYPE_ES } from './lang.js';

const catImg = (name) => (D.cat[name] ? imgC(D.cat[name].img) : '');

// ========================= TIERS =========================
export function tiers(root) {
  const keys = Object.keys(TIERS);
  let cur = keys[0];
  root.innerHTML = `<section class="page-head"><h1>🏆 Tier lists de Warframe</h1><p>Rankings para Steel Path y misiones de nivel alto. Incluye <b>Warframes Prime</b>, armas meta (como Cedo Prime, Coda Bassocyst, Torid Incarnon, etc.) y compañeros. Los nombres se muestran en español.</p></section>
    <div class="seg wrap">${keys.map((k) => `<button data-k="${k}" class="${k === cur ? 'on' : ''}">${esc(TIERS[k].label)}</button>`).join('')}</div><div class="results"></div>`;

  function draw() {
    const g = TIERS[cur];
    $('.results', root).innerHTML = `<p class="muted">${esc(g.note)}</p><div class="tierlist">${Object.entries(g.tiers).map(([tierLetter, list]) => `
      <div class="tier-row"><div class="tier-label" style="background:${TIER_COLORS[tierLetter]}">${tierLetter}</div>
      <div class="tier-items">${list.map((name) => {
        const nameEs = t(name, name);
        return `<a class="titem" href="${esc(wikiLink(name))}" target="_blank" rel="noopener" title="${esc(nameEs)} (${esc(name)})">${img(catImg(name), 'tier-img', name)}<span>${esc(nameEs)}</span></a>`;
      }).join('')}</div></div>`).join('')}</div>`;
  }

  root.addEventListener('click', (e) => {
    const b = e.target.closest('.seg button');
    if (!b) return;
    cur = b.dataset.k;
    $$('.seg button', root).forEach((x) => x.classList.toggle('on', x === b));
    draw();
  });
  draw();
}

// ========================= BUILDS =========================
function modTile(name) {
  const m = D.modimg[name.toLowerCase()];
  const nameEs = t(name, name);
  return `<div class="modtile ${(m?.r || '').toLowerCase()}" title="${esc(nameEs)} (${esc(name)})">
    <div class="modtile-img-box">${img(modImg(name), 'mod-img', name)}</div>
    <span class="modtile-name">${esc(nameEs)}</span>
    ${m?.s && price(m.s) != null ? `<span class="modtile-price">${fmt(price(m.s))}p</span>` : ''}
  </div>`;
}

export function builds(root) {
  const S = { tab: 'frames', q: '' };
  root.innerHTML = `<section class="page-head"><h1>🛠️ Top builds</h1>
    <p>Builds de referencia con vista expandida y nítida de mods y arcanos en español. Haz clic sobre cualquier mod o imagen para ampliarla en detalle.</p></section>
    <div class="toolbar"><div class="seg"><button data-v="frames" class="on">Warframes</button><button data-v="weapons">Armas</button></div>
    <input type="search" placeholder="Buscar Warframe o arma en español…" data-k="q"></div><div class="results"></div>`;

  function draw() {
    const q = norm(S.q);
    const list = (S.tab === 'frames' ? FRAME_BUILDS : WEAPON_BUILDS).filter((x) => {
      if (!q) return true;
      const esName = norm(t(x.name, x.name));
      return esName.includes(q) || norm(x.name).includes(q);
    });

    const cards = list.map((x) => {
      const bs = x.builds || [x];
      const nameEs = t(x.name, x.name);
      const isPrimeAvail = D.cat[x.name + ' Prime'] ? x.name + ' Prime' : null;
      return bs.map((b) => `<article class="card build build-showcase">
        <header class="build-hero">
          <div class="build-avatar-box">
            ${img(catImg(x.name) || catImg(x.name + ' Prime'), 'build-avatar-img', x.name)}
          </div>
          <div class="build-title-area">
            <div class="meta">
              <span class="badge ${x.slot ? 'type' : 'ok'}">${x.slot ? esc(TYPE_ES[x.slot] || x.slot) : '⭐ Warframe Meta'}</span>
              ${isPrimeAvail ? `<span class="badge vault">Versión Prime disponible</span>` : ''}
              <span class="badge ok">${esc(b.role)}</span>
            </div>
            <h2>${esc(nameEs)}</h2>
            <h4 class="build-name-tag">Configuración: <span>${esc(b.name)}</span></h4>
          </div>
        </header>

        <div class="build-body">
          <div class="build-section-label">⚙️ Ranuras de Modificación (8 Mods) — Pasa el cursor para ampliar detalles</div>
          <div class="modgrid large">${b.mods.map(modTile).join('')}</div>

          <div class="build-section-label">🔮 Arcanos Recomendados</div>
          <div class="modgrid arc large">${b.arcanes.map(modTile).join('')}</div>

          <div class="build-strategy-box">
            <h4>💡 Estrategia de Combate & Estilo de Juego</h4>
            <p>${esc(b.notes)}</p>
          </div>
        </div>

        <footer>
          <a class="btn" target="_blank" rel="noopener" href="${overframeSearch(x.name)}">Ver más variantes en Overframe ↗</a>
          <a class="btn ghost" target="_blank" rel="noopener" href="${esc(wikiLink(x.name))}">Wiki Oficial ↗</a>
        </footer>
      </article>`).join('');
    }).join('');

    const extra = q && !list.length ? `<div class="notice">No hay build curada para “${esc(S.q)}”. <a target="_blank" rel="noopener" href="${overframeSearch(S.q)}">Buscar en Overframe ↗</a></div>` : '';
    $('.results', root).innerHTML = extra + `<div class="grid cards builds-container">${cards}</div>`;
  }

  root.addEventListener('input', debounce((e) => { if (e.target.dataset.k) { S.q = e.target.value; draw(); } }, 150));
  root.addEventListener('click', (e) => {
    const b = e.target.closest('.seg button');
    if (!b) return;
    S.tab = b.dataset.v;
    $$('.seg button', root).forEach((x) => x.classList.toggle('on', x === b));
    draw();
  });
  draw();
  return draw;
}

// ========================= FARM (recursos + Dark Sectors + reliquias) =========================
export function farm(root) {
  const resList = Array.isArray(D.res) ? D.res : [];
  let tab = 'res', cur = resList.find((r) => r.name === 'Orokin Cell') || resList[0] || { name: 'Orokin Cell', missions: [], enemies: [] }, tier = 'Lith';
  root.innerHTML = `<section class="page-head"><h1>📍 Dónde farmear (Supervivencia & Sectores Oscuros)</h1>
    <p>Lugares recomendados con <b>bonificación de recursos (+10% a +35%)</b>, facción de infestados y estrategias de escuadrón, además de las tablas oficiales de drops.</p></section>
    <div class="seg wrap" id="mainseg">
      <button data-v="res" class="on">Recursos & Guía de Supervivencia</button>
      <button data-v="darksectors">⭐ Nodos de Supervivencia con Bonus (+35%)</button>
      <button data-v="relic">Reliquias por era</button>
    </div>
    <div class="results"></div>`;

  function draw() {
    const res = $('.results', root);
    if (tab === 'darksectors') {
      res.innerHTML = `
        <article class="card wide">
          <header><div><h3>🔥 Sectores Oscuros (Dark Sector Survival) con Bonificación de Recursos</h3>
          <p class="muted">Las misiones de Sector Oscuro enfrentan oleadas constantes de Infestados y otorgan una <b>bonificación nativa de recursos</b> de hasta el +35% (aditiva con Potenciadores y Camino de Acero).</p></div></header>
          <table class="tbl big">
            <thead><tr><th>Planeta & Nodo</th><th>Bonus Drop</th><th>Facción</th><th>Recursos Clave</th><th>Consejos & Estrategia</th></tr></thead>
            <tbody>
              ${DARK_SECTOR_SURVIVALS.map((s) => `<tr>
                <td><b>${esc(s.planet)} · ${esc(s.node)}</b></td>
                <td><span class="badge ok"><b>${esc(s.bonus)}</b></span></td>
                <td>${esc(s.faction)}</td>
                <td><b>${s.keyDrops.map(d => `<span class="badge">${esc(d)}</span>`).join(' ')}</b></td>
                <td><small>${esc(s.tip)}</small></td>
              </tr>`).join('')}
            </tbody>
          </table>
        </article>`;
    } else if (tab === 'res') {
      const guide = cur?.name ? RESOURCE_GUIDE[cur.name] : null;
      const resNameEs = cur?.name ? t(cur.name, guide?.nameEs || cur.name) : 'Recurso';
      res.innerHTML = `
        <div class="reslist">${(Array.isArray(D.res) ? D.res : []).map((r) => {
          const rEs = t(r.name, r.name);
          return `<button class="resbtn ${r === cur ? 'on' : ''}" data-r="${esc(r.name)}">${img(r.mi ? imgM(r.mi) : imgC(r.img), 'ri', r.name)}<span>${esc(rEs)}</span></button>`;
        }).join('')}</div>

        ${guide ? `
        <article class="card wide highlight-farm">
          <header><div class="relic-ico Axi">⭐</div><div>
            <h3>Mejor punto de farmeo: ${esc(resNameEs)}</h3>
            <p><b>${esc(guide.best)}</b> — <span class="badge ok">${esc(guide.bonus)}</span></p>
          </div></header>
          <div class="two">
            <div>
              <h4>Estrategia & Escuadrón sugerido</h4>
              <p class="effect">${esc(guide.loadout)}</p>
              ${guide.steelPath ? `<p class="muted small"><b>Camino de Acero:</b> ${esc(guide.steelPath)}</p>` : ''}
            </div>
            <div>
              <h4>Alternativas de farmeo</h4>
              <p class="muted">${esc(guide.alt)}</p>
              <p class="small"><b>Facción:</b> ${esc(guide.faction)}</p>
            </div>
          </div>
        </article>` : ''}

        <article class="card wide">
          <header>${img(cur.mi ? imgM(cur.mi) : imgC(cur.img), 'big-img', cur.name)}<div><h3>${esc(resNameEs)} (${esc(cur.name)})</h3><p class="muted small">Otras fuentes según datos de drops oficiales</p></div></header>
          <div class="two">
            <div><h4>🎯 Misiones y alijos</h4>${(cur.missions || []).length ? srcList(cur.missions) : '<p class="muted small">Sin misiones en tablas de drops.</p>'}</div>
            <div><h4>☠️ Enemigos y contenedores</h4>${(cur.enemies || []).length ? srcList(cur.enemies) : '<p class="muted small">Sin enemigos en tablas de drops.</p>'}</div>
          </div>
        </article>`;
    } else {
      res.innerHTML = `<div class="seg wrap">${['Lith', 'Meso', 'Neo', 'Axi', 'Requiem'].map((tierKey) => `<button data-t="${tierKey}" class="${tierKey === tier ? 'on' : ''}">${tierKey}</button>`).join('')}</div>
      <article class="card wide"><header><div class="relic-ico ${tier}">${tier}</div><div><h3>Mejores nodos para reliquias ${tier}</h3><p class="muted small">Probabilidad acumulada de reliquias ${tier} por rotación (≈100% asegura prácticamente una reliquia en esa rotación).</p></div></header>
      <ul class="srcs">${(D.relicfarm[tier] || []).map((f) => `<li><span class="k">🎯</span><span class="w">${esc(f.w)} (${esc(f.mode)}${f.rot ? ' · rot. ' + esc(f.rot) : ''}) <small>${f.n} reliquias distintas</small></span><span class="c">${f.c}%</span></li>`).join('')}</ul></article>`;
    }
  }

  root.addEventListener('click', (e) => {
    const sb = e.target.closest('#mainseg button');
    if (sb) {
      tab = sb.dataset.v;
      $$('#mainseg button', root).forEach((x) => x.classList.toggle('on', x === sb));
      return draw();
    }
    const rb = e.target.closest('.resbtn');
    if (rb) {
      cur = (Array.isArray(D.res) ? D.res : []).find((r) => r.name === rb.dataset.r) || cur;
      return draw();
    }
    const tb = e.target.closest('[data-t]');
    if (tb) {
      tier = tb.dataset.t;
      draw();
    }
  });
  draw();
}

// ========================= WARFRAMES =========================
const FALLBACK = {
  Excalibur: 'Warframe inicial (se elige al comenzar). También en Marte · War (Teniente Lech Kril).',
  Mag: 'Warframe inicial. También en Fobos · Iliad (El Sargento).',
  Volt: 'Warframe inicial o se compran sus planos en el Laboratorio Tenno del Clan (Dojo).',
  'Excalibur Umbra': 'Recompensa de la misión de historia "El Sacrificio" (The Sacrifice).',
  Banshee: 'Planos disponibles en el Laboratorio Tenno del Clan (Dojo).',
  Nezha: 'Planos disponibles en el Laboratorio Tenno del Clan (Dojo).',
  Wukong: 'Planos disponibles en el Laboratorio Tenno del Clan (Dojo).',
  Zephyr: 'Planos disponibles en el Laboratorio Tenno del Clan (Dojo).',
  Dagath: 'Sindicato de los Seis en el Dojo de Clan (con Balizas Abisales).',
  Kullervo: 'Se compra con la Penitencia de Kullervo en el calabozo de Duviri.',
  Grendel: 'Balizas de Arbitraje compradas en repetidores de Arbitraje.',
  Vauban: 'Comprado con Créditos de Onda Nocturna (Nightwave).',
};

export function warframes(root) {
  const S = { q: '', kind: 'all' };
  root.innerHTML = `<section class="page-head"><h1>🛡️ Cómo conseguir cada Warframe</h1><p>Nombres en español, lugares de drop de neurópticas, chasis, sistemas y probabilidades oficiales. En los Warframes Prime se detallan las reliquias necesarias.</p></section>
    <div class="toolbar"><select data-k="kind"><option value="all">Todos (Base y Prime)</option><option value="base">Solo Base</option><option value="prime">Solo Prime</option></select>
    <input type="search" placeholder="Buscar Warframe en español o inglés…" data-k="q"></div><div class="results"></div>`;

  function draw() {
    const q = norm(S.q);
    const list = D.frames.filter((f) => {
      if (S.kind !== 'all' && (S.kind === 'prime') !== f.prime) return false;
      if (!q) return true;
      const fEs = norm(t(f.name, f.name));
      return fEs.includes(q) || norm(f.name).includes(q);
    });

    $('.results', root).innerHTML = `<div class="grid tiles small">${list.map((f) => {
      const fNameEs = t(f.name, f.name);
      return `<button class="tile frame" data-f="${esc(f.name)}">${img(imgC(f.img), 'fi', f.name)}<b>${esc(fNameEs)}</b>${f.prime ? `<span class="badge ${f.vaulted ? 'vault' : 'ok'}">${f.vaulted ? 'Vaulted' : 'Prime'}</span>` : ''}</button>`;
    }).join('')}</div>`;
  }

  root.addEventListener('input', debounce((e) => { if (e.target.dataset.k) { S[e.target.dataset.k] = e.target.value; draw(); } }, 150));
  root.addEventListener('click', (e) => {
    const targetElement = e.target.closest('[data-f]');
    if (targetElement) showFrame(D.frames.find((f) => f.name === targetElement.dataset.f));
  });
  draw();
}

function showFrame(f) {
  const c = D.cat[f.name] || {};
  const frameNameEs = t(f.name, f.name);
  const parts = f.parts.length
    ? f.parts.map((p) => `<div class="partbox"><h4>${esc(t(p.name, p.name))} ${p.vaulted ? '<span class="badge vault">Vaulted</span>' : ''}</h4>
        ${p.src ? srcList(p.src) : `<div class="chips">${p.relics.map((r) => `<button class="chip relic ${r.rar?.toLowerCase()}" data-act="relic" data-relic="${esc(r.id)}">${esc(r.id)}<small>${chance(r.ch)}</small></button>`).join('')}</div>`}</div>`).join('')
    : `<p class="muted">${esc(FALLBACK[f.name] || 'No figura en las tablas directas de misión (Mercado, Dojo, aventura o evento especial). Consulta la wiki para el método exacto.')}</p>`;
  const prim = f.prime ? D.primes.find((s) => s.set === f.name) : null;

  openModal(`<div class="m-head">${img(imgC(f.img), 'm-img', f.name)}<div><h2>${esc(frameNameEs)}</h2>
    <p class="muted">${esc(c.desc || '')}</p>
    <p class="statrow"><span>❤️ ${c.hp ?? '—'}</span><span>🛡️ ${c.sh ?? '—'}</span><span>🪖 ${c.ar ?? '—'}</span><span>⚡ ${c.en ?? '—'}</span>${f.price ? `<span>🏭 ${fmt(f.price)} créditos</span>` : ''}</p></div></div>
    ${prim?.slug ? `<p>Valor del set Prime en mercado: ${platBtn(prim.slug, price(prim.slug))}</p>` : ''}
    <h3>Componentes y planos</h3>${parts}
    ${c.abilities?.length ? `<h3>Habilidades</h3><ul class="abil">${c.abilities.map((a) => `<li><b>${esc(a.n)}</b><br><small class="muted">${esc((a.d || '').slice(0, 160))}</small></li>`).join('')}</ul>` : ''}
    <p><a class="btn" target="_blank" rel="noopener" href="${esc(f.wiki || wikiLink(f.name))}">Wiki oficial ↗</a> <a class="btn ghost" target="_blank" rel="noopener" href="${overframeSearch(f.name)}">Builds ↗</a></p>`, 'wide');
}

// ========================= RIVENS =========================
const RIVEN_GUIDE = {
  rifle: { pos: ['Probabilidad crítica', 'Daño crítico', 'Daño', 'Multidisparo', 'Velocidad de disparo', 'Probabilidad de estado'], neg: ['Zoom', 'Retroceso', 'Daño vs facción', 'Munición máxima', 'Impacto/Perforación'], note: 'Combo ideal: 2-3 positivos como Prob. Crítica + Daño Crítico + Multidisparo, y Zoom o Retroceso como negativo inofensivo.' },
  pistol: { pos: ['Probabilidad crítica', 'Daño crítico', 'Multidisparo', 'Daño', 'Velocidad de disparo'], neg: ['Zoom', 'Retroceso', 'Munición máxima', 'Daño vs facción'], note: 'Para armas cebadoras (Primer) o Peacemaker de Mesa.' },
  shotgun: { pos: ['Probabilidad crítica', 'Daño crítico', 'Daño', 'Probabilidad de estado', 'Multidisparo'], neg: ['Zoom', 'Retroceso', 'Recarga lenta', 'Daño vs facción'], note: 'En escopetas el multidisparo y el estado suelen multiplicar enormemente el daño.' },
  melee: { pos: ['Probabilidad crítica', 'Daño crítico', 'Daño', 'Velocidad de ataque', 'Daño de combo inicial', 'Probabilidad de estado', 'Alcance'], neg: ['Daño de remate', 'Duración de combo (si usas Naramon)', 'Daño de deslizamiento', 'Daño vs facción'], note: 'Alcance y daño crítico son especialmente buscados en cuerpo a cuerpo.' },
  archgun: { pos: ['Probabilidad crítica', 'Daño crítico', 'Daño', 'Multidisparo'], neg: ['Zoom', 'Retroceso', 'Munición máxima'], note: '' },
  kitgun: { pos: ['Probabilidad crítica', 'Daño crítico', 'Daño', 'Multidisparo', 'Velocidad de disparo'], neg: ['Zoom', 'Retroceso', 'Munición'], note: '' },
  zaw: { pos: ['Probabilidad crítica', 'Daño crítico', 'Daño', 'Velocidad de ataque', 'Alcance'], neg: ['Daño de remate', 'Duración de combo'], note: '' },
  companion_weapon: { pos: ['Probabilidad crítica', 'Daño crítico', 'Daño', 'Multidisparo'], neg: ['Zoom', 'Retroceso'], note: '' },
};

const ATTR_ES = {
  critical_chance: 'Probabilidad crítica',
  critical_damage: 'Daño crítico',
  damage: 'Daño',
  multishot: 'Multidisparo',
  fire_rate_slash_attack_speed: 'Cadencia / Velocidad',
  status_chance: 'Prob. de estado',
  status_duration: 'Duración de estado',
  range: 'Alcance',
  punch_through: 'Atravesar',
  reload_speed: 'Velocidad de recarga',
  magazine_capacity: 'Capacidad de cargador',
  ammo_maximum: 'Munición máxima',
  zoom: 'Zoom',
  weapon_recoil: 'Retroceso',
  slash_damage: 'Cortante',
  puncture_damage: 'Perforación',
  impact_damage: 'Impacto',
  heat_damage: 'Calor',
  cold_damage: 'Frío',
  electricity_damage: 'Electricidad',
  toxin_damage: 'Toxina',
  damage_vs_grineer: 'Daño vs Grineer',
  damage_vs_corpus: 'Daño vs Corpus',
  damage_vs_infested: 'Daño vs Infestados',
  initial_combo: 'Combo inicial',
  combo_duration: 'Duración de combo',
  finisher_damage: 'Daño de remate',
};

const attrName = (u) => ATTR_ES[u] || D.rivens.attrs[u]?.n || u.replace(/_/g, ' ');

function attrVal(a) {
  const unit = D.rivens.attrs[a.u]?.unit;
  const v = Math.abs(a.v);
  const sign = a.pos ? '+' : '-';
  if (unit === 'multiply') return `x${a.v}`;
  if (unit === 'seconds') return `${sign}${v}s`;
  return `${sign}${v}${unit === 'percent' ? '%' : ''}`;
}
const attrChip = (a) => `<span class="attr ${a.pos ? 'pos' : 'neg'}">${esc(attrName(a.u))} <b>${esc(attrVal(a))}</b></span>`;

export function rivens(root) {
  let sel = null;
  const weapons = D.rivens.weapons;
  root.innerHTML = `<section class="page-head"><h1>🌀 Rivens (Agrietados)</h1>
    <p>Selecciona un arma para ver los Rivens a la venta en vivo, las combinaciones de estadísticas más buscadas, sus precios y cuáles son los mejores atributos positivos y negativos.</p></section>
    <div class="toolbar"><input type="search" id="rq" placeholder="Buscar arma en español o inglés (ej. Cedo, Soma, Bramma, Torid…)" autocomplete="off"><select id="rg"><option value="all">Todas las categorías</option>${[...new Set(weapons.map((w) => w.rt))].sort().map((groupKey) => `<option value="${esc(groupKey)}">${esc(TYPE_ES[groupKey] || groupKey)}</option>`).join('')}</select></div>
    <div class="weaponlist"></div><div class="results"></div>`;
  const wl = $('.weaponlist', root);

  function list() {
    const q = norm($('#rq', root).value), g = $('#rg', root).value;
    const l = weapons.filter((w) => {
      if (g !== 'all' && w.rt !== g) return false;
      if (!q) return true;
      const wEs = norm(t(w.n, w.n));
      return wEs.includes(q) || norm(w.n).includes(q);
    }).sort((a, b) => b.dis - a.dis).slice(0, q || g !== 'all' ? 60 : 36);

    wl.innerHTML = l.map((w) => {
      const wNameEs = t(w.n, w.n);
      return `<button class="wbtn ${sel?.slug === w.slug ? 'on' : ''}" data-w="${w.slug}">${img(imgM(w.i), 'ri', w.n)}<span>${esc(wNameEs)}</span><small>${'●'.repeat(Math.round(w.dis))}${'○'.repeat(5 - Math.round(w.dis))} ${w.dis.toFixed(2)}</small></button>`;
    }).join('') || '<p class="muted">Sin armas coincidentes</p>';
  }

  async function pick(slug) {
    sel = weapons.find((w) => w.slug === slug);
    list();
    const res = $('.results', root);
    const weaponNameEs = t(sel.n, sel.n);
    res.innerHTML = `<div class="notice">Consultando subastas activas de Rivens para ${esc(weaponNameEs)}…</div>`;
    const guide = RIVEN_GUIDE[sel.rt] || RIVEN_GUIDE.rifle;
    let auctions = [];
    try {
      const r = await fetch(`/api/riven/${slug}`);
      if (!r.ok) throw new Error(r.status);
      auctions = await r.json();
    } catch (e) {
      res.innerHTML = `<div class="notice">No se pudo consultar warframe.market (${esc(e.message)}). Reintenta en unos instantes.</div>`;
      return;
    }

    const combos = new Map();
    for (const a of auctions) {
      const pos = a.a.filter((x) => x.pos).map((x) => x.u).sort();
      const neg = a.a.filter((x) => !x.pos).map((x) => x.u);
      const k = pos.join('+') + '|' + neg.join('+');
      const c = combos.get(k) || { pos, neg, prices: [] };
      c.prices.push(a.p);
      combos.set(k, c);
    }
    const rows = [...combos.values()].map((c) => ({
      ...c,
      n: c.prices.length,
      min: Math.min(...c.prices),
      med: c.prices.sort((a, b) => a - b)[Math.floor(c.prices.length / 2)]
    })).sort((a, b) => b.n - a.n || b.med - a.med).slice(0, 10);

    const w = sel;
    res.innerHTML = `<article class="card wide"><header>${img(imgM(w.i), 'big-img', w.n)}<div><h3>${esc(weaponNameEs)} (${esc(w.n)})</h3><div class="meta"><span class="badge type">${esc(TYPE_ES[w.rt] || w.rt)}</span><span class="badge">Maestría ${w.mr}</span><span class="badge ok">Disposición ${w.dis.toFixed(2)} / 5</span></div></div>
      <div class="price-col"><small>Riven más barato</small>${plat(auctions[0]?.p ?? null)}</div></header>
      <div class="two"><div><h4>✅ Mejores atributos positivos</h4><div class="chips">${guide.pos.map((p) => `<span class="attr pos">${p}</span>`).join('')}</div></div>
      <div><h4>🛑 Negativos ideales (los que menos penalizan)</h4><div class="chips">${guide.neg.map((p) => `<span class="attr neg">${p}</span>`).join('')}</div></div></div>
      ${guide.note ? `<p class="effect">${esc(guide.note)}</p>` : ''}
      <p class="muted small">Configuración perfecta: 2 a 3 positivos meta + 1 negativo inocuo (Zoom, Retroceso o daño contra facción que no uses), lo cual potencia el valor de los positivos.</p></article>
      <h3>Combinaciones con más ofertas en el mercado ahora mismo</h3>
      <table class="tbl"><thead><tr><th>Positivos</th><th>Negativo</th><th>Ofertas</th><th>Precio Mín.</th><th>Precio Mediano</th></tr></thead><tbody>${rows.map((r) => `<tr><td>${r.pos.map((u) => `<span class="attr pos">${esc(attrName(u))}</span>`).join('')}</td><td>${r.neg.map((u) => `<span class="attr neg">${esc(attrName(u))}</span>`).join('') || '<span class="muted">—</span>'}</td><td>${r.n}</td><td>${plat(r.min)}</td><td>${plat(r.med)}</td></tr>`).join('') || '<tr><td colspan=5>Sin ofertas activas</td></tr>'}</tbody></table>
      <h3>Rivens a la venta (en vivo)</h3>
      <div class="rivlist">${auctions.slice(0, 24).map((a) => `<div class="riv"><div class="riv-h"><b>${esc(weaponNameEs)} ${esc(a.name)}</b><span>${plat(a.p)}</span></div><div class="riv-b">${a.a.map((x) => attrChip({ u: x.u, v: x.v, pos: x.pos })).join('')}</div><div class="riv-f"><small><span class="dot ${esc(a.st)}"></span>${esc(a.o)} · MR ${a.mr} · ${esc(a.pol)} · ${a.rr} rerolls</small><button class="mini" data-act="copy" data-text="${esc(`/w ${a.o} Hi! I want to buy: ${w.n} ${a.name} riven mod for ${a.p} platinum. (warframe.market)`)}">Copiar /w</button></div></div>`).join('') || '<p class="muted">No hay Rivens listados actualmente.</p>'}</div>`;
  }

  root.addEventListener('input', debounce((e) => { if (e.target.id === 'rq' || e.target.id === 'rg') list(); }, 150));
  root.addEventListener('click', (e) => { const b = e.target.closest('[data-w]'); if (b) pick(b.dataset.w); });
  list();
}

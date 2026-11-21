import { $, $$, esc, D, P, img, imgM, imgC, fmt, plat, platBtn, price, chance, rar, slugImg, srcList, srcLine, modImg, debounce, norm, wikiLink, overframeSearch, t } from './util.js';
import { openModal } from './ui.js';
import { TIERS, TIER_COLORS } from './tiers.js';
import { FRAME_BUILDS, WEAPON_BUILDS } from './builds.js?v=26.2';
import { DARK_SECTOR_SURVIVALS, RESOURCE_GUIDE } from './darksector.js';
import { PLAT_CATEGORIES, PLAT_ROUTES, PRIME_JUNK_RATES, PLAT_TIPS } from './platData.js?v=26.2';
import { renderRivenStrategyView } from './rivenStrategy.js?v=26.2';
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
function wfModSlot(name, slotType = 'normal', isAura = false, isExilus = false) {
  if (!name) {
    return `<div class="wf-mod-slot empty">
      <div class="wf-slot-top-bar">
        <span class="wf-slot-type-badge">${isAura ? '⚡ AURA' : isExilus ? '◈ EXILUS' : 'MOD'}</span>
      </div>
      <div class="wf-mod-img-wrap empty">
        <span class="muted small">Vacío</span>
      </div>
    </div>`;
  }
  const m = D.modimg ? D.modimg[name.toLowerCase()] : null;
  const modData = (D.mods || []).find((x) => x.name.toLowerCase() === name.toLowerCase());
  const nameEs = t(name, name);
  const imgSrc = modImg(name);
  const itemPrice = m?.s ? price(m.s) : null;

  // Determinar Rareza y Tipo de Marco
  const isArchon = /archon/i.test(name);
  const isPrime = /primed/i.test(name);
  const isUmbral = /umbral|sacrificial/i.test(name);
  let rarity = (m?.r || modData?.rarity || 'rare').toLowerCase();

  let frameClass = rarity;
  if (isArchon) frameClass = 'archon';
  else if (isPrime) frameClass = 'prime';
  else if (isUmbral) frameClass = 'umbral';
  else if (isAura) frameClass = 'aura';

  // Costo de Drenaje y Polaridad
  let drain = 7;
  if (isAura) {
    drain = 14;
  } else if (isPrime || isUmbral) {
    drain = 8;
  } else if (/blind rage|transient fortitude|narrow minded/i.test(name)) {
    drain = 8;
  } else if (/ampliado|overextended|streamline/i.test(name)) {
    drain = 6;
  } else if (/catalyzing|catalizador|whipclaw|látigo|strangledome|domo|equilibrio|equilibrium/i.test(name)) {
    drain = 9;
  } else if (/archon continuity|continuidad arconte/i.test(name)) {
    drain = 8;
  }

  // Ícono de ranura superior
  let slotLabel = 'MOD';
  if (isAura) slotLabel = '⚡ AURA';
  else if (isExilus) slotLabel = '◈ EXILUS';
  else if (slotType === 'stance') slotLabel = '⚔️ POSTURA';
  else if (slotType === 'precept') slotLabel = '🐾 PRECEPTO';

  // Puntos de rango iluminados
  const maxRank = modData?.max || (isPrime || isUmbral || isArchon || /blind rage|narrow minded/i.test(name) ? 10 : 5);
  const dotsHtml = `<div class="wf-slot-rank-dots">${Array(maxRank).fill('<span>•</span>').join('')}</div>`;

  const isBonusCapacity = isAura || slotType === 'stance' || slotType === 'precept';
  const drainBadge = isBonusCapacity ? `^${drain} =` : `${drain} =`;

  return `
    <div class="wf-mod-slot ${frameClass} ${isExilus ? 'is-exilus' : ''}" title="${esc(nameEs)} (${esc(name)})">
      <div class="wf-slot-top-bar">
        <span class="wf-slot-type-badge ${isAura ? 'aura' : isExilus ? 'exilus' : ''}">${slotLabel}</span>
        <span class="wf-slot-drain matched" title="Drenaje con polaridad">${drainBadge}</span>
      </div>

      <!-- El MOD visible en todo su esplendor (carta completa en alta resolución) -->
      <div class="wf-mod-img-wrap">
        ${img(imgSrc, 'wf-slot-mod-img', name)}
      </div>

      <div class="wf-slot-bottom-info">
        <span class="wf-slot-name">${esc(nameEs)}</span>
        ${dotsHtml}
        ${itemPrice != null ? `<span class="wf-slot-price">${fmt(itemPrice)}p</span>` : ''}
      </div>
    </div>
  `;
}

function wfArcaneSlot(name) {
  if (!name) return `<div class="wf-arcane-slot empty"><div class="arcane-glyph-pedestal empty"></div><span class="arcane-label-name">Sin arcano</span></div>`;
  const nameEs = t(name, name);
  const arcData = (D.arcanes || []).find((x) => x.name.toLowerCase() === name.toLowerCase());
  const imgSrc = slugImg(arcData?.slug) || imgC(arcData?.img) || modImg(name);
  const itemPrice = arcData?.slug ? price(arcData.slug) : null;

  return `
    <div class="wf-arcane-slot" title="${esc(nameEs)} (${esc(name)})">
      <div class="arcane-glyph-pedestal">
        <div class="arcane-glyph-inner">
          ${imgSrc ? `<img class="arcane-ico-img" src="${esc(imgSrc)}" alt="${esc(name)}">` : '<span class="arcane-default-icon">🔮</span>'}
        </div>
      </div>
      <span class="arcane-label-name">${esc(nameEs)}</span>
      <div class="arcane-rank-diamonds" title="Rango 5 (Máximo)">
        <span>◆</span><span>◆</span><span>◆</span><span>◆</span><span>◆</span>
      </div>
      ${itemPrice != null ? `<span class="arcane-slot-price">${fmt(itemPrice)}p</span>` : ''}
    </div>
  `;
}

const SHARD_NAMES_ES = {
  crimson: 'Carmesí',
  amber: 'Ámbar',
  azure: 'Celeste',
  violet: 'Violeta',
  emerald: 'Esmeralda',
  topaz: 'Topacio',
};

function renderGearArsenalBoard(gear, parentNameEs) {
  let topSlotsHtml = '';
  if (gear.slot === 'Primary' || gear.slot === 'Secondary') {
    if (gear.exilus) {
      topSlotsHtml = `
        <div class="wf-top-slots-row is-weapon-top">
          <div class="wf-slot-container exilus-container">
            ${wfModSlot(gear.exilus, 'exilus', false, true)}
          </div>
        </div>`;
    }
  } else if (gear.slot === 'Melee') {
    if (gear.stance || gear.exilus) {
      topSlotsHtml = `
        <div class="wf-top-slots-row ${!gear.stance ? 'is-weapon-top' : ''}">
          ${gear.stance ? `
            <div class="wf-slot-container aura-container">
              ${wfModSlot(gear.stance, 'stance', false, false)}
            </div>` : ''}
          ${gear.exilus ? `
            <div class="wf-slot-container exilus-container">
              ${wfModSlot(gear.exilus, 'exilus', false, true)}
            </div>` : ''}
        </div>`;
    }
  } else if (gear.slot === 'Companion') {
    topSlotsHtml = `
      <div class="wf-top-slots-row">
        <div class="wf-slot-container aura-container">
          ${wfModSlot(gear.aura || 'Venari Bodyguard', 'precept', true, false)}
        </div>
        <div class="wf-slot-container exilus-container">
          ${wfModSlot(gear.exilus || 'Primed Animal Instinct', 'exilus', false, true)}
        </div>
      </div>`;
  } else {
    topSlotsHtml = `
      <div class="wf-top-slots-row">
        <div class="wf-slot-container aura-container">
          ${wfModSlot(gear.aura || 'Steel Charge', 'aura', true, false)}
        </div>
        <div class="wf-slot-container exilus-container">
          ${wfModSlot(gear.exilus || 'Power Drift', 'exilus', false, true)}
        </div>
      </div>`;
  }

  const modsGridHtml = `
    <div class="wf-main-mods-grid">
      ${(gear.mods || []).slice(0, 8).map((modName) => wfModSlot(modName, 'normal')).join('')}
    </div>`;

  const hasArcanes = gear.arcanes && gear.arcanes.length > 0;
  const arcanesHtml = `
    <div class="wf-arcanes-column ${hasArcanes ? '' : 'is-empty'}">
      <span class="wf-arcanes-header-label">${hasArcanes ? 'ARCANOS' : 'SIN ARCANOS'}</span>
      ${hasArcanes ? gear.arcanes.slice(0, 2).map(wfArcaneSlot).join('') : '<div class="wf-arcane-empty-slot"><span class="muted small">Arma / Bestia sin ranuras de Arcano</span></div>'}
    </div>`;

  let incarnonHtml = '';
  if (gear.incarnon && gear.incarnon.length) {
    incarnonHtml = `
      <div class="wf-incarnon-box">
        <div class="wf-synergy-title">🧬 Evoluciones Incarnon recomendadas (eduiy16):</div>
        <div class="wf-incarnon-grid">
          ${gear.incarnon.map((evo) => `
            <div class="incarnon-evo-pill">
              <span class="evo-diamond">◈</span>
              <span class="evo-text">${esc(evo)}</span>
            </div>`).join('')}
        </div>
      </div>`;
  }

  let elementsHtml = '';
  if (gear.elements) {
    elementsHtml = `
      <div class="wf-synergy-row">
        <div class="wf-synergy-chip elements">
          <span class="chip-badge">🔥 Combinación Elemental & Estados</span>
          <div class="chip-content">
            <span class="chip-ability">${esc(gear.elements)}</span>
          </div>
        </div>
      </div>`;
  }

  return `
    <div class="wf-arsenal-board">
      <div class="wf-mods-cluster">
        ${topSlotsHtml}
        ${modsGridHtml}
      </div>
      ${arcanesHtml}
    </div>

    ${(elementsHtml || incarnonHtml) ? `
      <div class="wf-synergies-panel">
        ${elementsHtml}
        ${incarnonHtml}
      </div>` : ''}

    ${gear.notes ? `
      <div class="build-strategy-box gear-strategy">
        <h4>💡 Sinergia con ${esc(parentNameEs)} & Mecánicas (eduiy16)</h4>
        <p>${esc(gear.notes)}</p>
      </div>` : ''}
  `;
}

function getDynamicWeaponBuild(name, catItem) {
  const isShotgun = catItem.type === 'Shotgun';
  const isSecondary = catItem.cat === 'Secondary';
  const isMelee = catItem.cat === 'Melee';
  const cc = catItem.cc || 0.15;
  const sc = catItem.sc || 0.15;
  const isCrit = cc >= 0.18;

  let mods = [];
  let exilus = '';
  let stance = '';
  let elements = 'Viral + Cortante';
  let arcanes = ['Primary Merciless'];
  let slot = catItem.cat || 'Primary';

  if (isShotgun) {
    exilus = 'Fatal Acceleration';
    arcanes = ['Primary Merciless'];
    if (isCrit) {
      mods = ['Galvanized Hell', 'Galvanized Savvy', 'Critical Deceleration', 'Primed Ravage', 'Hunter Munitions', 'Toxic Barrage', 'Frigid Blast', 'Shotgun Elementalist'];
    } else {
      mods = ['Galvanized Hell', 'Galvanized Savvy', 'Primed Point Blank', 'Scattering Virulence', 'Toxic Barrage', 'Frigid Blast', 'Blaze', 'Shotgun Elementalist'];
      elements = 'Viral + Fuego';
    }
  } else if (isSecondary) {
    exilus = 'Lethal Momentum';
    arcanes = ['Secondary Merciless', 'Secondary Fortifier'];
    if (isCrit) {
      mods = ['Galvanized Diffusion', 'Galvanized Shot', 'Lethal Torrent', 'Primed Target Cracker', 'Primed Pistol Gambit', 'Pistol Pestilence', 'Frostbite', 'Pistol Elementalist'];
    } else {
      mods = ['Galvanized Diffusion', 'Galvanized Shot', 'Lethal Torrent', 'Pistol Pestilence', 'Scorch', 'Frostbite', 'Jolt', 'Pistol Elementalist'];
      elements = 'Corrosivo + Fuego + Frío';
    }
  } else if (isMelee) {
    exilus = 'Melee Elementalist';
    stance = 'Crushing Ruin';
    arcanes = ['Melee Influence', 'Melee Exposure'];
    if (isCrit) {
      mods = ['Blood Rush', 'Weeping Wounds', 'Organ Shatter', 'Condition Overload', 'Gladiator Might', 'Primed Fever Strike', 'North Wind', 'Primed Reach'];
    } else {
      mods = ['Condition Overload', 'Weeping Wounds', 'Primed Fever Strike', 'Shocking Touch', 'Carnis Mandible', 'Gladiator Might', 'Primed Reach', 'Volcanic Edge'];
      elements = 'Corrosivo + Electricidad (Melee Influence)';
    }
  } else {
    // Primary Rifle / Bow / Sniper / Launcher
    exilus = 'Vigilante Supplies';
    arcanes = ['Primary Deadhead', 'Primary Merciless'];
    if (isCrit) {
      mods = ['Galvanized Chamber', 'Galvanized Aptitude', 'Critical Delay', 'Vital Sense', 'Hunter Munitions', 'Malignant Force', 'Rime Rounds', 'Rifle Elementalist'];
    } else {
      mods = ['Galvanized Chamber', 'Galvanized Aptitude', 'Serration', 'Malignant Force', 'High Voltage', 'Rime Rounds', 'Primed Shred', 'Rifle Elementalist'];
      elements = 'Corrosivo + Frío + Estados';
    }
  }

  const statCrit = Math.round(cc * 100);
  const statStatus = Math.round(sc * 100);

  return {
    name: name,
    slot: slot,
    role: `Build Meta Optimizada (${catItem.type || slot} · ${statCrit}% Crítico / ${statStatus}% Estado)`,
    author: 'Comunidad Warframe (Overframe Meta)',
    videoUrl: null,
    exilus: exilus,
    stance: stance,
    mods: mods,
    arcanes: arcanes,
    elements: elements,
    notes: `Configuración competitiva estándar de la comunidad calculada según las estadísticas base de ${catItem.type || slot} de ${name} (${statCrit}% Prob. Crítica, ${catItem.cm ? catItem.cm.toFixed(1) + 'x' : '2.0x'} Multiplicador, ${statStatus}% Estado). Optimizada con mods Galvanizados y Elementalistas vigentes.`
  };
}

export function builds(root) {
  const S = { tab: 'frames', q: '' };
  root.innerHTML = `<section class="page-head"><h1>🛠️ Top builds</h1>
    <p>Distribución oficial del Arsenal de Warframe. Cada ranura muestra la carta del mod en alta resolución con su arte, estadísticas y polaridad. Pasa el cursor por cualquier mod para ampliarlo en gran tamaño.</p></section>
    <div class="toolbar"><div class="seg"><button data-v="frames" class="on">Warframes</button><button data-v="weapons">Armas</button></div>
    <input type="search" placeholder="Buscar Warframe o arma en español…" data-k="q"></div><div class="results"></div>`;

  function draw() {
    const q = norm(S.q);
    let list = (S.tab === 'frames' ? FRAME_BUILDS : WEAPON_BUILDS).filter((x) => {
      if (!q) return true;
      const esName = norm(t(x.name, x.name));
      const matchMain = esName.includes(q) || norm(x.name).includes(q);
      if (matchMain) return true;
      if (x.builds) {
        return x.builds.some((b) => {
          if (b.loadout) {
            return b.loadout.some((g) => norm(g.name).includes(q) || norm(g.type || '').includes(q));
          }
          return false;
        });
      }
      return false;
    });

    if (S.tab === 'weapons' && q) {
      const knownNames = new Set(list.map((w) => w.name.toLowerCase()));
      const catMatches = Object.keys(D.cat || {}).filter((k) => {
        const item = D.cat[k];
        if (!item || (item.cat !== 'Primary' && item.cat !== 'Secondary' && item.cat !== 'Melee')) return false;
        const normKey = norm(k);
        const normEs = norm(t(k, k));
        return (normKey.includes(q) || normEs.includes(q)) && !knownNames.has(k.toLowerCase());
      });

      catMatches.slice(0, 16).forEach((k) => {
        list.push(getDynamicWeaponBuild(k, D.cat[k]));
      });
    }

    const cards = list.map((x) => {
      const bs = x.builds || [x];
      const nameEs = t(x.name, x.name);
      const isPrimeAvail = D.cat[x.name + ' Prime'] ? x.name + ' Prime' : null;
      return bs.map((b) => {
        const hasLoadout = b.loadout && b.loadout.length > 0;
        // Shards HTML con imágenes oficiales del juego
        let shardsHtml = '';
        if (b.shards && b.shards.length) {
          shardsHtml = `
            <div class="wf-shards-wrapper">
              <div class="wf-synergy-title">💎 Fragmentos de Arconte recomendados (5 ranuras):</div>
              <div class="wf-shards-grid">
                ${b.shards.map((s) => {
                  const shardType = (s.type || 'crimson').toLowerCase();
                  const shardImgSrc = `/img/shards/${s.tau ? 'tauforged_' : ''}${shardType}.png`;
                  const shardLabel = SHARD_NAMES_ES[shardType] || shardType;
                  return `
                    <div class="shard-chip ${shardType}" title="${s.tau ? 'Tauforjado: ' : ''}${esc(s.stat)}">
                      <img class="shard-img-icon" src="${shardImgSrc}" alt="${shardLabel}" loading="lazy">
                      <div class="shard-info-wrap">
                        <span class="shard-type-title ${shardType}">${s.tau ? '<span class="tau-star" title="Tauforjado">★ TAUFORJADO</span> ' : ''}${shardLabel}</span>
                        <span class="shard-text">${esc(s.stat)}</span>
                      </div>
                    </div>`;
                }).join('')}
              </div>
            </div>`;
        }

        // Helminth & Focus HTML
        let helminthFocusHtml = '';
        if (b.helminth || b.focus) {
          helminthFocusHtml = `
            <div class="wf-synergy-row">
              ${b.helminth ? `
                <div class="wf-synergy-chip helminth">
                  <span class="chip-badge">🧬 Helminto</span>
                  <div class="chip-content">
                    <span class="chip-ability">${esc(b.helminth.ability)}</span>
                    <span class="chip-replaces">Reemplaza: <b>${esc(b.helminth.replaces)}</b></span>
                  </div>
                </div>` : ''}
              ${b.focus ? `
                <div class="wf-synergy-chip focus">
                  <span class="chip-badge">🌀 Escuela de Enfoque</span>
                  <div class="chip-content">
                    <span class="chip-focus-name">${esc(b.focus)}</span>
                  </div>
                </div>` : ''}
            </div>`;
        }

        // Elementos & Incarnon HTML para Armas
        let elementsHtml = '';
        if (b.elements) {
          elementsHtml = `
            <div class="wf-synergy-row">
              <div class="wf-synergy-chip elements">
                <span class="chip-badge">🔥 Combinación Elemental & Estados</span>
                <div class="chip-content">
                  <span class="chip-ability">${esc(b.elements)}</span>
                </div>
              </div>
            </div>`;
        }

        let incarnonHtml = '';
        if (b.incarnon && b.incarnon.length) {
          incarnonHtml = `
            <div class="wf-incarnon-box">
              <div class="wf-synergy-title">🧬 Evoluciones Incarnon recomendadas (eduiy16):</div>
              <div class="wf-incarnon-grid">
                ${b.incarnon.map((evo) => `
                  <div class="incarnon-evo-pill">
                    <span class="evo-diamond">◈</span>
                    <span class="evo-text">${esc(evo)}</span>
                  </div>`).join('')}
              </div>
            </div>`;
        }

        // Video link / Creator credit (solo si es un video real verificado de YouTube)
        const isRealVideo = b.videoUrl && (b.videoUrl.includes('watch?v=') || b.videoUrl.includes('youtu.be/'));
        const videoBtn = isRealVideo ? `
          <a class="btn btn-eduiy" target="_blank" rel="noopener" href="${esc(b.videoUrl)}">
            <span class="yt-play-icon">▶</span> Guía en video por ${esc(b.author || 'eduiy16')} en YouTube ↗
          </a>` : '';

        // Ranuras superiores según el tipo de equipamiento (Aura / Postura / Exilus)
        let topSlotsHtml = '';
        if (x.slot === 'Primary' || x.slot === 'Secondary') {
          topSlotsHtml = `
            <div class="wf-top-slots-row is-weapon-top">
              <div class="wf-slot-container exilus-container">
                ${wfModSlot(b.exilus || (x.slot === 'Primary' ? 'Vigilante Supplies' : 'Ruinous Extension'), 'exilus', false, true)}
              </div>
            </div>`;
        } else if (x.slot === 'Melee') {
          topSlotsHtml = `
            <div class="wf-top-slots-row">
              <div class="wf-slot-container aura-container">
                ${wfModSlot(b.stance || 'Gleaming Talon', 'stance', false, false)}
              </div>
              <div class="wf-slot-container exilus-container">
                ${wfModSlot(b.exilus || 'Melee Elementalist', 'exilus', false, true)}
              </div>
            </div>`;
        } else {
          topSlotsHtml = `
            <div class="wf-top-slots-row">
              <div class="wf-slot-container aura-container">
                ${wfModSlot(b.aura || 'Brief Respite', 'aura', true, false)}
              </div>
              <div class="wf-slot-container exilus-container">
                ${wfModSlot(b.exilus || 'Sure Footed', 'exilus', false, true)}
              </div>
            </div>`;
        }

        return `<article class="card build build-showcase">
          <header class="build-hero">
            <div class="build-avatar-box">
              ${img(catImg(x.name) || catImg(x.name + ' Prime'), 'build-avatar-img', x.name)}
            </div>
            <div class="build-title-area">
              <div class="meta">
                <span class="badge ${x.slot ? 'type' : 'ok'}">${x.slot ? esc(TYPE_ES[x.slot] || x.slot) : '⭐ Warframe Meta'}</span>
                ${isPrimeAvail ? `<span class="badge vault">Versión Prime disponible</span>` : ''}
                <span class="badge ok">${esc(b.role)}</span>
                ${b.author ? `<span class="badge eduiy-badge">Guía por ${esc(b.author)}</span>` : ''}
                ${hasLoadout ? `<span class="badge tier-s" title="Incluye armas exaltadas, compañeros y stat-sticks">Kit Completo (${1 + b.loadout.length} Builds)</span>` : ''}
              </div>
              <h2>${esc(nameEs)}</h2>
              <h4 class="build-name-tag">Configuración: <span>${esc(b.name)}</span></h4>
            </div>
          </header>

          ${hasLoadout ? `
            <div class="wf-kit-selector">
              <div class="wf-kit-header">
                <span class="wf-kit-title">🎒 EQUIPO COMPLETO DEL CONJUNTO (${1 + b.loadout.length} BUILDS):</span>
                <span class="wf-kit-hint">Haz clic para ver la build detallada de cada componente:</span>
              </div>
              <div class="wf-kit-pills">
                <button class="wf-kit-pill on" data-target="gear-main">
                  <span class="kit-icon">🛡️</span>
                  <div class="kit-info">
                    <span class="kit-name">${esc(nameEs)}</span>
                    <span class="kit-badge">Warframe Principal</span>
                  </div>
                </button>
                ${b.loadout.map((gear, idx) => `
                  <button class="wf-kit-pill" data-target="gear-${idx}">
                    <span class="kit-icon">${gear.icon || '⚔️'}</span>
                    <div class="kit-info">
                      <span class="kit-name">${esc(gear.name)}</span>
                      <span class="kit-badge">${esc(gear.type || 'Equipamiento')}</span>
                    </div>
                  </button>
                `).join('')}
              </div>
            </div>` : ''}

          <div class="build-body">
            <!-- PANEL PRINCIPAL (WARFRAME) -->
            <div class="wf-gear-panel active" data-gear-id="gear-main">
              <div class="build-section-label">⚡ Arsenal de ${esc(nameEs)} — Pasa el cursor sobre la carta de cualquier mod para ampliarla</div>

              <div class="wf-arsenal-board">
                <!-- Clúster de Mods: Aura/Postura + Exilus arriba, 2 filas de 4 mods abajo -->
                <div class="wf-mods-cluster">
                  ${topSlotsHtml}

                  <div class="wf-main-mods-grid">
                    ${b.mods.slice(0, 8).map((modName) => wfModSlot(modName, 'normal')).join('')}
                  </div>
                </div>

                <!-- Columna de Arcanos a la derecha -->
                <div class="wf-arcanes-column">
                  <span class="wf-arcanes-header-label">ARCANOS</span>
                  ${(b.arcanes && b.arcanes.length ? b.arcanes : ['Primary Merciless']).slice(0, 2).map(wfArcaneSlot).join('')}
                </div>
              </div>

              <!-- Panel de Sinergias Avanzadas (Helminto, Enfoque, Elementos, Incarnon y Fragmentos) -->
              ${(helminthFocusHtml || shardsHtml || elementsHtml || incarnonHtml) ? `
                <div class="wf-synergies-panel">
                  ${helminthFocusHtml}
                  ${elementsHtml}
                  ${incarnonHtml}
                  ${shardsHtml}
                </div>` : ''}

              <div class="build-strategy-box">
                <h4>💡 ${x.slot ? 'Guía de Disparo & Mecánicas (eduiy16)' : 'Estrategia de Combate & Rotación Endgame (eduiy16)'}</h4>
                <p>${esc(b.notes)}</p>
              </div>
            </div>

            <!-- PANELES DE EQUIPAMIENTO ADICIONAL (SI TIENE LOADOUT) -->
            ${hasLoadout ? b.loadout.map((gear, idx) => `
              <div class="wf-gear-panel" data-gear-id="gear-${idx}">
                <div class="wf-gear-panel-header">
                  <div class="gear-header-left">
                    <span class="gear-header-icon">${gear.icon || '⚔️'}</span>
                    <div>
                      <h3>${esc(gear.name)}</h3>
                      <span class="gear-sub-type">${esc(gear.type || 'Equipamiento')}</span>
                    </div>
                  </div>
                  ${gear.elements ? `
                    <div class="wf-synergy-chip elements compact">
                      <span class="chip-badge">🔥 Elementos</span>
                      <span class="chip-ability">${esc(gear.elements)}</span>
                    </div>` : ''}
                </div>

                <div class="build-section-label">⚡ Arsenal de ${esc(gear.name)} — Pasa el cursor sobre la carta de cualquier mod para ampliarla</div>

                ${renderGearArsenalBoard(gear, nameEs)}
              </div>
            `).join('') : ''}
          </div>

          <footer>
            ${videoBtn}
            <a class="btn ghost" target="_blank" rel="noopener" href="${overframeSearch(x.name)}">Ver más variantes en Overframe ↗</a>
            <a class="btn ghost" target="_blank" rel="noopener" href="${esc(wikiLink(x.name))}">Wiki Oficial ↗</a>
          </footer>
        </article>`;
      }).join('');
    }).join('');

    const extraInfo = S.tab === 'weapons' && !q ? `
      <div class="notice" style="margin-bottom:18px">
        💡 <b>Catálogo ampliado de Armas:</b> Mostrando las 30 armas meta más utilizadas con guías de <b>eduiy16</b> y <b>Helter hxz</b>. Puedes buscar cualquiera de las más de 600 armas de Warframe (como <i>Astilla</i>, <i>Nataruk</i>, <i>Tigris</i>, <i>Corinth</i>, <i>Fulmin</i>, etc.) en el buscador superior para ver su build meta optimizada al instante.
      </div>` : '';

    const extra = q && !list.length ? `<div class="notice">No se encontró ningún arma o Warframe para “${esc(S.q)}”. <a target="_blank" rel="noopener" href="${overframeSearch(S.q)}">Buscar en Overframe ↗</a></div>` : '';
    $('.results', root).innerHTML = extraInfo + extra + `<div class="builds-container">${cards}</div>`;
  }

  root.addEventListener('input', debounce((e) => { if (e.target.dataset.k) { S.q = e.target.value; draw(); } }, 150));
  root.addEventListener('click', (e) => {
    const pill = e.target.closest('.wf-kit-pill');
    if (pill) {
      const card = pill.closest('.build-showcase');
      if (!card) return;
      const targetId = pill.dataset.target;
      card.querySelectorAll('.wf-kit-pill').forEach((p) => p.classList.toggle('on', p === pill));
      card.querySelectorAll('.wf-gear-panel').forEach((panel) => {
        panel.classList.toggle('active', panel.dataset.gearId === targetId);
      });
      return;
    }
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
          const rImg = r.localImg || (r.mi ? imgM(r.mi) : imgC(r.img));
          return `<button class="resbtn ${r === cur ? 'on' : ''}" data-r="${esc(r.name)}">${img(rImg, 'ri', r.name)}<span>${esc(rEs)}</span></button>`;
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
          <header>${img(cur.localImg || (cur.mi ? imgM(cur.mi) : imgC(cur.img)), 'big-img', cur.name)}<div><h3>${esc(resNameEs)} (${esc(cur.name)})</h3><p class="muted small">Otras fuentes según datos de drops oficiales</p></div></header>
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
  renderRivenStrategyView(root, 'torid');
}

// ========================= PLAT GUIDE (CONSEGUIR PLATINO RÁPIDO) =========================
export function platGuide(root) {
  const S = { tab: 'routes', q: '' };

  root.innerHTML = `
    <section class="page-head">
      <h1>💰 Conseguir Platino Rápido</h1>
      <p>Estrategias confirmadas al meta actual de Warframe para ganar platino de forma constante y rápida. Descubre qué mods, sets prime, arcanos y armas farmear, cuánto platino recibirás y consulta los precios en vivo de <b>warframe.market</b>.</p>
    </section>
    <div class="toolbar">
      <div class="seg wrap" id="plat-seg">
        ${PLAT_CATEGORIES.map((c) => `<button data-tab="${c.id}" class="${c.id === S.tab ? 'on' : ''}">${esc(c.label)}</button>`).join('')}
      </div>
      <input type="search" placeholder="Buscar método, mod, set prime o arcano…" data-k="q">
    </div>
    <div class="results" id="plat-results"></div>
  `;

  function renderItemChip(item) {
    const slug = item.slug;
    const it = slug ? D.mk[slug] : null;
    const imgSrc = slugImg(slug) || (item.name ? modImg(item.name) : '');
    const p = slug ? price(slug) : null;
    const nameEs = it?.n ? t(it.n, item.name) : item.name;

    return `
      <div class="plat-item-chip">
        <div class="plat-item-left">
          ${img(imgSrc, 'plat-item-img', nameEs)}
          <div class="plat-item-info">
            <div class="plat-item-title-row">
              <span class="plat-item-name">${esc(nameEs)}</span>
            </div>
            <p class="plat-item-note">${esc(item.note || '')}</p>
          </div>
        </div>
        <div class="plat-item-right">
          <span class="plat-item-est" title="Rango de precio estimado en el mercado">${esc(item.estPl || item.pl || '')}</span>
          ${slug ? platBtn(slug, p, ' Ver ofertas') : ''}
        </div>
      </div>
    `;
  }

  function draw() {
    const q = norm(S.q);
    const container = $('#plat-results', root);
    let html = '';

    if (S.tab === 'routes') {
      const filteredRoutes = PLAT_ROUTES.filter((r) => {
        if (!q) return true;
        return norm(r.title).includes(q) || norm(r.desc).includes(q) || norm(r.location).includes(q) || (r.items || []).some((it) => norm(it.name).includes(q));
      });

      html = filteredRoutes.map((r) => `
        <article class="card wide plat-route-card">
          <header class="plat-route-header">
            <div>
              <div class="meta">
                <span class="badge ${r.badgeClass}">${esc(r.level)}</span>
                <span class="badge ok">${esc(r.potential)}</span>
              </div>
              <h3>${esc(r.title)}</h3>
              <p class="plat-route-location">📍 <b>Ubicación:</b> ${esc(r.location)}</p>
              <p class="plat-route-gear">🛡️ <b>Equipamiento sugerido:</b> ${esc(r.gear)}</p>
            </div>
          </header>

          <p class="plat-route-desc">${esc(r.desc)}</p>

          <div class="plat-items-section-title">📦 Artículos destacados de este farmeo:</div>
          <div class="plat-items-grid">
            ${(r.items || []).map(renderItemChip).join('')}
          </div>

          <div class="build-strategy-box plat-strategy-box">
            <h4>💡 Estrategia de Venta & Consejo Pro (eduiy16)</h4>
            <p>${esc(r.strategy)}</p>
          </div>
        </article>
      `).join('') || '<div class="notice">No se encontraron rutas con ese término de búsqueda.</div>';
    } else if (S.tab === 'mods') {
      const modRoutes = PLAT_ROUTES.filter(r => r.title.includes('Mods') || r.title.includes('Sindicatos') || r.title.includes('Arbitrajes'));
      const allModItems = [];
      modRoutes.forEach(r => {
        (r.items || []).forEach(it => {
          if (!allModItems.some(x => x.slug === it.slug)) allModItems.push({ ...it, from: r.title });
        });
      });
      const additionalMods = [
        { name: 'Continuidad Arconte (Archon Continuity)', slug: 'archon_continuity', estPl: '20 – 35 pl', note: 'Romper Narmer / Kahl. Añade corrosivo a toxina.', from: 'Guarnición de Kahl' },
        { name: 'Estirar Arconte (Archon Stretch)', slug: 'archon_stretch', estPl: '25 – 40 pl', note: 'Genera energía con daño eléctrico.', from: 'Guarnición de Kahl' },
        { name: 'Intensificación Arconte (Archon Intensify)', slug: 'archon_intensify', estPl: '25 – 40 pl', note: '+30% de Fuerza adicional al curar aliados.', from: 'Guarnición de Kahl' },
        { name: 'Vitalidad Arconte (Archon Vitality)', slug: 'archon_vitality', estPl: '20 – 35 pl', note: 'Duplica los estados de Fuego.', from: 'Guarnición de Kahl' },
        { name: 'Flujo Prime (Primed Flow)', slug: 'primed_flow', estPl: '45 – 70 pl (250 – 350 pl R10)', note: 'Baro Ki’Teer. Triplica la energía máxima.', from: 'Baro Ki’Teer' },
        { name: 'Continuidad Prime (Primed Continuity)', slug: 'primed_continuity', estPl: '45 – 70 pl (250 – 350 pl R10)', note: 'Baro Ki’Teer. +55% duración de habilidad.', from: 'Baro Ki’Teer' },
        { name: 'Destroza Objetivos Prime (Primed Target Cracker)', slug: 'primed_target_cracker', estPl: '40 – 60 pl (220 – 300 pl R10)', note: 'Daño crítico vital para pistolas.', from: 'Baro Ki’Teer' },
        { name: 'Gambito de Pistola Prime (Primed Pistol Gambit)', slug: 'primed_pistol_gambit', estPl: '40 – 60 pl (220 – 300 pl R10)', note: 'Probabilidad crítica para pistolas.', from: 'Baro Ki’Teer' }
      ];
      additionalMods.forEach(m => allModItems.push(m));

      const filtered = allModItems.filter(m => !q || norm(m.name).includes(q) || norm(m.note).includes(q) || norm(m.from || '').includes(q));

      html = `
        <article class="card wide">
          <header><div><h3>🪙 Mods Más Rentables & de Venta Inmediata</h3><p class="muted small">Estos mods siempre tienen cientos de compradores buscando en warframe.market. Subirlos a Rango 10 con Endo multiplica su valor x5.</p></div></header>
          <div class="plat-items-grid">
            ${filtered.map(renderItemChip).join('')}
          </div>
        </article>
      `;
    } else if (S.tab === 'primes') {
      const primeRoute = PLAT_ROUTES.find(r => r.title.includes('Reliquias'));
      const filteredSets = (primeRoute?.items || []).filter(s => !q || norm(s.name).includes(q) || norm(s.note).includes(q));

      html = `
        <article class="card wide">
          <header><div><h3>💎 Sets Prime Más Cotizados</h3><p class="muted small">Vende siempre el SET COMPLETO (Plano principal + Chasis + Sistemas + Neurópticas) para obtener entre un 30% y 50% más de platino.</p></div></header>
          <div class="plat-items-grid">
            ${filteredSets.map(renderItemChip).join('')}
          </div>
        </article>

        <article class="card wide">
          <header><div><h3>⚖️ Tabla de Cotización de "Prime Junk" (Basura Prime para Baro)</h3><p class="muted small">Vende lotes de 6 partes en el chat de comercio los viernes cuando Baro Ki’Teer llega a los repetidores.</p></div></header>
          <table class="tbl">
            <thead><tr><th>Rareza / Ducados</th><th>Ratio Estándar (Lote de 6 partes)</th><th>Precio Por Pieza</th><th>Consejo de Venta</th></tr></thead>
            <tbody>
              ${PRIME_JUNK_RATES.map(j => `
                <tr>
                  <td><b>${esc(j.tier)}</b></td>
                  <td><span class="badge ok">${esc(j.ratio)}</span></td>
                  <td>${esc(j.perPart)}</td>
                  <td><small class="muted">${esc(j.tip)}</small></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </article>
      `;
    } else if (S.tab === 'arcanes') {
      const arcaneRoutes = PLAT_ROUTES.filter(r => r.title.includes('Zariman') || r.title.includes('Sanctum') || r.title.includes('Tridolon'));
      const allArcanes = [];
      arcaneRoutes.forEach(r => {
        (r.items || []).forEach(it => {
          if (!allArcanes.some(x => x.slug === it.slug)) allArcanes.push({ ...it, from: r.title });
        });
      });
      const filteredArcanes = allArcanes.filter(a => !q || norm(a.name).includes(q) || norm(a.note).includes(q) || norm(a.from || '').includes(q));

      html = `
        <article class="card wide">
          <header><div><h3>🔮 Arcanos Más Valiosos de Warframe</h3><p class="muted small">Desde Energizar Arcano hasta los nuevos arcanos de Sanctum Anatomica (*Melee Influence, Crescendo, Duplicate*).</p></div></header>
          <div class="plat-items-grid">
            ${filteredArcanes.map(renderItemChip).join('')}
          </div>
          <div class="build-strategy-box plat-strategy-box">
            <h4>💡 Truco de Disolución de Arcanos en Vosfor (Sanctum Anatomica)</h4>
            <p>Habla con <b>Loid</b> en el Sanctum Anatomica de Deimos y usa la opción <i>Disolución de Arcanos</i>. Puedes desintegrar cientos de arcanos comunes de Acólitos de Camino de Acero que no uses y cambiarlos por paquetes de Arcanos de Colección de Eidolon, permitiéndote sacar <b>Energizar Arcano (50 pl cada uno)</b> sin tener que esperar la noche en las llanuras.</p>
          </div>
        </article>
      `;
    } else if (S.tab === 'special') {
      const specialItems = [
        { name: 'Set de Necramech Voidrig Completo', slug: 'voidrig_set', estPl: '65 – 90 pl', note: 'Requisito obligatorio para la aventura La Nueva Guerra. Cientos de nuevos jugadores lo compran a diario.' },
        { name: 'Braton Vandal Set', slug: 'braton_vandal_set', estPl: '150 – 220 pl', note: 'Masacre en el Santuario Élite (Rotación C). Muy difícil de conseguir.' },
        { name: 'Lato Vandal Set', slug: 'lato_vandal_set', estPl: '180 – 250 pl', note: 'Masacre en el Santuario Élite (Rotación C). Alta demanda de coleccionistas.' }
      ];
      const filteredSpecial = specialItems.filter(s => !q || norm(s.name).includes(q) || norm(s.note).includes(q));

      html = `
        <article class="card wide">
          <header><div><h3>⚔️ Necramechs, Armas Especiales & Liches Kuva</h3><p class="muted small">Objetos comerciales fuera de las reliquias estándar que generan cantidades masivas de platino.</p></div></header>
          <div class="plat-items-grid">
            ${filteredSpecial.map(renderItemChip).join('')}
          </div>

          <div class="two" style="margin-top:16px">
            <div class="build-strategy-box plat-strategy-box">
              <h4>🤖 El Negocio de los Necramechs Voidrig</h4>
              <p>Para jugar <i>La Nueva Guerra</i>, todo jugador necesita obligatoriamente un Necramech. Farmear los minerales, peces y partes dañadas en Deimos toma días. Si compras partes dañadas baratas o las farmeas en Bóvedas de Aislamiento y las construyes, el set completo se vende instantáneamente por <b>70 a 90 pl</b>.</p>
            </div>
            <div class="build-strategy-box plat-strategy-box">
              <h4>👑 Comercio de Liches Kuva & Hermanas de Parvos</h4>
              <p>Cuando derrotes a tu Lich Kuva o Hermana, si tiene un arma meta (*Kuva Bramma, Kuva Zarr, Tenet Arca Plasmor*) con bonificación del <b>55% al 60% de elemento</b>, o si tiene una <b>Efímera elemental</b>, <b>CONVIÉRTELO</b> en lugar de matarlo. Puedes vender el Lich en el bazar del Dojo por <b>80 a 200 pl</b>.</p>
            </div>
          </div>
        </article>
      `;
    } else if (S.tab === 'tips') {
      const filteredTips = PLAT_TIPS.filter(t => !q || norm(t.title).includes(q) || norm(t.body).includes(q));
      html = `
        <div class="plat-tips-container">
          ${filteredTips.map(t => `
            <article class="card plat-tip-card">
              <h3>${esc(t.title)}</h3>
              <p>${esc(t.body)}</p>
            </article>
          `).join('')}
        </div>
      `;
    }

    container.innerHTML = html;
  }

  root.addEventListener('input', debounce((e) => {
    if (e.target.dataset.k === 'q') {
      S.q = e.target.value;
      draw();
    }
  }, 150));

  root.addEventListener('click', (e) => {
    const b = e.target.closest('#plat-seg button');
    if (!b) return;
    S.tab = b.dataset.tab;
    $$('#plat-seg button', root).forEach((x) => x.classList.toggle('on', x === b));
    draw();
  });

  draw();
  return draw;
}

import { $, $$, esc, D, P, img, imgM, imgC, fmt, plat, platBtn, price, chance, rar, slugImg, modImg, debounce, norm, t } from './util.js';
import { formatCountdown, fetchWorldState } from './viewStatus.js';
import { renderRivenStrategyView } from './rivenStrategy.js?v=26.3';

// ============================================================================
// 1. SISTEMA DE NOTIFICACIONES WEB (CASCADA SP, LOTUS, TWITCH, BARO)
// ============================================================================
const NOTIF_STORAGE_KEY = 'wf_utility_notif_settings';
const NOTIF_SENT_KEY = 'wf_utility_notif_sent';

function getNotifSettings() {
  try {
    return JSON.parse(localStorage.getItem(NOTIF_STORAGE_KEY)) || {
      enabled: false,
      cascadeSp: true,
      lotusGift: true,
      twitchDrops: true,
      baroKiTeer: true,
      sound: true
    };
  } catch (e) {
    return { enabled: false, cascadeSp: true, lotusGift: true, twitchDrops: true, baroKiTeer: true, sound: true };
  }
}

function saveNotifSettings(cfg) {
  localStorage.setItem(NOTIF_STORAGE_KEY, JSON.stringify(cfg));
}

// Generador de sonido sutil Tenno con Web Audio API (sin dependencias externas)
function playTennoChime() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const now = ctx.currentTime;
    
    // Tono 1 (suave y armónico)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(587.33, now); // D5
    gain1.gain.setValueAtTime(0.12, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.4);

    // Tono 2 (resolución de campana)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(880.00, now + 0.12); // A5
    gain2.gain.setValueAtTime(0.15, now + 0.12);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.12);
    osc2.stop(now + 0.6);
  } catch (e) {
    // AudioContext puede estar silenciado en navegadores estrictos
  }
}

export function triggerSystemNotification(title, body, tag = 'wf-notif') {
  const cfg = getNotifSettings();
  if (!cfg.enabled || !('Notification' in window) || Notification.permission !== 'granted') return;

  // Evitar notificaciones repetidas en la misma hora
  let sentMap = {};
  try { sentMap = JSON.parse(sessionStorage.getItem(NOTIF_SENT_KEY)) || {}; } catch(e){}
  if (sentMap[tag] && (Date.now() - sentMap[tag] < 30 * 60 * 1000)) return;

  sentMap[tag] = Date.now();
  try { sessionStorage.setItem(NOTIF_SENT_KEY, JSON.stringify(sentMap)); } catch(e){}

  if (cfg.sound) playTennoChime();

  const notif = new Notification(title, {
    body: body,
    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">💠</text></svg>',
    tag: tag
  });

  notif.onclick = () => {
    window.focus();
    location.hash = '#/status';
    notif.close();
  };
}

export function checkBackgroundNotifications(ws) {
  if (!ws) return;
  const cfg = getNotifSettings();
  if (!cfg.enabled) return;
  const now = Date.now();

  // 1. Cascada del Vacío SP
  if (cfg.cascadeSp && ws.fissures) {
    const spCascade = ws.fissures.find(f => 
      f.isHard && 
      (/cascade|cascada/i.test(f.missionType || '') || /tuvul/i.test(f.node || '')) &&
      f.expiry && new Date(f.expiry).getTime() > now
    );
    if (spCascade) {
      triggerSystemNotification(
        '🔥 ¡Cascada del Vacío en Camino de Acero!',
        `Fisura activa en ${spCascade.node} (${spCascade.tier}). ¡Abre reliquias y acumula Esencia de Acero!`,
        `cascade-sp-${spCascade.id || spCascade.node}`
      );
    }
  }

  // 2. Regalos de Lotus
  if (cfg.lotusGift && ws.alerts) {
    const lotusGifts = ws.alerts.filter(a => 
      (a.tag === 'LotusGift' || /lotus|regalo/i.test(a.mission?.description || '')) &&
      a.expiry && new Date(a.expiry).getTime() > now
    );
    if (lotusGifts.length > 0) {
      const g = lotusGifts[0];
      const rew = g.mission?.reward?.items?.join(', ') || 'Recompensa especial';
      triggerSystemNotification(
        '🎁 ¡Alerta de Regalo de Lotus Activa!',
        `Misión en ${g.mission?.node || 'Sistema Solar'}: ${rew}. Termina en ${formatCountdown(g.expiry)}.`,
        `lotus-gift-${g.id}`
      );
    }
  }

  // 3. Twitch Drops
  if (cfg.twitchDrops && ws.news) {
    const streamAlert = ws.news.find(n => 
      (n.stream === true || /twitch|drop|devstream|prime time/i.test(n.message || '')) &&
      n.expiry && new Date(n.expiry).getTime() > now
    );
    if (streamAlert) {
      triggerSystemNotification(
        '🟣 ¡Transmisión Oficial con Twitch Drops!',
        `${streamAlert.message}. Mira los canales oficiales de Twitch para recibir recompensas en tu cuenta.`,
        `twitch-${streamAlert.id}`
      );
    }
  }

  // 4. Baro Ki'Teer
  if (cfg.baroKiTeer && ws.voidTrader) {
    const b = ws.voidTrader;
    if (b.active && b.expiry && new Date(b.expiry).getTime() > now) {
      triggerSystemNotification(
        '🪙 ¡Baro Ki’Teer ha llegado!',
        `El Comerciante del Vacío está en ${b.location || 'el Repetidor'}. Revisa su inventario de mods y cosméticos.`,
        `baro-${b.id || b.location}`
      );
    }
  }
}

// ============================================================================
// 2. BUSCADOR GLOBAL OMNIPRESENTE (CTRL + K / TECLA /)
// ============================================================================
export function initGlobalSearch() {
  if ($('#global-search-modal')) return;

  const modal = document.createElement('div');
  modal.id = 'global-search-modal';
  modal.className = 'global-search-modal-backdrop';
  modal.style.display = 'none';

  modal.innerHTML = `
    <div class="global-search-box" role="dialog" aria-modal="true">
      <div class="global-search-input-wrap">
        <span class="search-icon">🔍</span>
        <input type="text" id="global-search-input" placeholder="Buscar en toda la web: Warframe, arma, reliquia, mod, recurso, build..." autocomplete="off">
        <kbd class="esc-kbd">ESC</kbd>
      </div>
      <div class="global-search-results" id="global-search-results">
        <div class="search-hint-empty">Escribe para buscar al instante entre más de 4,000 elementos de Warframe...</div>
      </div>
      <div class="global-search-footer">
        <span><b>↑ ↓</b> para navegar</span>
        <span><b>ENTER</b> para seleccionar</span>
        <span><b>ESC</b> para cerrar</span>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  const input = $('#global-search-input', modal);
  const resultsBox = $('#global-search-results', modal);

  function openSearch() {
    modal.style.display = 'flex';
    document.body.classList.add('noscroll');
    input.value = '';
    renderResults('');
    setTimeout(() => input.focus(), 50);
  }

  function closeSearch() {
    modal.style.display = 'none';
    document.body.classList.remove('noscroll');
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeSearch();
  });

  document.addEventListener('keydown', (e) => {
    // Atajos Ctrl+K, Cmd+K o / cuando no se está escribiendo en un input
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      modal.style.display === 'flex' ? closeSearch() : openSearch();
    } else if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName) && modal.style.display !== 'flex') {
      e.preventDefault();
      openSearch();
    } else if (e.key === 'Escape' && modal.style.display === 'flex') {
      closeSearch();
    }
  });

  const doSearch = debounce((q) => {
    renderResults(q);
  }, 100);

  input.addEventListener('input', () => doSearch(input.value.trim()));

  input.addEventListener('keydown', (e) => {
    const items = $$('.search-result-item', resultsBox);
    if (!items.length) return;
    const activeIndex = items.findIndex(el => el.classList.contains('selected'));

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = activeIndex < items.length - 1 ? activeIndex + 1 : 0;
      items.forEach((el, idx) => el.classList.toggle('selected', idx === next));
      items[next]?.scrollIntoView({ block: 'nearest' });
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prev = activeIndex > 0 ? activeIndex - 1 : items.length - 1;
      items.forEach((el, idx) => el.classList.toggle('selected', idx === prev));
      items[prev]?.scrollIntoView({ block: 'nearest' });
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const selected = items[activeIndex >= 0 ? activeIndex : 0];
      if (selected) {
        selected.click();
      }
    }
  });

  function renderResults(q) {
    if (!q) {
      resultsBox.innerHTML = `
        <div class="search-hint-empty">
          <p>⚡ <b>Accesos directos rápidos:</b></p>
          <div class="quick-nav-pills">
            <a href="#/primes" class="pill" onclick="document.getElementById('global-search-modal').style.display='none'">💎 Sets Prime</a>
            <a href="#/status" class="pill" onclick="document.getElementById('global-search-modal').style.display='none'">⚡ Estado en Vivo</a>
            <a href="#/tools?tab=relics" class="pill" onclick="document.getElementById('global-search-modal').style.display='none'">⚡ Selector Fisuras (15s)</a>
            <a href="#/tools?tab=ducats" class="pill" onclick="document.getElementById('global-search-modal').style.display='none'">🪙 Ducados vs Platino</a>
            <a href="#/builds" class="pill" onclick="document.getElementById('global-search-modal').style.display='none'">🛠️ Builds</a>
            <a href="#/farm" class="pill" onclick="document.getElementById('global-search-modal').style.display='none'">📍 Dónde Farmear</a>
            <a href="#/plat" class="pill" onclick="document.getElementById('global-search-modal').style.display='none'">💰 Guía Platino</a>
          </div>
        </div>
      `;
      return;
    }

    const nq = norm(q);
    const matches = [];

    // 1. Sets Prime (D.primes)
    (D.primes || []).forEach(p => {
      if (norm(p.set).includes(nq)) {
        const pr = p.slug ? price(p.slug) : null;
        matches.push({
          type: 'Prime Set',
          badge: '💎 PRIME',
          title: p.set,
          desc: `${p.vaulted ? 'Vaulted · ' : ''}${p.parts?.length || 0} partes · ${p.type || 'Equipamiento'}`,
          img: slugImg(p.slug) || (p.img ? imgC(p.img) : ''),
          url: `#/primes`,
          meta: pr != null ? `${pr} pl` : ''
        });
      }
    });

    // 2. Builds (Warframes y Armas)
    Object.keys(D.cat || {}).forEach(name => {
      if (norm(name).includes(nq)) {
        const item = D.cat[name];
        matches.push({
          type: 'Build / Catálogo',
          badge: '🛠️ BUILD',
          title: name,
          desc: `${item.type || 'Arma/Warframe'} · Maestría: MR ${item.mr || 0}`,
          img: imgC(item.img),
          url: `#/builds`,
          meta: 'Ver Build'
        });
      }
    });

    // 3. Arcanos (D.arcanes)
    (D.arcanes || []).forEach(a => {
      if (norm(a.name).includes(nq) || (a.slug && norm(a.slug).includes(nq))) {
        const pr = a.slug ? price(a.slug) : null;
        matches.push({
          type: 'Arcano',
          badge: '🔮 ARCANO',
          title: t(a.name, a.name),
          desc: `Fuente: ${a.source || 'Jefes / Misiones'}`,
          img: slugImg(a.slug) || imgC(a.img),
          url: `#/arcanes`,
          meta: pr != null ? `${pr} pl` : ''
        });
      }
    });

    // 4. Mods Valiosos (D.mods)
    (D.mods || []).forEach(m => {
      if (norm(m.name).includes(nq) || (m.slug && norm(m.slug).includes(nq))) {
        const pr = m.slug ? price(m.slug) : null;
        matches.push({
          type: 'Mod',
          badge: '🪙 MOD',
          title: t(m.name, m.name),
          desc: `Categoría: ${m.type || 'Mod Valioso'}`,
          img: slugImg(m.slug) || imgC(m.img),
          url: `#/mods`,
          meta: pr != null ? `${pr} pl` : ''
        });
      }
    });

    // 5. Recursos de Farmeo
    const resourcesList = [
      { name: 'Célula Orokin', loc: 'Saturno / Ceres / Deimos (Gabii +35%)' },
      { name: 'Galio', loc: 'Marte / Urano (Ophelia)' },
      { name: 'Plástidos', loc: 'Saturno / Urano (Assur +25%)' },
      { name: 'Módulo de Control', loc: 'Vacío / Neptuno / Europa' },
      { name: 'Sensor Neuronal', loc: 'Júpiter (Camenae / Elara)' },
      { name: 'Telurio', loc: 'Urano (Ophelia Sumergible)' },
      { name: 'Endo', loc: 'Arena Yam/Vodyanoi (Sedna) / Arbitrajes' },
      { name: 'Estela', loc: 'Laboratorios de Albrecht (Deimos)' }
    ];
    resourcesList.forEach(r => {
      if (norm(r.name).includes(nq)) {
        matches.push({
          type: 'Recurso',
          badge: '📍 RECURSO',
          title: r.name,
          desc: `Mejor punto: ${r.loc}`,
          img: '',
          url: `#/farm`,
          meta: 'Guía de Farmeo'
        });
      }
    });

    // 5. Agrietados / Rivens / Estrategia
    if ('agrietados'.includes(nq) || 'rivens'.includes(nq) || 'god roll'.includes(nq) || 'kuva'.includes(nq)) {
      matches.push({
        type: 'Herramienta',
        badge: '🌀 AGRIETADOS',
        title: 'Estrategia God Roll & Calculadora Riven',
        desc: 'Topes máximos, economía de Kuva, empalme/transmutador y mejores estadísticas',
        img: '',
        url: '#/rivens',
        meta: 'Calculadora Riven'
      });
    }

    // Limitar a los mejores 12 resultados
    const top = matches.slice(0, 12);

    if (!top.length) {
      resultsBox.innerHTML = `<div class="search-hint-empty">No se encontraron resultados para <b>"${esc(q)}"</b>. Prueba buscando en inglés o español.</div>`;
      return;
    }

    resultsBox.innerHTML = top.map((item, idx) => `
      <a href="${item.url}" class="search-result-item ${idx === 0 ? 'selected' : ''}" onclick="document.getElementById('global-search-modal').style.display='none'">
        <div class="result-img-wrap">
          ${item.img ? `<img src="${item.img}" alt="" loading="lazy">` : `<span class="result-fallback-ico">${item.badge.split(' ')[0]}</span>`}
        </div>
        <div class="result-text-wrap">
          <div class="result-title-row">
            <span class="result-title">${esc(item.title)}</span>
            <span class="badge ${item.badge.toLowerCase().includes('prime') ? 'vault' : ''}">${item.badge}</span>
          </div>
          <span class="result-desc">${esc(item.desc)}</span>
        </div>
        ${item.meta ? `<div class="result-meta-pill">${esc(item.meta)}</div>` : ''}
      </a>
    `).join('');
  }

  // Vincular botón en el header
  document.addEventListener('click', (e) => {
    if (e.target.closest('#open-global-search') || e.target.closest('.search-trigger-btn')) {
      openSearch();
    }
  });
}

// ============================================================================
// 3. SELECTOR RÁPIDO DE FISURAS (15 SEGUNDOS - RELIC CRACK HELPER)
// ============================================================================
export function renderRelicHelper(container) {
  // Construir lista plana de todas las partes Prime disponibles en el juego
  const allParts = [];
  (D.primes || []).forEach(prime => {
    (prime.parts || []).forEach(part => {
      allParts.push({
        name: part.name,
        setName: prime.set,
        slug: part.slug,
        ducats: part.d || 15,
        vaulted: part.vaulted || prime.vaulted || false,
        img: slugImg(part.slug) || (prime.img ? imgC(prime.img) : '')
      });
    });
  });

  container.innerHTML = `
    <div class="relic-helper-card">
      <header class="relic-helper-header">
        <div>
          <h2>⚡ Selector de Recompensas de Fisuras (15 Segundos)</h2>
          <p class="muted">¿No sabes qué pieza elegir al abrir reliquias con tu escuadrón? Escribe 2 o 3 letras de cada una de las 4 opciones y la herramienta calculará al instante la opción más valiosa en platino y ducados.</p>
        </div>
        <button class="btn ghost" id="reset-relic-slots">🔄 Limpiar para la siguiente ronda</button>
      </header>

      <div class="relic-slots-grid">
        ${[1, 2, 3, 4].map(slotNum => `
          <div class="relic-slot-box" data-slot="${slotNum}">
            <div class="relic-slot-header">
              <span class="slot-num-badge">Ranura #${slotNum}</span>
              <button class="clear-slot-btn" title="Borrar">✕</button>
            </div>
            <div class="relic-search-input-wrap">
              <input type="text" class="relic-input" placeholder="Escribe parte #${slotNum}..." autocomplete="off">
              <div class="relic-dropdown" style="display:none;"></div>
            </div>
            <div class="slot-selection-card empty">
              <span class="muted small">Esperando selección...</span>
            </div>
          </div>
        `).join('')}
      </div>

      <div class="relic-verdict-card" id="relic-verdict" style="display:none;"></div>
    </div>
  `;

  const selectedSlots = { 1: null, 2: null, 3: null, 4: null };

  function updateSlotUi(slotNum, part) {
    selectedSlots[slotNum] = part;
    const box = $(`[data-slot="${slotNum}"]`, container);
    const card = $('.slot-selection-card', box);
    const input = $('.relic-input', box);

    if (!part) {
      card.className = 'slot-selection-card empty';
      card.innerHTML = `<span class="muted small">Esperando selección...</span>`;
      input.value = '';
    } else {
      const pl = part.slug ? price(part.slug) : null;
      card.className = 'slot-selection-card active';
      card.innerHTML = `
        <div class="sel-part-row">
          ${part.img ? `<img src="${part.img}" alt="" class="sel-part-img">` : ''}
          <div class="sel-part-info">
            <b>${esc(part.name)}</b>
            <div class="sel-part-badges">
              <span class="badge ducat-badge">🪙 ${part.ducats} ducados</span>
              ${part.vaulted ? '<span class="badge vault">Bóveda</span>' : ''}
            </div>
          </div>
        </div>
        <div class="sel-part-price">
          <span class="small muted">Valor mercado:</span>
          <b>${pl != null ? pl + ' pl' : 'Sin datos'}</b>
        </div>
      `;
    }

    calculateBestChoice();
  }

  function calculateBestChoice() {
    const verdict = $('#relic-verdict', container);
    const activeParts = Object.entries(selectedSlots)
      .filter(([_, p]) => p != null)
      .map(([slot, p]) => ({
        slot: Number(slot),
        part: p,
        pl: p.slug ? (price(p.slug) || 0) : 0,
        ducats: p.ducats || 15
      }));

    if (activeParts.length < 2) {
      verdict.style.display = 'none';
      $$('.relic-slot-box', container).forEach(b => b.classList.remove('winner-slot'));
      return;
    }

    // Calcular ganador por Platino y por Ducados
    const bestByPlat = [...activeParts].sort((a, b) => b.pl - a.pl)[0];
    const bestByDucats = [...activeParts].sort((a, b) => b.ducats - a.ducats)[0];

    // Resaltar ranura ganadora en el grid
    $$('.relic-slot-box', container).forEach(b => {
      const s = Number(b.dataset.slot);
      b.classList.toggle('winner-slot', s === bestByPlat.slot);
    });

    verdict.style.display = 'block';
    verdict.innerHTML = `
      <div class="verdict-content">
        <div class="verdict-icon">👑</div>
        <div class="verdict-text">
          <h3>¡Elige la Ranura #${bestByPlat.slot}: ${esc(bestByPlat.part.name)}!</h3>
          <p>
            Tiene el mayor valor comercial: <b>${bestByPlat.pl} Platino</b> en warframe.market.
            ${bestByPlat.part.vaulted ? '<span class="badge vault" style="margin-left:6px;">Pieza Vaulted</span>' : ''}
          </p>
          ${bestByDucats.slot !== bestByPlat.slot ? `
            <p class="small muted">
              💡 <i>Alternativa para Baro Ki'Teer:</i> Si necesitas ducados, la <b>Ranura #${bestByDucats.slot} (${esc(bestByDucats.part.name)})</b> otorga más ducados (<b>${bestByDucats.ducats} ducados</b>).
            </p>
          ` : ''}
        </div>
      </div>
    `;
  }

  // Eventos de autocompletado en cada ranura
  $$('.relic-slot-box', container).forEach(box => {
    const slotNum = Number(box.dataset.slot);
    const input = $('.relic-input', box);
    const dropdown = $('.relic-dropdown', box);
    const clearBtn = $('.clear-slot-btn', box);

    clearBtn.addEventListener('click', () => {
      updateSlotUi(slotNum, null);
      input.focus();
    });

    input.addEventListener('input', () => {
      const val = norm(input.value.trim());
      if (val.length < 2) {
        dropdown.style.display = 'none';
        return;
      }

      const matches = allParts.filter(p => norm(p.name).includes(val)).slice(0, 6);
      if (!matches.length) {
        dropdown.style.display = 'none';
        return;
      }

      dropdown.style.display = 'block';
      dropdown.innerHTML = matches.map(p => {
        const pl = p.slug ? price(p.slug) : null;
        return `
          <div class="dropdown-item" data-slug="${p.slug}">
            <span>${esc(p.name)}</span>
            <span class="dropdown-meta">🪙 ${p.ducats}d · <b>${pl != null ? pl + 'pl' : '-'}</b></span>
          </div>
        `;
      }).join('');

      $$('.dropdown-item', dropdown).forEach(item => {
        item.addEventListener('click', () => {
          const found = allParts.find(p => p.slug === item.dataset.slug);
          if (found) updateSlotUi(slotNum, found);
          dropdown.style.display = 'none';
        });
      });
    });

    // Cerrar dropdown al hacer click fuera
    document.addEventListener('click', (e) => {
      if (!box.contains(e.target)) dropdown.style.display = 'none';
    });
  });

  // Botón reset
  $('#reset-relic-slots', container).addEventListener('click', () => {
    [1, 2, 3, 4].forEach(s => updateSlotUi(s, null));
  });
}

// ============================================================================
// 4. OPTIMIZADOR DE DUCADOS VS PLATINO (CALCULADORA DE BARO)
// ============================================================================
export function renderDucatsOptimizer(container) {
  const parts = [];
  (D.primes || []).forEach(prime => {
    (prime.parts || []).forEach(part => {
      const pl = part.slug ? (price(part.slug) || 0) : 0;
      const d = part.d || 15;
      const ratio = pl > 0 ? (d / pl) : 0; // Ducados por cada 1 Platino
      parts.push({
        name: part.name,
        setName: prime.set,
        slug: part.slug,
        ducats: d,
        pl: pl,
        ratio: ratio,
        vaulted: part.vaulted || prime.vaulted || false,
        img: slugImg(part.slug) || (prime.img ? imgC(prime.img) : '')
      });
    });
  });

  let filter = 'best_ducats'; // best_ducats | best_plat | prime_junk
  let query = '';

  function draw() {
    let list = [...parts];

    if (query) {
      const nq = norm(query);
      list = list.filter(p => norm(p.name).includes(nq));
    }

    if (filter === 'best_ducats') {
      // Ordenar por ratio descendente (más ducados por platino)
      list = list.filter(p => p.pl > 0).sort((a, b) => b.ratio - a.ratio);
    } else if (filter === 'best_plat') {
      // Ordenar por platino descendente
      list = list.sort((a, b) => b.pl - a.pl);
    } else if (filter === 'prime_junk') {
      // Piezas baratas que dan 45 o 100 ducados y valen poco platino
      list = list.filter(p => p.pl <= 4 && p.ducats >= 45).sort((a, b) => b.ducats - a.ducats);
    }

    const totalListed = list.length;
    const topItems = list.slice(0, 40);

    container.innerHTML = `
      <div class="ducats-optimizer-view">
        <header class="ducats-header">
          <div>
            <h2>🪙 Optimizador de Ducados vs Platino (Calculadora Baro)</h2>
            <p class="muted">
              Analiza en tiempo real qué piezas Prime te conviene <b>canjear por Ducados</b> en el Quiosco de Baro Ki'Teer y cuáles es mucho más rentable <b>vender por Platino</b> a otros jugadores.
            </p>
          </div>
        </header>

        <div class="toolbar" style="margin-bottom:14px;">
          <div class="seg" id="ducats-seg">
            <button data-f="best_ducats" class="${filter === 'best_ducats' ? 'on' : ''}">🪙 Mejores para Baro (Alto Ratio Ducados/PL)</button>
            <button data-f="best_plat" class="${filter === 'best_plat' ? 'on' : ''}">💎 Mejores para Vender por Platino</button>
            <button data-f="prime_junk" class="${filter === 'prime_junk' ? 'on' : ''}">📦 Chatarra Prime (Max Ducados por poco PL)</button>
          </div>
          <input type="text" id="ducats-search" placeholder="Filtrar por nombre de pieza..." value="${esc(query)}" style="max-width:280px;">
        </div>

        <div class="table-responsive">
          <table class="tbl ducats-table">
            <thead>
              <tr>
                <th>Pieza Prime</th>
                <th>Ducados</th>
                <th>Precio Platino</th>
                <th>Ratio (Ducados/PL)</th>
                <th>Recomendación Tenno</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              ${topItems.map(p => {
                let badgeClass = 'ok';
                let recommendation = 'Vender por Platino';
                if (p.ratio >= 15) {
                  badgeClass = 'vault';
                  recommendation = '🔥 ¡Canjear por Ducados en Baro!';
                } else if (p.ratio >= 8) {
                  badgeClass = 'gold';
                  recommendation = '🪙 Bueno para Ducados';
                } else if (p.pl > 15) {
                  badgeClass = 'ok';
                  recommendation = '💎 ¡Vender por Platino a Tenno!';
                } else {
                  badgeClass = 'muted';
                  recommendation = 'Neutro / Chatarra';
                }

                return `
                  <tr>
                    <td>
                      <div class="prime-part-col">
                        ${p.img ? `<img src="${p.img}" alt="" class="tbl-prime-img">` : ''}
                        <div>
                          <b>${esc(p.name)}</b>
                          ${p.vaulted ? '<span class="badge vault mini-badge">Vaulted</span>' : ''}
                        </div>
                      </div>
                    </td>
                    <td><b>🪙 ${p.ducats}</b></td>
                    <td>${plat(p.pl)}</td>
                    <td>
                      <span class="ratio-pill ${p.ratio >= 10 ? 'high-ratio' : ''}">
                        ${p.ratio > 0 ? p.ratio.toFixed(1) + ' d/pl' : '-'}
                      </span>
                    </td>
                    <td><span class="badge ${badgeClass}">${recommendation}</span></td>
                    <td>
                      <button class="mini" data-act="orders" data-slug="${p.slug}">Ver compradores ↗</button>
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;

    // Eventos
    $('#ducats-seg', container).addEventListener('click', (e) => {
      const btn = e.target.closest('button');
      if (btn) {
        filter = btn.dataset.f;
        draw();
      }
    });

    $('#ducats-search', container).addEventListener('input', (e) => {
      query = e.target.value.trim();
      draw();
    });
  }

  draw();
}

// ============================================================================
// 5. GENERADOR DE MENSAJES PARA EL CHAT DE COMERCIO (/TRADE)
// ============================================================================
export function renderTradeGenerator(container) {
  let mode = 'WTS'; // WTS (Want to sell) o WTB (Want to buy)
  const items = []; // lista de { name, price, rank }

  // Items populares de D.mk y D.primes
  const commonItems = Object.values(D.mk || {}).map(x => x.n).slice(0, 1000);

  function getFormattedMessage() {
    if (!items.length) return '';
    const parts = items.map(it => {
      const rankStr = it.rank ? ` R${it.rank}` : '';
      return `[${it.name}]${rankStr} ${it.price ? it.price + 'p' : ''}`.trim();
    });
    return `${mode} ${parts.join(' ')} PMO`;
  }

  function draw() {
    const msg = getFormattedMessage();
    const charCount = msg.length;
    const maxChars = 180; // Límite oficial del chat de Warframe
    const isOver = charCount > maxChars;

    container.innerHTML = `
      <div class="trade-generator-view">
        <header>
          <h2>💬 Generador de Mensajes para el Chat de Comercio (/trade)</h2>
          <p class="muted">
            Arma tu mensaje de compra o venta con los corchetes oficiales de Warframe <code>[Item]</code> para que sea interactivo en el chat del juego. Controla automáticamente el límite de 180 caracteres.
          </p>
        </header>

        <div class="trade-toolbar">
          <div class="seg" id="trade-mode-seg">
            <button class="${mode === 'WTS' ? 'on' : ''}" data-m="WTS">🟢 VENDER (WTS)</button>
            <button class="${mode === 'WTB' ? 'on' : ''}" data-m="WTB">🔵 COMPRAR (WTB)</button>
          </div>
          <button class="btn ghost" id="clear-trade-items">Limpiar todo</button>
        </div>

        <div class="trade-input-row">
          <div class="trade-input-group" style="flex:2;">
            <label class="small muted">Nombre del Item o Set:</label>
            <input type="text" id="trade-item-name" placeholder="Ej. Glaive Prime Set, Torid Riven, Arcane Energize..." autocomplete="off">
            <div id="trade-autocomplete" class="relic-dropdown" style="display:none;"></div>
          </div>
          <div class="trade-input-group" style="flex:1;">
            <label class="small muted">Precio en Platino:</label>
            <input type="number" id="trade-item-price" placeholder="Ej. 75">
          </div>
          <div class="trade-input-group" style="flex:1;">
            <label class="small muted">Rango (Opcional):</label>
            <input type="text" id="trade-item-rank" placeholder="Ej. Max, R5, R10">
          </div>
          <button class="btn" id="add-trade-item" style="align-self:flex-end;">＋ Agregar</button>
        </div>

        <div class="trade-chips-box">
          <label class="small muted">Items agregados al mensaje (${items.length}):</label>
          <div class="trade-chips-list">
            ${items.map((it, idx) => `
              <div class="trade-item-chip">
                <span><b>[${esc(it.name)}]</b> ${it.rank ? `(${esc(it.rank)})` : ''} · <b>${it.price ? it.price + 'p' : 'Ofertas'}</b></span>
                <button class="remove-chip-btn" data-idx="${idx}" title="Quitar">✕</button>
              </div>
            `).join('') || '<span class="muted small">Aún no has agregado ningún item. Escribe uno arriba para comenzar.</span>'}
          </div>
        </div>

        <!-- VISTA PREVIA Y BOTÓN COPIAR -->
        <div class="trade-preview-box ${isOver ? 'over-limit' : ''}">
          <div class="trade-preview-header">
            <b>Vista previa lista para pegar en el chat del juego:</b>
            <span class="char-counter ${isOver ? 'counter-danger' : ''}">${charCount} / ${maxChars} caracteres</span>
          </div>
          <div class="trade-preview-code">
            ${esc(msg) || '<span class="muted">// Tu mensaje formateado aparecerá aquí...</span>'}
          </div>
          ${isOver ? '<p class="small danger-text">⚠️ El mensaje supera los 180 caracteres que permite el chat de Warframe. Quita un item para que no se corte.</p>' : ''}
          <div class="trade-preview-actions">
            <button class="btn" id="copy-trade-btn" ${!msg || isOver ? 'disabled' : ''}>
              📋 Copiar Mensaje al Portapapeles (Ctrl+V)
            </button>
          </div>
        </div>
      </div>
    `;

    // Eventos
    $('#trade-mode-seg', container).addEventListener('click', (e) => {
      const btn = e.target.closest('button');
      if (btn) {
        mode = btn.dataset.m;
        draw();
      }
    });

    const nameInput = $('#trade-item-name', container);
    const priceInput = $('#trade-item-price', container);
    const rankInput = $('#trade-item-rank', container);
    const autoBox = $('#trade-autocomplete', container);

    nameInput.addEventListener('input', () => {
      const q = norm(nameInput.value.trim());
      if (q.length < 2) {
        autoBox.style.display = 'none';
        return;
      }
      const matches = commonItems.filter(n => norm(n).includes(q)).slice(0, 6);
      if (!matches.length) {
        autoBox.style.display = 'none';
        return;
      }
      autoBox.style.display = 'block';
      autoBox.innerHTML = matches.map(n => `<div class="dropdown-item">${esc(n)}</div>`).join('');
      $$('.dropdown-item', autoBox).forEach(item => {
        item.addEventListener('click', () => {
          nameInput.value = item.textContent;
          autoBox.style.display = 'none';
          priceInput.focus();
        });
      });
    });

    document.addEventListener('click', (e) => {
      if (!nameInput.contains(e.target)) autoBox.style.display = 'none';
    });

    function addItem() {
      const n = nameInput.value.trim();
      if (!n) return;
      items.push({
        name: n,
        price: priceInput.value.trim(),
        rank: rankInput.value.trim()
      });
      draw();
    }

    $('#add-trade-item', container).addEventListener('click', addItem);
    nameInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') addItem(); });
    priceInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') addItem(); });

    container.addEventListener('click', (e) => {
      const btn = e.target.closest('.remove-chip-btn');
      if (btn) {
        const idx = Number(btn.dataset.idx);
        items.splice(idx, 1);
        draw();
      }
    });

    $('#clear-trade-items', container)?.addEventListener('click', () => {
      items.length = 0;
      draw();
    });

    $('#copy-trade-btn', container)?.addEventListener('click', (e) => {
      navigator.clipboard?.writeText(msg);
      const originalText = e.target.textContent;
      e.target.textContent = '¡Copiado con éxito! Listo para pegar en Warframe';
      setTimeout(() => (e.target.textContent = originalText), 2000);
    });
  }

  draw();
}

// ============================================================================
// 6. RASTREADOR DE MAESTRÍA (MR) Y COLECCIÓN TENNO
// ============================================================================
const MASTERY_STORAGE_KEY = 'wf_mastery_owned_v1';

export function renderMasteryTracker(container) {
  let owned = {};
  try { owned = JSON.parse(localStorage.getItem(MASTERY_STORAGE_KEY)) || {}; } catch(e){}

  const catalog = D.cat || {};
  const allItems = Object.entries(catalog).map(([name, data]) => ({
    name: name,
    type: data.type || 'Weapon',
    mr: data.mr || 0,
    img: data.img ? imgC(data.img) : '',
    isFrame: data.type === 'Warframe' || data.type === 'Necramech',
    isCompanion: ['Sentinel', 'Pets', 'Pet Parts'].includes(data.type),
    isWeapon: !['Warframe', 'Necramech', 'Sentinel', 'Pets', 'Pet Parts'].includes(data.type),
    xp: (data.type === 'Warframe' || data.type === 'Necramech' || ['Sentinel', 'Pets'].includes(data.type)) ? 6000 : 3000
  }));

  let curCategory = 'all'; // all | warframes | weapons | companions | easy_mr
  let curSearch = '';

  function save() {
    localStorage.setItem(MASTERY_STORAGE_KEY, JSON.stringify(owned));
  }

  function calculateMasteryStats() {
    let earnedXp = 0;
    let totalPossibleXp = 0;
    allItems.forEach(it => {
      totalPossibleXp += it.xp;
      if (owned[it.name]) earnedXp += it.xp;
    });

    // Fórmula oficial de Warframe: MR = floor(sqrt(XP / 2500))
    const currentMr = Math.floor(Math.sqrt(earnedXp / 2500));
    const nextMr = currentMr + 1;
    const currentMrBaseXp = Math.pow(currentMr, 2) * 2500;
    const nextMrTargetXp = Math.pow(nextMr, 2) * 2500;
    const xpIntoCurrent = earnedXp - currentMrBaseXp;
    const xpNeededForNext = nextMrTargetXp - currentMrBaseXp;
    const pct = xpNeededForNext > 0 ? Math.min(100, Math.round((xpIntoCurrent / xpNeededForNext) * 100)) : 100;

    return {
      earnedXp,
      totalPossibleXp,
      currentMr,
      nextMr,
      xpRemaining: Math.max(0, nextMrTargetXp - earnedXp),
      pct
    };
  }

  function draw() {
    const stats = calculateMasteryStats();

    let filtered = [...allItems];
    if (curCategory === 'warframes') filtered = filtered.filter(x => x.isFrame);
    else if (curCategory === 'weapons') filtered = filtered.filter(x => x.isWeapon);
    else if (curCategory === 'companions') filtered = filtered.filter(x => x.isCompanion);
    else if (curCategory === 'easy_mr') filtered = filtered.filter(x => x.mr <= 4 && !owned[x.name]);

    if (curSearch) {
      const nq = norm(curSearch);
      filtered = filtered.filter(x => norm(x.name).includes(nq));
    }

    container.innerHTML = `
      <div class="mastery-tracker-view">
        <!-- TARJETA CABECERA DE PROGRESO DE MAESTRÍA -->
        <div class="mastery-overview-card">
          <div class="mr-rank-badge">
            <span class="mr-level-title">RANGO DE MAESTRÍA</span>
            <span class="mr-number">${stats.currentMr}</span>
            <span class="mr-rank-name">${stats.currentMr >= 30 ? '⭐ Maestría Verdadera' : `Rango ${stats.currentMr}`}</span>
          </div>
          <div class="mr-stats-detail">
            <div class="mr-progress-header">
              <span><b>Progreso hacia Rango ${stats.nextMr}:</b> ${stats.pct}%</span>
              <span>Faltan <b>${fmt(stats.xpRemaining)} XP</b></span>
            </div>
            <div class="bar mastery-progress-bar"><span style="width:${stats.pct}%"></span></div>
            <div class="mr-xp-meta">
              <span>XP Total Acumulada: <b>${fmt(stats.earnedXp)}</b></span>
              <span>Total de Objetos Dominados: <b>${Object.keys(owned).filter(k => owned[k]).length} / ${allItems.length}</b></span>
            </div>
          </div>
        </div>

        <!-- FILTROS Y CATEGORÍAS -->
        <div class="toolbar" style="margin-top:16px;">
          <div class="seg wrap" id="mastery-cat-seg">
            <button class="${curCategory === 'all' ? 'on' : ''}" data-cat="all">Todos (${allItems.length})</button>
            <button class="${curCategory === 'warframes' ? 'on' : ''}" data-cat="warframes">🛡️ Warframes (6,000 XP)</button>
            <button class="${curCategory === 'weapons' ? 'on' : ''}" data-cat="weapons">⚔️ Armas (3,000 XP)</button>
            <button class="${curCategory === 'companions' ? 'on' : ''}" data-cat="companions">🐾 Compañeros</button>
            <button class="${curCategory === 'easy_mr' ? 'on' : ''}" data-cat="easy_mr">⚡ Fáciles para Subir Rápido</button>
          </div>
          <input type="text" id="mastery-search" placeholder="Buscar por nombre..." value="${esc(curSearch)}" style="max-width:260px;">
        </div>

        <!-- LISTA DE OBJETOS -->
        <div class="mastery-grid">
          ${filtered.slice(0, 100).map(it => {
            const isOwned = !!owned[it.name];
            return `
              <div class="mastery-item-card ${isOwned ? 'mastered' : ''}" data-item="${esc(it.name)}">
                <input type="checkbox" class="mastery-check" ${isOwned ? 'checked' : ''}>
                <div class="mastery-thumb">
                  ${it.img ? `<img src="${it.img}" alt="" loading="lazy">` : '🛡️'}
                </div>
                <div class="mastery-item-info">
                  <b>${esc(it.name)}</b>
                  <span class="small muted">${esc(it.type)} · MR ${it.mr}</span>
                </div>
                <span class="mastery-xp-badge">+${fmt(it.xp)} XP</span>
              </div>
            `;
          }).join('')}
        </div>
        ${filtered.length > 100 ? `<p class="muted small" style="text-align:center; margin-top:12px;">Mostrando primeros 100 de ${filtered.length} objetos. Usa el buscador para filtrar uno específico.</p>` : ''}
      </div>
    `;

    // Eventos
    $('#mastery-cat-seg', container).addEventListener('click', (e) => {
      const btn = e.target.closest('button');
      if (btn) {
        curCategory = btn.dataset.cat;
        draw();
      }
    });

    $('#mastery-search', container).addEventListener('input', (e) => {
      curSearch = e.target.value.trim();
      draw();
    });

    container.addEventListener('change', (e) => {
      const chk = e.target.closest('.mastery-check');
      if (chk) {
        const card = chk.closest('.mastery-item-card');
        const itemName = card.dataset.item;
        owned[itemName] = chk.checked;
        save();
        card.classList.toggle('mastered', chk.checked);
        // Actualizar barra de progreso sin re-renderizar todo
        const newStats = calculateMasteryStats();
        $('.mr-number', container).textContent = newStats.currentMr;
        $('.mastery-progress-bar span', container).style.width = newStats.pct + '%';
      }
    });
  }

  draw();
}

// ============================================================================
// 7. CONFIGURACIÓN DE NOTIFICACIONES PUSH DEL SISTEMA
// ============================================================================
export function renderNotificationSettings(container) {
  const cfg = getNotifSettings();
  const perm = 'Notification' in window ? Notification.permission : 'unsupported';

  container.innerHTML = `
    <div class="notif-settings-view">
      <header>
        <h2>🔔 Notificaciones del Sistema en Tiempo Real</h2>
        <p class="muted">
          Recibe alertas nativas en tu pantalla (incluso cuando tengas el juego abierto o la pestaña en segundo plano) cuando ocurran eventos críticos en Warframe.
        </p>
      </header>

      <div class="notif-perm-card ${perm === 'granted' ? 'granted' : ''}">
        <div class="notif-perm-icon">${perm === 'granted' ? '✅' : '🔔'}</div>
        <div class="notif-perm-info">
          <h3>Estado del Permiso del Navegador: <span class="badge ${perm === 'granted' ? 'ok' : 'vault'}">${perm.toUpperCase()}</span></h3>
          <p class="small muted">
            ${perm === 'granted' 
              ? 'Las notificaciones están autorizadas en este navegador.' 
              : 'Haz clic en el botón de abajo para autorizar a Warframe Utility a enviarte notificaciones de escritorio.'}
          </p>
        </div>
        ${perm !== 'granted' ? '<button class="btn" id="request-notif-perm">Activar Notificaciones</button>' : ''}
      </div>

      <div class="notif-toggles-grid">
        <label class="notif-toggle-item">
          <div>
            <b>Activar Sistema de Notificaciones</b>
            <p class="small muted">Habilita o pausa todas las alertas del sitio.</p>
          </div>
          <input type="checkbox" id="toggle-notif-enabled" ${cfg.enabled ? 'checked' : ''}>
        </label>

        <label class="notif-toggle-item">
          <div>
            <b>🔥 Cascada del Vacío en Camino de Acero</b>
            <p class="small muted">Avisar inmediatamente cuando inicie Cascada SP en Zariman para quemar reliquias a máxima velocidad.</p>
          </div>
          <input type="checkbox" id="toggle-notif-cascade" ${cfg.cascadeSp ? 'checked' : ''}>
        </label>

        <label class="notif-toggle-item">
          <div>
            <b>🎁 Regalos de Lotus y Alertas Especiales</b>
            <p class="small muted">Avisar cuando haya misiones de Reactores/Catalizadores Orokin o Formas.</p>
          </div>
          <input type="checkbox" id="toggle-notif-lotus" ${cfg.lotusGift ? 'checked' : ''}>
        </label>

        <label class="notif-toggle-item">
          <div>
            <b>🟣 Transmisiones de Twitch y Twitch Drops</b>
            <p class="small muted">Avisar cuando haya directos comunitarios o Devstreams con recompensas activas.</p>
          </div>
          <input type="checkbox" id="toggle-notif-twitch" ${cfg.twitchDrops ? 'checked' : ''}>
        </label>

        <label class="notif-toggle-item">
          <div>
            <b>🪙 Llegada de Baro Ki'Teer</b>
            <p class="small muted">Avisar los viernes en cuanto Baro arribe al Repetidor con su inventario.</p>
          </div>
          <input type="checkbox" id="toggle-notif-baro" ${cfg.baroKiTeer ? 'checked' : ''}>
        </label>

        <label class="notif-toggle-item">
          <div>
            <b>🔊 Sonido Tenno Sutil</b>
            <p class="small muted">Reproduce un timbre armónico suave al recibir una alerta.</p>
          </div>
          <input type="checkbox" id="toggle-notif-sound" ${cfg.sound ? 'checked' : ''}>
        </label>
      </div>

      <div style="margin-top:16px;">
        <button class="btn ghost" id="test-notif-btn">🔔 Probar Notificación de Ejemplo</button>
      </div>
    </div>
  `;

  $('#request-notif-perm', container)?.addEventListener('click', async () => {
    if ('Notification' in window) {
      const p = await Notification.requestPermission();
      if (p === 'granted') {
        cfg.enabled = true;
        saveNotifSettings(cfg);
      }
      renderNotificationSettings(container);
    }
  });

  function bindToggle(id, key) {
    $(`#${id}`, container)?.addEventListener('change', (e) => {
      cfg[key] = e.target.checked;
      saveNotifSettings(cfg);
    });
  }

  bindToggle('toggle-notif-enabled', 'enabled');
  bindToggle('toggle-notif-cascade', 'cascadeSp');
  bindToggle('toggle-notif-lotus', 'lotusGift');
  bindToggle('toggle-notif-twitch', 'twitchDrops');
  bindToggle('toggle-notif-baro', 'baroKiTeer');
  bindToggle('toggle-notif-sound', 'sound');

  $('#test-notif-btn', container)?.addEventListener('click', () => {
    if ('Notification' in window && Notification.permission === 'granted') {
      triggerSystemNotification(
        '💠 Notificación de Prueba: Warframe Utility',
        '¡El sistema de alertas en tiempo real está funcionando correctamente!'
      );
    } else {
      alert('Debes autorizar las notificaciones en el navegador primero para probarlas.');
    }
  });
}

// ============================================================================
// 8. VISTA PRINCIPAL DE HERRAMIENTAS TENNO (HUB DE UTILIDADES)
// ============================================================================
export function tennoToolsMainView(root, defaultTab = 'relics') {
  // Extraer tab de la URL si viene como query string o parámetro
  const urlTab = new URLSearchParams(location.hash.split('?')[1] || '').get('tab') || defaultTab;

  root.innerHTML = `
    <section class="page-head">
      <h1>🛠️ Centro de Herramientas Tenno</h1>
      <p>Utilidades avanzadas en tiempo real: selector rápido de fisuras de 15 segundos, optimizador de ducados para Baro, checklist de Maestría (MR), generador de chat de comercio y alertas del sistema.</p>
    </section>

    <div class="toolbar">
      <div class="seg wrap" id="tools-seg">
        <button data-t="relics" class="${urlTab === 'relics' ? 'on' : ''}">⚡ Selector de Fisuras (15s)</button>
        <button data-t="ducats" class="${urlTab === 'ducats' ? 'on' : ''}">🪙 Ducados vs Platino</button>
        <button data-t="riven" class="${urlTab === 'riven' ? 'on' : ''}">🌀 Estrategia God Roll</button>
        <button data-t="mastery" class="${urlTab === 'mastery' ? 'on' : ''}">📋 Tracker de Maestría (MR)</button>
        <button data-t="trade" class="${urlTab === 'trade' ? 'on' : ''}">💬 Generador /trade</button>
        <button data-t="alerts" class="${urlTab === 'alerts' ? 'on' : ''}">🔔 Alertas del Sistema</button>
      </div>
    </div>

    <div id="tools-content-area" class="tools-container"></div>
  `;

  let currentTab = urlTab;
  const area = $('#tools-content-area', root);

  function renderCurrentSubTab() {
    if (currentTab === 'relics') renderRelicHelper(area);
    else if (currentTab === 'ducats') renderDucatsOptimizer(area);
    else if (currentTab === 'riven') renderRivenStrategyView(area, 'torid');
    else if (currentTab === 'mastery') renderMasteryTracker(area);
    else if (currentTab === 'trade') renderTradeGenerator(area);
    else if (currentTab === 'alerts') renderNotificationSettings(area);
  }

  $('#tools-seg', root).addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (btn) {
      currentTab = btn.dataset.t;
      $$('#tools-seg button', root).forEach(b => b.classList.toggle('on', b === btn));
      renderCurrentSubTab();
    }
  });

  renderCurrentSubTab();
}

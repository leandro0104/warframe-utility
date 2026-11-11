import { $, $$, esc, D, P, img, imgM, imgC, fmt, plat, platBtn, price, chance, rar, slugImg, srcList, modImg, debounce, norm, t } from './util.js';
import { TYPE_ES, translateNode, MODE_ES } from './lang.js';

// Calcula la cuenta regresiva en formato legible (ej. "42m 15s" o "1h 5m 20s")
export function formatCountdown(expiryIso) {
  if (!expiryIso) return '';
  const diff = new Date(expiryIso).getTime() - Date.now();
  if (diff <= 0) return 'Expirado / Actualizando';
  const s = Math.floor((diff / 1000) % 60);
  const m = Math.floor((diff / 60000) % 60);
  const h = Math.floor((diff / 3600000) % 24);
  const d = Math.floor(diff / 86400000);
  if (d > 0) return `${d}d ${h}h ${m}m ${s}s`;
  if (h > 0) return `${h}h ${m}m ${s}s`;
  return `${m}m ${s}s`;
}

export function resolveClientArbitration(data) {
  if (!data) return data;
  if (!data.arbitration || data.arbitration.node === 'SolNode000' || data.arbitration.expired) {
    const nowSec = Math.floor(Date.now() / 1000);
    const hourSec = nowSec - (nowSec % 3600);
    const expirySec = hourSec + 3600;
    const match = D.arbySchedule ? D.arbySchedule[hourSec] : null;
    data.arbitration = {
      node: match?.node || 'Mapa Estelar',
      type: match?.type || 'Misión Infinita',
      enemy: match?.enemy || 'Enemigos',
      activation: new Date(hourSec * 1000).toISOString(),
      expiry: new Date(expirySec * 1000).toISOString(),
      expired: false,
      resolved: !!match,
    };
  }
  return data;
}

export async function fetchWorldState() {
  // 1. Intentar primero con el servidor local/backend
  try {
    const res = await fetch('/api/worldstate');
    if (res.ok) {
      const data = await res.json();
      if (data && (data.fissures || data.alerts)) {
        return resolveClientArbitration(data);
      }
    }
  } catch (e) {
    console.warn('Backend worldstate fallo, intentando llamada directa...', e);
  }

  // 2. Fallback infalible: llamada directa con CORS desde el navegador del usuario
  try {
    const r1 = await fetch('https://api.warframestat.us/pc?language=es', { mode: 'cors' });
    if (r1.ok) {
      const j = await r1.json();
      return resolveClientArbitration(j);
    }
  } catch (e) {
    console.warn('Direct fetch fallo en es, probando sin language...', e);
  }

  const r2 = await fetch('https://api.warframestat.us/pc', { mode: 'cors' });
  if (r2.ok) {
    const j = await r2.json();
    return resolveClientArbitration(j);
  }
  throw new Error('No se pudo conectar a la API de Warframe');
}

export function worldStateView(root) {
  root.innerHTML = `
    <section class="page-head">
      <h1>⚡ Estado del Mundo en Tiempo Real</h1>
      <p>Actualización en directo desde <b>Warframe Status API</b> con auto-recarga periódica y temporizadores segundo a segundo: Alertas, Regalos de Lotus, Cascada del Vacío SP, Arbitrajes, Fisuras, Baro Ki'Teer y Ciclos.</p>
    </section>

    <!-- BANNER DESTACADO: CASCADA DEL VACÍO (STEEL PATH / OMNIA) -->
    <div id="cascade-banner-container">
      <div class="special-banner cascade-inactive" style="opacity:0.8">
        <div class="sb-icon">🌀</div>
        <div class="sb-info">
          <h3>Consultando estado de Cascada del Vacío en tiempo real…</h3>
          <p class="small muted">Verificando fisuras activas en Zariman y Camino de Acero...</p>
        </div>
      </div>
    </div>

    <!-- BANNER DESTACADO: REGALO DE LOTUS / ALERTAS ESPECIALES -->
    <div id="lotus-banner-container"></div>

    <div class="toolbar">
      <div class="seg wrap" id="statusseg">
        <button data-v="fissures" class="on">🔥 Fisuras del Vacío</button>
        <button data-v="alerts">🎁 Alertas & Eventos</button>
        <button data-v="cycles">🌍 Ciclos de Mundo</button>
        <button data-v="trader">🪙 Baro Ki'Teer</button>
        <button data-v="steelpath">⚔️ Camino de Acero & Caza de Arcontes</button>
      </div>
      <div class="sync-indicator">
        <span class="live-pulse"></span>
        <span class="muted small" id="sync-time">Sincronizando...</span>
      </div>
      <button class="btn ghost" id="ref-status">🔄 Actualizar ahora</button>
    </div>
    <div class="status-content"><div class="notice">Consultando estado del juego en tiempo real…</div></div>
  `;

  let tab = 'fissures';
  let state = null;
  let timerInterval = null;
  let autoFetchInterval = null;

  async function loadState(silent = false) {
    if (!silent) {
      $('.status-content', root).innerHTML = `<div class="notice">Cargando datos del servidor de Warframe…</div>`;
    }
    try {
      state = await fetchWorldState();
      $('#sync-time', root).textContent = `Actualizado: ${new Date().toLocaleTimeString('es-AR')}`;
      drawBanners();
      draw();
    } catch (e) {
      if (!silent) {
        $('.status-content', root).innerHTML = `<div class="notice">No se pudo obtener el estado en vivo: ${esc(e.message)}</div>`;
      }
    }
  }

  function updateTimers() {
    $$('[data-expiry]', root).forEach((el) => {
      const exp = el.dataset.expiry;
      if (exp) {
        el.textContent = formatCountdown(exp);
      }
    });
  }

  function drawBanners() {
    let cascadeBox = $('#cascade-banner-container', root);
    let lotusBox = $('#lotus-banner-container', root);

    // Failsafe: Si por caché de navegador o reemplazo de DOM no existen en root, los inyectamos automáticamente antes de toolbar
    if (!cascadeBox || !lotusBox) {
      const toolbar = $('.toolbar', root);
      if (toolbar && toolbar.parentNode) {
        if (!cascadeBox) {
          cascadeBox = document.createElement('div');
          cascadeBox.id = 'cascade-banner-container';
          toolbar.parentNode.insertBefore(cascadeBox, toolbar);
        }
        if (!lotusBox) {
          lotusBox = document.createElement('div');
          lotusBox.id = 'lotus-banner-container';
          toolbar.parentNode.insertBefore(lotusBox, toolbar);
        }
      }
    }

    if (!state) return;
    const now = Date.now();

    // 1. Banner de Cascada del Vacío (Steel Path / Zariman) - Solo misiones que NO hayan expirado
    const activeFissures = (state.fissures || []).filter((f) => f.expiry && new Date(f.expiry).getTime() > now);

    const isCascade = (f) => /cascade|cascada/i.test(f.missionType || '') || /cascade|cascada/i.test(f.missionTypeKey || '') || /tuvul/i.test(f.node || '');
    const spCascade = activeFissures.find((f) => isCascade(f) && (f.isHard || f.tier === 'Omnia' || /steel path|camino/i.test(f.tier || '')));
    const anyCascade = activeFissures.find((f) => isCascade(f));

    if (spCascade) {
      cascadeBox.innerHTML = `
        <div class="special-banner cascade-active">
          <div class="sb-icon">🔥</div>
          <div class="sb-info">
            <div class="sb-tag-row">
              <span class="badge vault pulse-badge">⚡ ¡ACTIVA AHORA!</span>
              <span class="badge ok">CAMINO DE ACERO (STEEL PATH)</span>
              <span class="relic-badge ${spCascade.tier}">${spCascade.tier}</span>
            </div>
            <h2>🌀 Cascada del Vacío en Camino de Acero</h2>
            <p><b>Nodo:</b> ${esc(translateNode(spCascade.node))} · <b>Facción:</b> ${esc(spCascade.enemy)}</p>
            <p class="small muted">¡El mejor método del juego para quemar reliquias a máxima velocidad, acumular Esencia de Acero y arcanos de Zariman!</p>
          </div>
          <div class="sb-timer-box">
            <span class="small muted">Tiempo restante:</span>
            <span class="countdown-large" data-expiry="${esc(spCascade.expiry)}">${formatCountdown(spCascade.expiry)}</span>
          </div>
        </div>
      `;
    } else if (anyCascade) {
      cascadeBox.innerHTML = `
        <div class="special-banner cascade-normal">
          <div class="sb-icon">🌀</div>
          <div class="sb-info">
            <div class="sb-tag-row">
              <span class="badge ok">ACTIVA (NORMAL)</span>
              <span class="relic-badge ${anyCascade.tier}">${anyCascade.tier}</span>
            </div>
            <h3>Cascada del Vacío Activa (${esc(translateNode(anyCascade.node))})</h3>
            <p class="small muted">Disponible en modo normal para abrir reliquias ${anyCascade.tier}. La variante de Camino de Acero está actualmente en espera.</p>
          </div>
          <div class="sb-timer-box">
            <span class="small muted">Expira en:</span>
            <span class="countdown-badge" data-expiry="${esc(anyCascade.expiry)}">${formatCountdown(anyCascade.expiry)}</span>
          </div>
        </div>
      `;
    } else {
      cascadeBox.innerHTML = `
        <div class="special-banner cascade-inactive">
          <div class="sb-icon">⏸️</div>
          <div class="sb-info">
            <div class="sb-tag-row">
              <span class="badge">ESTADO: EN ESPERA</span>
            </div>
            <h3>Cascada del Vacío (Zariman): Inactiva en este momento</h3>
            <p class="small muted">No hay fisura activa de Cascada del Vacío en Zariman (ni normal ni en Camino de Acero). Las fisuras rotan periódicamente y el cuadro cambiará a rojo automáticamente en cuanto inicie una.</p>
          </div>
        </div>
      `;
    }

    // 2. Banner de Regalo de Lotus / Alertas Especiales (solo activas y vigentes)
    const lotusBox = $('#lotus-banner-container', root);
    const alerts = (state.alerts || []).filter((a) => a.expiry && new Date(a.expiry).getTime() > now);
    const lotusGifts = alerts.filter((a) => a.tag === 'LotusGift' || /lotus/i.test(a.mission?.description || '') || /tenno united/i.test(a.mission?.description || '') || /regalo/i.test(a.mission?.description || ''));

    if (lotusGifts.length > 0) {
      lotusBox.innerHTML = `
        <div class="special-banner lotus-gift-banner">
          <div class="sb-icon">🪷</div>
          <div class="sb-info">
            <div class="sb-tag-row">
              <span class="badge gold pulse-badge">🎁 ¡REGALO DE LOTUS ACTIVO! (${lotusGifts.length})</span>
            </div>
            <h2>Misión de Recompensa Especial de Lotus</h2>
            <div class="lotus-items-list">
              ${lotusGifts.map((lg) => {
                const rew = lg.mission?.reward;
                const itemsStr = (rew?.countedItems || []).map((ci) => `${ci.count}x ${t(ci.type, ci.type)}`).concat(rew?.items || []).join(', ') || 'Recompensa especial';
                return `<div class="lotus-item-pill">
                  <b>${esc(translateNode(lg.mission?.node || ''))}</b> (${esc(lg.mission?.type || '')}) → 
                  <span class="gold-text">${esc(itemsStr)}</span>
                  <span class="countdown-badge" data-expiry="${esc(lg.expiry)}">${formatCountdown(lg.expiry)}</span>
                </div>`;
              }).join('')}
            </div>
          </div>
        </div>
      `;
    } else {
      lotusBox.innerHTML = '';
    }
  }

  function draw() {
    if (!state) return;
    const content = $('.status-content', root);

    if (tab === 'fissures') {
      const now = Date.now();
      const fissures = (state.fissures || [])
        .filter((f) => f.expiry && new Date(f.expiry).getTime() > now)
        .sort((a, b) => (a.tierNum || 0) - (b.tierNum || 0));
      content.innerHTML = `
        <article class="card wide">
          <header><div>
            <h3>Fisuras del Vacío Activas (${fissures.length})</h3>
            <p class="muted">Elige una fisura según la era de tu reliquia (Lith, Meso, Neo, Axi, Requiem, Omnia). Solo se muestran misiones vigentes con su tiempo restante en vivo.</p>
          </div></header>
          <div class="fissure-grid">
            ${fissures.map((f) => {
              const node = translateNode(f.node);
              const isHard = f.isHard ? '<span class="badge vault">Camino de Acero</span>' : '';
              const isStorm = f.isStorm ? '<span class="badge type">Tormenta del Vacío</span>' : '';
              const isCascade = /cascade/i.test(f.missionType) ? '<span class="badge gold">⭐ Cascada</span>' : '';
              return `
                <div class="fissure-card ${f.tier} ${f.isHard ? 'is-hard-card' : ''}">
                  <div class="fc-head">
                    <span class="relic-badge ${f.tier}">${f.tier}</span>
                    <span class="countdown-badge">⏳ <span data-expiry="${esc(f.expiry)}">${formatCountdown(f.expiry)}</span></span>
                  </div>
                  <b>${esc(node)}</b>
                  <div class="meta">
                    <span class="badge">${esc(f.missionType)}</span>
                    <span class="badge ok">${esc(f.enemy)}</span>
                    ${isCascade}
                    ${isHard}
                    ${isStorm}
                  </div>
                </div>`;
            }).join('')}
          </div>
        </article>
      `;
    } else if (tab === 'alerts') {
      const alerts = state.alerts || [];
      const events = state.events || [];
      const arb = state.arbitration;

      content.innerHTML = `
        <div class="two">
          <!-- ALERTAS -->
          <article class="card">
            <header><div>
              <h3>📢 Alertas Activas (${alerts.length})</h3>
              <p class="muted">Misiones por tiempo limitado con recompensas fijas (Formas, Catalizadores, Cosméticos).</p>
            </div></header>
            <div class="alert-list">
              ${alerts.map((a) => {
                const rew = a.mission?.reward;
                const itemsStr = (rew?.countedItems || []).map((ci) => `${ci.count}x ${t(ci.type, ci.type)}`).concat(rew?.items || []).join(', ') || `${fmt(rew?.credits || 0)} créditos`;
                const isLotus = a.tag === 'LotusGift' ? '<span class="badge gold">🪷 Regalo de Lotus</span>' : '';
                return `
                  <div class="alert-item-box ${a.tag === 'LotusGift' ? 'lotus-border' : ''}">
                    <div class="alert-item-h">
                      <b>${esc(a.mission?.description || 'Alerta')}</b>
                      <span class="countdown-badge" data-expiry="${esc(a.expiry)}">${formatCountdown(a.expiry)}</span>
                    </div>
                    <div class="meta">
                      <span class="badge">${esc(translateNode(a.mission?.node || ''))}</span>
                      <span class="badge type">${esc(a.mission?.type || '')}</span>
                      <span class="badge ok">${esc(a.mission?.faction || '')}</span>
                      ${isLotus}
                    </div>
                    <div class="alert-reward-row">
                      <span>Recompensa:</span> <b>${esc(itemsStr)}</b>
                    </div>
                  </div>
                `;
              }).join('') || '<p class="muted">No hay alertas activas en este momento.</p>'}
            </div>
          </article>

          <!-- EVENTOS Y ARBITRAMIENTO -->
          <div class="column-gap">
            <!-- ARBITRAMIENTO -->
            <article class="card highlight-card">
              <header><div class="relic-ico Axi">⚖️</div><div>
                <h3>Arbitramiento (Misiones de Honor)</h3>
                <p class="muted">Nivel 60-80+, sin reanimación automática. Otorga Esencia Vitus y esculturas Ayatan.</p>
              </div></header>
              ${(() => {
                if (arb && arb.node && arb.node !== 'SolNode000') {
                  const nodeName = translateNode(arb.node);
                  const modeEs = MODE_ES[arb.type] || arb.type;
                  return `
                    <div class="notice arbit-notice">
                      <div class="arbit-header">
                        <div>
                          <span class="badge gold">⚡ MISIÓN ACTIVA AHORA</span>
                        </div>
                        <span class="countdown-badge" data-expiry="${esc(arb.expiry)}">${formatCountdown(arb.expiry)}</span>
                      </div>
                      <div class="arbit-main-info">
                        <h2 class="arbit-node-title">${esc(nodeName)}</h2>
                        <div class="meta" style="margin-top:6px">
                          <span class="badge type" style="font-size:.85rem;padding:4px 10px">🎯 Tipo: <b>${esc(modeEs)}</b></span>
                          <span class="badge ok" style="font-size:.85rem;padding:4px 10px">☠️ Facción: <b>${esc(arb.enemy || 'Enemigos')}</b></span>
                          <span class="badge" style="font-size:.85rem;padding:4px 10px">Rotación AABBCCCC...</span>
                        </div>
                      </div>
                      <p class="small muted" style="margin-top:8px">
                        ⏱️ Rota cada 60 minutos al inicio de la hora (:00). Recuerda equipar armas y Warframes con bonificación de +300% de fuerza si están disponibles en tu nave.
                      </p>
                    </div>`;
                }

                // Fallback de cuenta regresiva
                const now = new Date();
                const nextHour = new Date(now);
                nextHour.setUTCMinutes(0, 0, 0);
                nextHour.setUTCHours(nextHour.getUTCHours() + 1);
                const nextHourIso = nextHour.toISOString();

                return `
                  <div class="notice arbit-notice">
                    <div class="arbit-header">
                      <b>⏱️ Rotación horaria activa:</b>
                      <span class="countdown-badge" data-expiry="${esc(nextHourIso)}">${formatCountdown(nextHourIso)}</span>
                    </div>
                    <p class="small"><b>Tiempo restante para la siguiente misión:</b> Rota exactamente al cambiar la hora (:00).</p>
                    <div class="meta">
                      <span class="badge type">Supervivencia / Defensa / Intercepción / Excavación / Disrupción</span>
                    </div>
                  </div>`;
              })()}
            </article>

            <!-- EVENTOS ESPECIALES -->
            <article class="card">
              <header><div>
                <h3>🎪 Eventos del Juego (${events.length})</h3>
                <p class="muted">Fracturas de Termia, Purgas de Gules y operaciones comunitarias.</p>
              </div></header>
              <div class="alert-list">
                ${events.map((e) => `
                  <div class="alert-item-box">
                    <div class="alert-item-h">
                      <b>${esc(e.description || 'Evento')}</b>
                      <span class="countdown-badge" data-expiry="${esc(e.expiry)}">${formatCountdown(e.expiry)}</span>
                    </div>
                    <p class="small muted">${esc(e.tooltip || '')}</p>
                    ${e.node ? `<span class="badge">${esc(translateNode(e.node))}</span>` : ''}
                    ${e.health != null ? `<div class="bar"><span style="width:${e.health}%"></span></div><small class="muted">Progreso: ${e.health}%</small>` : ''}
                  </div>
                `).join('') || '<p class="muted">Sin eventos activos actualmente.</p>'}
              </div>
            </article>
          </div>
        </div>
      `;
    } else if (tab === 'cycles') {
      const cetus = state.cetusCycle || {};
      const vallis = state.vallisCycle || {};
      const zariman = state.zarimanCycle || {};
      const cambion = state.cambionCycle || {};

      content.innerHTML = `
        <div class="grid cards">
          <article class="card">
            <header><div class="ico">☀️</div><div><h3>Llanuras de Eidolon (Cetus)</h3><div class="meta"><span class="badge ${cetus.isDay ? 'ok' : 'vault'}">${cetus.isDay ? 'DÍA' : 'NOCHE (Caza de Eidolons)'}</span></div></div></header>
            <p><b>Tiempo restante:</b> <span class="countdown-badge" data-expiry="${esc(cetus.expiry)}">${formatCountdown(cetus.expiry)}</span></p>
            <p class="muted small">${cetus.isDay ? 'Los Eidolons están inactivos. Buen momento para pescar o minar.' : '¡Los Eidolons (Teralyst, Gantulyst, Hydrolyst) están despiertos!'}</p>
          </article>
          <article class="card">
            <header><div class="ico">❄️</div><div><h3>Valle del Orbe (Fortuna)</h3><div class="meta"><span class="badge ${vallis.isWarm ? 'ok' : 'type'}">${vallis.isWarm ? 'CÁLIDO' : 'FRÍO'}</span></div></div></header>
            <p><b>Tiempo restante:</b> <span class="countdown-badge" data-expiry="${esc(vallis.expiry)}">${formatCountdown(vallis.expiry)}</span></p>
            <p class="muted small">Afecta los peces térmicos que aparecen y el combate contra la Exploiter Orb y Profit-Taker.</p>
          </article>
          <article class="card">
            <header><div class="ico">🏛️</div><div><h3>Zariman Ten Zero</h3><div class="meta"><span class="badge ${zariman.state === 'corpus' ? 'type' : 'ok'}">${esc(zariman.state || '').toUpperCase()}</span></div></div></header>
            <p><b>Tiempo restante:</b> <span class="countdown-badge" data-expiry="${esc(zariman.expiry)}">${formatCountdown(zariman.expiry)}</span></p>
            <p class="muted small">Facción enemiga que controla actualmente los pasillos de la nave Zariman.</p>
          </article>
          <article class="card">
            <header><div class="ico">🩸</div><div><h3>Deriva Cambion (Deimos)</h3><div class="meta"><span class="badge ${cambion.active === 'fass' ? 'ok' : 'type'}">${esc(cambion.active || '').toUpperCase()}</span></div></div></header>
            <p><b>Tiempo restante:</b> <span class="countdown-badge" data-expiry="${esc(cambion.expiry)}">${formatCountdown(cambion.expiry)}</span></p>
            <p class="muted small">Ciclo de Fass y Vome. Afecta los Wyrms en combate y los peces de las cavernas.</p>
          </article>
        </div>
      `;
    } else if (tab === 'trader') {
      const b = state.voidTrader || {};
      const targetDate = b.active ? b.expiry : b.activation;
      const statusText = b.active ? '¡Baro Ki\'Teer está presente en el Repetidor!' : 'Baro Ki\'Teer está viajando por el Vacío.';
      const actionText = b.active ? 'Se marcha en' : 'Llega al repetidor en';

      content.innerHTML = `
        <article class="card wide">
          <header><div class="relic-ico Axi">🪙</div><div>
            <h3>${esc(b.character || "Baro Ki'Teer")}</h3>
            <p class="muted">Ubicación: <b>${esc(b.location || 'En camino por el Vacío')}</b></p>
          </div></header>
          <div class="notice">
            <b>${statusText}</b> ${actionText}: <span class="countdown-badge" data-expiry="${esc(targetDate)}">${formatCountdown(targetDate)}</span>
          </div>
          ${b.inventory?.length ? `
            <h4>Mercancía que ofrece (Ducados & Créditos):</h4>
            <table class="tbl big">
              <thead><tr><th>Ítem</th><th>Ducados</th><th>Créditos</th></tr></thead>
              <tbody>
                ${b.inventory.map((it) => `<tr>
                  <td><b>${esc(t(it.item, it.item))}</b></td>
                  <td><span class="duc">${it.ducats}</span></td>
                  <td>${fmt(it.credits)}</td>
                </tr>`).join('')}
              </tbody>
            </table>
          ` : '<p class="muted">El inventario se revelará automáticamente cuando Baro arribe al repetidor este viernes.</p>'}
        </article>
      `;
    } else if (tab === 'steelpath') {
      const sp = state.steelPath || {};
      const sortie = state.sortie || {};
      const archon = state.archonHunt || {};

      content.innerHTML = `
        <div class="two">
          <!-- CAZA DE ARCONTES -->
          <article class="card highlight-card">
            <header><div><h3>🪽 Caza de Arcontes Semanal</h3><p class="muted">Arconte: <b>${esc(archon.boss || 'Arconte')}</b> (${esc(archon.faction || 'Narmer')}) · Expira en: <span class="countdown-badge" data-expiry="${esc(archon.expiry)}">${formatCountdown(archon.expiry)}</span></p></div></header>
            <p class="small">Otorga un Fragmento de Arconte garantizado (Carmesí, Ámbar o Celeste). Sin consumibles ni reanimación aliada.</p>
            <ul class="srcs">
              ${(archon.missions || []).map((m, i) => `
                <li>
                  <span class="k">${i + 1}</span>
                  <span class="w"><b>${esc(translateNode(m.node))}</b> · ${esc(m.type)}</span>
                </li>
              `).join('')}
            </ul>
          </article>

          <!-- INCURSIÓN DIARIA -->
          <article class="card">
            <header><div><h3>⚔️ Incursión Diaria (Sortie)</h3><p class="muted">Jefe: <b>${esc(sortie.boss || '')}</b> (${esc(sortie.faction || '')}) · Termina en: <span class="countdown-badge" data-expiry="${esc(sortie.expiry)}">${formatCountdown(sortie.expiry)}</span></p></div></header>
            <ul class="srcs">
              ${(sortie.variants || []).map((v, i) => `
                <li>
                  <span class="k">${i + 1}</span>
                  <span class="w"><b>${esc(translateNode(v.node))}</b> · ${esc(v.missionType)}<small>${esc(v.modifier)}: ${esc(v.modifierDescription)}</small></span>
                </li>
              `).join('')}
            </ul>
          </article>

          <!-- TESHIN STEEL PATH -->
          <article class="card wide">
            <header><div><h3>🔥 Camino de Acero (Teshin)</h3><p class="muted">Recompensa rotativa de esta semana con Esencia de Acero:</p></div></header>
            <div class="notice">
              <h3>${esc(t(sp.currentReward?.name, sp.currentReward?.name || 'Recompensa semanal'))}</h3>
              <p>Costo: <b>${sp.currentReward?.cost || 150} Esencias de Acero</b></p>
              <p class="small muted">Expira en: <span class="countdown-badge" data-expiry="${esc(sp.expiry)}">${formatCountdown(sp.expiry)}</span></p>
            </div>
            <h4>Próximas rotaciones semanales de Teshin:</h4>
            <div class="chips">
              ${(sp.rotation || []).map((r) => `<span class="badge">${esc(t(r.name, r.name))} (${r.cost} 💠)</span>`).join('')}
            </div>
          </article>
        </div>
      `;
    }
  }

  // Actualización de temporizadores cada segundo
  if (timerInterval) clearInterval(timerInterval);
  timerInterval = setInterval(updateTimers, 1000);

  // Auto-recarga de datos cada 60 segundos
  if (autoFetchInterval) clearInterval(autoFetchInterval);
  autoFetchInterval = setInterval(() => {
    if (!document.hidden) {
      loadState(true);
    }
  }, 60000);

  root.addEventListener('click', (e) => {
    const sb = e.target.closest('#statusseg button');
    if (sb) {
      tab = sb.dataset.v;
      $$('#statusseg button', root).forEach((x) => x.classList.toggle('on', x === sb));
      draw();
      return;
    }
    if (e.target.closest('#ref-status')) {
      loadState();
    }
  });

  loadState();
}

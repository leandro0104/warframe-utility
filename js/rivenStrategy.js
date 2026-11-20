import { $, $$, esc, D, img, imgM, plat, debounce, norm, t } from './util.js';

// ============================================================================
// 1. ARMAS META MÁS POPULARES PARA RIVENS EN EL META ACTUAL
// ============================================================================
export const POPULAR_RIVEN_WEAPONS = [
  { slug: 'torid', name: 'Torid', type: 'Incarnon Meta', tier: 'S+' },
  { slug: 'dual_toxocyst', name: 'Dual Toxocyst', type: 'Incarnon Meta', tier: 'S+' },
  { slug: 'magistar', name: 'Magistar', type: 'Stat-Stick / Incarnon', tier: 'S+' },
  { slug: 'burston', name: 'Burston', type: 'Incarnon Rifle', tier: 'S' },
  { slug: 'latron', name: 'Latron', type: 'Incarnon Rifle', tier: 'S+' },
  { slug: 'furis', name: 'Furis', type: 'Incarnon Secundaria', tier: 'S' },
  { slug: 'hate', name: 'Hate', type: 'Incarnon Melee', tier: 'S+' },
  { slug: 'glaive', name: 'Glaive', type: 'Slash Proc Heavy', tier: 'S' },
  { slug: 'felarx', name: 'Felarx', type: 'Devastating Attrition', tier: 'S' },
  { slug: 'lex', name: 'Lex', type: 'Pocket Sniper Incarnon', tier: 'S' },
  { slug: 'ocucor', name: 'Ocucor', type: 'Sentient Surge Beam', tier: 'S' },
  { slug: 'boar', name: 'Boar', type: 'Incarnon Shotgun', tier: 'S' },
  { slug: 'strun', name: 'Strun', type: 'Incarnon Shotgun', tier: 'S' },
  { slug: 'ceramic_dagger', name: 'Ceramic Dagger', type: 'Stat-Stick Meta', tier: 'S' },
  { slug: 'dual_ichor', name: 'Dual Ichor', type: 'Nube Tóxica Incarnon', tier: 'S' }
];

// ============================================================================
// 2. ESTADÍSTICAS BASE DE AGRIETADOS POR CLASE DE ARMA (A DISPOSICIÓN 1.0)
// ============================================================================
export const BASE_RIVEN_STATS = {
  rifle: {
    multishot: { name: 'Multidisparo', base: 90, unit: '%', isMetaPos: true },
    critical_chance: { name: 'Probabilidad Crítica', base: 150, unit: '%', isMetaPos: true },
    critical_damage: { name: 'Daño Crítico', base: 120, unit: '%', isMetaPos: true },
    damage: { name: 'Daño', base: 165, unit: '%', isMetaPos: true },
    fire_rate: { name: 'Cadencia de Fuego', base: 60, unit: '%', isMetaPos: true },
    toxin: { name: 'Toxina', base: 90, unit: '%', isMetaPos: true },
    heat: { name: 'Calor', base: 90, unit: '%', isMetaPos: true },
    cold: { name: 'Frío', base: 90, unit: '%', isMetaPos: false },
    electricity: { name: 'Electricidad', base: 90, unit: '%', isMetaPos: false },
    status_chance: { name: 'Probabilidad de Estado', base: 90, unit: '%', isMetaPos: false },
    punch_through: { name: 'Atravesar', base: 2.7, unit: 'm', isMetaPos: false },
    reload_speed: { name: 'Velocidad de Recarga', base: 50, unit: '%', isMetaPos: false },
    magazine_capacity: { name: 'Capacidad de Cargador', base: 50, unit: '%', isMetaPos: false },
    zoom: { name: 'Zoom (Negativo Ideal)', base: 50, unit: '%', isHarmlessNeg: true },
    recoil: { name: 'Retroceso (Negativo Inofensivo)', base: 90, unit: '%', isHarmlessNeg: true },
    damage_vs_infested: { name: 'Daño vs Infestados (Negativo Inocuo)', base: 45, unit: '%', isHarmlessNeg: true },
    ammo_maximum: { name: 'Munición Máxima (Negativo Leve)', base: 50, unit: '%', isHarmlessNeg: true }
  },
  pistol: {
    multishot: { name: 'Multidisparo', base: 120, unit: '%', isMetaPos: true },
    critical_chance: { name: 'Probabilidad Crítica', base: 150, unit: '%', isMetaPos: true },
    critical_damage: { name: 'Daño Crítico', base: 90, unit: '%', isMetaPos: true },
    damage: { name: 'Daño', base: 220, unit: '%', isMetaPos: true },
    fire_rate: { name: 'Cadencia de Fuego', base: 75, unit: '%', isMetaPos: true },
    toxin: { name: 'Toxina', base: 90, unit: '%', isMetaPos: true },
    heat: { name: 'Calor', base: 90, unit: '%', isMetaPos: true },
    cold: { name: 'Frío', base: 90, unit: '%', isMetaPos: false },
    electricity: { name: 'Electricidad', base: 90, unit: '%', isMetaPos: false },
    status_chance: { name: 'Probabilidad de Estado', base: 90, unit: '%', isMetaPos: false },
    punch_through: { name: 'Atravesar', base: 2.7, unit: 'm', isMetaPos: false },
    reload_speed: { name: 'Velocidad de Recarga', base: 50, unit: '%', isMetaPos: false },
    magazine_capacity: { name: 'Capacidad de Cargador', base: 50, unit: '%', isMetaPos: false },
    zoom: { name: 'Zoom (Negativo Ideal)', base: 50, unit: '%', isHarmlessNeg: true },
    recoil: { name: 'Retroceso (Negativo Inofensivo)', base: 90, unit: '%', isHarmlessNeg: true },
    damage_vs_infested: { name: 'Daño vs Infestados (Negativo Inocuo)', base: 45, unit: '%', isHarmlessNeg: true },
    ammo_maximum: { name: 'Munición Máxima (Negativo Leve)', base: 50, unit: '%', isHarmlessNeg: true }
  },
  shotgun: {
    multishot: { name: 'Multidisparo', base: 120, unit: '%', isMetaPos: true },
    critical_chance: { name: 'Probabilidad Crítica', base: 90, unit: '%', isMetaPos: true },
    critical_damage: { name: 'Daño Crítico', base: 90, unit: '%', isMetaPos: true },
    damage: { name: 'Daño', base: 165, unit: '%', isMetaPos: true },
    fire_rate: { name: 'Cadencia de Fuego', base: 90, unit: '%', isMetaPos: true },
    toxin: { name: 'Toxina', base: 90, unit: '%', isMetaPos: true },
    heat: { name: 'Calor', base: 90, unit: '%', isMetaPos: true },
    status_chance: { name: 'Probabilidad de Estado', base: 90, unit: '%', isMetaPos: true },
    reload_speed: { name: 'Velocidad de Recarga', base: 50, unit: '%', isMetaPos: false },
    zoom: { name: 'Zoom (Negativo Ideal)', base: 50, unit: '%', isHarmlessNeg: true },
    recoil: { name: 'Retroceso (Negativo Inofensivo)', base: 90, unit: '%', isHarmlessNeg: true },
    damage_vs_infested: { name: 'Daño vs Infestados (Negativo Inocuo)', base: 45, unit: '%', isHarmlessNeg: true }
  },
  melee: {
    damage: { name: 'Daño Cuerpo a Cuerpo', base: 165, unit: '%', isMetaPos: true },
    critical_damage: { name: 'Daño Crítico', base: 90, unit: '%', isMetaPos: true },
    critical_chance: { name: 'Probabilidad Crítica', base: 90, unit: '%', isMetaPos: true },
    attack_speed: { name: 'Velocidad de Ataque', base: 55, unit: '%', isMetaPos: true },
    range: { name: 'Alcance', base: 120, unit: '%', isMetaPos: true },
    initial_combo: { name: 'Combo Inicial', base: 25, unit: '', isMetaPos: true },
    heavy_attack_efficiency: { name: 'Eficiencia Ataque Pesado', base: 75, unit: '%', isMetaPos: false },
    toxin: { name: 'Toxina', base: 90, unit: '%', isMetaPos: true },
    heat: { name: 'Calor', base: 90, unit: '%', isMetaPos: true },
    status_chance: { name: 'Probabilidad de Estado', base: 90, unit: '%', isMetaPos: false },
    combo_duration: { name: 'Duración de Combo', base: 8, unit: 's', isMetaPos: false },
    finisher_damage: { name: 'Daño de Remate (Negativo Inocuo)', base: 120, unit: '%', isHarmlessNeg: true },
    slide_attack_critical_chance: { name: 'Crítico al Deslizar (Negativo Inocuo)', base: 90, unit: '%', isHarmlessNeg: true },
    damage_vs_infested: { name: 'Daño vs Infestados (Negativo Inocuo)', base: 45, unit: '%', isHarmlessNeg: true }
  },
  archgun: {
    multishot: { name: 'Multidisparo', base: 60, unit: '%', isMetaPos: true },
    critical_chance: { name: 'Probabilidad Crítica', base: 100, unit: '%', isMetaPos: true },
    critical_damage: { name: 'Daño Crítico', base: 80, unit: '%', isMetaPos: true },
    damage: { name: 'Daño', base: 100, unit: '%', isMetaPos: true },
    fire_rate: { name: 'Cadencia de Fuego', base: 60, unit: '%', isMetaPos: true },
    toxin: { name: 'Toxina', base: 60, unit: '%', isMetaPos: true },
    heat: { name: 'Calor', base: 60, unit: '%', isMetaPos: true }
  }
};

// ============================================================================
// 3. PREFIJOS Y SUFIJOS DE NOMBRES DE AGRIETADOS EN WARFRAME
// ============================================================================
const RIVEN_AFFIXES = {
  multishot: { pre: 'Sati', suf: 'can' },
  critical_chance: { pre: 'Crita', suf: 'cron' },
  critical_damage: { pre: 'Acri', suf: 'tis' },
  damage: { pre: 'Visi', suf: 'ata' },
  fire_rate: { pre: 'Croni', suf: 'dra' },
  attack_speed: { pre: 'Croni', suf: 'dra' },
  toxin: { pre: 'Toxi', suf: 'tox' },
  heat: { pre: 'Magna', suf: 'ton' },
  cold: { pre: 'Geli', suf: 'do' },
  electricity: { pre: 'Vexi', suf: 'tio' },
  status_chance: { pre: 'Hera', suf: 'nak' },
  range: { pre: 'Locti', suf: 'tor' },
  punch_through: { pre: 'Feha', suf: 'con' },
  initial_combo: { pre: 'Manti', suf: 'dex' }
};

export function generateRivenName(weaponName, statKeys) {
  if (!statKeys || !statKeys.length) return `${weaponName} Riven Mod`;
  const first = RIVEN_AFFIXES[statKeys[0]]?.pre || 'Crita';
  const last = (statKeys.length > 1 && RIVEN_AFFIXES[statKeys[1]]?.suf) || RIVEN_AFFIXES[statKeys[0]]?.suf || 'can';
  if (statKeys.length >= 3 && RIVEN_AFFIXES[statKeys[1]]) {
    const mid = RIVEN_AFFIXES[statKeys[1]].pre.toLowerCase();
    return `${weaponName} ${first}-${mid}${last}`;
  }
  return `${weaponName} ${first}${last}`;
}

// ============================================================================
// 4. MOTOR DE CÁLCULO DE ESTADÍSTICAS Y TOPES MÁXIMOS
// ============================================================================
export function calculateRivenStatRange(weaponType, disposition, statKey, configType) {
  const table = BASE_RIVEN_STATS[weaponType] || BASE_RIVEN_STATS.rifle;
  const statInfo = table[statKey] || table.multishot;
  const disp = disposition || 1.0;

  // Multiplicadores oficiales según configuración de Agrietado
  const cfgMultipliers = {
    '2pos_1neg': 1.25, // God Roll: Positivos aumentados un +25%
    '3pos_1neg': 0.94, // 3 Positivos con Negativo
    '2pos_0neg': 1.00, // Estándar sin negativo
    '3pos_0neg': 0.75  // 3 Positivos sin negativo (los más débiles)
  };
  const mult = cfgMultipliers[configType] || 1.25;

  // Cada tirada tiene una varianza aleatoria de calidad entre 0.90 (-10%) y 1.10 (+10%)
  const minVal = statInfo.base * disp * mult * 0.90;
  const avgVal = statInfo.base * disp * mult * 1.00;
  const maxVal = statInfo.base * disp * mult * 1.10;

  return {
    name: statInfo.name,
    unit: statInfo.unit,
    base: statInfo.base,
    disp,
    mult,
    min: minVal,
    avg: avgVal,
    max: maxVal
  };
}

// ============================================================================
// 5. ESTIMADOR DE PRECIOS SEGÚN DEMANDA Y POPULARIDAD DEL ARMA
// ============================================================================
export function estimateRivenMarketPrices(weapon) {
  const slug = weapon.slug.toLowerCase();
  const pop = POPULAR_RIVEN_WEAPONS.find(p => p.slug === slug);
  const disp = weapon.dis || 1.0;

  let unrolledMin = 40, unrolledMax = 120;
  let decentMin = 150, decentMax = 350;
  let godMin = 700, godMax = 1600;

  if (pop) {
    if (pop.tier === 'S+') {
      unrolledMin = 450; unrolledMax = 700;
      decentMin = 600; decentMax = 1200;
      godMin = 2200; godMax = 5500;
    } else if (pop.tier === 'S') {
      unrolledMin = 250; unrolledMax = 450;
      decentMin = 400; decentMax = 800;
      godMin = 1400; godMax = 3000;
    }
  } else if (disp >= 1.30) {
    unrolledMin = 60; unrolledMax = 150;
    decentMin = 180; decentMax = 400;
    godMin = 800; godMax = 1800;
  } else if (disp <= 0.70) {
    unrolledMin = 20; unrolledMax = 60;
    decentMin = 80; decentMax = 200;
    godMin = 400; godMax = 900;
  }

  return { unrolledMin, unrolledMax, decentMin, decentMax, godMin, godMax };
}

// ============================================================================
// 6. RENDERIZADOR COMPLETO DE LA VISTA DE ESTRATEGIA DE AGRIETADOS
// ============================================================================
export function renderRivenStrategyView(root, initialSlug = 'torid') {
  const weapons = D.rivens?.weapons || [];
  let currentWeapon = weapons.find(w => w.slug === initialSlug) || weapons[0] || {
    slug: 'torid',
    n: 'Torid',
    i: 'items/images/en/thumbs/torid.44456f26160f4ece65656c524c4692fe.128x128.png',
    g: 'primary',
    rt: 'rifle',
    dis: 1.30,
    mr: 4
  };

  let activeTab = 'strategy'; // 'strategy' | 'calculator' | 'builder' | 'market'

  function getWeaponCategoryKey(rt) {
    if (rt === 'shotgun') return 'shotgun';
    if (rt === 'pistol') return 'pistol';
    if (rt === 'melee' || rt === 'zaw') return 'melee';
    if (rt === 'archgun') return 'archgun';
    return 'rifle';
  }

  function renderView() {
    const w = currentWeapon;
    const catKey = getWeaponCategoryKey(w.rt);
    const statsTable = BASE_RIVEN_STATS[catKey] || BASE_RIVEN_STATS.rifle;
    const prices = estimateRivenMarketPrices(w);
    const weaponNameEs = t(w.n, w.n);

    // Calcular estrellas de disposición
    const disStars = '●'.repeat(Math.min(5, Math.max(1, Math.round(w.dis)))) + '○'.repeat(Math.max(0, 5 - Math.round(w.dis)));

    root.innerHTML = `
      <section class="page-head">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;">
          <div>
            <h1>🌀 Estrategia Maestra para Agrietados (God Rolls)</h1>
            <p>Guía táctica interactiva para conseguir el Riven perfecto: optimización matemática de Kuva, tope máximo de estadísticas (¿139% o 150%?), el mito del bloqueo de stats y cuándo usar el transmutador/empalme.</p>
          </div>
          <button class="btn ghost" id="btn-quick-market" style="border-color:#38bdf8;color:#38bdf8;">🛒 Ver Subastas en Vivo</button>
        </div>
      </section>

      <!-- BARRA DE ACCESO RÁPIDO A ARMAS META -->
      <div class="riven-quick-pills-wrap">
        <span class="quick-pill-label">🔥 Armas Más Buscadas:</span>
        <div class="quick-nav-pills">
          ${POPULAR_RIVEN_WEAPONS.map(p => `
            <button class="pill ${p.slug === w.slug ? 'on active-pill' : ''}" data-slug="${p.slug}">
              ${p.name} <small style="color:var(--gold);font-weight:900;">${p.tier}</small>
            </button>
          `).join('')}
        </div>
      </div>

      <!-- BUSCADOR DE ARMA -->
      <div class="toolbar" style="margin-top:12px;">
        <input type="search" id="riven-weapon-search" placeholder="Buscar entre las 420 armas de Warframe (ej. Torid, Burston, Dual Toxocyst, Magistar, Latron, Hate, Felarx…)" value="${w.slug === initialSlug ? '' : esc(weaponNameEs)}" autocomplete="off">
        <div class="seg" id="riven-view-tabs">
          <button data-tab="strategy" class="${activeTab === 'strategy' ? 'on' : ''}">🎯 Estrategia God Roll</button>
          <button data-tab="calculator" class="${activeTab === 'calculator' ? 'on' : ''}">🧮 Calculadora de Topes</button>
          <button data-tab="builder" class="${activeTab === 'builder' ? 'on' : ''}">🔬 Inspector de Tirada</button>
          <button data-tab="market" class="${activeTab === 'market' ? 'on' : ''}">🛒 Subastas en Vivo</button>
        </div>
      </div>

      <!-- TARJETA CABECERA DEL ARMA SELECCIONADA -->
      <article class="card wide riven-weapon-hero">
        <div class="riven-hero-grid">
          <div class="riven-hero-left">
            <div class="riven-avatar-box">
              ${img(imgM(w.i), 'riven-avatar-img', w.n)}
            </div>
            <div class="riven-hero-details">
              <h2>${esc(weaponNameEs)} <small style="color:#93c5fd;font-size:1rem;font-weight:500;">(${esc(w.n)})</small></h2>
              <div class="meta" style="margin-top:6px;">
                <span class="badge type">${esc(w.rt.toUpperCase())}</span>
                <span class="badge">Maestría ${w.mr}</span>
                <span class="badge ok" title="Multiplicador base de stats del Riven">Disposición: ${w.dis.toFixed(2)} / 5.0 (${disStars})</span>
              </div>
            </div>
          </div>

          <!-- ESTIMADOR DE PRECIOS EN VIVO -->
          <div class="riven-hero-pricing">
            <div class="pricing-badge-row">
              <div class="pricing-pill unrolled">
                <span class="pill-title">Sin Rollear (0 Rerolls)</span>
                <span class="pill-price"><b>${prices.unrolledMin} - ${prices.unrolledMax}</b> <span class="coin"></span></span>
                <small>Ideal para revender rápido</small>
              </div>
              <div class="pricing-pill decent">
                <span class="pill-title">Tirada Jugable / Útil</span>
                <span class="pill-price"><b>${prices.decentMin} - ${prices.decentMax}</b> <span class="coin"></span></span>
                <small>2 positivos útiles</small>
              </div>
              <div class="pricing-pill godroll">
                <span class="pill-title">God Roll (Tier S+)</span>
                <span class="pill-price"><b>${prices.godMin.toLocaleString()} - ${prices.godMax.toLocaleString()}+</b> <span class="coin"></span></span>
                <small>2+1- Meta Absoluto</small>
              </div>
            </div>
          </div>
        </div>
      </article>

      <!-- ÁREA DINÁMICA SEGÚN PESTAÑA -->
      <div id="riven-tab-content" style="margin-top:16px;"></div>
    `;

    renderTabContent();
    attachGlobalEvents();
  }

  function renderTabContent() {
    const area = $('#riven-tab-content', root);
    if (!area) return;

    if (activeTab === 'strategy') {
      renderStrategyTab(area);
    } else if (activeTab === 'calculator') {
      renderCalculatorTab(area);
    } else if (activeTab === 'builder') {
      renderBuilderTab(area);
    } else if (activeTab === 'market') {
      renderMarketTab(area);
    }
  }

  // ==========================================================================
  // PESTAÑA 1: ESTRATEGIA GOD ROLL PASO A PASO
  // ==========================================================================
  function renderStrategyTab(container) {
    const w = currentWeapon;
    const weaponNameEs = t(w.n, w.n);
    const catKey = getWeaponCategoryKey(w.rt);
    const table = BASE_RIVEN_STATS[catKey] || BASE_RIVEN_STATS.rifle;

    // Obtener positivos y negativos
    const metaPositives = Object.entries(table).filter(([k, v]) => v.isMetaPos);
    const harmlessNegatives = Object.entries(table).filter(([k, v]) => v.isHarmlessNeg);

    container.innerHTML = `
      <div class="grid cards" style="grid-template-columns:repeat(auto-fit,minmax(330px,1fr));gap:16px;">
        <!-- PASO 1: BLOQUEO DE STAT (TRAIT LOCKING) & COSTE DE KUVA -->
        <div class="card riven-strategy-card">
          <div class="step-num-badge">PASO 1</div>
          <h3>🔒 Bloqueo de Atributo (Trait Locking) & Kuva</h3>
          <p class="muted small">Cómo congelar tu mejor estadística mientras buscas el resto con Kuva.</p>
          <div class="strategy-alert-box info">
            <b>Mecánica Oficial de Bloqueo (Riven Trait Locking):</b>
            <p>En el menú de mods de Warframe <b>SÍ es posible bloquear 1 atributo</b> haciendo clic en el candado junto al stat. Ese atributo conservará tanto su tipo de efecto como su valor numérico exacto.</p>
          </div>
          <ul class="strategy-check-list">
            <li><b>Coste de Kuva Duplicado:</b> Al tener 1 stat bloqueado, cada reroll cuesta <b>el doble de Kuva</b>. Si tu Riven ya alcanzó el tope de 3.500 Kuva, <b>rolear con stat bloqueado costará 7.000 Kuva por tirada</b>.</li>
            <li><b>Estructura Congelada:</b> Bloquear un stat también congela la estructura de la carta (por ejemplo, si ya tiene negativo, se preservará la disposición con negativo).</li>
            <li><b>¿Cuándo usar el Bloqueo?:</b> Si te sale un stat S+ (como Multidisparo >135% o Daño Crítico alto con negativo inocuo), <b>bloquéalo</b> para buscar el segundo positivo sin arriesgarte a perder el stat estrella.</li>
            <li><b>¡Atención al Menú!:</b> El bloqueo es por sesión en la interfaz. Si sales por completo del menú de mods, verifica que el candado siga activo antes de volver a tirar para no perder tu stat por error.</li>
          </ul>
        </div>

        <!-- PASO 2: EMPALME Y TRANSMUTADOR -->
        <div class="card riven-strategy-card">
          <div class="step-num-badge">PASO 2</div>
          <h3>💠 Empalme & Transmutador de Agrietados</h3>
          <p class="muted small">¿Cuándo usar el Transmutador de Agrietados y los Fragmentos de Agrietado?</p>
          <div class="strategy-alert-box info">
            <b>¿Cómo funciona el Transmutador?</b>
            <p>Se obtiene al derrotar al <b>Hydrolyst en las Llanuras de Eidolon</b>. Permite fusionar <b>4 Rivens no deseados</b> para convertirlos en <b>1 Riven velado nuevo</b>.</p>
          </div>
          <ul class="strategy-check-list">
            <li><b>Cuándo Transmutar:</b> Úsalo cuando acumules Rivens de armas inservibles o sin mercado (como Fang, Stug, Kestrel, Cronus) o cuando llegues al límite máximo de ranuras de Rivens.</li>
            <li><b>¡Cuidado!:</b> NUNCA transmutes Rivens de armas que tengan versión Incarnon, Kuva o Tenet.</li>
            <li><b>Fragmentos de Agrietado (Riven Slivers):</b> Visita semanal obligatoria a <b>Palladino en Iron Wake (Tierra)</b> cada lunes: canjea 10 fragmentos por 2 Rivens velados + 35.000 Kuva gratis.</li>
            <li><b>Descodificador de Agrietados:</b> Si el desafío es molesto (ej. matar pilotos en el aire), usa un Descodificador de Teshin por 20 Esencias de Acero.</li>
          </ul>
        </div>

        <!-- PASO 3: LA FÓRMULA DEL GOD ROLL -->
        <div class="card riven-strategy-card">
          <div class="step-num-badge">PASO 3</div>
          <h3>🧬 La Fórmula Matemática del God Roll (2+ 1-)</h3>
          <p class="muted small">¿Por qué tener un stat negativo es el secreto para alcanzar los números más altos?</p>
          <div class="strategy-alert-box success">
            <b>El Multiplicador Oculto:</b>
            <p>Un Riven con <b>2 Positivos + 1 Negativo inocuo</b> activa un multiplicador oculto de <b>+25% en los stats positivos</b>. Sin el negativo, los stats positivos son hasta un 35% más bajos.</p>
          </div>
          <div class="godroll-comparison-box">
            <div class="godroll-row highlight">
              <span class="combo-tag s-tier">👑 2 Positivos + 1 Negativo</span>
              <span class="combo-desc"><b>+25% bono de potencia:</b> Alcanza los porcentajes más altos posibles en el juego (Tier S+).</span>
            </div>
            <div class="godroll-row">
              <span class="combo-tag a-tier">⚔️ 3 Positivos + 1 Negativo</span>
              <span class="combo-desc"><b>+20% bono:</b> Muy versátil con 3 estadísticas útiles, pero sus valores individuales son ~20% menores.</span>
            </div>
            <div class="godroll-row">
              <span class="combo-tag c-tier">⚠️ Sin Negativo (2+0 o 3+0)</span>
              <span class="combo-desc"><b>Sin bono:</b> Los valores son bajos y nunca alcanzarán los topes máximos de mercado.</span>
            </div>
          </div>
        </div>
      </div>

      <!-- MEJORES POSITIVOS Y NEGATIVOS PARA EL ARMA SELECCIONADA -->
      <article class="card wide" style="margin-top:20px;">
        <header>
          <div>
            <h3>🎯 Estadísticas Ideales para ${esc(weaponNameEs)}</h3>
            <p class="muted small">Prioridad de búsqueda al tirar con Kuva para esta arma específica.</p>
          </div>
        </header>

        <div class="two" style="gap:20px;margin-top:12px;">
          <!-- POSITIVOS META -->
          <div class="stat-category-panel">
            <h4 style="color:#4ade80;display:flex;align-items:center;gap:8px;">
              <span>✅</span> Mejores Atributos Positivos (Prioridad Alta)
            </h4>
            <div class="stat-pills-list">
              ${metaPositives.map(([k, s]) => `
                <div class="stat-meta-item">
                  <span class="attr pos">${esc(s.name)}</span>
                  <span class="stat-note">${getStatExplanation(k, catKey)}</span>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- NEGATIVOS INOCUOS Y PELIGROSOS -->
          <div class="stat-category-panel">
            <h4 style="color:#38bdf8;display:flex;align-items:center;gap:8px;">
              <span>🛡️</span> Negativos Inocuos (Los que potencian el Riven sin penalizar)
            </h4>
            <div class="stat-pills-list">
              ${harmlessNegatives.map(([k, s]) => `
                <div class="stat-meta-item">
                  <span class="attr neg">${esc(s.name)}</span>
                  <span class="stat-note">${getNegativeExplanation(k, catKey)}</span>
                </div>
              `).join('')}
            </div>

            <h4 style="color:#f87171;margin-top:16px;display:flex;align-items:center;gap:8px;">
              <span>☠️</span> Negativos Destructores (¡Arruinan el Riven al Instante!)
            </h4>
            <div class="stat-meta-item fatal">
              <span class="attr neg" style="background:rgba(239,68,68,.2);border-color:#ef4444;color:#fca5a5;">-Daño Crítico o -Prob. Crítica</span>
              <span class="stat-note">Anula por completo el daño crítico del arma. Reroll obligatorio.</span>
            </div>
            <div class="stat-meta-item fatal">
              <span class="attr neg" style="background:rgba(239,68,68,.2);border-color:#ef4444;color:#fca5a5;">-Multidisparo</span>
              <span class="stat-note">Reduce los proyectiles a cero o la mitad. Totalmente inservible.</span>
            </div>
            <div class="stat-meta-item fatal">
              <span class="attr neg" style="background:rgba(239,68,68,.2);border-color:#ef4444;color:#fca5a5;">-Daño Total o -Cadencia Extrema</span>
              <span class="stat-note">Destruye el DPS y la agilidad del arma.</span>
            </div>
          </div>
        </div>
      </article>
    `;
  }

  // ==========================================================================
  // PESTAÑA 2: CALCULADORA DE TOPES Y RANGOS MULTI-ESTADÍSTICA
  // ==========================================================================
  function renderCalculatorTab(container) {
    const w = currentWeapon;
    const weaponNameEs = t(w.n, w.n);
    const catKey = getWeaponCategoryKey(w.rt);
    const table = BASE_RIVEN_STATS[catKey] || BASE_RIVEN_STATS.rifle;
    const statKeys = Object.keys(table);
    const posKeys = statKeys.filter(k => !table[k].isHarmlessNeg);
    const negKeys = statKeys.filter(k => table[k].isHarmlessNeg);

    let currentCfg = '3pos_1neg';
    let lockedSlotIdx = -1; // -1 = sin candado

    // Slots iniciales
    let slots = [
      { id: 0, type: 'pos', stat: 'multishot', val: null },
      { id: 1, type: 'pos', stat: 'critical_damage', val: null },
      { id: 2, type: 'pos', stat: 'critical_chance', val: null },
      { id: 3, type: 'neg', stat: 'zoom', val: null }
    ];

    function syncSlotsForCfg(cfg) {
      if (cfg === '2pos_1neg') {
        slots = [
          slots[0] || { id: 0, type: 'pos', stat: 'multishot', val: null },
          slots[1] || { id: 1, type: 'pos', stat: 'critical_damage', val: null },
          slots.find(s => s.type === 'neg') || { id: 2, type: 'neg', stat: 'zoom', val: null }
        ];
      } else if (cfg === '3pos_1neg') {
        const p1 = slots[0] || { id: 0, type: 'pos', stat: 'multishot', val: null };
        const p2 = slots[1] || { id: 1, type: 'pos', stat: 'critical_damage', val: null };
        const p3 = slots[2] && slots[2].type === 'pos' ? slots[2] : { id: 2, type: 'pos', stat: 'damage', val: null };
        const n1 = slots.find(s => s.type === 'neg') || { id: 3, type: 'neg', stat: 'zoom', val: null };
        slots = [p1, p2, p3, n1];
      } else if (cfg === '2pos_0neg') {
        slots = [
          slots[0] || { id: 0, type: 'pos', stat: 'multishot', val: null },
          slots[1] || { id: 1, type: 'pos', stat: 'critical_damage', val: null }
        ];
      } else if (cfg === '3pos_0neg') {
        slots = [
          slots[0] || { id: 0, type: 'pos', stat: 'multishot', val: null },
          slots[1] || { id: 1, type: 'pos', stat: 'critical_damage', val: null },
          slots[2] && slots[2].type === 'pos' ? slots[2] : { id: 2, type: 'pos', stat: 'damage', val: null }
        ];
      }
      if (lockedSlotIdx >= slots.length) lockedSlotIdx = -1;
    }

    container.innerHTML = `
      <article class="card wide">
        <header>
          <div>
            <h3>🧮 Calculadora de Rangos y Topes Máximos para ${esc(weaponNameEs)}</h3>
            <p class="muted small">Evalúa todas las estadísticas de tu Riven simultáneamente hacia abajo. Comprueba si cada porcentaje está cerca del límite teórico del juego o si vale la pena rollear más.</p>
          </div>
        </header>

        <div class="calc-controls-grid" style="grid-template-columns:1fr auto;align-items:center;">
          <div class="calc-input-group">
            <label>1. Tipo de Tirada en el Riven (Estructura de Atributos):</label>
            <select id="calc-cfg-select" class="calc-select" style="font-size:1rem;font-weight:700;">
              <option value="3pos_1neg" ${currentCfg === '3pos_1neg' ? 'selected' : ''}>⚔️ 3 Positivos + 1 Negativo (Bono +20% - 4 Estadísticas)</option>
              <option value="2pos_1neg" ${currentCfg === '2pos_1neg' ? 'selected' : ''}>👑 2 Positivos + 1 Negativo (God Roll Puro - Bono +25% - 3 Estadísticas)</option>
              <option value="2pos_0neg" ${currentCfg === '2pos_0neg' ? 'selected' : ''}>⚖️ 2 Positivos sin Negativo (Estándar - 2 Estadísticas)</option>
              <option value="3pos_0neg" ${currentCfg === '3pos_0neg' ? 'selected' : ''}>📉 3 Positivos sin Negativo (Valores Bajos - 3 Estadísticas)</option>
            </select>
          </div>

          <div class="calc-input-group" style="text-align:right;">
            <label style="color:#94a3b8;">Disposición del Arma:</label>
            <span class="badge ok" style="font-size:0.95rem;padding:6px 12px;">Disposición ${w.dis.toFixed(2)}x</span>
          </div>
        </div>

        <!-- CONTENEDOR DE SLOTS APILADOS HACIA ABAJO -->
        <div id="calc-slots-wrapper" class="calc-slots-container"></div>

        <!-- PANEL DE RESUMEN GLOBAL DEL RIVEN -->
        <div id="calc-global-summary-box"></div>
      </article>
    `;

    function renderSlots() {
      syncSlotsForCfg(currentCfg);
      const wrapper = $('#calc-slots-wrapper', container);
      if (!wrapper) return;

      let totalPct = 0;
      let slotCount = slots.length;

      wrapper.innerHTML = slots.map((slot, idx) => {
        const isNeg = slot.type === 'neg';
        const range = calculateRivenStatRange(catKey, w.dis, slot.stat, currentCfg, isNeg);

        if (slot.val === null || isNaN(slot.val)) {
          slot.val = Math.round(range.avg * 10) / 10;
        }

        const isLocked = lockedSlotIdx === idx;
        const pctOfMax = range.max > 0 ? Math.min(100, Math.max(0, (slot.val / range.max) * 100)) : 0;
        totalPct += pctOfMax;

        let verdictClass = 'verdict-mid';
        let verdictBadge = 'RANGO MEDIO / JUGABLE';
        let adviceText = '';

        if (pctOfMax >= 93) {
          verdictClass = 'verdict-god';
          verdictBadge = '🌟 TIRO PERFECTO DE FÁBRICA (95%+)';
          adviceText = `¡Tirada perfecta! Tu <b>${slot.val}${range.unit}</b> roza el tope absoluto teórico de <b>${range.max.toFixed(1)}${range.unit}</b>. La probabilidad de mejorar este stat con más rerolls es menor al 1.5%.`;
        } else if (pctOfMax >= 82) {
          verdictClass = 'verdict-great';
          verdictBadge = '🔥 EXCELENTE (RANGO S / A+)';
          adviceText = `Muy alto: tienes el <b>${pctOfMax.toFixed(1)}% del tope teórico</b> (máximo: ${range.max.toFixed(1)}${range.unit}). Rendimiento formidable en Camino de Acero.`;
        } else if (pctOfMax >= 68) {
          verdictClass = 'verdict-mid';
          verdictBadge = '⚖️ RANGO MEDIO / JUGABLE';
          adviceText = `Tu valor de <b>${slot.val}${range.unit}</b> es aceptable pero está algo lejos del tope de <b>${range.max.toFixed(1)}${range.unit}</b>. Si tienes Kuva de sobra, puedes buscar un valor más cercano al promedio de ${range.avg.toFixed(1)}${range.unit}.`;
        } else {
          verdictClass = 'verdict-low';
          verdictBadge = '📉 ROLL BAJO O RESTRINGIDO';
          adviceText = `Tu valor de <b>${slot.val}${range.unit}</b> está en la franja baja (tope potencial: ${range.max.toFixed(1)}${range.unit}). Conviene rollear si buscas potenciar el arma al máximo.`;
        }

        return `
          <div class="calc-slot-card ${isLocked ? 'is-locked' : ''}" id="slot-card-${idx}">
            <div class="calc-slot-top-bar">
              <div class="calc-slot-title-wrap">
                <span class="calc-slot-badge ${isNeg ? 'neg' : 'pos'}">
                  ${isNeg ? '🛡️ NEGATIVO (INOCUO)' : `+ POSITIVO #${idx + 1}`}
                </span>
                <h4 style="margin:0;font-size:1.15rem;color:#f0f9ff;text-transform:uppercase;letter-spacing:0.5px;">
                  ${range.name} en ${esc(weaponNameEs)}
                </h4>
                ${isLocked ? '<span class="badge" style="border-color:#fde047;color:#fde047;font-weight:700;">🔒 CANDADO ACTIVO</span>' : ''}
              </div>

              <div class="calc-slot-actions">
                <button type="button" class="btn-riven-lock ${isLocked ? 'locked' : ''}" data-slot-lock="${idx}">
                  <span>${isLocked ? '🔒 Bloqueado (7.000 Kuva)' : '🔓 Bloquear Atributo'}</span>
                </button>
                <div class="calc-verdict-badge ${verdictClass}">${verdictBadge}</div>
              </div>
            </div>

            <div class="calc-slot-controls-row">
              <div class="calc-field-col">
                <label class="calc-mini-label">Estadística en esta casilla:</label>
                <select class="calc-select calc-slot-stat" data-slot-idx="${idx}">
                  ${(isNeg ? negKeys : posKeys).map(k => `
                    <option value="${k}" ${k === slot.stat ? 'selected' : ''}>
                      ${isNeg ? '- ' : '+ '}${table[k].name}
                    </option>
                  `).join('')}
                </select>
              </div>

              <div class="calc-field-col">
                <label class="calc-mini-label">Introduce el porcentaje de tu Riven:</label>
                <div class="calc-input-addon">
                  <input type="number" class="calc-num-input calc-slot-val" data-slot-idx="${idx}" value="${slot.val}" step="0.1">
                  <span class="calc-addon-unit">${range.unit}</span>
                </div>
              </div>
            </div>

            <!-- MEDIDOR VISUAL HOLOGRÁFICO CON ESPACIO DESPEJADO -->
            <div class="stat-gauge-wrapper">
              <div class="gauge-labels-row">
                <span>Mínimo: <b>${range.min.toFixed(1)}${range.unit}</b></span>
                <span>Promedio: <b style="color:#38bdf8;">${range.avg.toFixed(1)}${range.unit}</b></span>
                <span>Tope Máximo Teórico: <b style="color:#4ade80;">${range.max.toFixed(1)}${range.unit}</b></span>
              </div>

              <div class="stat-gauge-track">
                <div class="stat-gauge-fill ${verdictClass}" style="width:${pctOfMax.toFixed(1)}%;"></div>
                <div class="stat-gauge-marker" style="left:${pctOfMax.toFixed(1)}%;">
                  <span class="marker-bubble">${slot.val}${range.unit} (${pctOfMax.toFixed(1)}%)</span>
                </div>
              </div>
            </div>

            <div class="calc-verdict-box ${verdictClass}">
              <div class="verdict-icon-symbol">${isLocked ? '🔒' : '💠'}</div>
              <div class="verdict-text-content">
                <p>${adviceText}</p>
              </div>
            </div>
          </div>
        `;
      }).join('');

      // Renderizar resumen global
      const avgQuality = slotCount > 0 ? (totalPct / slotCount) : 0;
      let globalTier = 'TIER B (JUGABLE)';
      let globalColor = '#38bdf8';
      if (avgQuality >= 90) {
        globalTier = '👑 GOD ROLL SUPREMO (TIER S+)';
        globalColor = 'var(--gold)';
      } else if (avgQuality >= 80) {
        globalTier = '🔥 EXCELENTE META (TIER S / A+)';
        globalColor = '#a855f7';
      } else if (avgQuality < 65) {
        globalTier = '📉 TIRADA POR DEBAJO DEL POTENCIAL';
        globalColor = '#ef4444';
      }

      const summaryBox = $('#calc-global-summary-box', container);
      if (summaryBox) {
        const isAnyLocked = lockedSlotIdx !== -1;
        summaryBox.innerHTML = `
          <div class="calc-global-summary">
            <div>
              <span class="muted small" style="text-transform:uppercase;letter-spacing:0.8px;">Calidad General de la Tirada:</span>
              <h3 style="margin:4px 0;font-size:1.6rem;color:${globalColor};">${globalTier}</h3>
              <p class="muted small" style="margin:0;">
                Tus estadísticas promedian el <b>${avgQuality.toFixed(1)}% de perfección</b> respecto al límite teórico del juego.
              </p>
            </div>

            <div style="background:rgba(0,0,0,0.45);border:1px solid ${isAnyLocked ? '#fde047' : 'rgba(56,189,248,0.3)'};border-radius:14px;padding:14px 18px;min-width:260px;">
              <div style="display:flex;justify-content:space-between;align-items:center;gap:10px;">
                <span class="small muted">Coste por Reroll:</span>
                <span class="badge" style="border-color:${isAnyLocked ? '#fde047' : '#38bdf8'};color:${isAnyLocked ? '#fde047' : '#38bdf8'};font-weight:900;">
                  ${isAnyLocked ? '🔒 7.000 Kuva / Tirada' : '3.500 Kuva / Tirada'}
                </span>
              </div>
              <div class="small muted" style="margin-top:8px;line-height:1.4;">
                ${isAnyLocked ? `
                  <b style="color:#fef08a;">Candado activo en ${table[slots[lockedSlotIdx]?.stat]?.name || 'atributo'}:</b><br>
                  5 tiradas = 35.000 Kuva · 10 tiradas = 70.000 Kuva.
                ` : `
                  Sin bloqueo activo (coste estándar tras tirada #9):<br>
                  5 tiradas = 17.500 Kuva · 10 tiradas = 35.000 Kuva.
                `}
              </div>
            </div>
          </div>
        `;
      }
    }

    container.addEventListener('change', (e) => {
      if (e.target.id === 'calc-cfg-select') {
        currentCfg = e.target.value;
        renderSlots();
      } else if (e.target.classList.contains('calc-slot-stat')) {
        const idx = parseInt(e.target.dataset.slotIdx, 10);
        if (slots[idx]) {
          slots[idx].stat = e.target.value;
          slots[idx].val = null; // reset to new avg
          renderSlots();
        }
      }
    });

    container.addEventListener('input', (e) => {
      if (e.target.classList.contains('calc-slot-val')) {
        const idx = parseInt(e.target.dataset.slotIdx, 10);
        if (slots[idx]) {
          slots[idx].val = parseFloat(e.target.value) || 0;
          renderSlots();
        }
      }
    });

    container.addEventListener('click', (e) => {
      const lockBtn = e.target.closest('[data-slot-lock]');
      if (lockBtn) {
        const idx = parseInt(lockBtn.dataset.slotLock, 10);
        lockedSlotIdx = (lockedSlotIdx === idx) ? -1 : idx; // toggle
        renderSlots();
      }
    });

    renderSlots();
  }

  // ==========================================================================
  // PESTAÑA 3: INSPECTOR Y CALIFICADOR VISUAL DE AGRIETADOS
  // ==========================================================================
  function renderBuilderTab(container) {
    const w = currentWeapon;
    const weaponNameEs = t(w.n, w.n);
    const catKey = getWeaponCategoryKey(w.rt);
    const table = BASE_RIVEN_STATS[catKey] || BASE_RIVEN_STATS.rifle;
    const statKeys = Object.keys(table);

    const posStats = statKeys.filter(k => !table[k].isHarmlessNeg);
    const negStats = statKeys.filter(k => table[k].isHarmlessNeg);

    container.innerHTML = `
      <article class="card wide">
        <header>
          <div>
            <h3>🔬 Inspector y Calificador de Tirada para ${esc(weaponNameEs)}</h3>
            <p class="muted small">Selecciona los atributos de tu Riven para generar su carta visual holográfica, calcular su puntuación de Tier, simular bloqueo con candado (7.000 Kuva) y estimar su precio en platino.</p>
          </div>
        </header>

        <div class="builder-split-grid">
          <!-- PANEL IZQUIERDO: SELECTORES -->
          <div class="builder-controls-panel">
            <div class="calc-input-group">
              <label>Primer Atributo Positivo (+):</label>
              <select id="builder-pos1" class="calc-select">
                ${posStats.map(k => `<option value="${k}" ${k === 'multishot' ? 'selected' : ''}>+ ${table[k].name}</option>`).join('')}
              </select>
            </div>

            <div class="calc-input-group">
              <label>Segundo Atributo Positivo (+):</label>
              <select id="builder-pos2" class="calc-select">
                ${posStats.map(k => `<option value="${k}" ${k === 'critical_damage' ? 'selected' : ''}>+ ${table[k].name}</option>`).join('')}
              </select>
            </div>

            <div class="calc-input-group">
              <label>Tercer Atributo Positivo (Opcional):</label>
              <select id="builder-pos3" class="calc-select">
                <option value="none" selected>— Ninguno (Configuración 2 Positivos) —</option>
                ${posStats.map(k => `<option value="${k}">+ ${table[k].name}</option>`).join('')}
              </select>
            </div>

            <div class="calc-input-group">
              <label>Atributo Negativo (-):</label>
              <select id="builder-neg" class="calc-select">
                <option value="none">— Sin Negativo —</option>
                <optgroup label="🛡️ Negativos Inocuos (Los Mejores)">
                  ${negStats.map(k => `<option value="${k}" ${k === 'zoom' ? 'selected' : ''}>- ${table[k].name}</option>`).join('')}
                </optgroup>
                <optgroup label="☠️ Negativos Destructores (Arruinan la Tirada)">
                  <option value="fatal_crit">- Daño Crítico / Prob. Crítica (Fatal)</option>
                  <option value="fatal_multi">- Multidisparo (Fatal)</option>
                  <option value="fatal_dmg">- Daño Total (Fatal)</option>
                  <option value="fatal_fire_rate">- Cadencia Extrema (Fatal)</option>
                </optgroup>
              </select>
            </div>

            <div class="calc-input-group" style="background:rgba(234, 179, 8, 0.08); border:1px solid rgba(234, 179, 8, 0.25); border-radius:8px; padding:12px; margin-top:10px;">
              <label style="color:#fde047; font-weight:700; display:flex; align-items:center; justify-content:space-between;">
                <span>🔒 Candado de Atributo:</span>
                <span style="font-size:0.75rem; color:#fde047; font-weight:600;">Coste: 7.000 Kuva / Roll</span>
              </label>
              <select id="builder-lock-select" class="calc-select" style="margin-top:6px;">
                <option value="none">🔓 Sin candado (Coste estándar: 3.500 Kuva)</option>
                <option value="pos1">🔒 Bloquear Primer Positivo (+)</option>
                <option value="pos2">🔒 Bloquear Segundo Positivo (+)</option>
                <option value="pos3">🔒 Bloquear Tercer Positivo (+)</option>
                <option value="neg">🔒 Bloquear Negativo (-)</option>
              </select>
              <p class="small muted" style="margin-top:6px; margin-bottom:0; font-size:0.8rem; line-height:1.4;">
                Fija la estadística exacta para que no cambie al rollear. Duplica el coste de Kuva a <b>7.000 por intento</b>.
              </p>
            </div>
          </div>

          <!-- PANEL DERECHO: TARJETA VISUAL HOLOGRÁFICA & ESTIMADOR -->
          <div class="builder-preview-panel" id="builder-output-box"></div>
        </div>
      </article>
    `;

    function updateBuilder() {
      const pos1 = $('#builder-pos1', container).value;
      const pos2 = $('#builder-pos2', container).value;
      const pos3 = $('#builder-pos3', container).value;
      const neg = $('#builder-neg', container).value;
      const lock = $('#builder-lock-select', container)?.value || 'none';

      const hasPos3 = pos3 !== 'none';
      const hasNeg = neg !== 'none';
      const isFatalNeg = neg.startsWith('fatal_');

      // Determinar configuración
      let cfg = '2pos_0neg';
      if (!hasPos3 && hasNeg) cfg = '2pos_1neg';
      else if (hasPos3 && hasNeg) cfg = '3pos_1neg';
      else if (hasPos3 && !hasNeg) cfg = '3pos_0neg';

      const statKeys = [pos1, pos2];
      if (hasPos3) statKeys.push(pos3);

      const rivenName = generateRivenName(w.n, statKeys);

      // Calcular valores promedio para la tarjeta visual
      const p1Range = calculateRivenStatRange(catKey, w.dis, pos1, cfg);
      const p2Range = calculateRivenStatRange(catKey, w.dis, pos2, cfg);
      const p3Range = hasPos3 ? calculateRivenStatRange(catKey, w.dis, pos3, cfg) : null;

      let negRange = null;
      if (hasNeg && !isFatalNeg) {
        negRange = calculateRivenStatRange(catKey, w.dis, neg, cfg);
      }

      // Evaluar Tier de la tirada
      let tier = 'TIER B';
      let tierColor = '#94a3b8';
      let priceEst = '150 - 350 PL';
      let verdictAdvice = '';

      if (isFatalNeg) {
        tier = 'TIER F (ARREBATA-BUILDS)';
        tierColor = '#ef4444';
        priceEst = 'Precio de Chatarra / Unrolled (30 - 80 PL)';
        verdictAdvice = 'El negativo anula por completo la efectividad del arma. Debes volver a rollear con Kuva obligatoriamente.';
      } else {
        const p1Meta = table[pos1]?.isMetaPos;
        const p2Meta = table[pos2]?.isMetaPos;
        const p3Meta = hasPos3 ? table[pos3]?.isMetaPos : true;
        const metaCount = (p1Meta ? 1 : 0) + (p2Meta ? 1 : 0) + (hasPos3 && p3Meta ? 1 : 0);

        if (cfg === '2pos_1neg' && metaCount === 2) {
          tier = '👑 TIER S+ (GOD ROLL SUPREMO)';
          tierColor = '#fbbf24';
          priceEst = `${(estimateRivenMarketPrices(w).godMin).toLocaleString()} - ${(estimateRivenMarketPrices(w).godMax).toLocaleString()}+ PL`;
          verdictAdvice = '¡Tirada Legendaria! Tienes los mejores positivos potenciados por el multiplicador +25% de un negativo inocuo. Conserva o vende por una fortuna.';
        } else if (cfg === '3pos_1neg' && metaCount >= 2) {
          tier = '🔥 TIER S (EXCELENTE META)';
          tierColor = '#a855f7';
          priceEst = `${Math.round(estimateRivenMarketPrices(w).decentMax * 1.3)} - ${Math.round(estimateRivenMarketPrices(w).godMin * 0.9)} PL`;
          verdictAdvice = 'Tirada muy poderosa. 3 estadísticas positivas con negativo inofensivo. Altamente codiciado en el mercado.';
        } else if (metaCount >= 2) {
          tier = '⚔️ TIER A (JUGABLE / MUY BUENO)';
          tierColor = '#38bdf8';
          priceEst = `${estimateRivenMarketPrices(w).decentMin} - ${estimateRivenMarketPrices(w).decentMax} PL`;
          verdictAdvice = 'Riven muy sólido. Le falta un negativo inofensivo para ser God Roll, pero rinde excelente en juego diario.';
        } else {
          tier = '⚖️ TIER B (PROMEDIO)';
          tierColor = '#94a3b8';
          priceEst = `${estimateRivenMarketPrices(w).unrolledMin} - ${estimateRivenMarketPrices(w).decentMin} PL`;
          verdictAdvice = 'Tirada promedio. Puedes usarla temporalmente o seguir roleando si tienes Kuva excedente.';
        }
      }

      const isP1Locked = lock === 'pos1';
      const isP2Locked = lock === 'pos2';
      const isP3Locked = lock === 'pos3' && hasPos3;
      const isNegLocked = lock === 'neg' && hasNeg;
      const anyLocked = isP1Locked || isP2Locked || isP3Locked || isNegLocked;

      const outBox = $('#builder-output-box', container);
      outBox.innerHTML = `
        <!-- CARTA VISUAL DE AGRIETADO -->
        <div class="hologram-riven-card">
          <div class="riven-card-glow"></div>
          <div class="riven-card-inner">
            <div class="riven-card-top">
              <span class="riven-icon-symbol">🌀</span>
              <span class="riven-card-title">${esc(rivenName)}</span>
              <span class="riven-card-pol">🗲</span>
            </div>

            <div class="riven-card-stats-list">
              <div class="riven-card-stat-line pos ${isP1Locked ? 'is-locked-stat' : ''}">
                ${isP1Locked ? '<span class="lock-indicator" title="Atributo Bloqueado">🔒</span> ' : ''}+${p1Range.avg.toFixed(1)}${p1Range.unit} ${p1Range.name}
              </div>
              <div class="riven-card-stat-line pos ${isP2Locked ? 'is-locked-stat' : ''}">
                ${isP2Locked ? '<span class="lock-indicator" title="Atributo Bloqueado">🔒</span> ' : ''}+${p2Range.avg.toFixed(1)}${p2Range.unit} ${p2Range.name}
              </div>
              ${hasPos3 ? `
                <div class="riven-card-stat-line pos ${isP3Locked ? 'is-locked-stat' : ''}">
                  ${isP3Locked ? '<span class="lock-indicator" title="Atributo Bloqueado">🔒</span> ' : ''}+${p3Range.avg.toFixed(1)}${p3Range.unit} ${p3Range.name}
                </div>` : ''}
              ${hasNeg && !isFatalNeg ? `
                <div class="riven-card-stat-line neg ${isNegLocked ? 'is-locked-stat' : ''}">
                  ${isNegLocked ? '<span class="lock-indicator" title="Atributo Bloqueado">🔒</span> ' : ''}-${negRange.avg.toFixed(1)}${negRange.unit} ${negRange.name.replace(/ \(.*\)/, '')}
                </div>` : ''}
              ${isFatalNeg ? `<div class="riven-card-stat-line neg fatal-line">-50% Penalización Crítica/Daño Fatal</div>` : ''}
            </div>

            <div class="riven-card-bottom">
              <span>MR ${w.mr}</span>
              <span>●●●●○</span>
              <span>${anyLocked ? '🔒 7.000 Kuva / ciclo' : '3.500 Kuva / ciclo'}</span>
            </div>
          </div>
        </div>

        <!-- EVALUACIÓN DE TIER Y PRECIO -->
        <div class="builder-verdict-summary">
          <div class="verdict-tier-badge" style="border-color:${tierColor};color:${tierColor};">
            ${tier}
          </div>
          <div class="verdict-price-row">
            <span class="muted small">Valor Estimado en Mercado:</span>
            <span class="verdict-price-value">${priceEst}</span>
          </div>
          <p class="builder-advice-text">${verdictAdvice}</p>

          ${anyLocked ? `
            <div style="margin-top:10px; padding:10px 12px; background:rgba(234, 179, 8, 0.12); border-left:3px solid #eab308; border-radius:6px; font-size:0.85rem; color:#fef08a; line-height:1.4;">
              <b>🔒 Atributo Asegurado con Candado:</b> El atributo marcado queda fijado en cada tirada. El coste por ciclo en el banco de mods aumenta a <b>7.000 Kuva</b> (el doble del estándar).
            </div>
          ` : ''}
        </div>
      `;
    }

    container.addEventListener('change', (e) => {
      if (e.target.matches('#builder-pos1, #builder-pos2, #builder-pos3, #builder-neg, #builder-lock-select')) {
        updateBuilder();
      }
    });

    updateBuilder();
  }

  // ==========================================================================
  // PESTAÑA 4: MERCADO EN VIVO Y SUBASTAS (WARFRAME.MARKET)
  // ==========================================================================
  async function renderMarketTab(container) {
    const w = currentWeapon;
    const weaponNameEs = t(w.n, w.n);

    container.innerHTML = `<div class="notice">Consultando subastas activas de Rivens para ${esc(weaponNameEs)} en warframe.market…</div>`;

    let auctions = [];
    try {
      const r = await fetch(`/api/riven/${w.slug}`);
      if (!r.ok) throw new Error(r.status);
      auctions = await r.json();
    } catch (e) {
      container.innerHTML = `<div class="notice">No se pudieron consultar las subastas en vivo (${esc(e.message)}). Por favor intenta de nuevo en unos momentos.</div>`;
      return;
    }

    // Agrupar combinaciones
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

    container.innerHTML = `
      <article class="card wide">
        <header>
          <div>
            <h3>📈 Subastas en Vivo para ${esc(weaponNameEs)}</h3>
            <p class="muted small">Ofertas activas de jugadores en warframe.market. Usa el botón "Copiar /w" para susurrar al vendedor en el juego.</p>
          </div>
          <div class="price-col">
            <small>Riven más barato listado:</small>
            ${plat(auctions[0]?.p ?? null)}
          </div>
        </header>

        <h4 style="margin-top:16px;color:var(--gold);">Combinaciones Más Ofertadas</h4>
        <div class="table-responsive">
          <table class="tbl">
            <thead>
              <tr><th>Atributos Positivos</th><th>Negativo</th><th>Ofertas</th><th>Precio Mínimo</th><th>Precio Mediano</th></tr>
            </thead>
            <tbody>
              ${rows.map(r => `
                <tr>
                  <td>${r.pos.map(u => `<span class="attr pos">${esc(u.replace(/_/g, ' '))}</span>`).join('')}</td>
                  <td>${r.neg.map(u => `<span class="attr neg">${esc(u.replace(/_/g, ' '))}</span>`).join('') || '<span class="muted">—</span>'}</td>
                  <td>${r.n}</td>
                  <td>${plat(r.min)}</td>
                  <td>${plat(r.med)}</td>
                </tr>
              `).join('') || '<tr><td colspan="5">Sin ofertas activas registradas.</td></tr>'}
            </tbody>
          </table>
        </div>

        <h4 style="margin-top:24px;color:var(--gold);">Ofertas Individuales Activas</h4>
        <div class="rivlist" style="margin-top:10px;">
          ${auctions.slice(0, 24).map(a => `
            <div class="riv">
              <div class="riv-h">
                <b>${esc(weaponNameEs)} ${esc(a.name)}</b>
                <span>${plat(a.p)}</span>
              </div>
              <div class="riv-b" style="margin:8px 0;">
                ${a.a.map(x => `<span class="attr ${x.pos ? 'pos' : 'neg'}">${esc(x.u.replace(/_/g, ' '))} <b>${x.pos ? '+' : ''}${x.v}</b></span>`).join('')}
              </div>
              <div class="riv-f">
                <small><span class="dot ${esc(a.st)}"></span>${esc(a.o)} · MR ${a.mr} · ${a.rr} rerolls</small>
                <button class="mini" data-act="copy" data-text="${esc(`/w ${a.o} Hola! Quisiera comprar tu Riven ${w.n} ${a.name} por ${a.p} platino. (warframe.market)`)}">Copiar /w</button>
              </div>
            </div>
          `).join('') || '<p class="muted">No hay subastas activas en este instante.</p>'}
        </div>
      </article>
    `;
  }

  // ==========================================================================
  // EVENTOS GLOBALES DE NAVEGACIÓN Y BÚSQUEDA
  // ==========================================================================
  function attachGlobalEvents() {
    // Cambio de pestañas
    $('#riven-view-tabs', root)?.addEventListener('click', (e) => {
      const btn = e.target.closest('button');
      if (btn && btn.dataset.tab) {
        activeTab = btn.dataset.tab;
        $$('#riven-view-tabs button', root).forEach(b => b.classList.toggle('on', b === btn));
        renderTabContent();
      }
    });

    // Botón directo a mercado en vivo
    $('#btn-quick-market', root)?.addEventListener('click', () => {
      activeTab = 'market';
      $$('#riven-view-tabs button', root).forEach(b => b.classList.toggle('on', b.dataset.tab === 'market'));
      renderTabContent();
    });

    // Píldoras de armas populares
    root.addEventListener('click', (e) => {
      const pill = e.target.closest('[data-slug]');
      if (pill) {
        const slug = pill.dataset.slug;
        const targetW = weapons.find(w => w.slug === slug);
        if (targetW) {
          currentWeapon = targetW;
          renderView();
        }
      }
    });

    // Buscador de armas con sugerencias
    const searchInput = $('#riven-weapon-search', root);
    if (searchInput) {
      searchInput.addEventListener('input', debounce((e) => {
        const query = norm(e.target.value.trim());
        if (!query) return;

        const match = weapons.find(w => {
          const es = norm(t(w.n, w.n));
          return es.startsWith(query) || norm(w.n).startsWith(query) || es.includes(query) || norm(w.n).includes(query);
        });

        if (match && match.slug !== currentWeapon.slug) {
          currentWeapon = match;
          renderView();
          const inp = $('#riven-weapon-search', root);
          if (inp) {
            inp.focus();
            inp.setSelectionRange(inp.value.length, inp.value.length);
          }
        }
      }, 250));
    }
  }

  // Explicaciones didácticas de estadísticas
  function getStatExplanation(statKey, category) {
    const map = {
      multishot: 'Dispara proyectiles adicionales por cada disparo sin consumir munición extra. Multiplica directamente el daño.',
      critical_damage: 'Multiplica de forma exponencial los golpes críticos (naranjas y rojos). El atributo rey de daño puro.',
      critical_chance: 'Asegura alcanzar críticos consistentes de nivel 2 y 3 (críticos naranjas y rojos).',
      damage: 'Aumenta el daño base del arma, escalando con todos los mods elementales.',
      fire_rate: 'Aumenta las balas por segundo. Esencial para activar efectos de estado y vaciar el cargador.',
      attack_speed: 'Acelera las animaciones de combate cuerpo a cuerpo y la fluidez del ataque pesado.',
      range: 'Aumenta el área de impacto para golpear a decenas de enemigos a la vez.',
      initial_combo: 'Permite mantener combos altos permanentes sin necesidad de golpear antes del ataque pesado (clave para Stat-Sticks).'
    };
    return map[statKey] || 'Mejora considerablemente el rendimiento y sinergia del arma.';
  }

  function getNegativeExplanation(negKey, category) {
    const map = {
      zoom: 'Disminuye el aumento de la mira al apuntar. No tiene NINGÚN impacto en el daño ni en el DPS. ¡El mejor negativo del juego!',
      recoil: 'Aumenta el retroceso. En armas de ráfagas controladas o semi-automáticas es totalmente imperceptible.',
      damage_vs_infested: 'Reduce el daño contra Infestados. Como los infestados tienen muy poca vida y armadura, mueren de un disparo de todos modos.',
      ammo_maximum: 'Reduce la reserva total de munición. Se soluciona instantáneamente con el centinela Portador (Carrier) o Mod Exilus.',
      finisher_damage: 'Reduce el daño de remate furtivo, el cual casi nunca se usa en misiones normales o Camino de Acero.'
    };
    return map[negKey] || 'Penalización menor que no perjudica el daño real contra enemigos.';
  }

  renderView();
}

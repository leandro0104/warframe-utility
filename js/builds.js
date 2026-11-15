// Builds curadas (referencia meta moderna para Steel Path y Endgame basadas en guías de eduiy16).
// Los nombres de mods y arcanos se resuelven a imágenes en HD y traducciones oficiales vía warframe.market.
// Para variantes adicionales y personalizadas se incluye enlace directo a Overframe.

const F = (name, builds) => ({ name, builds });

export const FRAME_BUILDS = [
  F('Dante', [{
    name: 'Versos Finales Inmortal (eduiy16)',
    role: 'Sobreguardia Millonaria & Nuke Level Cap',
    author: 'eduiy16',
    videoUrl: 'https://www.youtube.com/watch?v=AUZIYQGwth1D25rxoY0HhHXzrFvjAD1sIovIxADCIb0v3F-XkTOSe4Imqb3TSS3FZBZkbJBc9kZjXFxw-9SpZ2loh8dS20el1KWNG901pvJEI8SDKgn5rJwpCfY_0ttzMxYJjE5D',
    aura: 'Brief Respite',
    exilus: 'Power Drift',
    mods: ['Primed Flow', 'Streamline', 'Transient Fortitude', 'Blind Rage', 'Primed Continuity', 'Stretch', 'Umbral Intensify', 'Augur Secrets'],
    arcanes: ['Arcane Energize', 'Arcane Steadfast'],
    helminth: { ability: 'Disparo Oscuro o Eclipse (Mirage)', replaces: 'Habilidad 1 (Noctua)' },
    shards: [
      { type: 'crimson', tau: true, stat: '+15% Fuerza de Habilidad' },
      { type: 'crimson', tau: true, stat: "+15% Fuerza de Habilidad" },
      { type: 'amber', tau: true, stat: '+37.5% Velocidad de lanzamiento' },
      { type: 'amber', tau: true, stat: '+37.5% Velocidad de lanzamiento' },
      { type: 'topaz', tau: false, stat: '+Regeneración de Sobreguardia con daño ígneo' }
    ],
    focus: 'Madurai (+Fuerza y Velocidad de casteo al instante)',
    notes: 'Ciclo 2-2-4 para conceder decenas de miles de Sobreguardia a todo el escuadrón (inmunidad total a estados y derribos). Luego usa 3-3-4 (Tragedia) para detonar todos los cortes y DoTs acumulados aniquilando hordas enteras al instante.'
  }]),

  F('Kullervo', [{
    name: 'Avance Furioso Inmortal & Crítico Rojo (eduiy16)',
    role: 'Sobreguardia Masiva & Melee Tier S',
    author: 'eduiy16',
    videoUrl: 'https://www.youtube.com/watch?v=AUZIYQG9i9C_q0YtgmJcnX7S3Zqbq1O7hYiel_SVme07OVitt8oe7zAvSRt7TYn12HXj5OsdkbGmQBdU8qWBO2Ad8gFyivyL60FAa1CbFm2QdYp_7AxVuJ5ACNPcvf9Ckkoc8t_2',
    aura: 'Steel Charge',
    exilus: 'Primed Sure Footed',
    mods: ['Primed Flow', 'Streamline', 'Constitution', 'Blind Rage', 'Transient Fortitude', 'Umbral Intensify', 'Umbral Vitality', 'Umbral Fiber'],
    arcanes: ['Arcane Energize', 'Arcane Strike'],
    helminth: { ability: 'Metástasis Voraz o Altar de Sangre', replaces: 'Habilidad 4 (Torbellino de Vaenn)' },
    shards: [
      { type: 'violet', tau: true, stat: '+37.5% Daño Crítico Cuerpo a Cuerpo (Duplicado con >500 Energía)' },
      { type: 'violet', tau: true, stat: '+37.5% Daño Crítico Cuerpo a Cuerpo' },
      { type: 'violet', tau: true, stat: '+37.5% Daño Crítico Cuerpo a Cuerpo' },
      { type: 'crimson', tau: true, stat: '+15% Fuerza de Habilidad' },
      { type: 'amber', tau: true, stat: '+37.5% Velocidad de casteo' }
    ],
    focus: 'Naramon (Mantiene combo melee 12x permanente)',
    notes: 'Usa Avance Furioso (1) para teletransportarte e infligir críticos rojos masivos garantizados. Vincula grupos enemigos con Recompensa Colectiva (3) para que el daño recibido por uno se replique al 100% en todos.'
  }]),

  F('Saryn', [{
    name: 'Spore Nuke & Armas de Alta Escala (eduiy16)',
    role: 'Limpieza masiva Steel Path & Santuario Élite',
    author: 'eduiy16',
    videoUrl: 'https://www.youtube.com/watch?v=AUZIYQHYaEXdWpX3bGZCBs8625giYrlGAmp9qtEWCP4_SDhaQWnqSswbH-MaWj5K23pEmnhDDCe6bsT70MyG2h8PzDPfyye26MBwFOxbzYalHbd7JV8tD1Q3tULQd1LJ-kaodJlA',
    aura: 'Growing Power',
    exilus: 'Primed Sure Footed',
    mods: ['Umbral Intensify', 'Umbral Fiber', 'Umbral Vitality', 'Transient Fortitude', 'Blind Rage', 'Overextended', 'Primed Flow', 'Stretch'],
    arcanes: ['Arcane Energize', 'Arcane Guardian'],
    helminth: { ability: 'Rugido (Rhino) o Penumbra (Sevagoth)', replaces: 'Habilidad 4 (Miasma) o Habilidad 2 (Muda)' },
    shards: [
      { type: 'emerald', tau: true, stat: '+2 Acumulaciones máx. de Corrosivo (Permite 100% Strip)' },
      { type: 'emerald', tau: true, stat: '+2 Acumulaciones máx. de Corrosivo (Despojo total armadura)' },
      { type: 'crimson', tau: true, stat: '+15% Fuerza de Habilidad' },
      { type: 'crimson', tau: true, stat: '+15% Fuerza de Habilidad' },
      { type: 'amber', tau: true, stat: '+37.5% Velocidad de lanzamiento' }
    ],
    focus: 'Madurai (+Fuerza y Lanzamiento) o Vazarin (Inmunidad Protective Sling)',
    notes: 'Los 2 Fragmentos Esmeralda aumentan las cargas de corrosivo a 14, despojando la armadura al 100% solo con tus esporas. Rugido de Rhino multiplica exponencialmente el daño de toxina y viral de tus armas.'
  }]),

  F('Mesa', [{
    name: 'Pacificadoras Inmortales SP (eduiy16)',
    role: 'Aniquilación con Reguladoras & Tanque 95%',
    author: 'eduiy16',
    videoUrl: 'https://www.youtube.com/watch?v=AUZIYQGvTZ_3b8iN2WsO_ZrX5eR1fyYrv5VvlRrHLJEcaugch2QweaxI-Ez-c9dQhKQUzmndFFlSwjgwIFgCiT7auhJJ_MCtCYkm2nk5yC8D1yVIYBt82SW8QpAJFIp8lpQQ3Oja',
    aura: 'Corrosive Projection',
    exilus: 'Primed Sure Footed',
    mods: ['Catalyzing Shields', 'Primed Continuity', 'Primed Flow', 'Transient Fortitude', 'Narrow Minded', 'Streamline', 'Umbral Intensify', "Mesa's Waltz"],
    arcanes: ['Arcane Velocity', 'Arcane Avenger'],
    helminth: { ability: 'Pillaje (Hildryn) o Dispensario (Protea)', replaces: 'Habilidad 1 (Batería Balística)' },
    shards: [
      { type: 'crimson', tau: true, stat: '+15% Fuerza de Habilidad' },
      { type: 'crimson', tau: true, stat: '+15% Fuerza de Habilidad' },
      { type: 'crimson', tau: true, stat: '+15% Duración de Habilidad' },
      { type: 'amber', tau: true, stat: '+37.5% Velocidad de lanzamiento' },
      { type: 'amber', tau: true, stat: '+37.5% Velocidad de lanzamiento' }
    ],
    focus: 'Zenurik (Pozo de energía constante) o Madurai',
    notes: 'Mantén siempre activos Escudo Fragmentador (3) para un 95% de reducción de daño por proyectiles y Galería de Tiro (2) para aturdir. Pillaje limpia defensas y recarga tu Shield Gate al instante mientras barres con Pacificadoras.'
  }]),

  F('Khora', [{
    name: 'Látigo Nuke & Domo Ladrón SP (eduiy16)',
    role: 'Farmeo de Botín & DPS Crítico Infinito',
    author: 'eduiy16',
    videoUrl: 'https://www.youtube.com/watch?v=AUZIYQHYaEXdWpX3bGZCBs8625giYrlGAmp9qtEWCP4_SDhaQWnqSswbH-MaWj5K23pEmnhDDCe6bsT70MyG2h8PzDPfyye26MBwFOxbzYalHbd7JV8tD1Q3tULQd1LJ-kaodJlA',
    aura: 'Brief Respite',
    exilus: 'Sure Footed',
    mods: ['Catalyzing Shields', 'Archon Continuity', 'Equilibrium', 'Primed Flow', 'Blind Rage', 'Overextended', 'Accumulating Whipclaw', 'Pilfering Strangledome'],
    arcanes: ['Arcane Aegis', 'Arcane Fury'],
    helminth: { ability: 'Dispensario (Protea) o Atrapamentes (Ensnare)', replaces: 'Habilidad 3 (Venari)' },
    shards: [
      { type: 'violet', tau: true, stat: '+37.5% Daño Crítico Melee (Duplicado con >500 Energía)' },
      { type: 'violet', tau: true, stat: '+37.5% Daño Crítico Melee' },
      { type: 'violet', tau: true, stat: '+37.5% Daño Crítico Melee' },
      { type: 'violet', tau: true, stat: '+37.5% Daño Crítico Melee' },
      { type: 'amber', tau: true, stat: '+37.5% Velocidad de casteo de Látigo' }
    ],
    focus: 'Naramon (Combo melee para Statstick con Magistar o Riven)',
    notes: 'El daño de Látigo Garra escala directamente con tu arma cuerpo a cuerpo (Statstick). Con 4 fragmentos violetas y combo x12, cada azote golpea en área por decenas de millones de daño mientras Domo duplicará recursos.'
  }]),

  F('Wisp', [{
    name: 'Reservorios & Brecha Nuke Inmortal (eduiy16)',
    role: 'Soporte Meta, DPS y Nuke vs 9999',
    author: 'eduiy16',
    videoUrl: 'https://www.youtube.com/watch?v=AUZIYQHmAH1OSVt5UJV3Gi971L4ckGJWvfHsFM3sPFfGNQbTdMNouwO3paPM7e8fjsXZkW5f2Qu4Rcz8mNzwohVsd2SyRZ2Rg20-OxPiqcMOhbROAHcLvn2n73ko2H-fIHgoSSHD',
    aura: 'Growing Power',
    exilus: 'Power Drift',
    mods: ['Primed Continuity', 'Primed Flow', 'Blind Rage', 'Transient Fortitude', 'Umbral Intensify', 'Archon Stretch', 'Adaptation', 'Overextended'],
    arcanes: ['Arcane Energize', 'Arcane Molt Augmented'],
    helminth: { ability: 'Rugido (Rhino) o Eclipse', replaces: 'Habilidad 4 (Sol Prominente)' },
    shards: [
      { type: 'crimson', tau: true, stat: '+15% Fuerza de Habilidad' },
      { type: 'crimson', tau: true, stat: '+15% Fuerza de Habilidad' },
      { type: 'crimson', tau: true, stat: '+15% Fuerza de Habilidad' },
      { type: 'amber', tau: true, stat: '+37.5% Velocidad de casteo' },
      { type: 'amber', tau: true, stat: '+37.5% Velocidad de casteo' }
    ],
    focus: 'Madurai (Fuerza pasiva de +40% tras cambiar de operador)',
    notes: 'Breach Surge (3) multiplica los proyectiles de chispa por el daño recibido; al sustituir la 4 por Rugido, las chispas se multiplican solas en un bucle devastador capaz de liquidar enemigos de nivel 9999.'
  }]),

  F('Revenant', [{
    name: 'Piel de Hipnosis 100% Inmortal (eduiy16)',
    role: 'Tanque Absoluto Level Cap & Solo SP',
    author: 'eduiy16',
    videoUrl: 'https://www.youtube.com/watch?v=AUZIYQFrfnEcZrSIxZlUNYTkkb9cr9rAVryRZl7itgjg26IRFxhzcK81WkDdMxSUV2R7jsol820EYSVmJJcnnm-jyh_RWGWB18PZl14UCdurYCw99mo8GZTsioVFmAR4Cou5bQ2j',
    aura: 'Corrosive Projection',
    exilus: 'Power Drift',
    mods: ['Primed Flow', 'Streamline', 'Blind Rage', 'Transient Fortitude', 'Umbral Intensify', 'Augur Secrets', 'Primed Continuity', 'Rolling Guard'],
    arcanes: ['Arcane Energize', 'Arcane Molt Augmented'],
    helminth: { ability: 'Rugido (Rhino) o Pillaje (Hildryn)', replaces: 'Habilidad 4 (Danza Macabra)' },
    shards: [
      { type: 'crimson', tau: true, stat: '+15% Fuerza de Habilidad' },
      { type: 'crimson', tau: true, stat: '+15% Fuerza de Habilidad' },
      { type: 'crimson', tau: true, stat: '+15% Fuerza de Habilidad' },
      { type: 'amber', tau: true, stat: '+37.5% Velocidad de casteo de Piel' },
      { type: 'amber', tau: true, stat: '+37.5% Velocidad de casteo' }
    ],
    focus: 'Madurai o Zenurik',
    notes: 'Piel de Hipnosis niega cualquier impacto independientemente del nivel del enemigo (nivel 9999 cap). Ninguna explosión ni ataque acólito puede reducir tu salud. Usa Cautivar (1) y Drenar (3) para oneshotear acólitos.'
  }]),

  F('Gauss', [{
    name: 'Línea Roja & Zona Térmica Nuke SP (eduiy16)',
    role: 'Velocidad extrema, Inmunidad y Nuke Masivo',
    author: 'eduiy16',
    videoUrl: 'https://www.youtube.com/watch?v=AUZIYQGUXfITZ9SwoVdzf_uTGGQ68uFcfaa_VBL8iUc-3_cqKeqLI-hueNRAYBPWo59LLduJkEEkSDgAxdvaFxwz3zs2DElIqjFzpZc_gDwRDisyA8GOOLmeCPKoW-Ze--fk',
    aura: 'Sprint Boost',
    exilus: 'Primed Sure Footed',
    mods: ['Primed Flow', 'Archon Vitality', 'Streamline', 'Primed Continuity', 'Stretch', 'Overextended', 'Augur Reach', 'Transient Fortitude'],
    arcanes: ['Arcane Energize', 'Arcane Aegis'],
    helminth: { ability: 'Nutrir (Grendel) o Municiones Energizadas', replaces: 'Habilidad 3 (opcional) o mantener Kit Completo' },
    shards: [
      { type: 'crimson', tau: true, stat: '+15% Duración de Habilidad' },
      { type: 'crimson', tau: true, stat: '+15% Duración de Habilidad' },
      { type: 'crimson', tau: true, stat: '+15% Duración de Habilidad' },
      { type: 'amber', tau: true, stat: '+37.5% Velocidad de casteo' },
      { type: 'amber', tau: true, stat: '+37.5% Velocidad de casteo' }
    ],
    focus: 'Madurai o Vazarin',
    notes: 'Thermal Sunder (Calor + Frío) al alcanzar 100% de batería en Redline provoca una detonación de Explosivo que despoja armaduras al 100%. Archon Vitality duplica los estados ígneos limpiando habitaciones en segundos.'
  }]),

  F('Protea', [{
    name: 'Torretas de Artillería & Escudos Infinitos (eduiy16)',
    role: 'DPS en Área, Inmortalidad & Batería Universal',
    author: 'eduiy16',
    videoUrl: 'https://www.youtube.com/watch?v=AUZIYQHmTvbNaO75IIA-JvVSER-T3SMCgIM2WmcBcG_Xvk5Of_QhlReGBLaTCpsUjBrBK6PAHy0-Fw6GezJ4w4XXnJXaUvqmBDTK2ZxcsVdGBIWqZ_2rCbANCcOqEXr_M40AFKuF',
    aura: 'Growing Power',
    exilus: 'Primed Sure Footed',
    mods: ['Primed Continuity', 'Primed Flow', 'Archon Vitality', 'Equilibrium', 'Blind Rage', 'Transient Fortitude', 'Stretch', 'Rolling Guard'],
    arcanes: ['Arcane Energize', 'Arcane Molt Augmented'],
    helminth: { ability: 'Tempestad Enjambrada (Tempest Barrage) o Rugido', replaces: 'Habilidad 4 (Ancla Temporal)' },
    shards: [
      { type: 'crimson', tau: true, stat: '+15% Duración de Habilidad (Prolonga torretas)' },
      { type: 'crimson', tau: true, stat: '+15% Duración de Habilidad' },
      { type: 'crimson', tau: true, stat: '+15% Fuerza de Habilidad' },
      { type: 'amber', tau: true, stat: '+37.5% Velocidad de casteo' },
      { type: 'amber', tau: true, stat: '+37.5% Velocidad de casteo' }
    ],
    focus: 'Madurai (+Fuerza y Velocidad)',
    notes: 'El Abanico de Granadas en modo escudo otorga sobreescudos y prolonga el Shield Gating a 3 segundos invulnerables. Las Torretas de Artillería multiplican su daño exponencialmente con cada impacto sucesivo.'
  }]),

  F('Volt', [{
    name: 'Descarga Nuke & Capacitancia SP (eduiy16)',
    role: 'Sobreguardia Eléctrica, DPS & Caza de Eidolons',
    author: 'eduiy16',
    videoUrl: 'https://www.youtube.com/@eduiy16',
    aura: 'Brief Respite',
    exilus: 'Primed Sure Footed',
    mods: ['Capacitance', 'Archon Stretch', 'Primed Continuity', 'Overextended', 'Umbral Intensify', 'Primed Flow', 'Streamline', 'Augur Reach'],
    arcanes: ['Arcane Energize', 'Arcane Aegis'],
    helminth: { ability: 'Dispensario (Protea) o Rugido (Rhino)', replaces: 'Habilidad 1 (Descarga de Choque)' },
    shards: [
      { type: 'crimson', tau: true, stat: '+15% Fuerza de Habilidad' },
      { type: 'crimson', tau: true, stat: '+15% Fuerza de Habilidad' },
      { type: 'amber', tau: true, stat: '+37.5% Velocidad de casteo' },
      { type: 'crimson', tau: true, stat: '+15% Duración de Habilidad' },
      { type: 'crimson', tau: true, stat: '+15% Duración de Habilidad' }
    ],
    focus: 'Madurai (Aumento radical de daño en Eidolons y SP)',
    notes: 'Capacitancia convierte el 3% del daño eléctrico de Descarga (4) en escudos y sobreescudos para todo el escuadrón. En Steel Path esto te mantiene constantemente con sobreescudos al tope sin poder morir.'
  }]),

  F('Rhino', [{
    name: 'Piel de Hierro & Sobreguardia Millonaria (eduiy16)',
    role: 'Tanque Inmortal SP & Multiplicador de Daño',
    author: 'eduiy16',
    videoUrl: 'https://www.youtube.com/watch?v=AUZIYQHDSovBRJ9JiCvkgzQAG9wRinBJhC8NGhjGltfg77qpdrmqaTIKMsH3p7vz-nzVK73HeA0l9jqSdklJCiTO_PkDfvhAmImu6z56uzZNReKL3KzyOZjDdEGtUJC0DNqG5MPv',
    aura: 'Steel Charge',
    exilus: 'Power Drift',
    mods: ['Ironclad Charge', 'Reinforcing Stomp', 'Umbral Fiber', 'Umbral Intensify', 'Blind Rage', 'Transient Fortitude', 'Primed Flow', 'Streamline'],
    arcanes: ['Arcane Tanker', 'Arcane Guardian'],
    helminth: { ability: 'Parasitic Armor o Nutrir (Grendel)', replaces: 'Habilidad 4 (Pisotón) o Habilidad 1' },
    shards: [
      { type: 'crimson', tau: true, stat: '+15% Fuerza de Habilidad' },
      { type: 'crimson', tau: true, stat: '+15% Fuerza de Habilidad' },
      { type: 'crimson', tau: true, stat: '+15% Fuerza de Habilidad' },
      { type: 'amber', tau: true, stat: '+37.5% Velocidad de casteo' },
      { type: 'amber', tau: true, stat: '+37.5% Velocidad de casteo' }
    ],
    focus: 'Madurai o Zenurik',
    notes: 'Embestida con Ironclad Charge a un grupo denso de enemigos multiplica tu armadura en un 1000%, luego activa Piel de Hierro (2) para amasar millones de sobreguardia invulnerable a cualquier daño o derribo.'
  }]),

  F('Nova', [{
    name: 'Molecular Prime Nuke & Control SP (eduiy16)',
    role: 'Ralentización o Aceleración de Misiones (Speed/Slow)',
    author: 'eduiy16',
    videoUrl: 'https://www.youtube.com/@eduiy16',
    aura: 'Corrosive Projection',
    exilus: 'Power Drift',
    mods: ['Molecular Fission', 'Narrow Minded', 'Primed Continuity', 'Primed Flow', 'Umbral Intensify', 'Streamline', 'Adaptation', 'Stretch'],
    arcanes: ['Arcane Energize', 'Arcane Guardian'],
    helminth: { ability: 'Penumbra (Gloom) o Rugido', replaces: 'Habilidad 3 (Agujero de Gusano)' },
    shards: [
      { type: 'crimson', tau: true, stat: '+15% Duración de Habilidad (Expansión de onda)' },
      { type: 'crimson', tau: true, stat: '+15% Duración de Habilidad' },
      { type: 'crimson', tau: true, stat: '+15% Duración de Habilidad' },
      { type: 'amber', tau: true, stat: '+37.5% Velocidad de casteo' },
      { type: 'amber', tau: true, stat: '+37.5% Velocidad de casteo' }
    ],
    focus: 'Zenurik o Madurai',
    notes: 'Molecular Fission recarga automáticamente las partículas de Estrella Nula (1) al eliminar enemigos imprimados, manteniéndote de forma continua con un 90% de reducción de daño a la salud.'
  }]),

  F('Octavia', [{
    name: 'Mazo & Resonador Inmortal SP (eduiy16)',
    role: 'Invisibilidad Permanente & Daño Escalar Infinito',
    author: 'eduiy16',
    videoUrl: 'https://www.youtube.com/watch?v=AUZIYQF2AeZxrYH5ZflLEOfQK6d2vKaWvuzZzo8nr0md1ZOYLdg2F4VpecdWqXCGg8vjfqE_6Sb-yrXYTFBGIuqy-y8uCpVZPqfkX1jdE7RGnC-PeAinBKXQful3VoCL1vlrC34=',
    aura: 'Growing Power',
    exilus: 'Cunning Drift',
    mods: ['Primed Continuity', 'Narrow Minded', 'Overextended', 'Stretch', 'Primed Flow', 'Streamline', 'Umbral Intensify', 'Rolling Guard'],
    arcanes: ['Arcane Energize', 'Arcane Avenger'],
    helminth: { ability: 'Pillaje (Hildryn) o Rugido', replaces: 'Habilidad 2 (Resonador, para fijar el Mazo)' },
    shards: [
      { type: 'crimson', tau: true, stat: '+15% Duración de Habilidad' },
      { type: 'crimson', tau: true, stat: '+15% Duración de Habilidad' },
      { type: 'crimson', tau: true, stat: '+15% Fuerza de Habilidad' },
      { type: 'amber', tau: true, stat: '+37.5% Velocidad de casteo' },
      { type: 'amber', tau: true, stat: '+37.5% Velocidad de casteo' }
    ],
    focus: 'Zenurik o Madurai',
    notes: 'Agáchate al compás de Metrónomo (3) para activar invisibilidad permanente. El daño de Mazo escala proporcionalmente con el daño que le disparan los propios enemigos, aniquilando salas de nivel 9999 pasivamente.'
  }]),

  F('Gyre', [{
    name: 'Rotor Catódico Nuke & Caminar Matando (eduiy16)',
    role: 'Descargas Eléctricas Críticas en Cadena SP',
    author: 'eduiy16',
    videoUrl: 'https://www.youtube.com/watch?v=AUZIYQH1EmO4cNHO-7vEhyCkHjh4RKq6vkDovolNDSakRx-mOqYnyrVjC-5GuPaPyefXsKwx95pcE_-TgntinimZ0i7ax8ymHpaM4NWg2_YVEw6AcqIR6in4__8grdYGV27VrhI=',
    aura: 'Brief Respite',
    exilus: 'Cunning Drift',
    mods: ['Cathode Current', 'Umbral Intensify', 'Archon Stretch', 'Primed Flow', 'Primed Continuity', 'Overextended', 'Rolling Guard', 'Blind Rage'],
    arcanes: ['Arcane Energize', 'Arcane Aegis'],
    helminth: { ability: 'Pillaje (Hildryn) o Nutrir (Grendel)', replaces: 'Habilidad 1 o 2 (Esferas)' },
    shards: [
      { type: 'crimson', tau: true, stat: '+15% Fuerza de Habilidad' },
      { type: 'crimson', tau: true, stat: '+15% Fuerza de Habilidad' },
      { type: 'crimson', tau: true, stat: '+15% Fuerza de Habilidad' },
      { type: 'amber', tau: true, stat: '+37.5% Velocidad de casteo' },
      { type: 'amber', tau: true, stat: '+37.5% Velocidad de casteo' }
    ],
    focus: 'Madurai o Vazarin',
    notes: 'Pillaje despoja el 100% de armaduras enemigas y recarga tu escudo. Al activar Rotor Giratorio (4) y Gracia Catódica (3) con el aumento Corriente Catódica, cada baja prolonga el efecto infinitamente desatando relámpagos críticos constantes.'
  }]),

  F('Baruuk', [{
    name: 'Viento Desértico Golpe Reactivo Level Cap (eduiy16)',
    role: '90% Reducción Daño, Evasión & Melee Brutal',
    author: 'eduiy16',
    videoUrl: 'https://www.youtube.com/watch?v=AUZIYQHufMBaKSnxts4-e3guLnt7Zy_VrJRtHa6aeO3Of0QZxEEDaqBpnXqcyJCrbdQxIvz3pka3HoK5FJe4Qhx1-2ftCOyXkfIhmvgQEaB96VViIbIpjl25RK2rHlUUMb9ZGRg=',
    aura: 'Steel Charge',
    exilus: 'Primed Sure Footed',
    mods: ['Reactive Storm', 'Umbral Intensify', 'Blind Rage', 'Transient Fortitude', 'Primed Flow', 'Adaptation', 'Fleeting Expertise', 'Rolling Guard'],
    arcanes: ['Arcane Strike', 'Arcane Fury'],
    helminth: { ability: 'Pillaje (Hildryn) o Rugido (Rhino)', replaces: 'Habilidad 1 (Eludir) o 2 (Sedantes)' },
    shards: [
      { type: 'violet', tau: true, stat: '+37.5% Daño Crítico Cuerpo a Cuerpo' },
      { type: 'violet', tau: true, stat: '+37.5% Daño Crítico Cuerpo a Cuerpo' },
      { type: 'crimson', tau: true, stat: '+15% Fuerza de Habilidad' },
      { type: 'crimson', tau: true, stat: '+15% Fuerza de Habilidad' },
      { type: 'amber', tau: true, stat: '+37.5% Velocidad de casteo' }
    ],
    focus: 'Naramon (Combo melee permanente)',
    notes: 'Tormenta Serena con Golpe Reactivo adapta las ondas de choque automáticamente al elemento al que el enemigo es más débil con +250% de probabilidad de estado, pulverizando salas completas en segundos.'
  }]),

  F('Xaku', [{
    name: 'Grasp of Lohk & Grieta Intemporal SP (eduiy16)',
    role: 'Desarme Automático, 100% Armor Strip & Daño Vacío',
    author: 'eduiy16',
    videoUrl: 'https://www.youtube.com/watch?v=AUZIYQHAHLUR6mAJWy3aRupPDEFjgxPOmsHeblIPpgQcoc_KmjvhFn3oAoVOrM_6jcJdzfNqdI7F5qBkh8qsR4dL4Lvhj0Lf_IRPBoiFH6iXWqprgz_7VlTFk72uJ7hQORzZH0o=',
    aura: 'Brief Respite',
    exilus: 'Cunning Drift',
    mods: ['Untime Rift', 'Overextended', 'Stretch', 'Augur Reach', 'Primed Continuity', 'Rolling Guard', 'Blind Rage', 'Primed Flow'],
    arcanes: ['Arcane Energize', 'Arcane Molt Augmented'],
    helminth: { ability: 'Penumbra (Gloom) o Nutrir (Grendel)', replaces: 'Habilidad 1 (Susurro de Xata)' },
    shards: [
      { type: 'crimson', tau: true, stat: '+15% Fuerza de Habilidad (200% para 100% Strip con La Mirada)' },
      { type: 'crimson', tau: true, stat: '+15% Duración de Habilidad' },
      { type: 'crimson', tau: true, stat: '+15% Duración de Habilidad' },
      { type: 'amber', tau: true, stat: '+37.5% Velocidad de casteo' },
      { type: 'amber', tau: true, stat: '+37.5% Velocidad de casteo' }
    ],
    focus: 'Madurai o Vazarin',
    notes: 'La Vasta Indómita (4) detiene la duración de tus habilidades mientras esté activa. Roba hasta 16 armas flotantes enemigas con la habilidad 2 que apuntan y disparan automáticamente escalando con el nivel del enemigo.'
  }]),

  F('Citrine', [{
    name: 'Gema Preservadora & Fractura Inmortal (eduiy16)',
    role: 'Tanque 90% RD, Orbes Infinitos y Críticos Rojos 300%',
    author: 'eduiy16',
    videoUrl: 'https://www.youtube.com/watch?v=AUZIYQEPonir58njSaOeuzOAWGHbFt0pDBQU74-PexxqEG_pyh7HKqwfyC1z-WjiVQQb1Ktj5q3uUTkCMmSrRq--Jeno-ytbkbfMgOoqQNE4yuAwhRGbN9-raxm32Xl5FiTPh48=',
    aura: 'Brief Respite',
    exilus: 'Primed Sure Footed',
    mods: ['Archon Vitality', 'Archon Stretch', 'Primed Flow', 'Equilibrium', 'Blind Rage', 'Transient Fortitude', 'Primed Continuity', 'Adaptation'],
    arcanes: ['Arcane Blessing', 'Arcane Energize'],
    helminth: { ability: 'Rugido (Rhino) o Pillaje (Hildryn)', replaces: 'Habilidad 4 (Cristalización) o Habilidad 1' },
    shards: [
      { type: 'crimson', tau: true, stat: '+15% Fuerza de Habilidad' },
      { type: 'crimson', tau: true, stat: '+15% Fuerza de Habilidad' },
      { type: 'crimson', tau: true, stat: '+15% Duración de Habilidad' },
      { type: 'amber', tau: true, stat: '+37.5% Velocidad de casteo' },
      { type: 'amber', tau: true, stat: '+37.5% Velocidad de casteo' }
    ],
    focus: 'Madurai o Zenurik',
    notes: 'Gema Preservadora otorga 90% de reducción de daño a todo el escuadrón. El cristal prismático aplica 5 estados simultáneos que activan Archon Stretch y provocan críticos masivos con orbes continuos.'
  }]),

  F('Dagath', [{
    name: 'Caballería de Rakhali & Rostro Tétrico SP (eduiy16)',
    role: 'Despojo Total de Defensas, Corte Masivo e Inmortalidad',
    author: 'eduiy16',
    videoUrl: 'https://www.youtube.com/watch?v=AUZIYQE_GEMWvWZW6bFmcThm6-JwdR-0yK7lcdeBgJc-APXj5cIQVaOuB4-KPRvKwqNCax2an-4e7LFKg602SqKbNL4hWiH30oxRjewRcG21uJgDojxqCdOSj5CWPhCjZ17H-e2e',
    aura: 'Brief Respite',
    exilus: 'Power Drift',
    mods: ['Primed Flow', 'Transient Fortitude', 'Umbral Intensify', 'Blind Rage', 'Stretch', 'Primed Continuity', 'Rolling Guard', 'Streamline'],
    arcanes: ['Arcane Energize', 'Arcane Molt Augmented'],
    helminth: { ability: 'Rugido (Rhino) o Penumbra (Gloom)', replaces: 'Habilidad 1 o Kit Original Completo' },
    shards: [
      { type: 'crimson', tau: true, stat: '+15% Fuerza de Habilidad' },
      { type: 'crimson', tau: true, stat: '+15% Fuerza de Habilidad' },
      { type: 'crimson', tau: true, stat: '+15% Fuerza de Habilidad' },
      { type: 'amber', tau: true, stat: '+37.5% Velocidad de casteo' },
      { type: 'amber', tau: true, stat: '+37.5% Velocidad de casteo' }
    ],
    focus: 'Madurai o Vazarin',
    notes: 'Rostro Tétrico otorga una segunda oportunidad de vida automática si recibes daño letal volviéndote incorpóreo. Caballería de Rakhali convoca corceles espectrales que eliminan al 100% las defensas y aplican sangrado demoledor.'
  }]),

  F('Frost', [{
    name: 'Avalancha Nuke, Sobreguardia & Crítico SP (eduiy16)',
    role: 'Sobreguardia Masiva, 100% Strip y Críticos Glaciales',
    author: 'eduiy16',
    videoUrl: 'https://www.youtube.com/watch?v=AUZIYQFfQJvB-S0lkYolq-vzB58NzN1pSwz92oc43etXtCMJkM0rSyeUvMMzHF1geIRJ4QPoOyFTMAY50vP_bOrUuSCdGBGAwtuP-j6-TbTe6rDZVZaSOYnXaOL9oynWVNPF0DqL',
    aura: 'Brief Respite',
    exilus: 'Power Drift',
    mods: ['Icy Avalanche', 'Biting Frost', 'Umbral Intensify', 'Overextended', 'Stretch', 'Primed Flow', 'Streamline', 'Rolling Guard'],
    arcanes: ['Arcane Energize', 'Arcane Guardian'],
    helminth: { ability: 'Nutrir (Grendel) o Penumbra', replaces: 'Habilidad 2 (Ola de Hielo)' },
    shards: [
      { type: 'crimson', tau: true, stat: '+15% Fuerza de Habilidad' },
      { type: 'crimson', tau: true, stat: '+15% Fuerza de Habilidad' },
      { type: 'crimson', tau: true, stat: '+15% Fuerza de Habilidad' },
      { type: 'amber', tau: true, stat: '+37.5% Velocidad de casteo de Avalancha' },
      { type: 'amber', tau: true, stat: '+37.5% Velocidad de casteo' }
    ],
    focus: 'Madurai o Zenurik',
    notes: 'Avalancha de Hielo otorga miles de sobreguardia al escuadrón por cada enemigo congelado. El aumento Biting Frost concede +200% de probabilidad crítica y +140% de daño crítico contra cualquier enemigo congelado.'
  }]),

  F('Mag', [{
    name: 'Magnetizar & Aplastar SP Inmortal (eduiy16)',
    role: 'Vórtices de Daño Infinito, Shield Gate & Strip',
    author: 'eduiy16',
    videoUrl: 'https://www.youtube.com/watch?v=AUZIYQHFshYoH7tT4O_CwxHSE4-MLd2n-tBMRa3hkEHXzUJ90wj9pOB_zw65huYAr8-hjeRqLa2xJUCaFAclHG_tqQ8e03IzumpQEYODajC6mUtBJZUH0YAgCu7P3MPpSVhzixs=',
    aura: 'Brief Respite',
    exilus: 'Primed Sure Footed',
    mods: ['Magnetized Discharge', 'Fracturing Crush', 'Primed Continuity', 'Stretch', 'Overextended', 'Primed Flow', 'Streamline', 'Rolling Guard'],
    arcanes: ['Arcane Energize', 'Arcane Aegis'],
    helminth: { ability: 'Brecha Cegadora (Breach Surge) o Nutrir', replaces: 'Habilidad 1 (Tirón)' },
    shards: [
      { type: 'crimson', tau: true, stat: '+15% Fuerza de Habilidad (Permite 100% Strip con Crush)' },
      { type: 'crimson', tau: true, stat: '+15% Duración de Habilidad' },
      { type: 'crimson', tau: true, stat: '+15% Duración de Habilidad' },
      { type: 'amber', tau: true, stat: '+37.5% Velocidad de casteo' },
      { type: 'amber', tau: true, stat: '+37.5% Velocidad de casteo' }
    ],
    focus: 'Madurai o Vazarin',
    notes: 'Crea una burbuja de Magnetizar sobre un objetivo y dispara armas de alta penetración (como Nataruk o Exergis). Los proyectiles giran miles de veces en la burbuja derritiendo hordas completas.'
  }]),

  F('Ember', [{
    name: 'Infierno Nuke & Armadura Inmolada (eduiy16)',
    role: 'Lluvia de Meteoros, Despojo Total y Reducción 90%',
    author: 'eduiy16',
    videoUrl: 'https://www.youtube.com/watch?v=AUZIYQHVL1eYhrT_n9HocjgufiAPzOe5RWIp9RcQNYZUP3CJRLdRNKrrha_k9z0LO7Krxbc1sDmL4zNl7OMf9GogB0MSZ3KnPBYSdL04e7utIDrBpvJEiondh2RqG4YyQ9ureREr',
    aura: 'Growing Power',
    exilus: 'Power Drift',
    mods: ['Healing Flame', 'Exothermic', 'Archon Vitality', 'Primed Flow', 'Blind Rage', 'Transient Fortitude', 'Stretch', 'Primed Continuity'],
    arcanes: ['Arcane Energize', 'Arcane Molt Augmented'],
    helminth: { ability: 'Nutrir (Grendel) o Penumbra', replaces: 'Habilidad 1 (Bola de Fuego)' },
    shards: [
      { type: 'crimson', tau: true, stat: '+15% Fuerza de Habilidad' },
      { type: 'crimson', tau: true, stat: '+15% Fuerza de Habilidad' },
      { type: 'topaz', tau: true, stat: '+Daño con armas secundarias por bajas de calor' },
      { type: 'amber', tau: true, stat: '+37.5% Velocidad de casteo' },
      { type: 'amber', tau: true, stat: '+37.5% Velocidad de casteo' }
    ],
    focus: 'Madurai o Zenurik',
    notes: 'Inmolación aporta 90% de reducción de daño pasivo. Onda Ígnea despoja 100% de armadura cuando el termómetro está al tope e Infierno desata cometas que combinan con Archon Vitality aplicando estados dobles de fuego.'
  }]),

  F('Nekros', [{
    name: 'Profanar & Sombras del Vacío Farmeo SP (eduiy16)',
    role: 'Botín Duplicado Permanente & Tanque Escuadrón 90%',
    author: 'eduiy16',
    videoUrl: 'https://www.youtube.com/watch?v=AUZIYQFIvAol1TM8h3LXR1YTZR16sV_64Ivc6XA4XDh-p6GxFaqmbhtemrjDFKBE2z6X6RvZwNuW93pkQA5KhBXn3D0vf6f_sXJooA1RdRKNRt-n8C1UYgDpFhvFKLkGflAwTbwH',
    aura: 'Brief Respite',
    exilus: 'Primed Sure Footed',
    mods: ['Despoil', 'Shield of Shadows', 'Adaptation', 'Health Conversion', 'Equilibrium', 'Stretch', 'Overextended', 'Primed Continuity'],
    arcanes: ['Arcane Pulse', 'Arcane Blessing'],
    helminth: { ability: 'Penumbra (Gloom) o Nutrir', replaces: 'Habilidad 1 (Golpe de Alma)' },
    shards: [
      { type: 'crimson', tau: true, stat: '+15% Fuerza de Habilidad (214% para 90% RD de Sombras)' },
      { type: 'crimson', tau: true, stat: '+15% Fuerza de Habilidad' },
      { type: 'amber', tau: true, stat: '+37.5% Velocidad de casteo de Sombras' },
      { type: 'amber', tau: true, stat: '+37.5% Velocidad de casteo' },
      { type: 'azure', tau: true, stat: '+225 Armadura Base' }
    ],
    focus: 'Vazarin o Zenurik',
    notes: 'Despoil consume salud en lugar de energía para profanar cuerpos caídos, activando Equilibrium para disponer de energía ilimitada. Shield of Shadows redirige hasta el 90% de todo el daño hacia tus clones fantasma.'
  }]),

  F('Titania', [{
    name: 'Navaja Alada Blitz SP & Speedrun (eduiy16)',
    role: 'Velocidad Supersónica, DPS Dex Pixia Inigualable',
    author: 'eduiy16',
    videoUrl: 'https://www.youtube.com/@eduiy16',
    aura: 'Aerodynamic',
    exilus: 'Aviator',
    mods: ['Razorwing Blitz', 'Primed Flow', 'Primed Continuity', 'Narrow Minded', 'Streamline', 'Fleeting Expertise', 'Blind Rage', 'Umbral Intensify'],
    arcanes: ['Arcane Velocity', 'Arcane Precision'],
    helminth: { ability: 'Disparo Térmico (Gauss) o Rugido', replaces: 'Habilidad 3 (Farol)' },
    shards: [
      { type: 'crimson', tau: true, stat: '+15% Fuerza de Habilidad' },
      { type: 'crimson', tau: true, stat: '+15% Fuerza de Habilidad' },
      { type: 'crimson', tau: true, stat: '+15% Duración de Habilidad' },
      { type: 'amber', tau: true, stat: '+37.5% Velocidad de casteo' },
      { type: 'azure', tau: true, stat: '+Max Energía inicial' }
    ],
    focus: 'Zenurik o Madurai',
    notes: 'En Razorwing eres un objetivo minúsculo con 50% de evasión pasiva. Las pistolas Dex Pixia con Arcane Velocity alcanzan una cadencia monstruosa que liquida acólitos y jefes en fracciones de segundo.'
  }]),

  F('Nezha', [{
    name: 'Velo Sagrado & Chakram Ardiente SP (eduiy16)',
    role: 'Inmunidad Total a Estados, Tanque & Debuff Multiplicativo',
    author: 'eduiy16',
    videoUrl: 'https://www.youtube.com/@eduiy16',
    aura: 'Corrosive Projection',
    exilus: 'Primed Sure Footed',
    mods: ['Reaping Chakram', 'Umbral Vitality', 'Umbral Fiber', 'Umbral Intensify', 'Adaptation', 'Primed Flow', 'Streamline', 'Transient Fortitude'],
    arcanes: ['Arcane Guardian', 'Arcane Blessing'],
    helminth: { ability: 'Rugido (Rhino) o Penumbra', replaces: 'Habilidad 1 (Fuego Caminante) o 4' },
    shards: [
      { type: 'crimson', tau: true, stat: '+15% Fuerza de Habilidad' },
      { type: 'crimson', tau: true, stat: '+15% Fuerza de Habilidad' },
      { type: 'crimson', tau: true, stat: '+15% Fuerza de Habilidad' },
      { type: 'amber', tau: true, stat: '+37.5% Velocidad de casteo' },
      { type: 'amber', tau: true, stat: '+37.5% Velocidad de casteo' }
    ],
    focus: 'Madurai o Zenurik',
    notes: 'Warding Halo absorbe 90% del daño y confiere inmunidad absoluta a derribos y efectos de estado. Chakram Ardiente con aumento hace que los enemigos reciban daño multiplicado y suelten lluvias de orbes de salud y energía.'
  }]),

  F('Wukong', [{
    name: 'Gemelo Celestial & Nube Nebulosa Inmortal (eduiy16)',
    role: 'Velocidad de Espionaje, Inmortalidad Pasiva & DPS Clon',
    author: 'eduiy16',
    videoUrl: 'https://www.youtube.com/@eduiy16',
    aura: 'Corrosive Projection',
    exilus: 'Primed Sure Footed',
    mods: ['Celestial Stomp', 'Primed Continuity', 'Narrow Minded', 'Adaptation', 'Primed Flow', 'Streamline', 'Umbral Vitality', 'Umbral Intensify'],
    arcanes: ['Arcane Guardian', 'Arcane Strike'],
    helminth: { ability: 'Rugido (Rhino) o Atrapamentes', replaces: 'Habilidad 4 (Vara Férrea)' },
    shards: [
      { type: 'crimson', tau: true, stat: '+15% Duración de Habilidad' },
      { type: 'crimson', tau: true, stat: '+15% Fuerza de Habilidad' },
      { type: 'amber', tau: true, stat: '+37.5% Velocidad de casteo' },
      { type: 'azure', tau: true, stat: '+225 Armadura' },
      { type: 'azure', tau: true, stat: '+225 Armadura' }
    ],
    focus: 'Naramon o Zenurik',
    notes: 'Nube Nebulosa (2) atraviesa trampas y láseres sin alertar alarmas, curando el 100% de tu salud y la del clon. El clon celestial usa tu arma secundaria o primaria con munición y precisión excepcionales.'
  }]),

  F('Harrow', [{
    name: 'Pacto Crítico & Penitencia Infinita (eduiy16)',
    role: 'Críticos Rojos a la Cabeza, Energía y Cadencia Masiva',
    author: 'eduiy16',
    videoUrl: 'https://www.youtube.com/@eduiy16',
    aura: 'Corrosive Projection',
    exilus: 'Primed Sure Footed',
    mods: ['Tribunal', 'Primed Flow', 'Streamline', 'Constitution', 'Blind Rage', 'Transient Fortitude', 'Umbral Intensify', 'Stretch'],
    arcanes: ['Arcane Energize', 'Arcane Avenger'],
    helminth: { ability: 'Pillaje (Hildryn) o Rugido', replaces: 'Habilidad 1 (Condena) o Habilidad 2' },
    shards: [
      { type: 'crimson', tau: true, stat: '+15% Duración de Habilidad' },
      { type: 'crimson', tau: true, stat: '+15% Duración de Habilidad' },
      { type: 'crimson', tau: true, stat: '+15% Fuerza de Habilidad' },
      { type: 'amber', tau: true, stat: '+37.5% Velocidad de casteo' },
      { type: 'amber', tau: true, stat: '+37.5% Velocidad de casteo' }
    ],
    focus: 'Madurai',
    notes: 'Pacto (4) otorga invulnerabilidad absoluta durante unos segundos acumulando daño para convertirlo en hasta un +200% de probabilidad crítica plana a la cabeza. Penitencia (2) multiplica la cadencia y recarga de tus armas.'
  }]),

  F('Nidus', [{
    name: 'Mutación Parasitaria Inmortal (eduiy16)',
    role: 'Inmortalidad Sin Muertes & Agrupamiento de Hordas',
    author: 'eduiy16',
    videoUrl: 'https://www.youtube.com/@eduiy16',
    aura: 'Steel Charge',
    exilus: 'Power Drift',
    mods: ['Abundant Mutation', 'Umbral Vitality', 'Umbral Fiber', 'Umbral Intensify', 'Adaptation', 'Stretch', 'Overextended', 'Blind Rage'],
    arcanes: ['Arcane Guardian', 'Arcane Grace'],
    helminth: { ability: 'Rugido (Rhino) o Penumbra', replaces: 'Habilidad 4 (Brebaje)' },
    shards: [
      { type: 'crimson', tau: true, stat: '+15% Fuerza de Habilidad' },
      { type: 'crimson', tau: true, stat: '+15% Fuerza de Habilidad' },
      { type: 'amber', tau: true, stat: '+37.5% Velocidad de casteo' },
      { type: 'azure', tau: true, stat: '+225 Armadura' },
      { type: 'azure', tau: true, stat: '+225 Armadura' }
    ],
    focus: 'Vazarin o Naramon',
    notes: 'Enlace Parasitario (3) conectado a un enemigo desvía el 90% de todo el daño recibido y te hace inmune a derribos. Con Larva (2) agrupas salas completas para ganar 100 cargas de mutación y revivir sin costo de vidas.'
  }]),

  F('Gara', [{
    name: 'Tormenta de Astillas & Vitrificación (eduiy16)',
    role: '90% Reducción Daño Aliado, Protección y DPS Masivo',
    author: 'eduiy16',
    videoUrl: 'https://www.youtube.com/@eduiy16',
    aura: 'Corrosive Projection',
    exilus: 'Power Drift',
    mods: ['Umbral Intensify', 'Umbral Fiber', 'Umbral Vitality', 'Streamline', 'Primed Continuity', 'Primed Flow', 'Stretch', 'Adaptation'],
    arcanes: ['Arcane Energize', 'Arcane Guardian'],
    helminth: { ability: 'Dispensario (Protea) o Eclipse', replaces: 'Habilidad 3 (Espejos)' },
    shards: [
      { type: 'crimson', tau: true, stat: '+15% Duración de Habilidad' },
      { type: 'crimson', tau: true, stat: '+15% Duración de Habilidad' },
      { type: 'crimson', tau: true, stat: '+15% Fuerza de Habilidad' },
      { type: 'amber', tau: true, stat: '+37.5% Velocidad de casteo' },
      { type: 'amber', tau: true, stat: '+37.5% Velocidad de casteo' }
    ],
    focus: 'Naramon (Combo para el Statstick de Shattered Lash)',
    notes: 'Rompe Vitrificación Masiva (4) desde afuera usando Látigo Destrozador (1) para sumar el daño de la barrera a Tormenta de Astillas (2). El daño escala sin límite alguno, matando enemigos solo con caminar cerca de ellos.'
  }]),

  F('Styanax', [{
    name: 'Lanzas de Axia & Sobreguardia Escuadrón (eduiy16)',
    role: 'Sobreguardia Masiva a Todo el Equipo & Energía Infinita',
    author: 'eduiy16',
    videoUrl: 'https://www.youtube.com/watch?v=AUZIYQHo6ACcqXgRgxAY9kroc7o2fswX_mWxQ5QjaRanmfwwhWEIiIUlBw7A4bF39f25OhH0qD035t1ZoYGkQOQyI45hQWWwaWon7mjzNKGmIMa1276sLVfbgIERXVfI98hgHFc5',
    aura: 'Brief Respite',
    exilus: 'Primed Sure Footed',
    mods: ['Intrepid Stand', 'Primed Continuity', 'Primed Flow', 'Blind Rage', 'Transient Fortitude', 'Umbral Intensify', 'Streamline', 'Stretch'],
    arcanes: ['Arcane Energize', 'Arcane Molt Augmented'],
    helminth: { ability: 'Condena (Harrow) o Nutrir (Grendel)', replaces: 'Habilidad 1 (Lanza de Axia)' },
    shards: [
      { type: 'crimson', tau: true, stat: '+15% Fuerza de Habilidad' },
      { type: 'crimson', tau: true, stat: '+15% Fuerza de Habilidad' },
      { type: 'crimson', tau: true, stat: '+15% Fuerza de Habilidad' },
      { type: 'amber', tau: true, stat: '+37.5% Velocidad de casteo' },
      { type: 'amber', tau: true, stat: '+37.5% Velocidad de casteo' }
    ],
    focus: 'Madurai',
    notes: 'Ataque Final (4) con el aumento Intrepid Stand genera sobreguardia masiva para ti y todos tus aliados con cada impacto, bloqueando daño y efectos de estado mientras Punto de Reagrupamiento regenera energía continua.'
  }]),

  F('Mirage', [{
    name: 'Prisma Protector Walking Simulator (eduiy16)',
    role: 'Limpieza Pasiva Caminando & Multiplicador de Daño 500%',
    author: 'eduiy16',
    videoUrl: 'https://www.youtube.com/watch?v=AUZIYQHPi9AEAwnAd9xKE-AUEAlNZHhqYygpURxANKvr4AlUwfHhMaaEtmfws-MX5SZOXopjma9AjBkeaT1Kehh5CnbcEo8ItX7qxd0sCMB5bI6vFIszjZ0KQQ9E1posyuZBuLDc',
    aura: 'Growing Power',
    exilus: 'Primed Sure Footed',
    mods: ['Prism Guard', 'Primed Continuity', 'Narrow Minded', 'Blind Rage', 'Transient Fortitude', 'Umbral Intensify', 'Primed Flow', 'Stretch'],
    arcanes: ['Arcane Energize', 'Arcane Avenger'],
    helminth: { ability: 'Dispensario (Protea) o Pillaje (Hildryn)', replaces: 'Habilidad 2 (Juego de Manos)' },
    shards: [
      { type: 'crimson', tau: true, stat: '+15% Duración de Habilidad' },
      { type: 'crimson', tau: true, stat: '+15% Duración de Habilidad' },
      { type: 'crimson', tau: true, stat: '+15% Fuerza de Habilidad' },
      { type: 'amber', tau: true, stat: '+37.5% Velocidad de casteo' },
      { type: 'amber', tau: true, stat: '+37.5% Velocidad de casteo' }
    ],
    focus: 'Zenurik o Madurai',
    notes: 'Prism Guard fija el láser de Prisma sobre tu cabeza mientras te desplazas por el mapa, pulverizando oleadas enemigas enteras sin necesidad de apuntar. Eclipse y Salón de Espejos multiplican tu DPS x5.'
  }]),

  F('Inaros', [{
    name: 'Tanque Absoluto Rework 100% Inmortal (eduiy16)',
    role: 'Salud Masiva, Remolinos de Escarabajo & Cero Shield Gate',
    author: 'eduiy16',
    videoUrl: 'https://www.youtube.com/watch?v=AUZIYQG5_nlK0z0NzIu3YEHL0BWvvUIz2YkWrkGW9xlIh5IUqZTWPXTwFU9NgJPD5_bp5ekU1bK5ktNqJWlOTksSOAoQ7xaeCgE_7Db3RXPEaN0lpmwHL8lLibXtvlvIUdzc90Q=',
    aura: 'Steel Charge',
    exilus: 'Power Drift',
    mods: ['Umbral Vitality', 'Umbral Fiber', 'Umbral Intensify', 'Adaptation', 'Primed Flow', 'Hunter Adrenaline', 'Gladiator Resolve', 'Gladiator Aegis'],
    arcanes: ['Arcane Grace', 'Arcane Guardian'],
    helminth: { ability: 'Gloom (Sevagoth) o Rugido', replaces: 'Habilidad 3 (Tormenta de Arena)' },
    shards: [
      { type: 'azure', tau: true, stat: '+225 Armadura Base' },
      { type: 'azure', tau: true, stat: '+225 Armadura Base' },
      { type: 'azure', tau: true, stat: '+300 Salud Máxima' },
      { type: 'azure', tau: true, stat: '+300 Salud Máxima' },
      { type: 'crimson', tau: true, stat: '+15% Fuerza de Habilidad' }
    ],
    focus: 'Vazarin o Naramon',
    notes: 'Supera los 8.000 puntos de salud con armadura extrema combinando Armadura de Escarabajos y Enjambre. Arcane Grace y Hunter Adrenaline proporcionan curación continua y energía infinita cada vez que recibes disparos.'
  }]),

  F('Voruna', [{
    name: 'Resistencia de Ulfrun & Críticos Voraces SP (eduiy16)',
    role: 'Invisibilidad, Cargas de Estado & One-Shot a Acólitos',
    author: 'eduiy16',
    videoUrl: 'https://www.youtube.com/watch?v=AUZIYQGnwN4pw8hO-yncitcuw3DpmM0WMkCmSK5qaLXzd_GCpQQ7t1x9PGefwSGykYx-Mws_uD4HbFsSbwfSL1QkK7MmAjAsEsO7CBINw-P0w87vnCjAqlp19rwiZCTdgtKjPUHz',
    aura: 'Brief Respite',
    exilus: 'Primed Sure Footed',
    mods: ["Ulfrun's Endurance", 'Primed Continuity', 'Primed Flow', 'Blind Rage', 'Transient Fortitude', 'Umbral Intensify', 'Stretch', 'Equilibrium'],
    arcanes: ['Arcane Strike', 'Arcane Fury'],
    helminth: { ability: 'Rugido (Rhino) o Eclipse', replaces: 'Habilidad 4 o Habilidad 3' },
    shards: [
      { type: 'violet', tau: true, stat: '+37.5% Daño Crítico Cuerpo a Cuerpo' },
      { type: 'violet', tau: true, stat: '+37.5% Daño Crítico Cuerpo a Cuerpo' },
      { type: 'crimson', tau: true, stat: '+15% Fuerza de Habilidad' },
      { type: 'crimson', tau: true, stat: '+15% Fuerza de Habilidad' },
      { type: 'amber', tau: true, stat: '+37.5% Velocidad de casteo' }
    ],
    focus: 'Naramon',
    notes: 'Usa Colmillo de Fangs (2) para aplicar 5 efectos de estado aleatorios con 10 acumulaciones cada uno; luego activa Descenso de Ulfrun para infligir críticos exponenciales que rebotan en toda la sala con el aumento.'
  }]),

  F('Sevagoth', [{
    name: 'Siembra Nuke & Sombra Inmortal SP (eduiy16)',
    role: 'Explosión Porcentual de Salud, Ralentización & Garras SP',
    author: 'eduiy16',
    videoUrl: 'https://www.youtube.com/watch?v=AUZIYQE3ezGQohzgeR8oq4NPfprDjXmDxMjIpxJMVJ1vG70WGpMSQdrp4GLI2TREeb3uiwBOcmUeEjV7mQwEYbYGfBreZiCdpQNuGOmAU3mcA2lK4sp7wjFeHyUky0AsooBYjyIz',
    aura: 'Brief Respite',
    exilus: 'Power Drift',
    mods: ['Shadow Haze', 'Primed Flow', 'Primed Continuity', 'Blind Rage', 'Transient Fortitude', 'Umbral Intensify', 'Overextended', 'Stretch'],
    arcanes: ['Arcane Energize', 'Arcane Molt Augmented'],
    helminth: { ability: 'Nutrir (Grendel) o Rugido', replaces: 'Habilidad 2 (Sembrar, en variantes de armas) o mantener kit completo' },
    shards: [
      { type: 'crimson', tau: true, stat: '+15% Fuerza de Habilidad' },
      { type: 'crimson', tau: true, stat: '+15% Fuerza de Habilidad' },
      { type: 'amber', tau: true, stat: '+37.5% Velocidad de casteo' },
      { type: 'amber', tau: true, stat: '+37.5% Velocidad de casteo' },
      { type: 'violet', tau: true, stat: '+37.5% Daño Crítico Melee (para la Sombra)' }
    ],
    focus: 'Madurai o Vazarin',
    notes: 'Penumbra (3) ralentiza a los enemigos hasta un 95% y otorga robo de vida continuo. El combo Sembrar (2) + Cosechar (1) con el aumento Shadow Haze genera detonaciones en cadena con críticos rojos garantizados.'
  }])
];

export const WEAPON_BUILDS = [
  { name: 'Cedo Prime', slot: 'Primary', role: 'Disparo secundario cebador + Escopeta', exilus: 'Shotgun Ammo Mutation', mods: ['Galvanized Hell', 'Galvanized Savvy', 'Point Blank', "Hell's Chamber", 'Toxic Barrage', 'Frigid Blast', 'Scattering Inferno', 'Shotgun Elementalist'], arcanes: ['Primary Merciless'], notes: 'Lanza el disco secundario para aplicar todos los estados elementales en área; el disparo primario inflige daño multiplicado por cada estado activo.' },
  { name: 'Torid', slot: 'Primary', role: 'Rayo Incarnon masivo (Meta SP)', exilus: 'Vigilante Supplies', mods: ['Galvanized Chamber', 'Serration', 'Vital Sense', 'Point Strike', 'Hunter Munitions', 'Infected Clip', 'Stormbringer', 'Rifle Elementalist'], arcanes: ['Primary Merciless'], notes: 'Carga la barra Incarnon en el cuerpo de los enemigos en un instante y se transforma en un rayo continuo que encadena salas completas.' },
  { name: 'Burston Prime', slot: 'Primary', role: 'Ráfaga Incarnon de crítico', exilus: 'Vigilante Supplies', mods: ['Galvanized Chamber', 'Serration', 'Point Strike', 'Vital Sense', 'Hunter Munitions', 'Hellfire', 'Stormbringer', 'Vigilante Armaments'], arcanes: ['Primary Merciless', 'Primary Deadhead'], notes: 'Modo Incarnon ametralladora con velocidad de proyectil altísima y cortes garantizados con Hunter Munitions.' },
  { name: 'Kuva Bramma', slot: 'Primary', role: 'Arco explosivo de área', exilus: 'Vigilante Supplies', mods: ['Serration', 'Split Chamber', 'Point Strike', 'Vital Sense', 'Hellfire', 'Infected Clip', 'Stormbringer', 'Hunter Munitions'], arcanes: ['Primary Merciless'], notes: 'Flechas de racimo para barrido masivo de pasillos en farmeo rápido.' },
  { name: 'Tenet Arca Plasmor', slot: 'Primary', role: 'Onda expansiva de radiación', exilus: 'Fatal Acceleration', mods: ['Galvanized Hell', 'Galvanized Savvy', 'Point Blank', 'Blaze', 'Seeking Fury', 'Toxic Barrage', 'Frigid Blast', 'Shotgun Elementalist'], arcanes: ['Primary Merciless'], notes: 'Disparo de plasma ancho con rebote que atraviesa grupos de enemigos densos.' },
  { name: 'Soma Prime', slot: 'Primary', role: 'Ametralladora Incarnon', exilus: 'Vigilante Supplies', mods: ['Serration', 'Split Chamber', 'Vital Sense', 'Point Strike', 'Hunter Munitions', 'Stormbringer', 'Infected Clip', 'Rifle Elementalist'], arcanes: ['Primary Merciless', 'Arcane Avenger'], notes: 'Aprovecha la evolución Incarnon que eleva la probabilidad crítica base de la Soma Prime.' },
  { name: 'Laetum', slot: 'Secondary', role: 'Pistola ametralladora Incarnon', exilus: 'Ruinous Extension', mods: ['Galvanized Diffusion', 'Hornet Strike', 'Pistol Gambit', 'Lethal Torrent', 'Heated Charge', 'Infected Clip', 'Pistol Elementalist', 'Stormbringer'], arcanes: ['Secondary Merciless'], notes: 'Disparos a la cabeza activan el modo ametralladora explosiva. El daño escala brutalmente.' },
  { name: 'Dual Toxocyst', slot: 'Secondary', role: 'Pistolas duales Incarnon', exilus: 'Ruinous Extension', mods: ['Galvanized Diffusion', 'Hornet Strike', 'Lethal Torrent', 'Pistol Gambit', 'Infected Clip', 'Stormbringer', 'Heated Charge', 'Pistol Elementalist'], arcanes: ['Secondary Merciless'], notes: 'Un disparo a la cabeza activa cadencia desmedida y proyectiles que rebotan entre enemigos.' },
  { name: 'Kuva Nukor', slot: 'Secondary', role: 'Rayo cebador de estado (Primer)', exilus: 'Ruinous Extension', mods: ['Galvanized Diffusion', 'Hornet Strike', 'Lethal Torrent', 'Hellfire', 'Infected Clip', 'Stormbringer', 'Pistol Gambit', 'Pistol Elementalist'], arcanes: ['Secondary Merciless'], notes: 'El mejor cebador secundario del juego. Aplica Microondas y 4+ estados para Condition Overload.' },
  { name: 'Glaive Prime', slot: 'Melee', role: 'Explosión pesada de corte forzado', stance: 'Gleaming Talon', mods: ['Killing Blow', 'Corrupt Charge', 'Organ Shatter', 'Sacrificial Steel', 'Volatile Quick Return', 'Pressure Point', 'Melee Elementalist', 'Gladiator Might'], arcanes: ['Melee Duplicate', 'Arcane Strike'], notes: 'Lanza la guja y detónala en el aire con el botón de ataque pesado para infligir millones de daño cortante puro en área.' },
  { name: 'Kronen Prime', slot: 'Melee', role: 'Tonfas de combo rápido', stance: 'Sovereign Outcast', mods: ['Condition Overload', 'Blood Rush', 'Weeping Wounds', 'Organ Shatter', 'Berserker Fury', 'Carnis Mandible', 'Melee Elementalist', 'Drifting Contact'], arcanes: ['Melee Duplicate', 'Arcane Strike'], notes: 'Postura de Tonfas con cortes garantizados y escalamiento al multiplicador de combo 12x.' },
  { name: 'Nikana Prime', slot: 'Melee', role: 'Katana tradicional de crítico/estado', stance: 'Blind Justice', mods: ['Condition Overload', 'Blood Rush', 'Weeping Wounds', 'Organ Shatter', 'Berserker Fury', 'Pressure Point', 'Melee Elementalist', 'Drifting Contact'], arcanes: ['Arcane Strike'], notes: 'Excelente velocidad y daño slash puro con la postura Tranquil Cleave o Blind Justice.' },
];

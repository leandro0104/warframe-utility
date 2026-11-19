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
      { type: 'crimson', tau: true, stat: '+15% Fuerza de Habilidad' },
      { type: 'amber', tau: true, stat: '+37.5% Velocidad de lanzamiento' },
      { type: 'amber', tau: true, stat: '+37.5% Velocidad de lanzamiento' },
      { type: 'topaz', tau: false, stat: '+Regeneración de Sobreguardia con daño ígneo' }
    ],
    focus: 'Madurai (+Fuerza y Velocidad de casteo al instante)',
    notes: 'Ciclo 2-2-4 para conceder decenas de miles de Sobreguardia a todo el escuadrón (inmunidad total a estados y derribos). Luego usa 3-3-4 (Tragedia) para detonar todos los cortes y DoTs acumulados aniquilando hordas enteras al instante.',
    loadout: [
      {
        name: 'Noctua (Grimorio Exaltado)',
        type: 'Tomo Exaltado de Sabiduría',
        icon: '📖',
        slot: 'Secondary',
        exilus: 'Gunslinger',
        mods: ['Galvanized Diffusion', 'Lethal Torrent', 'Jahu Canticle', 'Vome Invocation', 'Primed Pistol Gambit', 'Primed Target Cracker', 'Convulsion', 'Pistol Pestilence'],
        arcanes: ['Secondary Fortifier', 'Secondary Outburst'],
        elements: 'Corrosivo + Proyectiles Perforantes de Tomo',
        notes: 'Noctua puede equipar mods exclusivos de Tomo: Invocación Vome otorga hasta +60% de Fuerza de Habilidad acumulativa pasiva para Dante al disparar, y Cántico Jahu despoja el 5% de armadura enemiga por segundo de forma pasiva.'
      }
    ]
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
    notes: 'Mantén siempre activos Escudo Fragmentador (3) para un 95% de reducción de daño por proyectiles y Galería de Tiro (2) para aturdir. Pillaje limpia defensas y recarga tu Shield Gate al instante mientras barres con Pacificadoras.',
    loadout: [
      {
        name: 'Reguladoras Prime (Regulators)',
        type: 'Pistolas Exaltadas de Pacificador',
        icon: '🔫',
        slot: 'Secondary',
        exilus: 'Lethal Momentum',
        mods: ['Galvanized Diffusion', 'Galvanized Shot', 'Lethal Torrent', 'Primed Target Cracker', 'Primed Pistol Gambit', 'Primed Heated Charge', 'Convulsion', 'Pistol Pestilence'],
        arcanes: ['Secondary Fortifier', 'Secondary Outburst'],
        elements: 'Corrosivo + Fuego (Anti-Armaduras & DoT)',
        notes: 'La cadencia de fuego se incrementa por cada disparo continuado de Pacificador. Galvanized Diffusion y Shot multiplican el daño exponencialmente. Secondary Fortifier roba Sobreguardia directamente de unidades Eximus con cada impacto.'
      }
    ]
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
    notes: 'El daño de Látigo Garra escala directamente con tu arma cuerpo a cuerpo (Statstick). Con 4 fragmentos violetas y combo x12, cada azote golpea en área por decenas de millones de daño mientras Domo duplicará recursos.',
    loadout: [
      {
        name: 'Látigo Garra (Whipclaw)',
        type: 'Stat-stick Melee (Magistar Incarnon / Ceramic Dagger)',
        icon: '💥',
        slot: 'Melee',
        stance: 'Crushing Ruin',
        exilus: 'Melee Elementalist',
        mods: ['Blood Rush', 'Weeping Wounds', 'Organ Shatter', 'Gladiator Might', 'Primed Fever Strike', 'North Wind', 'Sacrificial Steel', 'Primed Pressure Point'],
        arcanes: ['Melee Crescendo', 'Melee Exposure'],
        elements: 'Viral (Frío + Toxina) + Daño Crítico Puro de Statstick',
        notes: 'Látigo Garra hereda el combo x12, multiplicador crítico y daño base de tu melee. Con Magistar Incarnon obtienes +100% de daño crítico base y probabilidad crítica abrumadora para alcanzar críticos rojos de cientos de millones por azote.'
      },
      {
        name: 'Venari Prime',
        type: 'Compañero Kavat Exaltado',
        icon: '🐱',
        slot: 'Companion',
        aura: 'Venari Bodyguard',
        exilus: 'Primed Animal Instinct',
        mods: ['Fetch', 'Tenacious Bond', 'Reinforced Bond', 'Bite', 'Maul', 'Link Vitality', 'Link Armor', 'Pack Leader'],
        arcanes: [],
        notes: 'Mordisco (Bite) supera el 50% de probabilidad crítica en Venari, lo que activa pasivamente Vínculo Tenaz (Tenacious Bond) otorgando un multiplicador final de +1.2x de daño crítico permanente a Khora y a su látigo. Además, Venari Bodyguard se sacrifica para revivir a Khora si cae en combate.'
      },
      {
        name: 'Garras de Venari',
        type: 'Garras de Bestia Exaltadas',
        icon: '🐾',
        slot: 'Melee',
        stance: 'Sharpened Claws',
        exilus: '',
        mods: ['Blood Rush', 'Condition Overload', 'Organ Shatter', 'Weeping Wounds', 'Gladiator Might', 'Carnis Mandible', 'Virulent Scourge', 'Vicious Frost'],
        arcanes: [],
        elements: 'Viral + Cortante (Trituración de Armadura 100%)',
        notes: 'Garras Afiladas (Sharpened Claws) arranca el 100% de la armadura enemiga con cada zarpazo de Venari, facilitando la eliminación instantánea de acólitos y enemigos Level Cap en Camino de Acero.'
      }
    ]
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
    notes: 'Tormenta Serena con Golpe Reactivo adapta las ondas de choque automáticamente al elemento al que el enemigo es más débil con +250% de probabilidad de estado, pulverizando salas completas en segundos.',
    loadout: [
      {
        name: 'Viento Desértico Prime (Desert Wind)',
        type: 'Puños Exaltados de Tormenta Serena',
        icon: '👊',
        slot: 'Melee',
        stance: '',
        exilus: 'Reactive Storm',
        mods: ['Sacrificial Steel', 'Blood Rush', 'Organ Shatter', 'Gladiator Might', 'Primed Fever Strike', 'Shocking Touch', 'Condition Overload', 'Gladiator Rush'],
        arcanes: ['Melee Influence', 'Melee Exposure'],
        elements: 'Daño Adaptativo (Tormenta Reactiva + Corrosivo)',
        notes: 'Tormenta Reactiva (Reactive Storm) altera el tipo de daño automáticamente al tipo de elemento al que los enemigos son más débiles y suma +250% de probabilidad de estado. Las ondas de choque atraviesan columnas y paredes golpeando en toda la sala.'
      }
    ]
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
    notes: 'En Razorwing eres un objetivo minúsculo con 50% de evasión pasiva. Las pistolas Dex Pixia con Arcane Velocity alcanzan una cadencia monstruosa que liquida acólitos y jefes en fracciones de segundo.',
    loadout: [
      {
        name: 'Dex Pixia Prime',
        type: 'Pistolas Dobles Exaltadas',
        icon: '🔫',
        slot: 'Secondary',
        exilus: 'Lethal Momentum',
        mods: ['Galvanized Diffusion', 'Galvanized Shot', 'Lethal Torrent', 'Primed Target Cracker', 'Primed Pistol Gambit', 'Pistol Pestilence', 'Frostbite', 'Primed Heated Charge'],
        arcanes: ['Secondary Encumber', 'Secondary Fortifier'],
        elements: 'Viral + Fuego (30+ disparos/segundo)',
        notes: 'Dispara a más de 30 proyectiles por segundo con Alas de Navaja y Razorwing Blitz activos. Secondary Encumber satura con todos los estados del juego activando Galvanized Shot para aniquilar acólitos y jefes en milisegundos.'
      },
      {
        name: 'Diwata Prime',
        type: 'Espada Ligera Exaltada',
        icon: '🗡️',
        slot: 'Melee',
        stance: '',
        exilus: '',
        mods: ['Blood Rush', 'Organ Shatter', 'Gladiator Might', 'Condition Overload', 'Weeping Wounds', 'Primed Fever Strike', 'Shocking Touch', 'Carnis Mandible'],
        arcanes: [],
        notes: 'Equipada con mods del conjunto Gladiador para transferir probabilidad crítica pasiva a Dex Pixia y realizar remates aéreos si es necesario.'
      }
    ]
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
    notes: 'Nube Nebulosa (2) atraviesa trampas y láseres sin alertar alarmas, curando el 100% de tu salud y la del clon. El clon celestial usa tu arma secundaria o primaria con munición y precisión excepcionales.',
    loadout: [
      {
        name: 'Vara de Hierro Prime (Iron Staff)',
        type: 'Báculo Exaltado de Furia Primitiva',
        icon: '🦯',
        slot: 'Melee',
        stance: 'Crushing Ruin',
        exilus: 'Primal Rage',
        mods: ['Blood Rush', 'Weeping Wounds', 'Organ Shatter', 'Condition Overload', 'Gladiator Might', 'Primed Reach', 'Primed Fever Strike', 'North Wind'],
        arcanes: ['Melee Influence', 'Melee Exposure'],
        elements: 'Viral + Impacto + Cortante',
        notes: 'Ira Primitiva (Primal Rage) acumula hasta +150% de probabilidad crítica plana por bajas. Sumado a Primed Reach, la vara barre áreas enormes con críticos rojos constantes.'
      }
    ]
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
    notes: 'Rompe Vitrificación Masiva (4) desde afuera usando Látigo Destrozador (1) para sumar el daño de la barrera a Tormenta de Astillas (2). El daño escala sin límite alguno, matando enemigos solo con caminar cerca de ellos.',
    loadout: [
      {
        name: 'Látigo Fragmentado (Shattered Lash / Stat-Stick Magistar)',
        type: 'Stat-stick Melee para Romper Vitrificación',
        icon: '🗡️',
        slot: 'Melee',
        stance: 'Crushing Ruin',
        exilus: 'Melee Elementalist',
        mods: ['Primed Pressure Point', 'Blood Rush', 'Organ Shatter', 'Primed Fever Strike', 'Shocking Touch', 'Molten Impact', 'Gladiator Might', 'Spoiled Strike'],
        arcanes: ['Melee Exposure', 'Melee Crescendo'],
        elements: 'Radiación + Viral / Daño Melee Plano',
        notes: 'Látigo Fragmentado traslada todo el daño físico y elemental directamente a la explosión del muro vitrificado, inyectando cientos de miles de puntos de daño acumulativo a Tormenta de Astillas.'
      }
    ]
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
      { type: 'violet', tau: true, stat: '+37.5% Daño Crítico Melee' },
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
    notes: 'Penumbra (3) ralentiza a los enemigos hasta un 95% y otorga robo de vida continuo. El combo Sembrar (2) + Cosechar (1) con el aumento Shadow Haze genera detonaciones en cadena con críticos rojos garantizados.',
    loadout: [
      {
        name: 'Sombra de Sevagoth Prime (Sevagoth\'s Shadow)',
        type: 'Forma Exaltada Espectral',
        icon: '👻',
        slot: 'Warframe',
        aura: 'Steel Charge',
        exilus: 'Power Drift',
        mods: ['Shadow Haze', 'Primed Flow', 'Transient Fortitude', 'Overextended', 'Streamline', 'Stretch', 'Rolling Guard', 'Umbral Intensify'],
        arcanes: ['Arcane Strike', 'Arcane Reaper'],
        notes: 'La Sombra se convoca al llenar la lápida de almas. Usa Consumir para agrupar hordas completas en un solo punto y activa Niebla de la Sombra para otorgar hasta +500% de probabilidad crítica Melee recibida.'
      },
      {
        name: 'Garras de la Sombra Prime (Shadow Claws)',
        type: 'Garras de Combate de la Sombra',
        icon: '🐾',
        slot: 'Melee',
        stance: 'Malicious Raptor',
        exilus: 'Melee Elementalist',
        mods: ['Blood Rush', 'Weeping Wounds', 'Organ Shatter', 'Condition Overload', 'Gladiator Might', 'Primed Fever Strike', 'Shocking Touch', 'Carnis Mandible'],
        arcanes: ['Melee Influence', 'Melee Duplicate'],
        elements: 'Corrosivo + Electricidad (Contagio Melee Influence)',
        notes: 'Con Melee Influence y su alto crítico base, los estados eléctricos transmiten los golpes de las garras a todos los enemigos a 20 metros a la redonda al instante.'
      }
    ]
  }]),

  F('Excalibur Umbra', [{
    name: 'Cuchillada Radial & Destello Inmortal (eduiy16)',
    role: 'Ondas Cortantes de Espada Exaltada & Control Total',
    author: 'eduiy16',
    videoUrl: 'https://www.youtube.com/@eduiy16',
    aura: 'Steel Charge',
    exilus: 'Power Drift',
    mods: ['Chromatic Blade', 'Umbral Intensify', 'Umbral Vitality', 'Umbral Fiber', 'Primed Continuity', 'Primed Flow', 'Streamline', 'Furious Javelin'],
    arcanes: ['Arcane Strike', 'Arcane Fury'],
    helminth: { ability: 'Gloom (Sevagoth) o Nutrir (Grendel)', replaces: 'Habilidad 1 (Corte Fugaz)' },
    shards: [
      { type: 'crimson', tau: true, stat: '+15% Fuerza de Habilidad' },
      { type: 'crimson', tau: true, stat: '+15% Fuerza de Habilidad' },
      { type: 'crimson', tau: true, stat: '+15% Duración de Habilidad' },
      { type: 'amber', tau: true, stat: '+37.5% Velocidad de casteo' },
      { type: 'violet', tau: true, stat: '+37.5% Daño Crítico Melee' }
    ],
    focus: 'Naramon o Madurai',
    notes: 'Jabalina Furiosa otorga un incremento porcentual de daño masivo por cada enemigo atravesado. Destello Radial ciega y abre a remates a acólitos y eximus mientras las ondas de Espada Exaltada barren pasillos completos.',
    loadout: [
      {
        name: 'Espada Exaltada Umbra (Exalted Umbra Blade)',
        type: 'Espada Exaltada de Ondas Cortantes',
        icon: '🗡️',
        slot: 'Melee',
        exilus: 'Melee Elementalist',
        mods: ['Sacrificial Steel', 'Sacrificial Pressure', 'Organ Shatter', 'Condition Overload', 'Gladiator Might', 'Primed Fever Strike', 'North Wind', 'Archon Stretch'],
        arcanes: ['Melee Influence', 'Melee Exposure'],
        elements: 'Viral + Electricidad (o Corrosivo con emisivo de Espada Cromática)',
        notes: 'Espada Cromática (Chromatic Blade) transforma todo el daño en elemental con un +300% de probabilidad de estado. En combinación con Melee Influence y daño eléctrico, cada onda expansiva electrocuta y despedaza a todos los enemigos adyacentes a través del mapa.'
      }
    ]
  }]),

  F('Valkyr', [{
    name: 'Histeria Inmortal & Berserker SP (eduiy16)',
    role: '100% Invencibilidad, Robo de Vida & Críticos Rojos',
    author: 'eduiy16',
    videoUrl: 'https://www.youtube.com/@eduiy16',
    aura: 'Steel Charge',
    exilus: 'Power Drift',
    mods: ['Eternal War', 'Enraged', 'Umbral Intensify', 'Umbral Vitality', 'Umbral Fiber', 'Primed Continuity', 'Primed Flow', 'Narrow Minded'],
    arcanes: ['Arcane Strike', 'Arcane Fury'],
    helminth: { ability: 'Nutrir (Grendel) o Rugido (Rhino)', replaces: 'Habilidad 1 (Línea de Ruptura)' },
    shards: [
      { type: 'violet', tau: true, stat: '+37.5% Daño Crítico Melee' },
      { type: 'violet', tau: true, stat: '+37.5% Daño Crítico Melee' },
      { type: 'violet', tau: true, stat: '+37.5% Daño Crítico Melee' },
      { type: 'crimson', tau: true, stat: '+15% Fuerza de Habilidad' },
      { type: 'amber', tau: true, stat: '+37.5% Velocidad de casteo' }
    ],
    focus: 'Naramon o Madurai',
    notes: 'Guerra Eterna (Eternal War) renueva la duración de Grito de Guerra con cada baja melee para mantener velocidad de ataque y armadura al máximo. Histeria activa invulnerabilidad absoluta y regenera salud con cada golpe.',
    loadout: [
      {
        name: 'Garras de Valkyr (Valkyr Talons)',
        type: 'Garras Exaltadas de Histeria',
        icon: '🐾',
        slot: 'Melee',
        stance: '',
        exilus: 'Melee Elementalist',
        mods: ['Sacrificial Steel', 'Organ Shatter', 'Gladiator Might', 'Condition Overload', 'Blood Rush', 'Primed Fever Strike', 'Shocking Touch', 'Primed Pressure Point'],
        arcanes: ['Melee Duplicate', 'Melee Animosity'],
        elements: 'Corrosivo + Cortante Puro',
        notes: 'Con Encolerizada (Enraged) obtienes +300% de daño y +200% de probabilidad crítica durante la activación de Histeria. Las garras alcanzan multiplicadores críticos astronómicos con zarpazos que destrozan cualquier jefe o acólito en segundos.'
      }
    ]
  }]),

  F('Hildryn', [{
    name: 'Pillaje Masivo & Tanque de Escudos Infinito (eduiy16)',
    role: '100% Despojo de Armadura/Escudos & Munición de Escudo',
    author: 'eduiy16',
    videoUrl: 'https://www.youtube.com/@eduiy16',
    aura: 'Corrosive Projection',
    exilus: 'Primed Sure Footed',
    mods: ['Blazing Pillage', 'Primed Redirection', 'Umbral Intensify', 'Transient Fortitude', 'Blind Rage', 'Primed Continuity', 'Stretch', "Boreal's Hatred"],
    arcanes: ['Arcane Aegis', 'Arcane Barrier'],
    helminth: { ability: 'Rugido (Rhino) o Fuego Térmico (Gauss)', replaces: 'Habilidad 4 (Égida de Tormenta)' },
    shards: [
      { type: 'crimson', tau: true, stat: '+15% Fuerza de Habilidad' },
      { type: 'crimson', tau: true, stat: '+15% Fuerza de Habilidad' },
      { type: 'azure', tau: true, stat: '+225 Capacidad de Escudos' },
      { type: 'azure', tau: true, stat: '+225 Capacidad de Escudos' },
      { type: 'amber', tau: true, stat: '+37.5% Velocidad de casteo' }
    ],
    focus: 'Madurai',
    notes: 'Pillaje Ardiente (Blazing Pillage) despoja el 100% de armadura y escudos de los enemigos en un solo casteo alcanzando 400% de Fuerza de habilidad, y recarga miles de escudos a Hildryn para mantener su invulnerabilidad pasiva de escudo.',
    loadout: [
      {
        name: 'Cargador Balefire Prime (Balefire Charger)',
        type: 'Cañón Exaltado de Plasma y Radiación',
        icon: '⚡',
        slot: 'Secondary',
        exilus: 'Balefire Surge',
        mods: ['Galvanized Diffusion', 'Primed Pistol Gambit', 'Primed Target Cracker', 'Primed Heated Charge', 'Galvanized Shot', 'Anemic Agility', 'Convulsion', 'Pistol Pestilence'],
        arcanes: ['Secondary Fortifier', 'Secondary Outburst'],
        elements: 'Radiación + Corrosivo (Explosión en Área)',
        notes: 'Oleada de Balefire (Balefire Surge) recarga escudos al impactar y destruye al instante las burbujas de los Nulificadores Corpus. Dispara orbes de plasma masivo con daño de área abrumador impulsado por los escudos de Hildryn.'
      }
    ]
  }]),

  F('Ivara', [{
    name: 'Merodeo Fantasma & Disparo Concentrado Level Cap (eduiy16)',
    role: 'Invisibilidad Permanente & Daño a la Cabeza x10',
    author: 'eduiy16',
    videoUrl: 'https://www.youtube.com/@eduiy16',
    aura: 'Growing Power',
    exilus: 'Power Drift',
    mods: ['Concentrated Arrow', 'Infiltrate', 'Primed Continuity', 'Narrow Minded', 'Primed Flow', 'Streamline', 'Transient Fortitude', 'Overextended'],
    arcanes: ['Arcane Precision', 'Arcane Arachne'],
    helminth: { ability: 'Nutrir (Grendel) o Eclipse (Mirage)', replaces: 'Habilidad 2 (Navegador)' },
    shards: [
      { type: 'crimson', tau: true, stat: '+15% Fuerza de Habilidad' },
      { type: 'crimson', tau: true, stat: '+15% Fuerza de Habilidad' },
      { type: 'crimson', tau: true, stat: '+15% Duración de Habilidad' },
      { type: 'amber', tau: true, stat: '+37.5% Velocidad de casteo' },
      { type: 'azure', tau: true, stat: '+75 Energía Máxima' }
    ],
    focus: 'Madurai',
    notes: 'Merodeo (Prowl) te mantiene en sigilo perpetuo mientras roba recursos y multiplica el daño a la cabeza. Infiltrado (Infiltrate) te permite atravesar cualquier rayo láser sin activar alarmas.',
    loadout: [
      {
        name: 'Arco de Artemisa Prime (Artemis Bow)',
        type: 'Arco Exaltado de Disparo Múltiple',
        icon: '🏹',
        slot: 'Primary',
        exilus: 'Vigilante Supplies',
        mods: ['Galvanized Chamber', 'Galvanized Aptitude', 'Critical Delay', 'Vital Sense', 'Hunter Munitions', 'Primed Cryo Rounds', 'Malignant Force', 'Vigilante Armaments'],
        arcanes: ['Primary Deadhead', 'Primary Merciless'],
        elements: 'Viral + Cortes Forzados por Hunter Munitions',
        notes: 'Disparo Concentrado (Concentrated Arrow) transforma las flechas en un único proyectil que al impactar en la cabeza detona una explosión masiva con +50% de probabilidad crítica plana en un radio de 7 metros, vaporizando salas completas.'
      }
    ]
  }]),
];

export const WEAPON_BUILDS = [
  // ==================== ARMAS PRIMARIAS ====================
  {
    name: 'Torid',
    slot: 'Primary',
    role: 'Rayo Incarnon Encadenado (Meta SP Absoluto)',
    author: 'eduiy16',
    videoUrl: 'https://www.youtube.com/watch?v=AUZIYQE2NZt8KVugCnDOOsNS7gp-e9wqJ2HXHLB5vl9Szhu04-IwofTO8hXTjaAs0weaeHIrxjTcIOwTfy2D60I5DCjcFyrxaIv3ZQrefgP9NuOu_8q3BMtLCCmgQcUoneIR0ddh',
    exilus: 'Vigilante Supplies',
    mods: ['Galvanized Chamber', 'Critical Delay', 'Vital Sense', 'Serration', 'Hunter Munitions', 'Malignant Force', 'Rime Rounds', 'Rifle Elementalist'],
    arcanes: ['Primary Merciless'],
    elements: 'Viral + Calor + Sangrado Forzado (Hunter Munitions)',
    incarnon: [
      'Evolución II: Furia de Final (+Daño base y cadencia acelerada)',
      'Evolución III: Manos Extendidas (+Velocidad de recarga)',
      'Evolución IV: Ventaja de Sobreviviente (+54% Probabilidad Crítica plana)'
    ],
    notes: 'Dispara al cuerpo de cualquier enemigo para cargar la barra Incarnon en un segundo; al transformar el arma en rayo continuo salta automáticamente entre enemigos derritiendo salas enteras en Steel Path con críticos rojos ininterrumpidos.'
  },
  {
    name: 'Burston Prime',
    slot: 'Primary',
    role: 'Ametralladora Incarnon de Críticos Rojos & Cortes',
    author: 'eduiy16',
    videoUrl: 'https://www.youtube.com/@eduiy16',
    exilus: 'Vigilante Supplies',
    mods: ['Galvanized Chamber', 'Critical Delay', 'Vital Sense', 'Serration', 'Hunter Munitions', 'Hellfire', 'High Voltage', 'Rifle Elementalist'],
    arcanes: ['Primary Deadhead', 'Primary Merciless'],
    elements: 'Radiación + Fuego + Cortante',
    incarnon: [
      'Evolución II: Firmeza del Tirador (+Daño base y -Retroceso)',
      'Evolución III: Despliegue Rápido (+Velocidad de cambio y recarga)',
      'Evolución IV: Fatalidad Absoluta (+Probabilidad y Multiplicador Crítico)'
    ],
    notes: 'En forma Incarnon se convierte en una ametralladora rotatoria con 600 proyectiles por minuto de dispersión milimétrica, triturando acólitos con sangrado de Hunter Munitions.'
  },
  {
    name: 'Cedo Prime',
    slot: 'Primary',
    role: 'Cebador de Estados en Área & Escopeta Multiplicativa',
    author: 'eduiy16',
    videoUrl: 'https://www.youtube.com/@eduiy16',
    exilus: 'Shotgun Ammo Mutation',
    mods: ['Galvanized Hell', 'Galvanized Savvy', 'Primed Point Blank', 'Critical Deceleration', 'Primed Ravage', 'Toxic Barrage', 'Frigid Blast', 'Shotgun Elementalist'],
    arcanes: ['Primary Merciless'],
    elements: 'Viral + Disco de Estados Físicos y Elementales Rebotantes',
    notes: 'Lanza el disco con el disparo secundario (aplica 6+ estados elementales en área rebotando entre enemigos). El disparo primario inflige daño aumentado exponencialmente por cada estado activo en el objetivo.'
  },
  {
    name: 'Trumna Prime',
    slot: 'Primary',
    role: 'Nuke Explosivo de Rebote & Viral/Calor SP',
    author: 'eduiy16',
    videoUrl: 'https://www.youtube.com/watch?v=AUZIYQGpHE2vIBLckzaUTmsuis86sxJn_qkb_cM3XE-rCpHiUy3AmpPgKAaldpQBihGpnmt8Ah2JG-fqQ3I1VFS9wPCcvIExB3VLz4m1aIbUSDjQU8cya4ylBlX5mDwbLhb86zqq',
    exilus: 'Vigilante Supplies',
    mods: ['Galvanized Chamber', 'Critical Delay', 'Vital Sense', 'Serration', 'Hunter Munitions', 'Thermite Rounds', 'Malignant Force', 'Rifle Elementalist'],
    arcanes: ['Primary Deadhead'],
    elements: 'Viral + Calor + Sangrado Masivo en Área',
    notes: 'Acumula 5 bajas con el disparo automático para cargar el disparo secundario: una granada de rebote que detona 7 veces en cadena provocando millones de daño explosivo en área.'
  },
  {
    name: 'Tenet Arca Plasmor',
    slot: 'Primary',
    role: 'Onda Expansiva de Radiación & Despedazamiento SP',
    author: 'eduiy16',
    videoUrl: 'https://www.youtube.com/@eduiy16',
    exilus: 'Fatal Acceleration',
    mods: ['Galvanized Hell', 'Galvanized Savvy', 'Critical Deceleration', 'Primed Ravage', 'Primed Point Blank', 'Toxic Barrage', 'Frigid Blast', 'Shotgun Elementalist'],
    arcanes: ['Primary Merciless'],
    elements: 'Radiación + Viral + Electricidad con Rebote',
    notes: 'El proyectil ancho de plasma atraviesa grupos compactos de enemigos rebotando en pasillos cerrados e infligiendo impacto garantizado y estados letales.'
  },
  {
    name: 'Kuva Bramma',
    slot: 'Primary',
    role: 'Arco Explosivo de Racimo & Barrido Rápido',
    author: 'eduiy16',
    videoUrl: 'https://www.youtube.com/@eduiy16',
    exilus: 'Vigilante Supplies',
    mods: ['Galvanized Chamber', 'Critical Delay', 'Vital Sense', 'Serration', 'Hunter Munitions', 'Hellfire', 'Malignant Force', 'Rifle Elementalist'],
    arcanes: ['Primary Merciless'],
    elements: 'Viral + Fuego + Bombetas de Racimo Cortante',
    notes: 'Flechas de impacto masivo que se fragmentan en microbombas al impactar, despejando salas de farmeo y fisuras rápidamente.'
  },
  {
    name: 'Soma Prime',
    slot: 'Primary',
    role: 'Incarnon Crítico Puro de Alta Cadencia',
    author: 'eduiy16',
    videoUrl: 'https://www.youtube.com/@eduiy16',
    exilus: 'Vigilante Supplies',
    mods: ['Galvanized Chamber', 'Critical Delay', 'Vital Sense', 'Serration', 'Hunter Munitions', 'Hellfire', 'Malignant Force', 'Rifle Elementalist'],
    arcanes: ['Primary Merciless', 'Primary Deadhead'],
    elements: 'Viral + Calor + Cortante',
    incarnon: [
      'Evolución II: Furia Continua (+Daño base por disparo)',
      'Evolución III: Capacidad de Cargador Incarnon',
      'Evolución IV: Probabilidad Crítica Base Aumentada'
    ],
    notes: 'La evolución Incarnon eleva la probabilidad crítica base de la Soma Prime a niveles exorbitantes, encadenando impactos críticos rojos a la cabeza.'
  },

  // ==================== ARMAS SECUNDARIAS ====================
  {
    name: 'Laetum',
    slot: 'Secondary',
    role: 'Metralleta Incarnon 3.000.000 DPS (Anti-Jefes & Level Cap)',
    author: 'eduiy16',
    videoUrl: 'https://www.youtube.com/watch?v=AUZIYQH2qnZu-_eb4z4PI5DoOWurEcUSlzYCvXxAYbEcD6PejQMwJaQF9OJ2_AZGXQJ1gvRcWNijXpWyICSt__fvHYYzoLFnXzHU1zIsjXdqOpUyX4eELtQG3n2f04qGUgEN6r_O',
    exilus: 'Ruinous Extension',
    mods: ['Galvanized Diffusion', 'Galvanized Shot', 'Hornet Strike', 'Lethal Torrent', 'Jolt', 'Pistol Pestilence', 'Scorch', 'Pistol Elementalist'],
    arcanes: ['Secondary Merciless', 'Cascadia Flare'],
    elements: 'Corrosivo + Calor + Golpe No Crítico x2000%',
    incarnon: [
      'Evolución II: Furia de Semidiós (+Daño base y cadencia)',
      'Evolución III: Manos Ágiles (+Velocidad de recarga)',
      'Evolución IV: Gracia Devastadora (50% de probabilidad de +2000% Daño en golpes no críticos)'
    ],
    notes: 'No lleves mods de probabilidad crítica: la evolución V otorga un 50% de probabilidad de multiplicar el daño por un 2000% adicional en impactos no críticos, pulverizando acólitos y jefes de nivel 9999 en un abrir y cerrar de ojos.'
  },
  {
    name: 'Dual Toxocyst',
    slot: 'Secondary',
    role: 'Pistolas Duales Incarnon con Rebote Teledirigido',
    author: 'eduiy16',
    videoUrl: 'https://www.youtube.com/watch?v=AUZIYQFLAmfS_3OA5KIauMhZRw8Z2u2GVD1pmS6037HL--iiQ7ZlPp_Q7xgpwFHkZKuDgtt9Ux5mgLsf6baKoZ2ofDskRkTzvvr-iUvU_dYvThqJaVl_0XGEeyCrcrrICitmwC2K',
    exilus: 'Ruinous Extension',
    mods: ['Galvanized Diffusion', 'Galvanized Crosshairs', 'Primed Target Cracker', 'Lethal Torrent', 'Pistol Pestilence', 'Frostbite', 'Scorch', 'Pistol Elementalist'],
    arcanes: ['Secondary Merciless', 'Cascadia Flare'],
    elements: 'Viral + Calor + Balas Incarnon Rebotantes',
    incarnon: [
      'Evolución II: Ráfaga Desenfrenada (+Cadencia masiva al apuntar a la cabeza)',
      'Evolución III: Recarga Instantánea en movimiento',
      'Evolución IV: Fiebre del Verdugo (Proyectiles rebotan automáticamente a 2 objetivos)'
    ],
    notes: 'Un solo disparo a la cabeza activa la cadencia frenética sin retroceso; en modo Incarnon cada bala rebota automáticamente entre enemigos eliminando hordas enteras pasivamente.'
  },
  {
    name: 'Kuva Nukor',
    slot: 'Secondary',
    role: 'Rayo Cebador de Microondas Supremo (Para Condition Overload)',
    author: 'eduiy16',
    videoUrl: 'https://www.youtube.com/@eduiy16',
    exilus: 'Ruinous Extension',
    mods: ['Galvanized Diffusion', 'Galvanized Shot', 'Lethal Torrent', 'Pistol Pestilence', 'Frostbite', 'Scorch', 'Jolt', 'Pistol Elementalist'],
    arcanes: ['Secondary Encumber'],
    elements: 'Microondas Oculto + Radiación + Viral + Calor + Electricidad',
    notes: 'Encadena hasta 4 objetivos aplicando el estado oculto Microondas (engrandece partes del enemigo) más 5 estados elementales distintos, multiplicando el daño cuerpo a cuerpo con Condition Overload.'
  },
  {
    name: 'Akarius Prime',
    slot: 'Secondary',
    role: 'Misiles Teledirigidos Explosivos & Daño AoE Masivo',
    author: 'eduiy16',
    videoUrl: 'https://www.youtube.com/watch?v=AUZIYQGQ7C5nETgSx8OraXUFZL8BvNe0y3okLkPE3oBWQiHGiKe9bo4syT-QwVu2Nds3LUSWB-2mq4oTKJG-MzNgKtLLxMZD-Y3fS0tXdZKXv5CBe5tTgTUZ65baXDH_3JGGu7Zp',
    exilus: 'Pistol Ammo Mutation',
    mods: ['Galvanized Diffusion', 'Hornet Strike', 'Primed Pistol Gambit', 'Primed Target Cracker', 'Lethal Torrent', 'Pistol Pestilence', 'Frostbite', 'Pistol Elementalist'],
    arcanes: ['Secondary Merciless'],
    elements: 'Viral + Explosivo Guiado',
    notes: 'Dispara cohetes inteligentes con aceleración y seguimiento teledirigido que barren grupos de enemigos sin necesidad de puntería precisa.'
  },

  // ==================== ARMAS MELEE ====================
  {
    name: 'Glaive Prime',
    slot: 'Melee',
    role: 'Ataque Pesado de Corte Forzado Millonario (Tier S+)',
    author: 'eduiy16',
    videoUrl: 'https://www.youtube.com/watch?v=AUZIYQHYJT_zcuUES0t1pNJjcZH_F0XfManPYVLUU13veWSG1f1CHV_a_UJ4mqEyXygxxx1P1BLACBrhOX_-2aM5aCD5DHJUHHKG9TebDSXkcysmMQR1j4D7pm_3oOPFbR8LOM8e',
    stance: 'Gleaming Talon',
    exilus: 'Melee Elementalist',
    mods: ['Killing Blow', 'Corrupt Charge', 'Organ Shatter', 'Sacrificial Steel', 'Volatile Quick Return', 'Primed Pressure Point', 'Melee Elementalist', 'Gladiator Might'],
    arcanes: ['Melee Duplicate', 'Arcane Strike'],
    elements: 'Corte Puro 100% Forzado en Detonación Aérea',
    notes: 'Lanza la guja y presiona el botón de ataque pesado en pleno vuelo para detonarla en el aire. Inflige cortes forzados de millones de daño por segundo que ignoran por completo la armadura enemiga.'
  },
  {
    name: 'Kronen Prime',
    slot: 'Melee',
    role: 'Tonfas de Sangrado & Multiplicador de Combo 12x',
    author: 'eduiy16',
    videoUrl: 'https://www.youtube.com/@eduiy16',
    stance: 'Sovereign Outcast',
    exilus: 'Melee Elementalist',
    mods: ['Condition Overload', 'Blood Rush', 'Weeping Wounds', 'Organ Shatter', 'Berserker Fury', 'Carnis Mandible', 'Primed Reach', 'Melee Elementalist'],
    arcanes: ['Melee Duplicate', 'Arcane Strike'],
    elements: 'Cortante Forzado de Postura + Viral',
    notes: 'La postura Sovereign Outcast contiene golpes cortantes garantizados en sus combos neutrales y hacia adelante. Con Blood Rush y combo 12x conecta críticos rojos sin cesar.'
  },
  {
    name: 'Broken War',
    slot: 'Melee',
    role: 'Espada de Crítico Brutal & Melee Influence SP',
    author: 'eduiy16',
    videoUrl: 'https://www.youtube.com/watch?v=AUZIYQEaN6z_cFv7nKGwTBAsh1KLbjqfrV7DQO4l74UHmXaU3aeg_4Xzh91imlDq_quO_klHeyGzx5urjjJXXpwxrqmMYK2V7Tsw3HTmR2i4Bo4Jo57F_a8cL5LKeLwhuzxoJRhN',
    stance: 'Iron Phoenix',
    exilus: 'Melee Elementalist',
    mods: ['Condition Overload', 'Blood Rush', 'Weeping Wounds', 'Organ Shatter', 'Berserker Fury', 'Primed Reach', 'Virulent Scourge', 'Vicious Frost'],
    arcanes: ['Melee Influence', 'Arcane Strike'],
    elements: 'Viral + Electricidad en Cadena (Melee Influence)',
    notes: 'Cuenta con un 35% de probabilidad crítica base sobresaliente. Al activar Melee Influence, propaga todo el daño elemental y de estado a todos los enemigos en un radio de 20 metros.'
  },
  {
    name: 'Nikana Prime',
    slot: 'Melee',
    role: 'Katana Tradicional de Cortes Rápidos & Crítico',
    author: 'eduiy16',
    videoUrl: 'https://www.youtube.com/@eduiy16',
    stance: 'Blind Justice',
    exilus: 'Melee Elementalist',
    mods: ['Condition Overload', 'Blood Rush', 'Weeping Wounds', 'Organ Shatter', 'Berserker Fury', 'Primed Reach', 'Carnis Mandible', 'Melee Elementalist'],
    arcanes: ['Melee Duplicate', 'Arcane Strike'],
    elements: 'Cortante Puro con Multiplicadores de Postura',
    notes: 'Blind Justice tiene el combo de embestida hacia adelante más fluido y rápido de Warframe con cortes garantizados y multiplicadores de daño plano.'
  },
  {
    name: 'Astilla Prime',
    slot: 'Primary',
    role: 'Proyectiles de Cristal Explosivo & Sangrado Slash Masivo',
    author: 'Helter hxz',
    videoUrl: 'https://www.youtube.com/results?search_query=warframe+astilla+prime+helter+hxz',
    exilus: 'Fatal Acceleration',
    mods: ['Galvanized Hell', 'Galvanized Savvy', 'Critical Deceleration', 'Primed Ravage', 'Hunter Munitions', 'Toxic Barrage', 'Frigid Blast', 'Shotgun Elementalist'],
    arcanes: ['Primary Merciless'],
    elements: 'Viral + Cortante (Slugs de cristal explosivo)',
    notes: 'Los proyectiles de cristal estallan al impactar generando una nube de esquirlas cortantes en área. Con Galvanized Hell y Savvy cada slug aplica cortes letales forzados por Hunter Munitions amplificados por Shotgun Elementalist (+90% daño de estados).'
  },
  {
    name: 'Nataruk',
    slot: 'Primary',
    role: 'Disparos Perfectos Infinitos & Críticos Rojos Devastadores',
    author: 'Helter hxz',
    videoUrl: 'https://www.youtube.com/results?search_query=warframe+nataruk+helter+hxz',
    exilus: 'Vigilante Supplies',
    mods: ['Galvanized Chamber', 'Galvanized Aptitude', 'Critical Delay', 'Vital Sense', 'Hunter Munitions', 'Malignant Force', 'Rime Rounds', 'Rifle Elementalist'],
    arcanes: ['Primary Deadhead', 'Primary Merciless'],
    elements: 'Viral + Perforación + Sangrado (Disparo Perfecto)',
    notes: 'El arco regalado en La Nueva Guerra con munición infinita. Al soltar la flecha en la marca amarilla del retículo (Disparo Perfecto), el crítico base sube a 60% con multiplicador 2.4x y atraviesa a todos los enemigos en línea recta.'
  },
  {
    name: 'Felarx',
    slot: 'Primary',
    role: 'Escopeta Incarnon Anti-Críticos (+2000% Daño Devastador)',
    author: 'eduiy16',
    videoUrl: 'https://www.youtube.com/results?search_query=warframe+felarx+eduiy16',
    exilus: 'Fatal Acceleration',
    mods: ['Galvanized Hell', 'Galvanized Savvy', 'Primed Point Blank', 'Scattering Virulence', 'Toxic Barrage', 'Frigid Blast', 'Blaze', 'Shotgun Elementalist'],
    arcanes: ['Primary Deadhead'],
    elements: 'Viral + Fuego + Radiación (No-Crítico x2000%)',
    incarnon: [
      'Evolución II: Furia de Escopeta (+Velocidad de recarga)',
      'Evolución III: Montaje Rápido (+Capacidad de cargador)',
      'Evolución IV: Desgaste Devastador (50% prob. de infligir +2000% daño en impactos no-críticos)'
    ],
    notes: 'La reina de matar jefes y acólitos sin depender del azar crítico. Al NO equipar mods de probabilidad crítica, el 50% de los perdigones activan Devastating Attrition para aniquilar cualquier objetivo en un solo cartucho.'
  },
  {
    name: 'Phenmor',
    slot: 'Primary',
    role: 'Ametralladora Pesada Incarnon de Radiación (+2000% Daño)',
    author: 'eduiy16',
    videoUrl: 'https://www.youtube.com/results?search_query=warframe+phenmor+eduiy16',
    exilus: 'Vigilante Supplies',
    mods: ['Galvanized Chamber', 'Galvanized Aptitude', 'Serration', 'Malignant Force', 'High Voltage', 'Primed Shred', 'Primed Cryo Rounds', 'Rifle Elementalist'],
    arcanes: ['Primary Deadhead'],
    elements: 'Corrosivo + Frío + Radiación Incarnon',
    incarnon: [
      'Evolución II: Recarga Rápida (+Velocidad)',
      'Evolución III: Munición Cinética (+Capacidad Incarnon)',
      'Evolución IV: Desgaste Devastador (+2000% de daño en tiros no-críticos)'
    ],
    notes: 'Al cargar tiros a la cabeza se transforma en una ametralladora Gatling de plasma con más de 400 proyectiles en el cargador que pulveriza salas enteras de Camino de Acero.'
  },
  {
    name: 'Ignis Wraith',
    slot: 'Primary',
    role: 'Lanzallamas Viral + Calor de Limpieza Continua',
    author: 'Helter hxz',
    videoUrl: 'https://www.youtube.com/results?search_query=warframe+ignis+wraith+helter+hxz',
    exilus: 'Vigilante Supplies',
    mods: ['Galvanized Chamber', 'Galvanized Aptitude', 'Critical Delay', 'Vital Sense', 'Hunter Munitions', 'Malignant Force', 'Rime Rounds', 'Rifle Elementalist'],
    arcanes: ['Primary Merciless'],
    elements: 'Fuego Nato + Viral + Sangrado Slash',
    notes: 'El lanzallamas más popular del juego. Baña pasillos enteros con calor continuo para despojar 50% de armadura mientras Hunter Munitions detona sangrados masivos sin necesidad de apuntar.'
  },
  {
    name: 'Acceltra Prime',
    slot: 'Primary',
    role: 'Lanza-micromisiles Automático de Aceleración Máxima',
    author: 'Helter hxz',
    videoUrl: 'https://www.youtube.com/results?search_query=warframe+acceltra+prime+helter+hxz',
    exilus: 'Vigilante Supplies',
    mods: ['Galvanized Chamber', 'Critical Delay', 'Vital Sense', 'Serration', 'Hunter Munitions', 'Malignant Force', 'Rime Rounds', 'Rifle Elementalist'],
    arcanes: ['Primary Deadhead', 'Primary Merciless'],
    elements: 'Viral + Explosión de Micro-misiles + Sangrado',
    notes: 'Arma distintiva de Gauss Prime. Dispara proyectiles cohete de salva rápida que detonan a más de 7 metros. Vital Sense y Critical Delay disparan los críticos al 100% permanente.'
  },
  {
    name: 'Epitaph Prime',
    slot: 'Secondary',
    role: 'Cebador de Estados en Área & Nuke de Disparo Cargado',
    author: 'eduiy16',
    videoUrl: 'https://www.youtube.com/results?search_query=warframe+epitaph+prime+eduiy16',
    exilus: 'Lethal Momentum',
    mods: ['Galvanized Diffusion', 'Galvanized Shot', 'Lethal Torrent', 'Primed Target Cracker', 'Primed Pistol Gambit', 'Pistol Pestilence', 'Frostbite', 'Pistol Elementalist'],
    arcanes: ['Secondary Encumber', 'Secondary Fortifier'],
    elements: 'Frío Nato en Área (Cebador) / Daño Crítico Puro (Disparo Cargado)',
    notes: 'Disparo rápido: Nube en área que aplica Frío forzado (ralentiza 70%) más 5 estados adicionales para activar Galvanized Shot y Condition Overload. Disparo cargado: Proyectil de cientos de miles de daño con 48% de crítico base.'
  },
  {
    name: 'Kuva Hek',
    slot: 'Primary',
    role: 'Disparo Simultáneo de 4 Cañones para One-Shot en Archon Hunts',
    author: 'eduiy16',
    videoUrl: 'https://www.youtube.com/results?search_query=warframe+kuva+hek+eduiy16',
    exilus: 'Fatal Acceleration',
    mods: ['Galvanized Hell', 'Galvanized Savvy', 'Critical Deceleration', 'Primed Ravage', 'Primed Point Blank', 'Toxic Barrage', 'Frigid Blast', 'Shotgun Elementalist'],
    arcanes: ['Primary Deadhead'],
    elements: 'Viral + Radiación (Disparo Cuádruple Secundario)',
    notes: 'El disparo secundario descarga los 4 cartuchos al unísono. Con bonificación de radiación y multiplicador de cabeza, es el arma estándar utilizada para borrar al instante las barras de salud de los Arcontes.'
  },
  {
    name: 'Strun Prime',
    slot: 'Primary',
    role: 'Cañón de Plasma Incarnon con 100% de Probabilidad de Estado',
    author: 'Helter hxz',
    videoUrl: 'https://www.youtube.com/results?search_query=warframe+strun+prime+incarnon+helter+hxz',
    exilus: 'Fatal Acceleration',
    mods: ['Galvanized Hell', 'Galvanized Savvy', 'Critical Deceleration', 'Primed Ravage', 'Hunter Munitions', 'Toxic Barrage', 'Frigid Blast', 'Shotgun Elementalist'],
    arcanes: ['Primary Merciless'],
    elements: 'Viral + Calor + Cortante en Esfera Incarnon',
    incarnon: [
      'Evolución II: Acelerador Espacial (+Daño y velocidad de proyectil)',
      'Evolución III: Recarga Rápida (+Velocidad de recarga por cartucho)',
      'Evolución IV: Furia Elemental (+Probabilidad crítica y de estado)'
    ],
    notes: 'En forma Incarnon dispara proyectiles gigantescos de plasma con daño en área que saturan con decenas de estados elementales y sangrados por disparo.'
  },
  {
    name: 'Boar Prime',
    slot: 'Primary',
    role: 'Rayo Triple Incarnon que Rebota entre Hordas',
    author: 'Helter hxz',
    videoUrl: 'https://www.youtube.com/results?search_query=warframe+boar+prime+incarnon+helter+hxz',
    exilus: 'Fatal Acceleration',
    mods: ['Galvanized Hell', 'Galvanized Savvy', 'Critical Deceleration', 'Primed Ravage', 'Toxic Barrage', 'Frigid Blast', 'Blaze', 'Shotgun Elementalist'],
    arcanes: ['Primary Merciless'],
    elements: 'Viral + Fuego + Rayo Eléctrico Encadenado',
    incarnon: [
      'Evolución II: Ráfaga Carmesí (+Daño)',
      'Evolución III: Capacidad Extendida',
      'Evolución IV: Fatalidad Cuántica (+Crítico y Estado)'
    ],
    notes: 'Se transforma en un rayo triple continuo similar a la Amprex o Nukor que se encadena entre enemigos calcinando escuadrones enteros en un segundo.'
  },
  {
    name: 'Lex Prime',
    slot: 'Secondary',
    role: 'Cañón Arca Plasmor de Bolsillo con Críticos Rojos',
    author: 'Helter hxz',
    videoUrl: 'https://www.youtube.com/results?search_query=warframe+lex+prime+incarnon+helter+hxz',
    exilus: 'Lethal Momentum',
    mods: ['Galvanized Diffusion', 'Galvanized Crosshairs', 'Primed Target Cracker', 'Primed Pistol Gambit', 'Primed Heated Charge', 'Pistol Pestilence', 'Frostbite', 'Pistol Elementalist'],
    arcanes: ['Secondary Outburst', 'Secondary Deadhead'],
    elements: 'Viral + Calor + Ondas Expansivas de Plasma',
    incarnon: [
      'Evolución II: Agarre Firme (+Daño)',
      'Evolución III: Recarga Mejorada',
      'Evolución IV: Ímpetu Crítico (+Probabilidad crítica astronómica)'
    ],
    notes: 'La clásica pistola se transforma en un cañón de ondas de plasma colosales con 80%+ de probabilidad crítica base que atraviesan pasillos completos dejando montañas de bajas.'
  },
  {
    name: 'Praedos',
    slot: 'Melee',
    role: 'Tonfas Incarnon de Velocidad de Parkour & Descuartizamiento',
    author: 'Helter hxz',
    videoUrl: 'https://www.youtube.com/results?search_query=warframe+praedos+helter+hxz',
    stance: 'Sovereign Outcast',
    exilus: 'Melee Elementalist',
    mods: ['Blood Rush', 'Weeping Wounds', 'Organ Shatter', 'Condition Overload', 'Gladiator Might', 'Primed Fever Strike', 'North Wind', 'Primed Reach'],
    arcanes: ['Melee Influence', 'Melee Exposure'],
    elements: 'Viral + Cortante (Alcance y Movilidad +20%)',
    incarnon: [
      'Evolución II: Impulso de Movilidad (+20% velocidad de sprint y salto de bala pasivo)',
      'Evolución III: Alcance Drástico (+Alcance Melee)',
      'Evolución IV: Vórtice Asesino (+Velocidad de ataque)'
    ],
    notes: 'Las mejores tonfas de movilidad pasiva del juego. Otorga bonificaciones de parkour pasivas incluso guardada en la espalda, y al desatarlas golpea a velocidad ultrasónica.'
  },
  {
    name: 'Ocucor',
    slot: 'Secondary',
    role: 'Láser con Sentient Surge: Tentáculos Automáticos Infinitos',
    author: 'eduiy16',
    videoUrl: 'https://www.youtube.com/results?search_query=warframe+ocucor+sentient+surge+eduiy16',
    exilus: 'Ruinous Extension',
    mods: ['Galvanized Diffusion', 'Galvanized Shot', 'Sentient Surge', 'Lethal Torrent', 'Primed Target Cracker', 'Primed Pistol Gambit', 'Pistol Pestilence', 'Frostbite'],
    arcanes: ['Secondary Encumber', 'Secondary Fortifier'],
    elements: 'Viral + Radiación + 4 Tentáculos Guiados',
    notes: 'Con el mod Sentient Surge, cada baja genera un tentáculo de energía adicional que busca enemigos automáticamente y recarga munición al cargador. Nunca tienes que recargar ni apuntar.'
  },
  {
    name: 'Phantasma Prime',
    slot: 'Primary',
    role: 'Rayo de Radiación & Fuego con 100+ Stacks de Calor por Segundo',
    author: 'Helter hxz',
    videoUrl: 'https://www.youtube.com/results?search_query=warframe+phantasma+prime+helter+hxz',
    exilus: 'Fatal Acceleration',
    mods: ['Galvanized Hell', 'Galvanized Savvy', 'Toxic Barrage', 'Frigid Blast', 'Scattering Virulence', 'Blaze', 'Shotgun Elementalist', 'Primed Cleanse Grineer'],
    arcanes: ['Primary Merciless'],
    elements: 'Radiación + Viral + Fuego (30+ stacks por segundo)',
    notes: 'La escopeta de rayo con mayor cadencia de estados del juego. Aplica cientos de acumulaciones de calor en 2 segundos, derritiendo la armadura y la barra de vida de cualquier enemigo en Camino de Acero.'
  },
  {
    name: 'Corinth Prime',
    slot: 'Primary',
    role: 'Escopeta de Bomba Pesada & Granada de Detonación Aérea',
    author: 'Helter hxz',
    videoUrl: 'https://www.youtube.com/results?search_query=warframe+corinth+prime+helter+hxz',
    exilus: 'Fatal Acceleration',
    mods: ['Galvanized Hell', 'Galvanized Savvy', 'Critical Deceleration', 'Primed Ravage', 'Hunter Munitions', 'Toxic Barrage', 'Frigid Blast', 'Shotgun Elementalist'],
    arcanes: ['Primary Deadhead', 'Primary Merciless'],
    elements: 'Viral + Sangrado Slash + Granadas Aéreas en Área',
    notes: 'Disparo primario de impacto crítico colosal para objetivos individuales y disparo secundario detonable a distancia que barre grupos en el aire.'
  }
];

// Tier lists curadas (opinión de la comunidad, orientadas a contenido avanzado / Steel Path / Nivel 100+).
// Se incluyen expresamente las versiones PRIME de Warframes, armas meta modernas (Cedo Prime, Coda Bassocyst, Incarnon, etc.)
// y compañeros actualizados (Companions Rework).
export const TIER_COLORS = { S: '#ff4d6d', A: '#ff9f43', B: '#ffd43b', C: '#69db7c', D: '#4dabf7' };

export const TIERS = {
  warframes: {
    label: 'Warframes (Prime & Base)',
    note: 'Evaluación para Steel Path, misiones de nivel alto, supervivencia y utilidad de escuadrón. Se incluyen tanto las versiones Prime como sus equivalentes base.',
    tiers: {
      S: [
        'Saryn Prime', 'Saryn', 'Volt Prime', 'Volt', 'Mesa Prime', 'Mesa',
        'Gauss Prime', 'Gauss', 'Revenant Prime', 'Revenant', 'Protea Prime', 'Protea',
        'Wisp Prime', 'Wisp', 'Khora Prime', 'Khora', 'Octavia Prime', 'Octavia',
        'Citrine', 'Kullervo', 'Dante', 'Dagath'
      ],
      A: [
        'Rhino Prime', 'Rhino', 'Nova Prime', 'Nova', 'Nidus Prime', 'Nidus',
        'Gara Prime', 'Gara', 'Harrow Prime', 'Harrow', 'Baruuk Prime', 'Baruuk',
        'Xaku', 'Hildryn Prime', 'Hildryn', 'Trinity Prime', 'Trinity',
        'Banshee Prime', 'Banshee', 'Voruna', 'Styanax', 'Equinox Prime', 'Equinox',
        'Sevagoth Prime', 'Sevagoth', 'Inaros Prime', 'Inaros'
      ],
      B: [
        'Mag Prime', 'Mag', 'Frost Prime', 'Frost', 'Ember Prime', 'Ember',
        'Zephyr Prime', 'Zephyr', 'Ivara Prime', 'Ivara', 'Nezha Prime', 'Nezha',
        'Garuda Prime', 'Garuda', 'Lavos', 'Grendel Prime', 'Grendel',
        'Titania Prime', 'Titania', 'Wukong Prime', 'Wukong', 'Ash Prime', 'Ash',
        'Mirage Prime', 'Mirage', 'Nekros Prime', 'Nekros', 'Valkyr Prime', 'Valkyr',
        'Vauban Prime', 'Vauban', 'Chroma Prime', 'Chroma', 'Atlas Prime', 'Atlas',
        'Gyre', 'Yareli', 'Caliban', 'Qorvex'
      ],
      C: [
        'Excalibur Prime', 'Excalibur', 'Excalibur Umbra', 'Loki Prime', 'Loki',
        'Hydroid Prime', 'Hydroid', 'Nyx Prime', 'Nyx', 'Oberon Prime', 'Oberon',
        'Limbo Prime', 'Limbo'
      ],
    },
  },
  primary: {
    label: 'Armas primarias',
    note: 'Evaluado en Steel Path con builds completas (Incarnon Génesis, Prime modernos, Kuva/Tenet/Coda y Riven). Incluye Cedo Prime, Coda Bassocyst, Torid Incarnon, etc.',
    tiers: {
      S: [
        'Cedo Prime', 'Coda Bassocyst', 'Torid', 'Burston Prime', 'Latron Prime',
        'Boar Prime', 'Strun Prime', 'Kuva Bramma', 'Tenet Arca Plasmor',
        'Phantasma Prime', 'Acceltra Prime', 'Felarx', 'Phenmor', 'Soma Prime'
      ],
      A: [
        'Cedo', 'Gotva Prime', 'Rubico Prime', 'Opticor Vandal', 'Kuva Zarr',
        'Kuva Tonkor', 'Kuva Chakkhurr', 'Kuva Hek', 'Kuva Kohm', 'Tenet Envoy',
        'Tenet Glaxion', 'Trumna Prime', 'Braton Prime', 'Gorgon Wraith', 'Nataruk',
        'Ignis Wraith', 'Amprex', 'Synoid Simulor', 'Vectis Prime', 'Coda Bubonico',
        'Coda Sporothrix', 'Fulmin Prime', 'Bubonico'
      ],
      B: [
        'Supra Vandal', 'Stradavar Prime', 'Panthera Prime', 'Hek', 'Soma',
        'Tiberon Prime', 'Harpak', 'Mutalist Cernos', 'Braton', 'Paris Prime',
        'Cernos Prime', 'Corinth Prime', 'Astilla Prime', 'Nagantaka Prime',
        'Steflos', 'Perigale', 'Quellor', 'Basmu'
      ],
      C: [
        'Grakata', 'Boltor Prime', 'Gorgon', 'Karak', 'Lanka', 'Dera Vandal',
        'Buzlok', 'Hind', 'Drakgoon', 'Snipetron Vandal'
      ],
    },
  },
  secondary: {
    label: 'Armas secundarias',
    note: 'Primarias de bolsillo y cebadores de estado (Primers/Incarnon). Incluye Laetum, Dual Toxocyst Incarnon, Epitaph Prime, Kuva Nukor, etc.',
    tiers: {
      S: [
        'Laetum', 'Dual Toxocyst', 'Epitaph Prime', 'Epitaph', 'Kuva Nukor',
        'Lex Prime', 'Tenet Cycron', 'Furis', 'Pyrana Prime', 'Ocucor'
      ],
      A: [
        'Euphona Prime', 'Akarius Prime', 'Coda Catabolyst', 'Spira Prime',
        'Tenet Plinx', 'Tenet Detron', 'Sicarus Prime', 'Vasto Prime',
        'Akstiletto Prime', 'Akbronco Prime', 'Kuva Brakk', 'Kompressa',
        'Magnus Prime', 'Hystrix Prime', 'Knell Prime', 'Dual Coda Torxica'
      ],
      B: [
        'Atomos', 'Bronco Prime', 'Akjagara Prime', 'Aksomati Prime', 'Zylok Prime',
        'Despair', 'Catabolyst', 'Cyanex', 'Pandero Prime', 'Staticor',
        'Synoid Gammacor', 'Twin Grakatas', 'Spectra Vandal'
      ],
      C: [
        'Lato Prime', 'Kunai', 'Aklato', 'Gammacor', 'Seer', 'Kraken',
        'Cestra', 'Dual Cestra', 'Stug', 'Viper Wraith'
      ],
    },
  },
  melee: {
    label: 'Armas cuerpo a cuerpo (Melee)',
    note: 'Evaluado por escala de combo (Blood Rush, Weeping Wounds, Tennokai, Incarnon y armas arrojadizas). Glaive Prime, Harmony, Ceramic Dagger, Xoris, etc.',
    tiers: {
      S: [
        'Glaive Prime', 'Harmony', 'Ceramic Dagger', 'Xoris', 'Dual Ichor',
        'Praedos', 'Innodem', 'Kronen Prime', 'Nikana Prime', 'Gram Prime',
        'Orthos Prime', 'Reaper Prime', 'Tenet Exec', 'Hate'
      ],
      A: [
        'Corufell Prime', 'Gunsen Prime', 'Dual Keres Prime', 'Guandao Prime',
        'Dorrclave', 'Venka Prime', 'Redeemer Prime', 'Stropha', 'Pennant',
        'Dragon Nikana', 'Broken War', 'War', 'Tenet Livia', 'Tenet Agendus',
        'Galatine Prime', 'Scindo Prime', 'Coda Hirudo', 'Coda Caustacyst'
      ],
      B: [
        'Dual Kamas Prime', 'Ankyros Prime', 'Skana Prime', 'Magistar',
        'Broken Scepter', 'Pangolin Prime', 'Lesion', 'Tipedo Prime',
        'Heliocor', 'Hirudo', 'Masseter Prime', 'Kogake Prime', 'Destreza Prime',
        'Silva & Aegis Prime', 'Cobra & Crane Prime', 'Atterax'
      ],
      C: [
        'Skana', 'Bo Prime', 'Dual Cleavers', 'Fang Prime', 'Paracesis',
        'Mios', 'Dark Split-Sword', 'Karyst Prime', 'Sibear', 'Furax Wraith'
      ],
    },
  },
  sentinels: {
    label: 'Centinelas (Prime & Especiales)',
    note: 'Tras el Rework de Compañeros, los centinelas no mueren permanentemente y aportan enorme utilidad pasiva y cebado de arcanos.',
    tiers: {
      S: ['Nautilus Prime', 'Nautilus', 'Diriga', 'Carrier Prime', 'Carrier', 'Helios Prime'],
      A: ['Wyrm Prime', 'Shade Prime', 'Dethcube Prime', 'Oxylus', 'Djinn'],
      B: ['Helios', 'Wyrm', 'Shade', 'Dethcube', 'Taxon'],
      C: ['Prisma Shade'],
    },
  },
  companions: {
    label: 'Kavat / Kubrow / Vulpaphyla / Hounds',
    note: 'Mascotas biológicas y sabuesos. Panzer Vulpaphyla (viral inmortal), Smeeta Kavat (doble botín/afinidad), Adarza (crítico plano) y Hounds de Hermanas de Parvos.',
    tiers: {
      S: [
        'Panzer Vulpaphyla', 'Smeeta Kavat', 'Adarza Kavat', 'Bhaira Hound',
        'Dorma Hound', 'Hec Hound', 'Venari Prime'
      ],
      A: [
        'Chesa Kubrow', 'Huras Kubrow', 'Crescent Vulpaphyla', 'Helminth Charger',
        'Medjay Predasite', 'Pharaoh Predasite', 'Sahasa Kubrow', 'Raksa Kubrow'
      ],
      B: [
        'Sly Vulpaphyla', 'Vizier Predasite', 'Vasca Kavat', 'Venari', 'Sunika Kubrow'
      ],
      C: [
        'Lambeo Moa', 'Oloro Moa', 'Para Moa', 'Nychus Moa'
      ],
    },
  },
};

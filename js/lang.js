// Nombres de planetas, tipos y traducciones de ubicaciones de drop
export const PLANET_ES = {
  Mercury: 'Mercurio', Venus: 'Venus', Earth: 'Tierra', Mars: 'Marte',
  Phobos: 'Fobos', Ceres: 'Ceres', Jupiter: 'Júpiter', Europa: 'Europa',
  Saturn: 'Saturno', Uranus: 'Urano', Neptune: 'Neptuno', Pluto: 'Plutón',
  Sedna: 'Sedna', Eris: 'Eris', Void: 'Vacío', Lua: 'Lua',
  Deimos: 'Deimos', 'Kuva Fortress': 'Fortaleza Kuva', Zariman: 'Zariman',
  'Veil Proxima': 'Próxima del Velo', 'Earth Proxima': 'Próxima de la Tierra',
  'Venus Proxima': 'Próxima de Venus', 'Saturn Proxima': 'Próxima de Saturno',
  'Neptune Proxima': 'Próxima de Neptuno', 'Pluto Proxima': 'Próxima de Plutón',
};

export const MODE_ES = {
  Survival: 'Supervivencia', Defense: 'Defensa', Exterminate: 'Exterminio',
  Capture: 'Captura', Spy: 'Espionaje', Sabotage: 'Sabotaje', Rescue: 'Rescate',
  Mobile: 'Defensa móvil', Interception: 'Intercepción', Excavation: 'Excavación',
  Disruption: 'Disrupción', Assassination: 'Asesinato', Assault: 'Asalto',
  Hijack: 'Secuestro', 'Mobile Defense': 'Defensa móvil', Caches: 'Alijos',
  Conclave: 'Cónclave', Defection: 'Deserción', Skirmish: 'Escaramuza',
  'Dark Sector Survival': 'Supervivencia de Sector Oscuro',
  'Dark Sector Defense': 'Defensa de Sector Oscuro',
  'Dark Sector Disruption': 'Disrupción de Sector Oscuro',
  'Dark Sector Excavation': 'Excavación de Sector Oscuro',
};

export const RARITY_ES = {
  Common: 'Común', Uncommon: 'Poco común', Rare: 'Raro', Legendary: 'Legendario',
};

export const TYPE_ES = {
  warframe: 'Warframe', weapon: 'Arma', companion: 'Compañero', archwing: 'Archwing',
  Primary: 'Primaria', Secondary: 'Secundaria', Melee: 'Cuerpo a cuerpo',
  Sentinels: 'Centinela', Pets: 'Mascota', 'Arch-Gun': 'Arch-cañón',
  'Arch-Melee': 'Arch-cuerpo a cuerpo', Archwing: 'Archwing',
  'Warframe Arcane': 'Arcano de Warframe', 'Primary Arcane': 'Arcano primario',
  'Secondary Arcane': 'Arcano secundario', 'Melee Arcane': 'Arcano cuerpo a cuerpo',
  'Operator Arcane': 'Arcano de Operador', 'Amp Arcane': 'Arcano de Amplificador',
  'Kitgun Arcane': 'Arcano de Kitgun', 'Zaw Arcane': 'Arcano de Zaw',
  rifle: 'Rifle', pistol: 'Pistola', shotgun: 'Escopeta', melee: 'Cuerpo a cuerpo',
  archgun: 'Arch-cañón', kitgun: 'Kitgun', zaw: 'Zaw', companion_weapon: 'Arma de compañero',
};

export function translatePart(name, es) {
  if (!name) return '';
  const direct = es ? es(name) : null;
  if (direct && direct !== name) return direct;
  return name
    .replace(/\bBlueprint\b/i, 'Plano')
    .replace(/\bNeuroptics\b/i, 'Neurópticas')
    .replace(/\bChassis\b/i, 'Chasis')
    .replace(/\bSystems\b/i, 'Sistemas')
    .replace(/\bBarrel\b/i, 'Cañón')
    .replace(/\bReceiver\b/i, 'Receptor')
    .replace(/\bStock\b/i, 'Culata')
    .replace(/\bBlade\b/i, 'Hoja')
    .replace(/\bHilt\b/i, 'Empuñadura')
    .replace(/\bHandle\b/i, 'Mango')
    .replace(/\bHead\b/i, 'Cabeza')
    .replace(/\bUpper Limb\b/i, 'Pala superior')
    .replace(/\bLower Limb\b/i, 'Pala inferior')
    .replace(/\bGrip\b/i, 'Empuñadura')
    .replace(/\bString\b/i, 'Cuerda')
    .replace(/\bGuard\b/i, 'Guarda')
    .replace(/\bLink\b/i, 'Eslabón')
    .replace(/\bBand\b/i, 'Banda')
    .replace(/\bBuckle\b/i, 'Hebilla')
    .replace(/\bGauntlet\b/i, 'Guantelete')
    .replace(/\bBoot\b/i, 'Bota')
    .replace(/\bPouch\b/i, 'Bolsa')
    .replace(/\bStars\b/i, 'Estrellas')
    .replace(/\bWings\b/i, 'Alas')
    .replace(/\bHarness\b/i, 'Arnés');
}

export function translateNode(w) {
  if (!w) return '';
  const m = w.match(/^(.+?)\s*\((.+?)\)$/);
  if (m) {
    const node = m[1].trim();
    const planet = PLANET_ES[m[2].trim()] || m[2].trim();
    return `${node} (${planet})`;
  }
  const parts = w.split(' · ');
  if (parts.length === 2) {
    const planet = PLANET_ES[parts[0]] || parts[0];
    return `${planet} · ${parts[1]}`;
  }
  return w;
}

// Diccionario de traducción específico para lugares y enemigos que dropean arcanos
const ARCANE_LOCATIONS_ES = {
  'Eidolon Teralyst': 'Teralyst Eidolon',
  'Eidolon Teralyst (Capture)': 'Teralyst Eidolon (Captura)',
  'Eidolon Gantulyst': 'Gantulyst Eidolon',
  'Eidolon Gantulyst (Capture)': 'Gantulyst Eidolon (Captura)',
  'Eidolon Hydrolyst': 'Hydrolyst Eidolon',
  'Eidolon Hydrolyst (Capture)': 'Hydrolyst Eidolon (Captura)',
  'Void Angel': 'Ángel del Vacío (Zariman)',
  'Ravenous Void Angel': 'Ángel del Vacío Voraz (Zariman)',
  'Thrax Centurion': 'Centurión Thrax (Zariman / Duviri)',
  'Thrax Legatus': 'Legatus Thrax (Zariman / Duviri)',
  'Duviri Static Undercroft Portal': 'Portal Estático del Subsuelo (Duviri)',
  'Duviri Static Undercroft Portal (Steel Path)': 'Portal Estático del Subsuelo (Duviri - Camino de Acero)',
  'The Fragmented Suzerain': 'El Soberano Fragmentado (Laboratorios Entrati)',
  'Mocking Whisper': 'Susurro Burlón (Laboratorios Entrati)',
  'Scathing Whisper': 'Susurro Mordaz (Laboratorios Entrati)',
  'Entrati Netracell Coffer (Level 0 - 100)': 'Arca de Celda Red Entrati (Netracells)',
  'Sister Of Parvos (Ascension Mode)': 'Hermana de Parvos (Modo Ascensión)',
  'Sister Of Parvos (Ascension Mode Steel Path)': 'Hermana de Parvos (Modo Ascensión - Camino de Acero)',
  'Arbitrations, Rotation A': 'Arbitrajes · Rotación A',
  'Arbitrations, Rotation B': 'Arbitrajes · Rotación B',
  'Arbitrations, Rotation C': 'Arbitrajes · Rotación C',
  'Deep Archimedea Silver Rewards': 'Arquimedea Profunda (Plata)',
  'Deep Archimedea Gold Rewards': 'Arquimedea Profunda (Oro)',
  'Deep Archimedea Legendary Rewards': 'Arquimedea Profunda (Legendario)',
  'Temporal Archimedea Silver Rewards': 'Arquimedea Temporal (Plata)',
  'Temporal Archimedea Gold Rewards': 'Arquimedea Temporal (Oro)',
  'Temporal Archimedea Legendary Rewards': 'Arquimedea Temporal (Legendario)',
};

export function translateLocation(loc) {
  if (!loc) return '';
  if (ARCANE_LOCATIONS_ES[loc]) return ARCANE_LOCATIONS_ES[loc];

  let res = loc;
  for (const [en, es] of Object.entries(PLANET_ES)) {
    res = res.replace(new RegExp(`\\b${en}\\b`, 'g'), es);
  }
  for (const [en, es] of Object.entries(MODE_ES)) {
    res = res.replace(new RegExp(`\\b${en}\\b`, 'g'), es);
  }

  return res
    .replace(/Duviri\/Endless:\s*Tier\s*(\d+)\s*\((Hard|Normal)\)/i, (_, tier, mode) => `Duviri (Circuito Infinito): Nivel ${tier} (${mode === 'Hard' ? 'Camino de Acero' : 'Normal'})`)
    .replace(/Duviri\/Endless:\s*Repeated Rewards\s*\(Hard\)/i, 'Duviri (Circuito Infinito): Recompensas Repetidas (Camino de Acero)')
    .replace(/Rotation ([ABC])/gi, 'Rotación $1')
    .replace(/Steel Path/gi, 'Camino de Acero')
    .replace(/Level\s*(\d+)\s*-\s*(\d+)/gi, 'Nivel $1-$2')
    .replace(/Isolation Vault/gi, 'Bóveda de Aislamiento')
    .replace(/Arcana Isolation Vault/gi, 'Bóveda de Aislamiento Arcana')
    .replace(/The Holdfasts \(Cavalero\)/gi, 'Los Recios (Cavalero)')
    .replace(/The Quills/gi, 'Los Plumas (Cetus)')
    .replace(/Vox Solaris/gi, 'Vox Solaris (Fortuna)')
    .replace(/Solaris United/gi, 'Solaris Unidos (Fortuna)')
    .replace(/Ostron \(Hok\)/gi, 'Ostron (Hok - Cetus)')
    .replace(/The Descendia:\s*Infernum\s*(\d+)/gi, 'La Descendia: Infierno $1')
    .replace(/Triple Arcane Rewards/gi, 'Recompensa Triple de Arcanos')
    .replace(/Arcane Rewards/gi, 'Recompensas de Arcanos')
    .replace(/Skirmish/gi, 'Escaramuza')
    .replace(/Caches/gi, 'Alijos');
}

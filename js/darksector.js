// Guía curada de los mejores puntos de farmeo por recurso con datos de Sectores Oscuros (Dark Sector Survival)
// y bonificaciones de probabilidad de hallazgo de recursos (+10% a +35%).

export const DARK_SECTOR_SURVIVALS = [
  { planet: 'Ceres', node: 'Gabii', bonus: '+35%', faction: 'Infestados', keyDrops: ['Célula orokin', 'Nanoesporas', 'Placas de aleación'], tip: '🔥 EL MEJOR NODO para Células Orokin del juego. Enemigos débiles, oleadas continuas y +35% de drop nativo. Con Khora (Pilfering Strangledome) o Nekros (Desecrate) en pasillos estrechos.' },
  { planet: 'Saturno', node: 'Piscinas', bonus: '+20%', faction: 'Infestados', keyDrops: ['Célula orokin', 'Plástidos', 'Nanoesporas'], tip: 'Excelente alternativa para Células Orokin + Plástidos en Saturno.' },
  { planet: 'Júpiter', node: 'Cameria', bonus: '+20%', faction: 'Infestados', keyDrops: ['Sensores neuronales', 'Restos', 'Circuitos'], tip: 'El mejor punto de supervivencia para Sensores neuronales con bonificación de recursos.' },
  { planet: 'Urano', node: 'Ur / Ophelia', bonus: '+30% (Assur)', faction: 'Infestados / Grineer', keyDrops: ['Telurio', 'Polímero', 'Galio'], tip: 'En Ophelia (Supervivencia Grineer con Archwing activado) o Assur (Sector Oscuro +30%) cae Telurio en gran cantidad.' },
  { planet: 'Tierra', node: 'Coba / Mariana', bonus: '+15%', faction: 'Infestados', keyDrops: ['Neurodos', 'Ferrita', 'Rubedo'], tip: 'Para Neurodos en el juego temprano/medio. En Lua (Plato o Yuhed) caen aún más de los Conculysts/Batalysts.' },
  { planet: 'Marte', node: 'Wahiba', bonus: '+20%', faction: 'Infestados', keyDrops: ['Mórficos', 'Restos'], tip: 'Supervivencia temprana con +20% de probabilidad de drop.' },
  { planet: 'Fobos', node: 'Zeugma', bonus: '+25%', faction: 'Infestados', keyDrops: ['Plástidos', 'Mórficos'], tip: 'Supervivencia infestado con +25% de recursos, ideal para Plástidos en inicio.' },
  { planet: 'Sedna', node: 'Amarna', bonus: '+30%', faction: 'Infestados', keyDrops: ['Rubedo', 'Placas de aleación'], tip: 'Alto nivel, ideal para combinar con Camino de Acero (+100% drop).' },
  { planet: 'Eris', node: 'Zabala', bonus: '+30%', faction: 'Infestados', keyDrops: ['Muestra de mutágeno', 'Plástidos', 'Nanoesporas'], tip: 'El mejor lugar para farmear Muestras de Mutágeno de Clan (Hema) y Plástidos con +30% de bonificación.' },
];

export const RESOURCE_GUIDE = {
  'Orokin Cell': {
    nameEs: 'Célula orokin',
    best: 'Ceres · Gabii (Supervivencia del Sector Oscuro)',
    bonus: '+35% probabilidad de recursos (Sector Oscuro)',
    faction: 'Infestados',
    alt: 'Saturno · Piscinas (Supervivencia +20%) o Saturno · Tethys (General Sargas Ruk rápido)',
    loadout: 'Khora con "Domo estrangulador ladrón", Nekros con "Despojar", Potenciador de probabilidad de recursos + Bendición de Relay en un cuello de botella o pasillo estrecho.',
    steelPath: 'En Camino de Acero (Steel Path) Gabii suma otro +100% de drop rate, generando docenas de células por sesión.',
  },
  'Neurodes': {
    nameEs: 'Neurodos',
    best: 'Tierra · Mariana / Tikal o Lua · Plato (Romper contenedores y Centinelas)',
    bonus: '+15% en Tikal (Sector Oscuro)',
    faction: 'Infestados / Grineer / Sentients',
    alt: 'Deriva Cambion (Deimos) destruyendo pústulas y tumores infecciosos.',
    loadout: 'Nekros o Khora con Smeeta Kavat.',
  },
  'Argon Crystal': {
    nameEs: 'Cristal de Argón',
    best: 'Vacío (Void) · Mot (Supervivencia) o Teshub / Hepit (Exterminio / Captura)',
    bonus: 'Decae a las 24 horas',
    faction: 'Corruptos',
    alt: 'Romper todos los contenedores y Depósitos de Pegmatita de Argón con Xaku / Limbo (Cataclismo de rango máximo).',
    loadout: 'Xaku o Limbo con rango máximo y mod Ladrón Maestro / Vacío para limpiar salas en segundos.',
  },
  'Neural Sensors': {
    nameEs: 'Sensores neuronales',
    best: 'Júpiter · Cameria (Supervivencia del Sector Oscuro)',
    bonus: '+20% probabilidad de recursos (Sector Oscuro)',
    faction: 'Infestados',
    alt: 'Júpiter · Themisto (Matar a Alad V en 1 minuto) o Laboratorios de Entrati en Deimos.',
    loadout: 'Titania o Wukong para rush a Alad V, o Nekros en Cameria.',
  },
  'Plastids': {
    nameEs: 'Plástidos',
    best: 'Urano · Ophelia o Saturno · Piscinas (Supervivencia)',
    bonus: '+20% en Piscinas (Sector Oscuro)',
    faction: 'Infestados / Grineer',
    alt: 'Fobos · Zeugma (+25% Sector Oscuro) para niveles bajos, Eris · Zabala (+30%) para nivel alto.',
    loadout: 'Nekros + Khora + Speed Nova para acelerar oleadas de infestados.',
  },
  'Tellurium': {
    nameEs: 'Telurio',
    best: 'Urano · Ophelia (Supervivencia submarina Grineer)',
    bonus: 'Requiere misiones de Archwing o sumergibles',
    faction: 'Grineer',
    alt: 'Fortaleza Kuva · Supervivencia (Taveuni) o misiones de Railjack en Próxima.',
    loadout: 'Khora con Domo estrangulador ladrón + Nekros en una sala cerrada cerca del agua.',
  },
  'Polymer Bundle': {
    nameEs: 'Paquete de polímero',
    best: 'Urano · Assur (Sector Oscuro) u Ophelia',
    bonus: '+30% probabilidad de recursos en Assur',
    faction: 'Infestados',
    alt: 'Mercurio · Apollodorus o Venus · Malva (+10%).',
    loadout: 'Nekros + Pilfering Khora + Potenciador de recursos.',
  },
  'Mutagen Sample': {
    nameEs: 'Muestra de mutágeno',
    best: 'Deimos · Deriva Cambion o Eris · Zabala (Sector Oscuro)',
    bonus: '+30% probabilidad de recursos en Zabala',
    faction: 'Infestados',
    alt: 'Supervivencia en Deimos (Horend o Terrorem).',
    loadout: 'Indispensable para la investigación del arma Hema en el Dojo.',
  },
};


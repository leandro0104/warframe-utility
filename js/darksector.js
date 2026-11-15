// Guía curada de los mejores puntos de farmeo por recurso con datos de Sectores Oscuros (Dark Sector Survival)
// y bonificaciones de probabilidad de hallazgo de recursos (+10% a +35%).

export const DARK_SECTOR_SURVIVALS = [
  { planet: 'Ceres', node: 'Gabii', bonus: '+35%', faction: 'Infestados', keyDrops: ['Célula orokin', 'Nanoesporas', 'Placas de aleación'], tip: '🔥 EL MEJOR NODO para Células Orokin del juego. Enemigos débiles, oleadas continuas y +35% de drop nativo. Con Khora (Pilfering Strangledome) o Nekros (Desecrate) en pasillos estrechos.' },
  { planet: 'Saturno', node: 'Piscinas', bonus: '+20%', faction: 'Infestados', keyDrops: ['Célula orokin', 'Plástidos', 'Nanoesporas'], tip: 'Excelente alternativa para Células Orokin + Plástidos en Saturno.' },
  { planet: 'Júpiter', node: 'Cameria', bonus: '+20%', faction: 'Infestados', keyDrops: ['Sensores neuronales', 'Hexenón', 'Circuitos'], tip: 'El mejor punto de supervivencia para Sensores neuronales y Hexenón con bonificación de recursos.' },
  { planet: 'Urano', node: 'Assur / Ophelia', bonus: '+30% (Assur)', faction: 'Infestados / Grineer', keyDrops: ['Telurio', 'Polímero', 'Galio'], tip: 'En Assur (+30% Sector Oscuro) u Ophelia (Supervivencia Grineer submarina) caen Telurio, Galio y Polímero en masa.' },
  { planet: 'Tierra', node: 'Coba / Tikal', bonus: '+15%', faction: 'Infestados', keyDrops: ['Neurodos', 'Ferrita', 'Rubedo'], tip: 'Para Neurodos y Ferrita en el juego temprano/medio. En Lua (Plato) caen aún más de los Centinelas Conculysts/Batalysts.' },
  { planet: 'Marte', node: 'Wahiba', bonus: '+20%', faction: 'Infestados', keyDrops: ['Mórficos', 'Restos'], tip: 'Supervivencia temprana con +20% de probabilidad de drop para Mórficos y Restos.' },
  { planet: 'Fobos', node: 'Zeugma', bonus: '+25%', faction: 'Infestados', keyDrops: ['Plástidos', 'Mórficos'], tip: 'Supervivencia infestado con +25% de recursos, ideal para Plástidos en inicio de mapa estelar.' },
  { planet: 'Sedna', node: 'Amarna', bonus: '+30%', faction: 'Infestados', keyDrops: ['Rubedo', 'Placas de aleación'], tip: 'Alto nivel, ideal para combinar con Camino de Acero (+100% drop).' },
  { planet: 'Eris', node: 'Zabala', bonus: '+30%', faction: 'Infestados', keyDrops: ['Muestra de mutágeno', 'Plástidos', 'Nanoesporas'], tip: 'El mejor lugar para farmear Muestras de Mutágeno de Clan (Hema) y Plástidos con +30% de bonificación.' },
];

export const RESOURCE_GUIDE = {
  // ==================== ENDO ====================
  'Endo': {
    nameEs: 'Endo',
    best: 'Sedna · Vodyanoi (Arena de Rathuum Nivel 85)',
    bonus: 'Hasta 3.000 a 4.000 Endo por partida de 2 minutos',
    faction: 'Grineer (Verdugos Rathuum)',
    alt: 'Arbitrajes (Alertas cada hora con 1.500 Endo y Esculturas Ayatan) o Contratos de nivel 5 en Zariman y Sanctum Anatomica (4.000 Endo).',
    loadout: 'Composición meta: 1x Khora (Domo estrangulador ladrón), 1x Nidus (Larva para succionar a los enemigos en el punto de muerte), 2x Nekros (Despojar) con armas cortantes puras como Ripkas (Amalgama) para trocear los cuerpos.',
    steelPath: 'En Camino de Acero la tasa de orbes de Endo aumenta aún más gracias al multiplicador de recursos y mayor densidad enemiga.',
  },

  // ==================== CÉLULAS OROKIN ====================
  'Orokin Cell': {
    nameEs: 'Célula orokin',
    best: 'Ceres · Gabii (Supervivencia del Sector Oscuro)',
    bonus: '+35% probabilidad de recursos (Sector Oscuro)',
    faction: 'Infestados',
    alt: 'Saturno · Piscinas (Supervivencia +20%) o Saturno · Tethys (General Sargas Ruk rápido con Titania).',
    loadout: 'Khora con "Domo estrangulador ladrón", Nekros con "Despojar", Potenciador de probabilidad de recursos + Bendición de Relay en un cuello de botella o pasillo estrecho.',
    steelPath: 'En Camino de Acero (Steel Path) Gabii suma otro +100% de drop rate, generando docenas de células por sesión.',
  },

  // ==================== NEURODOS ====================
  'Neurodes': {
    nameEs: 'Neurodos',
    best: 'Tierra · Mariana / Tikal o Lua · Plato (Romper contenedores y Centinelas)',
    bonus: '+15% en Tikal (Sector Oscuro)',
    faction: 'Infestados / Grineer / Sentients',
    alt: 'Deriva Cambion (Deimos) destruyendo pústulas y tumores infecciosos, o Lua (Plato) matando Conculysts.',
    loadout: 'Nekros o Khora con Smeeta Kavat.',
  },

  // ==================== CRISTAL DE ARGÓN ====================
  'Argon Crystal': {
    nameEs: 'Cristal de Argón',
    best: 'Vacío (Void) · Mot (Supervivencia) o Teshub / Hepit (Exterminio / Captura)',
    bonus: 'Decae a las 24 horas (Farmear sólo cuando se necesite)',
    faction: 'Corruptos',
    alt: 'Romper todos los contenedores y Depósitos de Pegmatita de Argón con Xaku o Limbo (Cataclismo de rango máximo y Ladrón Maestro).',
    loadout: 'Xaku o Limbo con rango máximo y mod Ladrón Maestro / Vacío para limpiar salas en segundos.',
  },

  // ==================== GALIO ====================
  'Gallium': {
    nameEs: 'Galio',
    best: 'Urano · Assur (Sector Oscuro +30%) u Ophelia (Supervivencia)',
    bonus: '+30% probabilidad de recursos en Assur',
    faction: 'Infestados / Grineer Sumergible',
    alt: 'Marte · War (Matar al Teniente Lech Kril rápido en 1 minuto con Titania o Volt) o Fobos · Iliad (El Sargento).',
    loadout: 'Khora con Domo estrangulador ladrón + Nekros en Assur. Además de Galio obtendrás Telurio y Paquetes de Polímero en la misma partida.',
    steelPath: 'En Camino de Acero en Assur el drop se multiplica x2, asegurando 15 a 30 de Galio en 20 minutos.',
  },

  // ==================== MÓRFICOS ====================
  'Morphics': {
    nameEs: 'Mórficos',
    best: 'Marte · Wahiba (Supervivencia del Sector Oscuro)',
    bonus: '+20% probabilidad de recursos (Sector Oscuro)',
    faction: 'Infestados',
    alt: 'Mercurio · Apollodorus, Fobos · Zeugma (+25%) o matar a Capitán Vor / Lech Kril.',
    loadout: 'Nekros con Despojar o Khora con Domo en un pasillo cerrado.',
  },

  // ==================== SENSORES NEURONALES ====================
  'Neural Sensors': {
    nameEs: 'Sensores neuronales',
    best: 'Júpiter · Cameria (Supervivencia del Sector Oscuro)',
    bonus: '+20% probabilidad de recursos (Sector Oscuro)',
    faction: 'Infestados',
    alt: 'Júpiter · Themisto (Matar a Alad V en 1 minuto) o Laboratorios de Entrati en Deimos.',
    loadout: 'Titania o Wukong para rush directo a Alad V, o Nekros en Cameria para farm pasivo.',
  },

  // ==================== MÓDULO DE CONTROL ====================
  'Control Module': {
    nameEs: 'Módulo de control',
    best: 'Vacío (Void) · Mot (Supervivencia) o Teshub / Hepit (Exterminio / Captura)',
    bonus: 'Tasa de drop nativa extremadamente alta en el Vacío',
    faction: 'Corruptos',
    alt: 'Europa · Baal o Neptuno · Despina.',
    loadout: 'Cualquier warframe rápido; en 10 minutos de supervivencia o 3 capturas rápidas en el Vacío conseguirás 50 a 100+ módulos sin esfuerzo.',
  },

  // ==================== TELURIO ====================
  'Tellurium': {
    nameEs: 'Telurio',
    best: 'Urano · Ophelia (Supervivencia submarina Grineer)',
    bonus: 'Requiere misiones de Archwing o sumergibles',
    faction: 'Grineer',
    alt: 'Fortaleza Kuva · Supervivencia (Taveuni) o misiones de Railjack en Próxima.',
    loadout: 'Khora con Domo estrangulador ladrón + Nekros en una sala cerrada cerca del agua.',
  },

  // ==================== PLÁSTIDOS ====================
  'Plastids': {
    nameEs: 'Plástidos',
    best: 'Saturno · Piscinas (Sector Oscuro +20%) o Urano · Ophelia',
    bonus: '+20% en Piscinas (Sector Oscuro)',
    faction: 'Infestados / Grineer',
    alt: 'Fobos · Zeugma (+25% Sector Oscuro) para niveles bajos, Eris · Zabala (+30%) para nivel alto.',
    loadout: 'Nekros + Khora + Speed Nova para acelerar oleadas de infestados.',
  },

  // ==================== PAQUETE DE POLÍMERO ====================
  'Polymer Bundle': {
    nameEs: 'Paquete de polímero',
    best: 'Urano · Assur (Sector Oscuro +30%) u Ophelia',
    bonus: '+30% probabilidad de recursos en Assur',
    faction: 'Infestados',
    alt: 'Mercurio · Apollodorus o Venus · Malva (+10%).',
    loadout: 'Nekros + Pilfering Khora + Potenciador de recursos en un rincón estrecho.',
  },

  // ==================== RUBEDO ====================
  'Rubedo': {
    nameEs: 'Rubedo',
    best: 'Sedna · Amarna (Sector Oscuro +30%) o Urano · Assur',
    bonus: '+30% probabilidad de recursos en Sedna',
    faction: 'Infestados',
    alt: 'Tierra · Coba (Defensa de 15 oleadas) o Fobos · Zeugma (+25%).',
    loadout: 'Nekros con Despojar + Pilfering Khora acelerando con Speed Nova.',
  },

  // ==================== FERRITA ====================
  'Ferrite': {
    nameEs: 'Ferrita',
    best: 'Tierra · Coba o Tikal (Sector Oscuro +15%)',
    bonus: '+15% probabilidad de recursos (Sector Oscuro)',
    faction: 'Infestados / Grineer',
    alt: 'Mercurio · Apollodorus o Vacío · Teshub.',
    loadout: 'Khora o Nekros en defensas de oleadas continuas.',
  },

  // ==================== NANOESPORAS ====================
  'Nano Spores': {
    nameEs: 'Nanoesporas',
    best: 'Deimos · Deriva Cambion o Eris · Zabala (+30%)',
    bonus: '+30% probabilidad de recursos en Zabala',
    faction: 'Infestados',
    alt: 'Saturno · Piscinas (+20%) o Ceres · Gabii (+35%).',
    loadout: 'Nekros con Despojar; genera cientos de miles de nanoesporas en minutos sin esfuerzo.',
  },

  // ==================== RESTOS ====================
  'Salvage': {
    nameEs: 'Restos',
    best: 'Marte · Wahiba (Sector Oscuro +20%) o Júpiter · Cameria (+20%)',
    bonus: '+20% probabilidad de recursos',
    faction: 'Infestados',
    alt: 'Sedna · Amarna (+30%) o contratos en Cetus.',
    loadout: 'Khora con Domo o Nekros.',
  },

  // ==================== PLACAS DE ALEACIÓN ====================
  'Alloy Plate': {
    nameEs: 'Placas de aleación',
    best: 'Ceres · Gabii (Sector Oscuro +35%)',
    bonus: '+35% probabilidad de recursos (Sector Oscuro)',
    faction: 'Infestados',
    alt: 'Sedna · Amarna (+30%), Venus · Malva (+10%) o Júpiter · Cameria.',
    loadout: 'Farmea al mismo tiempo que Células Orokin en Gabii.',
  },

  // ==================== CIRCUITOS ====================
  'Circuits': {
    nameEs: 'Circuitos',
    best: 'Venus · Malva (Sector Oscuro +10%) o Júpiter · Cameria (+20%)',
    bonus: '+20% probabilidad en Cameria',
    faction: 'Infestados',
    alt: 'Ceres · Gabii o contratos de Fortuna en los Valles del Orbe.',
    loadout: 'Nekros + Khora en pasillos estrechos.',
  },

  // ==================== OXIO ====================
  'Oxium': {
    nameEs: 'Oxio',
    best: 'Júpiter · Io (Defensa) o Ganímedes (Disrupción)',
    bonus: 'Aparición constante de Halcones de Oxio (Oxium Ospreys)',
    faction: 'Corpus',
    alt: 'Neptuno · Galatea (Captura al objetivo y quédate eliminando oleadas infinitas de Halcones).',
    loadout: '⚠️ IMPORTANTE: Destruye los Halcones antes de que se autodestruyan contra ti, o no soltarán el oxio. Khora (Domo) o Vauban los inmovilizan de forma segura.',
  },

  // ==================== CRIÓTICA ====================
  'Cryotic': {
    nameEs: 'Criótica',
    best: 'Tierra · Everest (Excavación nivel bajo) o Plutón · Hieracon (Excavación nivel alto)',
    bonus: '100 Criótica fija por cada excavador completado al 100%',
    faction: 'Grineer (Everest) / Infestados (Hieracon)',
    alt: 'Europa · Valac o Fisuras del Vacío de tipo Excavación.',
    loadout: 'Frost con Globo de Nieve, Limbo con Cataclismo o Khora para defender excavadores. Potenciador de recursos (Resource Booster) duplica a 200 por excavador.',
  },

  // ==================== HEXENÓN ====================
  'Hexenon': {
    nameEs: 'Hexenón',
    best: 'Júpiter · Cameria (Sector Oscuro Supervivencia) o Io (Defensa)',
    bonus: '+20% probabilidad de recursos en Cameria',
    faction: 'Infestados / Corpus Gas City',
    alt: 'Júpiter · Ganímedes (Disrupción, los Demoledores tienen alto drop).',
    loadout: 'Nekros + Pilfering Khora en el tileset de la Ciudad de Gas de Júpiter.',
  },

  // ==================== ESTELA ====================
  'Stela': {
    nameEs: 'Estela',
    best: 'Deimos · Persto (Supervivencia) o Cambire (Alquimia en Laboratorios de Albrecht)',
    bonus: 'Drop nativo de Sarcófagos de Alquimia y enemigos Murmur',
    faction: 'El Murmullo (Murmur)',
    alt: 'Contratos de Cavia en el Sanctum Anatomica o eliminando al Susurro Burlón / Susurro Mordaz.',
    loadout: 'Nekros con Despojar + Khora en los pasillos de los Laboratorios de Albrecht. Rompe todas las cápsulas fosilizadas de Murmullo.',
    steelPath: 'En Camino de Acero la densidad de enemigos Murmur y Necramechs se triplica, aumentando radicalmente la cantidad de Estela por minuto.',
  },

  // ==================== LINTERNA ENTRATI ====================
  'Entrati Lanthorn': {
    nameEs: 'Linterna Entrati',
    best: 'Zariman · Halako Perimeter o The Greenway (Rompiendo contenedores y cajas)',
    bonus: 'Drop de contenedores de Zariman y Necramechs en Albrecht Labs',
    faction: 'Zariman / Murmur',
    alt: 'Laboratorios de Albrecht en Deimos o enviando Extractores de Recursos a la Zariman desde la app móvil.',
    loadout: 'Xaku o Limbo con rango de habilidad máximo para reventar todas las cajas del mapa en un segundo, o Smeeta Kavat con Nekros.',
  },

  // ==================== KUVA ====================
  'Kuva': {
    nameEs: 'Kuva',
    best: 'Fortaleza Kuva · Taveuni (Supervivencia Kuva con cosechadores)',
    bonus: 'Kuva garantizado continuo cada 90 segundos',
    faction: 'Grineer Kuva',
    alt: 'Sifones e Inundaciones de Kuva (Alertas), Incursiones diarias, o comprar 35.000 Kuva semanal en Iron Wake (Palladino) y Yonta (Zariman).',
    loadout: 'Nekros para mantener orbes de soporte vital de sobra y activar todos los catalizadores Kuva sin riesgo de falta de oxígeno.',
  },

  // ==================== ESENCIA DE ACERO ====================
  'Steel Essence': {
    nameEs: 'Esencia de acero',
    best: 'Incursiones diarias de Camino de Acero (5 misiones = 25 Esencias fijas diarias)',
    bonus: '5 Esencias garantizadas por cada misión diaria de SP',
    faction: 'Todas las facciones',
    alt: 'Supervivencias largas en Camino de Acero matando Acólitos (cada uno suelta 2 Esencias) o contratos de Cavia en SP.',
    loadout: 'Revenant o Dante para invulnerabilidad total contra acólitos. Potenciador de recursos duplica las esencias de 2 a 4 por acólito.',
  },

  // ==================== MUESTRA DE MUTÁGENO ====================
  'Mutagen Sample': {
    nameEs: 'Muestra de mutágeno',
    best: 'Deimos · Deriva Cambion o Eris · Zabala (Sector Oscuro)',
    bonus: '+30% probabilidad de recursos en Zabala',
    faction: 'Infestados',
    alt: 'Supervivencias en Deimos (Horend o Terrorem).',
    loadout: 'Indispensable para la investigación del arma Hema en el Dojo. Nekros + Pilfering Khora en pasillos estrechos.',
  },

  // ==================== VESTIGIOS DEL VACÍO ====================
  'Void Traces': {
    nameEs: 'Vestigios del Vacío',
    best: 'Cualquier misión de Fisura del Vacío recogiendo 10 reactantes',
    bonus: 'Otorga entre 6 y 30 vestigios por fisura (duplicable con Potenciador)',
    faction: 'Corruptos',
    alt: 'Fisuras de Camino de Acero (+100% booster aditivo) o cuando compañeros de escuadra eligen tu recompensa (+5 vestigios c/u).',
    loadout: 'Smeeta Kavat (el buff Encanto puede multiplicar los vestigios hasta x2, x4 o x8 al recoger el décimo reactante).',
  },

  // ==================== EXTRACTO DE NITAIN ====================
  'Nitain Extract': {
    nameEs: 'Extracto de nitain',
    best: 'Tienda de Onda Nocturna (Nightwave Store)',
    bonus: '15 Créditos Nightwave por paquete de 5 unidades fijas',
    faction: 'Onda Nocturna (Nora Night)',
    alt: 'Alijos de Sabotaje (probabilidad bajísima del 1%) o eventos tácticos de Regalo de Lotus.',
    loadout: 'Completa desafíos semanales de Nora Night para obtener créditos y canjear paquetes de Nitain directamente en la tienda.',
  },

  // ==================== PLANO DE FORMA ====================
  'Forma Blueprint': {
    nameEs: 'Plano de Forma',
    best: 'Fisuras del Vacío de reliquias Lith / Meso / Neo en Captura o Exterminio rápido',
    bonus: 'Disponible como recompensa común o poco común en la mayoría de reliquias',
    faction: 'Corruptos',
    alt: 'Misiones de Incursión, cofres de Lua / Deriva Cambion o tienda del mercado (paquete de 3 Formas listas).',
    loadout: 'Volt, Titania o Gauss para completar fisuras de captura en menos de 90 segundos.',
  },

  // ==================== INYECTOR DE DETONITE ====================
  'Detonite Injector': {
    nameEs: 'Inyector de detonite',
    best: 'Invasiones (Invasions) apoyando a los Grineer',
    bonus: 'Recompensa de 1 a 3 inyectores completos al terminar 3 misiones',
    faction: 'Invasiones Grineer vs Corpus',
    alt: 'Planos reutilizables en el Laboratorio Químico del Dojo del Clan Tenno.',
    loadout: 'Titania o Wukong para completar las 3 misiones de invasión rápidamente.',
  },

  // ==================== FIELDRON ====================
  'Fieldron': {
    nameEs: 'Fieldron',
    best: 'Invasiones (Invasions) apoyando a los Corpus',
    bonus: 'Recompensa de 1 a 3 Fieldrons completos al terminar 3 misiones',
    faction: 'Invasiones Corpus vs Grineer',
    alt: 'Planos reutilizables en el Laboratorio de Energía del Dojo del Clan Tenno.',
    loadout: 'Completa 3 carreras rápidas de invasión Corpus vs Grineer.',
  },

  // ==================== ISOS ====================
  'Isos': {
    nameEs: 'Isos',
    best: 'Próxima de la Tierra o Próxima de Venus (Misiones de Railjack)',
    bonus: 'Drop abundante destruyendo cazas y naves tripuladas',
    faction: 'Grineer / Corpus Railjack',
    alt: 'Romper contenedores en puntos de interés y fortalezas de asteroides en Railjack.',
    loadout: 'Nave Railjack con Seeker Volley para limpiar flotas de cazas en segundos.',
  },

  // ==================== PIROL ====================
  'Pyrol': {
    nameEs: 'Pirol',
    best: 'Llanuras de Eidolon (Cetus) · Minería en cuevas o derrotando al Tusk Thumper Doma',
    bonus: 'Veta de mineral roja en cuevas de Cetus',
    faction: 'Llanuras de Cetus',
    alt: 'Contratos de nivel 1 y 2 en Cetus o rompiendo cajones Grineer.',
    loadout: 'Taladro de plasma Sunpoint con silenciador en cuevas al norte de Cetus, o Nekros eliminando al Tusk Thumper Doma.',
  },
};

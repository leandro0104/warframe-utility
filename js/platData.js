// Datos de la Guía de Platino Rápido (Métodos y Precios Meta Actualizados)

export const PLAT_CATEGORIES = [
  { id: 'routes', label: '⭐ Rutas por Nivel', desc: 'Los mejores métodos según tu nivel de juego y equipamiento actual.' },
  { id: 'mods', label: '🪙 Mods de Alta Demanda', desc: 'Los mods que se venden en minutos: Corruptos, Aumentos, Galvanizados y Prime.' },
  { id: 'primes', label: '💎 Sets & Basura Prime', desc: 'Sets completos más buscados y cómo vender Prime Junk para Baro Ki’Teer.' },
  { id: 'arcanes', label: '🔮 Arcanos Cotizados', desc: 'Desde Energizar Arcano en Eidolons y Vosfor hasta Zariman y Sanctum.' },
  { id: 'special', label: '⚔️ Necramechs & Liches', desc: 'Voidrig para la Nueva Guerra, partes Vandal y comercio de armas Kuva/Tenet.' },
  { id: 'tips', label: '💡 Consejos de Venta Rápida', desc: 'Reglas de oro de warframe.market para vender sin perder tiempo en el chat.' },
];

export const PLAT_ROUTES = [
  {
    level: 'Principiante',
    badgeClass: 'ok',
    title: 'Bóvedas Orokin en Deimos (Mods Corruptos)',
    potential: '80 a 140 pl / hora',
    location: 'Deimos · Horend (Captura) o Terrorem (Supervivencia)',
    gear: 'Titania, Wukong o Limbo con las 4 Llaves de Dragón equipadas en la rueda de consumibles',
    desc: 'Es el mejor método sin requisitos de nivel alto del juego. Las 4 llaves reducen tu escudo, velocidad, daño y salud, pero en misiones de Deimos de nivel bajo se completan en 1-2 minutos. Al abrir la bóveda obtienes un mod corrupto garantizado.',
    items: [
      { name: 'Rabia Ciega (Blind Rage)', slug: 'blind_rage', estPl: '15 – 25 pl (100 pl R10)', note: 'Fuerza extrema. Venta inmediata en minutos.' },
      { name: 'Intolerante (Narrow Minded)', slug: 'narrow_minded', estPl: '18 – 25 pl (110 pl R10)', note: 'Duración máxima. Indispensable para decenas de Warframes.' },
      { name: 'Fortaleza Transitoria (Transient Fortitude)', slug: 'transient_fortitude', estPl: '15 – 22 pl (95 pl R10)', note: 'Fuerza sin gran pérdida de duración.' },
      { name: 'Ampliado (Overextended)', slug: 'overextended', estPl: '15 – 22 pl (90 pl R10)', note: 'Rango máximo para habilidades de área.' },
      { name: 'Experiencia Fugaz (Fleeting Expertise)', slug: 'fleeting_expertise', estPl: '15 – 20 pl', note: 'Eficiencia de habilidad para nukers.' },
      { name: 'Retardo Crítico (Critical Delay)', slug: 'critical_delay', estPl: '15 – 25 pl', note: 'Probabilidad crítica esencial para rifles primarios.' },
      { name: 'Aceleración Vil (Vile Acceleration)', slug: 'vile_acceleration', estPl: '15 – 20 pl', note: 'Cadencia de fuego sin retroceso excesivo.' }
    ],
    strategy: 'Únete a partidas o hazlas en solitario con Titania o Wukong (que ignoran las penalizaciones de velocidad). En 1 hora sacas de 10 a 15 llaves. Si te sobran créditos y Endo, maxearlos a rango 10 quintuplica su precio de 20 pl a 100+ pl.'
  },
  {
    level: 'Principiante',
    badgeClass: 'ok',
    title: 'Aumentos de Sindicatos (Ganancia Pasiva Diaria)',
    potential: '30 a 50 pl / día pasivo',
    location: 'Cualquier misión normal ganando afinidad para tus sindicatos aliados',
    gear: 'Cualquier Warframe con el emblema de tu Sindicato equipado',
    desc: 'Cada día acumulas reputación jugando cualquier modo. Con 25.000 puntos de reputación compras 1 mod de aumento de Warframe. Con 3 sindicatos aliados en rango 5, puedes generar 2 a 3 mods diarios sin esfuerzo adicional.',
    items: [
      { name: 'Domo estrangulador robador (Pilfering Strangledome)', slug: 'pilfering_strangledome', estPl: '12 – 18 pl', note: 'Aumento de Khora más vendido del juego.' },
      { name: 'Látigo garra acumulativo (Accumulating Whipclaw)', slug: 'accumulating_whipclaw', estPl: '12 – 18 pl', note: 'Aumento de daño de Khora.' },
      { name: 'Despojar (Despoil)', slug: 'despoil', estPl: '10 – 15 pl', note: 'Aumento de Nekros indispensable para botín.' },
      { name: 'Vals de Mesa (Mesa\'s Waltz)', slug: 'mesas_waltz', estPl: '12 – 18 pl', note: 'Movilidad para Pacificador de Mesa.' },
      { name: 'Espada Cromática (Chromatic Blade)', slug: 'chromatic_blade', estPl: '12 – 18 pl', note: 'Aumento rey para Excalibur.' },
      { name: 'Niebla de la Sombra (Shadow Haze)', slug: 'shadow_haze', estPl: '14 – 20 pl', note: 'Aumento crítico para Sevagoth.' },
      { name: 'Guerra Eterna (Eternal War)', slug: 'eternal_war', estPl: '12 – 16 pl', note: 'Duración infinita de Grito de Guerra de Valkyr.' }
    ],
    strategy: 'Publica en warframe.market que vendes cualquier mod de aumento de tus sindicatos. Cuando alguien te compre uno, simplemente ve al repetidor, cómpralo y entrégalo al instante.'
  },
  {
    level: 'Intermedio',
    badgeClass: 'type',
    title: 'Apertura de Reliquias & Fisuras del Vacío (Sets Prime)',
    potential: '100 a 250 pl / hora',
    location: 'Fisuras de Captura, Exterminio o Supervivencia (Lith / Meso / Neo / Axi)',
    gear: 'Warframe rápido (Gauss, Volt, Titania) y escuadrón de 4 jugadores',
    desc: 'La forma más clásica y consistente de hacer platino en Warframe. Al abrir reliquias en grupo siempre tienes 4 recompensas a elegir. Juntar sets completos de Warframes y armas Prime te da precios entre 50 y 300 pl por set.',
    items: [
      { name: 'Glaive Prime Set', slug: 'glaive_prime_set', estPl: '280 – 350 pl', note: 'Arma cuerpo a cuerpo más cara y destructiva del juego.' },
      { name: 'Saryn Prime Set', slug: 'saryn_prime_set', estPl: '100 – 140 pl', note: 'La Warframe nuker más buscada.' },
      { name: 'Volt Prime Set', slug: 'volt_prime_set', estPl: '120 – 160 pl', note: 'Rey de Eidolons y velocidad.' },
      { name: 'Khora Prime Set', slug: 'khora_prime_set', estPl: '70 – 95 pl', note: 'Reina del botín y farmeo.' },
      { name: 'Gauss Prime Set', slug: 'gauss_prime_set', estPl: '65 – 85 pl', note: 'Altísima demanda constante.' },
      { name: 'Wisp Prime Set', slug: 'wisp_prime_set', estPl: '55 – 75 pl', note: 'Soporte universal meta.' },
      { name: 'Revenant Prime Set', slug: 'revenant_prime_set', estPl: '50 – 70 pl', note: 'Inmortalidad para principiantes y expertos.' },
      { name: 'Braton Prime Set', slug: 'braton_prime_set', estPl: '35 – 50 pl', note: 'Sube de valor por su versión Incarnon.' },
      { name: 'Latron Prime Set', slug: 'latron_prime_set', estPl: '50 – 70 pl', note: 'Muy cotizado por su adaptador Incarnon.' }
    ],
    strategy: 'No vendas partes sueltas: un set completo vale 30% a 50% más que la suma de sus partes. Usa "Radshares" (4 jugadores con la misma reliquia refinada a Radiante) para asegurar las partes doradas de 100 ducados.'
  },
  {
    level: 'Intermedio',
    badgeClass: 'type',
    title: 'Arbitrajes: Mods Galvanizados + Endo Ayatan',
    potential: '70 a 120 pl / hora + 20.000 Endo',
    location: 'Nodos de Alertas de Arbitraje (Rotación cada hora)',
    gear: 'Cualquier Warframe tanque o con Shield Gate (Kullervo, Revenant, Rhino, Dante)',
    desc: 'Los Arbitrajes premian con Esencia de Vitus por cada ronda completada. Con 20 esencias de Vitus compras un mod Galvanizado con los Árbitros de Hexis en cualquier repetidor. Además, llueven Esculturas Ayatan completas para llenar de Endo tus propios mods.',
    items: [
      { name: 'Difusión Galvanizada (Galvanized Diffusion)', slug: 'galvanized_diffusion', estPl: '15 – 25 pl', note: 'Disparo múltiple para secundarias. Venta permanente.' },
      { name: 'Cámara Galvanizada (Galvanized Chamber)', slug: 'galvanized_chamber', estPl: '15 – 25 pl', note: 'Disparo múltiple indispensable para rifles primarios.' },
      { name: 'Infierno Galvanizado (Galvanized Hell)', slug: 'galvanized_hell', estPl: '15 – 25 pl', note: 'Disparo múltiple esencial para escopetas.' },
      { name: 'Aptitud Galvanizada (Galvanized Aptitude)', slug: 'galvanized_aptitude', estPl: '15 – 22 pl', note: 'Multiplicador de daño por estado en rifles.' },
      { name: 'Disparo Galvanizado (Galvanized Shot)', slug: 'galvanized_shot', estPl: '15 – 22 pl', note: 'Multiplicador de daño por estado en secundarias.' },
      { name: 'Perspicacia Galvanizada (Galvanized Savvy)', slug: 'galvanized_savvy', estPl: '15 – 20 pl', note: 'Multiplicador de daño por estado en escopetas.' }
    ],
    strategy: 'En una sesión de 30 a 45 minutos de supervivencia o excavación en arbitraje acumulas 40 a 60 esencias de Vitus (= 2 a 3 mods galvanizados = 40 a 60 pl) más 3 o 4 esculturas Ayatan (10.000 a 15.000 de Endo).'
  },
  {
    level: 'Intermedio',
    badgeClass: 'type',
    title: 'Arcanos de Zariman (Chrysalith / Cavallero)',
    potential: '120 a 180 pl / semana por 15 min al día',
    location: 'Zariman del Diez-Cero (Contratos de Plumas y Voces)',
    gear: 'Cualquier Warframe para completar contratos de nivel 5 en 2-3 minutos',
    desc: 'Cavallero en Chrysalith vende los arcanos más populares del juego moderno por reputación de sindicato de Zariman. No requieren cacerías complejas ni Camino de Acero, solo hacer un par de contratos diarios rápidos.',
    items: [
      { name: 'Muda Aumentada (Molt Augmented)', slug: 'molt_augmented', estPl: '15 – 20 pl c/u (110 – 140 pl R5)', note: 'El arcano de Fuerza más usado de todo Warframe.' },
      { name: 'Eficiencia de Muda (Molt Efficiency)', slug: 'molt_efficiency', estPl: '12 – 18 pl c/u (80 – 110 pl R5)', note: 'Duración constante mientras haya escudos activos.' },
      { name: 'Fulgor de Cascadia (Cascadia Flare)', slug: 'cascadia_flare', estPl: '10 – 15 pl c/u (70 – 100 pl R5)', note: '+480% daño con secundarias al causar daño ígneo.' }
    ],
    strategy: 'Haz contratos que otorguen Plumas de Pináculo. Con 10.000 de reputación compras un arcano suelto. Junta 21 unidades para subirlo a Rango 5 (R5) y véndelo de golpe en warframe.market por 110-140 pl.'
  },
  {
    level: 'Avanzado',
    badgeClass: 'vault',
    title: 'Sanctum Anatomica: Arcanos Melee & Disolución Vosfor',
    potential: '150 a 350 pl / hora',
    location: 'Laboratorios Albrecht en Deimos / Cavia',
    gear: 'Warframe de alto daño para Camino de Acero (Dante, Saryn, Mesa, Kullervo)',
    desc: 'Los laboratorios de Albrecht son la mina de oro moderna de Warframe. Puedes farmear los codiciados arcanos de cuerpo a cuerpo (*Melee Influence, Crescendo, Duplicate*) o disolver todos los arcanos sobrantes de Acólitos en Vosfor con Loid para comprar paquetes de arcanos de Eidolon.',
    items: [
      { name: 'Influencia Melee (Melee Influence)', slug: 'melee_influence', estPl: '25 – 40 pl c/u (250 – 350 pl R5)', note: 'El arcano cuerpo a cuerpo más poderoso del meta actual.' },
      { name: 'Crescendo Melee (Melee Crescendo)', slug: 'melee_crescendo', estPl: '35 – 50 pl c/u (400 – 600 pl R5)', note: 'Combo x12 permanente. Precio altísimo.' },
      { name: 'Duplicado Melee (Melee Duplicate)', slug: 'melee_duplicate', estPl: '35 – 50 pl c/u (400 – 550 pl R5)', note: 'Duplica golpes críticos amarillos garantizados.' },
      { name: 'Fortificador Secundario (Secondary Fortifier)', slug: 'secondary_fortifier', estPl: '15 – 25 pl c/u (150 – 200 pl R5)', note: 'Roba Sobreguardia de Eximus con cada disparo.' }
    ],
    strategy: 'Disolución de Arcanos con Loid: Si tienes 50 o 100 arcanos de Acólitos de Camino de Acero que no usas, disuélvelos en Vosfor. Con 200 Vosfor compras un paquete de colección Eidolon: tienes probabilidad de sacar Energizar Arcano (50 pl cada uno) sin pisar las llanuras nocturnas.'
  },
  {
    level: 'Avanzado',
    badgeClass: 'vault',
    title: 'Cacería de Tridolon (Llanuras de Eidolon Nocturnas)',
    potential: '200 a 600 pl / noche de caza (según drops)',
    location: 'Tierra · Llanuras de Eidolon (Fase Nocturna de 50 minutos)',
    gear: 'Volt Prime (escudos eléctricos), Madurai (Contaminación del Vacío), Sniper Rubico Prime o Zenith, Necramech Voidrig',
    desc: 'Capturar la tríada de Eidolons (Teralyst, Gantulyst, Hydrolyst) otorga esquirlas de enfoque y arcanos legendarios. Un buen escuadrón hace entre 4x3 y 6x3 cazas por noche (4 a 6 tríadas completas en 50 minutos).',
    items: [
      { name: 'Energizar Arcano (Arcane Energize)', slug: 'arcane_energize', estPl: '45 – 55 pl c/u (850 – 1.100 pl R5)', note: 'El arcano más codiciado de la historia del juego.' },
      { name: 'Gracia Arcana (Arcane Grace)', slug: 'arcane_grace', estPl: '20 – 30 pl c/u (350 – 500 pl R5)', note: 'Regeneración masiva de salud para tanques.' },
      { name: 'Barrera Arcana (Arcane Barrier)', slug: 'arcane_barrier', estPl: '15 – 25 pl c/u (250 – 350 pl R5)', note: 'Recarga instantánea de escudos al recibir daño.' }
    ],
    strategy: 'Aprovecha los fines de semana o eventos donde el mercado compra sets completos de Energizar Arcano. Si te sale un solo Energizar, ya amortizaste la noche con 50 pl directos.'
  },
  {
    level: 'Avanzado',
    badgeClass: 'vault',
    title: 'Comercio de Liches Kuva & Hermanas de Parvos',
    potential: '80 a 250 pl por Lich convertido',
    location: 'Sistema Kuva / Proxima Corpus',
    gear: 'Warframe versátil para cazar murmullos y mods Réquiem en Fisuras',
    desc: 'Los jugadores pagan platino alto para comprar Liches Kuva o Hermanas de Parvos que tengan un arma con bonificación elemental alta (55% a 60%) o que posean una Efímera elemental exclusiva (ej. Efímera Venganza Tóxica o Carga Eléctrica).',
    items: [
      { name: 'Lich Kuva con Efímera Elemental', slug: 'kuva_bramma', estPl: '80 – 150 pl', note: 'Cualquier arma que venga con Efímera garantiza venta rápida.' },
      { name: 'Arma Kuva / Tenet al 55% - 60% Elemental', slug: 'kuva_zarr', estPl: '100 – 200 pl', note: 'Ahorra semanas de fusión de valencia a los compradores.' }
    ],
    strategy: 'Al derrotar al Lich en Saturno Proxima, elígelo siempre como CONVERTIR (no matar). Esto genera un objeto de intercambio en el Dojo que puedes comerciar en el bazar o publicar en warframe.market bajo la sección de Liches.'
  }
];

export const PRIME_JUNK_RATES = [
  { tier: 'Bronce (Común - 15 Ducados)', ratio: '6 partes por 6 a 10 pl', perPart: '1 a 1.5 pl', tip: 'Venta rápida masiva durante viernes de Baro.' },
  { tier: 'Plata (Poco Común - 45 Ducados)', ratio: '6 partes por 12 a 18 pl', perPart: '2 a 3 pl', tip: 'Muy buscada por coleccionistas de ducados.' },
  { tier: 'Oro (Raro - 100 Ducados)', ratio: '6 partes por 30 a 45 pl', perPart: '5 a 8 pl cada una', tip: 'Los compradores de chat pagan hasta 8 pl por cada pieza dorada para sacar ducados rápidos.' }
];

export const PLAT_TIPS = [
  {
    title: '1. Usa siempre warframe.market (No pierdas horas en el chat)',
    body: 'El chat de comercio está lleno de compradores que ofrecen 50% menos del valor real para revender. En warframe.market puedes listar todos tus artículos, poner tu estado en "Online in Game", y los compradores te enviarán susurros automáticos directamente al juego mientras tú juegas misiones.'
  },
  {
    title: '2. Pon precios 1 pl por debajo de los desconectados',
    body: 'Si el vendedor conectado más barato tiene Rabia Ciega a 20 pl, colócalo a 19 pl. Tu anuncio saldrá al tope de la lista y te llegará un susurro para comprarlo en menos de 3 minutos.'
  },
  {
    title: '3. El truco de vender Sets Completos vs Partes Sueltas',
    body: 'Vender las 4 partes de Khora Prime sueltas te dará unos 45 pl. Pero si te tomas 15 minutos en conseguir la pieza que te falta para vender el "Khora Prime Set", su precio salta a 80 pl. Los compradores pagan un sobreprecio enorme por no tener que comerciar 4 veces.'
  },
  {
    title: '4. El momento exacto de Baro Ki’Teer (Los viernes cada 14 días)',
    body: 'Guarda tus partes Prime comunes y poco comunes. El viernes que llega Baro, el chat se llena de compradores buscando "Prime Junk" con platino en mano. Es el momento donde puedes vender 50 partes de basura que no usabas y hacerte 100 pl en 10 minutos.'
  },
  {
    title: '5. Invierte tu Endo: Maxear mods a Rango 10 multiplica x5 su valor',
    body: 'Un mod corrupto como Intolerante o Rabia Ciega cuesta 20 pl a rango 0. Si juegas Arbitrajes o Vodyanoi Rathuum y tienes 30.000 de Endo, súbelo a Rango 10: pasa a valer entre 100 y 120 pl. Estás convirtiendo tu Endo en platino puro.'
  },
  {
    title: '6. El set de Necramech Voidrig para jugadores que hacen Nueva Guerra',
    body: 'Cientos de jugadores nuevos llegan al punto de la aventura "La Nueva Guerra" y se topan con el requisito obligatorio de tener un Necramech Voidrig. Para no farmear minería en Deimos durante semanas, compran el set de Voidrig por 70 a 90 pl. Fabricar sets de Voidrig es una fuente constante de platino.'
  }
];

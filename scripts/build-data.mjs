// Descarga datos públicos (WFCD warframe-items, drops.warframestat.us, warframe.market)
// y genera archivos compactos en public/data/.  Uso: npm run build-data
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const CACHE = path.join(ROOT, '.cache');
const OUT = path.join(ROOT, 'public', 'data');
fs.mkdirSync(CACHE, { recursive: true });
fs.mkdirSync(OUT, { recursive: true });

const WFCD = 'https://raw.githubusercontent.com/WFCD/warframe-items/master/data/json/';

async function get(url, name, headers = {}) {
  const file = path.join(CACHE, name);
  const fresh = fs.existsSync(file) && Date.now() - fs.statSync(file).mtimeMs < 6 * 3600e3;
  if (!fresh) {
    process.stdout.write(`↓ ${name} ... `);
    const r = await fetch(url, { headers: { 'User-Agent': 'warframe-utility', ...headers } });
    if (!r.ok) throw new Error(`${url} -> ${r.status}`);
    fs.writeFileSync(file, Buffer.from(await r.arrayBuffer()));
    console.log('ok');
  }
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}
const wfcd = (n) => get(WFCD + n + '.json', n + '.json');
const slugify = (s) => s.toLowerCase().replace(/&/g, 'and').replace(/['’]/g, '').replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');
const IMG = (n) => (n ? n : undefined);

const [market, drops, Relics, Arcanes, Warframes, Primary, Secondary, Melee, Sentinels, Pets, Mods, Resources, Archwing, ArchGun, ArchMelee, Misc] =
  await Promise.all([
    get('https://api.warframe.market/v2/items', 'market.json', { Language: 'en' }),
    get('https://drops.warframestat.us/data/all.json', 'drops.json'),
    wfcd('Relics'), wfcd('Arcanes'), wfcd('Warframes'), wfcd('Primary'), wfcd('Secondary'), wfcd('Melee'),
    wfcd('Sentinels'), wfcd('Pets'), wfcd('Mods'), wfcd('Resources'), wfcd('Archwing'), wfcd('Arch-Gun'), wfcd('Arch-Melee'), wfcd('Misc'),
  ]);

// ---------- market.json : slug -> {n, i, d, t}
const mk = {};
const nameToSlug = {};
for (const it of market.data) {
  const en = it.i18n.en;
  mk[it.slug] = { n: en.name, i: en.icon || en.thumb, d: it.ducats, t: it.tags, m: it.maxRank };
  nameToSlug[en.name.toLowerCase()] = it.slug;
}
fs.writeFileSync(path.join(OUT, 'market.json'), JSON.stringify(mk));

// ---------- catalog.json : name -> info (imágenes de WFCD)
const catalog = {};
const addCat = (arr, cat) => {
  for (const x of arr) {
    if (!x.name || !x.imageName) continue;
    if (x.name.includes('Kavat') && cat === 'Pets' && false) continue;
    catalog[x.name] = {
      img: x.imageName, cat, type: x.type, mr: x.masteryReq, prime: /Prime$| Prime /.test(x.name) || undefined,
      vaulted: x.vaulted || undefined, wiki: x.wikiaUrl, tradable: x.tradable || undefined,
      desc: x.description?.slice(0, 220),
      ...(cat === 'Warframes' ? { hp: x.health, sh: x.shield, ar: x.armor, en: x.power, spd: x.sprintSpeed, passive: x.passiveDescription, abilities: (x.abilities || []).map((a) => ({ n: a.name, d: a.description })), aura: x.aura, pol: x.polarities, rel: x.releaseDate } : {}),
      ...(['Primary', 'Secondary', 'Melee'].includes(cat)
        ? { dmg: x.totalDamage, cc: x.criticalChance, cm: x.criticalMultiplier, sc: x.procChance, fr: x.fireRate, dis: x.disposition, slot: x.slot, rel: x.releaseDate } : {}),
    };
  }
};
addCat(Warframes.filter((w) => w.category === 'Warframes'), 'Warframes');
addCat(Primary, 'Primary'); addCat(Secondary, 'Secondary'); addCat(Melee, 'Melee');
addCat(Sentinels, 'Sentinels'); addCat(Pets, 'Pets');
addCat(Archwing, 'Archwing'); addCat(ArchGun, 'Arch-Gun'); addCat(ArchMelee, 'Arch-Melee');
fs.writeFileSync(path.join(OUT, 'catalog.json'), JSON.stringify(catalog));

// ---------- índice de fuentes de obtención (drops)
const sources = {}; // nombre normalizado -> [{t, w, c, r, x}]
const norm = (s) => s.toLowerCase().replace(/^\d[\d,]*x\s+/, '').trim();
const qty = (s) => (s.match(/^(\d[\d,]*)x\s+/i) || [])[1];
const addSrc = (item, o) => { const k = norm(item); (sources[k] ||= []).push({ ...o, q: qty(item) }); };

const flattenRew = (rewards) => (Array.isArray(rewards) ? { '-': rewards } : rewards);
for (const [planet, nodes] of Object.entries(drops.missionRewards)) {
  for (const [node, m] of Object.entries(nodes)) {
    for (const [rot, list] of Object.entries(flattenRew(m.rewards))) {
      for (const r of list) addSrc(r.itemName, { t: 'M', w: `${planet} · ${node}`, mode: m.gameMode, rot: rot === '-' ? undefined : rot, c: r.chance, r: r.rarity });
    }
  }
}
for (const o of drops.transientRewards) for (const r of o.rewards) addSrc(r.itemName, { t: 'T', w: o.objectiveName, rot: r.rotation, c: r.chance, r: r.rarity });
for (const r of drops.sortieRewards) addSrc(r.itemName, { t: 'S', w: 'Sortie', c: r.chance, r: r.rarity });
for (const k of drops.keyRewards) for (const [rot, list] of Object.entries(flattenRew(k.rewards))) for (const r of list) addSrc(r.itemName, { t: 'K', w: k.keyName, rot: rot === '-' ? undefined : rot, c: r.chance, r: r.rarity });
for (const key of ['cetusBountyRewards', 'solarisBountyRewards', 'deimosRewards', 'zarimanRewards', 'entratiLabRewards', 'hexRewards']) {
  const label = { cetusBountyRewards: 'Cetus (Llanuras de Eidolon)', solarisBountyRewards: 'Fortuna (Valle Orbe)', deimosRewards: 'Deriva Cambion', zarimanRewards: 'Zariman', entratiLabRewards: 'Laboratorio Entrati', hexRewards: 'Hex / 1999' }[key];
  for (const b of drops[key] || []) for (const [rot, list] of Object.entries(flattenRew(b.rewards))) for (const r of list) addSrc(r.itemName, { t: 'B', w: `${label} · ${b.bountyLevel.trim()}`, rot: rot === '-' ? undefined : rot, x: r.stage, c: r.chance, r: r.rarity });
}
for (const e of drops.blueprintLocations) {
  for (const en of e.enemies) addSrc(e.blueprintName || e.itemName, { t: 'E', w: en.enemyName, c: +((en.enemyBlueprintDropChance * en.chance) / 100).toFixed(3), r: en.rarity, x: `${en.enemyBlueprintDropChance}% de que el enemigo suelte � ${en.chance}%` });
}
for (const e of drops.modLocations) {
  for (const en of e.enemies) addSrc(e.modName, { t: 'E', w: en.enemyName, c: +((en.enemyModDropChance * en.chance) / 100).toFixed(3), r: en.rarity });
}
for (const e of drops.resourceByAvatar) for (const i of e.items) addSrc(i.item, { t: 'E', w: e.source, c: i.chance, r: i.rarity });
for (const [syn, list] of Object.entries(drops.syndicates || {})) for (const r of list) addSrc(r.item, { t: 'V', w: `${syn} — ${r.place}`, x: `${r.standing} de reputación`, c: 100, r: r.rarity });

function group(list) {
  const m = new Map();
  for (const s of list) {
    const k = [s.t, s.w, s.mode, s.c, s.x, s.r, s.q].join('|');
    if (m.has(k)) { const g = m.get(k); if (s.rot && !g.rot.includes(s.rot)) g.rot += '/' + s.rot; } else m.set(k, { ...s, rot: s.rot || undefined });
  }
  return [...m.values()];
}
const top = (name, n = 8) => group(sources[norm(name)] || []).sort((a, b) => (b.c || 0) - (a.c || 0)).slice(0, n);

// ---------- relics.json
const available = new Set();
for (const r of drops.relics) if (r.state === 'Intact') available.add(`${r.tier} ${r.relicName}`);
const relics = {};
for (const r of Relics) {
  const m = r.name.match(/^(Lith|Meso|Neo|Axi|Requiem) (\S+) Intact$/);
  if (!m) continue;
  const key = `${m[1]} ${m[2]}`;
  relics[key] = {
    t: m[1], av: undefined,
    r: r.rewards.map((x) => [x.item.name, x.rarity, x.chance, x.item.warframeMarket?.urlName || null]),
    loc: top(`${key} Relic`, 6).map(({ q, ...o }) => o),
  };
}
const vaultedSet = (setName) => catalog[setName]?.vaulted === true;
for (const rel of Object.values(relics)) {
  rel.av = rel.r.some(([item]) => { const m = item.match(/^(.+? Prime) /); return m && !/^Forma/.test(item) && catalog[m[1]] && !vaultedSet(m[1]); }) || rel.loc.length > 0 || undefined;
}
fs.writeFileSync(path.join(OUT, 'relics.json'), JSON.stringify(relics));


// ---------- relicfarm.json : mejores nodos para obtener reliquias de cada era
const farm = { Lith: [], Meso: [], Neo: [], Axi: [], Requiem: [] };
for (const [planet, nodes] of Object.entries(drops.missionRewards)) {
  for (const [node, m] of Object.entries(nodes)) {
    for (const [rot, list] of Object.entries(flattenRew(m.rewards))) {
      const acc = {};
      for (const r of list) { const mm = r.itemName.match(/^(Lith|Meso|Neo|Axi|Requiem) \S+ Relic$/); if (mm) { const a = (acc[mm[1]] ||= { c: 0, n: 0 }); a.c += r.chance; a.n++; } }
      for (const [tier, a] of Object.entries(acc)) farm[tier].push({ w: `${planet} � ${node}`, mode: m.gameMode, rot: rot === '-' ? undefined : rot, c: +a.c.toFixed(2), n: a.n });
    }
  }
}
for (const k of Object.keys(farm)) farm[k] = group(farm[k]).sort((a, b) => b.c - a.c).slice(0, 10);
fs.writeFileSync(path.join(OUT, 'relicfarm.json'), JSON.stringify(farm));
// ---------- primes.json (sets agrupados desde las recompensas de reliquias)
const sets = {};
for (const [rk, rel] of Object.entries(relics)) {
  for (const [item, rar, chance, slug] of rel.r) {
    const m = item.match(/^(.+? Prime) (.+)$/);
    if (!m || /^Forma/.test(item)) continue;
    const s = (sets[m[1]] ||= { set: m[1], parts: {} });
    const p = (s.parts[item] ||= { name: item, slug, d: undefined, relics: [] });
    if (slug && mk[slug]) p.d = mk[slug].d;
    p.relics.push({ id: rk, rar, ch: chance, av: rel.av });
  }
}
const primes = Object.values(sets).map((s) => {
  const parts = Object.values(s.parts).map((p) => ({ ...p, vaulted: catalog[s.set] ? catalog[s.set].vaulted === true : !p.relics.some((r) => r.av) }));
  parts.forEach((p) => p.relics.sort((a, b) => b.ch - a.ch));
  const setSlug = nameToSlug[(s.set + ' Set').toLowerCase()];
  const cat = catalog[s.set];
  const type = cat?.cat === 'Warframes' ? 'warframe' : ['Sentinels', 'Pets'].includes(cat?.cat) ? 'companion' : cat?.cat?.startsWith('Arch') ? 'archwing' : cat ? 'weapon' : (/Kavasa|Collar/.test(s.set) ? 'companion' : 'weapon');
  return {
    set: s.set, slug: setSlug || null, type, wtype: cat?.cat, img: cat?.img, vaulted: parts.every((p) => p.vaulted),
    d: setSlug ? mk[setSlug]?.d : undefined, parts,
  };
}).filter((s) => s.parts.length > 0);
fs.writeFileSync(path.join(OUT, 'primes.json'), JSON.stringify(primes));

// ---------- warframes.json (cómo conseguir cada warframe)
const frames = [];
for (const w of Warframes.filter((x) => x.category === 'Warframes')) {
  const base = w.name;
  const isPrime = / Prime$/.test(base);
  let parts = [];
  if (isPrime) {
    const p = primes.find((x) => x.set === base);
    parts = p ? p.parts.map((x) => ({ name: x.name, relics: x.relics.slice(0, 4), vaulted: x.vaulted })) : [];
  } else {
    const alias = { 'Orion & Sirius': 'Sirius & Orion' }[base] || base;
    const pre = alias.toLowerCase() + ' ';
    for (const key of Object.keys(sources)) {
      if (!key.startsWith(pre) || / prime /.test(key) || !/blueprint$|neuroptics|chassis|systems|segment|casing|engine|capsule/.test(key)) continue;
      const nm = key.replace(/\b\w/g, (x) => x.toUpperCase()).replace(' Of ', ' of ').replace('Mk Iii', 'Mk III');
      const src = top(key, 5).map(({ q, ...o }) => o);
      if (src.length) parts.push({ name: nm, src });
    }
    const seen = new Set();
    parts = parts.filter((p) => { const k = p.name.replace(/ Blueprint$/, ''); if (seen.has(k)) return false; seen.add(k); return true; });
  }
  frames.push({ name: base, prime: isPrime, vaulted: w.vaulted || undefined, tradable: w.tradable, buildTime: w.buildTime, price: w.buildPrice, parts, img: w.imageName, wiki: w.wikiaUrl });
}
fs.writeFileSync(path.join(OUT, 'warframes.json'), JSON.stringify(frames));

// ---------- arcanes.json
const arcanes = Arcanes.filter((a) => a.name && a.type !== 'Arcane' && a.tradable !== undefined || a.drops || true).filter((a) => a.name).map((a) => {
  const slug = nameToSlug[a.name.toLowerCase()];
  const last = a.levelStats?.[a.levelStats.length - 1]?.stats?.join(' ') || '';
  return {
    name: a.name, slug: slug || null, type: a.type, rarity: a.rarity, img: a.imageName, effect: last.replace(/<[^>]+>/g, ''),
    drops: (a.drops || []).slice().sort((x, y) => y.chance - x.chance).slice(0, 8).map((d) => ({ l: d.location, c: d.chance, r: d.rarity })),
  };
}).filter((a, i, arr) => arr.findIndex((z) => z.name === a.name) === i);
fs.writeFileSync(path.join(OUT, 'arcanes.json'), JSON.stringify(arcanes));

// ---------- mods.json (solo comerciables)
const mods = [];
for (const m of Mods) {
  if (!m.name || m.category !== 'Mods') continue;
  const slug = nameToSlug[m.name.toLowerCase()];
  if (!slug || !mk[slug].t?.includes('mod')) continue;
  mods.push({
    name: m.name, slug, rarity: m.rarity, type: m.type, img: m.imageName, polarity: m.polarity, compat: m.compatName, max: m.fusionLimit,
    drops: top(m.name, 4).map(({ q, ...o }) => o),
    transmutable: undefined,
  });
}
fs.writeFileSync(path.join(OUT, 'mods.json'), JSON.stringify(mods));

// ---------- resources.json (para "mejor lugar para farmear")
const RES = ['Orokin Cell', 'Neurodes', 'Argon Crystal', 'Control Module', 'Gallium', 'Morphics', 'Neural Sensors', 'Polymer Bundle', 'Tellurium', 'Plastids', 'Rubedo', 'Ferrite', 'Nano Spores', 'Salvage', 'Alloy Plate', 'Circuits', 'Detonite Injector', 'Fieldron', 'Mutagen Sample', 'Cryotic', 'Oxium', 'Pyrol', 'Nitain Extract', 'Forma Blueprint', 'Void Traces', 'Kuva', 'Orokin Cell', 'Hexenon', 'Isos', 'Entrati Lanthorn', 'Detonite Injector', 'Credits Cache', 'Endo', 'Steel Essence', 'Ayatan Star', 'Tauforged Relic'];
const resImg = {};
for (const r of Resources.concat(Misc)) if (r.name && r.imageName) resImg[r.name] = r.imageName;
const resources = [];
for (const name of [...new Set(RES)]) {
  const all = sources[norm(name)] && group(sources[norm(name)]);
  if (!all) continue;
  const clean = ({ q, ...o }) => ({ ...o, q });
  const missions = all.filter((s) => s.t === 'M' || s.t === 'T' || s.t === 'B').sort((a, b) => b.c - a.c).slice(0, 8).map(clean);
  const enemies = all.filter((s) => s.t === 'E').sort((a, b) => b.c - a.c).slice(0, 6).map(clean);
  const slug = nameToSlug[name.toLowerCase()];
  resources.push({ name, img: resImg[name], mi: slug ? mk[slug].i : undefined, missions, enemies });
}
fs.writeFileSync(path.join(OUT, 'resources.json'), JSON.stringify(resources));


// ---------- arbitration_schedule.json
try {
  const nodes = await get('https://raw.githubusercontent.com/WFCD/warframe-worldstate-data/master/data/solNodes.json', 'solNodes.json');
  const arbyRaw = await fetch('https://raw.githubusercontent.com/calamity-inc/browse.wf/senpai/arbys.txt').then(r => r.text());
  const lines = arbyRaw.split('\n').filter(Boolean);
  const arbySched = {};
  for (const line of lines) {
    const [tStr, nKey] = line.trim().split(',');
    const t = parseInt(tStr, 10);
    const n = nodes[nKey];
    if (n) arbySched[t] = { node: n.value, type: n.type, enemy: n.enemy };
  }
  fs.writeFileSync(path.join(OUT, 'arbitration_schedule.json'), JSON.stringify(arbySched));
  console.log('Arbitration schedule generated with', Object.keys(arbySched).length, 'entries');
} catch (e) {
  console.log('Arbitration schedule generation skipped:', e.message);
}

// ---------- rivens.json (armas con riven + atributos)
const rw = await get('https://api.warframe.market/v2/riven/weapons', 'riven_weapons.json', { Language: 'en' });
const ra = await get('https://api.warframe.market/v2/riven/attributes', 'riven_attrs.json', { Language: 'en' });
const rivenWeapons = rw.data.map((w) => ({ slug: w.slug, n: w.i18n.en.name, i: w.i18n.en.thumb, g: w.group, rt: w.rivenType, dis: w.disposition, mr: w.reqMasteryRank }));
const rivenAttrs = {};
for (const a of ra.data) rivenAttrs[a.slug] = { n: a.i18n.en.name, unit: a.unit, pos: a.positiveOnly, neg: a.negativeOnly, ex: a.exclusiveTo };
fs.writeFileSync(path.join(OUT, 'rivens.json'), JSON.stringify({ weapons: rivenWeapons, attrs: rivenAttrs }));
console.log('rivens', rivenWeapons.length, Object.keys(rivenAttrs).length);

// ---------- modimg.json : nombre (min�sculas) -> imagen (para builds)
const modimg = {};
for (const m of Mods) if (m.name && m.imageName) modimg[m.name.toLowerCase()] = { w: m.imageName, r: m.rarity };
for (const a of Arcanes) if (a.name && a.imageName) modimg[a.name.toLowerCase()] = { w: a.imageName, r: a.rarity };
for (const [slug, it] of Object.entries(mk)) { const k = it.n.toLowerCase(); if (modimg[k]) modimg[k].i = it.i; else modimg[k] = { i: it.i }; modimg[k].s = slug; }
fs.writeFileSync(path.join(OUT, 'modimg.json'), JSON.stringify(modimg));
// ---------- crawl list para precios (usado por server.mjs)
const crawl = { primeSets: [], primeParts: [], arcanes: [], mods: [] };
for (const p of primes) { if (p.slug) crawl.primeSets.push(p.slug); for (const x of p.parts) if (x.slug) crawl.primeParts.push(x.slug); }
for (const a of arcanes) if (a.slug) crawl.arcanes.push(a.slug);
for (const m of mods) if (['Rare', 'Legendary'].includes(m.rarity)) crawl.mods.push(m.slug);
fs.writeFileSync(path.join(OUT, 'crawl.json'), JSON.stringify(crawl));

console.log({ market: Object.keys(mk).length, catalog: Object.keys(catalog).length, relics: Object.keys(relics).length, primes: primes.length, frames: frames.length, arcanes: arcanes.length, mods: mods.length, resources: resources.length, crawl: Object.fromEntries(Object.entries(crawl).map(([k, v]) => [k, v.length])) });

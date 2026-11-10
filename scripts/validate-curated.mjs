// Valida que los nombres curados (tiers/builds) existan en los datos descargados.
import fs from 'node:fs';
import { TIERS } from '../public/js/tiers.js';
import { FRAME_BUILDS, WEAPON_BUILDS } from '../public/js/builds.js';
const rd = (n) => JSON.parse(fs.readFileSync(new URL('../public/data/' + n, import.meta.url), 'utf8'));
const cat = rd('catalog.json');
const mk = rd('market.json');
const modNames = new Set(Object.keys(rd('modimg.json')));
const bad = [];
for (const [k, g] of Object.entries(TIERS)) {
  const seen = new Set();
  for (const [t, list] of Object.entries(g.tiers)) for (const n of list) {
    if (!cat[n]) bad.push(`tier ${k}/${t}: ${n}`);
    if (seen.has(n)) bad.push(`duplicado ${k}: ${n}`);
    seen.add(n);
  }
}
for (const f of FRAME_BUILDS) { if (!cat[f.name]) bad.push('frame ' + f.name); for (const b of f.builds) for (const m of b.mods.concat(b.arcanes)) if (!modNames.has(m.toLowerCase())) bad.push(`mod ${f.name}: ${m}`); }
for (const w of WEAPON_BUILDS) { if (!cat[w.name]) bad.push('weapon ' + w.name); for (const m of w.mods.concat(w.arcanes)) if (!modNames.has(m.toLowerCase())) bad.push(`mod ${w.name}: ${m}`); }
console.log(bad.length ? bad.join('\n') : 'Todo OK');

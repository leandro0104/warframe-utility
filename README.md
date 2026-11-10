# Warframe Utility

Panel web visual con datos de Warframe: partes Prime, reliquias, arcanos, mods, rivens, cómo conseguir Warframes, dónde farmear, tier lists y builds.

## Uso

Requiere Node 20+ (sin dependencias).

```bash
npm run build-data   # descarga/actualiza datos (drops, reliquias, items, imágenes) -> public/data
npm start            # http://localhost:3000
```

El servidor consulta warframe.market en segundo plano (≈3 req/s, límite de la API) y guarda los precios en `.cache/prices.json`.
La primera vez tarda ~12 minutos en tener todos los precios; las pantallas se actualizan solas mientras cargan.

## Fuentes
- Precios, vendedores y Rivens: [warframe.market](https://warframe.market) (API v1/v2)
- Drops y reliquias: [drops.warframestat.us](https://drops.warframestat.us) (tablas oficiales de DE)
- Items e imágenes: [WFCD/warframe-items](https://github.com/WFCD/warframe-items)

## Datos curados a mano
`public/js/tiers.js` y `public/js/builds.js` (tier lists y builds) son opinión/referencia y se editan manualmente.
Validar nombres: `node scripts/validate-curated.mjs`.


const WFM = 'https://api.warframe.market';
const UA = 'warframe-utility/1.0 (personal project)';

export default async function handler(req, res) {
  const { slug } = req.query || {};
  if (!slug) return res.status(400).json({ error: 'Missing slug' });
  try {
    const r = await fetch(`${WFM}/v2/orders/item/${encodeURIComponent(slug)}/top`, {
      headers: { 'User-Agent': UA, Language: 'en', Platform: 'pc', Crossplay: 'true' }
    });
    if (!r.ok) throw new Error('WFM status ' + r.status);
    const j = await r.json();
    const pick = (o) => ({ p: o.platinum, q: o.quantity, u: o.user?.ingameName, st: o.user?.status, rep: o.user?.reputation, rank: o.rank });
    const out = { sell: (j.data?.sell || []).map(pick), buy: (j.data?.buy || []).map(pick) };
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    return res.status(200).json(out);
  } catch (e) {
    return res.status(502).json({ error: e.message });
  }
}

const WFM = 'https://api.warframe.market';
const UA = 'warframe-utility/1.0 (personal project)';

export default async function handler(req, res) {
  const { slug } = req.query || {};
  if (!slug) return res.status(400).json({ error: 'Missing slug' });
  try {
    const r = await fetch(`${WFM}/v1/auctions/search?type=riven&weapon_url_name=${encodeURIComponent(slug)}&sort_by=price_asc&buyout_policy=with`, {
      headers: { 'User-Agent': UA }
    });
    if (!r.ok) throw new Error('WFM status ' + r.status);
    const j = await r.json();
    const list = (j.payload?.auctions || [])
      .filter((a) => a.buyout_price && !a.closed && a.visible)
      .slice(0, 120)
      .map((a) => ({
        p: a.buyout_price, name: a.item.name, pol: a.item.polarity, mr: a.item.mastery_level, rr: a.item.re_rolls, rank: a.item.mod_rank,
        a: a.item.attributes.map((x) => ({ u: x.url_name, v: x.value, pos: x.positive })),
        o: a.owner?.ingame_name, st: a.owner?.status,
      }));
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    return res.status(200).json(list);
  } catch (e) {
    return res.status(502).json({ error: e.message });
  }
}


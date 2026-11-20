let lastCachedWorldState = null;

export default async function handler(req, res) {
  try {
    const r = await fetch('https://api.warframestat.us/pc?language=es', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Accept': 'application/json'
      }
    });
    if (r.ok) {
      const data = await r.json();
      lastCachedWorldState = data;
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      return res.status(200).json(data);
    }
  } catch (e) {}

  if (lastCachedWorldState) {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    return res.status(200).json({ ...lastCachedWorldState, _cached: true });
  }

  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  return res.status(200).json({
    fissures: [],
    alerts: [],
    events: [],
    voidTrader: {},
    arbitration: {},
    maintenance: true
  });
}


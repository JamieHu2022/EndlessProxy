const { Router } = require('express');
const a = require('axios').default;

const router = Router();
const key = process.env.BRAVE_API_KEY;

router.get('/', async (q, r) => {
  const v = q.query.q;
  if (!v) return r.status(400).send('<h1>Proxy Error</h1><p>Missing ?q=</p>');

  console.log('[SEARCH]', v);

  try {
    const s = await a.get(`https://api.search.brave.com/res/v1/web/search?q=${encodeURIComponent(v)}`, {
      headers: {
        'Accept': 'application/json',
        'Accept-Encoding': 'gzip',
        'X-Subscription-Token': key
      }
    });
    r.json(s.data);
  } catch(err) {
    r.status(500).send(`<h1>Proxy Error</h1><p>${err.message}</p>`);
  }
});

module.exports = router;

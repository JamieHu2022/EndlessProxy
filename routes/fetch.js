const { Router } = require('express');
const a = require('axios').default;
const { CookieJar } = require('tough-cookie');
const { rewrite } = require('../utils/rewrite');
const { decode } = require('../utils/encode');

const router = Router();
const cache = new Map();

router.get('/', async (q, r) => {
  const raw = q.query.url;
  if (!raw) return r.status(400).send('<h1>Proxy Error</h1><p>Missing ?url=</p>');

  const u = decode(raw);
  console.log('[FETCH]', u);

  if (cache.has(u)) {
    const entry = cache.get(u);
    if (Date.now() - entry.time < 30000) {
      return r.send(entry.data);
    } else {
      cache.delete(u);
    }
  }

  const jar = new CookieJar();
  try {
    const s = await a.get(u, {
      jar,
      withCredentials: true,
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Accept': '*/*',
        'Referer': u,
        'Origin': new URL(u).origin
      },
      responseType: 'arraybuffer',
      maxRedirects: 5
    });

    delete s.headers['content-security-policy'];
    delete s.headers['x-frame-options'];
    delete s.headers['x-content-type-options'];

    const ct = s.headers['content-type'] || 'text/plain';

    if (ct.includes('text/html')) {
      let t = s.data.toString('utf8');
      t = rewrite(t, u, `${q.protocol}://${q.get('host')}`);
      cache.set(u, { data: t, time: Date.now() });
      return r.type('html').send(t);
    }

    cache.set(u, { data: s.data, time: Date.now() });
    r.setHeader('Content-Type', ct);
    r.send(s.data);
  } catch(err) {
    r.status(500).send(`<h1>Proxy Error</h1><p>${err.message}</p>`);
  }
});

module.exports = router;

export default {
  async fetch(r, e) {
    const u = new URL(r.url);
    const p = u.pathname;

    const h = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (r.method === 'OPTIONS') {
      return new Response(null, { headers: h });
    }

    if (p === '/search') {
      const q = u.searchParams.get('q');
      if (!q) return j({ error: 'Missing ?q=' }, h);

      const d = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(q)}`;
      const s = await fetch(d, { headers: { 'User-Agent': 'Mozilla/5.0' } });
      const t = await s.text();

      return new Response(t, { headers: { 'Content-Type': 'text/html', ...h } });
    }

    if (p === '/fetch') {
      const f = u.searchParams.get('url');
      if (!f) return j({ error: 'Missing ?url=' }, h);

      let x;
      try {
        x = new URL(f);
      } catch {
        return j({ error: 'Invalid URL' }, h, 400);
      }

      const s = await fetch(x.toString(), {
        headers: {
          'User-Agent': 'Mozilla/5.0',
          'Accept': r.headers.get('Accept') || '*/*',
        },
        redirect: 'follow',
      });

      const c = s.headers.get('Content-Type') || 'text/plain';

      if (c.includes('text/html')) {
        let t = await s.text();
        t = w(t, f, u.origin);
        return new Response(t, { headers: { 'Content-Type': 'text/html', ...h } });
      }

      return new Response(s.body, {
        status: s.status,
        headers: { 'Content-Type': c, ...h }
      });
    }

    if (p === '/') {
      return new Response(l(), { headers: { 'Content-Type': 'text/html' } });
    }

    return j({ error: 'Not found' }, h, 404);
  }
};

function j(d, h = {}, s = 200) {
  return new Response(JSON.stringify(d), {
    status: s,
    headers: { 'Content-Type': 'application/json', ...h }
  });
}

function w(t, b, o) {
  const n = new URL(b);
  const base = n.origin;
  const dir = b.substring(0, b.lastIndexOf('/') + 1);

  t = t.replace(/(href|src|action|srcset)="(https?:\/\/[^"]+)"/g, (_, a, k) => {
    return `${a}="${o}/fetch?url=${encodeURIComponent(k)}"`;
  });

  t = t.replace(/(href|src|action)="(\/[^"]+)"/g, (_, a, k) => {
    const z = `${base}${k}`;
    return `${a}="${o}/fetch?url=${encodeURIComponent(z)}"`;
  });

  t = t.replace(/(href|src|action)="([^"#?\/][^":][^"]*?)"/g, (m, a, k) => {
    if (k.startsWith('data:') || k.startsWith('javascript:') || k.startsWith('mailto:')) return m;
    const z = `${dir}${k}`;
    return `${a}="${o}/fetch?url=${encodeURIComponent(z)}"`;
  });

  t = t.replace(/url\(['"]?(https?:\/\/[^'")]+)['"]?\)/g, (_, k) => {
    return `url("${o}/fetch?url=${encodeURIComponent(k)}")`;
  });

  const s = `<script>
    (function() {
      const _o = '${o}';
      const _b = '${b}';
      function px(u) {
        if (!u || u.startsWith('#') || u.startsWith('javascript:') || u.startsWith('data:')) return u;
        try {
          const a = new URL(u, _b).href;
          return _o + '/fetch?url=' + encodeURIComponent(a);
        } catch(e) { return u; }
      }
      document.addEventListener('click', function(e) {
        const a = e.target.closest('a');
        if (a && a.href && !a.href.includes(_o + '/fetch')) {
          e.preventDefault();
          window.location.href = px(a.getAttribute('href'));
        }
      }, true);
      document.addEventListener('submit', function(e) {
        const f = e.target;
        if (f.action && !f.action.includes(_o + '/fetch')) {
          e.preventDefault();
          const p = new URLSearchParams(new FormData(f)).toString();
          window.location.href = px(f.action) + '?' + p;
        }
      }, true);
    })();
  <\/script>`;

  if (t.includes('</head>')) {
    t = t.replace('</head>', s + '</head>');
  } else {
    t = s + t;
  }

  return t;
}

function l() {
  return `<!DOCTYPE html>
<html>
<head><title>Proxy</title></head>
<body>
  <h2>Proxy</h2>
  <form onsubmit="g(event)">
    <input id="q" placeholder="Search or enter URL..." style="width:300px;padding:8px">
    <button type="submit">Go</button>
  </form>
  <script>
    function g(e) {
      e.preventDefault();
      const q = document.getElementById('q').value.trim();
      if (q.startsWith('http')) {
        window.location.href = '/fetch?url=' + encodeURIComponent(q);
      } else {
        window.location.href = '/search?q=' + encodeURIComponent(q);
      }
    }
  <\/script>
</body>
</html>`;
}
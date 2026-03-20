const { encode } = require('./encode');

function rewrite(t, b, o) {
  const n = new URL(b);
  const base = n.origin;
  const dir = b.substring(0, b.lastIndexOf('/') + 1);

  t = t.replace(/(href|src|action|srcset)="(https?:\/\/[^"]+)"/g, (_, a, k) => {
    return `${a}="${o}/fetch?url=${encode(k)}"`;
  });
  t = t.replace(/srcset="([^"]+)"/g, (_, srcset) => {
    const rewritten = srcset.split(',').map(part => {
      const [url, size] = part.trim().split(' ');
      const abs = new URL(url, b).href;
      return `${o}/fetch?url=${encode(abs)} ${size || ''}`;
    }).join(', ');
    return `srcset="${rewritten}"`;
  });
  t = t.replace(/<(link|iframe|script)[^>]+(href|src)=["']([^"']+)["']/g,
    (m, tag, attr, url) => {
      const abs = new URL(url, b).href;
      return m.replace(url, `${o}/fetch?url=${encode(abs)}`);
    }
  );
  t = t.replace(/(href|src|action)="(\/[^"]+)"/g, (_, a, k) => {
    const z = `${base}${k}`;
    return `${a}="${o}/fetch?url=${encode(z)}"`;
  });
  t = t.replace(/(href|src|action)="([^"#?\/][^":][^"]*?)"/g, (m, a, k) => {
    if (k.startsWith('data:') || k.startsWith('javascript:') || k.startsWith('mailto:')) return m;
    const z = `${dir}${k}`;
    return `${a}="${o}/fetch?url=${encode(z)}"`;
  });
  t = t.replace(/url\(['"]?(https?:\/\/[^'")]+)['"]?\)/g, (_, k) => {
    return `url("${o}/fetch?url=${encode(k)}")`;
  });

  const s = `<script>
    (function() {
      const _o = '${o}';
      const _b = '${b}';
      function enc(u) { return btoa(unescape(encodeURIComponent(u))); }
      function px(u) {
        if (!u || u.startsWith('#') || u.startsWith('javascript:') || u.startsWith('data:')) return u;
        try {
          const a = new URL(u, _b).href;
          return _o + '/fetch?url=' + enc(a);
        } catch(x) { return u; }
      }
      function load(u) {
        const fr = window.parent.document.getElementById('proxyframe');
        if (fr) { fr.src = u; } else { window.location.href = u; }
      }
      const of = window.fetch;
      window.fetch = function(url, opts) {
        try {
          const pu = _o + '/fetch?url=' + enc(new URL(url, location.href).href);
          return of(pu, opts);
        } catch { return of(url, opts); }
      };
      const ows = window.WebSocket;
      window.WebSocket = function(url, protocols) {
        try {
          const ws = new URL(url, _b);
          ws.protocol = ws.protocol === 'wss:' ? 'wss:' : 'ws:';
          return new ows(ws.href, protocols);
        } catch { return new ows(url, protocols); }
      };
      const odesc = Object.getOwnPropertyDescriptor(window.location, 'href') ||
                    Object.getOwnPropertyDescriptor(Object.getPrototypeOf(window.location), 'href');
      try {
        Object.defineProperty(window.location, 'href', {
          set(val) {
            try {
              const abs = new URL(val, _b).href;
              odesc.set.call(window.location, _o + '/fetch?url=' + enc(abs));
            } catch { odesc.set.call(window.location, val); }
          },
          get() { return odesc.get.call(window.location); },
          configurable: true
        });
      } catch {}
      const _assign = window.location.assign.bind(window.location);
      window.location.assign = function(url) {
        try {
          const abs = new URL(url, _b).href;
          _assign(_o + '/fetch?url=' + enc(abs));
        } catch { _assign(url); }
      };
      const _replace = window.location.replace.bind(window.location);
      window.location.replace = function(url) {
        try {
          const abs = new URL(url, _b).href;
          _replace(_o + '/fetch?url=' + enc(abs));
        } catch { _replace(url); }
      };
      const ox = XMLHttpRequest.prototype.open;
      XMLHttpRequest.prototype.open = function(m, url, ...rest) {
        try {
          const pu = _o + '/fetch?url=' + enc(new URL(url, location.href).href);
          return ox.call(this, m, pu, ...rest);
        } catch { return ox.call(this, m, url, ...rest); }
      };
      document.addEventListener('click', function(ev) {
        const a = ev.target.closest('a');
        if (a && a.href && !a.href.includes(_o + '/fetch')) {
          ev.preventDefault();
          load(px(a.getAttribute('href')));
        }
      }, true);
      document.addEventListener('submit', function(ev) {
        const f = ev.target;
        if (f.action && !f.action.includes(_o + '/fetch')) {
          ev.preventDefault();
          const p = new URLSearchParams(new FormData(f)).toString();
          load(px(f.action) + '?' + p);
        }
      }, true);
    })();
  <\/script>`;

  return t.includes('</head>') ? t.replace('</head>', s + '</head>') : s + t;
}

module.exports = { rewrite };

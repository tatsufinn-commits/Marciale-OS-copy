// Service worker: installability + offline static assets.
// IMPORTANT: app code (HTML/CSS/JS/modules) is network-first so local-server
// launches do not get stuck behind an older cached Hub build.
const CACHE = 'hub-v5-2026-06-14-cache-fix';
const PRECACHE_ASSETS = ['./manifest.json', './icon.svg'];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(PRECACHE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

function isAppCode(url, request) {
  return request.mode === 'navigate'
    || url.pathname === '/'
    || url.pathname.endsWith('/index.html')
    || url.pathname.endsWith('.js')
    || url.pathname.endsWith('.css');
}

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);

  // Never cache dynamic/local API responses.
  if (url.pathname.startsWith('/api/')) return;

  // Always try the live server first for app code. If offline, fall back to the
  // last cached copy. This fixes stale module issues after code updates.
  if (url.origin === self.location.origin && isAppCode(url, e.request)) {
    e.respondWith(
      fetch(e.request, { cache: 'no-store' }).then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, copy)).catch(() => {});
        return res;
      }).catch(() => caches.match(e.request).then(hit => hit || caches.match('./index.html')))
    );
    return;
  }

  // Other same-origin static assets: cache-first, then network.
  if (url.origin === self.location.origin) {
    e.respondWith(
      caches.match(e.request).then(hit => hit || fetch(e.request).then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, copy)).catch(() => {});
        return res;
      }))
    );
  }
});

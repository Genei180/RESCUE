const CACHE_NAME = 'rescue-pwa-v1';
const PRECACHE = [
  '/',
  '/specs/001-situation-map/pwa-proof/index.html',
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(PRECACHE)));
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  // Serve from cache for navigation shell
  if (event.request.mode === 'navigate'){
    event.respondWith(caches.match('/specs/001-situation-map/pwa-proof/index.html'));
    return;
  }
  event.respondWith(caches.match(event.request).then(r=>r || fetch(event.request).catch(()=>caches.match('/specs/001-situation-map/pwa-proof/index.html'))));
});

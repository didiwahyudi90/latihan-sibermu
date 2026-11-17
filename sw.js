// Service worker: aplikasi tetap bisa dibuka tanpa internet.
// Strategi network-first: selalu ambil versi terbaru saat online, pakai salinan cache saat offline.
const C = 'latihan-s1-v1';
const INTI = ['/', '/akun.js', '/archivo.woff2', '/manifest.webmanifest', '/ikon-192.png',
  ...['SIF004','SIF001','SIF002','SIF003','AIK1','KUI001','KUE001'].flatMap(k => [`/bank_${k}.js`, `/fakta_${k}.js`]),
  ...['SIF004','SIF001','SIF002','SIF003','KUI001','KUE001'].map(k => `/gen_${k}.js`), '/tantangan.js'];
self.addEventListener('install', e => { e.waitUntil(caches.open(C).then(c => c.addAll(INTI)).catch(() => {})); self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== C).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.origin !== location.origin || u.pathname.startsWith('/api/')) return;
  e.respondWith(fetch(e.request).then(r => { if (r.ok) { const k = r.clone(); caches.open(C).then(c => c.put(e.request, k)); } return r; })
    .catch(() => caches.match(e.request, { ignoreSearch: true }).then(r => r || caches.match('/'))));
});

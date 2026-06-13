const CACHE_NAME = 'restored-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/assess.html',
  '/journey.html',
  '/pathway.html',
  '/crisis/index.html',
  '/css/main.css',
  '/js/app.js',
  '/js/ui.js',
  '/js/storage.js',
  '/manifest.json',
  '/modules/communion.html',
  '/modules/soul-ties.html',
  '/modules/father-wound.html',
  '/modules/renewing-mind.html',
  '/modules/legal-ground.html',
  '/modules/demonic-patterns.html',
  '/modules/emotional-traps.html',
  '/modules/rebuilding-identity.html',
  '/modules/warfare-marriage.html',
  '/modules/scripture-challenge.html',
  '/modules/sexual-dysfunction.html',
  '/modules/partner-support.html',
  '/modules/covenant-intimacy.html'
];

// Install event - cache assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache).catch(err => {
        console.log('Cache installation error (non-critical):', err);
      });
    })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.match(event.request).then(response => {
      // Return cached version if available
      if (response) {
        return response;
      }

      // Try to fetch from network
      return fetch(event.request).then(response => {
        // Don't cache non-successful responses
        if (!response || response.status !== 200 || response.type === 'error') {
          return response;
        }

        // Clone and cache successful responses
        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, responseToCache);
        });

        return response;
      }).catch(() => {
        // Offline fallback
        return caches.match('/index.html');
      });
    })
  );
});

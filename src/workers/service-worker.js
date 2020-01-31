import syncWorker from './syncWorker';

var cacheName = 'fintrackCache-v1';
var appShellFiles = [
  // List all static files
  ''
];

syncWorker.onmessage = (e) => {
  if (e.data == 'Unauthorized') {

  }
};

window.addEventListener('install', (e) => {
  console.log('[Service worker] Install');
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      console.log('[Service worker] Caching app shell');
      return cache.addAll(appShellFiles);
    })
  );
});

window.addEventListener('fetch', (e) => {
  e.respondWith(
    // Try loading through network first
    fetch(e.request).then((response) => {
      return caches.open(cacheName).then((cache) => {
        console.log('[Service Worker] Caching new resource: '+ e.request.url);
        cache.put(e.request, response.clone());
        return response;
      });
    }).catch(() => {
      // Search the cache if it's a GET
      if (e.request.method == 'GET') {
        caches.match(e.request).then((r) => {
          return r;
        }).catch(() => {
          return new Response(JSON.stringify({ error: 'No network connection' }));
        });
      }
      // Save the data to be synced later
      else {
        e.request.json().then((data) => {
          syncWorker.postMessage(data);
        });
      }
    })
  );
});

window.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if(key !== cacheName) {
          return caches.delete(key);
        }
      }));
    })
  );
});

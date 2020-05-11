const CACHE_NAME = 'service-worker';

self.addEventListener('install', (event) => {
    self.skipWaiting();

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => (cache.addAll([
                '/dist/bundle.js',
                '/dist/style.css',
                '/dist/index.html',
                '/static/fallback.html',
                '/static/img/favicon-play.ico',
            ])))
    );
});

self.addEventListener('activate', (event) => {
    console.log('Service worker activated!');
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((cachedResponse) => {
                if (!navigator.onLine && cachedResponse) {
                    return cachedResponse;
                }

                return fetch(event.request)
                    .then((response) => caches
                        .open(CACHE_NAME)
                        .then((cache) => {
                            if (event.request.method === 'GET') {
                                cache.put(event.request, response.clone());
                            }
                            return response;
                        }))
                    .catch((err) => {
                        if (event.request.mode === 'navigate') {
                            return caches.match('/static/fallback.html');
                        }
                    });
            })
    );
});

const CACHE_NAME = 'kino-on-cache';
const {assets} = global.serviceWorkerOption;
assets.push('/static/fallback.html');

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => (cache.addAll(assets)))
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            cache.keys().then((requests) => {
                return Promise.all(
                    requests.filter((request) => {
                        const staticCheck = !request.url.includes('/static/') &&
                            !request.url.includes('.jpg');
                        return staticCheck && !assets.includes(request.url);
                    }).map((request) => {
                        return cache.delete(request);
                    })
                );
            });
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((cachedResponse) => {
                const staticCheck = event.request.url.includes('/static/') &&
                    event.request.url.includes('.jpg');
                if ((!navigator.onLine || staticCheck) && cachedResponse) {
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

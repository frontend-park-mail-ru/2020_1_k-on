const CACHE_NAME = 'kino-on-cache';
let {assets} = global.serviceWorkerOption;
assets = assets.map((asset) => String.prototype.concat('/dist', asset));
assets.push('/static/fallback.html');

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => (cache.addAll(assets)))
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(caches.open(CACHE_NAME).then((cache) => {
        cache.keys().then((requests) => {
            return Promise.all(
                requests
                    .filter((request) => {
                        const url = new URL(request.url);
                        return !url.pathname.includes('/static/') && !assets.includes(url.pathname);
                    })
                    .map((request) => cache.delete(request))
            );
        });
    }));
});

self.addEventListener('fetch', (event) => {
    event.respondWith(caches.match(event.request).then((cachedResponse) => {
        const staticCheck = event.request.url.includes('/static/');
        const distCheck = event.request.url.includes('/dist/');
        if ((!navigator.onLine || staticCheck || distCheck) && cachedResponse) {
            return cachedResponse;
        }

        return fetch(event.request)
            .then((response) => caches
                .open(CACHE_NAME)
                .then((cache) => {
                    if (staticCheck || distCheck) {
                        cache.put(event.request, response.clone());
                    }
                    return response;
                })
            )
            .catch((err) => {
                if (event.request.mode === 'navigate') {
                    return caches.match('/static/fallback.html');
                }
            });
    })
    );
});

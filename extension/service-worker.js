self.context = {
  "environment": {
    "client": false,
    "server": true,
    "development": false,
    "production": true,
    "mode": "spa",
    "key": "994cdee68989d27915961ffd24fe1f03552d79f8",
    "name": ""
  },
  "project": {
    "domain": "localhost",
    "name": "[dev] Nullstack Chrome Extension",
    "color": "#D22365",
    "viewport": "width=device-width, initial-scale=1, shrink-to-fit=no",
    "type": "website",
    "display": "standalone",
    "orientation": "portrait",
    "scope": "/",
    "root": "/",
    "sitemap": false,
    "favicon": "/favicon-96x96.png",
    "disallow": [],
    "icons": {
      "72": "/icon-72x72.png",
      "96": "/icon-96x96.png",
      "128": "/icon-128x128.png",
      "144": "/icon-144x144.png",
      "152": "/icon-152x152.png",
      "180": "/icon-180x180.png",
      "192": "/icon-192x192.png",
      "384": "/icon-384x384.png",
      "512": "/icon-512x512.png"
    }
  },
  "settings": {},
  "worker": {
    "enabled": false,
    "fetching": false,
    "preload": [],
    "headers": {},
    "api": "http://127.0.0.1:3000",
    "cdn": "",
    "protocol": "https",
    "queues": {}
  }
};

async function load(event) {
  const response = await event.preloadResponse;
  if (response) return response;
  return await fetch(event.request);
}

async function cacheFirst(event) {
  const cache = await caches.open(self.context.environment.key);
  const cachedResponse = await cache.match(event.request);
  if(cachedResponse) return cachedResponse;
  const response = await load(event);
  await cache.put(event.request, response.clone());
  return response;
}

async function staleWhileRevalidate(event) {
  const cache = await caches.open(self.context.environment.key);
  const cachedResponse = await cache.match(event.request);
  const networkResponsePromise = load(event);
  event.waitUntil(async function() {
    const networkResponse = await networkResponsePromise;
    await cache.put(event.request, networkResponse.clone());
  }());
  return cachedResponse || networkResponsePromise;
}

async function networkFirst(event) {
  const cache = await caches.open(self.context.environment.key);
  try {
    const networkResponse = await load(event);
    await cache.put(event.request, networkResponse.clone());
    return networkResponse;
  } catch(error) {
    return await cache.match(event.request);
  }
}

function install(event) {
  const urls = [
    '/',
    ...self.context.worker.preload,
    '/manifest.webmanifest',
    `/client.css?fingerprint=${self.context.environment.key}`,
    `/client.js?fingerprint=994cdee68989d27915961ffd24fe1f03552d79f8`
  ];
  event.waitUntil(async function () {
    const cache = await caches.open(self.context.environment.key);
    await cache.addAll([...new Set(urls)]);
    self.skipWaiting();
  }());
}

self.addEventListener('install', install);

function activate(event) {
  event.waitUntil(async function() {
    const cacheNames = await caches.keys();
    const cachesToDelete = cacheNames.filter(cacheName => cacheName !== self.context.environment.key);
    await Promise.all(cachesToDelete.map((cacheName) => caches.delete(cacheName)));
    if (self.registration.navigationPreload) {
      await self.registration.navigationPreload.enable();
    }
    self.clients.claim();
  }());
}

self.addEventListener('activate', activate);

function dynamicStrategy(event) {
  event.waitUntil(async function () {
    const url = new URL(event.request.url);
    if (url.origin !== location.origin) return;
    if (event.request.method !== 'GET') return;
    if (url.pathname.indexOf('/nullstack/') > -1) {
      return event.respondWith(networkFirst(event));
    }
    if (url.pathname.indexOf(self.context.environment.key) > -1) {
      return event.respondWith(cacheFirst(event));
    }
    if (url.pathname.indexOf('.') > -1) {
      return event.respondWith(staleWhileRevalidate(event));
    }
    event.respondWith(networkFirst(event));
  }());
}

self.addEventListener('fetch', dynamicStrategy);
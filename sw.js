const CACHE_NAME = 'nursing-app-v2';

const ASSETS = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  'https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;900&family=IBM+Plex+Mono:wght@400;500&display=swap'
];

// تثبيت Service Worker وتخزين الملفات الأساسية فقط (بدون JSON)
self.addEventListener('install', event => {
  console.log('Service Worker installing...');
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Caching assets');
      return cache.addAll(ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// تنشيط Service Worker وحذف الكاش القديم
self.addEventListener('activate', event => {
  console.log('Service Worker activating...');
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => {
          console.log('Deleting old cache:', key);
          return caches.delete(key);
        })
      );
    }).then(() => self.clients.claim())
  );
});

// اعتراض الطلبات
self.addEventListener('fetch', event => {
  const url = event.request.url;
  
  // لا تقم بتخزين ملفات JSON في الكاش (نحتاجها محدثة دائماً)
  if (url.includes('.json')) {
    console.log('Fetching JSON directly:', url);
    event.respondWith(fetch(event.request));
    return;
  }
  
  // للملفات الأخرى: حاول من الكاش أولاً، ثم من الشبكة
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).then(response => {
        // لا نقوم بتخزين الاستجابات التي بها مشاكل
        if (!response || response.status !== 200 || response.type === 'opaque') {
          return response;
        }
        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, responseToCache);
        });
        return response;
      });
    })
  );
});

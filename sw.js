// Force update - clear all caches
const CACHE = 'audio-studio-v5';

self.addEventListener('install', e => {
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Network only - no caching
self.addEventListener('fetch', e => {
  if (e.request.url.includes('api.groq.com') || 
      e.request.url.includes('api.anthropic.com')) {
    return;
  }
  e.respondWith(fetch(e.request));
});

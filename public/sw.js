self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  self.clients.claim();
});

// A basic fetch handler is required by Chrome to trigger the "Add to Home Screen" prompt
self.addEventListener('fetch', (e) => {
  // We can just let the browser handle the fetch for now
  // If you want offline caching, you would implement it here
});

const staticTaskForce = "task-force-site-v1";

const assets = [
  "/",
  "/index.html",
  "/style.css",
  "/script.js",
  "/images/task-icon.png"
];

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(staticTaskForce).then(cache => {
      cache.addAll(assets);
    })
  );
});

self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    
    caches.match(fetchEvent.request).then(res => {
      return fetch(fetchEvent.request) || res;
    })
  );
});
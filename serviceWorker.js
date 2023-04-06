const staticTaskForce = "task-force-site-v1";

const assets = [
  "/",
  "/index.html",
  "/style.css",
  "/manifest.json",
  "/script.js",
  "/storage.js",
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
      return  res || fetch(fetchEvent.request);
    })
  );
});
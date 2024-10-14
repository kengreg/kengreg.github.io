/* eslint-disable */

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("image-cache").then((cache) => {
      // Optionally, you can pre-cache some resources here
      return cache.addAll(["/example.jpg"]); // Pre-cache example.jpg
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response; // Return cached response
      }

      return fetch(event.request).then((networkResponse) => {
        return caches.open("image-cache").then((cache) => {
          cache.put(event.request, networkResponse.clone()); // Cache the fetched resource
          return networkResponse; // Return the network response
        });
      });
    })
  );
});

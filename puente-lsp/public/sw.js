// Service worker de las notificaciones de Alerta Visual. Solo hace eso:
// 1. En Android, Chrome solo muestra notificaciones desde aquí. Al tocar la
//    notificación, vuelve a la pestaña de Alerta Visual.
// No intercepta ninguna petición: la copia sin señal de "Mi tarjeta de
// emergencia" vive en public/sw-tarjeta.js, con alcance solo a esa página.

// Borra cachés offline de versiones anteriores que ya no usa nadie.
const CACHE_OFFLINE = "puente-offline-v1"; // igual que en src/lib/tarjeta.ts

self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) =>
  e.waitUntil(
    self.clients
      .claim()
      .then(() => caches.keys())
      .then((nombres) =>
        Promise.all(
          nombres
            .filter((n) => n.startsWith("puente-offline-") && n !== CACHE_OFFLINE)
            .map((n) => caches.delete(n)),
        ),
      )
      .catch(() => {}),
  ),
);

self.addEventListener("notificationclick", (evento) => {
  evento.notification.close();
  evento.waitUntil(
    self.clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((ventanas) =>
        ventanas.length
          ? ventanas[0].focus()
          : self.clients.openWindow("/herramientas/alerta-visual"),
      ),
  );
});

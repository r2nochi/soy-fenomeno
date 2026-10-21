// Service worker mínimo: en Android, Chrome solo muestra notificaciones
// desde aquí. Al tocar la notificación, vuelve a la pestaña de Alerta Visual.
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) => e.waitUntil(self.clients.claim()));

self.addEventListener("notificationclick", (evento) => {
  evento.notification.close();
  evento.waitUntil(
    self.clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((ventanas) =>
        ventanas.length ? ventanas[0].focus() : self.clients.openWindow("/"),
      ),
  );
});

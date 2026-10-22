// Service worker de "Mi tarjeta de emergencia". Su alcance es solo
// /herramientas/tarjeta (ver el registro en src/components/TarjetaEmergencia.tsx),
// así que no interviene en el resto del sitio.
// Red primero; si no hay conexión, usa la copia guardada. Si el caché falla
// en cualquier punto, se pide la respuesta directamente a la red.
const CACHE_OFFLINE = "puente-offline-v1"; // igual que en src/lib/tarjeta.ts
const RUTA_TARJETA = "/herramientas/tarjeta";

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

async function guardarCopia(solicitud, respuesta) {
  try {
    const cache = await caches.open(CACHE_OFFLINE);
    await cache.put(solicitud, respuesta);
  } catch {
    // Sin caché: la página sigue funcionando con conexión.
  }
}

async function buscarCopia(solicitud) {
  try {
    const cache = await caches.open(CACHE_OFFLINE);
    return await cache.match(solicitud.url);
  } catch {
    return undefined;
  }
}

async function redPrimeroConCopia(evento, guardar) {
  const solicitud = evento.request;
  let respuesta;
  try {
    respuesta = await fetch(solicitud);
  } catch (error) {
    const copia = await buscarCopia(solicitud);
    if (copia) return copia;
    throw error;
  }
  if (guardar && respuesta.ok) {
    evento.waitUntil(guardarCopia(solicitud, respuesta.clone()));
  }
  return respuesta;
}

self.addEventListener("fetch", (evento) => {
  const solicitud = evento.request;
  if (solicitud.method !== "GET") return;
  const url = new URL(solicitud.url);
  if (url.origin !== self.location.origin) return;

  const esPagina = solicitud.mode === "navigate" && url.pathname === RUTA_TARJETA;
  // Los archivos /_next/static los guarda la propia página al cargar.
  const esArchivo = url.pathname.startsWith("/_next/static/");
  if (!esPagina && !esArchivo) return;

  evento.respondWith(
    redPrimeroConCopia(evento, esPagina).catch(() => fetch(solicitud)),
  );
});

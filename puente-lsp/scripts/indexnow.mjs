// Avisa a Bing (y a los buscadores que usan IndexNow) de las páginas del sitio.
// Lee el sitemap publicado y envía todas sus direcciones. Uso, después de publicar:
//   npm run indexnow
// La clave es pública: es el archivo public/<clave>.txt, que prueba que el sitio es nuestro.

const SITIO = (process.env.NEXT_PUBLIC_URL_SITIO || "https://puente-lsp.vercel.app").replace(/\/+$/, "");
const CLAVE = "75a449e08b5c3b4f1d306f1105d36605";

const sitemap = await (await fetch(`${SITIO}/sitemap.xml`)).text();
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
if (urls.length === 0) throw new Error("El sitemap no tiene direcciones");

const respuesta = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: new URL(SITIO).host,
    key: CLAVE,
    keyLocation: `${SITIO}/${CLAVE}.txt`,
    urlList: urls,
  }),
});

// 200 o 202: recibido. 403: la clave no coincide. 422: direcciones de otro sitio.
console.log(`IndexNow: ${respuesta.status} ${respuesta.statusText} · ${urls.length} direcciones`);
if (!respuesta.ok) process.exit(1);

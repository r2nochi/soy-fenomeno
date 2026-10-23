# SEO y visibilidad de Puente LSP

## Qué ya hace el sitio

- **Cada página** tiene título, descripción y URL canónica propios, con palabras que la gente busca ("intérprete de Lengua de Señas Peruana", "personas Sordas", "Perú"). Se arman con `metaPagina()` en `src/lib/seo.ts`.
- **Vista previa al compartir** (WhatsApp, Facebook, X, LinkedIn):
  - Cada sección tiene su imagen, generada al compilar (`opengraph-image.tsx`).
  - Los artículos del blog usan su foto de portada.
- **Datos para Google** (schema.org), visibles en el código de la página:
  - Organización y sitio web en la portada.
  - `BlogPosting` y migas de pan en cada artículo.
  - `WebApplication` gratuita en cada herramienta.
- **Archivos para buscadores y lectores:**
  - `sitemap.xml` y `robots.txt`.
  - Feed RSS del blog en `/blog/rss.xml`.
  - `/llms.txt`, un resumen para asistentes de IA como ChatGPT o Perplexity.
- **Instalar como app:** el manifiesto (`/manifest.webmanifest`) y los íconos con el puente del logotipo permiten instalar la página en el celular.
- **Botones para compartir** al final de cada artículo: menú del celular, WhatsApp y copiar enlace.
- **Páginas que no deben salir en Google:** la página del QR (`/s/...`), el afiche, el formulario `/lugares/nuevo` y `/disenos`. Llevan `noindex`. No se bloquean en robots.txt para que Google pueda ver esa etiqueta.

## Lo que tienes que hacer tú (gratis)

1. **Google Search Console**: https://search.google.com/search-console
   1. Agrega la propiedad "Prefijo de URL" `https://puente-lsp.vercel.app`.
   2. Elige verificar con **etiqueta HTML** y copia solo el código del atributo `content="..."`.
   3. En Vercel, ve a Project → Settings → Environment Variables y crea `NEXT_PUBLIC_VERIFICACION_GOOGLE` con ese código.
   4. Vuelve a desplegar y pulsa "Verificar".
   5. En "Sitemaps", envía `sitemap.xml`.
   6. Usa "Inspección de URLs" → "Solicitar indexación" en la portada y en las herramientas principales.
2. **Bing Webmaster Tools**: https://www.bing.com/webmasters
   - Puedes importar la propiedad desde Search Console, o verificar con la variable `NEXT_PUBLIC_VERIFICACION_BING` (el código de `msvalidate.01`).
   - Bing también alimenta a DuckDuckGo, Yahoo y ChatGPT Search.
3. **Redes sociales:** TikTok, YouTube, Instagram y X ya están en `REDES` (`src/lib/sitio.ts`) y salen en el sitio y en los datos para Google (`sameAs`). Falta Facebook: cuando exista, pega su enlace ahí. En Search Console puedes agregar también estas cuentas (sección "cuenta o canal de plataforma").
4. **Enlaces desde otros sitios**, que es lo que más sube el ranking: pide a las organizaciones de `/comunidad`, a colegios, a asociaciones de intérpretes y a municipalidades que enlacen a una herramienta concreta.
5. **Revisión de los artículos por una persona Sorda** (`revisado: true`). Da confianza y Google valora la experiencia real.
6. **Opcional, con costo:** un dominio propio (`.pe` o `.org`) se recuerda mejor que `vercel.app`. Si lo compras, cambia `NEXT_PUBLIC_URL_SITIO` y agrega el dominio nuevo en Search Console.

## Cómo comprobarlo

- Vista previa en WhatsApp: pega un enlace en un chat contigo mismo.
  - Facebook: https://developers.facebook.com/tools/debug/
  - LinkedIn: https://www.linkedin.com/post-inspector/
- Datos estructurados: https://search.google.com/test/rich-results
- Velocidad y SEO: Lighthouse en Chrome (F12 → Lighthouse) o https://pagespeed.web.dev/

## Al escribir un artículo nuevo

- **Título:** de 50 a 60 caracteres, con la frase que la gente buscaría, por ejemplo "cómo pedir intérprete en el hospital".
- **`resumen`:** de 120 a 155 caracteres. Es el texto que Google muestra debajo del título.
- **`fecha`:** la fecha real de publicación.
- **Enlaces:** incluye en el artículo al menos un enlace a una herramienta relacionada.

## IndexNow (Bing y otros buscadores)

Después de publicar páginas nuevas (por ejemplo un artículo del blog), corre `npm run indexnow`. Lee el sitemap publicado y avisa a Bing de todas las direcciones. La clave es el archivo `public/75a449e08b5c3b4f1d306f1105d36605.txt`: no lo borres.

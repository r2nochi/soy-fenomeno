// Feed RSS del blog: lectores de noticias y otros sitios avisan de cada artículo nuevo.
import { ARTICULOS } from "@/lib/blog";
import { escaparXml as escapar } from "@/lib/escapar";
import { NOMBRE_SITIO, urlAbsoluta } from "@/lib/seo";

export function GET() {
  const items = ARTICULOS.map((a) => {
    const url = urlAbsoluta(`/blog/${a.slug}`);
    return `    <item>
      <title>${escapar(a.titulo)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapar(a.resumen)}</description>
      <pubDate>${new Date(`${a.fecha}T12:00:00-05:00`).toUTCString()}</pubDate>
    </item>`;
  }).join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Blog de ${NOMBRE_SITIO}</title>
    <link>${urlAbsoluta("/blog")}</link>
    <description>Tips y guías en español sencillo para la comunidad Sorda del Perú y para quienes quieren comunicarse con ella.</description>
    <language>es-PE</language>
    <atom:link href="${urlAbsoluta("/blog/rss.xml")}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}

import type { MetadataRoute } from "next";
import { ARTICULOS } from "@/lib/blog";
import { HERRAMIENTAS } from "@/lib/herramientas";
import { URL_SITIO } from "@/lib/sitio";

// Solo las páginas que deben salir en buscadores. La fecha va solo donde es
// real (la de cada artículo); las demás no la llevan.
export default function sitemap(): MetadataRoute.Sitemap {
  const fijas = [
    "",
    "/interprete",
    "/herramientas",
    ...HERRAMIENTAS.map((h) => h.href),
    "/apps",
    "/blog",
    "/comunidad",
    "/trabajos",
    "/privacidad",
  ].map((ruta) => ({ url: `${URL_SITIO}${ruta}` }));
  const articulos = ARTICULOS.map((a) => ({
    url: `${URL_SITIO}/blog/${a.slug}`,
    lastModified: a.fecha,
    images: [`${URL_SITIO}${a.portada.src}`],
  }));
  return [...fijas, ...articulos];
}

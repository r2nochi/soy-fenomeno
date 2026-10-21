import type { MetadataRoute } from "next";
import { ARTICULOS } from "@/lib/blog";
import { URL_SITIO } from "@/lib/sitio";

export default function sitemap(): MetadataRoute.Sitemap {
  const fijas = ["", "/interprete", "/herramientas/alerta-visual", "/blog", "/comunidad", "/trabajos"].map(
    (ruta) => ({ url: `${URL_SITIO}${ruta}` }),
  );
  const articulos = ARTICULOS.map((a) => ({
    url: `${URL_SITIO}/blog/${a.slug}`,
    lastModified: a.fecha,
  }));
  return [...fijas, ...articulos];
}

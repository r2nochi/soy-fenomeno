import type { MetadataRoute } from "next";
import { ARTICULOS } from "@/lib/blog";
import { PAISES_DERECHOS, categoriasDe } from "@/lib/derechos";
import { HERRAMIENTAS } from "@/lib/herramientas";
import { filtrosConNoticias } from "@/lib/noticias";
import { paisesComunidad, paisesTrabajos } from "@/lib/paises-recursos";
import { URL_SITIO } from "@/lib/sitio";

// Solo las páginas que deben salir en buscadores. La fecha va solo donde es
// real (la de cada artículo); las demás no la llevan.
export default function sitemap(): MetadataRoute.Sitemap {
  const fijas = [
    "",
    "/interprete",
    "/herramientas",
    ...HERRAMIENTAS.map((h) => h.href),
    "/aprende",
    "/apps",
    "/blog",
    "/derechos",
    ...PAISES_DERECHOS.flatMap((p) => [
      `/derechos/${p.slug}`,
      ...categoriasDe(p.slug).map((c) => `/derechos/${p.slug}/${c.slug}`),
    ]),
    "/noticias",
    ...filtrosConNoticias().map((f) => `/noticias/${f.slug}`),
    "/comunidad",
    ...paisesComunidad().map((p) => `/comunidad/${p.slug}`),
    "/trabajos",
    ...paisesTrabajos().map((p) => `/trabajos/${p.slug}`),
    "/nosotros",
    "/privacidad",
  ].map((ruta) => ({ url: `${URL_SITIO}${ruta}` }));
  const articulos = ARTICULOS.map((a) => ({
    url: `${URL_SITIO}/blog/${a.slug}`,
    lastModified: a.fecha,
    images: [`${URL_SITIO}${a.portada.src}`],
  }));
  return [...fijas, ...articulos];
}

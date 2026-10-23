// Metadatos para buscadores y para compartir en redes (WhatsApp, Facebook…).
// Next mezcla los metadatos de forma superficial: si una página define
// openGraph, pierde el del layout. Por eso cada página arma el suyo completo aquí.

import type { Metadata } from "next";
import { REDES, URL_SITIO } from "./sitio";

export const NOMBRE_SITIO = "Puente LSP";

export const DESCRIPCION_SITIO =
  "Herramientas gratis para la comunidad Sorda del Perú: conversación cara a cara, Alerta Visual con subtítulos, tarjeta de emergencia, carta para pedir intérprete de Lengua de Señas Peruana (LSP), lugares accesibles y trabajos.";

export const FEED_BLOG = {
  "application/rss+xml": [{ url: "/blog/rss.xml", title: `Blog de ${NOMBRE_SITIO}` }],
};

type DatosPagina = {
  // Sin " · Puente LSP": la plantilla del layout lo agrega.
  titulo: string;
  descripcion: string;
  // Ruta de la página, empezando con "/".
  ruta: string;
  // Solo para la portada: título sin la plantilla.
  tituloCompleto?: boolean;
  articulo?: { publicado: string; imagen: { url: string; alt: string } };
};

export function metaPagina({
  titulo,
  descripcion,
  ruta,
  tituloCompleto,
  articulo,
}: DatosPagina): Metadata {
  return {
    title: tituloCompleto ? { absolute: titulo } : titulo,
    description: descripcion,
    // "alternates" también se reemplaza entero: se repite aquí el feed del blog.
    alternates: { canonical: ruta, types: FEED_BLOG },
    openGraph: {
      title: titulo,
      description: descripcion,
      url: ruta,
      siteName: NOMBRE_SITIO,
      locale: "es_PE",
      ...(articulo
        ? {
            type: "article",
            publishedTime: articulo.publicado,
            images: [{ ...articulo.imagen, width: 1600, height: 1066 }],
          }
        : { type: "website" }),
    },
  };
}

export const urlAbsoluta = (ruta: string) => `${URL_SITIO}${ruta}`;

// Datos estructurados (schema.org) para Google y otros buscadores.
// Solo redes que ya existen: nunca se inventan cuentas.
const redes = REDES.flatMap((r) => (r.url ? [r.url] : []));

export const ORGANIZACION = {
  "@type": "Organization",
  "@id": `${URL_SITIO}/#organizacion`,
  name: NOMBRE_SITIO,
  url: URL_SITIO,
  logo: `${URL_SITIO}/icon/512`,
  areaServed: { "@type": "Country", name: "Perú" },
  ...(redes.length > 0 && { sameAs: redes }),
};

// Una herramienta del sitio: es gratis y funciona en el navegador.
export const datosHerramienta = (h: { titulo: string; descripcion: string; ruta: string }) => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: h.titulo,
      description: h.descripcion,
      url: urlAbsoluta(h.ruta),
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Web",
      inLanguage: "es-PE",
      isAccessibleForFree: true,
      offers: { "@type": "Offer", price: "0", priceCurrency: "PEN" },
      publisher: { "@id": ORGANIZACION["@id"] },
    },
    migas([
      { nombre: "Inicio", ruta: "/" },
      { nombre: "Herramientas", ruta: "/herramientas" },
      { nombre: h.titulo, ruta: h.ruta },
    ]),
  ],
});

// Ruta de migas de pan; va dentro de un "@graph".
export const migas = (pasos: { nombre: string; ruta: string }[]) => ({
  "@type": "BreadcrumbList",
  itemListElement: pasos.map((p, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: p.nombre,
    item: urlAbsoluta(p.ruta),
  })),
});

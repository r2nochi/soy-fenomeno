// Registro de artículos del blog. Cada artículo es un .mdx en
// src/contenido/blog/ que exporta sus datos como `metadata`. Para publicar uno
// nuevo: crear el .mdx y agregarlo a la lista de abajo.

import { metadata as comoHablar } from "@/contenido/blog/como-hablar-con-una-persona-sorda.mdx";
import { metadata as lspNoEsEspanol } from "@/contenido/blog/la-lsp-no-es-espanol-con-las-manos.mdx";
import { metadata as interpreteLey } from "@/contenido/blog/interpretes-de-lsp-lo-que-dice-la-ley.mdx";
import { metadata as alertaCasa } from "@/contenido/blog/sonidos-de-tu-casa-en-avisos.mdx";

export type DatosArticulo = {
  slug: string;
  titulo: string;
  // Una frase que dé ganas de seguir leyendo. Se usa en listados y en Google.
  resumen: string;
  minutos: number;
  // AAAA-MM-DD
  fecha: string;
  // false hasta que lo revise una persona Sorda (nada sobre nosotros sin nosotros).
  revisado: boolean;
};

export const ARTICULOS: DatosArticulo[] = [
  comoHablar,
  lspNoEsEspanol,
  interpreteLey,
  alertaCasa,
].sort((a, b) => b.fecha.localeCompare(a.fecha));

export const articuloPorSlug = (slug: string) =>
  ARTICULOS.find((a) => a.slug === slug);

export const fechaLegible = (fecha: string) =>
  new Date(`${fecha}T12:00:00`).toLocaleDateString("es-PE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

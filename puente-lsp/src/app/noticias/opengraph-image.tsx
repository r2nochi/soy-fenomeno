import { imagenOg, TAMANO_OG } from "@/lib/imagen-og";

export const alt = "Noticias de Puente LSP";
export const size = TAMANO_OG;
export const contentType = "image/png";

export default function Imagen() {
  return imagenOg(
    "Noticias sobre personas Sordas",
    "Perú, Latinoamérica y el mundo, por país y por tema. Resumen en español sencillo y enlace a la nota original.",
  );
}

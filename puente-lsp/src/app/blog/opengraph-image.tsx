import { imagenOg, TAMANO_OG } from "@/lib/imagen-og";

export const alt = "Blog de Puente LSP";
export const size = TAMANO_OG;
export const contentType = "image/png";

export default function Imagen() {
  return imagenOg(
    "Blog de Puente LSP",
    "Tips y guías en español sencillo: cómo hablar con una persona Sorda, la LSP, la ley y más.",
  );
}

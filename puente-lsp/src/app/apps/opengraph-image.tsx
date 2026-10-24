import { imagenOg, TAMANO_OG } from "@/lib/imagen-og";

export const alt = "Apps útiles para personas Sordas";
export const size = TAMANO_OG;
export const contentType = "image/png";

export default function Imagen() {
  return imagenOg(
    "Apps útiles para personas Sordas",
    "Subtítulos en vivo para casi cualquier video, avisos de sonidos y servicios por país.",
  );
}

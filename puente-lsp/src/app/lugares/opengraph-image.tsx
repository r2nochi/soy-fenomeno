import { imagenOg, TAMANO_OG } from "@/lib/imagen-og";

export const alt = "Lugares accesibles";
export const size = TAMANO_OG;
export const contentType = "image/png";

export default function Imagen() {
  return imagenOg(
    "Lugares accesibles",
    "Dónde atienden bien a personas Sordas, contado por la comunidad.",
  );
}

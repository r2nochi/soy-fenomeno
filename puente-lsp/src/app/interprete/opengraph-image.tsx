import { imagenOg, TAMANO_OG } from "@/lib/imagen-og";

export const alt = "Intérprete de LSP por videollamada";
export const size = TAMANO_OG;
export const contentType = "image/png";

export default function Imagen() {
  return imagenOg(
    "Intérprete de LSP por videollamada",
    "Anótate en la lista del piloto: personas Sordas, entidades e intérpretes.",
  );
}

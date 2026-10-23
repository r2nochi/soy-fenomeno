import { imagenOg, TAMANO_OG } from "@/lib/imagen-og";

export const alt = "Pide tu intérprete de LSP";
export const size = TAMANO_OG;
export const contentType = "image/png";

export default function Imagen() {
  return imagenOg(
    "Pide tu intérprete de LSP",
    "Una carta formal lista, con la ley citada, para pedir intérprete de Lengua de Señas Peruana.",
  );
}

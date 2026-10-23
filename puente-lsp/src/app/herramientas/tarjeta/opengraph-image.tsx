import { imagenOg, TAMANO_OG } from "@/lib/imagen-og";

export const alt = "Mi tarjeta de emergencia";
export const size = TAMANO_OG;
export const contentType = "image/png";

export default function Imagen() {
  return imagenOg(
    "Mi tarjeta de emergencia",
    "Muestra en un toque que eres Sordo/a y a quién llamar. Funciona sin internet.",
  );
}

import { imagenOg, TAMANO_OG } from "@/lib/imagen-og";

export const alt = "Quiénes somos: Puente LSP";
export const size = TAMANO_OG;
export const contentType = "image/png";

export default function Imagen() {
  return imagenOg(
    "Quiénes somos",
    "Herramientas e información gratis para la comunidad Sorda del Perú. Súmate.",
  );
}

import { imagenOg, TAMANO_OG } from "@/lib/imagen-og";

export const alt = "Privacidad en Puente LSP";
export const size = TAMANO_OG;
export const contentType = "image/png";

export default function Imagen() {
  return imagenOg(
    "Privacidad en Puente LSP",
    "Qué datos guardamos, para qué y cómo pedir que los borremos.",
  );
}

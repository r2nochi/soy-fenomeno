import { imagenOg, TAMANO_OG } from "@/lib/imagen-og";

export const alt = "Derechos y beneficios de las personas Sordas";
export const size = TAMANO_OG;
export const contentType = "image/png";

export default function Imagen() {
  return imagenOg(
    "Derechos y beneficios",
    "Qué dice la ley, para quién es y cómo pedirlo. Con su fuente.",
  );
}

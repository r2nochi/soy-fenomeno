import { imagenOg, TAMANO_OG } from "@/lib/imagen-og";

export const alt = "Comunidad Sorda del Perú";
export const size = TAMANO_OG;
export const contentType = "image/png";

export default function Imagen() {
  return imagenOg(
    "Comunidad Sorda del Perú",
    "Organizaciones, cursos de Lengua de Señas Peruana, instituciones y colegios.",
  );
}

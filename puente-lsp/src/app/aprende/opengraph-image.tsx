import { imagenOg, TAMANO_OG } from "@/lib/imagen-og";

export const alt = "Aprende Lengua de Señas Peruana";
export const size = TAMANO_OG;
export const contentType = "image/png";

export default function Imagen() {
  return imagenOg(
    "Aprende Lengua de Señas Peruana",
    "Deletrea tu nombre con las manos y aprende tus primeras señas con personas Sordas.",
  );
}

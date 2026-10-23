import { imagenOg, TAMANO_OG } from "@/lib/imagen-og";

export const alt = "Alerta Visual y subtítulos";
export const size = TAMANO_OG;
export const contentType = "image/png";

export default function Imagen() {
  return imagenOg(
    "Alerta Visual y subtítulos",
    "El timbre, las alarmas y el llanto del bebé en avisos que se ven. La voz, en subtítulos.",
  );
}

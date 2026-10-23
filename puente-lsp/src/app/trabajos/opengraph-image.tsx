import { imagenOg, TAMANO_OG } from "@/lib/imagen-og";

export const alt = "Trabajos para personas con discapacidad";
export const size = TAMANO_OG;
export const contentType = "image/png";

export default function Imagen() {
  return imagenOg(
    "Trabajos para personas con discapacidad",
    "Empleos por área en el Perú: portales inclusivos y convocatorias del Estado.",
  );
}

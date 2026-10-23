import { imagenOg, TAMANO_OG } from "@/lib/imagen-og";

export const alt = "Conversación cara a cara";
export const size = TAMANO_OG;
export const contentType = "image/png";

export default function Imagen() {
  return imagenOg(
    "Conversación cara a cara",
    "Una persona escribe, la otra habla, y todo se lee en letra grande.",
  );
}

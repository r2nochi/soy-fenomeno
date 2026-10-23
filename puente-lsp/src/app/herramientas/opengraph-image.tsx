import { imagenOg, TAMANO_OG } from "@/lib/imagen-og";

export const alt = "Herramientas gratis";
export const size = TAMANO_OG;
export const contentType = "image/png";

export default function Imagen() {
  return imagenOg(
    "Herramientas gratis",
    "Conversación cara a cara, Alerta Visual, tarjeta de emergencia, carta para pedir intérprete y más.",
  );
}

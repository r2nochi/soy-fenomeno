import { imagenOg, TAMANO_OG } from "@/lib/imagen-og";

export const alt = "Herramientas para la comunidad Sorda";
export const size = TAMANO_OG;
export const contentType = "image/png";

export default function Imagen() {
  return imagenOg(
    "Herramientas para la comunidad Sorda",
    "Conversa, recibe avisos visuales, pide tu intérprete de LSP y encuentra lugares que te atienden bien.",
  );
}

import { imagenIcono } from "@/lib/imagen-og";

// 48 para la pestaña y Google; 192 y 512 para instalar el sitio en el celular.
const LADOS = [48, 192, 512];

export function generateImageMetadata() {
  return LADOS.map((lado) => ({
    id: String(lado),
    size: { width: lado, height: lado },
    contentType: "image/png",
  }));
}

export default async function Icono({ id }: { id: Promise<string> }) {
  return imagenIcono(Number(await id));
}

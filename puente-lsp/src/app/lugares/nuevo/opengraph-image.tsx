import { imagenOg, TAMANO_OG } from "@/lib/imagen-og";

export const alt = "Cuéntanos dónde te atendieron bien";
export const size = TAMANO_OG;
export const contentType = "image/png";

export default function Imagen() {
  return imagenOg(
    "Cuéntanos dónde te atendieron bien",
    "Recomienda un lugar que atiende bien a personas Sordas. Lo revisamos antes de publicarlo.",
  );
}

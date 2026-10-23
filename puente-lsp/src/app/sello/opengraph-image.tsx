import { imagenOg, TAMANO_OG } from "@/lib/imagen-og";

export const alt = "Sello: Aquí atendemos a personas Sordas";
export const size = TAMANO_OG;
export const contentType = "image/png";

export default function Imagen() {
  return imagenOg(
    "Sello: Aquí atendemos a personas Sordas",
    "Registra tu local gratis y recibe un afiche con QR para conversar con clientes Sordos.",
  );
}

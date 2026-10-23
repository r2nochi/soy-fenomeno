import type { MetadataRoute } from "next";
import { DESCRIPCION_SITIO, NOMBRE_SITIO } from "@/lib/seo";

// Permite instalar el sitio en el celular como una app.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${NOMBRE_SITIO} · Herramientas para la comunidad Sorda`,
    short_name: NOMBRE_SITIO,
    description: DESCRIPCION_SITIO,
    lang: "es-PE",
    start_url: "/",
    display: "standalone",
    background_color: "#f3f5f9",
    theme_color: "#0b4fd1",
    icons: [
      { src: "/icon/192", sizes: "192x192", type: "image/png" },
      { src: "/icon/512", sizes: "512x512", type: "image/png" },
      { src: "/icon/512", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}

import type { Metadata, Viewport } from "next";
import { Atkinson_Hyperlegible } from "next/font/google";
import { URL_SITIO } from "@/lib/sitio";
import { Cabecera } from "@/components/Cabecera";
import { PiePagina } from "@/components/PiePagina";
import "./globals.css";

// Fuente diseñada para máxima legibilidad.
const atkinson = Atkinson_Hyperlegible({
  variable: "--font-atkinson",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(URL_SITIO),
  title: {
    default: "Puente LSP · Herramientas para la comunidad Sorda del Perú",
    template: "%s · Puente LSP",
  },
  description:
    "Pide un intérprete de Lengua de Señas Peruana (LSP), convierte los sonidos en avisos visuales y lee tips para la comunidad Sorda. Gratis y en español.",
};

export const viewport: Viewport = {
  themeColor: "#0b4fd1",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-PE" className={`${atkinson.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-accion focus:px-4 focus:py-2 focus:text-sobre-accion"
        >
          Saltar al contenido
        </a>
        <Cabecera />
        {children}
        <PiePagina />
      </body>
    </html>
  );
}

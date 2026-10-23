import type { Metadata, Viewport } from "next";
import { Atkinson_Hyperlegible } from "next/font/google";
import { DESCRIPCION_SITIO, FEED_BLOG, NOMBRE_SITIO } from "@/lib/seo";
import { URL_SITIO } from "@/lib/sitio";
import { Asistente } from "@/components/Asistente";
import { Cabecera } from "@/components/Cabecera";
import { PiePagina } from "@/components/PiePagina";
import "./globals.css";

// Fuente diseñada para máxima legibilidad.
const atkinson = Atkinson_Hyperlegible({
  variable: "--font-atkinson",
  subsets: ["latin"],
  weight: ["400", "700"],
});

// Códigos de Google Search Console y Bing Webmaster Tools: se pegan en las
// variables de entorno de Vercel. Sin código, la etiqueta no se muestra.
const verificacionGoogle = process.env.NEXT_PUBLIC_VERIFICACION_GOOGLE;
const verificacionBing = process.env.NEXT_PUBLIC_VERIFICACION_BING;

// Cada página define su título, descripción, canónica y openGraph con
// metaPagina (lib/seo.ts); aquí solo va lo común a todo el sitio.
export const metadata: Metadata = {
  metadataBase: new URL(URL_SITIO),
  title: {
    default: `${NOMBRE_SITIO} · Herramientas para la comunidad Sorda del Perú`,
    template: `%s · ${NOMBRE_SITIO}`,
  },
  description: DESCRIPCION_SITIO,
  applicationName: NOMBRE_SITIO,
  twitter: { card: "summary_large_image" },
  alternates: { types: FEED_BLOG },
  verification: {
    ...(verificacionGoogle && { google: verificacionGoogle }),
    ...(verificacionBing && { other: { "msvalidate.01": verificacionBing } }),
  },
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
        <Asistente />
      </body>
    </html>
  );
}

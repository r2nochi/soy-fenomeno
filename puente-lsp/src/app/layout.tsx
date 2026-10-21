import type { Metadata } from "next";
import { Atkinson_Hyperlegible } from "next/font/google";
import "./globals.css";

// Fuente diseñada para máxima legibilidad.
const atkinson = Atkinson_Hyperlegible({
  variable: "--font-atkinson",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Puente LSP · Intérprete de lengua de señas por videollamada",
  description:
    "Conecta con un intérprete de Lengua de Señas Peruana (LSP) por videollamada. Para personas Sordas, empresas y entidades en Perú.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-PE" className={`${atkinson.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-acento focus:px-4 focus:py-2 focus:text-sobre-acento"
        >
          Saltar al contenido
        </a>
        {children}
      </body>
    </html>
  );
}

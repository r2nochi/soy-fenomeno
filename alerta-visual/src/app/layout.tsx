import type { Metadata, Viewport } from "next";
import { Atkinson_Hyperlegible } from "next/font/google";
import "./globals.css";

const atkinson = Atkinson_Hyperlegible({
  variable: "--font-atkinson",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Alerta Visual",
  description:
    "Convierte sonidos importantes (alarmas, timbre, teléfono, bebé) en avisos visuales grandes. Para personas Sordas. Gratis y sin registro.",
};

export const viewport: Viewport = {
  themeColor: "#0b4fd1",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-PE" className={`${atkinson.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}

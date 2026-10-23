import type { Metadata } from "next";
import { metaPagina } from "@/lib/seo";
import { ListaHerramientas } from "@/components/ListaHerramientas";

export const metadata: Metadata = metaPagina({
  titulo: "Herramientas gratis para la comunidad Sorda",
  descripcion:
    "Conversación cara a cara, Alerta Visual, tarjeta de emergencia, carta para pedir intérprete, lugares accesibles y sello para negocios. Gratis.",
  ruta: "/herramientas",
});

export default function Herramientas() {
  return (
    <main id="contenido" className="mx-auto w-full max-w-6xl flex-1 px-4 py-14 sm:px-8">
      <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">Herramientas</h1>
      <p className="mt-4 mb-10 max-w-[50ch] text-2xl leading-snug text-suave">
        Gratis y pensadas para el día a día. Casi todas, sin registro.
      </p>
      <ListaHerramientas />
    </main>
  );
}

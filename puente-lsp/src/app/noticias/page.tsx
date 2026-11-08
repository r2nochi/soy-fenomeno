import type { Metadata } from "next";
import { metaPagina } from "@/lib/seo";
import { noticiasRecientes } from "@/lib/noticias";
import { AvisoNoticias, FiltrosNoticias, ListaNoticias } from "@/components/ListaNoticias";

export const metadata: Metadata = metaPagina({
  titulo: "Noticias sobre personas Sordas: Perú, Latinoamérica y el mundo",
  descripcion:
    "Noticias numeradas sobre la comunidad Sorda del Perú, Latinoamérica y el mundo, por país y por tema: educación, leyes, intérpretes, implante coclear y más. Resumen en español sencillo y enlace al medio original.",
  ruta: "/noticias",
});

export default function Noticias() {
  return (
    <main id="contenido" className="mx-auto w-full max-w-6xl flex-1 px-4 py-14 sm:px-8">
      <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">Noticias</h1>
      <p className="mt-4 max-w-[50ch] text-2xl leading-snug text-suave">
        Lo que pasa con las personas Sordas en el Perú, Latinoamérica y el mundo.
        Resumido en español sencillo, con el enlace a la nota original.
      </p>
      <FiltrosNoticias />
      <ListaNoticias noticias={noticiasRecientes()} />
      <AvisoNoticias />
    </main>
  );
}

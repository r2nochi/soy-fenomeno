import type { Metadata } from "next";
import { metaPagina } from "@/lib/seo";
import { ExternalLink } from "lucide-react";
import { DIRECTORIO } from "@/lib/directorio";
import { enlaceWhatsapp } from "@/lib/sitio";

export const metadata: Metadata = metaPagina({
  titulo: "Comunidad Sorda del Perú: organizaciones, cursos de LSP e instituciones",
  descripcion:
    "Directorio de organizaciones Sordas, intérpretes, cursos de Lengua de Señas Peruana, instituciones y colegios en Perú.",
  ruta: "/comunidad",
});

const SUMAR = enlaceWhatsapp("Hola, quiero sugerir una organización para el directorio de Puente LSP.");

export default function Comunidad() {
  return (
    <main id="contenido" className="mx-auto w-full max-w-5xl flex-1 px-4 py-14 sm:px-8">
      <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">Comunidad</h1>
      <p className="mt-4 max-w-[55ch] text-2xl leading-snug text-suave">
        Organizaciones, cursos de LSP e instituciones que trabajan por la
        inclusión de las personas Sordas en el Perú.
      </p>

      {DIRECTORIO.map((g) => (
        <section key={g.id} aria-labelledby={`grupo-${g.id}`} className="mt-14">
          <h2 id={`grupo-${g.id}`} className="text-3xl font-bold">{g.titulo}</h2>
          <p className="mt-1 text-xl text-suave">{g.texto}</p>
          <ul className="mt-6 divide-y-2 divide-borde/25 rounded-[28px] border-[3px] border-borde/55 bg-superficie">
            {g.entradas.map((e) => (
              <li key={e.nombre} className="p-6">
                <h3 className="text-2xl font-bold">{e.nombre}</h3>
                {e.lugar && <p className="text-lg text-suave">{e.lugar}</p>}
                <p className="mt-2 max-w-[65ch] text-xl leading-snug">{e.descripcion}</p>
                {e.nota && <p className="mt-2 text-lg text-suave">{e.nota}</p>}
                <p className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-lg font-bold">
                  {e.enlaces.map((l) => (
                    <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-acento underline underline-offset-4">
                      {l.texto}
                      <ExternalLink aria-hidden="true" className="size-4" />
                    </a>
                  ))}
                  <a href={e.fuente} target="_blank" rel="noopener noreferrer" className="text-base font-bold text-suave underline underline-offset-4">
                    Fuente
                  </a>
                </p>
              </li>
            ))}
          </ul>
        </section>
      ))}

      <p className="mt-14 text-xl leading-snug">
        Revisado el 21 de octubre de 2026. ¿Falta tu organización o hay un dato
        que corregir?{" "}
        {SUMAR && (
          <a href={SUMAR} target="_blank" rel="noopener noreferrer" className="font-bold text-acento underline underline-offset-4">
            Escríbenos por WhatsApp
          </a>
        )}
      </p>
    </main>
  );
}

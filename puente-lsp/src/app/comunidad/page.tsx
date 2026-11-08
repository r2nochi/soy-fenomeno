import type { Metadata } from "next";
import Link from "next/link";
import { metaPagina } from "@/lib/seo";
import { DIRECTORIO } from "@/lib/directorio";
import { paisesComunidad } from "@/lib/paises-recursos";
import { enlaceWhatsapp } from "@/lib/sitio";
import { BotonesPais } from "@/components/BotonesPais";
import { GruposDirectorio } from "@/components/GruposDirectorio";

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

      <BotonesPais base="/comunidad" paises={paisesComunidad()} activo="peru" />

      <GruposDirectorio
        grupos={DIRECTORIO}
        extra={{
          aprender: (
            <p className="mt-2 text-xl">
              <Link href="/aprende" className="font-bold text-acento underline underline-offset-4">
                Empieza aquí: abecedario y primeras señas en Puente LSP
              </Link>
            </p>
          ),
        }}
      />

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

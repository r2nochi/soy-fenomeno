import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { metaPagina } from "@/lib/seo";
import { COMUNIDAD_POR_PAIS, paisRecurso, paisesComunidad, type PaisRecurso } from "@/lib/paises-recursos";
import { enlaceWhatsapp } from "@/lib/sitio";
import { BotonesPais } from "@/components/BotonesPais";
import { GruposDirectorio } from "@/components/GruposDirectorio";

export function generateStaticParams() {
  return paisesComunidad().map((p) => ({ pais: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/comunidad/[pais]">): Promise<Metadata> {
  const { pais } = await params;
  const p = paisRecurso(pais);
  if (!p || !COMUNIDAD_POR_PAIS[p.slug]) return {};
  return metaPagina({
    titulo: `Comunidad Sorda en ${p.nombre}`,
    descripcion: `Organizaciones y recursos para personas Sordas en ${p.nombre}, con enlace a su fuente.`,
    ruta: `/comunidad/${p.slug}`,
  });
}

const SUMAR = enlaceWhatsapp("Hola, quiero sugerir una organización para el directorio de Puente LSP.");

export default async function ComunidadPais({ params }: PageProps<"/comunidad/[pais]">) {
  const { pais } = await params;
  const p = paisRecurso(pais);
  const grupos = p && COMUNIDAD_POR_PAIS[p.slug as PaisRecurso];
  if (!p || !grupos) notFound();

  return (
    <main id="contenido" className="mx-auto w-full max-w-5xl flex-1 px-4 py-14 sm:px-8">
      <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">Comunidad en {p.nombre}</h1>
      <p className="mt-4 max-w-[55ch] text-2xl leading-snug text-suave">
        Organizaciones y recursos para las personas Sordas en {p.nombre}.
      </p>
      <BotonesPais base="/comunidad" paises={paisesComunidad()} activo={p.slug} />
      <GruposDirectorio grupos={grupos} />
      <p className="mt-14 text-xl leading-snug">
        Revisado el 8 de noviembre de 2026. Esta lista recién empieza. ¿Falta tu
        organización o hay un dato que corregir?{" "}
        {SUMAR && (
          <a href={SUMAR} target="_blank" rel="noopener noreferrer" className="font-bold text-acento underline underline-offset-4">
            Escríbenos por WhatsApp
          </a>
        )}
      </p>
    </main>
  );
}

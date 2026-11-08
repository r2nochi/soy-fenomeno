import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BadgeCheck, ExternalLink, Landmark } from "lucide-react";
import { metaPagina } from "@/lib/seo";
import { PAISES_RECURSOS, TRABAJOS_POR_PAIS, paisRecurso, paisesTrabajos } from "@/lib/paises-recursos";
import { BotonesPais } from "@/components/BotonesPais";

export function generateStaticParams() {
  return PAISES_RECURSOS.map((p) => ({ pais: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/trabajos/[pais]">): Promise<Metadata> {
  const { pais } = await params;
  const p = paisRecurso(pais);
  if (!p) return {};
  return metaPagina({
    titulo: `Trabajos para personas con discapacidad en ${p.nombre}`,
    descripcion: `Portales de empleo para personas con discapacidad y portales oficiales de empleo en ${p.nombre}.`,
    ruta: `/trabajos/${p.slug}`,
  });
}

export default async function TrabajosPais({ params }: PageProps<"/trabajos/[pais]">) {
  const { pais } = await params;
  const p = paisRecurso(pais);
  if (!p) notFound();

  return (
    <main id="contenido" className="mx-auto w-full max-w-5xl flex-1 px-4 py-14 sm:px-8">
      <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">Trabajos en {p.nombre}</h1>
      <p className="mt-4 max-w-[55ch] text-2xl leading-snug text-suave">
        Portales donde buscar empleo si tienes discapacidad. Las ofertas se ven
        en cada portal.
      </p>
      <BotonesPais base="/trabajos" paises={paisesTrabajos()} activo={p.slug} />
      <ul className="mt-10 grid gap-4 md:grid-cols-2">
        {TRABAJOS_POR_PAIS[p.slug].map((t) => {
          const Icono = t.tipo === "estado" ? Landmark : BadgeCheck;
          return (
            <li key={t.url}>
              <a
                href={t.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col rounded-[28px] border-[3px] border-borde/55 bg-superficie p-6 no-underline hover:border-acento"
              >
                <Icono aria-hidden="true" className="size-9 text-acento" strokeWidth={2.25} />
                <h2 className="mt-3 text-2xl font-bold group-hover:underline">
                  {t.nombre}
                  <ExternalLink aria-hidden="true" className="ml-2 inline size-5 text-acento" />
                  <span className="sr-only"> (se abre en otra pestaña)</span>
                </h2>
                <p className="mt-2 text-lg leading-snug text-suave">{t.texto}</p>
              </a>
            </li>
          );
        })}
      </ul>
      <p className="mt-10 max-w-[65ch] text-lg text-suave">
        Revisado el 8 de noviembre de 2026. Puente LSP no publica ni revisa estas
        ofertas. Lee siempre los requisitos en el aviso original.
      </p>
    </main>
  );
}

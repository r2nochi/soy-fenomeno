import Link from "next/link";
import { ArrowRight, BellRing, Captions, HandHelping } from "lucide-react";
import { ARTICULOS, fechaLegible } from "@/lib/blog";

// Opción "Portada de periódico": el blog lidera, las herramientas acompañan.
const HERRAMIENTAS = [
  { href: "/interprete", Icono: HandHelping, titulo: "Pedir intérprete LSP", texto: "Por videollamada", principal: true },
  { href: "/herramientas/alerta-visual", Icono: BellRing, titulo: "Alerta Visual", texto: "Sonidos que se ven", principal: false },
  { href: "/herramientas/alerta-visual", Icono: Captions, titulo: "Subtítulos en vivo", texto: "La voz, en texto", principal: false },
];

export default function PortadaPeriodico() {
  const [destacado, ...resto] = ARTICULOS;

  return (
    <main id="contenido" className="flex-1">
      <div className="mx-auto max-w-6xl px-4 pt-10 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b-[6px] border-texto pb-4">
          <p className="text-6xl leading-none font-bold tracking-tight sm:text-7xl">Puente LSP</p>
          <p className="text-lg font-bold text-suave">Tips, herramientas y derechos · en español sencillo</p>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-12 sm:px-8 lg:grid-cols-[2fr_1fr]">
        {destacado && (
          <Link href={`/blog/${destacado.slug}`} className="group no-underline">
            <h1 className="max-w-[20ch] text-5xl leading-[1.05] font-bold tracking-tight text-balance group-hover:underline sm:text-6xl">
              {destacado.titulo}
            </h1>
            <p className="mt-6 max-w-[55ch] text-2xl leading-snug text-suave">{destacado.resumen}</p>
            <p className="mt-6 text-lg font-bold text-acento">
              {destacado.minutos} min de lectura · {fechaLegible(destacado.fecha)}
            </p>
          </Link>
        )}

        <aside aria-labelledby="titulo-herramientas">
          <h2 id="titulo-herramientas" className="border-b-[3px] border-texto pb-2 text-2xl font-bold">
            Herramientas
          </h2>
          <ul className="mt-4 space-y-4">
            {HERRAMIENTAS.map(({ href, Icono, titulo, texto, principal }) => (
              <li key={titulo}>
                <Link
                  href={href}
                  className={`flex items-center gap-4 rounded-[20px] p-5 no-underline ${principal ? "bg-accion text-sobre-accion hover:bg-accion-hover" : "border-[3px] border-borde/55 bg-superficie hover:border-acento"}`}
                >
                  <Icono aria-hidden="true" className="size-9 shrink-0" strokeWidth={2.25} />
                  <span>
                    <span className="block text-2xl font-bold">{titulo}</span>
                    <span className="text-lg opacity-85">{texto}</span>
                  </span>
                  <ArrowRight aria-hidden="true" className="ml-auto size-6 shrink-0" />
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      </div>

      <section aria-labelledby="titulo-mas" className="mx-auto max-w-6xl px-4 pb-16 sm:px-8">
        <h2 id="titulo-mas" className="border-b-[3px] border-texto pb-2 text-2xl font-bold">
          Más para leer
        </h2>
        <ul className="grid gap-x-10 md:grid-cols-3">
          {resto.map((a) => (
            <li key={a.slug} className="border-b-2 border-borde/25 py-6 md:border-b-0">
              <Link href={`/blog/${a.slug}`} className="group no-underline">
                <h3 className="text-2xl leading-snug font-bold text-balance group-hover:underline">{a.titulo}</h3>
                <p className="mt-2 text-lg leading-snug text-suave">{a.resumen}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

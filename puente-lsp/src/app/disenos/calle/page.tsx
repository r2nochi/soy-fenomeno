import Link from "next/link";
import { ArrowRight, BellRing, BookOpen, HandHelping } from "lucide-react";

// Opción "Lo que suena, ahora se ve": la primera pantalla demuestra la herramienta.
// Conversación de ejemplo, no real.
const LINEAS = [
  { texto: "Hola, ¿ya llegaste? Te estaba esperando.", sonido: false },
  { texto: "(🚨 posible sirena)", sonido: true },
  { texto: "Sí, perdón, había mucho tráfico.", sonido: false },
  { texto: "(🐕 perro ladrando)", sonido: true },
  { texto: "¿Quieres que pidamos un intérprete para la cita?", sonido: false },
];

const SIGUIENTES = [
  { href: "/interprete", Icono: HandHelping, titulo: "Pedir intérprete LSP" },
  { href: "/herramientas/alerta-visual", Icono: BellRing, titulo: "Avisos de sonido" },
  { href: "/blog", Icono: BookOpen, titulo: "Leer el blog" },
];

export default function PortadaCalle() {
  return (
    <main id="contenido" className="flex-1 bg-tinta text-sobre-tinta">
      <section className="mx-auto max-w-6xl px-4 pt-14 pb-12 sm:px-8">
        <h1 className="max-w-[14ch] text-6xl leading-none font-bold tracking-tight sm:text-7xl">
          Lo que suena, ahora se ve.
        </h1>

        <div className="mt-10 rounded-[28px] border-[3px] border-sobre-tinta/20 bg-sobre-tinta/5 p-6 sm:p-9">
          <p className="mb-5 flex flex-wrap items-center gap-2 text-lg text-sobre-tinta/75">
            Sonidos ahora:
            <span className="rounded-full border-2 border-sobre-tinta/40 px-3 py-0.5 font-bold text-sobre-tinta">🚨 posible sirena</span>
            <span className="rounded-full border-2 border-sobre-tinta/40 px-3 py-0.5 font-bold text-sobre-tinta">🚗 tráfico</span>
          </p>
          <div className="space-y-3 text-3xl leading-snug sm:text-4xl">
            {LINEAS.map((l) => (
              <p
                key={l.texto}
                className={l.sonido ? "subtitulo-sonido w-fit font-bold text-acento-claro" : ""}
              >
                {l.texto}
              </p>
            ))}
          </div>
          <p className="mt-6 text-right text-base font-bold text-sobre-tinta/60">
            Ejemplo de Alerta Visual con subtítulos
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/herramientas/alerta-visual"
            className="inline-flex items-center justify-center gap-3 rounded-2xl bg-accion px-7 py-5 text-2xl font-bold text-sobre-accion no-underline hover:bg-accion-hover"
          >
            Probar Alerta Visual
            <ArrowRight aria-hidden="true" className="size-6" />
          </Link>
          <Link
            href="/interprete"
            className="inline-flex items-center justify-center rounded-2xl border-[3px] border-sobre-tinta/60 px-7 py-5 text-2xl font-bold text-sobre-tinta no-underline hover:border-sobre-tinta"
          >
            Pedir intérprete LSP
          </Link>
        </div>
      </section>

      <section className="border-t-2 border-sobre-tinta/15">
        <ul className="mx-auto grid max-w-6xl gap-4 px-4 py-12 sm:grid-cols-3 sm:px-8">
          {SIGUIENTES.map(({ href, Icono, titulo }) => (
            <li key={titulo}>
              <Link
                href={href}
                className="flex items-center gap-4 rounded-[20px] border-[3px] border-sobre-tinta/20 p-5 text-xl font-bold text-sobre-tinta no-underline hover:border-acento-claro"
              >
                <Icono aria-hidden="true" className="size-8 shrink-0 text-acento-claro" strokeWidth={2.25} />
                {titulo}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

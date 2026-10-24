import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { metaPagina } from "@/lib/seo";
import {
  ARTICULO_PUCP,
  CONSEJOS_DELETREO,
  DICCIONARIO_PUCP,
  GUIA_MINEDU,
  PARAMETROS,
  TOTAL_PALABRAS,
} from "@/lib/aprende";
import { DIRECTORIO } from "@/lib/directorio";
import { Deletreo } from "@/components/Deletreo";
import { PalabrasLSP } from "@/components/PalabrasLSP";

export const metadata: Metadata = metaPagina({
  titulo: "Aprende Lengua de Señas Peruana: abecedario y primeras señas",
  descripcion:
    "Deletrea tu nombre con el alfabeto manual peruano, practica frente a un espejo y aprende tus primeras señas con videos de personas Sordas. Gratis.",
  ruta: "/aprende",
});

const CURSOS = DIRECTORIO.find((g) => g.id === "aprender")?.entradas ?? [];

const RUTA = [
  { href: "#abecedario", titulo: "Abecedario", texto: "Deletrea tu nombre con las manos." },
  { href: "#palabras", titulo: `${TOTAL_PALABRAS} primeras señas`, texto: "Palabras del día a día, con ejemplos." },
  { href: "#seguir", titulo: "Sigue aprendiendo", texto: "Cursos y materiales de LSP." },
];

const tarjeta = "rounded-[28px] border-[3px] border-borde/55 bg-superficie";
const enlace = "font-bold text-acento underline underline-offset-4";

function Externo({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-1 ${enlace}`}>
      {children}
      <ExternalLink aria-hidden="true" className="size-4" />
    </a>
  );
}

export default function Aprende() {
  return (
    <main id="contenido" className="mx-auto w-full max-w-6xl flex-1 px-4 py-14 sm:px-8">
      <h1 className="max-w-[18ch] text-5xl leading-[1.05] font-bold tracking-tight text-balance sm:text-6xl">
        Aprende Lengua de Señas Peruana
      </h1>
      <p className="mt-5 max-w-[52ch] text-2xl leading-snug text-suave">
        Empieza hoy, a tu ritmo. Las señas que enlazamos las hacen personas
        Sordas peruanas, no avatares.
      </p>

      <ol className="mt-10 grid gap-4 md:grid-cols-3">
        {RUTA.map((r, i) => (
          <li key={r.href}>
            <a href={r.href} className={`${tarjeta} group flex h-full gap-4 p-6 no-underline hover:border-acento`}>
              <span
                aria-hidden="true"
                className="flex size-12 shrink-0 items-center justify-center rounded-full bg-accion text-2xl font-bold text-sobre-accion"
              >
                {i + 1}
              </span>
              <span>
                <span className="block text-2xl font-bold group-hover:underline">{r.titulo}</span>
                <span className="mt-1 block text-lg leading-snug text-suave">{r.texto}</span>
              </span>
            </a>
          </li>
        ))}
      </ol>

      <section aria-labelledby="antes" className="mt-16">
        <h2 id="antes" className="text-3xl font-bold sm:text-4xl">Antes de empezar</h2>
        <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_1.3fr]">
          <div className="space-y-5">
            <div className={`${tarjeta} p-6`}>
              <h3 className="text-2xl font-bold">Es otra lengua</h3>
              <p className="mt-2 text-xl leading-snug">
                Aprender la lengua de señas es aprender otra lengua. Se mira con
                los ojos y se hace con las manos, el espacio, la cara y el
                cuerpo.
              </p>
            </div>
            <div className={`${tarjeta} p-6`}>
              <h3 className="text-2xl font-bold">La cara también habla</h3>
              <p className="mt-2 text-xl leading-snug">
                La expresión de la cara, los labios y la cabeza son parte de la
                seña. Practica frente a un espejo.
              </p>
            </div>
            <div className={`${tarjeta} p-6`}>
              <h3 className="text-2xl font-bold">Aprende con personas Sordas</h3>
              <p className="mt-2 text-xl leading-snug">
                Esta página es un primer paso. La lengua se aprende de verdad
                conversando con la comunidad Sorda.
              </p>
            </div>
          </div>
          <div className="rounded-[28px] bg-tinta p-7 text-sobre-tinta">
            <h3 className="text-2xl font-bold">Las 7 partes de una seña</h3>
            <p className="mt-1 text-lg opacity-80">Fíjate en cada una cuando veas una seña.</p>
            <ol className="mt-5 grid gap-3 sm:grid-cols-2">
              {PARAMETROS.map((p, i) => (
                <li key={p.nombre} className="flex gap-3">
                  <span aria-hidden="true" className="text-3xl leading-none font-bold text-acento-claro">
                    {i + 1}
                  </span>
                  <span>
                    <span className="block text-xl font-bold">{p.nombre}</span>
                    <span className="block text-lg leading-snug opacity-85">{p.texto}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
        <p className="mt-4 text-base text-suave">
          Fuente: guía «Lengua de Señas Peruana» del{" "}
          <Externo href={GUIA_MINEDU.url}>MINEDU ({GUIA_MINEDU.anio})</Externo>.
        </p>
      </section>

      <section aria-labelledby="abecedario" className="mt-16">
        <h2 id="abecedario" className="text-3xl font-bold sm:text-4xl">El abecedario con las manos</h2>
        <p className="mt-2 max-w-[62ch] text-xl leading-snug text-suave">
          Se llama dactilología. Sirve para nombres, apellidos, instituciones y
          palabras que todavía no tienen seña. Tiene 27 letras; la CH se hace
          con la C y luego la H.
        </p>
        <div className="mt-8">
          <Deletreo />
        </div>
        <details className={`${tarjeta} group mt-8 p-6`}>
          <summary className="cursor-pointer text-xl font-bold">Consejos para deletrear bien</summary>
          <ul className="mt-4 space-y-2 text-xl leading-snug">
            {CONSEJOS_DELETREO.map((c) => (
              <li key={c} className="flex gap-3">
                <span aria-hidden="true" className="text-acento">●</span>
                {c}
              </li>
            ))}
          </ul>
        </details>
        <p className="mt-4 max-w-[70ch] text-base leading-snug text-suave">
          Lámina: «Alfabeto dactilológico peruano», página 42 de{" "}
          <Externo href={GUIA_MINEDU.url}>«{GUIA_MINEDU.titulo}»</Externo>, {GUIA_MINEDU.autor}, {GUIA_MINEDU.anio}, bajo licencia{" "}
          <Externo href={GUIA_MINEDU.urlLicencia}>{GUIA_MINEDU.licencia}</Externo>. Se muestra sin cambios.
        </p>
      </section>

      <section aria-labelledby="palabras" className="mt-16">
        <h2 id="palabras" className="text-3xl font-bold sm:text-4xl">Tus primeras {TOTAL_PALABRAS} señas</h2>
        <p className="mt-2 max-w-[62ch] text-xl leading-snug text-suave">
          Cada palabra tiene su video en el Diccionario LSP de la PUCP, hecho por
          personas Sordas peruanas: la seña sola y dentro de una oración. «Ver
          la seña» abre el diccionario; busca ahí la palabra.
        </p>
        <div className="mt-8">
          <PalabrasLSP />
        </div>
        <p className="mt-6 max-w-[70ch] text-base leading-snug text-suave">
          Videos:{" "}
          <Externo href={DICCIONARIO_PUCP}>Diccionario LSP al Español, PUCP</Externo>{" "}
          (<Externo href={ARTICULO_PUCP}>sobre el proyecto</Externo>). Tu avance se guarda solo en este equipo.
        </p>
      </section>

      <section aria-labelledby="seguir" className="mt-16">
        <h2 id="seguir" className="text-3xl font-bold sm:text-4xl">Sigue aprendiendo</h2>
        <ul className={`${tarjeta} mt-6 divide-y-2 divide-borde/25`}>
          {CURSOS.map((c) => (
            <li key={c.nombre} className="p-6">
              <h3 className="text-2xl font-bold">{c.nombre}</h3>
              <p className="mt-2 max-w-[65ch] text-xl leading-snug">{c.descripcion}</p>
              {c.nota && <p className="mt-2 text-lg text-suave">{c.nota}</p>}
              <p className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-lg">
                {c.enlaces.map((l) => (
                  <Externo key={l.url} href={l.url}>{l.texto}</Externo>
                ))}
              </p>
            </li>
          ))}
        </ul>
        <p className="mt-6 max-w-[65ch] text-lg leading-snug text-suave">
          No usamos avatares ni videos de señas hechos con inteligencia
          artificial: la Lengua de Señas Peruana la deben hacer personas.
        </p>
      </section>
    </main>
  );
}

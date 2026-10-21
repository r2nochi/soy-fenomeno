import type { Metadata } from "next";
import Link from "next/link";
import { ARTICULOS, fechaLegible } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog: tips y guías para la comunidad Sorda",
  description:
    "Cómo hablar con una persona Sorda, qué es la LSP, qué dice la ley sobre intérpretes y más. En español sencillo.",
};

export default function Blog() {
  const [primero, ...resto] = ARTICULOS;

  return (
    <main id="contenido" className="mx-auto w-full max-w-6xl flex-1 px-4 py-14 sm:px-8">
      <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">Blog</h1>
      <p className="mt-4 max-w-[50ch] text-2xl leading-snug text-suave">
        Tips y guías para la comunidad Sorda y para quienes quieren incluir
        mejor. En español sencillo.
      </p>

      {primero && (
        <Link
          href={`/blog/${primero.slug}`}
          className="group mt-12 block rounded-[28px] bg-accion p-8 text-sobre-accion no-underline hover:bg-accion-hover sm:p-12"
        >
          <h2 className="max-w-[22ch] text-4xl leading-[1.1] font-bold text-balance sm:text-5xl">
            {primero.titulo}
          </h2>
          <p className="mt-5 max-w-[55ch] text-xl leading-snug opacity-90">
            {primero.resumen}
          </p>
          <p className="mt-6 text-lg font-bold opacity-90">
            {primero.minutos} min de lectura · {fechaLegible(primero.fecha)}
          </p>
        </Link>
      )}

      <ul className="mt-6 divide-y-2 divide-borde/25">
        {resto.map((a) => (
          <li key={a.slug}>
            <Link
              href={`/blog/${a.slug}`}
              className="group grid gap-3 py-8 no-underline md:grid-cols-[1fr_1.2fr] md:gap-12"
            >
              <h2 className="text-3xl leading-snug font-bold text-balance group-hover:underline">
                {a.titulo}
              </h2>
              <div>
                <p className="text-xl leading-snug text-suave">{a.resumen}</p>
                <p className="mt-3 text-lg font-bold text-suave">
                  {a.minutos} min de lectura · {fechaLegible(a.fecha)}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

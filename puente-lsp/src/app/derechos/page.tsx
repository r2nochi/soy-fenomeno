import type { Metadata } from "next";
import Link from "next/link";
import { metaPagina } from "@/lib/seo";
import { PAISES_DERECHOS, categoriasDe } from "@/lib/derechos";
import { AvisoDerechos } from "@/components/ListaDerechos";

export const metadata: Metadata = metaPagina({
  titulo: "Derechos y beneficios de las personas Sordas",
  descripcion:
    "Carné del Conadis, pase libre, intérprete, cuota de empleo, descuentos y pensión. Qué dice la ley, para quién es y cómo pedirlo, con su fuente, en español sencillo.",
  ruta: "/derechos",
});

export default function Derechos() {
  return (
    <main id="contenido" className="mx-auto w-full max-w-6xl flex-1 px-4 py-14 sm:px-8">
      <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">Derechos y beneficios</h1>
      <p className="mt-4 max-w-[50ch] text-2xl leading-snug text-suave">
        Qué dice la ley, para quién es y cómo pedirlo. Cada dato tiene el enlace
        a su fuente.
      </p>

      {PAISES_DERECHOS.map((p) => (
        <section key={p.slug} className="mt-12">
          <h2 className="text-4xl font-bold">
            <Link href={`/derechos/${p.slug}`} className="no-underline hover:underline">
              {p.nombre}
            </Link>
          </h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {categoriasDe(p.slug).map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/derechos/${p.slug}/${c.slug}`}
                  className="block h-full rounded-2xl border-2 border-borde/55 bg-superficie p-6 no-underline hover:border-acento"
                >
                  <span className="block text-2xl font-bold">{c.nombre}</span>
                  <span className="mt-1 block text-xl leading-snug text-suave">{c.resumen}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
      <AvisoDerechos />
    </main>
  );
}

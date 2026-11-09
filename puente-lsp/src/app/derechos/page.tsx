import type { Metadata } from "next";
import Link from "next/link";
import { metaPagina } from "@/lib/seo";
import { PAISES_DERECHOS, categoriasDe } from "@/lib/derechos";
import { AvisoDerechos } from "@/components/ListaDerechos";

export const metadata: Metadata = metaPagina({
  titulo: "Derechos y beneficios de las personas Sordas",
  descripcion:
    "Qué dice la ley en Perú, Colombia, Chile, México y Argentina sobre certificados, intérprete, transporte, trabajo y pensiones. Para quién es y cómo pedirlo, con su fuente.",
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

      <h2 className="mt-12 text-4xl font-bold">Elige tu país</h2>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2">
        {PAISES_DERECHOS.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/derechos/${p.slug}`}
              className="block h-full rounded-2xl border-2 border-borde/55 bg-superficie p-6 no-underline hover:border-acento"
            >
              <span className="block text-3xl font-bold">{p.nombre}</span>
              <span className="mt-2 block text-xl leading-snug text-suave">
                {categoriasDe(p.slug).map((c) => c.nombre).join(" · ")}
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <AvisoDerechos />
    </main>
  );
}

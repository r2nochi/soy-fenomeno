import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { metaPagina } from "@/lib/seo";
import { PAISES_DERECHOS, beneficiosDe, categoriaDe, categoriasDe, paisDerechos } from "@/lib/derechos";
import { AvisoDerechos, FiltrosCategorias, TarjetaBeneficio } from "@/components/ListaDerechos";

export function generateStaticParams() {
  return PAISES_DERECHOS.flatMap((p) =>
    categoriasDe(p.slug).map((c) => ({ pais: p.slug, categoria: c.slug })),
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/derechos/[pais]/[categoria]">): Promise<Metadata> {
  const { pais, categoria } = await params;
  const p = paisDerechos(pais);
  const c = categoriaDe(pais, categoria);
  if (!p || !c) return {};
  return metaPagina({
    titulo: `${c.nombre}: derechos de las personas Sordas en ${p.nombre}`,
    descripcion: `${c.resumen} Qué dice la ley en ${p.nombre}, para quién es y cómo pedirlo, con su fuente.`,
    ruta: `/derechos/${p.slug}/${c.slug}`,
  });
}

export default async function DerechosCategoria({
  params,
}: PageProps<"/derechos/[pais]/[categoria]">) {
  const { pais, categoria } = await params;
  const p = paisDerechos(pais);
  const c = categoriaDe(pais, categoria);
  if (!p || !c) notFound();

  return (
    <main id="contenido" className="mx-auto w-full max-w-6xl flex-1 px-4 py-14 sm:px-8">
      <Link href={`/derechos/${p.slug}`} className="inline-flex items-center gap-2 text-lg font-bold">
        <ArrowLeft aria-hidden="true" className="size-5" /> Derechos en {p.nombre}
      </Link>
      <h1 className="mt-6 max-w-[24ch] text-5xl font-bold tracking-tight text-balance sm:text-6xl">
        {c.nombre} en {p.nombre}
      </h1>
      <p className="mt-4 max-w-[50ch] text-2xl leading-snug text-suave">{c.resumen}</p>
      <FiltrosCategorias pais={p.slug} activa={c.slug} />
      <div className="mt-10">
        {beneficiosDe(p.slug, c.slug).map((b) => (
          <TarjetaBeneficio key={b.id} b={b} Titulo="h2" />
        ))}
      </div>
      <AvisoDerechos pais={p.slug} />
    </main>
  );
}

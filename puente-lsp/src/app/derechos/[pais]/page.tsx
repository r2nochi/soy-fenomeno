import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { metaPagina } from "@/lib/seo";
import { PAISES_DERECHOS, beneficiosDe, categoriasDe, paisDerechos } from "@/lib/derechos";
import { AvisoDerechos, FiltrosCategorias, TarjetaBeneficio } from "@/components/ListaDerechos";

export function generateStaticParams() {
  return PAISES_DERECHOS.map((p) => ({ pais: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/derechos/[pais]">): Promise<Metadata> {
  const { pais } = await params;
  const p = paisDerechos(pais);
  if (!p) return {};
  return metaPagina({
    titulo: `Derechos y beneficios de las personas Sordas en ${p.nombre}`,
    descripcion: `Qué dice la ley en ${p.nombre}: trámites, intérprete, salud, transporte, educación, trabajo, descuentos y ayuda económica. Con su fuente.`,
    ruta: `/derechos/${p.slug}`,
  });
}

export default async function DerechosPais({ params }: PageProps<"/derechos/[pais]">) {
  const { pais } = await params;
  const p = paisDerechos(pais);
  if (!p) notFound();

  return (
    <main id="contenido" className="mx-auto w-full max-w-6xl flex-1 px-4 py-14 sm:px-8">
      <Link href="/derechos" className="inline-flex items-center gap-2 text-lg font-bold">
        <ArrowLeft aria-hidden="true" className="size-5" /> Derechos y beneficios
      </Link>
      <h1 className="mt-6 max-w-[24ch] text-5xl font-bold tracking-tight text-balance sm:text-6xl">
        Derechos y beneficios en {p.nombre}
      </h1>
      <FiltrosCategorias pais={p.slug} />
      {categoriasDe(p.slug).map((c) => (
        <section key={c.slug} className="mt-14">
          <h2 className="text-4xl font-bold">{c.nombre}</h2>
          <div className="mt-6">
            {beneficiosDe(p.slug, c.slug).map((b) => (
              <TarjetaBeneficio key={b.id} b={b} Titulo="h3" />
            ))}
          </div>
        </section>
      ))}
      <AvisoDerechos />
    </main>
  );
}

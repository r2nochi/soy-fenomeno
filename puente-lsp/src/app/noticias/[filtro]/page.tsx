import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { metaPagina } from "@/lib/seo";
import { filtroPorSlug, filtrosConNoticias, noticiasDe, type Filtro } from "@/lib/noticias";
import { AvisoNoticias, FiltrosNoticias, ListaNoticias } from "@/components/ListaNoticias";

export function generateStaticParams() {
  return filtrosConNoticias().map((f) => ({ filtro: f.slug }));
}

const titulo = (f: Filtro) =>
  f.slug === "internacional"
    ? "Noticias internacionales sobre personas Sordas"
    : f.tipo === "tema"
      ? `Noticias sobre personas Sordas: ${f.nombre}`
      : `Noticias sobre personas Sordas en ${f.nombre}`;

export async function generateMetadata({
  params,
}: PageProps<"/noticias/[filtro]">): Promise<Metadata> {
  const { filtro } = await params;
  const f = filtroPorSlug(filtro);
  if (!f) return {};
  return metaPagina({
    titulo: titulo(f),
    descripcion: `Noticias numeradas sobre la comunidad Sorda (${f.nombre}). Resumen en español sencillo y enlace al medio original.`,
    ruta: `/noticias/${f.slug}`,
  });
}

export default async function NoticiasFiltradas({ params }: PageProps<"/noticias/[filtro]">) {
  const { filtro } = await params;
  const f = filtroPorSlug(filtro);
  if (!f) notFound();
  const lista = noticiasDe(f);

  return (
    <main id="contenido" className="mx-auto w-full max-w-6xl flex-1 px-4 py-14 sm:px-8">
      <Link href="/noticias" className="inline-flex items-center gap-2 text-lg font-bold">
        <ArrowLeft aria-hidden="true" className="size-5" /> Todas las noticias
      </Link>
      <h1 className="mt-6 max-w-[24ch] text-5xl font-bold tracking-tight text-balance sm:text-6xl">
        {titulo(f)}
      </h1>
      <p className="mt-4 text-2xl text-suave">
        {lista.length === 1 ? "1 noticia" : `${lista.length} noticias`}
      </p>
      <FiltrosNoticias activo={f.slug} />
      <ListaNoticias noticias={lista} />
      <AvisoNoticias />
    </main>
  );
}

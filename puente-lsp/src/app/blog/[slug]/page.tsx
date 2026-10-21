import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Eye } from "lucide-react";
import { ARTICULOS, articuloPorSlug, CREDITO_FOTOS, fechaLegible } from "@/lib/blog";
import { enlaceWhatsapp } from "@/lib/sitio";

export function generateStaticParams() {
  return ARTICULOS.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const a = articuloPorSlug(slug);
  if (!a) return {};
  return {
    title: a.titulo,
    description: a.resumen,
    openGraph: {
      title: a.titulo,
      description: a.resumen,
      type: "article",
      images: [{ url: a.portada.src, alt: a.portada.alt }],
    },
  };
}

export default async function Articulo({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const datos = articuloPorSlug(slug);
  if (!datos) notFound();
  const { default: Contenido } = await import(`@/contenido/blog/${slug}.mdx`);

  const indice = ARTICULOS.findIndex((a) => a.slug === slug);
  const siguiente = ARTICULOS[(indice + 1) % ARTICULOS.length];
  const corregir = enlaceWhatsapp(
    `Hola, quiero sugerir una corrección en el artículo "${datos.titulo}".`,
  );

  return (
    <main id="contenido" className="flex-1">
      <article className="mx-auto max-w-[44rem] px-4 pt-12 pb-16 sm:px-6">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-lg font-bold text-suave no-underline hover:text-texto"
        >
          <ArrowLeft aria-hidden="true" className="size-5" />
          Blog
        </Link>

        <h1 className="mt-6 text-4xl leading-[1.1] font-bold tracking-tight text-balance sm:text-5xl">
          {datos.titulo}
        </h1>
        <p className="mt-5 text-2xl leading-snug text-suave">{datos.resumen}</p>
        <p className="mt-5 text-lg font-bold text-suave">
          {datos.minutos} min de lectura · {fechaLegible(datos.fecha)}
        </p>

        <figure className="mt-10">
          <Image
            src={datos.portada.src}
            alt={datos.portada.alt}
            width={1600}
            height={1066}
            priority
            sizes="(min-width: 768px) 44rem, 100vw"
            className="h-auto w-full rounded-[28px]"
          />
          <figcaption className="mt-2 text-right text-base text-suave">
            <a href={CREDITO_FOTOS.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
              {CREDITO_FOTOS.texto}
            </a>
          </figcaption>
        </figure>

        {!datos.revisado && (
          <p className="mt-8 flex gap-3 rounded-2xl border-2 border-borde/40 p-4 text-lg leading-snug">
            <Eye aria-hidden="true" className="mt-0.5 size-6 shrink-0 text-acento" />
            <span>
              Este artículo está <strong>pendiente de revisión</strong> por una
              persona Sorda.
              {corregir && (
                <>
                  {" "}
                  Si ves algo que corregir,{" "}
                  <a
                    href={corregir}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-acento underline underline-offset-4"
                  >
                    escríbenos por WhatsApp
                  </a>
                  .
                </>
              )}
            </span>
          </p>
        )}

        <div className="mt-10">
          <Contenido />
        </div>

        {datos.fuentes && datos.fuentes.length > 0 && (
          <section aria-labelledby="titulo-fuentes" className="mt-14 border-t-2 border-borde/25 pt-8">
            <h2 id="titulo-fuentes" className="text-2xl font-bold">Fuentes</h2>
            <ul className="mt-4 space-y-3 text-lg leading-snug">
              {datos.fuentes.map((f) => (
                <li key={f.url}>
                  <a href={f.url} target="_blank" rel="noopener noreferrer" className="text-acento underline underline-offset-4">
                    {f.texto}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>

      {siguiente && siguiente.slug !== slug && (
        <aside
          aria-label="Sigue leyendo"
          className="border-t-2 border-borde/25 bg-fondo-alt"
        >
          <Link
            href={`/blog/${siguiente.slug}`}
            className="group mx-auto flex max-w-[44rem] items-center justify-between gap-6 px-4 py-12 no-underline sm:px-6"
          >
            <div>
              <p className="text-3xl leading-snug font-bold text-balance group-hover:underline">
                {siguiente.titulo}
              </p>
              <p className="mt-2 text-lg text-suave">
                Siguiente artículo · {siguiente.minutos} min de lectura
              </p>
            </div>
            <ArrowRight
              aria-hidden="true"
              className="size-10 shrink-0 text-acento transition-transform group-hover:translate-x-1"
            />
          </Link>
        </aside>
      )}
    </main>
  );
}

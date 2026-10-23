import type { Metadata } from "next";
import { metaPagina } from "@/lib/seo";
import Link from "next/link";
import { Suspense } from "react";
import { ReporteForm } from "@/components/ReporteForm";
import { lugarPorId } from "@/lib/lugares";

// Es solo un formulario: se comparte, pero no se muestra en buscadores.
export const metadata: Metadata = {
  ...metaPagina({
    titulo: "Cuéntanos cómo te atendieron",
    descripcion:
      "Cuéntanos qué lugares te atendieron bien en Lengua de Señas Peruana o con pantalla. Lo revisamos antes de publicarlo.",
    ruta: "/lugares/nuevo",
  }),
  robots: { index: false, follow: true },
};

export default function PaginaReporte({
  searchParams,
}: {
  searchParams: Promise<{ lugar?: string | string[] }>;
}) {
  return (
    <main id="contenido" className="mx-auto w-full max-w-3xl flex-1 px-4 py-12 sm:px-8">
      <h1 className="mb-5 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
        Cuéntanos cómo te atendieron
      </h1>
      <p className="mb-10 text-xl text-suave">
        Solo contamos lo que salió bien. Así ayudamos a otras personas Sordas a
        encontrar lugares donde las atienden. Lo revisamos antes de publicarlo.
      </p>
      <Suspense fallback={<p className="text-xl text-suave">Cargando…</p>}>
        <Formulario searchParams={searchParams} />
      </Suspense>
    </main>
  );
}

async function Formulario({
  searchParams,
}: {
  searchParams: Promise<{ lugar?: string | string[] }>;
}) {
  const { lugar: idCrudo } = await searchParams;
  const id = Array.isArray(idCrudo) ? idCrudo[0] : idCrudo;
  const lugar = id ? await lugarPorId(id) : null;

  if (lugar) {
    return <ReporteForm lugar={{ id: lugar.id, nombre: lugar.nombre }} />;
  }
  return (
    <>
      {id && (
        <p className="mb-8 rounded-xl border-2 border-borde p-4 text-lg">
          No encontramos ese lugar. Escribe sus datos abajo.{" "}
          <Link href="/lugares" className="font-bold text-acento underline underline-offset-4">
            Ver los lugares
          </Link>
        </p>
      )}
      <ReporteForm />
    </>
  );
}

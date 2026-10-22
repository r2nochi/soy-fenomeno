import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { DirectorioLugares } from "@/components/DirectorioLugares";
import { lugaresAprobados } from "@/lib/lugares";

export const metadata: Metadata = {
  title: "Lugares accesibles",
  description:
    "Farmacias, bancos, municipalidades y otros lugares donde te pueden atender en Lengua de Señas Peruana o con pantalla. Revisamos cada registro antes de publicarlo.",
};

export default function PaginaLugares() {
  return (
    <main id="contenido" className="mx-auto w-full max-w-6xl flex-1 px-4 py-12 sm:px-8">
      <header className="mb-10 space-y-5">
        <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
          Lugares accesibles
        </h1>
        <p className="max-w-3xl text-2xl text-suave">
          Lugares donde te pueden atender en LSP, con escritura o con una
          pantalla. Revisamos cada lugar antes de publicarlo, pero no comprobamos
          la atención. Lo que dice cada lugar aparece como &quot;Según el lugar&quot;.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="/sello"
            className="inline-flex min-h-14 items-center justify-center rounded-2xl bg-accion px-6 py-3 text-center text-xl font-bold text-sobre-accion hover:bg-accion-hover"
          >
            Registrar mi lugar
          </Link>
          <Link
            href="/lugares/nuevo"
            className="inline-flex min-h-14 items-center justify-center rounded-2xl border-2 border-borde bg-superficie px-6 py-3 text-center text-xl font-bold text-texto hover:bg-fondo-alt"
          >
            Recomendar un lugar
          </Link>
        </div>
      </header>

      <Suspense fallback={<p className="text-xl text-suave">Cargando lugares…</p>}>
        <Lista />
      </Suspense>
    </main>
  );
}

async function Lista() {
  const lugares = await lugaresAprobados();
  return <DirectorioLugares lugares={lugares} />;
}

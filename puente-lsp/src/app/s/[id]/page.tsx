import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Conversacion } from "@/components/Conversacion";
import { lugarPorId } from "@/lib/lugares";
import { frasesVisibles } from "@/lib/lugares-datos";

// Página para el cliente que escanea: no debe aparecer en buscadores.
export const metadata: Metadata = {
  title: "Conversar aquí",
  robots: { index: false, follow: false },
};

export default function PaginaLugar({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <main id="contenido" className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-8">
      <Suspense fallback={<p className="text-xl text-suave">Cargando…</p>}>
        <Contenido params={params} />
      </Suspense>
    </main>
  );
}

async function Contenido({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const lugar = await lugarPorId(id);
  // Solo los negocios con sello tienen esta página; los lugares de la comunidad no.
  if (!lugar || lugar.tipo !== "sello") notFound();

  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <p className="text-xl font-bold text-acento">Sello: Aquí atendemos a personas Sordas</p>
        <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
          {lugar.nombre}
        </h1>
        <p className="text-2xl text-suave">
          Este lugar se comprometió a atenderte. Escribe lo que necesitas o usa
          las frases de abajo.
        </p>
        <p className="rounded-2xl border-2 border-borde/40 p-4 text-lg leading-snug">
          El compromiso es del lugar, no una certificación oficial.
        </p>
        {/* El sello funciona apenas se crea; hasta revisarlo, se avisa. */}
        {!lugar.aprobado && (
          <p className="rounded-2xl border-2 border-borde/40 p-4 text-lg leading-snug">
            Puente LSP todavía no revisó este lugar.
          </p>
        )}
      </header>

      <Conversacion titulo={lugar.nombre} frases={frasesVisibles(lugar)} />

      <p className="text-xl">
        ¿Te atendieron bien?{" "}
        <Link
          href={`/lugares/nuevo?lugar=${lugar.id}`}
          className="inline-flex min-h-12 items-center font-bold text-acento underline underline-offset-4"
        >
          Cuéntanos
        </Link>
      </p>
    </div>
  );
}

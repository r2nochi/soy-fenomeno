import type { Metadata } from "next";
import { AlertaCliente } from "@/components/AlertaCliente";

export const metadata: Metadata = {
  title: "Alerta Visual: avisos de sonido y subtítulos en vivo",
  description:
    "Convierte alarmas, timbre, teléfono y bebé llorando en avisos visuales, y la voz en subtítulos con los sonidos intercalados. Gratis y sin registro.",
};

export default function AlertaVisual() {
  return (
    <main id="contenido" className="mx-auto w-full max-w-3xl flex-1 px-4 py-10">
      <header className="mb-8">
        <h1 className="mb-3 text-4xl font-bold sm:text-5xl">
          🔔 Alerta Visual
        </h1>
        <p className="text-xl text-suave">
          Convierte los sonidos importantes de tu casa o trabajo en avisos que
          se ven: alarmas, timbre, teléfono, bebé llorando.
        </p>
      </header>

      <AlertaCliente />

      <aside className="rounded-2xl border-2 border-error p-6 text-lg">
        <h2 className="mb-2 text-xl font-bold">⚠ Importante</h2>
        <p>
          Alerta Visual solo funciona mientras esta página está abierta y puede
          equivocarse. <strong>No reemplaza una alarma de incendio con luz</strong>{" "}
          ni otros sistemas de emergencia.
        </p>
      </aside>

      <footer className="mt-10 text-lg text-suave">
        Gratis, sin registro y sin enviar tu audio a ningún lado.
      </footer>
    </main>
  );
}

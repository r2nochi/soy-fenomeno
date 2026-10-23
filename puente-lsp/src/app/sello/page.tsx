import type { Metadata } from "next";
import { metaPagina } from "@/lib/seo";
import { SelloForm } from "@/components/SelloForm";
import { Sello } from "@/components/Sello";

export const metadata: Metadata = metaPagina({
  titulo: "Sello para negocios: Aquí atendemos a personas Sordas",
  descripcion:
    "Registra tu lugar, imprime un afiche y muestra que atiendes a personas Sordas. Gratis. Es un compromiso de tu lugar, no una certificación oficial.",
  ruta: "/sello",
});

const pasos = [
  {
    titulo: "Registras tu lugar",
    texto: "Llenas el formulario de abajo. Toma unos minutos.",
  },
  {
    titulo: "Imprimes el afiche",
    texto: "Te damos un afiche con un código QR. Ponlo en tu mostrador o en la puerta.",
  },
  {
    titulo: "Conversan con la pantalla",
    texto: "La persona Sorda escanea el código y escribe o usa la pantalla. Así se entienden.",
  },
];

export default function PaginaSello() {
  return (
    <main id="contenido" className="mx-auto w-full max-w-3xl flex-1 px-4 py-12 sm:px-8">
      <header className="mb-12 grid gap-8 sm:grid-cols-[1fr_auto] sm:items-center">
        <div>
          <h1 className="mb-5 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            Sello: Aquí atendemos a personas Sordas
          </h1>
          <p className="text-xl text-suave">
            Si tu lugar tiene este sello, las personas Sordas saben que pueden
            ser atendidas. Es gratis. Es un compromiso que tu lugar asume, no
            una certificación del Estado.
          </p>
        </div>
        <Sello className="mx-auto size-40 sm:size-48" />
      </header>

      <section aria-labelledby="pasos-titulo" className="mb-14">
        <h2 id="pasos-titulo" className="mb-6 text-3xl font-bold">
          Cómo funciona
        </h2>
        <ol className="space-y-4">
          {pasos.map((p, i) => (
            <li
              key={p.titulo}
              className="flex gap-4 rounded-[28px] border-[3px] border-borde/55 bg-superficie p-5"
            >
              <span
                aria-hidden="true"
                className="flex size-12 shrink-0 items-center justify-center rounded-full bg-accion text-2xl font-bold text-sobre-accion"
              >
                {i + 1}
              </span>
              <div>
                <p className="text-xl font-bold">{p.titulo}</p>
                <p className="text-lg text-suave">{p.texto}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="registro-titulo">
        <h2 id="registro-titulo" className="mb-3 text-3xl font-bold">
          Registra tu lugar
        </h2>
        <p className="mb-8 text-lg text-suave">
          Lo revisamos antes de publicarlo en el mapa. Tu correo nunca se
          muestra al público.
        </p>
        <SelloForm />
      </section>
    </main>
  );
}

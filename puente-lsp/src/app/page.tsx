import { SolicitudForm } from "@/components/SolicitudForm";

const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP;
const enlaceWhatsapp = whatsapp
  ? `https://wa.me/${whatsapp}?text=${encodeURIComponent("Hola, necesito un intérprete de LSP.")}`
  : null;

const pasos = [
  {
    titulo: "Pide",
    texto: "Llena el formulario o escríbenos por WhatsApp.",
  },
  {
    titulo: "Te conectamos",
    texto: "Buscamos un intérprete de LSP disponible y te enviamos un enlace.",
  },
  {
    titulo: "Conversa",
    texto: "Entras a la videollamada. El intérprete traduce entre LSP y español.",
  },
];

const ambitos = [
  "Citas médicas",
  "Bancos y trámites",
  "Reuniones de trabajo",
  "Clases y universidades",
  "Notarías y temas legales",
  "Atención al cliente",
];

export default function Inicio() {
  return (
    <>
      <header className="border-b-2 border-borde/30">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-4 py-4">
          <a href="#" className="text-2xl font-bold">
            🤟 Puente LSP
          </a>
          <nav aria-label="Principal">
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-lg">
              <li>
                <a href="#como-funciona" className="underline-offset-4 hover:underline">
                  Cómo funciona
                </a>
              </li>
              <li>
                <a href="#entidades" className="underline-offset-4 hover:underline">
                  Para entidades
                </a>
              </li>
              <li>
                <a href="#interpretes" className="underline-offset-4 hover:underline">
                  Intérpretes
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main id="contenido" className="flex-1">
        <section className="mx-auto grid max-w-5xl items-center gap-10 px-4 py-14 md:grid-cols-2">
          <div>
            <h1 className="mb-5 text-4xl font-bold leading-tight sm:text-5xl">
              Un intérprete de LSP por videollamada, cuando lo necesitas.
            </h1>
            <p className="mb-8 text-xl text-suave">
              Para personas Sordas, empresas y entidades en Perú. Te conectamos
              con intérpretes de Lengua de Señas Peruana.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href="#solicitar"
                className="rounded-xl bg-acento px-6 py-4 text-center text-xl font-bold text-sobre-acento hover:bg-acento-hover"
              >
                Pedir intérprete
              </a>
              {enlaceWhatsapp && (
                <a
                  href={enlaceWhatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border-2 border-acento px-6 py-4 text-center text-xl font-bold text-acento hover:bg-acento-fondo"
                >
                  Escribir por WhatsApp
                </a>
              )}
            </div>
          </div>

          {/* Lugar para el video en LSP que explica el servicio. */}
          <figure className="flex aspect-video flex-col items-center justify-center rounded-2xl border-2 border-dashed border-borde bg-fondo-alt p-6 text-center">
            <span aria-hidden="true" className="mb-3 text-5xl">
              🎥
            </span>
            <figcaption className="text-lg text-suave">
              Aquí irá un video en LSP que explica el servicio.
            </figcaption>
          </figure>
        </section>

        <section id="como-funciona" className="bg-fondo-alt py-14">
          <div className="mx-auto max-w-5xl px-4">
            <h2 className="mb-8 text-3xl font-bold">Cómo funciona</h2>
            <ol className="grid gap-6 md:grid-cols-3">
              {pasos.map((paso, i) => (
                <li key={paso.titulo} className="rounded-2xl bg-fondo p-6">
                  <span
                    aria-hidden="true"
                    className="mb-4 flex size-12 items-center justify-center rounded-full bg-acento text-2xl font-bold text-sobre-acento"
                  >
                    {i + 1}
                  </span>
                  <h3 className="mb-2 text-2xl font-bold">{paso.titulo}</h3>
                  <p className="text-lg">{paso.texto}</p>
                </li>
              ))}
            </ol>
            <h3 className="mb-4 mt-12 text-2xl font-bold">
              Te ayudamos en:
            </h3>
            <ul className="flex flex-wrap gap-3">
              {ambitos.map((a) => (
                <li
                  key={a}
                  className="rounded-full border-2 border-borde bg-fondo px-4 py-2 text-lg"
                >
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="entidades" className="mx-auto max-w-5xl px-4 py-14">
          <h2 className="mb-5 text-3xl font-bold">
            Para empresas y entidades
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            <p className="text-xl">
              La Ley 29535 reconoce la Lengua de Señas Peruana y pide a las
              entidades que atienden al público ofrecer intérpretes. Con Puente
              LSP atiendes a tus clientes Sordos sin tener un intérprete fijo.
            </p>
            <ul className="space-y-3 text-lg">
              <li>✓ Pagas solo por el tiempo que usas.</li>
              <li>✓ Planes mensuales para sedes con mucha atención.</li>
              <li>✓ Intérpretes con experiencia en tu sector.</li>
              <li>✓ Reportes de los servicios atendidos.</li>
            </ul>
          </div>
        </section>

        <section id="interpretes" className="bg-fondo-alt py-14">
          <div className="mx-auto max-w-5xl px-4">
            <h2 className="mb-5 text-3xl font-bold">¿Eres intérprete de LSP?</h2>
            <p className="max-w-3xl text-xl">
              Únete a la red. Atiende servicios por videollamada desde donde
              estés y recibe más solicitudes. Elige la opción «Soy intérprete de
              LSP» en el formulario.
            </p>
          </div>
        </section>

        <section
          id="solicitar"
          aria-labelledby="titulo-solicitar"
          className="mx-auto max-w-3xl px-4 py-14"
        >
          <h2 id="titulo-solicitar" className="mb-2 text-3xl font-bold">
            Pedir intérprete
          </h2>
          <p className="mb-8 text-xl text-suave">
            Llena el formulario. Te escribimos para coordinar.
          </p>
          <SolicitudForm />
        </section>
      </main>

      <footer className="border-t-2 border-borde/30 py-8">
        <div className="mx-auto max-w-5xl px-4 text-lg text-suave">
          Puente LSP · Lima, Perú
        </div>
      </footer>
    </>
  );
}

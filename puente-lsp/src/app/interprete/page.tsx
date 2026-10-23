import type { Metadata } from "next";
import { metaPagina } from "@/lib/seo";
import { SolicitudForm } from "@/components/SolicitudForm";

export const metadata: Metadata = metaPagina({
  titulo: "Intérprete de LSP por videollamada: lista de interesados",
  descripcion:
    "Estamos armando una red de intérpretes de Lengua de Señas Peruana (LSP) por videollamada. Anótate en la lista si eres una persona Sorda, una entidad o intérprete.",
  ruta: "/interprete",
});

const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP;
const enlaceWhatsapp = whatsapp
  ? `https://wa.me/${whatsapp}?text=${encodeURIComponent("Hola, necesito un intérprete de LSP.")}`
  : null;

const pasos = [
  {
    titulo: "Te anotas",
    texto: "Llena el formulario o escríbenos por WhatsApp.",
  },
  {
    titulo: "Te escribimos",
    texto: "Si hay un intérprete voluntario disponible, coordinamos contigo y te enviamos un enlace.",
  },
  {
    titulo: "Conversa",
    texto: "Entras a la videollamada. El intérprete traduce entre LSP y español.",
  },
];

const ambitos = [
  "Bancos y trámites",
  "Reuniones de trabajo",
  "Entrevistas de trabajo",
  "Clases y universidades",
  "Atención al cliente",
];

export default function Interprete() {
  return (
    <>

      <main id="contenido" className="flex-1">
        <section className="mx-auto grid max-w-5xl items-center gap-10 px-4 py-14 md:grid-cols-2">
          <div>
            <h1 className="mb-5 text-4xl font-bold leading-tight sm:text-5xl">
              Estamos armando una red de intérpretes de LSP por videollamada.
            </h1>
            <p className="mb-8 text-xl text-suave">
              Todavía es un piloto gratuito: aún no hay intérpretes disponibles
              todo el tiempo. Anótate y te avisamos cuando podamos ayudarte.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href="#solicitar"
                className="rounded-xl bg-accion px-6 py-4 text-center text-xl font-bold text-sobre-accion hover:bg-accion-hover"
              >
                Anotarme en la lista
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
                <li key={paso.titulo} className="rounded-2xl bg-superficie p-6">
                  <span
                    aria-hidden="true"
                    className="mb-4 flex size-12 items-center justify-center rounded-full bg-accion text-2xl font-bold text-sobre-accion"
                  >
                    {i + 1}
                  </span>
                  <h3 className="mb-2 text-2xl font-bold">{paso.titulo}</h3>
                  <p className="text-lg">{paso.texto}</p>
                </li>
              ))}
            </ol>
            <h3 className="mb-4 mt-12 text-2xl font-bold">
              Para qué sirve el piloto:
            </h3>
            <ul className="flex flex-wrap gap-3">
              {ambitos.map((a) => (
                <li
                  key={a}
                  className="rounded-full border-2 border-borde bg-superficie px-4 py-2 text-lg"
                >
                  {a}
                </li>
              ))}
            </ul>
            <p className="mt-6 max-w-3xl rounded-2xl border-2 border-borde/55 bg-superficie p-5 text-lg">
              <strong>Para emergencias, citas médicas o temas legales</strong>,
              pide un intérprete certificado. Este piloto todavía no puede
              asegurar uno a tiempo.
            </p>
          </div>
        </section>

        <section id="entidades" className="mx-auto max-w-5xl px-4 py-14">
          <h2 className="mb-5 text-3xl font-bold">
            Para empresas y entidades
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            <p className="text-xl">
              La Ley 29535 reconoce la Lengua de Señas Peruana y promueve que las
              entidades que atienden al público faciliten intérpretes. Buscamos
              entidades que quieran probar la atención por videollamada con
              nosotros.
            </p>
            <ul className="space-y-3 text-lg">
              <li>✓ Piloto gratuito, sin contrato.</li>
              <li>✓ Nos ayudas a medir cuánta atención en LSP necesitas.</li>
              <li>✓ Aún no ofrecemos un servicio pagado.</li>
            </ul>
          </div>
        </section>

        <section id="interpretes" className="bg-fondo-alt py-14">
          <div className="mx-auto max-w-5xl px-4">
            <h2 className="mb-5 text-3xl font-bold">¿Eres intérprete de LSP?</h2>
            <p className="max-w-3xl text-xl">
              Súmate a la red como voluntario o voluntaria del piloto y atiende
              por videollamada desde donde estés. Elige la opción «Soy
              intérprete de LSP» en el formulario.
            </p>
          </div>
        </section>

        <section
          id="solicitar"
          aria-labelledby="titulo-solicitar"
          className="mx-auto max-w-3xl px-4 py-14"
        >
          <h2 id="titulo-solicitar" className="mb-2 text-3xl font-bold">
            Anotarme en la lista
          </h2>
          <p className="mb-8 text-xl text-suave">
            No es una reserva confirmada. Te escribimos si encontramos un
            intérprete disponible.
          </p>
          <SolicitudForm />
        </section>
      </main>

    </>
  );
}

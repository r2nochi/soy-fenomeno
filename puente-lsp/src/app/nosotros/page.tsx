import type { Metadata } from "next";
import Link from "next/link";
import { metaPagina } from "@/lib/seo";
import { enlaceWhatsapp } from "@/lib/sitio";

export const metadata: Metadata = metaPagina({
  titulo: "Quiénes somos: misión y visión",
  descripcion:
    "Puente LSP reúne gratis herramientas e información para la comunidad Sorda del Perú. Conoce por qué existe, cómo trabajamos y cómo sumarte.",
  ruta: "/nosotros",
});

const SUMARSE = enlaceWhatsapp("Hola, quiero sumarme a Puente LSP.");

const PRINCIPIOS = [
  {
    titulo: "Con la comunidad Sorda",
    texto: "No solo para ella. Queremos que personas Sordas revisen todo lo que publicamos; mientras tanto, lo marcamos como pendiente de revisión.",
  },
  {
    titulo: "Señas reales",
    texto: "No usamos señas hechas con inteligencia artificial ni avatares. Usamos fuentes reconocidas, como el MINEDU y el diccionario de la PUCP, con su crédito.",
  },
  {
    titulo: "Con fuentes",
    texto: "Citamos la fuente de los datos, leyes y cifras, para que puedas comprobarlos.",
  },
  {
    titulo: "Gratis",
    texto: "Todo lo que hay en Puente LSP es gratis para quien lo usa.",
  },
];

const SECCIONES = [
  { href: "/interprete", titulo: "Intérprete LSP", texto: "Estamos armando una red de intérpretes por videollamada." },
  { href: "/herramientas", titulo: "Herramientas", texto: "Conversación cara a cara, Alerta Visual, tarjeta de emergencia y carta para pedir intérprete." },
  { href: "/lugares", titulo: "Lugares", texto: "Sitios donde te atienden en LSP o con pantalla." },
  { href: "/aprende", titulo: "Aprende LSP", texto: "Abecedario y primeras palabras." },
  { href: "/apps", titulo: "Apps útiles", texto: "Subtítulos en vivo y avisos de sonidos." },
  { href: "/trabajos", titulo: "Trabajos", texto: "Empleos para personas con discapacidad." },
  { href: "/comunidad", titulo: "Comunidad", texto: "Organizaciones, cursos e instituciones." },
  { href: "/blog", titulo: "Blog", texto: "Información clara sobre derechos y LSP." },
];

const BUSCAMOS = [
  "Personas Sordas que revisen la página y los videos.",
  "Intérpretes de LSP para la red de videollamada.",
  "Personas Sordas e intérpretes que graben las señas de «Aprende LSP», con su nombre.",
  "Organizaciones que nos digan qué falta y compartan la página.",
];

export default function Nosotros() {
  return (
    <main id="contenido" className="mx-auto w-full max-w-5xl flex-1 px-4 py-14 sm:px-8">
      <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">Quiénes somos</h1>
      <p className="mt-4 max-w-[55ch] text-2xl leading-snug text-suave">
        Puente LSP es un proyecto hecho en Perú para romper la frontera entre
        personas Sordas y oyentes.
      </p>

      <div className="mt-12 grid gap-5 md:grid-cols-2">
        <section aria-labelledby="mision" className="rounded-[28px] bg-accion p-8 text-sobre-accion">
          <h2 id="mision" className="text-3xl font-bold">Misión</h2>
          <p className="mt-3 text-xl leading-snug">
            Reunir en un solo lugar, gratis y en español claro, herramientas e
            información para que las personas Sordas del Perú se comuniquen y
            hagan valer sus derechos, y para que las personas oyentes aprendan a
            acercarse a ellas.
          </p>
        </section>
        <section aria-labelledby="vision" className="rounded-[28px] border-[3px] border-borde/55 bg-superficie p-8">
          <h2 id="vision" className="text-3xl font-bold">Visión</h2>
          <p className="mt-3 text-xl leading-snug">
            Un Perú donde una persona Sorda pueda hacer un trámite, ir al médico,
            estudiar o trabajar sin quedarse fuera de la conversación, y donde la
            Lengua de Señas Peruana se vea y se respete en todas partes.
          </p>
        </section>
      </div>

      <section aria-labelledby="como" className="mt-14">
        <h2 id="como" className="text-3xl font-bold">Cómo trabajamos</h2>
        <p className="mt-1 text-xl text-suave">Nada sobre nosotros sin nosotros.</p>
        <ul className="mt-6 grid gap-5 sm:grid-cols-2">
          {PRINCIPIOS.map((p) => (
            <li key={p.titulo} className="rounded-[28px] border-[3px] border-borde/55 bg-superficie p-6">
              <h3 className="text-2xl font-bold">{p.titulo}</h3>
              <p className="mt-2 text-xl leading-snug">{p.texto}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="que" className="mt-14">
        <h2 id="que" className="text-3xl font-bold">Qué hacemos hoy</h2>
        <ul className="mt-6 divide-y-2 divide-borde/25 rounded-[28px] border-[3px] border-borde/55 bg-superficie">
          {SECCIONES.map((s) => (
            <li key={s.href} className="p-6">
              <Link href={s.href} className="text-2xl font-bold text-acento underline underline-offset-4">
                {s.titulo}
              </Link>
              <p className="mt-1 max-w-[65ch] text-xl leading-snug">{s.texto}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="sumate" className="mt-14 rounded-[28px] bg-acento-fondo p-8">
        <h2 id="sumate" className="text-3xl font-bold">Súmate</h2>
        <p className="mt-2 text-xl leading-snug">Este proyecto necesita a la comunidad Sorda. Buscamos:</p>
        <ul className="mt-4 list-disc space-y-2 pl-6 text-xl leading-snug">
          {BUSCAMOS.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
        {SUMARSE && (
          <p className="mt-6 text-xl">
            <a href={SUMARSE} target="_blank" rel="noopener noreferrer" className="font-bold text-acento underline underline-offset-4">
              Escríbenos por WhatsApp
            </a>
          </p>
        )}
      </section>
    </main>
  );
}

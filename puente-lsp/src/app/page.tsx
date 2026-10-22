import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BellRing,
  BookOpen,
  Building2,
  Captions,
  HandHelping,
  Languages,
  MessageCircle,
} from "lucide-react";
import { ARTICULOS } from "@/lib/blog";
import { CreditoFotos } from "@/components/CreditoFotos";
import { ListaHerramientas } from "@/components/ListaHerramientas";
import { enlaceWhatsapp, REDES } from "@/lib/sitio";
import { SONIDO_POR_ID } from "@/lib/sonidos";

const WHATSAPP_COLABORAR = enlaceWhatsapp(
  "Hola, quiero colaborar con Puente LSP.",
);

const icono = "size-10 shrink-0";
const trazo = 2.25;
// Piezas de la mesa: superficie blanca sobre el campo gris azulado.
const pieza =
  "group rounded-[28px] border-[3px] border-borde/55 bg-superficie no-underline hover:border-acento";

// Ejemplos ilustrativos (no son conversaciones ni avisos reales).
const MUESTRA = [
  { texto: "Hola, ¿ya llegaste? Te estaba esperando.", sonido: false },
  { texto: "(🚨 posible sirena)", sonido: true },
  { texto: "Sí, perdón, había mucho tráfico.", sonido: false },
];
// Un aviso real de la herramienta cuyo color no compite con el azul de acción.
const AVISO_EJEMPLO = SONIDO_POR_ID.bebe;

const PASOS = ["Te anotas", "Te escribimos", "Conversas"];

const PARA_QUIEN = [
  {
    Icono: HandHelping,
    titulo: "Si eres una persona Sorda",
    texto:
      "Anótate en el piloto de intérpretes por videollamada y usa Alerta Visual para enterarte de lo que suena a tu alrededor.",
    href: "/interprete",
    accion: "Anotarme",
  },
  {
    Icono: Building2,
    titulo: "Si representas una empresa o entidad",
    texto:
      "Pide gratis el Sello Puente: un afiche con QR para que tus clientes Sordos conversen con tu equipo desde su celular. También puedes probar el piloto de intérpretes por videollamada.",
    href: "/sello",
    accion: "Pedir el sello",
  },
  {
    Icono: Languages,
    titulo: "Si eres intérprete de LSP",
    texto:
      "Súmate como voluntario o voluntaria al piloto y atiende por videollamada desde donde estés.",
    href: "/interprete#interpretes",
    accion: "Unirme a la red",
  },
];

function MarcaEjemplo({ claro = false }: { claro?: boolean }) {
  return (
    <span
      className={`mt-3 block text-right text-sm font-bold ${claro ? "text-white/80" : "text-sobre-tinta/70"}`}
    >
      Ejemplo
    </span>
  );
}

export default function Inicio() {
  const [destacado, ...otros] = ARTICULOS;

  return (
    <main id="contenido" className="flex-1">
      <section
        aria-labelledby="titulo-inicio"
        className="mx-auto max-w-6xl px-4 pt-12 pb-16 sm:px-8 sm:pt-16"
      >
        <h1
          id="titulo-inicio"
          className="max-w-[18ch] text-5xl leading-[1.05] font-bold tracking-tight text-balance sm:text-6xl"
        >
          Herramientas para que nada se te escape.
        </h1>
        <p className="mt-5 mb-10 max-w-[52ch] text-2xl leading-snug text-suave">
          Gratis, en español y pensadas para la comunidad Sorda del Perú.
        </p>

        <div className="grid gap-5 lg:grid-cols-[1.25fr_1fr_1fr] lg:grid-rows-[auto_auto]">
          <Link
            href="/interprete"
            className="group relative flex flex-col rounded-[28px] bg-accion p-8 text-sobre-accion no-underline shadow-[0_18px_40px_-18px_rgb(11_79_209/0.6)] hover:bg-accion-hover lg:row-span-2"
          >
            <HandHelping aria-hidden="true" className="size-14" strokeWidth={2} />
            <h2 className="mt-6 text-4xl leading-tight font-bold">
              Intérprete LSP por videollamada
            </h2>
            <p className="mt-3 max-w-[30ch] text-xl leading-snug opacity-90">
              Estamos armando la red. Anótate en el piloto gratuito.
            </p>
            <ol className="mt-8 space-y-3 text-xl font-bold">
              {PASOS.map((paso, i) => (
                <li key={paso} className="flex items-center gap-4">
                  <span
                    aria-hidden="true"
                    className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white/20 text-lg font-bold"
                  >
                    {i + 1}
                  </span>
                  {paso}
                </li>
              ))}
            </ol>
            <span className="mt-10 inline-flex items-center gap-3 self-start rounded-2xl bg-white px-6 py-4 text-xl font-bold text-accion lg:mt-auto">
              Anotarme
              <ArrowRight
                aria-hidden="true"
                className="size-6 transition-transform group-hover:translate-x-1"
              />
            </span>
          </Link>

          <Link href="/herramientas/alerta-visual" className={`${pieza} p-7`}>
            <BellRing aria-hidden="true" className={`${icono} text-acento`} strokeWidth={trazo} />
            <h2 className="mt-4 text-3xl font-bold">Alerta Visual</h2>
            <p className="mt-1 text-xl leading-snug text-suave">
              Los sonidos de tu casa, en avisos que se ven.
            </p>
            {/* Miniatura del aviso real de la herramienta. */}
            <div
              aria-hidden="true"
              className="mt-4 rounded-2xl px-5 py-4 text-white"
              style={{ backgroundColor: AVISO_EJEMPLO.color }}
            >
              <p className="flex items-center gap-3 text-lg leading-snug font-bold">
                <span className="text-4xl leading-none">{AVISO_EJEMPLO.icono}</span>
                {AVISO_EJEMPLO.nombre}
              </p>
              <MarcaEjemplo claro />
            </div>
          </Link>

          <Link href="/herramientas/alerta-visual" className={`${pieza} p-7`}>
            <Captions aria-hidden="true" className={`${icono} text-acento`} strokeWidth={trazo} />
            <h2 className="mt-4 text-3xl font-bold">Subtítulos en vivo</h2>
            <p className="mt-1 text-xl leading-snug text-suave">
              La voz en texto, con los sonidos dentro.
            </p>
            <div
              aria-hidden="true"
              className="mt-4 rounded-2xl bg-tinta px-5 py-4 text-lg leading-snug text-sobre-tinta"
            >
              {MUESTRA.map((l) => (
                <p
                  key={l.texto}
                  className={
                    l.sonido
                      ? "subtitulo-sonido my-1 w-fit font-bold text-acento-claro"
                      : "my-1"
                  }
                >
                  {l.texto}
                </p>
              ))}
              <MarcaEjemplo />
            </div>
          </Link>

          {destacado && (
            <Link
              href={`/blog/${destacado.slug}`}
              className={`${pieza} flex items-start gap-5 p-7 lg:col-span-2`}
            >
              <BookOpen aria-hidden="true" className={`${icono} mt-1 text-acento`} strokeWidth={trazo} />
              <div>
                <h2 className="text-2xl leading-snug font-bold text-balance group-hover:underline">
                  {destacado.titulo}
                </h2>
                <p className="mt-1 text-lg text-suave">
                  Del blog · {destacado.minutos} min de lectura
                </p>
              </div>
            </Link>
          )}
        </div>
      </section>

      <section
        aria-labelledby="titulo-herramientas"
        className="mx-auto max-w-6xl px-4 pb-16 sm:px-8"
      >
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <h2 id="titulo-herramientas" className="text-4xl font-bold tracking-tight">
            Para el día a día
          </h2>
          <Link
            href="/herramientas"
            className="text-xl font-bold text-acento underline decoration-2 underline-offset-4"
          >
            Ver todas las herramientas
          </Link>
        </div>
        <ListaHerramientas nivel="h3" />
      </section>

      <section
        aria-labelledby="titulo-para-quien"
        className="border-y-2 border-borde/25 bg-fondo-alt py-16"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-8">
          <h2
            id="titulo-para-quien"
            className="mb-10 text-4xl font-bold tracking-tight"
          >
            ¿Para quién es Puente LSP?
          </h2>
          <ul className="divide-y-2 divide-borde/25 rounded-[28px] border-[3px] border-borde/55 bg-superficie px-7">
            {PARA_QUIEN.map(({ Icono, titulo, texto, href, accion }) => (
              <li
                key={titulo}
                className="grid gap-4 py-8 sm:grid-cols-[auto_1fr_auto] sm:items-center sm:gap-8"
              >
                <Icono aria-hidden="true" className="size-12 text-acento" strokeWidth={2} />
                <div>
                  <h3 className="text-2xl font-bold">{titulo}</h3>
                  <p className="mt-1 max-w-[60ch] text-xl leading-snug text-suave">
                    {texto}
                  </p>
                </div>
                <Link
                  href={href}
                  className="inline-flex items-center gap-2 text-xl font-bold text-acento underline decoration-2 underline-offset-4 hover:decoration-4"
                >
                  {accion}
                  <ArrowRight aria-hidden="true" className="size-5" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {otros.length > 0 && (
        <section
          aria-labelledby="titulo-blog"
          className="mx-auto max-w-6xl px-4 py-16 sm:px-8"
        >
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <h2 id="titulo-blog" className="text-4xl font-bold tracking-tight">
              Del blog
            </h2>
            <Link
              href="/blog"
              className="text-xl font-bold text-acento underline decoration-2 underline-offset-4"
            >
              Ver todos los artículos
            </Link>
          </div>
          <ul className="grid divide-y-2 divide-borde/25 rounded-[28px] border-[3px] border-borde/55 bg-superficie md:grid-cols-3 md:divide-x-2 md:divide-y-0">
            {otros.slice(0, 3).map((a) => (
              <li key={a.slug}>
                <Link
                  href={`/blog/${a.slug}`}
                  className="group flex h-full flex-col p-7 no-underline"
                >
                  <Image
                    src={a.portada.src}
                    alt=""
                    width={1600}
                    height={1066}
                    sizes="(min-width: 768px) 22rem, 100vw"
                    className="mb-5 aspect-[3/2] h-auto w-full rounded-2xl object-cover"
                  />
                  <h3 className="text-2xl leading-snug font-bold text-balance group-hover:underline">
                    {a.titulo}
                  </h3>
                  <p className="mt-3 text-lg leading-snug text-suave">
                    {a.resumen}
                  </p>
                  <p className="mt-auto flex items-center gap-2 pt-4 text-base font-bold text-acento">
                    {a.minutos} min de lectura
                    <ArrowRight aria-hidden="true" className="size-4" />
                  </p>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-right text-base text-suave">
            <CreditoFotos plural />
          </p>
        </section>
      )}

      <section
        id="comunidad"
        aria-labelledby="titulo-comunidad"
        className="bg-tinta py-16 text-sobre-tinta"
      >
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-8 md:grid-cols-2 md:items-center">
          <div>
            <h2
              id="titulo-comunidad"
              className="text-4xl leading-tight font-bold tracking-tight text-balance"
            >
              Videos cortos, con subtítulos y en LSP.
            </h2>
            <p className="mt-4 max-w-[46ch] text-xl leading-snug opacity-85">
              Pronto en redes: tips para el día a día, para entenderse mejor y
              para conocer tus derechos. Siempre hechos para verse sin sonido.
            </p>
          </div>
          <ul className="flex flex-wrap gap-3">
            {REDES.map((r) => (
              <li key={r.nombre}>
                {r.url ? (
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block rounded-full bg-sobre-tinta px-6 py-3 text-xl font-bold text-tinta no-underline"
                  >
                    {r.nombre}
                  </a>
                ) : (
                  <span className="inline-block rounded-full border-2 border-sobre-tinta/40 px-6 py-3 text-xl">
                    {r.nombre} · pronto
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        aria-labelledby="titulo-cierre"
        className="mx-auto max-w-6xl px-4 py-16 sm:px-8"
      >
        <div className="flex flex-col gap-6 rounded-[28px] border-[3px] border-borde/55 bg-superficie p-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 id="titulo-cierre" className="text-3xl font-bold">
              Nada sobre nosotros sin nosotros.
            </h2>
            <p className="mt-2 max-w-[56ch] text-xl leading-snug text-suave">
              ¿Eres una persona Sorda o intérprete y quieres revisar contenido,
              proponer una herramienta o grabar un video? Escríbenos.
            </p>
          </div>
          {WHATSAPP_COLABORAR && (
            <a
              href={WHATSAPP_COLABORAR}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-3 self-start rounded-2xl bg-accion px-6 py-4 text-xl font-bold text-sobre-accion no-underline hover:bg-accion-hover sm:self-auto"
            >
              <MessageCircle aria-hidden="true" className="size-6" />
              Escribir por WhatsApp
            </a>
          )}
        </div>
      </section>
    </main>
  );
}

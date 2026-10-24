import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ExternalLink, TriangleAlert } from "lucide-react";
import { metaPagina } from "@/lib/seo";
import {
  CATEGORIAS,
  FECHA_REVISION,
  FUENTE_AVATARES,
  FUENTE_IDIOMAS_IPHONE,
  GUIA_EN_VIVO,
  PAISES,
  type App,
  type Servicio,
} from "@/lib/apps";
import { enlaceWhatsapp } from "@/lib/sitio";

export const metadata: Metadata = metaPagina({
  titulo: "Apps útiles para personas Sordas: subtítulos en vivo y alertas",
  descripcion:
    "Cómo poner subtítulos a un en vivo de Kick, X o Twitch con Windows 11, Chrome, Android o iPhone. Avisos de sonidos y servicios por país.",
  ruta: "/apps",
});

const SUMAR = enlaceWhatsapp("Hola, conozco una app o servicio para personas Sordas que falta en Puente LSP.");

const tarjeta = "rounded-[28px] border-[3px] border-borde/55 bg-superficie";
const enlaceFuente = "text-base font-bold text-suave underline underline-offset-4";

// Enlace interno (herramienta de Puente LSP) o externo, en pestaña nueva.
function Enlace({ url, propia, children }: { url: string; propia?: boolean; children: React.ReactNode }) {
  const clase = "inline-flex items-center gap-1 text-acento underline underline-offset-4";
  if (propia) {
    return (
      <Link href={url} className={clase}>
        {children}
        <ArrowRight aria-hidden="true" className="size-4" />
      </Link>
    );
  }
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className={clase}>
      {children}
      <ExternalLink aria-hidden="true" className="size-4" />
    </a>
  );
}

function Fuente({ url }: { url: string }) {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className={enlaceFuente}>
      Fuente
    </a>
  );
}

function Pasos({ pasos }: { pasos: string[] }) {
  return (
    <ol className="mt-4 space-y-3">
      {pasos.map((paso, i) => (
        <li key={paso} className="flex gap-3 text-xl leading-snug">
          <span
            aria-hidden="true"
            className="flex size-9 shrink-0 items-center justify-center rounded-full bg-acento-fondo text-lg font-bold text-acento"
          >
            {i + 1}
          </span>
          <span className="pt-0.5">{paso}</span>
        </li>
      ))}
    </ol>
  );
}

function FichaApp({ app }: { app: App }) {
  return (
    <li className="p-6">
      <h3 className="text-2xl font-bold">{app.nombre}</h3>
      <p className="mt-1 text-lg text-suave">
        {app.plataforma} · {app.costo}
      </p>
      <p className="mt-2 max-w-[65ch] text-xl leading-snug">{app.descripcion}</p>
      {app.pasos && <Pasos pasos={app.pasos} />}
      {app.nota && <p className="mt-3 max-w-[65ch] text-lg text-suave">{app.nota}</p>}
      <p className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-lg font-bold">
        <Enlace url={app.url} propia={app.propia}>{app.enlace}</Enlace>
        {!app.propia && app.fuente !== app.url && <Fuente url={app.fuente} />}
      </p>
    </li>
  );
}

function FichaServicio({ s }: { s: Servicio }) {
  return (
    <li className="p-6">
      <h4 className="text-xl font-bold">{s.nombre}</h4>
      <p className="mt-1 max-w-[65ch] text-xl leading-snug">{s.descripcion}</p>
      {s.nota && <p className="mt-2 max-w-[65ch] text-lg text-suave">{s.nota}</p>}
      <p className="mt-2 flex flex-wrap gap-x-5 gap-y-2 text-lg font-bold">
        {s.url && s.enlace && (
          <Enlace url={s.url} propia={s.propia}>{s.enlace}</Enlace>
        )}
        {!s.propia && s.fuente !== s.url && <Fuente url={s.fuente} />}
      </p>
    </li>
  );
}

export default function Apps() {
  return (
    <main id="contenido" className="mx-auto w-full max-w-5xl flex-1 px-4 py-14 sm:px-8">
      <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">Apps útiles</h1>
      <p className="mt-4 max-w-[52ch] text-2xl leading-snug text-suave">
        Tu celular y tu computadora ya traen subtítulos y avisos de sonidos.
        Aquí te enseñamos a activarlos, y qué servicios existen en cada país.
      </p>

      <nav aria-label="En esta página" className="mt-8">
        <ul className="flex flex-wrap gap-3 text-lg font-bold">
          {[
            { href: "#en-vivo", texto: "Subtítulos en vivo" },
            ...CATEGORIAS.map((c) => ({ href: `#${c.id}`, texto: c.titulo })),
            { href: "#paises", texto: "Por país" },
          ].map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="inline-flex min-h-12 items-center rounded-full border-2 border-borde/55 px-5 no-underline hover:border-acento hover:text-acento"
              >
                {l.texto}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <section aria-labelledby="en-vivo" className="mt-14">
        <h2 id="en-vivo" className="text-3xl font-bold sm:text-4xl">
          Subtítulos para cualquier video o en vivo
        </h2>
        <p className="mt-2 max-w-[60ch] text-xl leading-snug text-suave">
          ¿Un en vivo de Kick, X, Twitch o YouTube sin subtítulos? Tu equipo
          puede escuchar la voz y escribirla en la pantalla, en casi cualquier
          video.
        </p>
        <ul className="mt-8 grid gap-5 md:grid-cols-2">
          {GUIA_EN_VIVO.map((d) => (
            <li key={d.id} className={`${tarjeta} flex flex-col p-7`}>
              <h3 className="text-2xl font-bold">
                <span className="block text-lg text-acento">{d.equipo}</span>
                <span className="sr-only">: </span>
                {d.funcion}
              </h3>
              <Pasos pasos={d.pasos} />
              <p className="mt-4 text-lg leading-snug text-suave">{d.idioma}</p>
              <p className="mt-auto flex flex-wrap gap-x-5 pt-3">
                <a href={d.fuente} target="_blank" rel="noopener noreferrer" className={enlaceFuente}>
                  Guía oficial
                </a>
                {d.id === "iphone" && (
                  <a href={FUENTE_IDIOMAS_IPHONE} target="_blank" rel="noopener noreferrer" className={enlaceFuente}>
                    Idiomas
                  </a>
                )}
              </p>
            </li>
          ))}
        </ul>
        <p className="mt-6 max-w-[65ch] text-lg leading-snug text-suave">
          Los subtítulos automáticos se equivocan con nombres, música y ruido.
          No reemplazan a un intérprete de LSP en una cita médica o un trámite.
        </p>
      </section>

      {CATEGORIAS.map((c) => (
        <section key={c.id} aria-labelledby={c.id} className="mt-16">
          <h2 id={c.id} className="text-3xl font-bold sm:text-4xl">{c.titulo}</h2>
          <p className="mt-2 text-xl text-suave">{c.texto}</p>
          <ul className={`${tarjeta} mt-6 divide-y-2 divide-borde/25`}>
            {c.apps.map((app) => (
              <FichaApp key={app.nombre} app={app} />
            ))}
          </ul>
          {c.id === "senas" && (
            <div className="mt-6 flex gap-4 rounded-[28px] bg-acento-fondo p-6">
              <TriangleAlert aria-hidden="true" className="size-8 shrink-0 text-acento" />
              <p className="max-w-[62ch] text-xl leading-snug">
                <strong>Sobre los traductores con avatar:</strong> la Federación
                Mundial de Sordos pide no usarlos en lugar de intérpretes, sobre
                todo en noticias en vivo y emergencias.{" "}
                <a href={FUENTE_AVATARES} target="_blank" rel="noopener noreferrer" className="font-bold text-acento underline underline-offset-4">
                  Leer su postura
                </a>
              </p>
            </div>
          )}
        </section>
      ))}

      <section aria-labelledby="paises" className="mt-16">
        <h2 id="paises" className="text-3xl font-bold sm:text-4xl">Servicios por país</h2>
        <p className="mt-2 max-w-[60ch] text-xl text-suave">
          Intérpretes por video, diccionarios y trámites. Solo ponemos lo que
          pudimos confirmar en una página oficial.
        </p>
        {PAISES.map((p) => (
          <section key={p.id} aria-labelledby={`pais-${p.id}`} className="mt-10">
            <h3 id={`pais-${p.id}`} className="text-2xl font-bold sm:text-3xl">{p.pais}</h3>
            <p className="mt-1 max-w-[65ch] text-xl leading-snug text-suave">{p.resumen}</p>
            <ul className={`${tarjeta} mt-4 divide-y-2 divide-borde/25`}>
              {p.servicios.map((s) => (
                <FichaServicio key={s.nombre} s={s} />
              ))}
            </ul>
          </section>
        ))}
      </section>

      <p className="mt-14 max-w-[65ch] text-xl leading-snug">
        Revisado el {FECHA_REVISION}. Los menús pueden cambiar según la marca y
        la versión de tu equipo. ¿Conoces una app o servicio que falta?{" "}
        {SUMAR && (
          <a href={SUMAR} target="_blank" rel="noopener noreferrer" className="font-bold text-acento underline underline-offset-4">
            Escríbenos por WhatsApp
          </a>
        )}
      </p>
    </main>
  );
}

import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { fechaLegible } from "@/lib/blog";
import {
  filtrosConNoticias,
  nombrePais,
  nombreTema,
  type Noticia,
} from "@/lib/noticias";

const chip =
  "inline-flex min-h-12 items-center rounded-full border-2 px-5 text-lg font-bold no-underline";

// Botones para ver solo un país o solo un tema. `activo` es el slug de la página actual.
export function FiltrosNoticias({ activo }: { activo?: string }) {
  const filtros = filtrosConNoticias();
  const grupos = [
    { titulo: "Región", lista: filtros.filter((f) => f.tipo === "region") },
    { titulo: "País", lista: filtros.filter((f) => f.tipo === "pais") },
    { titulo: "Tema", lista: filtros.filter((f) => f.tipo === "tema") },
  ];
  return (
    <nav aria-label="Filtrar noticias" className="mt-10 grid gap-5">
      {grupos.map((g) => (
        <div key={g.titulo}>
          <p className="text-lg font-bold text-suave">{g.titulo}</p>
          <ul className="mt-2 flex flex-wrap gap-3">
            {g.titulo === "Región" && (
              <li>
                <Link
                  href="/noticias"
                  aria-current={!activo ? "page" : undefined}
                  className={`${chip} ${!activo ? "border-accion bg-accion text-sobre-accion" : "border-borde/55 hover:border-acento hover:text-acento"}`}
                >
                  Todas
                </Link>
              </li>
            )}
            {g.lista.map((f) => {
              const esActivo = f.slug === activo;
              return (
                <li key={f.slug}>
                  <Link
                    href={`/noticias/${f.slug}`}
                    aria-current={esActivo ? "page" : undefined}
                    className={`${chip} ${esActivo ? "border-accion bg-accion text-sobre-accion" : "border-borde/55 hover:border-acento hover:text-acento"}`}
                  >
                    {f.nombre}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}

export function ListaNoticias({ noticias }: { noticias: Noticia[] }) {
  return (
    <ul className="mt-10 divide-y-2 divide-borde/25">
      {noticias.map((n) => (
        <li key={n.numero} id={`n-${n.numero}`} className="scroll-mt-24 py-8">
          <article className="grid gap-4 sm:grid-cols-[8rem_1fr] sm:gap-8">
            <p className="text-4xl font-bold whitespace-nowrap text-acento tabular-nums">
              <span aria-hidden="true">N.º {n.numero}</span>
              <span className="sr-only">Noticia número {n.numero}</span>
            </p>
            <div className="max-w-[65ch]">
              <p className="flex flex-wrap items-center gap-x-3 gap-y-2 text-lg font-bold text-suave">
                <Link href={`/noticias/${n.pais}`} className="no-underline hover:underline">
                  {nombrePais(n.pais)}
                </Link>
                <span aria-hidden="true">·</span>
                <time dateTime={n.fecha}>{fechaLegible(n.fecha)}</time>
                {n.opinion && (
                  <span className="rounded-full border-2 border-borde px-3 py-0.5 text-base">Opinión</span>
                )}
              </p>
              <h2 className="mt-2 text-3xl leading-snug font-bold text-balance">{n.titulo}</h2>
              <p className="mt-3 text-xl leading-relaxed">{n.resumen}</p>
              <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-lg">
                {n.fuentes.map((f) => (
                  <li key={f.url}>
                    <a
                      href={f.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 font-bold"
                    >
                      {f === n.fuentes[0] ?`Leer en ${f.medio}` : f.medio}
                      <ExternalLink aria-hidden="true" className="size-5" />
                      <span className="sr-only">(se abre en otra pestaña)</span>
                    </a>
                  </li>
                ))}
              </ul>
              <ul className="mt-4 flex flex-wrap gap-2">
                {n.temas.map((t) => (
                  <li key={t}>
                    <Link
                      href={`/noticias/${t}`}
                      className="inline-flex rounded-full bg-acento-fondo px-3 py-1 text-base font-bold text-acento no-underline hover:underline"
                    >
                      {nombreTema(t)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        </li>
      ))}
    </ul>
  );
}

export function AvisoNoticias() {
  return (
    <p className="mt-12 max-w-[65ch] text-lg text-suave">
      Los resúmenes son nuestros. Cada noticia lleva el enlace a su medio
      original, donde está la nota completa. El número de cada noticia no
      cambia.
    </p>
  );
}

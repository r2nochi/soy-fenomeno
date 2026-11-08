import Link from "next/link";
import { ExternalLink, TriangleAlert } from "lucide-react";
import { fechaLegible } from "@/lib/blog";
import { REVISADO, categoriasDe, type Beneficio } from "@/lib/derechos";

const chip =
  "inline-flex min-h-12 items-center rounded-full border-2 px-5 text-lg font-bold no-underline";
const inactivo = "border-borde/55 hover:border-acento hover:text-acento";
const encendido = "border-accion bg-accion text-sobre-accion";

export function FiltrosCategorias({ pais, activa }: { pais: string; activa?: string }) {
  return (
    <nav aria-label="Elegir categoría" className="mt-10">
      <ul className="flex flex-wrap gap-3">
        <li>
          <Link
            href={`/derechos/${pais}`}
            aria-current={!activa ? "page" : undefined}
            className={`${chip} ${!activa ? encendido : inactivo}`}
          >
            Todo
          </Link>
        </li>
        {categoriasDe(pais).map((c) => (
          <li key={c.slug}>
            <Link
              href={`/derechos/${pais}/${c.slug}`}
              aria-current={c.slug === activa ? "page" : undefined}
              className={`${chip} ${c.slug === activa ? encendido : inactivo}`}
            >
              {c.nombre}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function TarjetaBeneficio({ b, Titulo }: { b: Beneficio; Titulo: "h2" | "h3" }) {
  const filas = [
    { nombre: "Qué es", texto: b.que },
    { nombre: "Para quién", texto: b.quien },
    ...(b.como ? [{ nombre: "Cómo", texto: b.como }] : []),
  ];
  return (
    <article id={b.id} className="scroll-mt-24 border-t-2 border-borde/25 py-8">
      <Titulo className="max-w-[30ch] text-3xl leading-snug font-bold text-balance">{b.titulo}</Titulo>
      <dl className="mt-4 grid max-w-[65ch] gap-4">
        {filas.map((f) => (
          <div key={f.nombre}>
            <dt className="text-lg font-bold text-suave">{f.nombre}</dt>
            <dd className="text-xl leading-relaxed">{f.texto}</dd>
          </div>
        ))}
      </dl>
      {b.atencion && (
        <p className="mt-5 flex max-w-[65ch] gap-3 rounded-2xl bg-fondo-alt p-4 text-lg leading-relaxed">
          <TriangleAlert aria-hidden="true" className="mt-1 size-6 shrink-0" />
          <span>
            <strong>Atención:</strong> {b.atencion}
          </span>
        </p>
      )}
      <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-lg">
        {b.fuentes.map((f) => (
          <li key={f.texto}>
            <a href={f.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-bold">
              {f.texto}
              <ExternalLink aria-hidden="true" className="size-5" />
              <span className="sr-only">(se abre en otra pestaña)</span>
            </a>
          </li>
        ))}
      </ul>
    </article>
  );
}

export function AvisoDerechos() {
  return (
    <p className="mt-12 max-w-[65ch] text-lg text-suave">
      Información general en español sencillo; no es asesoría legal. Revisado el{" "}
      {fechaLegible(REVISADO)}. Los enlaces a la Ley 29973 llevan a su texto
      original de 2012, y algunos artículos cambiaron después. Antes de un trámite
      importante, confirma en la entidad o en el Conadis.
    </p>
  );
}

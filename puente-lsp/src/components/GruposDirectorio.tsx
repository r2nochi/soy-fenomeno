import type { ReactNode } from "react";
import { ExternalLink } from "lucide-react";
import type { Grupo } from "@/lib/directorio";

// Lista del directorio de la comunidad. `extra` agrega contenido bajo el título
// de un grupo, por su id.
export function GruposDirectorio({
  grupos,
  extra,
}: {
  grupos: Grupo[];
  extra?: Record<string, ReactNode>;
}) {
  return grupos.map((g) => (
    <section key={g.id} aria-labelledby={`grupo-${g.id}`} className="mt-14">
      <h2 id={`grupo-${g.id}`} className="text-3xl font-bold">{g.titulo}</h2>
      <p className="mt-1 text-xl text-suave">{g.texto}</p>
      {extra?.[g.id]}
      <ul className="mt-6 divide-y-2 divide-borde/25 rounded-[28px] border-[3px] border-borde/55 bg-superficie">
        {g.entradas.map((e) => (
          <li key={e.nombre} className="p-6">
            <h3 className="text-2xl font-bold">{e.nombre}</h3>
            {e.lugar && <p className="text-lg text-suave">{e.lugar}</p>}
            <p className="mt-2 max-w-[65ch] text-xl leading-snug">{e.descripcion}</p>
            {e.nota && <p className="mt-2 text-lg text-suave">{e.nota}</p>}
            <p className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-lg font-bold">
              {e.enlaces.map((l) => (
                <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-acento underline underline-offset-4">
                  {l.texto}
                  <ExternalLink aria-hidden="true" className="size-4" />
                </a>
              ))}
              <a href={e.fuente} target="_blank" rel="noopener noreferrer" className="text-base font-bold text-suave underline underline-offset-4">
                Fuente
              </a>
            </p>
          </li>
        ))}
      </ul>
    </section>
  ));
}

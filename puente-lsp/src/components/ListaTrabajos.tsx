"use client";

import { useEffect, useRef, useState } from "react";
import { CalendarClock, Check, ExternalLink, MapPin } from "lucide-react";
import type { AreaId, Convocatoria } from "@/lib/convocatorias";

const POR_PAGINA = 20;

export function ListaTrabajos({
  avisos,
  areas,
}: {
  avisos: Convocatoria[];
  areas: { id: AreaId; nombre: string }[];
}) {
  const [area, setArea] = useState<AreaId | "todas">("todas");
  const [cuantos, setCuantos] = useState(POR_PAGINA);
  // Tras "Ver más", el foco pasa al primer aviso nuevo: el botón puede desaparecer.
  const primeroNuevo = useRef<number | null>(null);
  const listaRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (primeroNuevo.current === null) return;
    listaRef.current?.querySelectorAll("a")[primeroNuevo.current]?.focus();
    primeroNuevo.current = null;
  }, [cuantos]);

  const filtrados = area === "todas" ? avisos : avisos.filter((a) => a.areas.includes(area));
  const opciones = [
    { id: "todas" as const, nombre: "Todas", total: avisos.length },
    ...areas.map((a) => ({ ...a, total: avisos.filter((c) => c.areas.includes(a.id)).length })),
  ].filter((o) => o.total > 0);
  const nombreDe = (id: AreaId) => areas.find((a) => a.id === id)?.nombre;

  return (
    <div>
      <fieldset>
        <legend className="mb-3 text-xl font-bold">Elige un área</legend>
        <div className="flex flex-wrap gap-2">
          {opciones.map((o) => (
            <label
              key={o.id}
              className="cursor-pointer rounded-full border-[3px] border-borde/55 bg-superficie px-4 py-2 text-lg font-bold has-checked:border-accion has-checked:bg-accion has-checked:text-sobre-accion has-focus-visible:outline-3 has-focus-visible:outline-offset-2 has-focus-visible:outline-acento"
            >
              <input
                type="radio"
                name="area"
                value={o.id}
                checked={area === o.id}
                onChange={() => {
                  setArea(o.id);
                  setCuantos(POR_PAGINA);
                }}
                className="sr-only"
              />
              {area === o.id && <Check aria-hidden="true" className="mr-1 inline size-5" strokeWidth={3} />}
              {o.nombre} <span className="font-normal opacity-80">({o.total})</span>
            </label>
          ))}
        </div>
      </fieldset>

      <p role="status" className="mt-6 text-lg text-suave">
        {filtrados.length === 1 ? "1 convocatoria" : `${filtrados.length} convocatorias`}
        {area !== "todas" && ` en ${nombreDe(area)}`}
        {filtrados.length > POR_PAGINA && `. Mostrando ${Math.min(cuantos, filtrados.length)}`}.
      </p>

      <ul ref={listaRef} className="mt-3 divide-y-2 divide-borde/25 rounded-[28px] border-[3px] border-borde/55 bg-superficie">
        {filtrados.slice(0, cuantos).map((a) => (
          <li key={a.url}>
            <a href={a.url} target="_blank" rel="noopener noreferrer" className="group block p-6 no-underline">
              {a.areas.includes("lsp") && (
                <span className="mb-2 inline-block rounded-full bg-acento-fondo px-3 py-1 text-base font-bold text-acento">
                  Sordera, LSP o discapacidad
                </span>
              )}
              <h3 className="text-xl leading-snug font-bold group-hover:underline">
                {a.titulo}
                <ExternalLink aria-hidden="true" className="ml-2 inline size-4 text-acento" />
              </h3>
              <p className="mt-2 flex flex-wrap gap-x-6 gap-y-1 text-lg text-suave">
                {a.lugar && (
                  <span className="inline-flex items-center gap-2">
                    <MapPin aria-hidden="true" className="size-5" />
                    {a.lugar}
                  </span>
                )}
                {a.vigencia && (
                  <span className="inline-flex items-center gap-2">
                    <CalendarClock aria-hidden="true" className="size-5" />
                    Vigente hasta el {a.vigencia}
                  </span>
                )}
              </p>
            </a>
          </li>
        ))}
      </ul>

      {filtrados.length > cuantos && (
        <button
          onClick={() => {
            primeroNuevo.current = cuantos;
            setCuantos(cuantos + POR_PAGINA);
          }}
          className="mt-6 rounded-2xl border-[3px] border-borde/55 bg-superficie px-6 py-3 text-xl font-bold hover:border-acento"
        >
          Ver {Math.min(POR_PAGINA, filtrados.length - cuantos)} más
        </button>
      )}
    </div>
  );
}

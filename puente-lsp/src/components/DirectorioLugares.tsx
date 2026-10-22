"use client";

import { useId, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import type { LugarPublico } from "@/lib/lugares";
import { ATIENDE_LSP, DEPARTAMENTOS, RUBROS } from "@/lib/lugares-datos";
import type { PuntoMapa } from "@/components/MapaLugares";

const MapaLugares = dynamic(() => import("@/components/MapaLugares"), {
  ssr: false,
  loading: () => (
    <p className="rounded-xl border-2 border-borde p-4 text-lg text-suave">
      Cargando el mapa…
    </p>
  ),
});

const campo =
  "min-h-12 w-full rounded-xl border-2 border-borde bg-superficie px-4 py-2 text-lg text-texto";
const insignia =
  "inline-flex items-center rounded-full border-2 border-borde px-3 py-1 text-base font-bold";

export function DirectorioLugares({ lugares }: { lugares: LugarPublico[] }) {
  const id = useId();
  const [departamento, setDepartamento] = useState("");
  const [rubro, setRubro] = useState("");
  const [verMapa, setVerMapa] = useState(true);

  const filtrados = useMemo(
    () =>
      lugares.filter(
        (l) =>
          (!departamento || l.departamento === departamento) &&
          (!rubro || l.rubro === rubro),
      ),
    [lugares, departamento, rubro],
  );

  const puntos: PuntoMapa[] = useMemo(
    () =>
      filtrados
        .filter((l): l is LugarPublico & { lat: number; lng: number } =>
          l.lat !== null && l.lng !== null,
        )
        .map((l) => ({ id: l.id, nombre: l.nombre, lat: l.lat, lng: l.lng, tipo: l.tipo })),
    [filtrados],
  );

  return (
    <div className="space-y-8">
      <form
        role="search"
        aria-label="Filtrar lugares"
        className="grid gap-4 sm:grid-cols-2"
        onSubmit={(e) => e.preventDefault()}
      >
        <div>
          <label htmlFor={`${id}-dep`} className="mb-2 block text-lg font-bold">
            Departamento
          </label>
          <select
            id={`${id}-dep`}
            value={departamento}
            onChange={(e) => setDepartamento(e.target.value)}
            className={campo}
          >
            <option value="">Todo el Perú</option>
            {DEPARTAMENTOS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor={`${id}-rubro`} className="mb-2 block text-lg font-bold">
            Tipo de lugar
          </label>
          <select
            id={`${id}-rubro`}
            value={rubro}
            onChange={(e) => setRubro(e.target.value)}
            className={campo}
          >
            <option value="">Todos los tipos</option>
            {Object.entries(RUBROS).map(([k, texto]) => (
              <option key={k} value={k}>
                {texto}
              </option>
            ))}
          </select>
        </div>
      </form>

      <p className="text-lg text-suave" aria-live="polite">
        {filtrados.length === 0
          ? "No hay lugares con estos filtros todavía."
          : `Mostrando ${filtrados.length} ${filtrados.length === 1 ? "lugar" : "lugares"}.`}
      </p>

      <div>
        <button
          type="button"
          onClick={() => setVerMapa((v) => !v)}
          aria-pressed={verMapa}
          className="mb-4 min-h-12 rounded-xl border-2 border-borde bg-superficie px-4 py-2 text-lg font-bold text-texto hover:bg-fondo-alt"
        >
          {verMapa ? "Ocultar el mapa" : "Ver el mapa"}
        </button>
        {verMapa && (
          <>
            <MapaLugares puntos={puntos} />
            <p className="mt-3 text-base text-suave">
              Mapa © OpenStreetMap contributors (
              <a
                href="https://www.openstreetmap.org/copyright"
                target="_blank"
                rel="noopener noreferrer"
                className="text-acento underline underline-offset-4"
              >
                datos y licencia
              </a>
              ). Los lugares sin punto en el mapa sí aparecen en la lista.
            </p>
          </>
        )}
      </div>

      <ul className="grid gap-5 md:grid-cols-2" aria-label="Lista de lugares">
        {filtrados.map((l) => (
          <li
            key={l.id}
            className="flex flex-col gap-3 rounded-[28px] border-[3px] border-borde/55 bg-superficie p-6"
          >
            <h2 className="text-2xl font-bold">{l.nombre}</h2>
            <p className="text-lg text-suave">
              {RUBROS[l.rubro]} · {l.distrito}, {l.departamento}
            </p>
            <div className="flex flex-wrap gap-2">
              {l.tipo === "sello" && (
                <span className={`${insignia} bg-acento-fondo`}>Sello Puente</span>
              )}
              {l.atiende_lsp && (
                <span className={insignia}>
                  Según el lugar: personal sabe LSP: {ATIENDE_LSP[l.atiende_lsp]}
                </span>
              )}
              {l.interprete !== null && (
                <span className={insignia}>
                  Según el lugar: llama a intérprete: {l.interprete ? "Sí" : "No"}
                </span>
              )}
              {l.confirmaciones > 0 && (
                <span className={insignia}>
                  {l.confirmaciones} {l.confirmaciones === 1 ? "persona confirmó" : "personas confirmaron"}
                </span>
              )}
            </div>
            <div className="mt-auto flex flex-wrap gap-3 pt-2">
              {l.tipo === "sello" && (
                <Link
                  href={`/s/${l.id}`}
                  className="inline-flex min-h-12 items-center rounded-xl bg-accion px-5 py-2 text-lg font-bold text-sobre-accion hover:bg-accion-hover"
                >
                  Conversar aquí
                </Link>
              )}
              <Link
                href={`/lugares/nuevo?lugar=${l.id}`}
                className="inline-flex min-h-12 items-center rounded-xl border-2 border-borde bg-superficie px-5 py-2 text-lg font-bold text-texto hover:bg-fondo-alt"
              >
                Contar cómo me atendieron
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

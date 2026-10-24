"use client";

import { useState, useSyncExternalStore } from "react";
import { Check, ExternalLink } from "lucide-react";
import { DICCIONARIO_PUCP, TEMAS, TOTAL_PALABRAS } from "@/lib/aprende";

const VALIDAS = new Set(TEMAS.flatMap((t) => t.palabras.map((p) => p.palabra)));

const CLAVE = "aprende:practicadas";
const EVENTO = "aprende:practicadas";

function leer(): string {
  try {
    return localStorage.getItem(CLAVE) ?? "[]";
  } catch {
    return "[]";
  }
}

function suscribir(avisar: () => void) {
  window.addEventListener("storage", avisar);
  window.addEventListener(EVENTO, avisar);
  return () => {
    window.removeEventListener("storage", avisar);
    window.removeEventListener(EVENTO, avisar);
  };
}

function guardar(lista: string[]) {
  try {
    localStorage.setItem(CLAVE, JSON.stringify(lista));
  } catch {}
  window.dispatchEvent(new Event(EVENTO));
}

function aLista(json: string): string[] {
  try {
    const v = JSON.parse(json);
    return Array.isArray(v) ? v.filter((x) => typeof x === "string" && VALIDAS.has(x)) : [];
  } catch {
    return [];
  }
}

// Tarjetas de palabras con su oración de ejemplo del diccionario de la PUCP.
// El diccionario no tiene una dirección por palabra: el botón copia la
// palabra y abre la búsqueda para pegarla.
export function PalabrasLSP() {
  const practicadas = aLista(useSyncExternalStore(suscribir, leer, () => "[]"));
  const [copiada, setCopiada] = useState<string | null>(null);

  const alternar = (palabra: string) =>
    guardar(
      practicadas.includes(palabra)
        ? practicadas.filter((p) => p !== palabra)
        : [...practicadas, palabra],
    );

  const copiar = async (palabra: string) => {
    try {
      await navigator.clipboard.writeText(palabra);
      setCopiada(palabra);
    } catch {
      setCopiada(null);
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-center gap-4">
        <p className="text-xl font-bold" aria-live="polite">
          Practicaste {practicadas.length} de {TOTAL_PALABRAS}
        </p>
        <div
          aria-hidden="true"
          className="h-4 min-w-40 flex-1 overflow-hidden rounded-full bg-acento-fondo"
        >
          <div
            className="h-full rounded-full bg-acento transition-[width] motion-reduce:transition-none"
            style={{ width: `${(practicadas.length / TOTAL_PALABRAS) * 100}%` }}
          />
        </div>
      </div>

      {TEMAS.map((t) => (
        <section key={t.id} aria-labelledby={`tema-${t.id}`} className="mt-10">
          <h3 id={`tema-${t.id}`} className="text-2xl font-bold">{t.titulo}</h3>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {t.palabras.map((p) => {
              const hecha = practicadas.includes(p.palabra);
              return (
                <li
                  key={p.palabra}
                  className={`flex flex-col rounded-[28px] border-[3px] bg-superficie p-6 ${hecha ? "border-exito" : "border-borde/55"}`}
                >
                  <p className="text-3xl font-bold first-letter:uppercase">{p.palabra}</p>
                  <p className="mt-2 text-lg leading-snug text-suave">{p.uso}</p>
                  <div className="mt-auto flex flex-wrap gap-3 pt-5">
                    <a
                      href={DICCIONARIO_PUCP}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => copiar(p.palabra)}
                      className="inline-flex min-h-12 items-center gap-2 rounded-2xl bg-accion px-4 text-lg font-bold text-sobre-accion no-underline hover:bg-accion-hover"
                    >
                      Ver la seña
                      <ExternalLink aria-hidden="true" className="size-5" />
                      <span className="sr-only"> de «{p.palabra}» en el diccionario de la PUCP (se abre en otra pestaña)</span>
                    </a>
                    <button
                      type="button"
                      aria-pressed={hecha}
                      onClick={() => alternar(p.palabra)}
                      className={`inline-flex min-h-12 items-center gap-2 rounded-2xl border-[3px] px-4 text-lg font-bold ${hecha ? "border-exito bg-exito-fondo text-exito" : "border-borde/55"}`}
                    >
                      <Check aria-hidden="true" className="size-5" />
                      {hecha ? "Practicada" : "Ya la practiqué"}
                    </button>
                  </div>
                  <p role="status" className="mt-3 text-base text-suave">
                    {copiada === p.palabra
                      ? `Copiamos «${p.palabra}»: pégala en el buscador.`
                      : `En el diccionario, busca «${p.palabra}».`}
                  </p>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </div>
  );
}

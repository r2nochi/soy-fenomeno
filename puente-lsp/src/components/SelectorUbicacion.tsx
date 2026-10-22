"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

// El mapa solo existe en el navegador. Sin él, el formulario sigue funcionando.
const MapaSelector = dynamic(() => import("@/components/MapaSelector"), {
  ssr: false,
  loading: () => (
    <p className="rounded-xl border-2 border-borde p-4 text-lg text-suave">
      Cargando el mapa…
    </p>
  ),
});

// Punto opcional del lugar: escribe lat y lng en campos ocultos para el servidor.
export function SelectorUbicacion({
  latInicial,
  lngInicial,
}: {
  latInicial?: string;
  lngInicial?: string;
}) {
  const [punto, setPunto] = useState<{ lat: number; lng: number } | null>(
    latInicial && lngInicial
      ? { lat: Number(latInicial), lng: Number(lngInicial) }
      : null,
  );

  return (
    <div className="space-y-3">
      <p className="text-lg text-suave">
        Si quieres, toca el mapa para marcar dónde queda el lugar. Es opcional:
        sin el punto, el lugar aparece solo en la lista.
      </p>
      <MapaSelector valor={punto} alCambiar={setPunto} />
      <div className="flex flex-wrap items-center gap-3">
        <p className="text-lg font-bold" aria-live="polite">
          {punto
            ? `Punto marcado: ${punto.lat.toFixed(4)}, ${punto.lng.toFixed(4)}`
            : "Ningún punto marcado."}
        </p>
        {punto && (
          <button
            type="button"
            onClick={() => setPunto(null)}
            className="min-h-12 rounded-xl border-2 border-borde bg-superficie px-4 py-2 text-lg font-bold text-texto hover:bg-fondo-alt"
          >
            Quitar punto
          </button>
        )}
      </div>
      <input type="hidden" name="lat" value={punto ? punto.lat : ""} />
      <input type="hidden" name="lng" value={punto ? punto.lng : ""} />
    </div>
  );
}

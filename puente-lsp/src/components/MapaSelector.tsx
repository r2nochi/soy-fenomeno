"use client";

import { useEffect, useRef } from "react";
import * as L from "leaflet";
import "leaflet/dist/leaflet.css";
import { CAJA_PERU } from "@/lib/lugares-datos";

type Punto = { lat: number; lng: number } | null;

// Mapa para marcar un punto con un toque. Se carga solo en el navegador
// (ver SelectorUbicacion), porque Leaflet necesita `window`.
export default function MapaSelector({
  valor,
  alCambiar,
}: {
  valor: Punto;
  alCambiar: (p: { lat: number; lng: number }) => void;
}) {
  const contRef = useRef<HTMLDivElement>(null);
  const mapaRef = useRef<L.Map | null>(null);
  const marcaRef = useRef<L.CircleMarker | null>(null);
  const alCambiarRef = useRef(alCambiar);

  useEffect(() => {
    alCambiarRef.current = alCambiar;
  });

  useEffect(() => {
    if (!contRef.current) return;
    const mapa = L.map(contRef.current, { zoomControl: true }).setView(
      [-9.19, -75.0],
      5,
    );
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(mapa);
    mapa.on("click", (e: L.LeafletMouseEvent) => {
      const { lat, lng } = e.latlng;
      // Fuera del Perú no se marca: la caja protege de clics por error.
      if (
        lat < CAJA_PERU.latMin ||
        lat > CAJA_PERU.latMax ||
        lng < CAJA_PERU.lngMin ||
        lng > CAJA_PERU.lngMax
      )
        return;
      alCambiarRef.current({ lat: Number(lat.toFixed(6)), lng: Number(lng.toFixed(6)) });
    });
    mapaRef.current = mapa;
    return () => {
      mapa.remove();
      mapaRef.current = null;
      marcaRef.current = null;
    };
  }, []);

  // Dibuja el punto cuando cambia el valor (un clic o "Quitar punto").
  useEffect(() => {
    const mapa = mapaRef.current;
    if (!mapa) return;
    marcaRef.current?.remove();
    marcaRef.current = null;
    if (valor) {
      marcaRef.current = L.circleMarker([valor.lat, valor.lng], {
        radius: 12,
        color: "#0b4fd1",
        weight: 3,
        fillColor: "#0b4fd1",
        fillOpacity: 0.5,
      }).addTo(mapa);
      mapa.setView([valor.lat, valor.lng], Math.max(mapa.getZoom(), 13));
    }
  }, [valor]);

  return (
    <div
      ref={contRef}
      role="region"
      aria-label="Mapa para marcar el lugar. Si no puedes usarlo, sigue sin marcar."
      className="h-72 w-full overflow-hidden rounded-xl border-2 border-borde md:h-96"
    />
  );
}

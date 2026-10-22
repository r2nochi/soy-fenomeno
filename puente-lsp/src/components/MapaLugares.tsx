"use client";

import { useEffect, useRef } from "react";
import * as L from "leaflet";
import "leaflet/dist/leaflet.css";

export type PuntoMapa = {
  id: string;
  nombre: string;
  lat: number;
  lng: number;
  tipo: "sello" | "comunidad";
};

// Mapa visual. La lista de al lado tiene la misma información en texto.
export default function MapaLugares({ puntos }: { puntos: PuntoMapa[] }) {
  const contRef = useRef<HTMLDivElement>(null);
  const mapaRef = useRef<L.Map | null>(null);
  const capaRef = useRef<L.LayerGroup | null>(null);

  useEffect(() => {
    if (!contRef.current) return;
    const mapa = L.map(contRef.current).setView([-9.19, -75.0], 5);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(mapa);
    capaRef.current = L.layerGroup().addTo(mapa);
    mapaRef.current = mapa;
    return () => {
      mapa.remove();
      mapaRef.current = null;
      capaRef.current = null;
    };
  }, []);

  useEffect(() => {
    const capa = capaRef.current;
    const mapa = mapaRef.current;
    if (!capa || !mapa) return;
    capa.clearLayers();
    for (const p of puntos) {
      // El texto va como nodo de texto, no como HTML, para que nada se ejecute.
      const texto = document.createElement("div");
      const titulo = document.createElement("strong");
      titulo.textContent = p.nombre;
      const tipo = document.createElement("span");
      tipo.textContent = p.tipo === "sello" ? "Sello Puente: se comprometió a atender" : "Recomendado por la comunidad";
      texto.append(titulo, document.createElement("br"), tipo);
      L.circleMarker([p.lat, p.lng], {
        radius: 9,
        color: p.tipo === "sello" ? "#0b4fd1" : "#0b6b3a",
        weight: 3,
        fillColor: p.tipo === "sello" ? "#0b4fd1" : "#0b6b3a",
        fillOpacity: 0.6,
      })
        .bindPopup(texto)
        .addTo(capa);
    }
    if (puntos.length > 0) {
      const limites = L.latLngBounds(puntos.map((p) => [p.lat, p.lng] as [number, number]));
      mapa.fitBounds(limites, { padding: [40, 40], maxZoom: 14 });
    }
  }, [puntos]);

  return (
    <div
      ref={contRef}
      role="region"
      aria-label="Mapa de lugares. La lista de abajo tiene los mismos lugares en texto."
      className="h-80 w-full overflow-hidden rounded-[28px] border-[3px] border-borde/55 md:h-[28rem]"
    />
  );
}

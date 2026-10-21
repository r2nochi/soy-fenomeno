import { SONIDOS } from "./sonidos";

// Sonidos que se intercalan en los subtítulos, como "(🎵 música)".
// Los números son clases de YAMNet (public/yamnet/yamnet_class_map.csv).
export type Etiqueta = {
  id: string;
  nombre: string;
  icono: string;
  clases: number[];
  umbral: number;
  // Ventanas cercanas en que debe repetirse antes de escribirse (por defecto 2).
  golpes?: number;
};

// Por encima de esta confianza se afirma; por debajo se dice "posible".
export const SEGURO = 0.6;

const AMBIENTE: Etiqueta[] = [
  { id: "musica", nombre: "música", icono: "🎵", clases: [24, 132, 133, 243], umbral: 0.4 },
  { id: "risas", nombre: "risas", icono: "😄", clases: [13, 14], umbral: 0.35 },
  { id: "aplausos", nombre: "aplausos", icono: "👏", clases: [58, 61, 62], umbral: 0.35 },
  { id: "gritos", nombre: "gritos", icono: "😱", clases: [6, 11], umbral: 0.35 },
  { id: "tos", nombre: "tos", icono: "🤧", clases: [42], umbral: 0.4 },
  { id: "pajaros", nombre: "pájaros", icono: "🐦", clases: [106, 107, 108], umbral: 0.3 },
  { id: "gato", nombre: "gato", icono: "🐈", clases: [76], umbral: 0.4 },
  { id: "perro", nombre: "perro ladrando", icono: "🐕", clases: [70], umbral: 0.35 },
  { id: "viento", nombre: "viento", icono: "🌬️", clases: [277, 279], umbral: 0.4 },
  { id: "lluvia", nombre: "lluvia", icono: "🌧️", clases: [283, 284, 285], umbral: 0.35 },
  { id: "trueno", nombre: "trueno", icono: "⛈️", clases: [280, 281], umbral: 0.35 },
  { id: "agua", nombre: "agua corriendo", icono: "🚿", clases: [282, 286, 364], umbral: 0.4 },
  { id: "trafico", nombre: "tráfico", icono: "🚗", clases: [294, 301, 308, 310, 315, 320, 321], umbral: 0.35 },
  { id: "bocina", nombre: "bocina", icono: "📯", clases: [302, 303], umbral: 0.3 },
  { id: "vajilla", nombre: "platos u ollas", icono: "🍽️", clases: [358], umbral: 0.4 },
  { id: "obra", nombre: "martillo o taladro", icono: "🔨", clases: [413, 419], umbral: 0.35 },
  { id: "vidrio", nombre: "vidrio rompiéndose", icono: "🪟", clases: [435, 437], umbral: 0.3 },
  { id: "explosion", nombre: "explosión o cohetes", icono: "💥", clases: [420, 421, 426], umbral: 0.3 },
  { id: "tv", nombre: "televisión o radio", icono: "📺", clases: [518, 519], umbral: 0.4 },
];

// Nombre corto de cada sonido de alerta dentro de los subtítulos.
const NOMBRE_CORTO: Record<string, string> = {
  incendio: "alarma",
  puerta: "timbre o golpes en la puerta",
  telefono: "teléfono",
  bebe: "bebé llorando",
  sirena: "sirena",
  perro: "perro ladrando",
  pitido: "pitido",
};

// Los sonidos de alerta también aparecen en los subtítulos (la voz no:
// ya está transcrita).
const ALERTAS: Etiqueta[] = SONIDOS.filter((s) => s.id !== "voz").map((s) => ({
  id: s.id,
  nombre: NOMBRE_CORTO[s.id] ?? s.nombre.toLowerCase(),
  icono: s.icono,
  clases: s.clases,
  umbral: s.umbral,
  // Los pitidos de una alarma llegan antes de que se reconozca la alarma:
  // se espera más para no confundirlos.
  golpes: s.id === "pitido" ? 4 : undefined,
}));

export const ETIQUETAS: Etiqueta[] = [
  ...ALERTAS,
  ...AMBIENTE.filter((a) => !ALERTAS.some((b) => b.id === a.id)),
];

export type EtiquetaDetectada = { etiqueta: Etiqueta; confianza: number };

export function etiquetasPresentes(valores: ArrayLike<number>) {
  const presentes: EtiquetaDetectada[] = [];
  for (const etiqueta of ETIQUETAS) {
    const confianza = Math.max(...etiqueta.clases.map((c) => valores[c]));
    if (confianza >= etiqueta.umbral) presentes.push({ etiqueta, confianza });
  }
  return presentes.sort((a, b) => b.confianza - a.confianza);
}

export const textoEtiqueta = ({ etiqueta, confianza }: EtiquetaDetectada) =>
  `${etiqueta.icono} ${confianza >= SEGURO ? "" : "posible "}${etiqueta.nombre}`;

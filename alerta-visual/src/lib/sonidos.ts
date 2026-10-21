// Grupos de sonidos que avisamos. Los números son las clases de YAMNet
// (ver public/yamnet/yamnet_class_map.csv).

export type IdSonido =
  | "incendio"
  | "puerta"
  | "telefono"
  | "bebe"
  | "sirena"
  | "perro"
  | "pitido"
  | "voz";

export type Sonido = {
  id: IdSonido;
  nombre: string;
  icono: string;
  color: string;
  clases: number[];
  umbral: number;
  // Ventanas seguidas (de ~0,5 s) que deben superar el umbral para avisar.
  confirmaciones: number;
  urgente: boolean;
  activoPorDefecto: boolean;
};

export const SONIDOS: Sonido[] = [
  {
    id: "incendio",
    nombre: "Alarma de humo o incendio",
    icono: "🔥",
    color: "#d10000",
    clases: [382, 393, 394],
    umbral: 0.25,
    confirmaciones: 2,
    urgente: true,
    activoPorDefecto: true,
  },
  {
    id: "puerta",
    nombre: "Timbre o golpes en la puerta",
    icono: "🚪",
    color: "#0b5bd3",
    clases: [349, 350, 353],
    umbral: 0.3,
    confirmaciones: 1,
    urgente: false,
    activoPorDefecto: true,
  },
  {
    id: "telefono",
    nombre: "Teléfono sonando",
    icono: "📱",
    color: "#07663b",
    clases: [383, 384, 385],
    umbral: 0.3,
    confirmaciones: 2,
    urgente: false,
    activoPorDefecto: true,
  },
  {
    id: "bebe",
    nombre: "Bebé llorando",
    icono: "👶",
    color: "#a3009c",
    clases: [19, 20],
    umbral: 0.35,
    confirmaciones: 2,
    urgente: true,
    activoPorDefecto: true,
  },
  {
    id: "sirena",
    nombre: "Sirena (ambulancia, policía, bomberos)",
    icono: "🚨",
    color: "#9e4100",
    clases: [317, 318, 319, 390, 391],
    umbral: 0.3,
    confirmaciones: 2,
    urgente: true,
    activoPorDefecto: true,
  },
  {
    id: "perro",
    nombre: "Perro ladrando",
    icono: "🐕",
    color: "#7a5200",
    clases: [70],
    umbral: 0.4,
    confirmaciones: 2,
    urgente: false,
    activoPorDefecto: false,
  },
  {
    id: "pitido",
    nombre: "Pitido de electrodoméstico o despertador",
    icono: "⏰",
    color: "#5a4bd1",
    clases: [389, 392, 475],
    umbral: 0.35,
    confirmaciones: 2,
    urgente: false,
    activoPorDefecto: false,
  },
  {
    id: "voz",
    nombre: "Alguien está hablando",
    icono: "🗣️",
    color: "#38618c",
    clases: [0, 1],
    umbral: 0.6,
    confirmaciones: 3,
    urgente: false,
    activoPorDefecto: false,
  },
];

export const SONIDO_POR_ID = Object.fromEntries(
  SONIDOS.map((s) => [s.id, s]),
) as Record<IdSonido, Sonido>;

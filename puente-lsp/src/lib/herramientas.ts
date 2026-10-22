// Herramientas gratuitas del portal, en el orden en que se muestran.

export type Herramienta = {
  href: string;
  titulo: string;
  texto: string;
  icono: "alerta" | "conversacion" | "tarjeta" | "carta" | "sello" | "lugares";
};

export const HERRAMIENTAS: Herramienta[] = [
  {
    href: "/herramientas/conversacion",
    titulo: "Conversación cara a cara",
    texto: "Pon el celular en la mesa: tú escribes, la otra persona habla y ves su voz en texto.",
    icono: "conversacion",
  },
  {
    href: "/herramientas/alerta-visual",
    titulo: "Alerta Visual y subtítulos",
    texto: "Los sonidos de tu casa en avisos que se ven, y la voz en subtítulos.",
    icono: "alerta",
  },
  {
    href: "/herramientas/tarjeta",
    titulo: "Mi tarjeta de emergencia",
    texto: "Muestra en un toque que eres Sordo/a y a quién llamar. Funciona sin internet.",
    icono: "tarjeta",
  },
  {
    href: "/herramientas/carta",
    titulo: "Pide tu intérprete",
    texto: "Arma una carta formal para pedir un intérprete de LSP, con la ley citada.",
    icono: "carta",
  },
  {
    href: "/lugares",
    titulo: "Lugares accesibles",
    texto: "Dónde atienden bien a personas Sordas, contado por la comunidad.",
    icono: "lugares",
  },
  {
    href: "/sello",
    titulo: "Sello para negocios",
    texto: "Tu local recibe un afiche con QR para conversar con clientes Sordos. Gratis.",
    icono: "sello",
  },
];

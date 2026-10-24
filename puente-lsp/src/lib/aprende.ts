// Contenido de /aprende. Fuentes verificadas el 23/10/2026; el detalle está en
// research_notes/Aprender LSP fuentes/fuentes.md. No se inventan señas: el
// abecedario es la página oficial del MINEDU y las señas son videos del
// Diccionario LSP de la PUCP, hechos por personas Sordas peruanas.

export const DICCIONARIO_PUCP = "https://diccionariolsp.pucp.edu.pe/search-by-text";
export const ARTICULO_PUCP = "https://aclanthology.org/2024.lrec-main.901/";

export const GUIA_MINEDU = {
  titulo: "Lengua de señas peruana: guía para el aprendizaje de la lengua de señas peruana, vocabulario básico",
  autor: "Ministerio de Educación del Perú (DIGEBE)",
  anio: 2015,
  url: "https://repositorio.minedu.gob.pe/handle/20.500.12799/5545",
  licencia: "CC BY-NC-ND 2.5 Perú",
  urlLicencia: "https://creativecommons.org/licenses/by-nc-nd/2.5/pe/",
};

// Página 42 de la guía, sin cambios. Medidas del archivo en public/.
export const IMAGEN_ALFABETO = {
  src: "/aprende/alfabeto-dactilologico-minedu.webp",
  ancho: 1395,
  alto: 2007,
};

export type Letra = { letra: string; x: number; y: number };

// Posición de cada letra en la imagen, en % del ancho y del alto.
const ANCHO_CAJA = (147 / 930) * 100;
// 140 y no 132: así el marco no corta la etiqueta de la letra.
const ALTO_CAJA = (140 / 1338) * 100;
const COLUMNAS = [136, 312, 488, 664];
const FILAS = [193, 341, 488, 636, 783, 930];
const ORDEN = "ABCDEFGHIJKLMNÑOPQRSTUVW";

export const CAJA = { ancho: ANCHO_CAJA, alto: ALTO_CAJA };

export const LETRAS: Letra[] = [
  ...[...ORDEN].map((letra, i) => ({
    letra,
    x: (COLUMNAS[i % 4] / 930) * 100,
    y: (FILAS[Math.floor(i / 4)] / 1338) * 100,
  })),
  ...[
    ["X", 215],
    ["Y", 391],
    ["Z", 567],
  ].map(([letra, x]) => ({
    letra: letra as string,
    x: ((x as number) / 930) * 100,
    y: (1077 / 1338) * 100,
  })),
];

// Texto a letras del alfabeto manual: sin tildes (salvo la Ñ) y sin signos.
export function aLetras(texto: string): string[] {
  return [...texto.normalize("NFC").trim().toUpperCase()]
    .map((c) => (c === "Ñ" ? c : c.normalize("NFD").replace(/[\u0300-\u036f]/g, "")))
    .filter((c) => c === " " || LETRAS.some((l) => l.letra === c));
}

// Recomendaciones de la guía del MINEDU para deletrear (pág. 41).
export const CONSEJOS_DELETREO = [
  "Usa solo una mano: la más hábil (derecha si eres diestro, izquierda si eres zurdo).",
  "Pon la mano a la altura de la boca, sin esfuerzo: tus labios ayudan a entender.",
  "Haz las letras seguidas, sin pausas largas ni movimientos de más.",
  "Entre palabra y palabra, deja un momento corto.",
  "Letras dobles (como LL o RR): haz un movimiento corto hacia la derecha.",
  "La Ñ se hace con un doble movimiento hacia ambos lados.",
];

// Parámetros de la seña según la guía del MINEDU (págs. 19 a 36).
export const PARAMETROS = [
  { nombre: "Configuración", texto: "La forma de la mano." },
  { nombre: "Lugar", texto: "Dónde se hace la seña: delante del cuerpo, de la cabeza a la cintura." },
  { nombre: "Movimiento", texto: "Cómo se mueve la mano." },
  { nombre: "Orientación", texto: "Hacia dónde mira la palma." },
  { nombre: "Contacto", texto: "Qué parte de la mano toca el cuerpo." },
  { nombre: "Plano", texto: "Qué tan lejos del cuerpo está la mano." },
  { nombre: "Cara y cuerpo", texto: "La expresión de la cara, los labios, la cabeza y el tronco." },
];

export type Palabra = {
  palabra: string;
  // Cuándo se usa, escrito por nosotros. Los videos (la seña sola y en una
  // oración) están en el diccionario de la PUCP.
  uso: string;
};

export type Tema = { id: string; titulo: string; palabras: Palabra[] };

export const TEMAS: Tema[] = [
  {
    id: "conversar",
    titulo: "Saludar y conversar",
    palabras: [
      { palabra: "hola", uso: "Para saludar al encontrarte con alguien." },
      { palabra: "chau", uso: "Para despedirte." },
      { palabra: "conversar", uso: "Para decir que hablaron un rato." },
      { palabra: "entender", uso: "Para decir que comprendes." },
      { palabra: "preguntar", uso: "Para hacer una pregunta." },
      { palabra: "llamar", uso: "Cuando alguien te llama o llamas a alguien." },
      { palabra: "esperar", uso: "Para pedir que te esperen." },
    ],
  },
  {
    id: "personas",
    titulo: "Personas y lugares",
    palabras: [
      { palabra: "amigo", uso: "Para hablar de tus amigos." },
      { palabra: "sordo", uso: "Para decir que una persona es Sorda." },
      { palabra: "casa", uso: "Tu casa, tu hogar." },
      { palabra: "colegio", uso: "El colegio." },
    ],
  },
  {
    id: "dia",
    titulo: "El día a día",
    palabras: [
      { palabra: "comer", uso: "La hora de comer. En el diccionario hay dos señas: «comer» y «comer (manzana)»." },
      { palabra: "dormir", uso: "Para decir que vas a dormir." },
      { palabra: "caminar", uso: "Cuando camina una persona. El diccionario tiene otras señas para caminar, como la de un ave." },
      { palabra: "trabajar", uso: "Para hablar de tu trabajo." },
      { palabra: "estudiar", uso: "Para hablar de tus estudios." },
      { palabra: "ayudar", uso: "Para pedir u ofrecer ayuda." },
      { palabra: "comprar", uso: "Para ir de compras." },
      { palabra: "escribir", uso: "Para decir que escribes." },
      { palabra: "ver", uso: "Mirar o ver algo." },
      { palabra: "querer", uso: "Para decir lo que quieres." },
    ],
  },
  {
    id: "sentir",
    titulo: "Cómo me siento",
    palabras: [
      { palabra: "feliz", uso: "Cuando estás contento o contenta." },
      { palabra: "aburrido", uso: "Cuando algo te aburre." },
      { palabra: "calor", uso: "Cuando hace calor." },
    ],
  },
];

export const TOTAL_PALABRAS = TEMAS.reduce((n, t) => n + t.palabras.length, 0);

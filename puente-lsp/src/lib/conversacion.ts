// Frases rápidas y tamaños para la conversación cara a cara.
// Sin dependencias: los tests importan este archivo directamente.

export const FRASES_BASE: readonly string[] = [
  "Soy Sordo/a. Por favor háblame de frente o escríbeme.",
  "¿Puede repetir, por favor?",
  "Más despacio, por favor.",
  "Escríbalo, por favor.",
  "Gracias",
  "Sí",
  "No",
  "Un momento, por favor.",
];

// Frases del negocio primero, luego las base. Sin vacías ni repetidas.
export function unirFrases(extra: readonly string[] = []): string[] {
  const vistas = new Set<string>();
  const salida: string[] = [];
  for (const frase of [...extra, ...FRASES_BASE]) {
    const limpia = frase.trim().replace(/\s+/g, " ");
    if (!limpia || vistas.has(limpia)) continue;
    vistas.add(limpia);
    salida.push(limpia);
  }
  return salida;
}

// Textos cortos se muestran enormes; los largos bajan de tamaño para caber.
export function tamanoTexto(texto: string): string {
  const largo = [...texto.trim()].length;
  if (largo <= 8) return "text-6xl sm:text-7xl";
  if (largo <= 16) return "text-5xl sm:text-6xl";
  if (largo <= 40) return "text-4xl sm:text-5xl";
  if (largo <= 100) return "text-3xl sm:text-4xl";
  return "text-2xl sm:text-3xl";
}

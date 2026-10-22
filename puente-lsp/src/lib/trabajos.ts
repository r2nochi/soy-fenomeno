import { cacheLife } from "next/cache";
import { extraerConvocatorias, FUENTE, type Convocatoria } from "./convocatorias";

export { AREAS, type AreaId, type Convocatoria } from "./convocatorias";

// Convocatorias del Estado, tomadas una vez al día del listado público de
// convocatoriasdetrabajo.com (su robots.txt permite estas páginas y sus términos
// no prohíben el acceso automático; revisado el 21/10/2026). Solo guardamos
// título, lugar, vigencia y el enlace al aviso original: el contenido completo
// se lee en su sitio. Todas sirven a personas con discapacidad: la Ley 29973
// (art. 48) da 15 % más de puntaje en los concursos públicos.

const LISTADO = `${FUENTE}/buscar.php`;

// "Vigente hasta el DD/MM/AAAA": se descartan las que ya vencieron.
const vigente = (c: Convocatoria, hoy: string) => {
  const [d, m, a] = c.vigencia?.split("/") ?? [];
  return !a || `${a}-${m.padStart(2, "0")}-${d.padStart(2, "0")}` >= hoy;
};

async function leerListado() {
  try {
    const r = await fetch(LISTADO, {
      headers: { "User-Agent": "PuenteLSP/1.0 (+https://puente-lsp.vercel.app/trabajos)" },
      signal: AbortSignal.timeout(15000),
    });
    if (!r.ok) return null;
    const todas = extraerConvocatorias(await r.text());
    // Cero avisos significa que el sitio cambió su HTML, no que no haya ofertas.
    if (todas.length === 0) {
      console.error("trabajos: el listado no tiene avisos reconocibles");
      return null;
    }
    return todas;
  } catch {
    return null;
  }
}

export async function convocatoriasDelDia(): Promise<{
  avisos: Convocatoria[];
  ok: boolean;
}> {
  "use cache";
  const todas = await leerListado();
  // Si falla, se reintenta pronto en vez de mostrar el error todo el día.
  if (!todas) {
    cacheLife("minutes");
    return { avisos: [], ok: false };
  }
  cacheLife("days");
  const hoy = new Date().toLocaleDateString("en-CA", { timeZone: "America/Lima" });
  // Las de sordera y LSP primero; luego el orden del listado (más recientes).
  const avisos = todas
    .filter((c) => vigente(c, hoy))
    .sort((a, b) => Number(b.areas[0] === "lsp") - Number(a.areas[0] === "lsp"));
  return { avisos: avisos.slice(0, 400), ok: true };
}

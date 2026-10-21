import { cacheLife } from "next/cache";

// Convocatorias relacionadas con discapacidad, sordera o LSP, tomadas una vez al
// día del listado público de convocatoriasdetrabajo.com (su robots.txt permite
// estas páginas y sus términos no prohíben el acceso automático; revisado el
// 21/10/2026). Solo guardamos título, lugar, vigencia y el enlace al aviso
// original: el contenido completo se lee en su sitio.

const FUENTE = "https://www.convocatoriasdetrabajo.com";
const LISTADO = `${FUENTE}/buscar.php`;

// Palabras completas (\b), para no confundir "SENASA" con "señas".
const PALABRAS = [
  /\bdiscapacidad/,
  /\bauditiv[oa]s?\b/,
  /\bsord[oa]s?\b/,
  /\bseñas\b/,
  /\blengua de senas\b/,
  /\bint[eé]rpretes?\b/,
  /\binclusi[oó]n\b/,
  /\bcebe\b/,
  /\bconadis\b/,
  /\bomaped\b/,
];

export type Convocatoria = {
  titulo: string;
  url: string;
  lugar?: string;
  vigencia?: string;
};

const entidades = (t: string) =>
  t
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();

export function extraerConvocatorias(html: string): Convocatoria[] {
  const avisos: Convocatoria[] = [];
  const vistos = new Set<string>();
  // Cada aviso: <h4><a href="oferta-de-empleo-....html" ...> Título</a></h4>
  // seguido de "Vigente hasta el DD/MM/AAAA" y el lugar.
  const patron =
    /<h4><a href="(?:https:\/\/www\.convocatoriasdetrabajo\.com\/)?(oferta-de-empleo-[a-z0-9-]+\.html)"[^>]*>([^<]+)<\/a><\/h4>([\s\S]{0,600}?)<div class="conv-rs">/g;
  for (const m of html.matchAll(patron)) {
    const url = `${FUENTE}/${m[1]}`;
    if (vistos.has(url)) continue;
    vistos.add(url);
    const detalle = m[3];
    const vigencia = detalle.match(/Vigente hasta el ([0-9/]+)/)?.[1];
    const lugar = detalle.match(/icon-mapa1"><\/span>([^<]+)</)?.[1];
    avisos.push({
      titulo: entidades(m[2]),
      url,
      vigencia,
      lugar: lugar ? entidades(lugar) : undefined,
    });
  }
  return avisos;
}

export const esRelacionada = (c: Convocatoria) => {
  const t = c.titulo.toLowerCase();
  return PALABRAS.some((p) => p.test(t));
};

export async function convocatoriasDelDia(): Promise<{
  avisos: Convocatoria[];
  ok: boolean;
}> {
  "use cache";
  cacheLife("days");
  try {
    const r = await fetch(LISTADO, {
      headers: { "User-Agent": "PuenteLSP/1.0 (+https://puente-lsp.vercel.app/trabajos)" },
      signal: AbortSignal.timeout(15000),
    });
    if (!r.ok) return { avisos: [], ok: false };
    const avisos = extraerConvocatorias(await r.text()).filter(esRelacionada);
    return { avisos: avisos.slice(0, 30), ok: true };
  } catch {
    return { avisos: [], ok: false };
  }
}

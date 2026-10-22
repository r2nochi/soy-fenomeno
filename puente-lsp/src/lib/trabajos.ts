import { cacheLife } from "next/cache";

// Convocatorias del Estado, tomadas una vez al día del listado público de
// convocatoriasdetrabajo.com (su robots.txt permite estas páginas y sus términos
// no prohíben el acceso automático; revisado el 21/10/2026). Solo guardamos
// título, lugar, vigencia y el enlace al aviso original: el contenido completo
// se lee en su sitio. Todas sirven a personas con discapacidad: la Ley 29973
// (art. 48) da 15 % más de puntaje en los concursos públicos.

const FUENTE = "https://www.convocatoriasdetrabajo.com";
const LISTADO = `${FUENTE}/buscar.php`;

// Áreas por palabras en los cargos del título (sin la entidad), ya en minúsculas
// y sin tildes. Un aviso puede tener varias áreas (muchos agrupan cargos:
// "Médicos, Abogado y Asistente").
export const AREAS = [
  {
    id: "ti",
    nombre: "TI y sistemas",
    patron:
      /\b(informatic|sistemas\b|soporte (tecnico|informatico)|desarrollador|programador|redes (informatic|y comunicacion|de datos)|(base|analista|ciencia) de datos|software|ciberseguridad|tecnologias? de (la )?informacion|ti\b|tic\b|web\b)/,
  },
  {
    id: "rrhh",
    nombre: "Recursos humanos",
    patron:
      /\b(recursos humanos|planillas?\b|escalafon|talento humano|bienestar (social|de personal)|capacitacion|procedimientos? administrativos? disciplinarios?)/,
  },
  {
    id: "administracion",
    nombre: "Administración y contabilidad",
    patron:
      /\b(administra(tiv|dor)|contab|contador|finanzas|tesorer|abastecimiento|logistic|presupuest|almacen|secretari|digita|patrimonio|planeamiento|recaudador|archivo)/,
  },
  {
    id: "atencion",
    nombre: "Atención al público",
    patron:
      /\b(atencion|orientador|recepcion|call center|plataforma|ventanilla|teleoperador|promotor)/,
  },
  {
    id: "salud",
    nombre: "Salud",
    patron:
      /\b(medic[oa]s?\b|medicina|enfermer|obstetr|odontolog|psicolog|tecnologo|biolog|farmac|nutricion|asistencial|laboratorio|terapeut|salud\b)/,
  },
  {
    id: "educacion",
    nombre: "Educación",
    patron: /\b(docente|profesor|auxiliar de educacion|pedagog|tutor|cebe\b|educativ)/,
  },
  {
    id: "legal",
    nombre: "Legal",
    patron: /\b(abogad|legal\b|juridic|judicial|procurad|defensor)/,
  },
  {
    id: "ingenieria",
    nombre: "Ingeniería y obras",
    patron: /\b(ingenier|arquitect|obras?\b|topograf)/,
  },
  {
    id: "practicas",
    nombre: "Prácticas",
    patron: /\b(practicantes?|practicas\b)/,
  },
] as const;

export type AreaId = (typeof AREAS)[number]["id"] | "lsp";

// Avisos sobre discapacidad, sordera o LSP. Palabras completas (\b), para no
// confundir "SENASA" con "señas".
const PALABRAS = [
  /\bdiscapacidad/,
  /\bauditiv[oa]s?\b/,
  /\bsord[oa]s?\b/,
  /\bseñas\b/,
  /\blengua de senas\b/,
  /\bint[eé]rpretes? de (?:lengua de )?señas\b/,
  /\binclusi[oó]n (?:laboral|educativa)\b/,
  /\bcebe\b/,
  /\bconadis\b/,
  /\bomaped\b/,
  /\blsp\b/,
  /\bsordoceg/,
];

export type Convocatoria = {
  titulo: string;
  url: string;
  lugar?: string;
  vigencia?: string;
  areas: AreaId[];
};

const entidades = (t: string) =>
  t
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/\s+/g, " ")
    .trim();

export function extraerConvocatorias(html: string): Convocatoria[] {
  const avisos: Convocatoria[] = [];
  const vistos = new Set<string>();
  // Cada aviso: <h4><a href="oferta-de-empleo-....html" ...> Título</a></h4>
  // seguido de "Vigente hasta el DD/MM/AAAA" y el lugar.
  const patron =
    /<h4><a href="(?:https:\/\/www\.convocatoriasdetrabajo\.com\/)?(oferta-de-empleo-[a-z0-9-]+\.html)"[^>]*>([^<]+)<\/a><\/h4>((?:(?!<h4>)[\s\S]){0,4000}?)<div class="conv-rs">/g;
  for (const m of html.matchAll(patron)) {
    const url = `${FUENTE}/${m[1]}`;
    if (vistos.has(url)) continue;
    vistos.add(url);
    const detalle = m[3];
    const vigencia = detalle.match(/Vigente hasta el ([0-9/]+)/)?.[1];
    const lugar = detalle.match(/icon-mapa1"><\/span>([^<]+)</)?.[1];
    const titulo = entidades(m[2]);
    avisos.push({
      titulo,
      url,
      vigencia,
      lugar: lugar ? entidades(lugar) : undefined,
      areas: areasDe(titulo),
    });
  }
  return avisos;
}

export const esRelacionada = (titulo: string) => {
  const t = titulo.toLowerCase();
  return PALABRAS.some((p) => p.test(t));
};

const sinTildes = (t: string) =>
  t.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

// "UGEL X requiere Abogado - Convocatoria octubre 2026" → " abogado ". Sin la
// entidad, "Red de Salud: Digitador" no cae en Salud.
const cargos = (t: string) =>
  (t.match(/(?::|\b(?:requiere|busca|solicita|necesita)\b)(.*)$/)?.[1] ?? t).replace(
    /-\s*convocatoria.*$/,
    "",
  );

export function areasDe(titulo: string): AreaId[] {
  const t = cargos(sinTildes(titulo));
  const areas: AreaId[] = AREAS.filter((a) => a.patron.test(t)).map((a) => a.id);
  if (esRelacionada(titulo)) areas.unshift("lsp");
  return areas;
}

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

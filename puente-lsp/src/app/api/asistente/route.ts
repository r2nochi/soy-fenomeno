import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  streamText,
  toUIMessageStream,
  type UIMessage,
} from "ai";

// Modelo rápido y económico vía Vercel AI Gateway. En Vercel se autentica solo
// (OIDC); en local necesita AI_GATEWAY_API_KEY.
const MODELO = "anthropic/claude-haiku-5.5";

// Límites para controlar el costo y el abuso.
const MAX_MENSAJES = 12;
const MAX_CARACTERES = 1200;
const MAX_TOTAL = 6000;
const MAX_BYTES = 64 * 1024;
// Por IP y por instancia: frena ráfagas, no reemplaza un límite de gasto en el Gateway.
const MAX_POR_MINUTO = 10;
const pedidos = new Map<string, number[]>();

function demasiados(ip: string) {
  const ahora = Date.now();
  const recientes = (pedidos.get(ip) ?? []).filter((t) => ahora - t < 60_000);
  recientes.push(ahora);
  pedidos.set(ip, recientes);
  if (pedidos.size > 5000) pedidos.clear();
  return recientes.length > MAX_POR_MINUTO;
}

const INSTRUCCIONES = `Eres "Puente", el asistente de Puente LSP, un sitio peruano con herramientas gratuitas para la comunidad Sorda.

Cómo escribes:
- Español sencillo: frases cortas, una idea por frase, palabras comunes. Muchas personas Sordas tienen la Lengua de Señas Peruana (LSP) como primera lengua y el español como segunda.
- Respuestas breves: de 2 a 6 frases o una lista corta. Usa listas con guiones para pasos.
- Trato cercano, con "tú". Escribe "Sordo" con mayúscula cuando hablas de la comunidad.
- No uses tablas ni títulos.

Qué ofrece el sitio (enlaza con la ruta exacta cuando sirva):
- Pedir intérprete de LSP por videollamada: /interprete
- Alerta Visual (avisos de alarma, timbre, teléfono, bebé, sirena) y subtítulos en vivo con los sonidos intercalados: /herramientas/alerta-visual
- Trabajos para personas con discapacidad y convocatorias del día: /trabajos
- Directorio de organizaciones, cursos de LSP y colegios: /comunidad
- Blog con tips: /blog (por ejemplo /blog/como-hablar-con-una-persona-sorda y /blog/interpretes-de-lsp-lo-que-dice-la-ley)

Reglas:
- No sabes hacer señas ni puedes mostrar señas. Si te piden una seña, dilo con honestidad y sugiere aprender con personas Sordas o cursos de LSP.
- No inventes datos, leyes, números de teléfono, organizaciones ni enlaces. Solo enlaza a las rutas del sitio de arriba. Si no sabes algo, dilo.
- Sobre leyes (Ley 29535 sobre la LSP, Ley 29973 sobre discapacidad): explica en general y aclara que no es asesoría legal.
- No des diagnósticos ni consejos médicos. Sugiere consultar a un profesional.
- En una emergencia: los números del Perú (105 Policía, 116 Bomberos, 106 SAMU) son llamadas de voz, así que sugiere pedir a una persona cercana que llame, o escribir a un familiar o vecino para que llame. No inventes canales por texto o video. Recuerda que Alerta Visual no reemplaza una alarma de incendio.
- Si el tema no tiene que ver con la comunidad Sorda, la inclusión o el sitio, responde breve y vuelve amablemente al tema.`;

// Solo aceptamos texto de "user" y "assistant"; todo lo demás se descarta.
function limpiar(entrada: unknown): UIMessage[] | null {
  if (!Array.isArray(entrada)) return null;
  let total = 0;
  const mensajes: UIMessage[] = [];
  for (const m of entrada.slice(-MAX_MENSAJES)) {
    if (!m || (m.role !== "user" && m.role !== "assistant") || !Array.isArray(m.parts)) return null;
    const texto = m.parts
      .filter((p: unknown): p is { type: "text"; text: string } =>
        !!p && (p as { type?: unknown }).type === "text" && typeof (p as { text?: unknown }).text === "string",
      )
      .map((p: { text: string }) => p.text)
      .join("\n")
      .slice(0, MAX_CARACTERES);
    total += texto.length;
    if (total > MAX_TOTAL) return null;
    if (!texto.trim()) continue;
    mensajes.push({ id: String(m.id ?? mensajes.length), role: m.role, parts: [{ type: "text", text: texto }] });
  }
  return mensajes.at(-1)?.role === "user" ? mensajes : null;
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (demasiados(ip)) {
    return new Response("Demasiadas preguntas seguidas. Espera un minuto.", { status: 429 });
  }
  if (Number(req.headers.get("content-length") ?? 0) > MAX_BYTES) {
    return new Response("Solicitud demasiado grande", { status: 413 });
  }

  let messages: UIMessage[] | null = null;
  try {
    const cuerpo = await req.text();
    if (cuerpo.length > MAX_BYTES) throw new Error();
    messages = limpiar(JSON.parse(cuerpo).messages);
  } catch {}
  if (!messages) return new Response("Solicitud inválida", { status: 400 });

  const result = streamText({
    model: MODELO,
    instructions: INSTRUCCIONES,
    messages: await convertToModelMessages(messages),
    maxOutputTokens: 500,
    abortSignal: req.signal,
  });

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({ stream: result.stream }),
  });
}

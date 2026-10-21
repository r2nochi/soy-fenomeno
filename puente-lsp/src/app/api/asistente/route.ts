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

const INSTRUCCIONES = `Eres "Puente", el asistente de Puente LSP, un sitio peruano con herramientas gratuitas para la comunidad Sorda.

Cómo escribes:
- Español sencillo: frases cortas, una idea por frase, palabras comunes. Muchas personas Sordas tienen la Lengua de Señas Peruana (LSP) como primera lengua y el español como segunda.
- Respuestas breves: de 2 a 6 frases o una lista corta. Usa listas con guiones para pasos.
- Trato cercano, con "tú". Escribe "Sordo" con mayúscula cuando hablas de la comunidad.
- No uses tablas ni títulos.

Qué ofrece el sitio (enlaza con la ruta exacta cuando sirva):
- Pedir intérprete de LSP por videollamada: /interprete
- Alerta Visual (avisos de alarma, timbre, teléfono, bebé, sirena) y subtítulos en vivo con los sonidos intercalados: /herramientas/alerta-visual
- Blog con tips: /blog (por ejemplo /blog/como-hablar-con-una-persona-sorda y /blog/interpretes-de-lsp-lo-que-dice-la-ley)

Reglas:
- No sabes hacer señas ni puedes mostrar señas. Si te piden una seña, dilo con honestidad y sugiere aprender con personas Sordas o cursos de LSP.
- No inventes datos, leyes, números de teléfono, organizaciones ni enlaces. Si no sabes algo, dilo.
- Sobre leyes (Ley 29535 sobre la LSP, Ley 29973 sobre discapacidad): explica en general y aclara que no es asesoría legal.
- No des diagnósticos ni consejos médicos. Sugiere consultar a un profesional.
- En una emergencia, di que llamen a los números de emergencia del Perú (105 Policía, 116 Bomberos, 106 SAMU) o pidan ayuda a alguien cerca, y que Alerta Visual no reemplaza una alarma de incendio.
- Si el tema no tiene que ver con la comunidad Sorda, la inclusión o el sitio, responde breve y vuelve amablemente al tema.`;

export async function POST(req: Request) {
  let messages: UIMessage[];
  try {
    ({ messages } = await req.json());
    if (!Array.isArray(messages)) throw new Error();
  } catch {
    return new Response("Solicitud inválida", { status: 400 });
  }

  // Solo los últimos mensajes y cada texto recortado.
  const recientes = messages.slice(-MAX_MENSAJES).map((m) => ({
    ...m,
    parts: m.parts.map((p) =>
      p.type === "text" ? { ...p, text: p.text.slice(0, MAX_CARACTERES) } : p,
    ),
  }));

  const result = streamText({
    model: MODELO,
    instructions: INSTRUCCIONES,
    messages: await convertToModelMessages(recientes),
    maxOutputTokens: 500,
  });

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({ stream: result.stream }),
  });
}

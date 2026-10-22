// Respuestas del asistente Puente. Sin IA: cada respuesta está escrita aquí y
// se elige por palabras clave, así que no cuesta nada y nunca inventa datos.
// Para agregar un tema: sumar una entrada con sus palabras clave (sin tildes,
// en minúsculas; una palabra corta como "interpret" también cubre
// "intérprete", "intérpretes", "interpretación").

export type Enlace = { texto: string; href: string };

export type Respuesta = {
  id: string;
  // Pregunta tal como se muestra en las sugerencias.
  pregunta: string;
  claves: string[];
  lineas: string[];
  enlaces?: Enlace[];
};

export const RESPUESTAS: Respuesta[] = [
  {
    id: "interprete",
    pregunta: "¿Cómo pido un intérprete de LSP?",
    claves: ["interpret", "videollamada", "cita", "tramite", "traduc"],
    lineas: [
      "Puedes pedir un intérprete de LSP por videollamada. Son 3 pasos:",
      "- Pides: llenas el formulario o nos escribes por WhatsApp.",
      "- Te conectamos: buscamos un intérprete disponible y te enviamos un enlace.",
      "- Conversas: entras a la videollamada y el intérprete traduce entre LSP y español.",
      "Sirve para citas médicas, bancos, trámites, trabajo, clases y más.",
    ],
    enlaces: [{ texto: "Pedir intérprete", href: "/interprete" }],
  },
  {
    id: "empresas",
    pregunta: "Tengo una empresa, ¿cómo atiendo a clientes Sordos?",
    claves: ["empresa", "entidad", "negocio", "cliente", "atencion", "precio", "costo", "cuesta", "pago", "plan", "sede"],
    lineas: [
      "Con Puente LSP atiendes a tus clientes Sordos sin tener un intérprete fijo.",
      "- Pagas solo por el tiempo que usas.",
      "- Hay planes mensuales para sedes con mucha atención.",
      "Para saber el precio de tu caso, llena el formulario y te escribimos.",
    ],
    enlaces: [{ texto: "Ver la sección para empresas", href: "/interprete" }],
  },
  {
    id: "ser-interprete",
    pregunta: "Soy intérprete, ¿cómo me uno?",
    claves: ["soy interpret", "unir", "trabajar como"],
    lineas: [
      "Únete a la red de intérpretes de Puente LSP. Atiendes servicios por videollamada desde donde estés.",
      "En el formulario, elige la opción «Soy intérprete de LSP».",
    ],
    enlaces: [{ texto: "Ir al formulario", href: "/interprete#solicitar" }],
  },
  {
    id: "alerta",
    pregunta: "¿Qué hace Alerta Visual?",
    claves: ["alerta", "alarma", "timbre", "sonido", "ruido", "bebe", "llanto", "sirena", "telefono", "avis", "escuchar", "oir"],
    lineas: [
      "Alerta Visual escucha los sonidos de tu casa con el micrófono y te avisa en la pantalla, con colores grandes.",
      "Reconoce, por ejemplo, alarmas, el timbre, el teléfono, el llanto de un bebé y sirenas.",
      "Funciona en el navegador y es gratis. Los sonidos se reconocen en tu propio equipo.",
      "Importante: no reemplaza una alarma de incendio con luz.",
    ],
    enlaces: [{ texto: "Probar Alerta Visual", href: "/herramientas/alerta-visual" }],
  },
  {
    id: "subtitulos",
    pregunta: "¿Cómo uso los subtítulos en vivo?",
    claves: ["subtitul", "transcri", "voz", "dictado", "conversacion", "texto en vivo", "caption"],
    lineas: [
      "Dentro de Alerta Visual hay subtítulos en vivo: lo que la gente dice aparece escrito en la pantalla.",
      "También marca sonidos entre paréntesis, por ejemplo «(posible sirena)».",
      "Funciona en Chrome o Edge y necesita conexión a internet.",
    ],
    enlaces: [{ texto: "Abrir subtítulos", href: "/herramientas/alerta-visual" }],
  },
  {
    id: "hablar",
    pregunta: "¿Cómo hablo con una persona Sorda?",
    claves: ["hablar con", "hablo con", "comunicar", "conversar", "tips", "consejo", "trato", "labios"],
    lineas: [
      "Algunos consejos rápidos:",
      "- Llama su atención antes de hablar: ponte en su campo de visión o toca suavemente su hombro.",
      "- Mírala de frente, habla normal y no te tapes la boca.",
      "- No todas las personas Sordas leen los labios: pregunta.",
      "- Escribir también vale: en el celular o en un papel, corto y simple.",
      "- Para algo importante, pide un intérprete de LSP.",
    ],
    enlaces: [
      { texto: "Leer la guía completa", href: "/blog/como-hablar-con-una-persona-sorda" },
      { texto: "Pedir intérprete", href: "/interprete" },
    ],
  },
  {
    id: "lsp",
    pregunta: "¿Qué es la Lengua de Señas Peruana?",
    claves: ["lsp", "lengua de senas", "que es la lengua", "idioma", "gramatica", "espanol con las manos"],
    lineas: [
      "La Lengua de Señas Peruana (LSP) es la lengua de la comunidad Sorda en el Perú.",
      "Es una lengua completa, con su propia gramática. No es español hecho con las manos.",
      "Cada país tiene su propia lengua de señas.",
    ],
    enlaces: [{ texto: "Leer: La LSP no es español con las manos", href: "/blog/la-lsp-no-es-espanol-con-las-manos" }],
  },
  {
    id: "aprender",
    pregunta: "¿Dónde aprendo LSP?",
    claves: ["aprend", "curso", "clase", "estudiar", "ensenar", "beca"],
    lineas: [
      "En nuestro directorio hay cursos y materiales de LSP, por ejemplo el curso de Becas Grupo Romero y la guía del Ministerio de Educación.",
      "Lo mejor es aprender con personas Sordas: ellas son quienes mejor conocen su lengua.",
    ],
    enlaces: [{ texto: "Ver cursos y materiales", href: "/comunidad" }],
  },
  {
    id: "senas",
    pregunta: "¿Me enseñas una seña?",
    claves: ["sena", "como se dice", "como se hace", "signo", "deletre"],
    lineas: [
      "No hago señas. Soy un asistente escrito, y una seña se aprende mejor viéndola en una persona.",
      "Te recomiendo aprender con personas Sordas o en un curso de LSP.",
    ],
    enlaces: [{ texto: "Ver cursos de LSP", href: "/comunidad" }],
  },
  {
    id: "comunidad",
    pregunta: "¿Qué organizaciones Sordas hay en el Perú?",
    claves: ["organizacion", "asociacion", "federacion", "comunidad", "grupo", "colegio", "escuela", "ceba", "conadis", "directorio"],
    lineas: [
      "En nuestro directorio hay organizaciones de la comunidad Sorda (como Núcleo Somos, FENASOP y ASSORELI), instituciones del Estado como CONADIS, y colegios con LSP en Lima.",
      "Si conoces una organización que falta, escríbenos.",
    ],
    enlaces: [{ texto: "Ver el directorio", href: "/comunidad" }],
  },
  {
    id: "trabajo",
    pregunta: "¿Dónde busco trabajo?",
    claves: ["trabajo", "empleo", "chamba", "convocatoria", "oferta", "postular", "cuota", "laboral", "cv"],
    lineas: [
      "En la página de trabajos tienes:",
      "- Cómo ver las ofertas exclusivas para personas con discapacidad en Empleos Perú.",
      "- Convocatorias del día sobre discapacidad, sordera y LSP.",
      "- Enlaces a otros portales de empleo.",
    ],
    enlaces: [{ texto: "Ver trabajos", href: "/trabajos" }],
  },
  {
    id: "ley",
    pregunta: "¿Qué dice la ley sobre intérpretes?",
    claves: ["ley", "derecho", "legal", "29535", "29973", "norma", "obligad", "reforma", "congreso", "discrimin"],
    lineas: [
      "La Ley 29535 reconoce oficialmente la LSP y promueve que las entidades que atienden al público faciliten intérpretes.",
      "La Ley 29973 fija una cuota de empleo: 5 % en el Estado y 3 % en empresas privadas con más de 50 trabajadores.",
      "Esto es una explicación general, no asesoría legal.",
    ],
    enlaces: [
      { texto: "Leer: lo que dice la ley", href: "/blog/interpretes-de-lsp-lo-que-dice-la-ley" },
      { texto: "Leer: la reforma de la Ley 29535", href: "/blog/reforma-de-la-ley-29535" },
    ],
  },
  {
    id: "emergencia",
    pregunta: "¿Qué hago en una emergencia?",
    claves: ["emergencia", "urgencia", "auxilio", "ayuda urgente", "incendio", "policia", "bombero", "ambulancia", "samu", "robo", "accidente"],
    lineas: [
      "Si estás en peligro, pide ayuda a una persona cercana ahora mismo.",
      "Los números de emergencia del Perú son llamadas de voz: 105 Policía, 116 Bomberos, 106 SAMU. Pide a alguien que llame por ti, o escribe a un familiar o vecino para que llame.",
      "Alerta Visual no reemplaza una alarma de incendio.",
    ],
  },
  {
    id: "cifras",
    pregunta: "¿Cuántas personas tienen pérdida auditiva?",
    claves: ["cuantas", "cifra", "numero de personas", "estadistic", "oms", "millones", "perdida auditiva", "porcentaje"],
    lineas: [
      "Según la Organización Mundial de la Salud, 430 millones de personas en el mundo necesitan rehabilitación por pérdida auditiva: más del 5 % de la población.",
    ],
    enlaces: [{ texto: "Leer: la pérdida auditiva en números", href: "/blog/perdida-auditiva-en-numeros" }],
  },
  {
    id: "dia",
    pregunta: "¿Cuándo es el Día de las Lenguas de Señas?",
    claves: ["dia internacional", "23 de septiembre", "septiembre", "semana internacional", "celebra", "fecha"],
    lineas: [
      "El 23 de septiembre es el Día Internacional de las Lenguas de Señas.",
      "Suele caer en la Semana Internacional de las Personas Sordas, la última semana completa de septiembre.",
    ],
    enlaces: [{ texto: "Leer el artículo", href: "/blog/dia-internacional-de-las-lenguas-de-senas" }],
  },
  {
    id: "blog",
    pregunta: "¿Tienen artículos para leer?",
    claves: ["blog", "articulo", "leer", "noticia", "guia"],
    lineas: ["En el blog hay guías cortas y en español sencillo sobre la comunidad Sorda, la LSP, la ley y las herramientas."],
    enlaces: [{ texto: "Ir al blog", href: "/blog" }],
  },
  {
    id: "puente",
    pregunta: "¿Qué es Puente LSP?",
    claves: ["puente", "quienes son", "que es esto", "que hacen", "sitio", "pagina", "gratis"],
    lineas: [
      "Puente LSP es un sitio peruano con herramientas para la comunidad Sorda:",
      "- Pedir intérprete de LSP por videollamada.",
      "- Alerta Visual y subtítulos en vivo, gratis.",
      "- Trabajos, un directorio de la comunidad y un blog.",
    ],
    enlaces: [{ texto: "Ir al inicio", href: "/" }],
  },
  {
    id: "colaborar",
    pregunta: "¿Cómo puedo colaborar?",
    claves: ["colabor", "ayudar", "apoyar", "voluntari", "sumar", "contacto", "whatsapp", "escribir"],
    lineas: [
      "¡Gracias! Puedes escribirnos por WhatsApp para sumar una organización, contar tu experiencia o revisar los artículos.",
      "Si eres una persona Sorda, tu opinión es lo más valioso: nada sobre nosotros sin nosotros.",
    ],
    enlaces: [{ texto: "Ver la comunidad", href: "/comunidad" }],
  },
];

const SALUDO: Respuesta = {
  id: "saludo",
  pregunta: "Hola",
  claves: [],
  lineas: ["¡Hola! Pregúntame sobre intérpretes de LSP, Alerta Visual, trabajos, cursos o la ley. También puedes tocar una de las preguntas de abajo."],
};

const GRACIAS: Respuesta = {
  id: "gracias",
  pregunta: "Gracias",
  claves: [],
  lineas: ["¡De nada! Si tienes otra pregunta, aquí estoy."],
};

export const NO_ENTIENDO: Respuesta = {
  id: "no-entiendo",
  pregunta: "",
  claves: [],
  lineas: [
    "No tengo una respuesta para eso. Respondo solo sobre los temas de Puente LSP.",
    "Prueba con otras palabras o toca una de estas preguntas.",
  ],
};

// Sin tildes, en minúsculas y sin signos: "¿Intérprete?" → "interprete".
export const normalizar = (t: string) =>
  ` ${t
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9ñ]+/g, " ")
    .trim()} `;

// Cuenta las palabras clave presentes. Una clave debe empezar al inicio de
// una palabra: "red" no debe encontrarse dentro de "acredita".
const puntaje = (texto: string, r: Respuesta) =>
  r.claves.filter((clave) => texto.includes(` ${clave}`)).length;

// En un empate gana el tema más concreto: "aprender lengua de señas" es sobre
// cursos, no sobre qué es la LSP.
const PRIORIDAD = [
  "emergencia", "ser-interprete", "interprete", "empresas", "alerta", "subtitulos",
  "trabajo", "aprender", "senas", "ley", "cifras", "dia", "hablar", "comunidad",
  "lsp", "colaborar", "blog", "puente",
];
const orden = (r: Respuesta) => PRIORIDAD.indexOf(r.id);

export function responder(pregunta: string): { respuesta: Respuesta; relacionadas: Respuesta[] } {
  const texto = normalizar(pregunta);
  const ordenadas = RESPUESTAS.map((r) => ({ r, p: puntaje(texto, r) }))
    .filter((x) => x.p > 0)
    .sort((a, b) => b.p - a.p || orden(a.r) - orden(b.r));

  if (ordenadas.length === 0) {
    if (/ (hola|buenas|buenos|hey|saludos) /.test(texto)) return { respuesta: SALUDO, relacionadas: RESPUESTAS.slice(0, 3) };
    if (/ (gracias|grax|genial|ok|listo) /.test(texto)) return { respuesta: GRACIAS, relacionadas: [] };
    return { respuesta: NO_ENTIENDO, relacionadas: RESPUESTAS.slice(0, 4) };
  }
  return {
    respuesta: ordenadas[0].r,
    relacionadas: ordenadas.slice(1, 3).map((x) => x.r),
  };
}

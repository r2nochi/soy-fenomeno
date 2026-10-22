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
    claves: ["interpret", "videollamada", "cita", "tramite", "traduc", "piloto", "anotar", "solicitud"],
    lineas: [
      "Estamos armando una red de intérpretes de LSP por videollamada. Es un piloto gratuito y aún no hay intérpretes todo el tiempo.",
      "- Te anotas: llenas el formulario o nos escribes por WhatsApp.",
      "- Te escribimos: si hay un intérprete voluntario disponible, coordinamos y te enviamos un enlace.",
      "- Conversas: entras a la videollamada y el intérprete traduce entre LSP y español.",
      "Para emergencias, citas médicas o temas legales, pide un intérprete certificado.",
    ],
    enlaces: [{ texto: "Anotarme en la lista", href: "/interprete" }],
  },
  {
    id: "empresas",
    pregunta: "Tengo una empresa, ¿cómo atiendo a clientes Sordos?",
    claves: ["empresa", "entidad", "negocio", "cliente", "atencion", "precio", "costo", "cuesta", "pago", "plan", "sede"],
    lineas: [
      "Buscamos entidades que quieran probar la atención a clientes Sordos por videollamada.",
      "- Es un piloto gratuito, sin contrato.",
      "- Todavía no ofrecemos un servicio pagado.",
      "Si te interesa, llena el formulario y te escribimos.",
      "También puedes pedir gratis el Sello Puente: un afiche con QR para conversar con clientes Sordos.",
    ],
    enlaces: [
      { texto: "Pedir el sello", href: "/sello" },
      { texto: "Ver el piloto", href: "/interprete" },
    ],
  },
  {
    id: "ser-interprete",
    pregunta: "Soy intérprete, ¿cómo me uno?",
    claves: ["soy interpret", "unir", "trabajar como"],
    lineas: [
      "Súmate como voluntario o voluntaria al piloto de intérpretes de Puente LSP. Atiendes por videollamada desde donde estés. Por ahora no es un trabajo pagado.",
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
    claves: ["subtitul", "transcri", "voz", "dictado", "texto en vivo", "caption"],
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
      "- Para algo importante, busca un intérprete de LSP certificado.",
    ],
    enlaces: [
      { texto: "Leer la guía completa", href: "/blog/como-hablar-con-una-persona-sorda" },
      { texto: "Conversar con el celular", href: "/herramientas/conversacion" },
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
    claves: ["aprend", "curso", "clase", "estudiar", "ensena", "beca"],
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
    claves: ["trabajo", "empleo", "chamba", "convocatoria", "oferta", "postular", "cuota", "laboral", "cv", "puesto", "vacante", "recursos humanos", "rrhh"],
    lineas: [
      "En la página de trabajos tienes empleos de todas las áreas: TI, recursos humanos, administración, salud y más.",
      "- Portales con ofertas para personas con discapacidad, como Inclúyeme y Computrabajo.",
      "- Ofertas exclusivas en Empleos Perú.",
      "- Convocatorias del Estado por área. Por ley, con discapacidad recibes 15 % más de puntaje.",
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
      { texto: "Armar una carta para pedir intérprete", href: "/herramientas/carta" },
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
    enlaces: [{ texto: "Hacer mi tarjeta de emergencia", href: "/herramientas/tarjeta" }],
  },
  {
    id: "conversacion",
    pregunta: "¿Cómo converso con alguien que no sabe LSP?",
    claves: ["conversacion", "conversar con", "cara a cara", "mostrador", "ventanilla", "no sabe lsp", "no sabe senas", "escribir en el celular", "pantalla partida"],
    lineas: [
      "Usa la conversación cara a cara: pones el celular en la mesa, entre las dos personas.",
      "- Tú escribes o tocas una frase lista, y la otra persona la lee en grande.",
      "- La otra persona habla, y su voz aparece en texto para ti.",
      "Es gratis. Funciona mejor en Chrome o Edge.",
    ],
    enlaces: [{ texto: "Abrir la conversación", href: "/herramientas/conversacion" }],
  },
  {
    id: "tarjeta",
    pregunta: "¿Cómo hago mi tarjeta de emergencia?",
    claves: ["tarjeta de emergencia", "mi tarjeta de emergencia", "hacer mi tarjeta", "carne de emergencia", "contacto de emergencia", "tipo de sangre"],
    lineas: [
      "Con Mi tarjeta de emergencia muestras en un toque que eres Sordo/a, cómo comunicarse contigo y a quién llamar.",
      "Tus datos se guardan solo en tu celular. Ábrela una vez con internet y luego funciona sin señal.",
      "En una emergencia, los números del Perú son 105 Policía, 116 Bomberos y 106 SAMU (solo en algunas regiones).",
    ],
    enlaces: [{ texto: "Hacer mi tarjeta", href: "/herramientas/tarjeta" }],
  },
  {
    id: "carta",
    pregunta: "¿Cómo pido un intérprete a una entidad?",
    claves: ["carta", "pedir interprete", "pido un interprete a", "solicitar interprete", "a una entidad", "exigir interprete"],
    lineas: [
      "Puedes armar una carta formal para pedir un intérprete de LSP a un hospital, municipalidad, comisaría u otra entidad.",
      "La carta cita la ley. Luego la copias, la imprimes o la envías por WhatsApp o correo.",
      "Es un modelo: no reemplaza la asesoría de un abogado.",
    ],
    enlaces: [{ texto: "Armar mi carta", href: "/herramientas/carta" }],
  },
  {
    id: "lugares",
    pregunta: "¿Dónde atienden bien a personas Sordas?",
    claves: ["lugares accesibles", "lugar accesible", "donde atienden", "atienden bien", "recomendar un lugar", "recomienda un lugar"],
    lineas: [
      "En Lugares accesibles la comunidad cuenta dónde la atendieron bien: personal que sabe LSP, intérprete o paciencia para escribir.",
      "Tú también puedes recomendar un lugar. Lo revisamos antes de publicarlo.",
    ],
    enlaces: [{ texto: "Ver lugares", href: "/lugares" }],
  },
  {
    id: "sello",
    pregunta: "¿Qué es el Sello Puente?",
    claves: ["sello", "afiche", "qr", "codigo qr", "distintivo"],
    lineas: [
      "El Sello Puente es gratis para negocios y entidades. Recibes un afiche con un código QR para tu mostrador.",
      "El cliente Sordo escanea el QR y conversa con tu equipo desde su celular, con frases de tu rubro.",
      "Es un compromiso de buena atención, no una certificación oficial.",
    ],
    enlaces: [{ texto: "Pedir el sello", href: "/sello" }],
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
      "- Un piloto de intérpretes de LSP por videollamada.",
      "- Conversación cara a cara, tarjeta de emergencia y una carta para pedir intérprete.",
      "- Un mapa de lugares que atienden bien y un sello gratis para negocios.",
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

// Preguntas que se ofrecen al abrir el panel o cuando no hay respuesta.
export const SUGERIDAS = ["interprete", "hablar", "alerta", "trabajo"].map(
  (id) => RESPUESTAS.find((r) => r.id === id)!,
);

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
  "emergencia", "tarjeta", "ser-interprete", "carta", "interprete", "empresas",
  "alerta", "subtitulos", "trabajo", "aprender", "sello", "conversacion", "lugares", "senas", "ley", "cifras", "dia", "hablar", "comunidad",
  "lsp", "colaborar", "blog", "puente",
];
const orden = (r: Respuesta) => PRIORIDAD.indexOf(r.id);

export function responder(pregunta: string): { respuesta: Respuesta; relacionadas: Respuesta[] } {
  const texto = normalizar(pregunta);
  // Quien busca trabajo nombra áreas ("atención al cliente") que también son
  // claves de empresas; si habla de trabajo, eso pesa más.
  const ordenadas = RESPUESTAS.map((r) => ({ r, p: puntaje(texto, r) * (r.id === "trabajo" ? 3 : 1) }))
    .filter((x) => x.p > 0)
    .sort((a, b) => b.p - a.p || orden(a.r) - orden(b.r));

  if (ordenadas.length === 0) {
    if (/ (hola|buenas|buenos|hey|saludos) /.test(texto)) return { respuesta: SALUDO, relacionadas: SUGERIDAS };
    if (/ (gracias|grax|genial|ok|listo) /.test(texto)) return { respuesta: GRACIAS, relacionadas: [] };
    return { respuesta: NO_ENTIENDO, relacionadas: SUGERIDAS };
  }
  return {
    respuesta: ordenadas[0].r,
    relacionadas: ordenadas.slice(1, 3).map((x) => x.r),
  };
}

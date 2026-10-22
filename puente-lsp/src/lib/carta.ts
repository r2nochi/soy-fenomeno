// Generador de la carta "Pide tu intérprete". Función pura: no usa red, ni
// almacenamiento, ni la fecha de hoy (se pasa como parámetro). Las citas
// legales se verificaron en el texto de El Peruano (ver FUENTES).

export const TIPOS_ENTIDAD = [
  { valor: "salud", texto: "Hospital, centro de salud, EsSalud o MINSA" },
  { valor: "municipalidad", texto: "Municipalidad" },
  { valor: "justicia", texto: "Comisaría, fiscalía o juzgado" },
  { valor: "educacion", texto: "Universidad o colegio" },
  { valor: "banco", texto: "Banco o financiera" },
  { valor: "privada", texto: "Empresa privada" },
  { valor: "otra_publica", texto: "Otra entidad pública" },
] as const;

export type TipoEntidad = (typeof TIPOS_ENTIDAD)[number]["valor"];

export const NECESIDADES = [
  { valor: "presencial", texto: "Intérprete de LSP presencial" },
  { valor: "videollamada", texto: "Intérprete de LSP por videollamada" },
  { valor: "otra", texto: "Otra forma de comunicación accesible" },
] as const;

export type Necesidad = (typeof NECESIDADES)[number]["valor"];

export type DatosCarta = {
  nombre: string;
  dni: string;
  conadis: string;
  tipoEntidad: TipoEntidad | "";
  nombreEntidad: string;
  fecha: string; // YYYY-MM-DD
  hora: string; // HH:MM, opcional
  necesidad: Necesidad | "";
  otraForma: string;
  contacto: string;
};

export type CampoCarta = keyof DatosCarta;

export type Carta = {
  fecha: string;
  asunto: string;
  saludo: string;
  parrafos: string[];
  despedida: string[];
  texto: string;
};

export const FUENTES = [
  {
    texto: "Ley N.° 29535, Ley que otorga reconocimiento oficial a la lengua de señas peruana (El Peruano, 21/05/2010): artículos 1, 2, 4 y 6",
    url: "https://busquedas.elperuano.pe/dispositivo/NL/496850-3",
  },
  {
    texto: "Ley N.° 31707, que modifica el artículo 21 de la Ley N.° 29973 (El Peruano, 11/03/2023)",
    url: "https://busquedas.elperuano.pe/normaslegales/ley-que-modifica-la-ley-29973-ley-general-de-la-persona-con-ley-n-31707-2159487-3/",
  },
  {
    texto: "Ley N.° 29973, Ley General de la Persona con Discapacidad (texto original, PDF del Congreso)",
    url: "https://www.leyes.congreso.gob.pe/Documentos/Leyes/29973.pdf",
  },
  {
    texto: "CONADIS: dónde presentar una queja o denuncia por discriminación",
    url: "https://www.gob.pe/conadis",
  },
  {
    texto: "Defensoría del Pueblo: quejas y denuncias",
    url: "https://www.defensoria.gob.pe/",
  },
] as const;

const MESES = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
];

const RE_FECHA = /^(\d{4})-(\d{2})-(\d{2})$/;
const RE_HORA = /^([01]\d|2[0-3]):[0-5]\d$/;

// Acepta solo fechas reales. Se separa el texto sin usar Date para evitar
// desfases por zona horaria.
function partesFecha(iso: string): { y: number; m: number; d: number } | null {
  const r = RE_FECHA.exec(iso);
  if (!r) return null;
  const y = Number(r[1]);
  const m = Number(r[2]);
  const d = Number(r[3]);
  if (m < 1 || m > 12 || d < 1) return null;
  const diasEnMes = new Date(Date.UTC(y, m, 0)).getUTCDate();
  if (d > diasEnMes) return null;
  return { y, m, d };
}

export function fechaLarga(iso: string): string {
  const p = partesFecha(iso);
  if (!p) return "";
  return `${p.d} de ${MESES[p.m - 1]} de ${p.y}`;
}

export function datosVacios(): DatosCarta {
  return {
    nombre: "",
    dni: "",
    conadis: "",
    tipoEntidad: "",
    nombreEntidad: "",
    fecha: "",
    hora: "",
    necesidad: "",
    otraForma: "",
    contacto: "",
  };
}

// Devuelve un mensaje por campo con error. Los campos opcionales vacíos no dan error.
export function validarDatos(d: DatosCarta): Partial<Record<CampoCarta, string>> {
  const e: Partial<Record<CampoCarta, string>> = {};
  const nombre = d.nombre.trim();
  if (nombre.length < 3) e.nombre = "Escribe tu nombre completo.";
  if (d.dni.trim() && !/^\d{8}$/.test(d.dni.trim())) e.dni = "El DNI tiene 8 números.";
  if (d.conadis.trim().length > 30) e.conadis = "El carné CONADIS es muy largo.";
  if (!TIPOS_ENTIDAD.some((t) => t.valor === d.tipoEntidad)) e.tipoEntidad = "Elige un tipo de entidad.";
  if (d.nombreEntidad.trim().length < 2) e.nombreEntidad = "Escribe el nombre de la entidad.";
  if (d.nombreEntidad.trim().length > 120) e.nombreEntidad = "El nombre es muy largo.";
  if (!partesFecha(d.fecha)) e.fecha = "Elige una fecha válida.";
  if (d.hora.trim() && !RE_HORA.test(d.hora.trim())) e.hora = "La hora tiene el formato 10:30.";
  if (!NECESIDADES.some((n) => n.valor === d.necesidad)) e.necesidad = "Elige qué necesitas.";
  if (d.necesidad === "otra" && d.otraForma.trim().length < 3) {
    e.otraForma = "Escribe qué forma de comunicación necesitas.";
  }
  if (d.contacto.trim().length < 6) e.contacto = "Escribe un número de WhatsApp o un correo.";
  return e;
}

// Artículo 4 de la Ley 29535, citado textualmente (texto verificado en El Peruano; ver FUENTES).
// Aplica a todas las entidades que atienden al público, públicas o privadas. Las privadas se
// piden, no se obligan, en la frase de pedido de cada carta. La explicación en lenguaje sencillo
// no va en la carta: está en la página, aparte.
const ART4 =
  "El artículo 4 de la Ley N.° 29535 (texto publicado en El Peruano el 21 de mayo de 2010) dice: «Las entidades e instituciones públicas o privadas que brinden servicios públicos o de atención al público proveen a las personas usuarias con discapacidad auditiva, de manera gratuita y en forma progresiva y según lo establezca el reglamento, el servicio de intérprete para sordos cuando éstos lo requieran.»";

const ART21_1 =
  "El artículo 21.1 de la Ley N.° 29973 dice que el Estado garantiza a las personas con discapacidad la libertad de elegir los medios de comunicación que usan.";

const ART21_2 =
  "Si el trámite es un proceso judicial o un procedimiento administrativo, el artículo 21.2 de la Ley N.° 29973 reconoce el derecho a usar la lengua de señas en ese procedimiento, con intérprete gratuito de forma progresiva.";

const ART21_3 =
  "El artículo 21.3 de la Ley N.° 29973 dice que las entidades bancarias y financieras entregan información, recibos y estados de cuenta en formatos accesibles cuando la persona con discapacidad lo pide.";

// Párrafo legal según el tipo de entidad. Solo cita artículos verificados.
function parrafoLegal(tipo: TipoEntidad): string {
  switch (tipo) {
    case "salud":
    case "otra_publica":
      return `${ART4} ${ART21_1}`;
    case "municipalidad":
    case "justicia":
      return `${ART4} ${ART21_2}`;
    case "educacion":
      return `${ART4} ${ART21_1}`;
    case "banco":
      return `${ART21_3} ${ART4}`;
    case "privada":
      return ART4;
  }
}

function textoNecesidad(d: DatosCarta): string {
  if (d.necesidad === "presencial") return "un intérprete de LSP presencial";
  if (d.necesidad === "videollamada") return "un intérprete de LSP por videollamada";
  return `otra forma de comunicación accesible: ${d.otraForma.trim()}`;
}

// Arma la carta a partir de los datos. hoy es la fecha de la carta (YYYY-MM-DD).
export function armarCarta(d: DatosCarta, hoy: string): Carta {
  const tipo: TipoEntidad = TIPOS_ENTIDAD.some((t) => t.valor === d.tipoEntidad)
    ? (d.tipoEntidad as TipoEntidad)
    : "otra_publica";
  const nombre = d.nombre.trim();
  const entidad = d.nombreEntidad.trim();
  const dni = d.dni.trim();
  const conadis = d.conadis.trim();
  const hora = d.hora.trim();
  const fechaCita = fechaLarga(d.fecha);

  const identificacion = [
    dni ? `, con DNI N.° ${dni}` : "",
    conadis ? `, con carné del CONADIS N.° ${conadis}` : "",
  ].join("");

  const parrafos = [
    d.necesidad === "otra"
      ? `Yo, ${nombre}${identificacion}, soy una persona Sorda.`
      : `Yo, ${nombre}${identificacion}, soy una persona Sorda y me comunico en Lengua de Señas Peruana (LSP).`,
    parrafoLegal(tipo),
    `Necesito ${textoNecesidad(d)} para mi cita o trámite el ${fechaCita}${hora ? ` a las ${hora}` : ""}.`,
    d.necesidad === "otra"
      ? `Por favor, confírmenme que recibieron esta solicitud y cómo podemos coordinar esa forma de comunicación. Si no es posible para esa fecha, les pido decirme qué otra forma accesible puede usar la entidad.`
      : `Por favor, confírmenme que recibieron esta solicitud y cómo podemos coordinar el intérprete. Si no es posible un intérprete para esa fecha, les pido decirme qué otra forma accesible puede usar la entidad.`,
  ];

  const despedida = [
    "Gracias por su atención.",
    "Atentamente,",
    nombre,
    ...(dni ? [`DNI: ${dni}`] : []),
    ...(conadis ? [`Carné CONADIS: ${conadis}`] : []),
    `Contacto: ${d.contacto.trim()}`,
  ];

  const saludo = `Señores de ${entidad}:`;
  const asunto =
    d.necesidad === "otra"
      ? `Solicitud de comunicación accesible para el ${fechaCita}`
      : `Solicitud de intérprete de Lengua de Señas Peruana (LSP) para el ${fechaCita}`;
  const fecha = fechaLarga(hoy);

  const texto = [fecha, asunto, saludo, ...parrafos, despedida.join("\n")].join("\n\n");

  return { fecha, asunto, saludo, parrafos, despedida, texto };
}

export function enlaceWhatsapp(texto: string): string {
  // Sin número: la persona elige a quién enviarla en WhatsApp.
  return `https://wa.me/?text=${encodeURIComponent(texto)}`;
}

export function enlaceCorreo(asunto: string, texto: string): string {
  return `mailto:?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(texto)}`;
}

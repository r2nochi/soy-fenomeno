// Derechos y beneficios de las personas Sordas, por país y categoría.
// Reglas: cada dato sale de una norma o de una página oficial, con su enlace;
// si algo no se pudo confirmar va en `atencion`, nunca como un hecho. Un error
// aquí le hace daño real a alguien que va a reclamar un derecho.
// Solo se publican los países y categorías que ya tienen contenido.

export const PAISES_DERECHOS = [
  {
    slug: "peru",
    nombre: "Perú",
    aviso:
      "Los enlaces a la Ley 29973 llevan a su texto original de 2012, y algunos artículos cambiaron después. Antes de un trámite importante, confirma en la entidad o en el Conadis.",
  },
  {
    slug: "colombia",
    nombre: "Colombia",
    aviso:
      "Tu ciudad puede tener beneficios propios. Antes de un trámite importante, confirma en la entidad que corresponde.",
  },
  {
    slug: "chile",
    nombre: "Chile",
    aviso: "Antes de un trámite importante, confirma en la entidad, en ChileAtiende o en el Senadis.",
  },
  {
    slug: "mexico",
    nombre: "México",
    aviso:
      "Usamos la Ley General para la Inclusión con su reforma del 14 de junio de 2024. Cada estado puede tener reglas propias: antes de un trámite importante, confirma en el DIF de tu estado.",
  },
  {
    slug: "argentina",
    nombre: "Argentina",
    aviso:
      "Cada provincia puede tener reglas propias. Antes de un trámite importante, confirma en la entidad o en la Secretaría Nacional de Discapacidad.",
  },
] as const;

export const CATEGORIAS = [
  { slug: "tramites", nombre: "Trámites" },
  { slug: "comunicacion", nombre: "Intérprete y comunicación" },
  { slug: "salud", nombre: "Salud" },
  { slug: "transporte", nombre: "Transporte" },
  { slug: "educacion", nombre: "Educación" },
  { slug: "trabajo", nombre: "Trabajo" },
  { slug: "descuentos", nombre: "Descuentos" },
  { slug: "ayuda-economica", nombre: "Ayuda económica" },
] as const;

export type PaisDerechos = (typeof PAISES_DERECHOS)[number]["slug"];
export type Categoria = (typeof CATEGORIAS)[number]["slug"];

// El resumen cambia por país: lo que hay en cada categoría no es igual.
const RESUMENES: Record<PaisDerechos, Partial<Record<Categoria, string>>> = {
  peru: {
    tramites: "El certificado y el carné que piden para casi todo.",
    comunicacion: "Intérprete en trámites y televisión accesible.",
    salud: "Atención y seguro de salud.",
    transporte: "Pase libre con discapacidad severa y asientos reservados.",
    educacion: "Vacantes reservadas y lengua de señas.",
    trabajo: "Cuota de empleo y puntos extra en concursos.",
    descuentos: "Entradas a espectáculos a menor precio.",
    "ayuda-economica": "Pensión Contigo, para discapacidad severa y pobreza.",
  },
  colombia: {
    tramites: "El certificado de discapacidad, sin costo y en tu municipio.",
    comunicacion: "Intérprete en entidades, Centro de Relevo y televisión.",
    salud: "Atención accesible e intérprete en clínicas y hospitales.",
    transporte: "Transporte accesible y asistencia en terminales.",
    educacion: "Interpretación en clase y en el SENA.",
    trabajo: "Cuota de empleo, protección contra el despido y ajustes.",
  },
  chile: {
    tramites: "Certificación de la COMPIN, credencial y cómo reclamar.",
    comunicacion: "Intérprete, lengua oficial y televisión accesible.",
    salud: "Atención preferente e información que entiendas.",
    transporte: "Viajar sin requisitos especiales.",
    educacion: "Lengua de señas como primera lengua.",
    trabajo: "Cuota de 1 % en empresas con 100 o más trabajadores y en el Estado.",
    "ayuda-economica": "Pensión de invalidez y subsidio para menores.",
  },
  mexico: {
    tramites: "Certificado de discapacidad y Credencial Nacional.",
    comunicacion: "Lengua nacional, intérprete en justicia e información accesible.",
    salud: "Salud y rehabilitación sin discriminación.",
    transporte: "Accesibilidad y descuentos por convenio.",
    educacion: "Intérpretes y enseñanza de la Lengua de Señas Mexicana.",
    trabajo: "Empleo sin discriminación.",
    descuentos: "Descuentos con la Credencial Nacional.",
    "ayuda-economica": "Pensión Bienestar para discapacidad permanente.",
  },
  argentina: {
    tramites: "El CUD, sin costo y válido en todo el país.",
    comunicacion: "Reconocimiento de la LSA y televisión accesible.",
    salud: "Cobertura de prestaciones y de audífonos.",
    transporte: "Viaje gratis con el CUD en transporte nacional.",
    educacion: "Interpretación en los exámenes de educación superior.",
    trabajo: "Cupo de 4 % en el Estado.",
    "ayuda-economica": "Pensión no contributiva por discapacidad.",
  },
};

export type Beneficio = {
  id: string;
  pais: PaisDerechos;
  categoria: Categoria;
  titulo: string;
  que: string;
  quien: string;
  como?: string;
  // Lo que falta confirmar o la letra chica que puede cambiar el resultado.
  atencion?: string;
  fuentes: { texto: string; url: string }[];
};

// AAAA-MM-DD: última vez que se revisaron las fuentes de esta página.
export const REVISADO = "2026-11-08";

const LEY_29973 = "https://diariooficial.elperuano.pe/Normas/obtenerDocumento?idNorma=90011";
const LEY_29535 = "https://busquedas.elperuano.pe/dispositivo/NL/496850-3";
const REGLAMENTO_29535 =
  "https://www.conadisperu.gob.pe/wp-content/uploads/2017/08/REGLAMENTO-DE-LA-LEY-DE-LENGUA-DE-SE%C3%91AS-29535.pdf";

const NORMOGRAMA = "https://normograma.mintic.gov.co/mintic/compilacion/docs";
const CO_LEY_982 = `${NORMOGRAMA}/ley_0982_2005.htm`;
const CO_LEY_361 = `${NORMOGRAMA}/ley_0361_1997.htm`;
const CO_LEY_1618 = "https://www.alcaldiabogota.gov.co/sisjur/normas/Norma1.jsp?i=52081";
const CO_LEY_2466 = `${NORMOGRAMA}/ley_2466_2025.htm`;

const CL_LEY_20422 = "https://www.bcn.cl/leychile/navegar?idNorma=1010903";
const CL_LEY_20584 = "https://www.bcn.cl/leychile/navegar?idNorma=1039348";
const CL_LEY_21015 = "https://www.bcn.cl/leychile/navegar?idNorma=1103997";

const MX_LEY_INCLUSION = "https://www.gob.mx/cms/uploads/attachment/file/932753/7._LGIPD.pdf";

const AR_LEY_22431 = "https://servicios.infoleg.gob.ar/infolegInternet/anexos/20000-24999/20620/texact.htm";

export const BENEFICIOS: Beneficio[] = [
  {
    id: "certificado-de-discapacidad",
    pais: "peru",
    categoria: "tramites",
    titulo: "Certificado de discapacidad",
    que: "Es el documento médico que dice que tienes una discapacidad y de qué grado: leve, moderada o severa. Es gratis.",
    quien: "Cualquier persona con discapacidad.",
    como: "Pídelo en un hospital o centro de salud que tenga médico certificador.",
    atencion: "El grado que diga tu certificado decide a qué beneficios puedes entrar. Algunos son solo para discapacidad severa. Si vas a un centro privado, pregunta antes si te cobran: no pudimos confirmar el costo allí.",
    fuentes: [{ texto: "Ley 29973 (texto de 2012), artículo 76", url: LEY_29973 }],
  },
  {
    id: "carne-conadis",
    pais: "peru",
    categoria: "tramites",
    titulo: "Carné del Conadis",
    que: "Es la prueba de que estás en el Registro Nacional de la Persona con Discapacidad. Inscribirte es gratis. El carné celeste es para discapacidad leve o moderada, y el amarillo para severa.",
    quien: "Personas que ya tienen su certificado de discapacidad.",
    como: "Hazlo en línea en la plataforma del Conadis o en sus oficinas. Necesitas tu certificado.",
    fuentes: [
      { texto: "Trámite en gob.pe", url: "https://www.gob.pe/465-obtener-carnet-de-inscripcion-en-el-registro-del-conadis" },
      { texto: "Ley 29973 (texto de 2012), artículo 78", url: LEY_29973 },
    ],
  },
  {
    id: "interprete-en-tramites",
    pais: "peru",
    categoria: "comunicacion",
    titulo: "Intérprete gratis en trámites públicos y juicios",
    que: "Tienes derecho a usar lengua de señas en procesos judiciales y en trámites con el Estado y con empresas de servicios públicos. La ley dice que deben darte intérprete gratis, de forma progresiva.",
    quien: "Personas Sordas y con discapacidad auditiva.",
    como: "Pide el intérprete a la entidad. Puedes mostrar tu certificado, tu carné, tu DNI o una declaración jurada.",
    atencion: "«Progresiva» significa que algunas entidades todavía no lo tienen. Puede ser por videollamada. El Congreso aprobó una reforma de la Ley 29535 y no pudimos confirmar si ya está vigente.",
    fuentes: [
      { texto: "Ley 29973 (texto de 2012), artículo 21", url: LEY_29973 },
      { texto: "Ley 29535", url: LEY_29535 },
      { texto: "Reglamento de la Ley 29535", url: REGLAMENTO_29535 },
    ],
  },
  {
    id: "television-accesible",
    pais: "peru",
    categoria: "comunicacion",
    titulo: "Televisión con intérprete o subtítulos",
    que: "Desde la Ley 32724, los canales de señal abierta y de cable deben dar acceso con intérprete de lengua de señas peruana o subtítulos ocultos, de forma continua. Incluye noticieros, mensajes oficiales, emergencias y debates electorales.",
    quien: "Toda persona que los necesite.",
    atencion: "No encontramos el reglamento de esta ley, así que no sabemos cómo se aplicará. Según un resumen, pide intérpretes certificados e inscritos en el Conadis; revisa el texto de la ley.",
    fuentes: [{ texto: "Ley 32724 en El Peruano", url: "https://busquedas.elperuano.pe/dispositivo/NL/2533576-3" }],
  },
  {
    id: "derecho-a-la-salud",
    pais: "peru",
    categoria: "salud",
    titulo: "Salud sin discriminación y acceso a un seguro",
    que: "Tienes derecho a atención de salud de calidad, incluida la rehabilitación y la salud sexual y reproductiva. El Estado debe promover tu ingreso a un seguro de salud.",
    quien: "Toda persona con discapacidad.",
    fuentes: [{ texto: "Ley 29973 (texto de 2012), artículos 26 y 27", url: LEY_29973 }],
  },
  {
    id: "pase-libre",
    pais: "peru",
    categoria: "transporte",
    titulo: "Pase libre en transporte público",
    que: "Viajas gratis en el transporte público terrestre. La ley dice «urbano e interurbano».",
    quien: "Personas con discapacidad severa inscritas en el Conadis (carné amarillo).",
    como: "Muestra tu carné amarillo. En el Metropolitano y los corredores de Lima se pide una tarjeta de pase libre.",
    atencion: "En setiembre de 2024 el Congreso aprobó extender el pase libre a la discapacidad moderada, pero no pudimos confirmar que esa ley esté vigente. La ley tampoco nombra los buses interprovinciales. Pregunta en el Conadis antes de viajar.",
    fuentes: [
      { texto: "Ley 30412", url: "https://busquedas.elperuano.pe/dispositivo/NL/1333663-1" },
      { texto: "Aviso del Conadis", url: "https://www.gob.pe/institucion/conadis/noticias/23207-pase-libre-en-el-transporte-publico-para-personas-con-discapacidad-severa" },
      { texto: "Votación de 2024", url: "https://comunicaciones.congreso.gob.pe/noticias/amplian-beneficio-del-pase-libre-en-transporte-publico-a-personas-con-discapacidad-moderada/" },
    ],
  },
  {
    id: "asientos-reservados",
    pais: "peru",
    categoria: "transporte",
    titulo: "Asientos reservados y derecho a que te lleven",
    que: "Los vehículos de transporte público deben reservar asientos señalizados para personas con discapacidad. Negarse a llevarte por tu discapacidad es una infracción.",
    quien: "Toda persona con discapacidad.",
    fuentes: [{ texto: "Ley 29973 (texto de 2012), artículos 20 y 81", url: LEY_29973 }],
  },
  {
    id: "vacantes-educacion-superior",
    pais: "peru",
    categoria: "educacion",
    titulo: "5 % de vacantes en universidades e institutos",
    que: "Universidades, institutos y escuelas superiores, públicos y privados, reservan el 5 % de sus vacantes. También deben adaptar el examen de admisión.",
    quien: "Personas con discapacidad que aprueben la evaluación de ingreso.",
    como: "Se acredita con tu certificado o tu carné del Conadis.",
    atencion: "La Ley 31789 modificó este artículo y no pudimos leer la versión vigente. Un documento oficial reciente sigue indicando el 5 %. Confirma las condiciones con cada institución.",
    fuentes: [
      { texto: "Ley 29973 (texto de 2012), artículo 38", url: LEY_29973 },
      { texto: "Ley 31789", url: "https://busquedas.elperuano.pe/dispositivo/NL/2187846-1" },
    ],
  },
  {
    id: "lengua-de-senas-en-colegios",
    pais: "peru",
    categoria: "educacion",
    titulo: "Lengua de señas en la educación",
    que: "El Ministerio de Educación y los gobiernos regionales y locales deben promover y garantizar el aprendizaje de la lengua de señas en los colegios.",
    quien: "Estudiantes Sordos.",
    fuentes: [{ texto: "Ley 29973 (texto de 2012), artículo 36", url: LEY_29973 }],
  },
  {
    id: "cuota-de-empleo",
    pais: "peru",
    categoria: "trabajo",
    titulo: "Cuota de empleo",
    que: "Las entidades públicas deben tener al menos 5 % de trabajadores con discapacidad. Las empresas privadas con más de 50 trabajadores, al menos 3 %.",
    quien: "Personas con discapacidad que buscan trabajo.",
    atencion: "La ley existe, pero muchas entidades no la cumplen: según el Conadis, en 2023 solo nueve entidades públicas llegaron al 5 %.",
    fuentes: [
      { texto: "Ley 29973 (texto de 2012), artículo 49", url: LEY_29973 },
      { texto: "Conadis, cifras de 2023", url: "https://www.gob.pe/institucion/conadis/noticias/912374-en-el-2023-solo-nueve-entidades-publicas-cumplieron-con-la-cuota-laboral-de-personas-con-discapacidad" },
    ],
  },
  {
    id: "bonificacion-concursos",
    pais: "peru",
    categoria: "trabajo",
    titulo: "15 % más de puntaje en concursos del Estado",
    que: "En los concursos públicos de méritos recibes 15 % extra sobre tu puntaje final.",
    quien: "Personas con discapacidad que cumplan los requisitos del puesto y aprueben.",
    como: "Se acredita con tu certificado o tu carné del Conadis.",
    fuentes: [{ texto: "Ley 29973 (texto de 2012), artículo 48", url: LEY_29973 }],
  },
  {
    id: "descuento-espectaculos",
    pais: "peru",
    categoria: "descuentos",
    titulo: "Descuento en entradas a espectáculos",
    que: "50 % de descuento en espectáculos culturales, deportivos y recreativos del Estado. 20 % en los de empresas privadas.",
    quien: "Personas con discapacidad acreditadas.",
    como: "La ley pide estar acreditado: lleva tu carné o certificado.",
    atencion: "Hay un límite: el descuento cubre hasta 25 % de las entradas en eventos del Estado y hasta 10 % en privados, así que pueden agotarse. Esta norma no cubre tiendas ni restaurantes.",
    fuentes: [{ texto: "Ley 29973 (texto de 2012), artículo 44", url: LEY_29973 }],
  },
  {
    id: "pension-contigo",
    pais: "peru",
    categoria: "ayuda-economica",
    titulo: "Pensión Contigo",
    que: "Es una pensión del Estado de S/ 300 cada dos meses.",
    quien: "Personas con certificado de discapacidad severa, en situación de pobreza según el Sisfoh y que no reciban otra pensión o ingreso público o privado.",
    como: "Pregunta en la OMAPED de tu municipalidad. Se presenta el formato PC-1000 con una copia del certificado. El trámite es gratis.",
    atencion: "La afiliación no es automática: depende de los requisitos y del presupuesto del programa.",
    fuentes: [
      { texto: "Programa Contigo en gob.pe", url: "https://www.gob.pe/808-pension-del-programa-contigo-para-personas-con-discapacidad-severa-y-situacion-de-pobreza" },
      { texto: "Ley 29973 (texto de 2012), artículo 59", url: LEY_29973 },
    ],
  },

  // Colombia
  {
    id: "co-certificado-de-discapacidad",
    pais: "colombia",
    categoria: "tramites",
    titulo: "Certificado de discapacidad",
    que: "Es el documento que certifica tu discapacidad. La norma dice que no tiene costo para quien lo pide.",
    quien: "Personas con discapacidad que viven en Colombia.",
    como: "Pídelo en la secretaría de salud de tu distrito o municipio. Lleva una copia de tu historia clínica con el diagnóstico y sus exámenes.",
    atencion: "Pregunta antes si los exámenes o informes médicos que te piden tienen costo. El certificado se actualiza cuando un menor cumple 6 o 18 años, o cuando el médico indica cambios. Algunas páginas todavía citan la Resolución 1239 de 2022, que fue reemplazada por la 1197 de 2024.",
    fuentes: [{ texto: "Resolución 1197 de 2024, artículos 3, 7 y 12", url: `${NORMOGRAMA}/resolucion_minsaludps_1197_2024.htm` }],
  },
  {
    id: "co-interprete-en-entidades",
    pais: "colombia",
    categoria: "comunicacion",
    titulo: "Intérprete en entidades y servicios públicos",
    que: "El Estado debe garantizar intérpretes de lengua de señas. Las entidades públicas, las empresas de servicios públicos, las clínicas y hospitales (IPS) y las bibliotecas públicas deben incorporar este servicio poco a poco y avisar dónde está. Cuando una autoridad judicial te requiere, debe haber interpretación.",
    quien: "Personas Sordas y sordociegas.",
    como: "Pide el intérprete a la entidad antes de tu cita.",
    atencion: "Como es poco a poco, algunas entidades todavía no lo tienen.",
    fuentes: [{ texto: "Ley 982 de 2005, artículos 4, 7 y 8", url: CO_LEY_982 }],
  },
  {
    id: "co-centro-de-relevo",
    pais: "colombia",
    categoria: "comunicacion",
    titulo: "Centro de Relevo",
    que: "Es un programa del Ministerio TIC y de FENASCOL. Con su servicio de interpretación en línea pides un intérprete de lengua de señas colombiana desde el teléfono o la tableta. El Ministerio dice que es gratis.",
    quien: "Personas Sordas y las personas oyentes que se comunican con ellas.",
    atencion: "Los avisos oficiales que encontramos son antiguos y no pudimos confirmar cómo funciona hoy. Revisa la web de FENASCOL. Si te piden dinero, confirma con FENASCOL antes de pagar.",
    fuentes: [
      { texto: "Aviso del Ministerio TIC", url: "https://mintic.gov.co/portal/inicio/Sala-de-prensa/Noticias/80648:Que-no-lo-enganen-Centro-de-Relevo-no-cobra-por-ninguno-de-sus-servicios" },
      { texto: "Centro de Relevo en FENASCOL", url: "https://fenascol.org.co/centro-de-relevo/" },
    ],
  },
  {
    id: "co-television",
    pais: "colombia",
    categoria: "comunicacion",
    titulo: "Televisión con intérprete o subtítulos",
    que: "La ley ordena al Estado poner intérpretes de lengua de señas y subtítulos en la televisión abierta nacional. Los anuncios de servicio público en canales estatales deben llevar alguno de estos apoyos.",
    quien: "Toda persona que los necesite.",
    atencion: "No revisamos las reglas de la autoridad de televisión, que fijan los detalles de cada canal.",
    fuentes: [
      { texto: "Ley 982 de 2005, artículos 13 y 16", url: CO_LEY_982 },
      { texto: "Ley 1618 de 2013, artículo 16", url: CO_LEY_1618 },
    ],
  },
  {
    id: "co-salud",
    pais: "colombia",
    categoria: "salud",
    titulo: "Salud accesible e intérprete en las IPS",
    que: "Las entidades de salud deben garantizar tu accesibilidad e inclusión en todos sus procedimientos, lugares y servicios. Las clínicas y hospitales (IPS) deben incorporar poco a poco el servicio de intérprete.",
    quien: "Personas con discapacidad. El intérprete, para personas Sordas y sordociegas.",
    fuentes: [
      { texto: "Ley 1618 de 2013, artículo 10", url: CO_LEY_1618 },
      { texto: "Ley 982 de 2005, artículo 8", url: CO_LEY_982 },
    ],
  },
  {
    id: "co-transporte",
    pais: "colombia",
    categoria: "transporte",
    titulo: "Transporte accesible",
    que: "El transporte público debe ser accesible para todas las personas con discapacidad. Los aeropuertos y las terminales deben tener un servicio de guía y asistencia.",
    quien: "Personas con discapacidad.",
    atencion: "En estas normas no encontramos un pase gratis para todo el país. Pregunta en tu alcaldía si hay un subsidio local.",
    fuentes: [{ texto: "Ley 1618 de 2013, artículos 14 y 15", url: CO_LEY_1618 }],
  },
  {
    id: "co-educacion",
    pais: "colombia",
    categoria: "educacion",
    titulo: "Interpretación en la educación",
    que: "Las entidades territoriales deben garantizar el servicio de interpretación a estudiantes Sordos y sordociegos. El Gobierno debe promover una educación bilingüe de calidad.",
    quien: "Estudiantes Sordos y sordociegos.",
    fuentes: [
      { texto: "Ley 982 de 2005, artículos 9 y 10", url: CO_LEY_982 },
      { texto: "Ley 1618 de 2013, artículo 11", url: CO_LEY_1618 },
    ],
  },
  {
    id: "co-sena",
    pais: "colombia",
    categoria: "educacion",
    titulo: "Intérprete en el SENA",
    que: "El SENA debe garantizar el servicio de intérpretes de lengua de señas y de guías intérpretes.",
    quien: "Aprendices Sordos y sordociegos.",
    como: "Avisa en tu centro de formación que necesitas intérprete.",
    fuentes: [
      { texto: "Ley 1618 de 2013, artículo 13", url: CO_LEY_1618 },
      { texto: "Ley 982 de 2005, artículo 36", url: CO_LEY_982 },
    ],
  },
  {
    id: "co-cuota-empresas",
    pais: "colombia",
    categoria: "trabajo",
    titulo: "Cuota de empleo en empresas",
    que: "Las empresas de hasta 500 trabajadores deben tener al menos 2 personas con discapacidad por cada 100 trabajadores. Desde 501 trabajadores, la ley suma una persona más por cada tramo de 100.",
    quien: "Personas con discapacidad con certificado.",
    atencion: "La ley se publicó el 25 de junio de 2025: el primer año era optativo y el segundo ya es obligatorio. Algunos análisis dicen que no aplica a empresas con menos de 100 trabajadores; no encontramos esa excepción en el artículo que leímos. Si tienes dudas sobre el cálculo, pregunta en el Ministerio del Trabajo.",
    fuentes: [{ texto: "Ley 2466 de 2025, artículo 15", url: CO_LEY_2466 }],
  },
  {
    id: "co-cuota-estado",
    pais: "colombia",
    categoria: "trabajo",
    titulo: "Cuota de empleo en el Estado",
    que: "Desde el 31 de diciembre de 2023, las entidades públicas deben tener este mínimo: 3 % si tienen hasta 1.000 empleos, 2 % de 1.001 a 3.000 y 1 % con más de 3.000. Para el 31 de diciembre de 2027 sube a 4 %, 3 % y 2 %.",
    quien: "Personas con discapacidad.",
    fuentes: [{ texto: "Decreto 2011 de 2017", url: `${NORMOGRAMA}/decreto_2011_2017.htm` }],
  },
  {
    id: "co-despido",
    pais: "colombia",
    categoria: "trabajo",
    titulo: "Protección contra el despido",
    que: "No pueden despedirte por tu discapacidad sin autorización de la oficina del Trabajo. La Corte Constitucional dijo que, sin esa autorización, el despido no tiene efecto. La ley también fija una indemnización de 180 días de salario.",
    quien: "Trabajadores con discapacidad.",
    como: "Estos derechos hay que reclamarlos: hazlo rápido. Consulta en el Ministerio del Trabajo. También existe la acción de tutela, que puedes presentar sin abogado y que otra persona puede presentar por ti si no puedes defenderte.",
    fuentes: [
      { texto: "Ley 361 de 1997, artículo 26", url: CO_LEY_361 },
      { texto: "Ley 982 de 2005, artículo 30", url: CO_LEY_982 },
      { texto: "Corte Constitucional, Sentencia C-531 de 2000", url: "https://www.corteconstitucional.gov.co/relatoria/2000/C-531-00.htm" },
      { texto: "Decreto 2591 de 1991 (tutela), artículos 10 y 14", url: `${NORMOGRAMA}/decreto_2591_1991.htm` },
    ],
  },
  {
    id: "co-ajustes-razonables",
    pais: "colombia",
    categoria: "trabajo",
    titulo: "Ajustes en tu lugar de trabajo",
    que: "El empleador debe hacer los cambios necesarios en tu puesto para que puedas trabajar. La ley los llama «ajustes razonables».",
    quien: "Trabajadores con discapacidad.",
    como: "Explica por escrito a tu empleador qué necesitas.",
    fuentes: [{ texto: "Ley 2466 de 2025, artículo 15", url: CO_LEY_2466 }],
  },
  {
    id: "co-concursos",
    pais: "colombia",
    categoria: "trabajo",
    titulo: "Preferencia si hay empate en concursos del Estado",
    que: "Participas en igualdad de condiciones. Si hay empate entre candidatos, se prefiere a la persona con discapacidad, salvo que su discapacidad sea muy incompatible con las tareas del puesto.",
    quien: "Personas con discapacidad que se presentan a concursos públicos.",
    fuentes: [{ texto: "Ley 361 de 1997, artículo 27", url: CO_LEY_361 }],
  },

  // Chile
  {
    id: "cl-certificacion-compin",
    pais: "chile",
    categoria: "tramites",
    titulo: "Certificación de discapacidad de la COMPIN",
    que: "La COMPIN determina si tienes una discapacidad y de qué grado. El trámite no tiene costo.",
    quien: "Cualquier persona con una condición de salud que limite sus actividades, sin importar su sistema de salud.",
    como: "Hazlo en el sitio de la COMPIN con tu ClaveÚnica. Necesitas el informe biomédico funcional y el informe social y de redes de apoyo.",
    atencion: "La respuesta debería llegar en un máximo de 20 días hábiles. Si la rechazan o la reducen, tienes 5 días hábiles desde que te notifican para apelar: pregunta en la COMPIN cómo hacerlo el mismo día que recibas la respuesta. Consulta también si los informes que te piden tienen costo.",
    fuentes: [
      { texto: "Trámite en ChileAtiende", url: "https://www.chileatiende.gob.cl/fichas/83219-certificacion-de-discapacidad-de-la-compin" },
      { texto: "Ley 20.422, artículo 13", url: CL_LEY_20422 },
    ],
  },
  {
    id: "cl-credencial",
    pais: "chile",
    categoria: "tramites",
    titulo: "Credencial de discapacidad",
    que: "Es el documento que recibes cuando tu discapacidad queda inscrita en el Registro Nacional de la Discapacidad. El trámite no tiene costo.",
    quien: "Personas con su discapacidad ya certificada por la COMPIN.",
    como: "La COMPIN envía tu resolución al Registro Civil. La credencial llega por correo electrónico y también se descarga en registrocivil.cl.",
    atencion: "Revisa la fecha de vigencia. La reevaluación se pide 90 días antes de que venza. Un duplicado puede tener costo.",
    fuentes: [
      { texto: "Credencial en el Senadis", url: "https://www.senadis.gob.cl/pag/600/1898/credencial_de_discapacidad" },
      { texto: "Trámite en ChileAtiende", url: "https://www.chileatiende.gob.cl/fichas/83219-certificacion-de-discapacidad-de-la-compin" },
    ],
  },
  {
    id: "cl-reclamar",
    pais: "chile",
    categoria: "tramites",
    titulo: "Reclamar si no respetan tus derechos",
    que: "Si alguien, sin justificación, hace algo o deja de hacer algo y eso amenaza o afecta tus derechos de esta ley, puedes acudir al juez de policía local de tu domicilio.",
    quien: "Personas con discapacidad.",
    como: "Puedes reclamar tú o puede hacerlo otra persona en tu nombre.",
    fuentes: [{ texto: "Ley 20.422, artículo 57", url: CL_LEY_20422 }],
  },
  {
    id: "cl-interprete",
    pais: "chile",
    categoria: "comunicacion",
    titulo: "Ir con intérprete a instituciones públicas y privadas",
    que: "Las instituciones públicas y privadas deben dar condiciones para que accedas a ellas y te presentes con intérprete de lengua de señas o guía intérprete, si acreditas tu condición.",
    quien: "Personas con discapacidad que usan intérprete o guía intérprete.",
    atencion: "En el texto que revisamos no dice quién paga el intérprete. Pregúntalo a la institución antes de ir.",
    fuentes: [{ texto: "Ley 20.422, artículo 8 bis", url: CL_LEY_20422 }],
  },
  {
    id: "cl-lengua-oficial",
    pais: "chile",
    categoria: "comunicacion",
    titulo: "Lengua de Señas Chilena, lengua oficial",
    que: "La ley dice que la lengua de señas chilena es la lengua natural y originaria de las personas Sordas, y parte de su patrimonio. El Estado reconoce que es su lengua oficial. Las personas Sordas tienen derecho a acceder a ella y a usarla.",
    quien: "Personas Sordas.",
    fuentes: [{ texto: "Ley 20.422, artículos 6 y 26", url: CL_LEY_20422 }],
  },
  {
    id: "cl-television",
    pais: "chile",
    categoria: "comunicacion",
    titulo: "Televisión con subtítulos y lengua de señas",
    que: "Los canales deben tener mecanismos para que las personas con discapacidad auditiva accedan a su programación. Las campañas de servicio público pagadas con fondos públicos, la propaganda electoral, los debates presidenciales, las cadenas nacionales y los informativos de emergencia deben ir con subtítulos y lengua de señas.",
    quien: "Toda persona que los necesite.",
    atencion: "La forma de aplicarlo la fija un reglamento que no revisamos.",
    fuentes: [{ texto: "Ley 20.422, artículo 25", url: CL_LEY_20422 }],
  },
  {
    id: "cl-salud",
    pais: "chile",
    categoria: "salud",
    titulo: "Atención preferente en salud",
    que: "Las personas con discapacidad y sus cuidadores deben ser atendidos de forma preferente y oportuna por cualquier prestador de salud. También debes recibir información que entiendas, con ayuda de un funcionario o de una persona que tú designes.",
    quien: "Personas con discapacidad y sus cuidadores.",
    atencion: "Primero se atienden las emergencias y urgencias. En estos artículos no se menciona la lengua de señas.",
    fuentes: [{ texto: "Ley 20.584, artículos 5 y 5 bis", url: CL_LEY_20584 }],
  },
  {
    id: "cl-transporte",
    pais: "chile",
    categoria: "transporte",
    titulo: "Viajar sin requisitos especiales",
    que: "El Estado debe adaptar el transporte público. Los operadores no pueden ponerte requisitos especiales para usar el servicio por tu discapacidad.",
    quien: "Pasajeros con discapacidad.",
    atencion: "En esta ley no encontramos un pase gratis para todo el país.",
    fuentes: [{ texto: "Ley 20.422, artículo 30", url: CL_LEY_20422 }],
  },
  {
    id: "cl-educacion",
    pais: "chile",
    categoria: "educacion",
    titulo: "Lengua de señas como primera lengua",
    que: "Los estudiantes Sordos deben aprender con la lengua de señas como primera lengua y el español escrito como segunda. La enseñanza de la lengua de señas debe estar preferentemente a cargo de personas Sordas calificadas.",
    quien: "Estudiantes Sordos.",
    fuentes: [{ texto: "Ley 20.422, artículos 26 bis y 34", url: CL_LEY_20422 }],
  },
  {
    id: "cl-educacion-superior",
    pais: "chile",
    categoria: "educacion",
    titulo: "Educación superior accesible",
    que: "Las instituciones de educación superior deben facilitar tu acceso y adaptar sus materiales y medios de enseñanza.",
    quien: "Estudiantes con discapacidad.",
    fuentes: [{ texto: "Ley 20.422, artículo 39", url: CL_LEY_20422 }],
  },
  {
    id: "cl-cuota-empresas",
    pais: "chile",
    categoria: "trabajo",
    titulo: "Cuota de 1 % en empresas",
    que: "Las empresas con 100 o más trabajadores deben tener al menos 1 % de personas con discapacidad o con pensión de invalidez.",
    quien: "Personas con la calificación y certificación de la COMPIN, o con pensión de invalidez.",
    atencion: "Si una empresa tiene razones fundadas para no cumplir, la ley le permite medidas alternativas.",
    fuentes: [{ texto: "Ley 21.015 (Código del Trabajo, artículos 157 bis y ter)", url: CL_LEY_21015 }],
  },
  {
    id: "cl-cuota-estado",
    pais: "chile",
    categoria: "trabajo",
    titulo: "Preferencia y cuota en el Estado",
    que: "Con igual mérito, los órganos del Estado deben elegir preferentemente a personas con discapacidad. Las instituciones con 100 o más funcionarios deben reservar al menos 1 % de sus puestos.",
    quien: "Personas con discapacidad que postulan al sector público.",
    fuentes: [{ texto: "Ley 20.422, artículo 45", url: CL_LEY_20422 }],
  },
  {
    id: "cl-pbsi",
    pais: "chile",
    categoria: "ayuda-economica",
    titulo: "Pensión Básica Solidaria de Invalidez",
    que: "Es una pensión del Estado de $250.275 al mes.",
    quien: "Personas de 18 a 64 años, sin derecho a otra pensión, dentro del 80 % más vulnerable y con 5 años de residencia en los últimos 6.",
    como: "Pídela en línea con ClaveÚnica, por videoatención o en una sucursal ChileAtiende.",
    atencion: "Una comisión médica evalúa la invalidez: ser una persona Sorda no asegura esta pensión. El monto cambia con el tiempo.",
    fuentes: [{ texto: "Trámite en ChileAtiende", url: "https://www.chileatiende.gob.cl/fichas/5178-pension-basica-solidaria-de-invalidez-pbsi" }],
  },
  {
    id: "cl-subsidio-menores",
    pais: "chile",
    categoria: "ayuda-economica",
    titulo: "Subsidio de Discapacidad para menores de 18 años",
    que: "Es un subsidio de $125.138 al mes.",
    quien: "Menores de 18 años con discapacidad severa acreditada de al menos 50 %, del 60 % más vulnerable, con 3 años de residencia y bajo cuidado permanente.",
    como: "Lo pide su representante en línea, por videoatención, en ChileAtiende o en una municipalidad con convenio.",
    atencion: "Ser una persona Sorda no asegura este subsidio: depende del grado acreditado. El monto se reajusta cada febrero.",
    fuentes: [{ texto: "Trámite en ChileAtiende", url: "https://www.chileatiende.gob.cl/fichas/43187-subsidio-de-discapacidad-para-menores-de-18-anos" }],
  },

  // México
  {
    id: "mx-certificado",
    pais: "mexico",
    categoria: "tramites",
    titulo: "Certificado de discapacidad",
    que: "La ley ordena al sector salud expedir un certificado de reconocimiento y calificación de discapacidad con validez nacional.",
    quien: "Personas con discapacidad.",
    como: "Pregunta en una institución pública de salud. Lo piden para la pensión y para otros trámites.",
    atencion: "El formato y el costo pueden cambiar según la institución y el estado.",
    fuentes: [{ texto: "Ley General para la Inclusión, artículo 10", url: MX_LEY_INCLUSION }],
  },
  {
    id: "mx-credencial",
    pais: "mexico",
    categoria: "tramites",
    titulo: "Credencial Nacional para Personas con Discapacidad",
    que: "Es una identificación oficial con validez nacional. Según el DIF Nacional, el trámite de la credencial es gratis, pero antes necesitas una constancia de discapacidad. El DIF Nacional indica un costo de $79.",
    quien: "Personas con discapacidad permanente.",
    como: "Tramítala en el DIF. Lleva acta de nacimiento, CURP, constancia de discapacidad de un médico especialista y comprobante de domicilio de menos de tres meses.",
    atencion: "Los documentos y el costo cambian según el estado. Confirma en el DIF de tu estado antes de ir.",
    fuentes: [
      { texto: "DIF Nacional", url: "https://www.gob.mx/difnacional/acciones-y-programas/credencializacion-de-las-personas-con-discapacidad" },
      { texto: "Trámite en gob.mx", url: "https://www.gob.mx/public/tramites/detalleTramite.xhtml?homoclave=DIF-2020-036-006-A" },
    ],
  },
  {
    id: "mx-lengua-nacional",
    pais: "mexico",
    categoria: "comunicacion",
    titulo: "Lengua de Señas Mexicana, lengua nacional",
    que: "La Lengua de Señas Mexicana está reconocida oficialmente como lengua nacional y es parte del patrimonio lingüístico del país.",
    quien: "Personas Sordas y toda persona que la use.",
    fuentes: [{ texto: "Ley General para la Inclusión, artículo 14", url: MX_LEY_INCLUSION }],
  },
  {
    id: "mx-justicia",
    pais: "mexico",
    categoria: "comunicacion",
    titulo: "Intérprete y abogado en trámites de justicia",
    que: "Las instituciones de justicia deben contar con apoyo de intérpretes de Lengua de Señas Mexicana. En procedimientos administrativos y judiciales tienes derecho a un trato digno y a asesoría y representación jurídica gratuita, según lo que diga cada ley.",
    quien: "Personas con discapacidad que son parte de un procedimiento.",
    fuentes: [{ texto: "Ley General para la Inclusión, artículos 28 y 29", url: MX_LEY_INCLUSION }],
  },
  {
    id: "mx-informacion-accesible",
    pais: "mexico",
    categoria: "comunicacion",
    titulo: "Información accesible",
    que: "Las autoridades deben dar la información dirigida al público en formatos accesibles y sin costo adicional, y promover el uso de la Lengua de Señas Mexicana. Los medios de comunicación y las empresas que informan al público también deben darla en formatos accesibles.",
    quien: "Personas con discapacidad.",
    fuentes: [{ texto: "Ley General para la Inclusión, artículo 32", url: MX_LEY_INCLUSION }],
  },
  {
    id: "mx-salud",
    pais: "mexico",
    categoria: "salud",
    titulo: "Salud y rehabilitación sin discriminación",
    que: "La Secretaría de Salud debe promover tu derecho al más alto nivel posible de salud y rehabilitación, con servicios de calidad, gratuitos o a precio asequible. También debe capacitar al personal médico y administrativo.",
    quien: "Personas con discapacidad.",
    fuentes: [{ texto: "Ley General para la Inclusión, artículo 7", url: MX_LEY_INCLUSION }],
  },
  {
    id: "mx-transporte",
    pais: "mexico",
    categoria: "transporte",
    titulo: "Transporte accesible y descuentos por convenio",
    que: "El Gobierno debe promover que el transporte público sea accesible, con personal capacitado, y buscar convenios para que tengas descuentos en las tarifas.",
    quien: "Personas con discapacidad.",
    atencion: "La ley pide promover esos convenios, pero no fija un descuento. Cada ciudad y empresa decide: pregunta antes de viajar.",
    fuentes: [{ texto: "Ley General para la Inclusión, artículo 19", url: MX_LEY_INCLUSION }],
  },
  {
    id: "mx-educacion",
    pais: "mexico",
    categoria: "educacion",
    titulo: "Intérpretes y Lengua de Señas en la escuela",
    que: "La Secretaría de Educación Pública debe procurar apoyo de intérpretes en los planteles, incluir la enseñanza de la Lengua de Señas Mexicana en la educación pública y privada, y crear un programa nacional de becas. No pueden discriminarte en la escuela.",
    quien: "Estudiantes con discapacidad.",
    atencion: "La ley dice «procurando» en el caso de los intérpretes, así que puede que tu escuela todavía no los tenga.",
    fuentes: [{ texto: "Ley General para la Inclusión, artículo 12", url: MX_LEY_INCLUSION }],
  },
  {
    id: "mx-trabajo",
    pais: "mexico",
    categoria: "trabajo",
    titulo: "Empleo sin discriminación",
    que: "Está prohibida la discriminación por discapacidad en la selección, la contratación, el sueldo, la capacitación y los ascensos. El lugar de trabajo debe ser accesible, seguro y saludable.",
    quien: "Personas con discapacidad que trabajan o buscan trabajo.",
    atencion: "Este artículo no fija un porcentaje obligatorio de empleo.",
    fuentes: [{ texto: "Ley General para la Inclusión, artículo 11", url: MX_LEY_INCLUSION }],
  },
  {
    id: "mx-descuentos",
    pais: "mexico",
    categoria: "descuentos",
    titulo: "Descuentos con la Credencial Nacional",
    que: "Según el DIF Nacional, la credencial da acceso a descuentos en algunos establecimientos y en el pago de servicios como predial, agua y tenencia.",
    quien: "Personas con la Credencial Nacional.",
    como: "Lleva tu credencial y pregunta antes de pagar.",
    atencion: "Cada establecimiento y gobierno local decide si da el descuento y de cuánto es.",
    fuentes: [{ texto: "DIF Nacional", url: "https://www.gob.mx/difnacional/acciones-y-programas/credencializacion-de-las-personas-con-discapacidad" }],
  },
  {
    id: "mx-pension-bienestar",
    pais: "mexico",
    categoria: "ayuda-economica",
    titulo: "Pensión para el Bienestar de las Personas con Discapacidad Permanente",
    que: "En 2026 son $1,650 al mes, que se pagan cada dos meses.",
    quien: "De 0 a 29 años, en todo el país. De 30 a 64 años, si tu estado firmó el convenio de universalización, o si vives en una localidad indígena, afromexicana o de alta marginación.",
    como: "Pregunta en un Módulo de Atención del programa. Lleva acta de nacimiento, identificación, CURP, comprobante de domicilio y un certificado de discapacidad permanente de una institución pública de salud. El trámite no tiene costo.",
    atencion: "Las reglas y el monto cambian cada año.",
    fuentes: [
      { texto: "Reglas de Operación 2026", url: "https://www.gob.mx/cms/uploads/attachment/file/1056922/ROPS_PDP_2026.pdf" },
      { texto: "Programa en gob.mx", url: "https://www.gob.mx/bienestar/acciones-y-programas/pension-para-el-bienestar-de-las-personas-con-discapacidad-permanente" },
    ],
  },

  // Argentina
  {
    id: "ar-cud",
    pais: "argentina",
    categoria: "tramites",
    titulo: "Certificado Único de Discapacidad (CUD)",
    que: "Es el documento que certifica tu discapacidad y vale en todo el país. Es voluntario y gratis.",
    quien: "Personas con discapacidad.",
    como: "Reúne tus estudios médicos, consulta en argentina.gob.ar/cud dónde pedir turno y preséntate ante la Junta Evaluadora.",
    atencion: "Una junta decide si corresponde darlo. Pregunta antes si los estudios médicos que te piden tienen costo. Algunas páginas oficiales todavía nombran a la Agencia Nacional de Discapacidad (ANDIS); hoy el trámite aparece en la Secretaría Nacional de Discapacidad.",
    fuentes: [
      { texto: "CUD en argentina.gob.ar", url: "https://www.argentina.gob.ar/cud" },
      { texto: "Ley 22.431, artículo 3", url: AR_LEY_22431 },
    ],
  },
  {
    id: "ar-lsa",
    pais: "argentina",
    categoria: "comunicacion",
    titulo: "Reconocimiento de la Lengua de Señas Argentina",
    que: "La Ley 27.710 reconoce la LSA como lengua natural y originaria. Busca eliminar barreras de comunicación y que las políticas públicas sean accesibles. Cuando se hacen consultas sobre la LSA, deben dirigirse a organizaciones de personas Sordas.",
    quien: "Personas Sordas y quienes elijan comunicarse en LSA.",
    atencion: "El texto de la ley no tiene un artículo que obligue a dar intérprete en cada trámite. Tu provincia puede tener una ley propia.",
    fuentes: [{ texto: "Ley 27.710", url: "https://www.argentina.gob.ar/normativa/nacional/ley-27710-383041/texto" }],
  },
  {
    id: "ar-television",
    pais: "argentina",
    categoria: "comunicacion",
    titulo: "Televisión con subtítulos y lengua de señas",
    que: "La televisión abierta y los canales locales propios de la televisión por cable deben incorporar subtítulos ocultos, lengua de señas y audiodescripción.",
    quien: "Personas con discapacidades sensoriales.",
    atencion: "La ley dice que se aplica de forma progresiva. No pudimos confirmar cómo se cumple hoy.",
    fuentes: [{ texto: "Ley 26.522, artículo 66", url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/155000-159999/158649/texact.htm" }],
  },
  {
    id: "ar-prestaciones",
    pais: "argentina",
    categoria: "salud",
    titulo: "Cobertura de prestaciones básicas",
    que: "Las obras sociales deben cubrir por completo las prestaciones básicas de sus afiliados con discapacidad. Si no tienes obra social ni puedes pagarlas, te las debe dar el Estado.",
    quien: "Personas con discapacidad acreditada con el CUD.",
    fuentes: [{ texto: "Ley 24.901, artículos 2, 3, 4 y 10", url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/45000-49999/47677/texact.htm" }],
  },
  {
    id: "ar-audifonos",
    pais: "argentina",
    categoria: "salud",
    titulo: "Estudio auditivo, audífonos e implantes",
    que: "El estudio auditivo de recién nacidos es obligatorio. Si eliges usarlos, las obras sociales y prepagas deben cubrir audífonos, prótesis auditivas y rehabilitación. El implante coclear está dentro del Plan Médico Obligatorio.",
    quien: "Personas con pérdida de audición.",
    fuentes: [{ texto: "Ley 25.415 explicada en Ley Simple", url: "https://www.argentina.gob.ar/justicia/derechofacil/leysimple/hipoacusia" }],
  },
  {
    id: "ar-transporte",
    pais: "argentina",
    categoria: "transporte",
    titulo: "Viaje gratis en transporte nacional",
    que: "Viajas gratis en colectivos y trenes de la Región Metropolitana y en micros de media y larga distancia controlados por el Estado nacional.",
    quien: "Personas con CUD vigente. Un acompañante también viaja gratis solo si el certificado lo indica.",
    como: "Muestra tu CUD. Para micros de larga distancia, pide el pasaje al menos 48 horas antes en el Sistema de Solicitud de Pasajes.",
    atencion: "Solo cubre el transporte controlado por el Estado nacional. No incluye las líneas interurbanas provinciales. Los colectivos de tu provincia o ciudad pueden tener reglas propias.",
    fuentes: [
      { texto: "Viaje gratuito en argentina.gob.ar", url: "https://www.argentina.gob.ar/viaje-gratuito-en-el-transporte-publico-terrestre-nacional" },
      { texto: "Derechos en la CNRT", url: "https://www.argentina.gob.ar/transporte/cnrt/derechos-de-los-usuarios/derechos-de-las-personas-con-discapacidad" },
      { texto: "Ley 22.431, artículo 22", url: AR_LEY_22431 },
    ],
  },
  {
    id: "ar-educacion-superior",
    pais: "argentina",
    categoria: "educacion",
    titulo: "Interpretación en exámenes de educación superior",
    que: "En las instituciones estatales de educación superior, las personas con discapacidad deben contar con servicios de interpretación y apoyos técnicos durante las evaluaciones.",
    quien: "Estudiantes con discapacidad de instituciones estatales.",
    como: "Pídelo en tu institución antes del examen.",
    atencion: "Este artículo habla de las evaluaciones. Pregunta en tu institución qué apoyos da para las clases.",
    fuentes: [{ texto: "Ley 24.521, artículo 13", url: "https://www.argentina.gob.ar/normativa/nacional/ley-24521-25394/actualizacion" }],
  },
  {
    id: "ar-cupo-estado",
    pais: "argentina",
    categoria: "trabajo",
    titulo: "Cupo de 4 % en el Estado",
    que: "El Estado nacional, sus organismos y las empresas privadas que prestan servicios públicos por concesión deben ocupar al menos 4 % de personas con discapacidad.",
    quien: "Personas con discapacidad que reúnan las condiciones del puesto.",
    atencion: "No incluye a las empresas privadas en general. Las provincias pueden tener reglas propias.",
    fuentes: [{ texto: "Ley 22.431, artículo 8", url: AR_LEY_22431 }],
  },
  {
    id: "ar-pension-invalidez",
    pais: "argentina",
    categoria: "ayuda-economica",
    titulo: "Pensión no contributiva por discapacidad",
    que: "La Ley 27.793, de 2025, la llama Pensión no Contributiva por Discapacidad para Protección Social. Es un pago mensual del 70 % de la jubilación mínima.",
    quien: "Según esa ley: personas con CUD, argentinas o extranjeras con 5 años de residencia legal, sin otra jubilación o pensión, con ingresos propios menores a dos salarios mínimos y que aprueben una evaluación socioeconómica.",
    como: "Pregunta en ANSES o en la Secretaría Nacional de Discapacidad cómo pedirla hoy. La página oficial que encontramos todavía muestra el trámite anterior, con Certificado Médico Oficial y mi ANSES.",
    atencion: "La Ley 27.793 dice que puedes trabajar y seguir cobrando si tus ingresos no pasan de dos salarios mínimos, pero la página oficial anterior dice que es incompatible con cualquier trabajo. Hubo un juicio sobre la aplicación de esta ley y no pudimos confirmar cómo se aplica hoy. Antes de dejar un trabajo o de desistir, pregunta en ANSES.",
    fuentes: [
      { texto: "Ley 27.793, artículos 5, 6 y 7", url: "https://www.argentina.gob.ar/normativa/nacional/norma-417788/texto" },
      { texto: "Decreto 84/2026", url: "https://www.argentina.gob.ar/normativa/nacional/norma-422915/texto" },
      { texto: "Trámite anterior en argentina.gob.ar", url: "https://www.argentina.gob.ar/servicio/solicitar-la-pension-no-contributiva-por-invalidez-laboral" },
    ],
  },
];

export const paisDerechos = (slug: string) => PAISES_DERECHOS.find((p) => p.slug === slug);

export const beneficiosDe = (pais: string, categoria?: string) =>
  BENEFICIOS.filter((b) => b.pais === pais && (!categoria || b.categoria === categoria));

// Solo las categorías con contenido en ese país: no se publican páginas vacías.
export const categoriasDe = (pais: string) =>
  CATEGORIAS.filter((c) => beneficiosDe(pais, c.slug).length > 0).map((c) => ({
    ...c,
    resumen: RESUMENES[pais as PaisDerechos]?.[c.slug] ?? c.nombre,
  }));

export const categoriaDe = (pais: string, slug: string) =>
  categoriasDe(pais).find((c) => c.slug === slug);

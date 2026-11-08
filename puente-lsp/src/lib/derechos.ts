// Derechos y beneficios de las personas Sordas, por país y categoría.
// Reglas: cada dato sale de una norma o de una página oficial, con su enlace;
// si algo no se pudo confirmar va en `atencion`, nunca como un hecho. Un error
// aquí le hace daño real a alguien que va a reclamar un derecho.
// Solo se publican los países y categorías que ya tienen contenido.

export const PAISES_DERECHOS = [{ slug: "peru", nombre: "Perú" }] as const;

export const CATEGORIAS = [
  { slug: "tramites", nombre: "Trámites", resumen: "El certificado y el carné que piden para casi todo." },
  { slug: "comunicacion", nombre: "Intérprete y comunicación", resumen: "Intérprete en trámites y televisión accesible." },
  { slug: "salud", nombre: "Salud", resumen: "Atención y seguro de salud." },
  { slug: "transporte", nombre: "Transporte", resumen: "Pase libre con discapacidad severa y asientos reservados." },
  { slug: "educacion", nombre: "Educación", resumen: "Vacantes reservadas y lengua de señas." },
  { slug: "trabajo", nombre: "Trabajo", resumen: "Cuota de empleo y puntos extra en concursos." },
  { slug: "descuentos", nombre: "Descuentos", resumen: "Entradas a espectáculos a menor precio." },
  { slug: "ayuda-economica", nombre: "Ayuda económica", resumen: "Pensión Contigo, para discapacidad severa y pobreza." },
] as const;

export type PaisDerechos = (typeof PAISES_DERECHOS)[number]["slug"];
export type Categoria = (typeof CATEGORIAS)[number]["slug"];

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
];

export const paisDerechos = (slug: string) => PAISES_DERECHOS.find((p) => p.slug === slug);

export const beneficiosDe = (pais: string, categoria?: string) =>
  BENEFICIOS.filter((b) => b.pais === pais && (!categoria || b.categoria === categoria));

// Solo las categorías con contenido en ese país: no se publican páginas vacías.
export const categoriasDe = (pais: string) =>
  CATEGORIAS.filter((c) => beneficiosDe(pais, c.slug).length > 0);

export const categoriaDe = (pais: string, slug: string) =>
  categoriasDe(pais).find((c) => c.slug === slug);

// Noticias sobre personas Sordas: Perú, Latinoamérica e Internacional.
// Reglas: solo nuestro resumen y el enlace al medio (nunca copiar su texto ni
// sus fotos); cada noticia se lee en el medio original antes de agregarla; sin
// nombres ni fotos de personas comunes, sobre todo de niños; el implante
// coclear se cuenta de forma neutral (sin «cura» ni «volvió a oír»).
// Para agregar una: ponerla al final con el número siguiente. El número no
// cambia nunca, así se puede decir «mira la noticia 7» en redes.

export const REGIONES = [
  { slug: "latinoamerica", nombre: "Latinoamérica" },
  { slug: "internacional", nombre: "Internacional" },
] as const;

export const PAISES = [
  { slug: "peru", nombre: "Perú", region: "latinoamerica" },
  { slug: "mexico", nombre: "México", region: "latinoamerica" },
  { slug: "colombia", nombre: "Colombia", region: "latinoamerica" },
  { slug: "chile", nombre: "Chile", region: "latinoamerica" },
  { slug: "argentina", nombre: "Argentina", region: "latinoamerica" },
  { slug: "estados-unidos", nombre: "Estados Unidos", region: "internacional" },
  { slug: "espana", nombre: "España", region: "internacional" },
  { slug: "italia", nombre: "Italia", region: "internacional" },
  { slug: "kazajistan", nombre: "Kazajistán", region: "internacional" },
] as const;

export const TEMAS = [
  { slug: "educacion", nombre: "Educación" },
  { slug: "trabajo", nombre: "Trabajo" },
  { slug: "leyes-y-derechos", nombre: "Leyes y derechos" },
  { slug: "interpretes-y-lsp", nombre: "Intérpretes y lengua de señas" },
  { slug: "salud-e-implante-coclear", nombre: "Salud e implante coclear" },
  { slug: "sordoceguera", nombre: "Sordoceguera" },
  { slug: "tecnologia", nombre: "Tecnología" },
  { slug: "cultura-y-deporte", nombre: "Cultura y deporte" },
  { slug: "discriminacion", nombre: "Discriminación" },
] as const;

export type Region = (typeof REGIONES)[number]["slug"];
export type Pais = (typeof PAISES)[number]["slug"];
export type Tema = (typeof TEMAS)[number]["slug"];

export type Noticia = {
  numero: number;
  // AAAA-MM-DD, la fecha de la nota en el medio.
  fecha: string;
  pais: Pais;
  temas: Tema[];
  // Título nuestro, no el del medio.
  titulo: string;
  // Nuestro resumen en español sencillo, 2 a 4 frases.
  resumen: string;
  // true si la fuente es una columna de opinión y no una noticia.
  opinion?: boolean;
  fuentes: { medio: string; url: string }[];
};

export const NOTICIAS: Noticia[] = [
  {
    numero: 1,
    fecha: "2026-01-08",
    pais: "peru",
    temas: ["salud-e-implante-coclear"],
    titulo: "Niños con implante coclear esperan la activación en el Hospital Almenara",
    resumen:
      "Unos niños recibieron un implante coclear en noviembre de 2025 en el Hospital Almenara de EsSalud. Según las familias, la empresa que debía activarlo y dar las terapias las suspendió porque EsSalud le debe pagos. Las familias, de Cajamarca, Cusco e Ica, hicieron un plantón y enviaron una carta notarial.",
    fuentes: [
      {
        medio: "RPP",
        url: "https://rpp.pe/rotafono/servicios-publicos/padres-piden-activacion-de-implante-cloquear-a-ninos-con-discapacidad-auditiva-noticia-1670020",
      },
    ],
  },
  {
    numero: 2,
    fecha: "2026-02-19",
    pais: "mexico",
    temas: ["leyes-y-derechos"],
    titulo: "Oaxaca: proponen que la Lengua de Señas Mexicana sea lengua del estado",
    resumen:
      "En el Congreso de Oaxaca presentaron una propuesta para cambiar la Constitución del estado. La Lengua de Señas Mexicana sería parte del «patrimonio lingüístico estatal», para que las personas Sordas tengan acceso a la información y a los servicios públicos en igualdad. Todavía es una propuesta, no una ley.",
    fuentes: [
      {
        medio: "Diario Marca",
        url: "https://www.diariomarca.com.mx/2026/02/buscan-que-la-lengua-de-senas-mexicana-sea-lengua-oficial-en-oaxaca/",
      },
    ],
  },
  {
    numero: 3,
    // La URL dice 2026/03/21; la fecha visible en la nota es el 20 de abril.
    fecha: "2026-04-20",
    pais: "peru",
    temas: ["educacion"],
    titulo: "El Perú tiene un solo colegio estatal exclusivo para niños Sordos, y no tiene secundaria",
    resumen:
      "El CEBE Ludwig van Beethoven, en Cercado de Lima, es el único colegio estatal solo para estudiantes Sordos, y tiene inicial y primaria. Un padre cuenta que en un colegio privado la familia paga al intérprete: entre S/ 60 y S/ 100 la hora. El Conadis registra más de 53 mil personas Sordas.",
    fuentes: [
      {
        medio: "La República",
        url: "https://larepublica.pe/politica/2026/03/21/peru-solo-tiene-un-colegio-exclusivo-para-ninos-sordos-y-no-tiene-nivel-secundario-hnews-300363",
      },
    ],
  },
  {
    numero: 4,
    fecha: "2026-07-03",
    pais: "peru",
    temas: ["sordoceguera", "leyes-y-derechos"],
    titulo: "Personas sordociegas: una ley desde 2010 y todavía muchas barreras",
    resumen:
      "La Ley 29524 reconoce la sordoceguera desde 2010, pero faltan guías intérpretes y muchas personas dependen de su familia o de voluntarios. El Conadis registra 3 082 personas; Sense Internacional Perú cree que podrían ser más de 15 mil. Habla la Asociación de Sordociegos del Perú.",
    fuentes: [
      {
        medio: "La República",
        url: "https://larepublica.pe/sociedad/2026/07/03/luchan-por-ser-vistos-y-escuchados-personas-con-sordoceguera-y-las-barreras-que-limitan-su-autonomia-131907",
      },
    ],
  },
  {
    numero: 5,
    fecha: "2026-07-17",
    pais: "peru",
    temas: ["leyes-y-derechos", "interpretes-y-lsp"],
    titulo: "Una columna advierte que la Ley 32724 pide intérpretes certificados sin un sistema para certificarlos",
    resumen:
      "La Ley 32724 cambia la Ley 29973: los noticieros deben tener intérprete de LSP o subtítulos, y el intérprete debe estar «certificado o acreditado». La autora dice que el Estado todavía no creó el sistema para certificarlos, y que muchos intérpretes que ya trabajan podrían quedarse sin poder hacerlo. También critica que no se consultó lo suficiente a las organizaciones Sordas.",
    opinion: true,
    fuentes: [
      {
        medio: "Pressenza",
        url: "https://www.pressenza.com/es/2026/07/peru-cuando-una-ley-de-accesibilidad-termina-creando-nuevas-barreras/",
      },
      { medio: "Texto de la ley en El Peruano", url: "https://busquedas.elperuano.pe/dispositivo/NL/2533576-3" },
    ],
  },
  {
    numero: 6,
    fecha: "2026-09-26",
    pais: "chile",
    temas: ["interpretes-y-lsp", "tecnologia"],
    titulo: "El Senado de Chile transmite sus sesiones con lengua de señas y subtítulos en vivo",
    resumen:
      "La televisión del Senado en YouTube tiene, siempre, intérprete de Lengua de Señas Chilena en un recuadro más grande y subtítulos en vivo. Se diseñó con recomendaciones del Senadis y lo validaron organizaciones Sordas de Valparaíso. Desde junio transmitió 46 sesiones.",
    fuentes: [
      {
        medio: "Duplos",
        url: "https://duplos.cl/actualidad/senado-dia-internacional-de-las-lenguas-de-senas-comunidad-sorda-valparaiso-70/280102/2026/09/26/",
      },
    ],
  },
  {
    numero: 7,
    fecha: "2026-10-02",
    pais: "argentina",
    temas: ["leyes-y-derechos"],
    titulo: "Buenos Aires aprueba una ley para promover la Lengua de Señas Argentina",
    resumen:
      "La provincia de Buenos Aires publicó la Ley 15.632. Pide al gobierno nombrar una autoridad que haga accesibles los servicios públicos en Lengua de Señas Argentina (LSA) y busca llevar la LSA a las escuelas. Se apoya en la ley nacional 27.710, que reconoce la LSA como lengua.",
    fuentes: [
      {
        medio: "Info Arenales",
        url: "https://infoarenales.com/2026/10/02/la-provincia-promueve-el-uso-de-la-lengua-de-senas-argentina-para-garantizar-la-inclusion-de-las-personas-sordas/",
      },
    ],
  },
  {
    numero: 8,
    fecha: "2026-10-03",
    pais: "peru",
    temas: ["salud-e-implante-coclear"],
    titulo: "Arequipa: familias piden a EsSalud renovar procesadores de implante coclear",
    resumen:
      "Unas 20 personas, niños y adultos, tienen procesadores externos viejos que fallan o ya no funcionan. Las familias dicen que llevan cerca de cuatro años pidiendo a EsSalud que los cambie, y que mientras tanto pagan baterías y piezas. Protestaron frente a EsSalud.",
    fuentes: [
      {
        medio: "Correo",
        url: "https://diariocorreo.pe/peru/arequipa-cuatro-anos-sin-solucion-para-pacientes-con-implantes-cocleares-en-essalud-noticia/",
      },
    ],
  },
  {
    numero: 9,
    fecha: "2026-10-14",
    pais: "argentina",
    temas: ["educacion"],
    titulo: "Catamarca: la comunidad Sorda pide intérpretes en las secundarias",
    resumen:
      "La Asociación Catamarqueña de Sordos dice que en las secundarias comunes no hay intérpretes, y que también hay barreras en hospitales, comisarías y juzgados. Piden enseñar la LSA en la escuela como idioma, con instructores Sordos: «La lengua de señas es parte de nuestra identidad».",
    fuentes: [
      {
        medio: "Inforama",
        url: "https://inforama.com.ar/actualidad/2026/10/14/video-comunidad-sorda-en-catamarca-la-lengua-de-senas-es-parte-de-nuestra-identidad",
      },
    ],
  },
  {
    numero: 10,
    fecha: "2026-11-05",
    pais: "colombia",
    temas: ["interpretes-y-lsp"],
    titulo: "Bogotá: la alcaldía de Chapinero ya atiende con intérprete de lengua de señas",
    resumen:
      "La Alcaldía Local de Chapinero ofrece intérprete de Lengua de Señas Colombiana para trámites e información. Presencial: lunes y miércoles de 8 a. m. a 12 m., en el primer piso. Virtual: de martes a jueves, de 8 a. m. a 4 p. m. La nota no dice cómo pedir la atención virtual.",
    fuentes: [
      {
        medio: "UNIMINUTO Radio",
        url: "https://www.uniminutoradio.com.co/chapinero-incorpora-interpretes-de-lengua-de-senas-para-facilitar-atencion-a-personas-sordas/",
      },
    ],
  },
  {
    numero: 11,
    fecha: "2026-08-12",
    pais: "estados-unidos",
    temas: ["tecnologia"],
    titulo: "Google presenta una IA que pasa la lengua de señas americana a texto",
    resumen:
      "Google DeepMind presentó SL2T, un modelo que convierte la lengua de señas americana (ASL) en texto en inglés. Al inicio funciona solo en el celular Pixel 11, dentro del teclado Gboard y de Transcripción instantánea, sin costo extra. Lo guió un comité con organizaciones Sordas de varios países. Google reconoce que aún se equivoca con señas poco comunes y con el deletreo rápido. Otras lenguas de señas vendrán después.",
    fuentes: [
      { medio: "el blog de Google DeepMind", url: "https://deepmind.google/blog/putting-sign-language-ai-into-users-hands/" },
    ],
  },
  {
    numero: 12,
    fecha: "2026-09-22",
    pais: "estados-unidos",
    temas: ["leyes-y-derechos", "interpretes-y-lsp"],
    titulo: "Estados Unidos: la comunidad Sorda defiende en tribunales los intérpretes en la Casa Blanca",
    resumen:
      "En enero de 2025 la Casa Blanca dejó de poner intérprete de lengua de señas en sus conferencias de prensa. La Asociación Nacional de Sordos (NAD) la demandó, y en noviembre de 2025 un juez ordenó volver a ponerlos. El gobierno apeló, y la audiencia en la corte de apelaciones fue el 6 de octubre de 2026. Todavía no hay decisión publicada.",
    fuentes: [
      { medio: "la NAD", url: "https://nad.org/nad-returns-to-court-to-defend-equal-access/" },
    ],
  },
  {
    numero: 13,
    fecha: "2026-09-23",
    pais: "italia",
    temas: ["leyes-y-derechos", "cultura-y-deporte"],
    titulo: "La Federación Mundial de Sordos cumple 75 años: «los derechos de la lengua de señas son derechos humanos»",
    resumen:
      "La Federación Mundial de Sordos (WFD) celebró sus 75 años en el Parlamento de Italia, en Roma, el Día Internacional de las Lenguas de Señas. El lema fue «Declarar los derechos humanos de las personas Sordas». Su presidente pidió que las personas Sordas participen en todo: educación, trabajo, justicia y política.",
    fuentes: [
      {
        medio: "la WFD",
        url: "https://wfdeaf.org/opening-ceremony-of-the-75th-anniversary-of-the-world-federation-of-the-deaf-italian-parliament/",
      },
    ],
  },
  {
    numero: 14,
    fecha: "2026-10-28",
    pais: "kazajistan",
    temas: ["leyes-y-derechos", "tecnologia"],
    titulo: "Kazajistán reconoce la lengua de señas como lengua propia",
    resumen:
      "Desde el 7 de septiembre de 2026, el Código Social de Kazajistán reconoce la lengua de señas como un sistema de lengua independiente. La nota también cuenta que un estudiante de 15 años creó una plataforma de IA que pasa voz y texto a videos en lengua de señas. La está probando con la Sociedad de Sordos de Kazajistán.",
    fuentes: [
      { medio: "The Times of Central Asia", url: "https://timesca.com/kazakh-student-ai-sign-language-translator/" },
    ],
  },
  {
    numero: 15,
    fecha: "2026-11-05",
    pais: "espana",
    temas: ["tecnologia", "interpretes-y-lsp"],
    titulo: "España: la radio pública llega a la televisión con subtítulos y lengua de signos",
    resumen:
      "Desde el 5 de noviembre, «RNE Accesible» transmite Radio Nacional de España por la televisión (TDT) con subtítulos en directo, intérprete de lengua de signos e imagen del estudio. Al inicio, los subtítulos cubren el 60 % de la programación. También se puede ver en RTVE Play y en la web de RNE.",
    fuentes: [
      {
        medio: "Red Inclusiva",
        url: "https://redinclusiva.com/actualidad/rne-accesible-asi-llega-a-la-tdt-la-radio-con-subtitulos-y-lengua-de-signos-para-personas-sordas",
      },
    ],
  },
  {
    numero: 16,
    fecha: "2026-11-06",
    pais: "espana",
    temas: ["educacion", "interpretes-y-lsp"],
    titulo: "España: personas Sordas salen a la calle para pedir intérpretes en las aulas",
    resumen:
      "En Ponferrada, la Asociación de Personas Sordas de El Bierzo se concentró frente a un instituto. La familia de una alumna Sorda pide 30 horas semanales de intérprete de lengua de signos. Su lema: «Aprender en silencio no es una opción». Piden a la Consejería de Educación que actúe con urgencia.",
    fuentes: [
      { medio: "Heraldo de León", url: "https://www.heraldodeleon.es/el-bierzo/ponferrada-pide-calle/20261106145459116611.html" },
    ],
  },];

// Las más nuevas primero, por fecha (el número es el orden en que las agregamos).
export const noticiasRecientes = (lista: Noticia[] = NOTICIAS) =>
  [...lista].sort((a, b) => b.fecha.localeCompare(a.fecha) || b.numero - a.numero);

export const nombrePais = (slug: Pais) => PAISES.find((p) => p.slug === slug)!.nombre;
export const nombreTema = (slug: Tema) => TEMAS.find((t) => t.slug === slug)!.nombre;

export const regionDe = (slug: Pais): Region => PAISES.find((p) => p.slug === slug)!.region;

// Un filtro es una región, un país o un tema; sus slugs no se repiten entre sí.
export type Filtro =
  | { tipo: "region"; slug: Region; nombre: string }
  | { tipo: "pais"; slug: Pais; nombre: string }
  | { tipo: "tema"; slug: Tema; nombre: string };

export const FILTROS: Filtro[] = [
  ...REGIONES.map((r) => ({ tipo: "region" as const, slug: r.slug, nombre: r.nombre })),
  ...PAISES.map((p) => ({ tipo: "pais" as const, slug: p.slug, nombre: p.nombre })),
  ...TEMAS.map((t) => ({ tipo: "tema" as const, slug: t.slug, nombre: t.nombre })),
];

const coincide = (n: Noticia, f: Filtro) =>
  f.tipo === "region"
    ? regionDe(n.pais) === f.slug
    : f.tipo === "pais"
      ? n.pais === f.slug
      : n.temas.includes(f.slug);

export const noticiasDe = (f: Filtro) => noticiasRecientes(NOTICIAS.filter((n) => coincide(n, f)));

// Solo los filtros que tienen al menos una noticia: no se publican páginas vacías.
export const filtrosConNoticias = () => FILTROS.filter((f) => noticiasDe(f).length > 0);

// Un filtro sin noticias no existe como página (da 404).
export const filtroPorSlug = (slug: string) => filtrosConNoticias().find((f) => f.slug === slug);

// Apps, funciones del celular y servicios que ya existen para personas Sordas.
// Solo entradas con fuente oficial verificada (revisado el 23/10/2026). Cada
// dato sale de la página enlazada en `fuente`; lo que no se pudo confirmar va
// en `nota` o no se publica. Las notas de la investigación están en
// research_notes/Herramientas digitales para personas Sordas/.

import { HERRAMIENTAS } from "./herramientas";

export const FECHA_REVISION = "23 de octubre de 2026";

// Guía para leer en subtítulos un en vivo (Kick, X, Twitch, YouTube...) que no los trae.
export type Dispositivo = {
  id: string;
  equipo: string;
  funcion: string;
  pasos: string[];
  idioma: string;
  fuente: string;
};

export const GUIA_EN_VIVO: Dispositivo[] = [
  {
    id: "windows",
    equipo: "Windows 11",
    funcion: "Subtítulos en directo",
    pasos: [
      "Presiona a la vez las teclas Windows + Ctrl + L.",
      "La primera vez, acepta y descarga el idioma: elige Español (México) o Español (España).",
      "Abre el en vivo en cualquier página o app. Los subtítulos salen en una barra arriba de la pantalla.",
    ],
    idioma:
      "Español de México y de España. Funciona sin internet una vez descargado. Solo escribe la voz: no la música.",
    fuente: "https://support.microsoft.com/es-es/windows/b52da59c-14b8-4031-aeeb-f6a47e6055df",
  },
  {
    id: "chrome",
    equipo: "Chrome en la computadora",
    funcion: "Subtitulado instantáneo",
    pasos: [
      "En Chrome, abre Más (los tres puntos) > Configuración > Accesibilidad.",
      "Activa Subtitulado instantáneo.",
      "En Administrar idiomas, selecciona Agregar idiomas y elige español si aparece.",
    ],
    idioma:
      "Solo subtitula lo que suena dentro de Chrome. Google no publica la lista de idiomas para computadora: si no ves español, usa Windows 11.",
    fuente: "https://support.google.com/chrome/answer/10538231?hl=es-419",
  },
  {
    id: "android",
    equipo: "Android",
    funcion: "Subtitulado instantáneo",
    pasos: [
      "Presiona el botón de volumen.",
      "Debajo de los controles de volumen, presiona Más > Subtitulado instantáneo > Listo.",
      "Si no aparece, busca «Subtitulado instantáneo» en Configuración y actívalo.",
    ],
    idioma:
      "Español en Pixel 4 en adelante y en algunos celulares Android. La primera vez necesitas wifi para descargar el idioma.",
    fuente: "https://support.google.com/accessibility/android/answer/9350862?hl=es-419",
  },
  {
    id: "iphone",
    equipo: "iPhone",
    funcion: "Subtítulos en vivo",
    pasos: [
      "Abre la app Configuración.",
      "Ve a Accesibilidad > Subtítulos en vivo y actívalos.",
      "El iPhone escribe la voz de cualquier app, como FaceTime, y de quienes hablan a tu alrededor.",
    ],
    idioma:
      "En iPhone 11 o más nuevo. En español de México, España y Estados Unidos con iOS 27. Apple pide no confiar en ellos en una emergencia.",
    fuente: "https://support.apple.com/es-lamr/guide/iphone/iphe0990f7bb/ios",
  },
];

// Idiomas de Subtítulos en vivo del iPhone, por versión de iOS.
export const FUENTE_IDIOMAS_IPHONE =
  "https://www.apple.com/ios/feature-availability/#accessibility-live-captions";

export type App = {
  nombre: string;
  descripcion: string;
  plataforma: string;
  costo: string;
  // Enlace para usarla, descargarla o ver cómo activarla.
  url: string;
  // Texto del enlace.
  enlace: string;
  // Página oficial donde se verificó la información.
  fuente: string;
  pasos?: string[];
  nota?: string;
  // Herramienta de Puente LSP (enlace interno).
  propia?: boolean;
};

export type Categoria = {
  id: string;
  titulo: string;
  texto: string;
  apps: App[];
};

// Herramienta propia, con el mismo texto que en /herramientas.
function propia(href: string): App {
  const h = HERRAMIENTAS.find((x) => x.href === href);
  if (!h) throw new Error(`No existe la herramienta ${href}`);
  return {
    nombre: `${h.titulo}, de Puente LSP`,
    descripcion: h.texto,
    plataforma: "Celular o computadora, en el navegador",
    costo: "Gratis",
    url: h.href,
    enlace: "Abrir",
    fuente: h.href,
    propia: true,
  };
}

export const CATEGORIAS: Categoria[] = [
  {
    id: "conversar",
    titulo: "Conversar y leer lo que se dice",
    texto: "La voz de las personas, en texto en tu pantalla.",
    apps: [
      {
        nombre: "Transcripción instantánea (Live Transcribe), de Google",
        descripcion:
          "Pasa a texto lo que dicen las personas a tu alrededor, en tiempo real. Puede vibrar cuando alguien dice tu nombre.",
        plataforma: "Android",
        costo: "Gratis",
        url: "https://play.google.com/store/apps/details?id=com.google.audio.hearing.visualization.accessibility.scribe",
        enlace: "Descargar en Google Play",
        fuente:
          "https://play.google.com/store/apps/details?id=com.google.audio.hearing.visualization.accessibility.scribe&hl=es_419",
        nota: "Más de 80 idiomas y dialectos. Sin internet solo funciona en algunos celulares.",
      },
      propia("/herramientas/conversacion"),
      {
        nombre: "Transcripción de notas de voz de WhatsApp",
        descripcion: "WhatsApp puede mostrar en texto los audios que te mandan.",
        plataforma: "WhatsApp",
        costo: "Gratis",
        url: "https://faq.whatsapp.com/241617298315321",
        enlace: "Cómo activarla",
        fuente: "https://faq.whatsapp.com/241617298315321",
        nota: "Revisa en tu celular si el español aparece en la lista de idiomas.",
      },
    ],
  },
  {
    id: "alertas",
    titulo: "Avisos de sonidos en casa",
    texto: "El timbre, una alarma o un bebé que llora, en avisos que se ven o se sienten.",
    apps: [
      {
        nombre: "Notificaciones de sonidos, de Google",
        descripcion:
          "El celular escucha y te avisa con vibración, luz o mensaje cuando suena una alarma de humo, el timbre, un bebé que llora, un perro que ladra o agua que corre.",
        plataforma: "Android",
        costo: "Gratis",
        url: "https://support.google.com/accessibility/android/answer/10092548?hl=es-419",
        enlace: "Cómo activarlas",
        fuente: "https://support.google.com/accessibility/android/answer/10092548?hl=es-419",
        pasos: [
          "Abre Configuración > Accesibilidad > Notificaciones de sonidos.",
          "Presiona Abrir Notificaciones de sonidos y acepta los permisos.",
          "Si no aparece, descarga la app Transcripción instantánea y notificaciones.",
        ],
        nota: "Usa más batería porque escucha todo el tiempo.",
      },
      {
        nombre: "Notificaciones con flash (Android)",
        descripcion: "La linterna o la pantalla destellan cuando llega una notificación.",
        plataforma: "Android",
        costo: "Gratis, ya viene en el celular",
        url: "https://support.google.com/accessibility/android/answer/14112710?hl=es-419",
        enlace: "Cómo activarlas",
        fuente: "https://support.google.com/accessibility/android/answer/14112710?hl=es-419",
        pasos: [
          "Abre Configuración > Notificaciones > Notificaciones con flash.",
          "Activa Flash de la cámara, Flash de pantalla o los dos.",
        ],
        nota: "El flash de la cámara no está en todos los celulares. Si la luz que parpadea te molesta o te hace daño, úsalo con cuidado.",
      },
      propia("/herramientas/alerta-visual"),
    ],
  },
  {
    id: "senas",
    titulo: "Diccionarios de lengua de señas",
    texto: "Para buscar una seña. Ojo: cada país tiene su propia lengua de señas.",
    apps: [
      {
        nombre: "Spreadthesign",
        descripcion: "Diccionario en video con señas de muchos países. La página está en español.",
        plataforma: "Web",
        costo: "Costo no confirmado",
        url: "https://www.spreadthesign.com/es.es/search/",
        enlace: "Ir al diccionario",
        fuente: "https://www.spreadthesign.com/es.es/search/",
        nota: "No pudimos confirmar que incluya la Lengua de Señas Peruana. Revisa el país de cada seña.",
      },
    ],
  },
];

export type Servicio = {
  nombre: string;
  descripcion: string;
  url?: string;
  enlace?: string;
  fuente: string;
  nota?: string;
  propia?: boolean;
};

export type Pais = {
  id: string;
  pais: string;
  resumen: string;
  servicios: Servicio[];
};

// Servicio propio a partir de la herramienta.
function servicioPropio(href: string): Servicio {
  const { nombre, descripcion, url, enlace, fuente } = propia(href);
  return { nombre, descripcion, url, enlace, fuente, propia: true };
}

export const PAISES: Pais[] = [
  {
    id: "peru",
    pais: "Perú",
    resumen:
      "Todavía no encontramos un servicio público de intérprete por videollamada ni un canal oficial por mensaje de texto o video para llamar al 105, al 116 o al 106. Mientras tanto, esto sí existe:",
    servicios: [
      {
        nombre: "Registro de la persona con discapacidad (CONADIS), en línea",
        descripcion:
          "Plataforma virtual para inscribirte en el Registro Nacional de la Persona con Discapacidad.",
        url: "https://sirnpdpide.conadisperu.gob.pe",
        enlace: "Ir a la plataforma",
        fuente: "https://sirnpdpide.conadisperu.gob.pe",
      },
      {
        nombre: "Ley N.° 32724: intérprete o subtítulos en la televisión",
        descripcion:
          "Publicada el 10 de julio de 2026. Los canales de TV deben poner intérprete de LSP o subtítulos en noticieros, mensajes oficiales, emergencias y debates electorales.",
        url: "https://busquedas.elperuano.pe/dispositivo/NL/2533576-3",
        enlace: "Leer la ley",
        fuente: "https://busquedas.elperuano.pe/dispositivo/NL/2533576-3",
        nota: "No encontramos todavía su reglamento.",
      },
      servicioPropio("/herramientas/tarjeta"),
      servicioPropio("/herramientas/carta"),
    ],
  },
  {
    id: "colombia",
    pais: "Colombia",
    resumen: "Lengua de Señas Colombiana.",
    servicios: [
      {
        nombre: "Diccionario de Lengua de Señas Colombiana (INSOR)",
        descripcion:
          "Diccionario bilingüe en video. Se busca por palabra, forma de la mano, región o tema.",
        url: "https://educativo.insor.gov.co/diccionario",
        enlace: "Ir al diccionario",
        fuente: "https://educativo.insor.gov.co/diccionario",
      },
      {
        nombre: "Centro de Relevo (MinTIC)",
        descripcion:
          "Servicio de intérpretes para que personas Sordas llamen a personas oyentes y al revés.",
        fuente:
          "https://www.mintic.gov.co/portal/inicio/Sala-de-prensa/Noticias/399452:Este-ano-el-Centro-de-Relevo-gestiono-516-523-llamadas-relevadas-para-la-poblacion-con-discapacidad-auditiva",
        nota: "El MinTIC informó que funcionó en 2024. No pudimos confirmar cómo usarlo hoy: su antigua web no responde.",
      },
    ],
  },
  {
    id: "uruguay",
    pais: "Uruguay",
    resumen: "Lengua de Señas Uruguaya (LSU).",
    servicios: [
      {
        nombre: "Centro de Interpretación Virtual (MIDES)",
        descripcion:
          "Videollamada con intérprete de LSU para consultas y trámites del Ministerio de Desarrollo Social, en todo el país.",
        url: "https://www.gub.uy/ministerio-desarrollo-social/node/10785",
        enlace: "Ir al sitio",
        fuente: "https://www.gub.uy/ministerio-desarrollo-social/node/10785",
      },
    ],
  },
  {
    id: "brasil",
    pais: "Brasil",
    resumen: "Lengua de Señas Brasileña (Libras).",
    servicios: [
      {
        nombre: "VLibras (Gobierno de Brasil)",
        descripcion:
          "Programa gratuito y libre que traduce textos del portugués a Libras con un personaje animado.",
        url: "https://www.gov.br/acessibilidade/pt-br/vlibras",
        enlace: "Ir al sitio",
        fuente: "https://www.gov.br/acessibilidade/pt-br/vlibras",
        nota: "Es un avatar, no una persona: no reemplaza a un intérprete.",
      },
    ],
  },
  {
    id: "espana",
    pais: "España",
    resumen: "Lengua de Signos Española (LSE).",
    servicios: [
      {
        nombre: "SVIsual",
        descripcion:
          "Llamadas entre personas Sordas y oyentes con intérprete por videollamada, o por texto. Gratis para quien lo usa y abierto las 24 horas.",
        url: "https://www.svisual.org/",
        enlace: "Ir al sitio",
        fuente: "https://www.svisual.org/",
      },
    ],
  },
];

// Postura de la Federación Mundial de Sordos (WFD) y de WASLI sobre los avatares.
export const FUENTE_AVATARES =
  "https://wfdeaf.org/wp-content/uploads/WFD-and-WASLI-Statement-on-Avatar-FINAL-14032018-Updated-14042018.pdf";

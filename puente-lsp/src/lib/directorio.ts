// Directorio de la comunidad Sorda y la LSP en Perú. Solo entradas con una
// fuente verificada (revisado el 21/10/2026). Las redes sociales se agregan
// solo si se encontraron en la página oficial. No se incluyen cuentas
// personales de particulares.

export type Enlace = { texto: string; url: string };

export type Entrada = {
  nombre: string;
  descripcion: string;
  lugar?: string;
  enlaces: Enlace[];
  // Dónde se verificó la información.
  fuente: string;
  // Aviso cuando el dato puede haber cambiado.
  nota?: string;
};

export type Grupo = { id: string; titulo: string; texto: string; entradas: Entrada[] };

export const DIRECTORIO: Grupo[] = [
  {
    id: "organizaciones",
    titulo: "Organizaciones",
    texto: "Asociaciones de personas Sordas y de intérpretes de LSP.",
    entradas: [
      {
        nombre: "Núcleo Somos",
        descripcion:
          "Asociación Nacional de Intérpretes Sordos y Oyentes de LSP. Trabaja por la igualdad y la inclusión entre la comunidad Sorda y la oyente.",
        enlaces: [
          { texto: "Web", url: "https://nucleosomos.org.pe/" },
          { texto: "Instagram", url: "http://instagram.com/nucleo.somos" },
          { texto: "Facebook", url: "https://www.facebook.com/profile.php?id=100086980453518" },
          { texto: "YouTube", url: "https://www.youtube.com/@nucleosomos" },
          { texto: "X", url: "https://x.com/nucleosomos" },
          { texto: "Contacto", url: "https://nucleosomos.org.pe/contacto/" },
        ],
        fuente: "https://nucleosomos.org.pe/organizacion/",
      },
      {
        nombre: "Federación Nacional de Sordos del Perú (FENASOP)",
        descripcion:
          "Federación nacional de personas Sordas. Participa en el debate público sobre los derechos de la comunidad Sorda.",
        enlaces: [],
        fuente:
          "https://comunicaciones.congreso.gob.pe/noticias/piden-resguardar-derechos-de-la-comunidad-sorda-del-pais",
        nota: "No encontramos su web oficial.",
      },
      {
        nombre: "Asociación de Sordos Región Lima (ASSORELI)",
        descripcion:
          "Asociación de personas Sordas de Lima. Firmó un convenio con CONADIS que incluye capacitaciones en LSP.",
        lugar: "Lima",
        enlaces: [],
        fuente:
          "https://cdn.www.gob.pe/uploads/document/file/3887987/CONVENIO%20ASSORELI.pdf.pdf",
        nota: "No encontramos su web oficial.",
      },
    ],
  },
  {
    id: "aprender",
    titulo: "Aprender LSP",
    texto: "Cursos y materiales para empezar a aprender Lengua de Señas Peruana.",
    entradas: [
      {
        nombre: "Introducción a la Lengua de Señas Peruana 1 (Becas Grupo Romero)",
        descripcion:
          "Curso virtual con certificado: saludos, abecedario, números y vocabulario básico de familia, emociones, colores y más.",
        enlaces: [{ texto: "Ir a la plataforma", url: "https://lms.becasgruporomero.pe" }],
        fuente: "https://lms.becasgruporomero.pe",
        nota: "Hay que registrarse en la plataforma para ver el curso.",
      },
      {
        nombre: "Señas de Progreso (Fundación Romero y CONADIS)",
        descripcion:
          "Programa de becas en cursos virtuales en LSP para personas con discapacidad auditiva inscritas en el registro de CONADIS.",
        enlaces: [
          {
            texto: "Nota de Andina",
            url: "https://andina.pe/agencia/noticia-tienes-discapacidad-auditiva-ofrecen-100-mil-becas-estudios-para-ti-939495.aspx",
          },
        ],
        fuente:
          "https://andina.pe/agencia/noticia-tienes-discapacidad-auditiva-ofrecen-100-mil-becas-estudios-para-ti-939495.aspx",
        nota: "Confirma si la convocatoria sigue abierta.",
      },
      {
        nombre: "Guía de LSP del Ministerio de Educación",
        descripcion:
          "Lengua de señas peruana: guía para el aprendizaje de la lengua de señas peruana, vocabulario básico (Minedu, 2015). Descarga gratuita.",
        enlaces: [
          { texto: "Repositorio del Minedu", url: "https://repositorio.minedu.gob.pe/handle/20.500.12799/5545" },
        ],
        fuente: "https://repositorio.minedu.gob.pe/handle/20.500.12799/5545",
      },
    ],
  },
  {
    id: "estado",
    titulo: "Instituciones públicas",
    texto: "Entidades del Estado vinculadas a la inclusión y a la LSP.",
    entradas: [
      {
        nombre: "CONADIS",
        descripcion:
          "Consejo Nacional para la Integración de la Persona con Discapacidad. Lleva el registro de personas con discapacidad y trabaja en la formación de intérpretes de LSP.",
        enlaces: [{ texto: "gob.pe/conadis", url: "https://www.gob.pe/conadis" }],
        fuente:
          "https://andina.pe/agencia/noticia-minedu-y-conadis-unen-esfuerzos-para-fortalecer-formacion-interpretes-lengua-sena-1046891.aspx",
      },
      {
        nombre: "Ministerio de Educación y CONADIS: formación de intérpretes",
        descripcion:
          "Acuerdo de octubre de 2025 para mejorar la formación de intérpretes de LSP y definir el perfil de egreso.",
        enlaces: [
          {
            texto: "Nota de Andina",
            url: "https://andina.pe/agencia/noticia-minedu-y-conadis-unen-esfuerzos-para-fortalecer-formacion-interpretes-lengua-sena-1046891.aspx",
          },
        ],
        fuente:
          "https://andina.pe/agencia/noticia-minedu-y-conadis-unen-esfuerzos-para-fortalecer-formacion-interpretes-lengua-sena-1046891.aspx",
      },
    ],
  },
  {
    id: "investigacion",
    titulo: "Investigación",
    texto: "Proyectos académicos sobre la LSP.",
    entradas: [
      {
        nombre: "PUCP: gramática y diccionario de LSP",
        descripcion:
          "Proyecto de la Pontificia Universidad Católica del Perú para elaborar una gramática y un diccionario de la LSP, a cargo del profesor Miguel Rodríguez Mondoñedo.",
        lugar: "Lima",
        enlaces: [
          { texto: "Página del profesor", url: "https://www.pucp.edu.pe/profesor/miguel-rodriguez-mondonedo" },
          {
            texto: "Nota sobre el diccionario",
            url: "https://gestion.pe/tecnologia/un-diccionario-peruano-traduce-espanol-en-lengua-de-senas-y-viceversa-mediante-la-ia-peru-inteligencia-artificial-tecnologia-pucp-discapacidad-inei-noticia/",
          },
        ],
        fuente: "https://www.pucp.edu.pe/profesor/miguel-rodriguez-mondonedo",
      },
    ],
  },
  {
    id: "colegios",
    titulo: "Educación para personas Sordas",
    texto: "Centros de Educación Básica Alternativa (CEBA) con atención en lengua de señas en Lima.",
    entradas: [
      { nombre: "CEBA Paeba Villa El Salvador", descripcion: "Centro de educación básica alternativa.", lugar: "Villa El Salvador, Lima", enlaces: [], fuente: "https://www.infobae.com/peru/2023/05/17/cuales-son-los-colegios-especializados-para-personas-con-discapacidad-auditiva-en-peru/" },
      { nombre: "CEBA 0040 Hipólito Unanue", descripcion: "Centro de educación básica alternativa.", lugar: "Breña, Lima", enlaces: [], fuente: "https://www.infobae.com/peru/2023/05/17/cuales-son-los-colegios-especializados-para-personas-con-discapacidad-auditiva-en-peru/" },
      { nombre: "CEBA 2048 José Carlos Mariátegui", descripcion: "Centro de educación básica alternativa.", lugar: "Comas, Lima", enlaces: [], fuente: "https://www.infobae.com/peru/2023/05/17/cuales-son-los-colegios-especializados-para-personas-con-discapacidad-auditiva-en-peru/" },
      { nombre: "CEBA 1137 José Antonio Encinas", descripcion: "Centro de educación básica alternativa.", lugar: "Santa Anita, Lima", enlaces: [], fuente: "https://www.infobae.com/peru/2023/05/17/cuales-son-los-colegios-especializados-para-personas-con-discapacidad-auditiva-en-peru/" },
    ],
  },
];

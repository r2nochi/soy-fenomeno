// Comunidad y trabajos fuera del Perú. Las páginas de Perú siguen en
// directorio.ts y en /trabajos. Solo entradas con fuente verificada (revisado
// el 08/11/2026): un país sin datos confirmados no aparece en esa sección.
// Las redes sociales se agregan solo si están en la página oficial.

import type { Grupo } from "./directorio";

export const PAISES_RECURSOS = [
  { slug: "colombia", nombre: "Colombia" },
  { slug: "chile", nombre: "Chile" },
  { slug: "mexico", nombre: "México" },
  { slug: "argentina", nombre: "Argentina" },
] as const;

export type PaisRecurso = (typeof PAISES_RECURSOS)[number]["slug"];

export type Portal = {
  nombre: string;
  texto: string;
  url: string;
  tipo: "inclusivo" | "estado";
};

export const COMUNIDAD_POR_PAIS: Partial<Record<PaisRecurso, Grupo[]>> = {
  colombia: [
    {
      id: "organizaciones",
      titulo: "Organizaciones",
      texto: "Asociaciones de personas Sordas.",
      entradas: [
        {
          nombre: "Federación Nacional de Sordos de Colombia (FENASCOL)",
          descripcion:
            "Agrupa a más de 30 asociaciones de personas Sordas de todo el país y es parte de la Federación Mundial de Sordos. Tiene un Centro de Relevo para comunicarse con personas oyentes.",
          enlaces: [
            { texto: "Web", url: "https://fenascol.org.co/" },
            { texto: "Centro de Relevo", url: "https://fenascol.org.co/centro-de-relevo/" },
          ],
          fuente: "https://fenascol.org.co/",
          nota: "No encontramos los horarios del Centro de Relevo. Confírmalos en su web.",
        },
      ],
    },
    {
      id: "instituciones",
      titulo: "Instituciones",
      texto: "Entidades públicas.",
      entradas: [
        {
          nombre: "Instituto Nacional para Sordos (INSOR)",
          descripcion:
            "Entidad pública colombiana. Tiene contenidos en Lengua de Señas Colombiana, un glosario y el registro nacional de intérpretes.",
          lugar: "Bogotá",
          enlaces: [
            { texto: "Web", url: "https://www.insor.gov.co/" },
            { texto: "Glosario", url: "https://www.insor.gov.co/home/glosario/" },
            { texto: "Insor Educativo", url: "https://educativo.insor.gov.co/" },
          ],
          fuente: "https://www.insor.gov.co/",
        },
      ],
    },
  ],
  chile: [
    {
      id: "organizaciones",
      titulo: "Organizaciones",
      texto: "Asociaciones de personas Sordas.",
      entradas: [
        {
          nombre: "Asociación de Sordos de Chile (ASOCH)",
          descripcion:
            "Asociación de personas Sordas de Chile. En 2019 opinó públicamente sobre la interpretación en lengua de señas en una conferencia del gobierno.",
          enlaces: [],
          fuente: "https://www.cnnchile.com/pais/asoch-critica-interprete-lengua-de-senas_20191126/",
          nota: "No encontramos su web oficial ni noticias recientes.",
        },
      ],
    },
    {
      id: "aprender",
      titulo: "Aprender lengua de señas",
      texto: "Cursos y materiales de Lengua de Señas Chilena.",
      entradas: [
        {
          nombre: "Fundación Sordos Chilenos",
          descripcion:
            "Institución sin fines de lucro por la inclusión de las personas Sordas. Tiene escuela de Lengua de Señas Chilena, servicio de intérpretes y un glosario.",
          enlaces: [
            { texto: "Web", url: "https://www.sordoschilenos.cl/" },
            { texto: "Glosario LSCh", url: "https://glosariolsch.cl/" },
            { texto: "Contacto", url: "https://www.sordoschilenos.cl/contactenos" },
          ],
          fuente: "https://www.sordoschilenos.cl/",
        },
      ],
    },
    {
      id: "instituciones",
      titulo: "Instituciones",
      texto: "Entidades públicas.",
      entradas: [
        {
          nombre: "Servicio Nacional de la Discapacidad (Senadis)",
          descripcion: "Servicio público de Chile para las personas con discapacidad.",
          enlaces: [{ texto: "Web", url: "https://www.senadis.gob.cl/" }],
          fuente: "https://www.senadis.gob.cl/",
        },
      ],
    },
  ],
  argentina: [
    {
      id: "organizaciones",
      titulo: "Organizaciones",
      texto: "Asociaciones de personas Sordas.",
      entradas: [
        {
          nombre: "Confederación Argentina de Sordos (CAS)",
          descripcion:
            "Organización nacional que defiende los derechos de las personas Sordas. Reúne a 30 asociaciones y tiene materiales bilingües en Lengua de Señas Argentina y español.",
          enlaces: [{ texto: "Web", url: "https://cas.org.ar/" }],
          fuente: "https://www.cas.org.ar/",
        },
      ],
    },
  ],
};

export const TRABAJOS_POR_PAIS: Record<PaisRecurso, Portal[]> = {
  colombia: [
    {
      nombre: "Incluyeme.com Colombia",
      texto: "Portal de empleo para personas con discapacidad. Registrarte es gratis.",
      url: "https://www.incluyeme.com.co/trabajos/",
      tipo: "inclusivo",
    },
    {
      nombre: "Servicio Público de Empleo",
      texto: "Portal de empleo del Estado colombiano.",
      url: "https://www.serviciodeempleo.gov.co/",
      tipo: "estado",
    },
  ],
  chile: [
    {
      nombre: "Incluyeme.com Chile",
      texto: "Portal de empleo para personas con discapacidad. Registrarte es gratis.",
      url: "https://www.incluyemechile.cl/trabajos/",
      tipo: "inclusivo",
    },
    {
      nombre: "Bolsa Nacional de Empleo (BNE)",
      texto: "Portal de empleo del Estado de Chile.",
      url: "https://www.bne.cl/",
      tipo: "estado",
    },
  ],
  mexico: [
    {
      nombre: "Incluyeme.com México",
      texto: "Portal de empleo para personas con discapacidad.",
      url: "https://www.incluyeme.com.mx/trabajos/",
      tipo: "inclusivo",
    },
    {
      nombre: "Portal del Empleo",
      texto: "Portal de empleo del Gobierno de México.",
      url: "https://www.empleo.gob.mx/",
      tipo: "estado",
    },
  ],
  argentina: [
    {
      nombre: "Incluyeme.com Argentina",
      texto: "Portal de empleo para personas con discapacidad.",
      url: "https://www.incluyeme.com.ar/trabajos/",
      tipo: "inclusivo",
    },
    {
      nombre: "Buscás trabajo",
      texto: "Página de empleo del Gobierno de Argentina.",
      url: "https://www.argentina.gob.ar/trabajo/buscastrabajo",
      tipo: "estado",
    },
  ],
};

export const paisRecurso = (slug: string) => PAISES_RECURSOS.find((p) => p.slug === slug);

// Países que tienen contenido en cada sección.
export const paisesComunidad = () => PAISES_RECURSOS.filter((p) => COMUNIDAD_POR_PAIS[p.slug]);
export const paisesTrabajos = () => [...PAISES_RECURSOS];

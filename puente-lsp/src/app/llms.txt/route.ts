// Resumen del sitio para asistentes de IA y buscadores que lo leen (formato llms.txt).
import { ARTICULOS } from "@/lib/blog";
import { HERRAMIENTAS } from "@/lib/herramientas";
import { DESCRIPCION_SITIO, NOMBRE_SITIO, urlAbsoluta } from "@/lib/seo";

export function GET() {
  const herramientas = HERRAMIENTAS.map(
    (h) => `- [${h.titulo}](${urlAbsoluta(h.href)}): ${h.texto}`,
  );
  const articulos = ARTICULOS.map(
    (a) => `- [${a.titulo}](${urlAbsoluta(`/blog/${a.slug}`)}): ${a.resumen}`,
  );

  const texto = `# ${NOMBRE_SITIO}

> ${DESCRIPCION_SITIO}

Sitio gratuito, hecho en el Perú, en español sencillo. No usamos avatares de IA para señas: la Lengua de Señas Peruana (LSP) la deben hacer personas.

## Herramientas

${herramientas.join("\n")}

## Secciones

- [Intérprete de LSP por videollamada](${urlAbsoluta("/interprete")}): lista de interesados del piloto gratuito.
- [Trabajos para personas con discapacidad](${urlAbsoluta("/trabajos")}): empleos por área en el Perú.
- [Comunidad](${urlAbsoluta("/comunidad")}): organizaciones Sordas, cursos de LSP e instituciones.
- [Privacidad](${urlAbsoluta("/privacidad")}): qué datos se guardan y cómo pedir que se borren.

## Blog

${articulos.join("\n")}
`;

  return new Response(texto, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

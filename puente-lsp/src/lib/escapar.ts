// Protecciones para texto que se inserta en etiquetas <script> o en XML.

// Datos estructurados (JSON-LD): el "<" se escapa para que el texto no pueda
// cerrar la etiqueta <script>.
export const jsonLd = (datos: object) =>
  JSON.stringify(datos).replace(/</g, "\\u003c");

// Texto dentro de un documento XML (feed RSS).
export const escaparXml = (texto: string) =>
  texto
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

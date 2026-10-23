import { jsonLd } from "@/lib/escapar";

// Datos para buscadores (schema.org en JSON-LD). No se ven en la página.
export function DatosEstructurados({ datos }: { datos: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLd(datos) }}
    />
  );
}

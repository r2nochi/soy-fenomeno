// Configuración general del sitio: navegación y redes sociales.

// Sin barra final; una variable vacía usa el dominio de Vercel.
export const URL_SITIO = (
  process.env.NEXT_PUBLIC_URL_SITIO || "https://puente-lsp.vercel.app"
).replace(/\/+$/, "");

export const NAVEGACION = [
  { href: "/interprete", texto: "Pedir intérprete" },
  { href: "/herramientas/alerta-visual", texto: "Alerta Visual" },
  { href: "/blog", texto: "Blog" },
  { href: "/#comunidad", texto: "Comunidad" },
] as const;

// Enlaces de las redes de la comunidad. Cuando exista una cuenta, se pega su
// enlace completo aquí y el botón aparece solo en el sitio. Sin enlace, la red
// se muestra como "pronto" y sin enlace (nunca se inventan cuentas).
export const REDES: { nombre: string; url: string | null }[] = [
  { nombre: "TikTok", url: null },
  { nombre: "YouTube", url: null },
  { nombre: "Instagram", url: null },
  { nombre: "Facebook", url: null },
];

const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP;
// Enlace a WhatsApp con un mensaje ya escrito; null si no hay número configurado.
export const enlaceWhatsapp = (mensaje: string) =>
  whatsapp
    ? `https://wa.me/${whatsapp}?text=${encodeURIComponent(mensaje)}`
    : null;

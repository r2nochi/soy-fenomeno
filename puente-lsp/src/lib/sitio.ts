// Configuración general del sitio: navegación y redes sociales.

// Sin barra final; una variable vacía usa el dominio de Vercel.
export const URL_SITIO = (
  process.env.NEXT_PUBLIC_URL_SITIO || "https://puente-lsp.vercel.app"
).replace(/\/+$/, "");

// Primero lo que se usa para resolver algo hoy; después aprender, leer y conocernos.
export const NAVEGACION = [
  { href: "/interprete", texto: "Intérprete LSP" },
  { href: "/herramientas", texto: "Herramientas" },
  { href: "/lugares", texto: "Lugares" },
  { href: "/apps", texto: "Apps útiles" },
  { href: "/aprende", texto: "Aprende LSP" },
  { href: "/trabajos", texto: "Trabajos" },
  { href: "/derechos", texto: "Derechos" },
  { href: "/comunidad", texto: "Comunidad" },
  { href: "/blog", texto: "Blog" },
  { href: "/noticias", texto: "Noticias" },
  { href: "/nosotros", texto: "Nosotros" },
] as const;

// Enlaces de las redes de la comunidad. Cuando exista una cuenta, se pega su
// enlace completo aquí y el botón aparece solo en el sitio. Sin enlace, la red
// se muestra como "pronto" y sin enlace (nunca se inventan cuentas).
export const REDES: { nombre: string; url: string | null }[] = [
  { nombre: "TikTok", url: "https://www.tiktok.com/@puente.fenomenos" },
  { nombre: "YouTube", url: "https://www.youtube.com/channel/UCFvMrbBhF05RB7FOzB99wbQ" },
  { nombre: "Instagram", url: "https://www.instagram.com/puentefenomenolsp/" },
  { nombre: "X", url: "https://x.com/fenomenoslsp" },
  { nombre: "Facebook", url: null },
];

const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP;
// Enlace a WhatsApp con un mensaje ya escrito; null si no hay número configurado.
export const enlaceWhatsapp = (mensaje: string) =>
  whatsapp
    ? `https://wa.me/${whatsapp}?text=${encodeURIComponent(mensaje)}`
    : null;

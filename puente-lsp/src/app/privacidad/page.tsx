import type { Metadata } from "next";
import { metaPagina } from "@/lib/seo";
import Link from "next/link";
import { enlaceWhatsapp } from "@/lib/sitio";

export const metadata: Metadata = metaPagina({
  titulo: "Privacidad",
  descripcion:
    "Qué datos guarda Puente LSP, para qué, dónde y cómo pedir que los borremos.",
  ruta: "/privacidad",
});

const CONTACTO = enlaceWhatsapp("Hola, quiero ver, corregir o borrar mis datos en Puente LSP.");

// Texto de la Ley 29733 (Protección de Datos Personales) en lenguaje sencillo.
// Debe revisarlo el responsable del proyecto antes de inscribir el banco de datos.
const SECCIONES = [
  {
    titulo: "Lo que se queda en tu equipo",
    texto: [
      "La tarjeta de emergencia y el borrador de la carta se guardan solo en tu celular o computadora. La conversación cara a cara no se guarda: se borra al cerrar la página. Nada de esto llega a nosotros.",
      "Los subtítulos y la conversación usan el reconocimiento de voz del navegador: Chrome y Edge envían el audio a los servidores de Google o Microsoft para transcribirlo.",
      "Alerta Visual reconoce los sonidos en tu propio equipo.",
      "En Aprende LSP, el modo espejo usa la cámara solo para que te veas: no graba ni envía la imagen. Las señas que marcas como practicadas se guardan solo en tu equipo.",
    ],
  },
  {
    titulo: "Lo que sí guardamos",
    texto: [
      "Lo que escribes en tres formularios: la lista del piloto de intérpretes, el registro del Sello y la recomendación de un lugar.",
      "Lo usamos para contactarte y para publicar los lugares. El correo de un negocio nunca se muestra en la página.",
      "Para evitar abusos guardamos un código de tu conexión (no tu dirección IP). Se borra después de un día, cuando llega el siguiente envío.",
    ],
  },
  {
    titulo: "Cuántas personas nos visitan",
    texto: [
      "Contamos las visitas con Vercel Web Analytics para saber qué páginas sirven más. No usa cookies de terceros ni guarda tu dirección IP, y no sabe quién eres: solo vemos totales.",
      "Por cada visita se anota: la página que viste, desde qué página llegaste, tu país, región o ciudad aproximada, tu navegador, tu sistema y si usas celular, tableta o computadora.",
      "Para no contar dos veces a la misma persona se usa un código que se borra después de un día.",
    ],
  },
  {
    titulo: "Dónde se guarda",
    texto: [
      "Los datos están en Supabase, un servicio de base de datos con servidores en Estados Unidos. La página funciona en Vercel, que también guarda las estadísticas de visitas en servidores fuera del Perú. Son proveedores que procesan los datos por encargo nuestro.",
      "No vendemos ni compartimos tus datos con otras empresas.",
    ],
  },
  {
    titulo: "Cuánto tiempo",
    texto: [
      "Los datos de los formularios: mientras dure el piloto, o hasta que nos pidas borrarlos.",
      "Las estadísticas de visitas: las vemos durante un mes, según el plan gratuito de Vercel.",
    ],
  },
  {
    titulo: "Tus derechos",
    texto: [
      "Puedes pedir ver, corregir o borrar tus datos, o dejar de recibir mensajes. Escríbenos y lo hacemos.",
      "Si no te respondemos, puedes reclamar ante la Autoridad Nacional de Protección de Datos Personales del Ministerio de Justicia.",
    ],
  },
];

export default function Privacidad() {
  return (
    <main id="contenido" className="mx-auto w-full max-w-3xl flex-1 px-4 py-14 sm:px-8">
      <h1 className="text-5xl font-bold tracking-tight">Privacidad</h1>
      <p className="mt-4 text-2xl leading-snug text-suave">
        Qué datos guardamos, para qué y cómo pedir que los borremos.
      </p>
      {SECCIONES.map((s) => (
        <section key={s.titulo} className="mt-10">
          <h2 className="text-3xl font-bold">{s.titulo}</h2>
          {s.texto.map((t) => (
            <p key={t} className="mt-3 max-w-[65ch] text-xl leading-relaxed">
              {t}
            </p>
          ))}
        </section>
      ))}
      <p className="mt-10 text-xl">
        {CONTACTO ? (
          <a
            href={CONTACTO}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-acento underline underline-offset-4"
          >
            Escríbenos por WhatsApp
          </a>
        ) : (
          <Link href="/comunidad" className="font-bold text-acento underline underline-offset-4">
            Contáctanos
          </Link>
        )}{" "}
        para cualquier pedido sobre tus datos.
      </p>
    </main>
  );
}

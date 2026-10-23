// Imágenes que se ven al compartir un enlace (WhatsApp, Facebook, X…) y los
// íconos del sitio. Se generan al compilar, con la misma fuente de la página.

import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { SimboloPuente as Puente } from "@/components/SimboloPuente";
import { URL_SITIO } from "./sitio";

export const TAMANO_OG = { width: 1200, height: 630 };

const COLOR = {
  fondo: "#f3f5f9",
  texto: "#0f1729",
  suave: "#4a5468",
  acento: "#0b4fd1",
  blanco: "#ffffff",
};

// Rutas escritas completas para que Vercel incluya los archivos en el despliegue.
// Se leen al cargar el módulo: así Next genera las imágenes al compilar y no
// en cada visita.
const fuentes = Promise.all([
  readFile(join(process.cwd(), "src/assets/AtkinsonHyperlegible-Regular.ttf")),
  readFile(join(process.cwd(), "src/assets/AtkinsonHyperlegible-Bold.ttf")),
]);

export async function imagenOg(titulo: string, texto: string) {
  const [regular, negrita] = await fuentes;
  const dominio = new URL(URL_SITIO).host;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: COLOR.fondo,
          color: COLOR.texto,
          fontFamily: "Atkinson",
          borderLeft: `24px solid ${COLOR.acento}`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <Puente ancho={84} color={COLOR.acento} />
          <span style={{ fontSize: 40, fontWeight: 700 }}>Puente LSP</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: titulo.length > 40 ? 64 : 76,
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: -1,
            }}
          >
            {titulo}
          </div>
          <div style={{ fontSize: 34, lineHeight: 1.3, color: COLOR.suave }}>
            {texto}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 28,
            fontWeight: 700,
            color: COLOR.acento,
          }}
        >
          <span>Gratis · Para la comunidad Sorda del Perú</span>
          <span>{dominio}</span>
        </div>
      </div>
    ),
    {
      ...TAMANO_OG,
      fonts: [
        { name: "Atkinson", data: regular, weight: 400, style: "normal" },
        { name: "Atkinson", data: negrita, weight: 700, style: "normal" },
      ],
    },
  );
}

// Ícono: el puente blanco sobre azul, con margen para que sirva también como
// ícono "maskable" (Android lo recorta en círculo o en gota).
export function imagenIcono(lado: number) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: COLOR.acento,
        }}
      >
        <Puente ancho={Math.round(lado * 0.66)} color={COLOR.blanco} />
      </div>
    ),
    { width: lado, height: lado },
  );
}

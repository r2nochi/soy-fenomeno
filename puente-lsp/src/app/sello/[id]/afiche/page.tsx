import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import QRCode from "qrcode";
import { BotonImprimir } from "@/components/BotonImprimir";
import { Sello } from "@/components/Sello";
import { lugarPorId } from "@/lib/lugares";
import { URL_SITIO } from "@/lib/sitio";

// El afiche es para el lugar: no debe aparecer en buscadores.
export const metadata: Metadata = {
  title: "Afiche del Sello",
  robots: { index: false, follow: false },
};

// Al imprimir, solo sale el afiche: se oculta todo lo demás de la página.
// display:none (no visibility) para que no queden hojas en blanco.
const estiloImprimir = `
  @media print {
    @page { size: A4; margin: 12mm; }
    body > *:not(main) { display: none !important; }
    main { padding: 0 !important; max-width: none !important; }
    main > *:not(.afiche) { display: none !important; }
    .afiche {
      width: 186mm; margin: 0 auto; padding: 8mm !important;
      box-shadow: none !important; border: 2mm solid #0f1729 !important;
      break-inside: avoid; font-size: 14pt;
    }
    .afiche h1 { font-size: 30pt !important; }
    .afiche h2 { font-size: 20pt !important; }
    .afiche .sello-afiche { width: 45mm !important; height: 45mm !important; }
    .afiche .qr-afiche { width: 70mm !important; height: 70mm !important; }
  }
`;

export default function PaginaAfiche({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <main id="contenido" className="mx-auto w-full max-w-3xl flex-1 px-4 py-10 sm:px-8">
      <style>{estiloImprimir}</style>
      <Suspense fallback={<p className="text-xl text-suave">Preparando el afiche…</p>}>
        <Afiche params={params} />
      </Suspense>
    </main>
  );
}

async function Afiche({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const lugar = await lugarPorId(id);
  // Solo se imprime el afiche de un negocio que se registró como sello.
  if (!lugar || lugar.tipo !== "sello") notFound();

  const enlace = `${URL_SITIO}/s/${lugar.id}`;
  // El QR apunta a una URL que construimos aquí; el SVG lo genera la librería.
  const qrSvg = await QRCode.toString(enlace, {
    type: "svg",
    errorCorrectionLevel: "M",
    margin: 1,
    color: { dark: "#0f1729", light: "#ffffff" },
  });

  return (
    <>
      <div className="no-imprimir mb-8 space-y-4">
        <p className="text-xl text-suave">
          Imprime este afiche y ponlo a la vista de tus clientes. Es un
          compromiso de tu lugar, no una certificación oficial del Estado.
        </p>
        <BotonImprimir />
      </div>

      <article className="afiche mx-auto flex flex-col items-center rounded-[28px] border-[3px] border-tinta bg-white p-8 text-center text-tinta sm:p-12">
        <Sello className="sello-afiche size-44" />
        <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight">
          Aquí atendemos a personas Sordas
        </h1>
        <p className="mt-3 break-words text-3xl font-bold">{lugar.nombre}</p>

        <h2 className="mt-8 text-3xl font-bold">Escanea para conversar</h2>
        <div
          role="img"
          aria-label={`Código QR. Lleva a la página para conversar con ${lugar.nombre}. Enlace: ${enlace}`}
          className="qr-afiche mt-4 size-64 [&>svg]:size-full"
          // El SVG lo genera la librería qrcode a partir de nuestra URL.
          dangerouslySetInnerHTML={{ __html: qrSvg }}
        />
        <p className="mt-4 break-all text-lg">{enlace}</p>

        <p className="mt-8 max-w-xl text-lg">
          La persona escanea el código con su celular y escribe lo que necesita.
          Tú le respondes escribiendo o con la pantalla.
        </p>

        <p className="mt-8 border-t-2 border-tinta/25 pt-4 text-base">
          Puente LSP · Herramientas gratuitas para la comunidad Sorda del Perú.
          Este sello es un compromiso del lugar, no una certificación oficial.
        </p>
      </article>
    </>
  );
}

import type { Metadata } from "next";
import { DatosEstructurados } from "@/components/DatosEstructurados";
import { datosHerramienta, metaPagina } from "@/lib/seo";
import { CartaInterprete } from "@/components/CartaInterprete";

const PAGINA = {
  titulo: "Carta para pedir intérprete de Lengua de Señas Peruana",
  descripcion:
    "Llena unos pasos simples y te armamos una carta formal para pedir un intérprete de Lengua de Señas Peruana (LSP). Gratis, sin registro y sin enviar tus datos a nuestro servidor.",
  ruta: "/herramientas/carta",
};

export const metadata: Metadata = metaPagina(PAGINA);

export default function PideTuInterprete() {
  return (
    <main id="contenido" className="mx-auto w-full max-w-3xl flex-1 px-4 py-10">
      <DatosEstructurados datos={datosHerramienta(PAGINA)} />
      <header className="mb-8">
        <h1 className="mb-3 text-4xl font-bold sm:text-5xl">Pide tu intérprete</h1>
        <p className="text-xl text-suave">
          Responde unas preguntas y te armamos una carta para la entidad. Tus datos se quedan en tu
          equipo: no los enviamos a ningún servidor.
        </p>
      </header>

      <CartaInterprete />
    </main>
  );
}

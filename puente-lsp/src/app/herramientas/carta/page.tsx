import type { Metadata } from "next";
import { CartaInterprete } from "@/components/CartaInterprete";

export const metadata: Metadata = {
  title: "Pide tu intérprete: carta lista",
  description:
    "Llena unos pasos simples y te armamos una carta formal para pedir un intérprete de Lengua de Señas Peruana (LSP). Gratis, sin registro y sin enviar tus datos a nuestro servidor.",
};

export default function PideTuInterprete() {
  return (
    <main id="contenido" className="mx-auto w-full max-w-3xl flex-1 px-4 py-10">
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

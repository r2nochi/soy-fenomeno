import type { Metadata } from "next";
import { Keyboard, Mic, Smartphone, type LucideIcon } from "lucide-react";
import { Conversacion } from "@/components/Conversacion";

export const metadata: Metadata = {
  title: "Conversación cara a cara",
  description:
    "Pon el celular entre una persona Sorda y una persona oyente. Se escribe o se habla, y lo que se dice aparece en letra grande. Gratis y sin registro.",
};

const PASOS: { icono: LucideIcon; texto: string }[] = [
  {
    icono: Smartphone,
    texto: "Pongan el celular en la mesa, entre las dos personas.",
  },
  {
    icono: Keyboard,
    texto:
      "La persona Sorda escribe o toca una frase. Aparece en letra grande para la otra persona.",
  },
  {
    icono: Mic,
    texto:
      "La persona oyente toca Hablar. Lo que dice aparece en letra grande para la persona Sorda.",
  },
];

export default function PaginaConversacion() {
  return (
    <main id="contenido" className="mx-auto w-full max-w-5xl flex-1 px-4 py-10">
      <header className="mb-8">
        <h1 className="mb-3 text-4xl font-bold sm:text-5xl">
          <span aria-hidden="true">💬</span> Conversación cara a cara
        </h1>
        <p className="text-xl text-suave">
          Una herramienta para hablar con alguien que está frente a ti, sin
          intérprete. Úsala con calma: cada uno lee su mitad de la pantalla.
        </p>
      </header>

      <ol className="mb-10 grid gap-4 md:grid-cols-3">
        {PASOS.map(({ icono: Icono, texto }, i) => (
          <li
            key={texto}
            className="flex gap-4 rounded-[28px] border-[3px] border-borde/55 bg-superficie p-5 text-xl"
          >
            <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-acento-fondo text-acento">
              <Icono aria-hidden="true" size={28} />
            </span>
            <span>
              <span className="sr-only">Paso {i + 1}: </span>
              {texto}
            </span>
          </li>
        ))}
      </ol>

      <Conversacion />
    </main>
  );
}

import type { Metadata } from "next";
import { TarjetaEmergencia } from "@/components/TarjetaEmergencia";

export const metadata: Metadata = {
  title: "Mi tarjeta de emergencia",
  description:
    "Muestra a la policía, bomberos o paramédicos cómo comunicarte, con tu contacto y tu información médica. Guardada solo en tu equipo y sin señal.",
};

export default function Tarjeta() {
  return (
    <main id="contenido" className="mx-auto w-full max-w-3xl flex-1 px-4 py-10">
      <header className="mb-8">
        <h1 className="mb-3 text-4xl font-bold sm:text-5xl">
          <span aria-hidden="true">🆘 </span>Mi tarjeta de emergencia
        </h1>
        <p className="text-xl text-suave">
          Llena tu tarjeta una vez. Cuando haya una emergencia, muéstrala en la
          pantalla de tu celular para que te entiendan.
        </p>
      </header>

      <TarjetaEmergencia />
    </main>
  );
}

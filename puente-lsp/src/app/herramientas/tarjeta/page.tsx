import type { Metadata } from "next";
import { DatosEstructurados } from "@/components/DatosEstructurados";
import { datosHerramienta, metaPagina } from "@/lib/seo";
import { TarjetaEmergencia } from "@/components/TarjetaEmergencia";

const PAGINA = {
  titulo: "Tarjeta de emergencia para personas Sordas",
  descripcion:
    "Muestra a la policía, bomberos o paramédicos cómo comunicarte, con tu contacto y tu información médica. Guardada solo en tu equipo y sin señal.",
  ruta: "/herramientas/tarjeta",
};

export const metadata: Metadata = metaPagina(PAGINA);

export default function Tarjeta() {
  return (
    <main id="contenido" className="mx-auto w-full max-w-3xl flex-1 px-4 py-10">
      <DatosEstructurados datos={datosHerramienta(PAGINA)} />
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

import { Suspense } from "react";
import { Marca } from "./Marca";
import { Navegacion, NavegacionActual } from "./Navegacion";

export function Cabecera() {
  return (
    <header className="border-b-2 border-borde/25 bg-superficie">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-8 gap-y-3 px-4 py-4 sm:px-8">
        <Marca />
        <Suspense fallback={<Navegacion ruta="" />}>
          <NavegacionActual />
        </Suspense>
      </div>
    </header>
  );
}

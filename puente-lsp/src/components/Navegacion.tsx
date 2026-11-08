"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { NAVEGACION } from "@/lib/sitio";

const enlace =
  "block rounded-md py-3 no-underline decoration-acento decoration-[3px] underline-offset-8 hover:underline aria-[current]:underline lg:inline lg:py-1";

// "page" si es la página exacta; "true" si es una página dentro de esa sección.
function actual(ruta: string, href: string): "page" | "true" | undefined {
  if (ruta === href) return "page";
  if (ruta.startsWith(`${href}/`)) return "true";
  return undefined;
}

// usePathname puede esperar a la URL en rutas con parámetros desconocidos al
// compilar: la Cabecera envuelve esto en Suspense y muestra el menú sin marcar.
// La `key` vuelve a montar el menú al cambiar de página, así se cierra solo.
export function NavegacionActual() {
  const ruta = usePathname();
  return <Navegacion key={ruta} ruta={ruta} />;
}

export function Navegacion({ ruta }: { ruta: string }) {
  const [abierto, setAbierto] = useState(false);
  const botonRef = useRef<HTMLButtonElement>(null);

  // En el celular el menú se cierra con Escape y el foco vuelve al botón.
  useEffect(() => {
    if (!abierto) return;
    const alTeclear = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setAbierto(false);
      botonRef.current?.focus();
    };
    document.addEventListener("keydown", alTeclear);
    return () => document.removeEventListener("keydown", alTeclear);
  }, [abierto]);

  return (
    <>
      {/* Celular y tableta: botón Menú. En computadora la lista está siempre a la vista. */}
      <button
        ref={botonRef}
        type="button"
        onClick={() => setAbierto((v) => !v)}
        aria-expanded={abierto}
        aria-controls="menu-principal"
        className="inline-flex min-h-12 items-center gap-2 rounded-xl border-2 border-borde bg-superficie px-4 py-2 text-lg font-bold text-texto hover:bg-fondo-alt lg:hidden"
      >
        {abierto ? <X aria-hidden="true" size={24} /> : <Menu aria-hidden="true" size={24} />}
        Menú
      </button>
      {/* En computadora va en su propia fila, debajo del logo, para que los 9 enlaces quepan. */}
      <nav
        id="menu-principal"
        aria-label="Principal"
        className={`basis-full ${abierto ? "" : "max-lg:hidden"}`}
      >
        <ul className="grid grid-cols-2 gap-x-6 border-t-2 border-borde/25 pt-2 text-xl font-bold lg:flex lg:flex-wrap lg:gap-y-1 lg:pt-3 lg:text-lg">
          {NAVEGACION.map((n) => (
            <li key={n.href}>
              <Link
                href={n.href}
                aria-current={actual(ruta, n.href)}
                onClick={() => setAbierto(false)}
                className={enlace}
              >
                {n.texto}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}

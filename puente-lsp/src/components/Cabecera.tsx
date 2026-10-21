import Link from "next/link";
import { NAVEGACION } from "@/lib/sitio";
import { Marca } from "./Marca";

export function Cabecera() {
  return (
    <header className="border-b-2 border-borde/25 bg-superficie">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-8 gap-y-3 px-4 py-4 sm:px-8">
        <Marca />
        <nav aria-label="Principal">
          <ul className="flex flex-wrap gap-x-6 gap-y-1 text-lg font-bold">
            {NAVEGACION.map((n) => (
              <li key={n.href}>
                <Link
                  href={n.href}
                  className="rounded-md py-1 no-underline decoration-acento decoration-[3px] underline-offset-8 hover:underline"
                >
                  {n.texto}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

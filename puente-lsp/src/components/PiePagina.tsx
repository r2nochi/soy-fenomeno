import Link from "next/link";
import { NAVEGACION, REDES } from "@/lib/sitio";
import { Marca } from "./Marca";

export function PiePagina() {
  return (
    <footer className="mt-auto border-t-2 border-borde/25 bg-fondo-alt">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:grid-cols-[1.4fr_1fr_1fr] sm:px-8">
        <div>
          <Marca />
          <p className="mt-4 max-w-sm text-lg text-suave">
            Herramientas gratuitas para romper la frontera entre personas
            Sordas y oyentes. Hecho en Perú.
          </p>
        </div>
        <nav aria-label="Secciones">
          <h2 className="mb-3 text-lg font-bold">Secciones</h2>
          <ul className="space-y-2 text-lg">
            {NAVEGACION.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="underline-offset-4 hover:underline">
                  {n.texto}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <h2 className="mb-3 text-lg font-bold">Redes</h2>
          <ul className="space-y-2 text-lg">
            {REDES.map((r) => (
              <li key={r.nombre}>
                {r.url ? (
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline-offset-4 hover:underline"
                  >
                    {r.nombre}
                  </a>
                ) : (
                  <span className="text-suave">{r.nombre} · pronto</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="mx-auto max-w-6xl px-4 pb-10 text-base text-suave sm:px-8">
        Puente LSP · Lima, Perú. Nada sobre nosotros sin nosotros.
      </p>
    </footer>
  );
}

import Link from "next/link";

const chip =
  "inline-flex min-h-12 items-center rounded-full border-2 px-5 text-lg font-bold no-underline";

// Botones de país de una sección. Perú es la página principal de la sección.
export function BotonesPais({
  base,
  paises,
  activo,
}: {
  base: "/comunidad" | "/trabajos";
  paises: readonly { slug: string; nombre: string }[];
  activo: string;
}) {
  const lista = [
    { slug: "peru", nombre: "Perú", href: base },
    ...paises.map((p) => ({ ...p, href: `${base}/${p.slug}` })),
  ];
  return (
    <nav aria-label="Elegir país" className="mt-8">
      <ul className="flex flex-wrap gap-3">
        {lista.map((p) => (
          <li key={p.slug}>
            <Link
              href={p.href}
              aria-current={p.slug === activo ? "page" : undefined}
              className={`${chip} ${p.slug === activo ? "border-accion bg-accion text-sobre-accion" : "border-borde/55 hover:border-acento hover:text-acento"}`}
            >
              {p.nombre}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

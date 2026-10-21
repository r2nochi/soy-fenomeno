import Link from "next/link";

const OPCIONES = [
  {
    href: "/",
    titulo: "Mesa de herramientas",
    texto: "La portada actual: las herramientas son lo primero que se ve.",
  },
  {
    href: "/disenos/portada",
    titulo: "Portada de periódico",
    texto: "Un artículo destacado del blog y las herramientas en una columna.",
  },
  {
    href: "/disenos/calle",
    titulo: "Lo que suena, ahora se ve",
    texto: "La primera pantalla es una demostración de subtítulos con sonidos.",
  },
];

export default function Disenos() {
  return (
    <main id="contenido" className="mx-auto w-full max-w-4xl flex-1 px-4 py-14 sm:px-8">
      <h1 className="text-5xl font-bold tracking-tight">Portadas para comparar</h1>
      <p className="mt-4 text-2xl leading-snug text-suave">
        Página interna. No aparece en el menú ni en Google.
      </p>
      <ul className="mt-10 divide-y-2 divide-borde/25 rounded-[28px] border-[3px] border-borde/55 bg-superficie">
        {OPCIONES.map((o) => (
          <li key={o.href}>
            <Link href={o.href} className="group block p-7 no-underline">
              <h2 className="text-3xl font-bold group-hover:underline">{o.titulo}</h2>
              <p className="mt-2 text-xl text-suave">{o.texto}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

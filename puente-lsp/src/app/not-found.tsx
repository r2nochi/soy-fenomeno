import Link from "next/link";

export default function NoEncontrado() {
  return (
    <main id="contenido" className="mx-auto w-full max-w-3xl flex-1 px-4 py-20 sm:px-8">
      <h1 className="text-5xl font-bold tracking-tight">No encontramos esta página</h1>
      <p className="mt-5 text-2xl leading-snug text-suave">
        Puede que el enlace esté mal escrito o que la página ya no exista.
      </p>
      <ul className="mt-10 space-y-3 text-xl font-bold">
        <li>
          <Link href="/" className="text-acento underline underline-offset-4">
            Ir al inicio
          </Link>
        </li>
        <li>
          <Link href="/blog" className="text-acento underline underline-offset-4">
            Ver el blog
          </Link>
        </li>
      </ul>
    </main>
  );
}

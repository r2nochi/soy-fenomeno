import Link from "next/link";
import { SimboloPuente } from "./SimboloPuente";

// Logotipo: una mano abierta sostiene el arco del puente.
export function Marca({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-3 text-2xl font-bold tracking-tight no-underline ${className}`}
    >
      <SimboloPuente className="h-8 w-auto shrink-0 text-acento" />
      Puente LSP
    </Link>
  );
}

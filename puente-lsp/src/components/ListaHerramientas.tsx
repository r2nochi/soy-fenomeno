import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BellRing,
  FileText,
  IdCard,
  MapPin,
  MessagesSquare,
} from "lucide-react";
import { HERRAMIENTAS, type Herramienta } from "@/lib/herramientas";

const ICONOS: Record<Herramienta["icono"], typeof BellRing> = {
  alerta: BellRing,
  conversacion: MessagesSquare,
  tarjeta: IdCard,
  carta: FileText,
  lugares: MapPin,
  sello: BadgeCheck,
};

export function ListaHerramientas({ nivel = "h2" }: { nivel?: "h2" | "h3" }) {
  const Titulo = nivel;
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {HERRAMIENTAS.map((h) => {
        const Icono = ICONOS[h.icono];
        return (
          <li key={h.href}>
            <Link
              href={h.href}
              className="group flex h-full flex-col rounded-[28px] border-[3px] border-borde/55 bg-superficie p-7 no-underline hover:border-acento"
            >
              <Icono aria-hidden="true" className="size-10 text-acento" strokeWidth={2.25} />
              <Titulo className="mt-4 text-2xl font-bold group-hover:underline">{h.titulo}</Titulo>
              <p className="mt-1 text-xl leading-snug text-suave">{h.texto}</p>
              <ArrowRight aria-hidden="true" className="mt-auto size-6 pt-1 text-acento" />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

import type { Metadata } from "next";
import { Suspense } from "react";
import { BriefcaseBusiness, CalendarClock, ExternalLink, MapPin } from "lucide-react";
import { convocatoriasDelDia } from "@/lib/trabajos";

export const metadata: Metadata = {
  title: "Trabajos para personas con discapacidad",
  description:
    "Ofertas exclusivas para personas con discapacidad en Empleos Perú, convocatorias del día relacionadas con discapacidad, sordera y LSP, y portales de empleo.",
};

const PASOS_MTPE = [
  "Crea tu cuenta en Empleos Perú.",
  "Completa todo tu perfil y el “Registro de discapacidad”.",
  "Un consultor de empleo te contactará para conocer tus habilidades.",
  "Después podrás ver todas las ofertas exclusivas para personas con discapacidad.",
];

// Búsquedas en otros portales. Solo enlaces: estos sitios no permiten que otros
// lean sus avisos de forma automática.
const PORTALES = [
  { nombre: "Computrabajo", url: "https://pe.computrabajo.com/trabajo-de-discapacidad" },
  { nombre: "Bumeran", url: "https://www.bumeran.com.pe/empleos-busqueda-discapacidad.html" },
  { nombre: "Indeed", url: "https://pe.indeed.com/jobs?q=discapacidad" },
  { nombre: "LinkedIn", url: "https://www.linkedin.com/jobs/search/?keywords=discapacidad&location=Per%C3%BA" },
  { nombre: "Laborum", url: "https://www.laborum.pe/" },
];

async function Convocatorias() {
  const { avisos, ok } = await convocatoriasDelDia();

  if (!ok) {
    return (
      <p className="rounded-2xl border-2 border-borde/55 bg-superficie p-6 text-xl">
        Hoy no pudimos cargar las convocatorias. Míralas directamente en{" "}
        <a href="https://www.convocatoriasdetrabajo.com/" target="_blank" rel="noopener noreferrer" className="font-bold text-acento underline underline-offset-4">
          convocatoriasdetrabajo.com
        </a>
        .
      </p>
    );
  }
  if (avisos.length === 0) {
    return (
      <p className="rounded-2xl border-2 border-borde/55 bg-superficie p-6 text-xl">
        Hoy no hay convocatorias nuevas relacionadas. Vuelve mañana.
      </p>
    );
  }
  return (
    <ul className="divide-y-2 divide-borde/25 rounded-[28px] border-[3px] border-borde/55 bg-superficie">
      {avisos.map((a) => (
        <li key={a.url}>
          <a href={a.url} target="_blank" rel="noopener noreferrer" className="group block p-6 no-underline">
            <h3 className="text-xl leading-snug font-bold group-hover:underline">
              {a.titulo}
              <ExternalLink aria-hidden="true" className="ml-2 inline size-4 text-acento" />
            </h3>
            <p className="mt-2 flex flex-wrap gap-x-6 gap-y-1 text-lg text-suave">
              {a.lugar && (
                <span className="inline-flex items-center gap-2">
                  <MapPin aria-hidden="true" className="size-5" />
                  {a.lugar}
                </span>
              )}
              {a.vigencia && (
                <span className="inline-flex items-center gap-2">
                  <CalendarClock aria-hidden="true" className="size-5" />
                  Vigente hasta el {a.vigencia}
                </span>
              )}
            </p>
          </a>
        </li>
      ))}
    </ul>
  );
}

export default function Trabajos() {
  return (
    <main id="contenido" className="mx-auto w-full max-w-5xl flex-1 px-4 py-14 sm:px-8">
      <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">Trabajos</h1>
      <p className="mt-4 max-w-[55ch] text-2xl leading-snug text-suave">
        Ofertas para personas con discapacidad y convocatorias relacionadas con
        sordera y LSP en el Perú.
      </p>

      <section aria-labelledby="titulo-mtpe" className="mt-12 rounded-[28px] bg-accion p-8 text-sobre-accion">
        <h2 id="titulo-mtpe" className="text-3xl font-bold">
          Ofertas exclusivas del Estado (Empleos Perú)
        </h2>
        <p className="mt-2 max-w-[60ch] text-xl leading-snug opacity-90">
          El Ministerio de Trabajo tiene ofertas solo para personas con
          discapacidad. Para verlas:
        </p>
        <ol className="mt-6 space-y-3 text-xl">
          {PASOS_MTPE.map((p, i) => (
            <li key={p} className="flex gap-4">
              <span aria-hidden="true" className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white/20 font-bold">
                {i + 1}
              </span>
              <span className="pt-1">{p}</span>
            </li>
          ))}
        </ol>
        <p className="mt-8 flex flex-wrap gap-4">
          <a href="https://www.empleosperu.gob.pe/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-4 text-xl font-bold text-accion no-underline">
            Ir a Empleos Perú
            <ExternalLink aria-hidden="true" className="size-5" />
          </a>
          <a href="https://discapacidad.trabajo.gob.pe/personas-con-discapacidad-y-empleo/ofertas-de-empleo/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-2xl border-2 border-white/70 px-6 py-4 text-xl font-bold text-sobre-accion no-underline">
            Más información
          </a>
          <a href="https://youtu.be/lLYdsPB_4nM" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-2xl border-2 border-white/70 px-6 py-4 text-xl font-bold text-sobre-accion no-underline">
            Video en LSP
          </a>
        </p>
      </section>

      <section aria-labelledby="titulo-dia" className="mt-14">
        <h2 id="titulo-dia" className="text-3xl font-bold">Convocatorias del día</h2>
        <p className="mt-1 max-w-[60ch] text-xl leading-snug text-suave">
          Convocatorias recientes que mencionan discapacidad, sordera, LSP,
          intérpretes, CEBE, CONADIS u OMAPED. Se actualiza una vez al día. Lee
          los requisitos en el aviso original.
        </p>
        <div className="mt-6">
          <Suspense
            fallback={
              <p className="rounded-2xl border-2 border-borde/55 bg-superficie p-6 text-xl text-suave">
                Cargando convocatorias…
              </p>
            }
          >
            <Convocatorias />
          </Suspense>
        </div>
        <p className="mt-3 text-base text-suave">
          Fuente:{" "}
          <a href="https://www.convocatoriasdetrabajo.com/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
            convocatoriasdetrabajo.com
          </a>
          . Puente LSP no publica ni revisa estas ofertas.
        </p>
      </section>

      <section aria-labelledby="titulo-portales" className="mt-14">
        <h2 id="titulo-portales" className="text-3xl font-bold">Busca en otros portales</h2>
        <ul className="mt-6 flex flex-wrap gap-3">
          {PORTALES.map((p) => (
            <li key={p.nombre}>
              <a href={p.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border-[3px] border-borde/55 bg-superficie px-5 py-3 text-xl font-bold no-underline hover:border-acento">
                <BriefcaseBusiness aria-hidden="true" className="size-5 text-acento" />
                {p.nombre}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

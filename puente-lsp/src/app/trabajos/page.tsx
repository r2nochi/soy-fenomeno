import type { Metadata } from "next";
import { metaPagina } from "@/lib/seo";
import { Suspense } from "react";
import { BadgeCheck, BriefcaseBusiness, ExternalLink, Landmark } from "lucide-react";
import { AREAS, convocatoriasDelDia, type AreaId } from "@/lib/trabajos";
import { ListaTrabajos } from "@/components/ListaTrabajos";

export const metadata: Metadata = metaPagina({
  titulo: "Trabajos para personas con discapacidad en el Perú",
  descripcion:
    "Empleos para personas con discapacidad en el Perú, por área: TI, recursos humanos, administración, salud, atención al público y más. Portales inclusivos y convocatorias del Estado.",
  ruta: "/trabajos",
});

const PASOS_MTPE = [
  "Crea tu cuenta en Empleos Perú.",
  "Completa todo tu perfil y el “Registro de discapacidad”.",
  "Un consultor de empleo te contactará para conocer tus habilidades.",
  "Después podrás ver todas las ofertas exclusivas para personas con discapacidad.",
];

// Portales con ofertas pensadas para personas con discapacidad. Solo enlaces:
// sus términos no permiten copiar los avisos.
const INCLUSIVOS = [
  {
    nombre: "Inclúyeme Perú",
    texto: "Todas sus ofertas son para personas con discapacidad. Hay de TI, ventas, atención y más.",
    url: "https://www.incluyeme.com.pe/trabajos/",
  },
  {
    nombre: "Computrabajo",
    texto: "Busca avisos con la marca «Apto para personas con discapacidad».",
    url: "https://pe.computrabajo.com/trabajo-de-discapacidad",
  },
  {
    nombre: "Bumeran",
    texto: "Avisos que mencionan discapacidad en todo el Perú.",
    url: "https://www.bumeran.com.pe/empleos-busqueda-discapacidad.html",
  },
];

// Búsquedas por área en Computrabajo con su filtro "Personas con discapacidad:
// Sí" (dis=1).
const BUSQUEDAS = [
  { nombre: "TI y sistemas", clave: "sistemas" },
  { nombre: "Programación", clave: "programador" },
  { nombre: "Recursos humanos", clave: "recursos-humanos" },
  { nombre: "Contabilidad", clave: "contabilidad" },
  { nombre: "Administración", clave: "administracion" },
  { nombre: "Atención al cliente", clave: "atencion-al-cliente" },
  { nombre: "Almacén y logística", clave: "almacen" },
  { nombre: "Trabajo remoto", clave: "remoto" },
];

const OTROS = [
  { nombre: "Indeed", url: "https://pe.indeed.com/jobs?q=discapacidad" },
  { nombre: "LinkedIn", url: "https://www.linkedin.com/jobs/search/?keywords=discapacidad&location=Per%C3%BA" },
  { nombre: "Laborum", url: "https://www.laborum.pe/" },
];

const AREAS_FILTRO: { id: AreaId; nombre: string }[] = [
  ...AREAS.map(({ id, nombre }) => ({ id, nombre })),
  { id: "lsp", nombre: "Sordera, LSP o discapacidad" },
];

const enlaceExterno = "inline-flex items-center gap-2 font-bold text-acento underline underline-offset-4";

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
        Hoy no hay convocatorias vigentes. Vuelve mañana.
      </p>
    );
  }
  return <ListaTrabajos avisos={avisos} areas={AREAS_FILTRO} />;
}

export default function Trabajos() {
  return (
    <main id="contenido" className="mx-auto w-full max-w-5xl flex-1 px-4 py-14 sm:px-8">
      <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">Trabajos</h1>
      <p className="mt-4 max-w-[55ch] text-2xl leading-snug text-suave">
        Empleos de todas las áreas que aceptan a personas con discapacidad: TI,
        recursos humanos, administración, salud, atención al público y más.
      </p>

      <section aria-labelledby="titulo-inclusivos" className="mt-12">
        <h2 id="titulo-inclusivos" className="text-3xl font-bold">
          Empleos para personas con discapacidad
        </h2>
        <p className="mt-1 max-w-[60ch] text-xl leading-snug text-suave">
          Empresas privadas que buscan a personas con discapacidad. Las ofertas
          se ven en cada portal.
        </p>
        <ul className="mt-6 grid gap-4 md:grid-cols-3">
          {INCLUSIVOS.map((p) => (
            <li key={p.nombre}>
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col rounded-[28px] border-[3px] border-borde/55 bg-superficie p-6 no-underline hover:border-acento"
              >
                <BadgeCheck aria-hidden="true" className="size-9 text-acento" strokeWidth={2.25} />
                <h3 className="mt-3 text-2xl font-bold group-hover:underline">
                  {p.nombre}
                  <ExternalLink aria-hidden="true" className="ml-2 inline size-5 text-acento" />
                </h3>
                <p className="mt-2 text-lg leading-snug text-suave">{p.texto}</p>
              </a>
            </li>
          ))}
        </ul>

        <h3 className="mt-10 text-2xl font-bold">Busca por área en Computrabajo</h3>
        <p className="mt-1 max-w-[60ch] text-lg text-suave">
          Abre la búsqueda ya filtrada con «Personas con discapacidad: Sí».
        </p>
        <ul className="mt-4 flex flex-wrap gap-3">
          {BUSQUEDAS.map((b) => (
            <li key={b.clave}>
              <a
                href={`https://pe.computrabajo.com/trabajo-de-${b.clave}?dis=1`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border-[3px] border-borde/55 bg-superficie px-5 py-3 text-xl font-bold no-underline hover:border-acento"
              >
                <BriefcaseBusiness aria-hidden="true" className="size-5 text-acento" />
                {b.nombre}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="titulo-mtpe" className="mt-14 rounded-[28px] bg-accion p-8 text-sobre-accion">
        <h2 id="titulo-mtpe" className="text-3xl font-bold">
          Ofertas exclusivas en Empleos Perú
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

      <section aria-labelledby="titulo-estado" className="mt-14">
        <h2 id="titulo-estado" className="text-3xl font-bold">Convocatorias del Estado</h2>
        <div className="mt-4 flex max-w-[65ch] gap-4 rounded-2xl bg-acento-fondo p-5 text-lg leading-snug">
          <Landmark aria-hidden="true" className="size-8 shrink-0 text-acento" />
          <p>
            <strong>Puedes postular a cualquiera.</strong> Por ley, en los
            concursos públicos, si tienes discapacidad y alcanzas el puntaje
            mínimo, recibes <strong>15&nbsp;% más de puntaje</strong>. Decláralo
            al postular y acredítalo con tu certificado de discapacidad o tu
            carné del CONADIS. Lee siempre los requisitos en el aviso original.{" "}
            <a href="https://www.leyes.congreso.gob.pe/Documentos/Leyes/29973.pdf" target="_blank" rel="noopener noreferrer" className={enlaceExterno}>
              Ley 29973, artículo 48
            </a>
          </p>
        </div>
        <p className="mt-4 max-w-[60ch] text-lg text-suave">
          Se actualiza una vez al día. Primero aparecen las relacionadas con
          sordera, LSP o discapacidad.
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
          . El área se elige por el título del aviso y puede fallar. Puente LSP
          no publica ni revisa estas ofertas.
        </p>
      </section>

      <section aria-labelledby="titulo-portales" className="mt-14">
        <h2 id="titulo-portales" className="text-3xl font-bold">Otros portales</h2>
        <ul className="mt-6 flex flex-wrap gap-3">
          {OTROS.map((p) => (
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

"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type FormEvent } from "react";
import {
  armarCarta,
  datosVacios,
  enlaceCorreo,
  enlaceWhatsapp,
  FUENTES,
  NECESIDADES,
  TIPOS_ENTIDAD,
  validarDatos,
  type CampoCarta,
  type DatosCarta,
} from "@/lib/carta";

const CLAVE_BORRADOR = "puente-lsp-carta-borrador";

const PASOS: { titulo: string; campos: CampoCarta[] }[] = [
  { titulo: "Quién eres", campos: ["nombre", "dni", "conadis"] },
  { titulo: "La entidad", campos: ["tipoEntidad", "nombreEntidad"] },
  { titulo: "La cita o trámite", campos: ["fecha", "hora"] },
  { titulo: "Qué necesitas", campos: ["necesidad", "otraForma", "contacto"] },
];

const PASO_CARTA = PASOS.length;

const etiqueta = "mb-2 block text-xl font-bold text-texto";
const ayuda = "mb-2 text-lg text-suave";
const campo =
  "w-full rounded-xl border-2 border-borde bg-superficie px-4 py-3 text-xl text-texto placeholder:text-suave focus:border-acento aria-[invalid=true]:border-error";
const opcion =
  "flex min-h-14 cursor-pointer items-center gap-3 rounded-xl border-2 border-borde/55 bg-superficie px-4 py-3 text-xl has-[:checked]:border-acento has-[:checked]:bg-acento-fondo";
const botonSecundario =
  "min-h-14 rounded-xl border-2 border-borde bg-superficie px-6 py-3 text-xl font-bold text-texto hover:border-acento";
const botonPrincipal =
  "min-h-14 rounded-xl bg-accion px-6 py-3 text-xl font-bold text-sobre-accion hover:bg-accion-hover";

const URL_CONADIS = "https://www.gob.pe/conadis";
const URL_DEFENSORIA = "https://www.defensoria.gob.pe/";

function suscribirAlBorrador(avisar: () => void): () => void {
  window.addEventListener("storage", avisar);
  return () => window.removeEventListener("storage", avisar);
}

function leerBorrador(): string | null {
  try {
    return window.localStorage.getItem(CLAVE_BORRADOR);
  } catch {
    return null;
  }
}

function suscribirNada(): () => void {
  return () => {};
}

// Solo acepta campos de texto conocidos; cualquier otro valor se descarta.
function leerBorradorSeguro(json: string): DatosCarta {
  const vacio = datosVacios();
  const crudo: unknown = JSON.parse(json);
  if (typeof crudo !== "object" || crudo === null) return vacio;
  const salida: Record<string, string> = { ...vacio };
  for (const clave of Object.keys(vacio)) {
    const valor = (crudo as Record<string, unknown>)[clave];
    if (typeof valor === "string") salida[clave] = valor;
  }
  return salida as unknown as DatosCarta;
}

// Fecha de hoy en la hora local del navegador, como YYYY-MM-DD.
function hoyISO(): string {
  const d = new Date();
  const mes = String(d.getMonth() + 1).padStart(2, "0");
  const dia = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${mes}-${dia}`;
}

export function CartaInterprete() {
  const [datos, setDatos] = useState<DatosCarta>(datosVacios);
  const [paso, setPaso] = useState(0);
  const [errores, setErrores] = useState<Partial<Record<CampoCarta, string>>>({});
  const [hoy, setHoy] = useState("");
  const [estado, setEstado] = useState("");
  const [borradorAplicado, setBorradorAplicado] = useState(false);
  const tituloRef = useRef<HTMLHeadingElement>(null);
  const pasoAnterior = useRef(paso);

  // Borrador guardado en este navegador. En el servidor y durante la hidratación no hay
  // borrador, así que el HTML inicial coincide con el del cliente.
  const borradorGuardado = useSyncExternalStore(suscribirAlBorrador, leerBorrador, () => null);
  const hidratado = useSyncExternalStore(suscribirNada, () => true, () => false);

  // Aplica el borrador una sola vez, después de hidratar, durante el render (patrón oficial
  // de React, sin efectos). Se marca como aplicado aunque no haya borrador, para que lo que
  // la persona escriba después no sea reemplazado.
  if (hidratado && !borradorAplicado) {
    setBorradorAplicado(true);
    if (borradorGuardado !== null) {
      try {
        setDatos(leerBorradorSeguro(borradorGuardado));
      } catch {
        // Borrador dañado: se empieza en blanco.
      }
    }
  }

  // Guarda el borrador en este navegador. No se envía a ningún servidor.
  useEffect(() => {
    if (!hidratado) return;
    try {
      window.localStorage.setItem(CLAVE_BORRADOR, JSON.stringify(datos));
    } catch {
      // Sin almacenamiento: la carta igual funciona.
    }
  }, [datos, hidratado]);

  // Al cambiar de paso, el foco va al título para que lectores de pantalla anuncien el paso.
  useEffect(() => {
    if (pasoAnterior.current === paso) return;
    pasoAnterior.current = paso;
    tituloRef.current?.focus();
  }, [paso]);

  function cambiar<K extends CampoCarta>(campoCambiado: K, valor: DatosCarta[K]) {
    setDatos((d) => ({ ...d, [campoCambiado]: valor }));
    setErrores((e) => ({ ...e, [campoCambiado]: undefined }));
  }

  function avanzar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    const todos = validarDatos(datos);
    const conError = PASOS[paso].campos.filter((c) => todos[c]);
    if (conError.length > 0) {
      const nuevos: Partial<Record<CampoCarta, string>> = {};
      for (const c of conError) nuevos[c] = todos[c];
      setErrores(nuevos);
      document.getElementById(`campo-${conError[0]}`)?.focus();
      return;
    }
    setErrores({});
    if (paso === PASOS.length - 1) setHoy(hoyISO());
    setEstado("");
    setPaso(paso + 1);
  }

  function volver() {
    setErrores({});
    setPaso(Math.max(0, paso - 1));
  }

  function empezarDeNuevo() {
    setDatos(datosVacios());
    setErrores({});
    setEstado("");
    setPaso(0);
    try {
      window.localStorage.removeItem(CLAVE_BORRADOR);
    } catch {
      // Sin almacenamiento: no hay nada que borrar.
    }
  }

  async function copiar(texto: string) {
    try {
      await navigator.clipboard.writeText(texto);
      setEstado("Texto copiado. Ya lo puedes pegar en tu mensaje o correo.");
    } catch {
      setEstado("No pudimos copiar. Selecciona el texto de la carta y cópialo a mano.");
    }
  }

  const carta = paso === PASO_CARTA && hoy ? armarCarta(datos, hoy) : null;

  // Mensaje de error de un campo, enlazado con aria-describedby.
  function mensajeError(campoError: CampoCarta) {
    const texto = errores[campoError];
    if (!texto) return null;
    return (
      <p id={`error-${campoError}`} role="alert" className="mt-2 text-lg font-bold text-error">
        {texto}
      </p>
    );
  }

  return (
    <div className="space-y-8">
      <style>{`
        @page { size: A4; margin: 2cm; }
        @media print {
          body *:not(:has(#carta)):not(#carta):not(#carta *) { display: none !important; }
          #carta {
            border: 0 !important;
            box-shadow: none !important;
            padding: 0 !important;
            color: #000 !important;
            background: #fff !important;
          }
          #carta p { margin: 0 0 0.9em; font-size: 12pt; line-height: 1.5; }
        }
      `}</style>

      {carta === null && (
        <>
          <p className="text-xl font-bold" aria-live="polite">
            Paso {paso + 1} de {PASOS.length}: {PASOS[paso].titulo}
          </p>
          <p className="rounded-xl border-2 border-borde bg-superficie p-4 text-lg text-texto">
            Lo que escribes se guarda solo en este equipo hasta que toques «Borrar y empezar de nuevo», al ver tu carta.
          </p>
          <form onSubmit={avanzar} noValidate className="space-y-8">
            <h2 ref={tituloRef} tabIndex={-1} className="text-3xl font-bold outline-none">
              {PASOS[paso].titulo}
            </h2>

            {paso === 0 && (
              <div className="space-y-6">
                <div>
                  <label htmlFor="campo-nombre" className={etiqueta}>
                    Tu nombre completo
                  </label>
                  <input
                    id="campo-nombre"
                    name="nombre"
                    type="text"
                    autoComplete="name"
                    className={campo}
                    value={datos.nombre}
                    aria-invalid={!!errores.nombre}
                    aria-describedby={errores.nombre ? "error-nombre" : undefined}
                    onChange={(e) => cambiar("nombre", e.target.value)}
                  />
                  {mensajeError("nombre")}
                </div>
                <div>
                  <label htmlFor="campo-dni" className={etiqueta}>
                    DNI <span className="font-normal text-suave">(opcional)</span>
                  </label>
                  <input
                    id="campo-dni"
                    name="dni"
                    type="text"
                    inputMode="numeric"
                    maxLength={8}
                    className={campo}
                    value={datos.dni}
                    aria-invalid={!!errores.dni}
                    aria-describedby={errores.dni ? "error-dni" : undefined}
                    onChange={(e) => cambiar("dni", e.target.value)}
                  />
                  {mensajeError("dni")}
                </div>
                <div>
                  <label htmlFor="campo-conadis" className={etiqueta}>
                    Carné CONADIS <span className="font-normal text-suave">(opcional)</span>
                  </label>
                  <input
                    id="campo-conadis"
                    name="conadis"
                    type="text"
                    className={campo}
                    value={datos.conadis}
                    aria-invalid={!!errores.conadis}
                    aria-describedby={errores.conadis ? "error-conadis" : undefined}
                    onChange={(e) => cambiar("conadis", e.target.value)}
                  />
                  {mensajeError("conadis")}
                </div>
              </div>
            )}

            {paso === 1 && (
              <div className="space-y-6">
                <fieldset>
                  <legend className={etiqueta}>¿Qué tipo de entidad es?</legend>
                  <div className="grid gap-3">
                    {TIPOS_ENTIDAD.map((t, i) => (
                      <label key={t.valor} className={opcion}>
                        <input
                          id={i === 0 ? "campo-tipoEntidad" : undefined}
                          type="radio"
                          name="tipoEntidad"
                          value={t.valor}
                          checked={datos.tipoEntidad === t.valor}
                          onChange={() => cambiar("tipoEntidad", t.valor)}
                          className="size-5 accent-acento"
                        />
                        {t.texto}
                      </label>
                    ))}
                  </div>
                  {mensajeError("tipoEntidad")}
                </fieldset>
                <div>
                  <label htmlFor="campo-nombreEntidad" className={etiqueta}>
                    Nombre de la entidad
                  </label>
                  <p className={ayuda}>Por ejemplo: Hospital Regional de Ica.</p>
                  <input
                    id="campo-nombreEntidad"
                    name="nombreEntidad"
                    type="text"
                    className={campo}
                    value={datos.nombreEntidad}
                    aria-invalid={!!errores.nombreEntidad}
                    aria-describedby={errores.nombreEntidad ? "error-nombreEntidad" : undefined}
                    onChange={(e) => cambiar("nombreEntidad", e.target.value)}
                  />
                  {mensajeError("nombreEntidad")}
                </div>
              </div>
            )}

            {paso === 2 && (
              <div className="space-y-6">
                <div>
                  <label htmlFor="campo-fecha" className={etiqueta}>
                    Fecha de tu cita o trámite
                  </label>
                  <input
                    id="campo-fecha"
                    name="fecha"
                    type="date"
                    className={campo}
                    value={datos.fecha}
                    aria-invalid={!!errores.fecha}
                    aria-describedby={errores.fecha ? "error-fecha" : undefined}
                    onChange={(e) => cambiar("fecha", e.target.value)}
                  />
                  {mensajeError("fecha")}
                </div>
                <div>
                  <label htmlFor="campo-hora" className={etiqueta}>
                    Hora <span className="font-normal text-suave">(opcional)</span>
                  </label>
                  <input
                    id="campo-hora"
                    name="hora"
                    type="time"
                    className={campo}
                    value={datos.hora}
                    aria-invalid={!!errores.hora}
                    aria-describedby={errores.hora ? "error-hora" : undefined}
                    onChange={(e) => cambiar("hora", e.target.value)}
                  />
                  {mensajeError("hora")}
                </div>
              </div>
            )}

            {paso === 3 && (
              <div className="space-y-6">
                <fieldset>
                  <legend className={etiqueta}>¿Qué necesitas?</legend>
                  <div className="grid gap-3">
                    {NECESIDADES.map((n, i) => (
                      <label key={n.valor} className={opcion}>
                        <input
                          id={i === 0 ? "campo-necesidad" : undefined}
                          type="radio"
                          name="necesidad"
                          value={n.valor}
                          checked={datos.necesidad === n.valor}
                          onChange={() => cambiar("necesidad", n.valor)}
                          className="size-5 accent-acento"
                        />
                        {n.texto}
                      </label>
                    ))}
                  </div>
                  {mensajeError("necesidad")}
                </fieldset>
                {datos.necesidad === "otra" && (
                  <div>
                    <label htmlFor="campo-otraForma" className={etiqueta}>
                      ¿Qué forma de comunicación necesitas?
                    </label>
                    <p className={ayuda}>Por ejemplo: subtítulos en vivo, escritura o un intérprete de otra lengua de señas.</p>
                    <input
                      id="campo-otraForma"
                      name="otraForma"
                      type="text"
                      className={campo}
                      value={datos.otraForma}
                      aria-invalid={!!errores.otraForma}
                      aria-describedby={errores.otraForma ? "error-otraForma" : undefined}
                      onChange={(e) => cambiar("otraForma", e.target.value)}
                    />
                    {mensajeError("otraForma")}
                  </div>
                )}
                <div>
                  <label htmlFor="campo-contacto" className={etiqueta}>
                    Tu WhatsApp o correo
                  </label>
                  <p className={ayuda}>La entidad usará este dato para responderte. Solo aparece en la carta.</p>
                  <input
                    id="campo-contacto"
                    name="contacto"
                    type="text"
                    autoComplete="tel"
                    className={campo}
                    value={datos.contacto}
                    aria-invalid={!!errores.contacto}
                    aria-describedby={errores.contacto ? "error-contacto" : undefined}
                    onChange={(e) => cambiar("contacto", e.target.value)}
                  />
                  {mensajeError("contacto")}
                </div>
              </div>
            )}

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
              {paso > 0 ? (
                <button type="button" onClick={volver} className={botonSecundario}>
                  Atrás
                </button>
              ) : (
                <span />
              )}
              <button type="submit" className={botonPrincipal}>
                {paso === PASOS.length - 1 ? "Ver mi carta" : "Siguiente"}
              </button>
            </div>
          </form>
        </>
      )}

      {carta && (
        <div className="space-y-8">
          <p className="rounded-xl border-2 border-borde bg-superficie p-4 text-lg font-bold">
            Este modelo no reemplaza la asesoría de un abogado. Está pendiente de revisión legal.
          </p>

          <h2 ref={tituloRef} tabIndex={-1} className="text-3xl font-bold outline-none">
            Tu carta está lista
          </h2>

          <div className="grid gap-3 sm:grid-cols-2">
            <button type="button" onClick={() => copiar(carta.texto)} className={botonPrincipal}>
              Copiar texto
            </button>
            <button type="button" onClick={() => window.print()} className={botonSecundario}>
              Imprimir
            </button>
            <a
              href={enlaceWhatsapp(carta.texto)}
              target="_blank"
              rel="noopener noreferrer"
              className={botonSecundario}
            >
              Enviar por WhatsApp
            </a>
            <a href={enlaceCorreo(carta.asunto, carta.texto)} className={botonSecundario}>
              Enviar por correo
            </a>
          </div>

          <p role="status" aria-live="polite" className="min-h-6 text-lg font-bold">
            {estado}
          </p>

          <article
            id="carta"
            aria-label="Carta de solicitud"
            className="rounded-[28px] border-3 border-borde/55 bg-superficie p-6 text-xl leading-relaxed text-texto sm:p-10"
          >
            <p>{carta.fecha}</p>
            <p className="font-bold">{carta.asunto}</p>
            <p>{carta.saludo}</p>
            {carta.parrafos.map((p) => (
              <p key={p}>{p}</p>
            ))}
            {carta.despedida.map((linea, i) => (
              <p key={`${i}-${linea}`}>{linea}</p>
            ))}
          </article>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button type="button" onClick={() => setPaso(0)} className={botonSecundario}>
              Editar datos
            </button>
            <button type="button" onClick={empezarDeNuevo} className={botonSecundario}>
              Borrar y empezar de nuevo
            </button>
          </div>

          <section aria-labelledby="titulo-ley" className="space-y-3 text-lg">
            <h2 id="titulo-ley" className="text-2xl font-bold">
              Qué dice la ley
            </h2>
            <p>
              Según el artículo 4 de la Ley 29535, las entidades públicas o privadas que atienden
              al público deben darte un intérprete de lengua de señas cuando lo necesitas. El
              servicio es gratuito y se da poco a poco, según lo diga el reglamento. La carta cita
              el texto exacto de la ley.
            </p>
          </section>

          <section aria-labelledby="titulo-negativa" className="space-y-3 text-lg">
            <h2 id="titulo-negativa" className="text-2xl font-bold">
              Si te niegan el intérprete
            </h2>
            <p>
              Puedes acudir al{" "}
              <a className="font-bold text-acento underline" href={URL_CONADIS} target="_blank" rel="noopener noreferrer">
                CONADIS
              </a>{" "}
              o a la{" "}
              <a className="font-bold text-acento underline" href={URL_DEFENSORIA} target="_blank" rel="noopener noreferrer">
                Defensoría del Pueblo
              </a>
              . Guarda una copia de tu carta.
            </p>
          </section>

          <section aria-labelledby="titulo-fuentes" className="space-y-3 text-lg text-suave">
            <h2 id="titulo-fuentes" className="text-2xl font-bold text-texto">
              Fuentes
            </h2>
            <ul className="list-disc space-y-2 pl-6">
              {FUENTES.map((f) => (
                <li key={f.url}>
                  <a className="text-acento underline" href={f.url} target="_blank" rel="noopener noreferrer">
                    {f.texto}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>
      )}
    </div>
  );
}

"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import {
  CACHE_OFFLINE,
  CLAVE_TARJETA,
  COMUNICACIONES,
  NUMEROS_EMERGENCIA,
  TIPOS_SANGRE,
  borrarTarjeta,
  datosIniciales,
  desdeTexto,
  enlaceLlamada,
  guardarTarjeta,
  MENSAJE_POR_DEFECTO,
  tieneDatosMedicos,
  type Comunicacion,
  type TarjetaDatos,
} from "@/lib/tarjeta";

const suscribirNada = () => () => {};
function leerGuardado(): string | null {
  try {
    return localStorage.getItem(CLAVE_TARJETA);
  } catch {
    return null;
  }
}
function suscribirRed(cambio: () => void) {
  window.addEventListener("online", cambio);
  window.addEventListener("offline", cambio);
  return () => {
    window.removeEventListener("online", cambio);
    window.removeEventListener("offline", cambio);
  };
}

const panel = "rounded-[28px] border-2 border-borde/55 bg-superficie p-6 sm:p-7";
const etiqueta = "mb-2 block text-lg font-bold";
const ayuda = "mb-3 text-base text-suave";
const campo =
  "w-full min-h-12 rounded-lg border-2 border-borde bg-superficie px-4 py-3 text-lg text-texto";
const botonPrincipal =
  "inline-flex min-h-14 w-full items-center justify-center rounded-2xl bg-accion px-6 py-4 text-xl font-bold text-sobre-accion hover:bg-accion-hover sm:w-auto";
const botonSecundario =
  "inline-flex min-h-12 items-center justify-center rounded-xl border-2 border-borde px-5 py-3 text-lg font-bold text-texto hover:bg-fondo-alt";
const botonPeligro =
  "inline-flex min-h-12 items-center justify-center rounded-xl border-2 border-error px-5 py-3 text-lg font-bold text-error";
const opcion =
  "flex min-h-12 cursor-pointer items-center gap-4 rounded-xl border-2 border-borde/55 bg-superficie p-3 text-lg has-[:checked]:border-acento has-[:checked]:bg-acento-fondo";

// Impresión: solo la tarjeta del tamaño de una billetera (85,6 x 54 mm).
// La tarjeta vive directamente en <body> (portal) para ocultar el resto de la página.
const estiloImpresion = `
@media print {
  @page { size: 85.6mm 54mm; margin: 0; }
  html, body { margin: 0 !important; padding: 0 !important; background: #fff !important; }
  body > :not(#tarjeta-impresion) { display: none !important; }
  #tarjeta-impresion {
    display: block !important; position: static;
    width: 85.6mm; height: 54mm; overflow: hidden;
    box-sizing: border-box; padding: 3mm;
    background: #fff; color: #000;
  }
}`;

// Copia en la caché offline lo que esta página ya cargó (HTML y archivos
// /_next/static/). Así abre sin señal tras una visita con internet.
// Los archivos se leen de los <script>, <link> y <link rel="preload"> de la página
// (no de performance.getEntriesByType, que tiene un límite y puede omitir archivos).
function archivosDeLaPagina(): string[] {
  const urls = new Set<string>();
  const agregar = (valor: string | null) => {
    if (!valor) return;
    const u = new URL(valor, location.href);
    if (u.origin === location.origin && u.pathname.startsWith("/_next/static/")) {
      urls.add(u.href);
    }
  };
  document.querySelectorAll<HTMLScriptElement>("script[src]").forEach((s) => agregar(s.getAttribute("src")));
  document
    .querySelectorAll<HTMLLinkElement>('link[rel="stylesheet"][href]')
    .forEach((l) => agregar(l.getAttribute("href")));
  document
    .querySelectorAll<HTMLLinkElement>('link[rel="preload"][href]')
    .forEach((l) => {
      if (["script", "style", "font"].includes(l.getAttribute("as") ?? "")) {
        agregar(l.getAttribute("href"));
      }
    });
  return [...urls];
}

// Copia en la caché offline lo que esta página ya cargó (HTML y archivos
// /_next/static/). Así abre sin señal tras una visita con internet.
// Primero agrega lo nuevo; solo si todo se guardó borra las copias viejas.
async function guardarParaSinSenal() {
  if (!("caches" in window)) return;
  try {
    const cache = await caches.open(CACHE_OFFLINE);
    const archivos = archivosDeLaPagina();
    const resultados = await Promise.all(
      [location.href, ...archivos].map((u) =>
        cache.add(u).then(
          () => true,
          () => false,
        ),
      ),
    );
    if (!resultados.every(Boolean)) return;
    // Quita archivos de versiones anteriores que ya no usa esta página.
    const vigentes = new Set(archivos);
    const viejos = (await cache.keys())
      .map((s) => s.url)
      .filter((u) => u.startsWith(`${location.origin}/_next/static/`) && !vigentes.has(u));
    await Promise.all(viejos.map((u) => cache.delete(u)));
  } catch {}
}

function Dato({ etiqueta, valor }: { etiqueta: string; valor: string }) {
  if (!valor) return null;
  return (
    <div>
      <dt className="text-2xl font-bold">{etiqueta}</dt>
      <dd className="break-words text-3xl">{valor}</dd>
    </div>
  );
}

export function TarjetaEmergencia() {
  // Lo guardado en este equipo se lee del navegador; lo que se edita vive en `edicion`.
  const guardadoTexto = useSyncExternalStore(suscribirNada, leerGuardado, () => null);
  const [edicion, setEdicion] = useState<TarjetaDatos | null>(null);
  const datos = edicion ?? desdeTexto(guardadoTexto);
  const enLinea = useSyncExternalStore(suscribirRed, () => navigator.onLine, () => true);
  // Verdadero solo en el navegador: ahí se monta la tarjeta de impresión en <body>.
  const enCliente = useSyncExternalStore(suscribirNada, () => true, () => false);
  const [aviso, setAviso] = useState("");
  const [verTarjeta, setVerTarjeta] = useState(false);
  const [girada, setGirada] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const botonVerRef = useRef<HTMLButtonElement>(null);

  // Prepara el modo sin señal: registra el service worker y guarda la página.
  useEffect(() => {
    navigator.serviceWorker
      ?.register("/sw-tarjeta.js", { scope: "/herramientas/tarjeta" })
      .catch(() => {});
    void guardarParaSinSenal();
  }, []);

  // Abre y cierra la vista completa.
  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (verTarjeta && !d.open) d.showModal();
    if (!verTarjeta && d.open) d.close();
  }, [verTarjeta]);

  // Mantiene la pantalla encendida mientras se muestra la tarjeta (si el navegador lo permite).
  useEffect(() => {
    if (!verTarjeta || !navigator.wakeLock) return;
    let activo = true;
    let sentinela: WakeLockSentinel | null = null;
    const pedir = async () => {
      if (document.visibilityState !== "visible") return;
      try {
        const nueva = await navigator.wakeLock.request("screen");
        if (activo) sentinela = nueva;
        else void nueva.release();
      } catch {}
    };
    void pedir();
    // El navegador suelta la pantalla encendida al ocultar la pestaña: se vuelve a pedir.
    document.addEventListener("visibilitychange", pedir);
    return () => {
      activo = false;
      document.removeEventListener("visibilitychange", pedir);
      void sentinela?.release();
    };
  }, [verTarjeta]);

  // Cada cambio se guarda en este equipo al momento.
  function actualizar(cambio: (d: TarjetaDatos) => TarjetaDatos) {
    const siguiente = cambio(datos);
    setEdicion(siguiente);
    setAviso(
      guardarTarjeta(siguiente)
        ? "Guardado en este equipo."
        : "No se pudo guardar. Revisa que tu navegador permita guardar datos.",
    );
  }

  function alternarComunicacion(id: Comunicacion) {
    actualizar((d) => ({
      ...d,
      comunicacion: d.comunicacion.includes(id)
        ? d.comunicacion.filter((x) => x !== id)
        : [...d.comunicacion, id],
    }));
  }

  function borrarDatos() {
    if (!window.confirm("¿Borrar todos tus datos de este equipo? No se puede deshacer.")) return;
    const ok = borrarTarjeta();
    setEdicion(datosIniciales());
    setAviso(
      ok
        ? "Borramos tus datos de este equipo."
        : "No se pudo borrar. Revisa los datos de tu navegador.",
    );
  }

  function cerrarVista() {
    setVerTarjeta(false);
    setGirada(false);
    botonVerRef.current?.focus();
  }

  const enlace = enlaceLlamada(datos.contacto.telefono);
  const nombresComunicacion = COMUNICACIONES.filter((c) =>
    datos.comunicacion.includes(c.id),
  )
    .map((c) => c.nombre)
    .join(", ");

  return (
    <>
      <style>{estiloImpresion}</style>

      <div className="space-y-8">
        <section aria-labelledby="privacidad" className="rounded-[28px] border-2 border-borde/55 bg-acento-fondo p-6 text-lg">
          <h2 id="privacidad" className="mb-2 text-2xl font-bold">
            Tus datos solo están en este equipo
          </h2>
          <p>
            Lo que escribes aquí no se envía a ningún servidor ni a Puente LSP.
            Si borras los datos del navegador o cambias de equipo, se pierden.
          </p>
        </section>

        <section aria-labelledby="sin-senal" className={panel}>
          <h2 id="sin-senal" className="mb-3 text-2xl font-bold">
            Funciona sin señal
          </h2>
          <p className="mb-3 text-lg">
            Abre esta página una vez con internet; luego funciona sin señal.
          </p>
          <p className="text-lg">
            Para tenerla a mano, busca en tu navegador la opción de agregar a la
            pantalla de inicio.
          </p>
          {!enLinea && (
            <p role="status" className="mt-4 text-lg font-bold">
              Estás sin conexión. La tarjeta sigue disponible.
            </p>
          )}
        </section>

        <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
          <section aria-labelledby="datos-yo" className={panel}>
            <h2 id="datos-yo" className="mb-5 text-2xl font-bold">
              1. Mis datos
            </h2>
            <label htmlFor="nombre" className={etiqueta}>
              Mi nombre
            </label>
            <input
              id="nombre"
              type="text"
              autoComplete="name"
              maxLength={80}
              value={datos.nombre}
              onChange={(e) => actualizar((d) => ({ ...d, nombre: e.target.value }))}
              className={campo}
            />
          </section>

          <section aria-labelledby="mensaje" className={panel}>
            <h2 id="mensaje" className="mb-5 text-2xl font-bold">
              2. Mensaje para mostrar
            </h2>
            <label htmlFor="mensaje-texto" className={etiqueta}>
              Lo que la otra persona debe leer
            </label>
            <p id="mensaje-ayuda" className={ayuda}>
              Aparece en letra grande. Puedes cambiarlo.
            </p>
            <textarea
              id="mensaje-texto"
              rows={3}
              maxLength={300}
              aria-describedby="mensaje-ayuda"
              value={datos.mensaje}
              onChange={(e) => actualizar((d) => ({ ...d, mensaje: e.target.value }))}
              className={campo}
            />
          </section>

          <fieldset className={panel}>
            <legend className="mb-5 text-2xl font-bold">3. ¿Cómo me comunico?</legend>
            <p className={ayuda}>Marca todo lo que te sirva.</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {COMUNICACIONES.map((c) => (
                <label key={c.id} className={opcion}>
                  <input
                    type="checkbox"
                    checked={datos.comunicacion.includes(c.id)}
                    onChange={() => alternarComunicacion(c.id)}
                    className="h-6 w-6 shrink-0 accent-accion"
                  />
                  <span>{c.nombre}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <section aria-labelledby="contacto" className={panel}>
            <h2 id="contacto" className="mb-5 text-2xl font-bold">
              4. Contacto de emergencia
            </h2>
            <div className="space-y-5">
              <div>
                <label htmlFor="contacto-nombre" className={etiqueta}>
                  Nombre de la persona
                </label>
                <input
                  id="contacto-nombre"
                  type="text"
                  autoComplete="off"
                  maxLength={80}
                  value={datos.contacto.nombre}
                  onChange={(e) =>
                    actualizar((d) => ({
                      ...d,
                      contacto: { ...d.contacto, nombre: e.target.value },
                    }))
                  }
                  className={campo}
                />
              </div>
              <div>
                <label htmlFor="contacto-telefono" className={etiqueta}>
                  Teléfono
                </label>
                <input
                  id="contacto-telefono"
                  type="tel"
                  inputMode="tel"
                  autoComplete="off"
                  maxLength={20}
                  value={datos.contacto.telefono}
                  onChange={(e) =>
                    actualizar((d) => ({
                      ...d,
                      contacto: { ...d.contacto, telefono: e.target.value },
                    }))
                  }
                  className={campo}
                />
              </div>
            </div>
          </section>

          <fieldset className={panel}>
            <legend className="mb-2 text-2xl font-bold">5. Información médica (opcional)</legend>
            <p className={ayuda}>
              Es opcional y privada. Solo se muestra en tu tarjeta si la escribes.
              Puedes dejarla en blanco.
            </p>
            <div className="space-y-5">
              <div>
                <label htmlFor="sangre" className={etiqueta}>
                  Tipo de sangre
                </label>
                <select
                  id="sangre"
                  value={datos.medica.tipoSangre}
                  onChange={(e) =>
                    actualizar((d) => ({
                      ...d,
                      medica: { ...d.medica, tipoSangre: e.target.value },
                    }))
                  }
                  className={campo}
                >
                  {TIPOS_SANGRE.map((t) => (
                    <option key={t} value={t}>
                      {t || "Elegir"}
                    </option>
                  ))}
                </select>
              </div>
              {(
                [
                  ["alergias", "Alergias"],
                  ["medicinas", "Medicinas que tomo"],
                  ["condiciones", "Condiciones de salud"],
                ] as const
              ).map(([clave, texto]) => (
                <div key={clave}>
                  <label htmlFor={`medica-${clave}`} className={etiqueta}>
                    {texto}
                  </label>
                  <textarea
                    id={`medica-${clave}`}
                    rows={2}
                    maxLength={300}
                    value={datos.medica[clave]}
                    onChange={(e) =>
                      actualizar((d) => ({
                        ...d,
                        medica: { ...d.medica, [clave]: e.target.value },
                      }))
                    }
                    className={campo}
                  />
                </div>
              ))}
            </div>
          </fieldset>

          <div role="status" aria-live="polite" className="min-h-7 text-lg font-bold">
            {aviso}
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
            <button
              type="button"
              ref={botonVerRef}
              onClick={() => {
                setGirada(false);
                setVerTarjeta(true);
              }}
              className={botonPrincipal}
            >
              Mostrar tarjeta
            </button>
            <button type="button" onClick={() => window.print()} className={botonSecundario}>
              Imprimir tarjeta
            </button>
            <button type="button" onClick={borrarDatos} className={botonPeligro}>
              Borrar mis datos
            </button>
          </div>
          <p className={ayuda}>
            Mostrar tarjeta abre una pantalla con letra grande para enseñarla a la
            policía, bomberos, un taxista o paramédicos.
          </p>
        </form>

        <section aria-labelledby="numeros" className={panel}>
          <h2 id="numeros" className="mb-2 text-2xl font-bold">
            Números de emergencia en Perú
          </h2>
          <p className={ayuda}>Toca un número para llamar desde tu celular. Según gob.pe.</p>
          <ul className="grid gap-3 sm:grid-cols-3">
            {NUMEROS_EMERGENCIA.map((n) => (
              <li key={n.numero}>
                <a
                  href={`tel:${n.numero}`}
                  className="flex min-h-14 items-center justify-between gap-3 rounded-xl border-2 border-borde px-4 py-3 text-lg text-texto hover:bg-fondo-alt"
                >
                  <span className="text-3xl font-bold">{n.numero}</span>
                  <span className="text-right">{n.nombre}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Vista para mostrar: fondo negro y letra grande. Los colores son fijos a propósito. */}
      <dialog
        ref={dialogRef}
        onClose={cerrarVista}
        aria-label="Mi tarjeta de emergencia"
        className="m-0 h-dvh max-h-none w-dvw max-w-none overflow-y-auto border-0 bg-black p-0 text-white backdrop:bg-black"
      >
        <div className="flex min-h-full flex-col gap-6 px-5 py-6 sm:px-10">
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              className="min-h-14 rounded-xl border-4 border-white px-6 text-2xl font-bold text-white"
            >
              Cerrar
            </button>
            <button
              type="button"
              aria-pressed={girada}
              onClick={() => setGirada((g) => !g)}
              className="min-h-14 rounded-xl border-4 border-white px-6 text-2xl font-bold text-white"
            >
              Girar 180°
            </button>
          </div>

          {/* Solo el contenido gira: los botones de arriba quedan derechos para quien sostiene el celular. */}
          <div className={`space-y-8 break-words ${girada ? "rotate-180" : ""}`}>
            <p className="text-2xl font-bold uppercase tracking-wide">Persona Sorda</p>
            {datos.nombre && <p className="text-5xl font-bold leading-tight">{datos.nombre}</p>}
            <p className="text-4xl font-bold leading-snug">
              {datos.mensaje.trim() || MENSAJE_POR_DEFECTO}
            </p>

            {nombresComunicacion && (
              <div className="border-t-4 border-white pt-6">
                <h3 className="mb-3 text-2xl font-bold">Cómo me comunico</h3>
                <ul className="list-disc space-y-2 pl-8 text-3xl">
                  {COMUNICACIONES.filter((c) => datos.comunicacion.includes(c.id)).map((c) => (
                    <li key={c.id}>{c.nombre}</li>
                  ))}
                </ul>
              </div>
            )}

            {(datos.contacto.nombre || datos.contacto.telefono) && (
              <div className="border-t-4 border-white pt-6">
                <h3 className="mb-3 text-2xl font-bold">Contacto de emergencia</h3>
                {datos.contacto.nombre && (
                  <p className="text-3xl break-words">{datos.contacto.nombre}</p>
                )}
                {enlace ? (
                  <a
                    href={enlace}
                    className="mt-5 flex min-h-20 items-center justify-center rounded-2xl bg-white px-6 py-5 text-center text-3xl font-bold text-black"
                  >
                    Llamar a mi contacto
                  </a>
                ) : (
                  <p className="mt-3 text-2xl">No hay un número válido para llamar.</p>
                )}
                {datos.contacto.telefono && (
                  <p className="mt-3 break-all text-3xl">{datos.contacto.telefono}</p>
                )}
              </div>
            )}

            {tieneDatosMedicos(datos) && (
              <div className="border-t-4 border-white pt-6">
                <h3 className="mb-3 text-2xl font-bold">Información médica</h3>
                <dl className="space-y-4">
                  <Dato etiqueta="Tipo de sangre" valor={datos.medica.tipoSangre} />
                  <Dato etiqueta="Alergias" valor={datos.medica.alergias} />
                  <Dato etiqueta="Medicinas que tomo" valor={datos.medica.medicinas} />
                  <Dato etiqueta="Condiciones de salud" valor={datos.medica.condiciones} />
                </dl>
              </div>
            )}
          </div>
        </div>
      </dialog>

      {/* Solo se ve al imprimir: tarjeta del tamaño de una billetera. Va en <body> (portal) para que la impresión no se repita por página. */}
      {enCliente &&
        createPortal(
          <div id="tarjeta-impresion" aria-hidden="true" className="hidden text-[8pt] leading-tight">
            <p className="text-[9pt] font-bold">
              PERSONA SORDA{datos.nombre ? `: ${datos.nombre}` : ""}
            </p>
            {(datos.contacto.nombre || datos.contacto.telefono) && (
              <p className="font-bold">
                Contacto: {datos.contacto.nombre} {datos.contacto.telefono}
              </p>
            )}
            {nombresComunicacion && <p>Comunicación: {nombresComunicacion}</p>}
            <p className="line-clamp-3">{datos.mensaje.trim() || MENSAJE_POR_DEFECTO}</p>
            {datos.medica.tipoSangre && <p>Sangre: {datos.medica.tipoSangre}</p>}
            {datos.medica.alergias && (
              <p className="line-clamp-2">Alergias: {datos.medica.alergias}</p>
            )}
          </div>,
          document.body,
        )}
    </>
  );
}

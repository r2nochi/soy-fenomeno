"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Deteccion } from "@/lib/detector";
import { SONIDOS, SONIDO_POR_ID, type IdSonido } from "@/lib/sonidos";
import { Subtitulos } from "./Subtitulos";

type OyentePuntajes = (valores: ArrayLike<number>) => void;

type Estado = "inactivo" | "cargando" | "escuchando" | "error";

const CLAVE_AJUSTES = "alerta-visual:ajustes";
const porDefecto = SONIDOS.filter((s) => s.activoPorDefecto).map((s) => s.id);

function leerAjustes(): { activos: IdSonido[]; parpadeo: boolean } {
  try {
    const guardado = JSON.parse(localStorage.getItem(CLAVE_AJUSTES) ?? "");
    if (Array.isArray(guardado.activos)) return guardado;
  } catch {}
  return { activos: porDefecto, parpadeo: true };
}

const hora = (d: Date) =>
  d.toLocaleTimeString("es-PE", { hour: "2-digit", minute: "2-digit" });

// Agrega un aviso a la cola: los urgentes van antes que los demás y un mismo
// sonido no se repite en la cola.
function encolar(cola: Deteccion[], d: Deteccion) {
  const resto = cola.filter((c) => c.id !== d.id);
  const urgente = SONIDO_POR_ID[d.id].urgente;
  const corte = urgente
    ? resto.findIndex((c) => !SONIDO_POR_ID[c.id].urgente)
    : -1;
  if (corte === -1) return [...resto, d];
  return [...resto.slice(0, corte), d, ...resto.slice(corte)];
}

async function notificar(titulo: string, cuerpo: string, urgente: boolean) {
  if (!("Notification" in window) || Notification.permission !== "granted") {
    return;
  }
  const opciones: NotificationOptions & { vibrate?: number[] } = {
    body: cuerpo,
    tag: titulo,
    requireInteraction: urgente,
    vibrate: urgente ? [600, 200, 600, 200, 600] : [300, 150, 300],
  };
  try {
    // En Android, Chrome solo permite notificaciones desde el service worker.
    const registro = await navigator.serviceWorker?.getRegistration();
    if (registro) await registro.showNotification(titulo, opciones);
    else new Notification(titulo, opciones);
  } catch (e) {
    console.error("No se pudo notificar:", e);
  }
}

export function AlertaApp() {
  // Este componente solo se monta en el navegador (ver AlertaCliente), así que
  // puede leer los ajustes guardados al iniciar.
  const [ajustesIniciales] = useState(leerAjustes);
  const [estado, setEstado] = useState<Estado>("inactivo");
  const [error, setError] = useState("");
  const [nivel, setNivel] = useState(0);
  const [cola, setCola] = useState<Deteccion[]>([]);
  const [historial, setHistorial] = useState<Deteccion[]>([]);
  const [activos, setActivos] = useState<Set<IdSonido>>(
    () => new Set(ajustesIniciales.activos),
  );
  const [parpadeo, setParpadeo] = useState(ajustesIniciales.parpadeo);
  const [permisoNotif, setPermisoNotif] = useState(() =>
    "Notification" in window ? Notification.permission : "denied",
  );

  const activosRef = useRef(activos);
  const detenerRef = useRef<(() => void) | null>(null);
  const montadoRef = useRef(true);
  const wakeLockRef = useRef<WakeLockSentinel | null>(null);
  const [subtitulos, setSubtitulos] = useState(false);
  // Los subtítulos se suscriben a los puntajes sin re-renderizar toda la app.
  const oyentesRef = useRef(new Set<OyentePuntajes>());
  const suscribir = useCallback((fn: OyentePuntajes) => {
    oyentesRef.current.add(fn);
    return () => {
      oyentesRef.current.delete(fn);
    };
  }, []);

  useEffect(() => {
    activosRef.current = activos;
    try {
      localStorage.setItem(
        CLAVE_AJUSTES,
        JSON.stringify({ activos: [...activos], parpadeo }),
      );
    } catch {}
  }, [activos, parpadeo]);

  useEffect(() => {
    navigator.serviceWorker?.register("/sw.js").catch(() => {});
    montadoRef.current = true;
    return () => {
      montadoRef.current = false;
      detenerRef.current?.();
    };
  }, []);

  const aviso = cola[0] ?? null;
  // Título original de la página, para restaurarlo al cerrar los avisos.
  const [tituloPagina] = useState(() => document.title);

  useEffect(() => {
    document.title = aviso
      ? `${SONIDO_POR_ID[aviso.id].icono} ${SONIDO_POR_ID[aviso.id].nombre}`
      : tituloPagina;
  }, [aviso, tituloPagina]);

  const avisar = useCallback((d: Deteccion) => {
    const sonido = SONIDO_POR_ID[d.id];
    setCola((c) => encolar(c, d));
    setHistorial((h) => [d, ...h].slice(0, 30));
    navigator.vibrate?.(
      sonido.urgente ? [600, 200, 600, 200, 600] : [300, 150, 300],
    );
    if (document.hidden) {
      void notificar(
        `${sonido.icono} ${sonido.nombre}`,
        `Detectado a las ${hora(d.hora)}`,
        sonido.urgente,
      );
    }
  }, []);

  const pedirPantallaEncendida = useCallback(async () => {
    try {
      wakeLockRef.current = await navigator.wakeLock?.request("screen");
    } catch {}
  }, []);

  const alFallo = useCallback((motivo: string) => {
    detenerRef.current = null;
    void wakeLockRef.current?.release();
    setNivel(0);
    setError(`${motivo} Ya no estamos escuchando. Vuelve a empezar.`);
    setEstado("error");
    navigator.vibrate?.([1000, 300, 1000]);
    void notificar("⚠ Alerta Visual dejó de escuchar", motivo, true);
  }, []);

  async function empezar() {
    setEstado("cargando");
    setError("");
    try {
      if ("Notification" in window && Notification.permission === "default") {
        void Notification.requestPermission().then(setPermisoNotif);
      }
      const { iniciarDetector } = await import("@/lib/detector");
      const detener = await iniciarDetector({
        activos: () => activosRef.current,
        alDetectar: avisar,
        alNivel: setNivel,
        alFallo,
        alPuntajes: (v) => oyentesRef.current.forEach((fn) => fn(v)),
      });
      // Si la página se cerró mientras arrancaba, se apaga el micrófono.
      if (!montadoRef.current) {
        detener();
        return;
      }
      detenerRef.current = detener;
      await pedirPantallaEncendida();
      setEstado("escuchando");
    } catch (e) {
      console.error(e);
      setError(
        e instanceof DOMException && e.name === "NotAllowedError"
          ? "No tenemos permiso para usar el micrófono. Actívalo en el candado junto a la dirección de la página."
          : "No pudimos empezar. Revisa que tu equipo tenga micrófono e inténtalo otra vez.",
      );
      setEstado("error");
    }
  }

  function detener() {
    detenerRef.current?.();
    detenerRef.current = null;
    void wakeLockRef.current?.release();
    setNivel(0);
    setEstado("inactivo");
  }

  // El bloqueo de pantalla se pierde al cambiar de pestaña; se recupera al volver.
  useEffect(() => {
    const alVolver = () => {
      if (!document.hidden && estado === "escuchando") {
        void pedirPantallaEncendida();
      }
    };
    document.addEventListener("visibilitychange", alVolver);
    return () => document.removeEventListener("visibilitychange", alVolver);
  }, [estado, pedirPantallaEncendida]);

  const cerrarAviso = useCallback(() => setCola((c) => c.slice(1)), []);

  function alternar(id: IdSonido) {
    setActivos((a) => {
      const nuevo = new Set(a);
      if (nuevo.has(id)) nuevo.delete(id);
      else nuevo.add(id);
      return nuevo;
    });
  }

  const escuchando = estado === "escuchando";

  return (
    <>
      {aviso && (
        <Aviso
          key={aviso.hora.getTime() + aviso.id}
          deteccion={aviso}
          pendientes={cola.length - 1}
          parpadeo={parpadeo}
          alCerrar={cerrarAviso}
        />
      )}

      <section className="mb-10 rounded-3xl bg-fondo-alt p-6 text-center sm:p-10">
        {escuchando ? (
          <>
            <p role="status" className="mb-4 text-3xl font-bold">
              👂 Escuchando
            </p>
            <div
              aria-hidden="true"
              className="mx-auto mb-3 h-6 w-full max-w-md overflow-hidden rounded-full border-2 border-borde bg-fondo"
            >
              <div
                className="h-full bg-acento transition-[width] duration-200"
                style={{ width: `${Math.round(nivel * 100)}%` }}
              />
            </div>
            <p className="mb-6 text-lg text-suave">
              La barra se mueve cuando el micrófono capta sonido. Deja esta
              página abierta.
            </p>
            {!subtitulos && (
              <button
                onClick={() => setSubtitulos(true)}
                className="mb-4 w-full max-w-md rounded-2xl bg-acento px-8 py-5 text-2xl font-bold text-sobre-acento hover:bg-acento-hover"
              >
                💬 Mostrar subtítulos
              </button>
            )}
            <br />
            <button
              onClick={detener}
              className="rounded-2xl border-2 border-borde px-8 py-4 text-xl font-bold hover:bg-fondo"
            >
              Dejar de escuchar
            </button>
          </>
        ) : (
          <>
            {error && (
              <p
                role="alert"
                className="mb-6 rounded-xl border-2 border-error p-4 text-xl font-semibold text-error"
              >
                ⚠ {error}
              </p>
            )}
            <button
              onClick={empezar}
              disabled={estado === "cargando"}
              className="mb-4 w-full max-w-md rounded-2xl bg-acento px-8 py-6 text-2xl font-bold text-sobre-acento hover:bg-acento-hover disabled:opacity-60"
            >
              {estado === "cargando" ? "Preparando…" : "▶ Empezar a escuchar"}
            </button>
            <p className="text-lg text-suave">
              Te pediremos permiso para usar el micrófono. El sonido se analiza
              en tu equipo y nunca sale de él.
            </p>
          </>
        )}
        {escuchando && permisoNotif !== "granted" && (
          <p className="mt-6 rounded-xl border-2 border-borde p-4 text-lg">
            Las notificaciones están desactivadas: si cambias de pestaña o
            apagas la pantalla, no verás los avisos. Actívalas en el candado
            junto a la dirección de la página.
          </p>
        )}
      </section>

      {escuchando && subtitulos && (
        <Subtitulos suscribir={suscribir} alCerrar={() => setSubtitulos(false)} />
      )}

      <section aria-labelledby="titulo-historial" className="mb-10">
        <h2 id="titulo-historial" className="mb-4 text-2xl font-bold">
          Últimos avisos
        </h2>
        {historial.length === 0 ? (
          <p className="text-lg text-suave">Todavía no hay avisos.</p>
        ) : (
          <ul className="space-y-2">
            {historial.map((d) => {
              const s = SONIDO_POR_ID[d.id];
              return (
                <li
                  key={d.hora.getTime() + d.id}
                  className="flex items-center gap-4 rounded-xl border-2 border-borde/40 p-3 text-lg"
                >
                  <span aria-hidden="true" className="text-3xl">
                    {s.icono}
                  </span>
                  <span className="flex-1 font-semibold">{s.nombre}</span>
                  <time className="text-suave">{hora(d.hora)}</time>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <section aria-labelledby="titulo-sonidos" className="mb-10">
        <h2 id="titulo-sonidos" className="mb-4 text-2xl font-bold">
          ¿Qué sonidos te avisamos?
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {SONIDOS.map((s) => (
            <label
              key={s.id}
              className="flex cursor-pointer items-center gap-4 rounded-xl border-2 border-borde p-4 text-lg has-[:checked]:border-acento has-[:checked]:bg-acento-fondo"
            >
              <input
                type="checkbox"
                checked={activos.has(s.id)}
                onChange={() => alternar(s.id)}
                className="size-6 shrink-0 accent-acento"
              />
              <span aria-hidden="true" className="text-3xl">
                {s.icono}
              </span>
              <span>{s.nombre}</span>
            </label>
          ))}
        </div>

        <label className="mt-6 flex cursor-pointer items-center gap-4 text-lg">
          <input
            type="checkbox"
            checked={parpadeo}
            onChange={() => setParpadeo((p) => !p)}
            className="size-6 accent-acento"
          />
          Hacer parpadear la pantalla en los avisos
        </label>

        <button
          onClick={() =>
            avisar({ id: "puerta", confianza: 1, hora: new Date() })
          }
          className="mt-6 rounded-xl border-2 border-acento px-6 py-3 text-lg font-bold text-acento hover:bg-acento-fondo"
        >
          Probar cómo se ve un aviso
        </button>
      </section>
    </>
  );
}

function Aviso({
  deteccion,
  pendientes,
  parpadeo,
  alCerrar,
}: {
  deteccion: Deteccion;
  pendientes: number;
  parpadeo: boolean;
  alCerrar: () => void;
}) {
  const s = SONIDO_POR_ID[deteccion.id];
  const dialogoRef = useRef<HTMLDialogElement>(null);
  const alCerrarRef = useRef(alCerrar);
  useEffect(() => {
    alCerrarRef.current = alCerrar;
  }, [alCerrar]);

  useEffect(() => {
    // showModal deja inactivo el resto de la página y cierra con Escape.
    dialogoRef.current?.showModal();
    // Los avisos no urgentes se cierran solos; los urgentes esperan.
    if (s.urgente) return;
    const t = setTimeout(() => alCerrarRef.current(), 30000);
    return () => clearTimeout(t);
  }, [s.urgente]);

  return (
    <dialog
      ref={dialogoRef}
      aria-labelledby="aviso-titulo"
      onCancel={(e) => {
        e.preventDefault();
        alCerrar();
      }}
      className={`fixed inset-0 m-0 h-full max-h-none w-full max-w-none p-6 text-white backdrop:bg-black ${parpadeo ? "aviso-parpadeo" : ""}`}
      style={{ backgroundColor: s.color }}
    >
      <div className="flex h-full flex-col items-center justify-center gap-6 text-center">
        <span
          aria-hidden="true"
          className="text-[9rem] leading-none sm:text-[12rem]"
        >
          {s.icono}
        </span>
        <h2 id="aviso-titulo" className="text-4xl font-bold sm:text-6xl">
          {s.nombre}
        </h2>
        <p className="text-2xl">a las {hora(deteccion.hora)}</p>
        <button
          autoFocus
          onClick={alCerrar}
          className="mt-4 rounded-2xl bg-white px-10 py-5 text-2xl font-bold text-black"
        >
          Entendido
        </button>
        {pendientes > 0 && (
          <p className="text-xl">
            {pendientes === 1 ? "Hay 1 aviso más" : `Hay ${pendientes} avisos más`}
          </p>
        )}
      </div>
    </dialog>
  );
}

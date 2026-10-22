"use client";

import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type FormEvent,
} from "react";
import {
  Keyboard,
  Maximize,
  Mic,
  MicOff,
  Minimize,
  Monitor,
  Smartphone,
  Sun,
  Trash2,
  Volume2,
} from "lucide-react";
import { tamanoTexto, unirFrases } from "@/lib/conversacion";
import { iniciarVoz, vozDisponible } from "@/lib/voz";

type Disposicion = "girado" | "lado";
type Quien = "sordo" | "oyente";
type Mensaje = { id: number; quien: Quien; texto: string };

const CLAVE_DISPOSICION = "conversacion:disposicion";
const IDIOMAS_VOZ = ["es-PE", "es-419", "es-US", "es"];
const oyentesDisposicion = new Set<() => void>();

// La preferencia de disposición se guarda en localStorage. El primer render
// (en el servidor y en el navegador) usa "girado" para que coincidan.
function leerDisposicion(): Disposicion {
  try {
    return localStorage.getItem(CLAVE_DISPOSICION) === "lado" ? "lado" : "girado";
  } catch {
    return "girado";
  }
}

function suscribirDisposicion(fn: () => void) {
  oyentesDisposicion.add(fn);
  const alCambiarOtraPestana = (e: StorageEvent) => {
    if (e.key === CLAVE_DISPOSICION) fn();
  };
  window.addEventListener("storage", alCambiarOtraPestana);
  return () => {
    oyentesDisposicion.delete(fn);
    window.removeEventListener("storage", alCambiarOtraPestana);
  };
}

function guardarDisposicion(d: Disposicion) {
  try {
    localStorage.setItem(CLAVE_DISPOSICION, d);
  } catch {}
  oyentesDisposicion.forEach((fn) => fn());
}

const sinSuscripcion = () => () => {};
const enServidor = () => false;

const botonBarra =
  "inline-flex min-h-12 items-center gap-2 rounded-xl border-2 border-borde bg-superficie px-4 py-2 text-lg font-bold text-texto hover:bg-fondo-alt";
const botonAccion =
  "inline-flex min-h-14 items-center justify-center gap-3 rounded-2xl bg-accion px-6 py-3 text-2xl font-bold text-sobre-accion hover:bg-accion-hover disabled:opacity-60";
const chip =
  "min-h-12 rounded-full border-2 border-borde bg-superficie px-4 py-2 text-lg font-bold text-texto hover:bg-acento-fondo";
const bloque =
  "flex min-w-0 flex-col gap-4 rounded-[28px] border-[3px] border-borde/55 bg-superficie p-5";
const lado = `${bloque} min-h-[44dvh] flex-1 md:min-h-[60dvh]`;
const campo =
  "min-h-12 rounded-xl border-2 border-borde bg-superficie p-3 text-xl text-texto";

export function Conversacion({
  frases,
  titulo,
}: {
  frases?: string[];
  titulo?: string;
}) {
  const id = useId();
  const frasesTodas = useMemo(() => unirFrases(frases), [frases]);
  const disposicion = useSyncExternalStore(
    suscribirDisposicion,
    leerDisposicion,
    () => "girado" as Disposicion,
  );
  const girado = disposicion === "girado";
  const hayVoz = useSyncExternalStore(sinSuscripcion, vozDisponible, enServidor);
  const hayPantallaCompleta = useSyncExternalStore(
    sinSuscripcion,
    () => "requestFullscreen" in document.documentElement,
    enServidor,
  );
  const hayWakeLock = useSyncExternalStore(
    sinSuscripcion,
    () => "wakeLock" in navigator,
    enServidor,
  );
  const hayLectura = useSyncExternalStore(
    sinSuscripcion,
    () => "speechSynthesis" in window,
    enServidor,
  );

  const [mensajes, setMensajes] = useState<Mensaje[]>([]);
  // Lo último que la persona Sorda mostró (se ve enorme del lado oyente).
  const [mostrado, setMostrado] = useState("");
  // Lo último que dijo la persona oyente (se ve enorme del lado Sordo).
  const [ultimoOyente, setUltimoOyente] = useState("");
  const [parcial, setParcial] = useState("");
  const [borrador, setBorrador] = useState("");
  const [escrituraOyente, setEscrituraOyente] = useState("");
  const [escuchando, setEscuchando] = useState(false);
  const [errorVoz, setErrorVoz] = useState("");
  const [pantallaFija, setPantallaFija] = useState(false);
  const [errorPantalla, setErrorPantalla] = useState("");
  const [enPantallaCompleta, setEnPantallaCompleta] = useState(false);

  const rootRef = useRef<HTMLElement>(null);
  const idRef = useRef(0);
  const vozRef = useRef<ReturnType<typeof iniciarVoz> | null>(null);
  const fraseRef = useRef<SpeechSynthesisUtterance | null>(null);
  const vigiaRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  const wakeRef = useRef<WakeLockSentinel | null>(null);

  useEffect(() => {
    const alCambiar = () =>
      setEnPantallaCompleta(document.fullscreenElement === rootRef.current);
    document.addEventListener("fullscreenchange", alCambiar);
    return () => document.removeEventListener("fullscreenchange", alCambiar);
  }, []);

  // El sistema apaga la pantalla al ocultar la pestaña: se vuelve a pedir al volver.
  useEffect(() => {
    if (!pantallaFija || !("wakeLock" in navigator)) return;
    let cancelado = false;
    const pedir = async () => {
      try {
        const sentinela = await navigator.wakeLock.request("screen");
        if (cancelado) void sentinela.release();
        else wakeRef.current = sentinela;
      } catch {
        if (cancelado) return;
        setPantallaFija(false);
        setErrorPantalla("No se pudo mantener la pantalla encendida en este equipo.");
      }
    };
    const alVolver = () => {
      if (
        document.visibilityState === "visible" &&
        (!wakeRef.current || wakeRef.current.released)
      ) {
        void pedir();
      }
    };
    void pedir();
    document.addEventListener("visibilitychange", alVolver);
    return () => {
      cancelado = true;
      document.removeEventListener("visibilitychange", alVolver);
      void wakeRef.current?.release().catch(() => {});
      wakeRef.current = null;
    };
  }, [pantallaFija]);

  // Al salir de la página se apaga todo lo que sigue encendido.
  useEffect(() => {
    return () => {
      vozRef.current?.detener();
      vozRef.current = null;
      clearInterval(vigiaRef.current);
      if ("speechSynthesis" in window) speechSynthesis.cancel();
    };
  }, []);

  function agregar(quien: Quien, texto: string) {
    const numero = idRef.current++;
    setMensajes((xs) => [...xs, { id: numero, quien, texto }].slice(-200));
  }

  function mostrar(texto: string) {
    const limpio = texto.trim();
    if (!limpio) return;
    setMostrado(limpio);
    agregar("sordo", limpio);
  }

  function decirOyente(e: FormEvent) {
    e.preventDefault();
    const limpio = escrituraOyente.trim();
    if (!limpio) return;
    agregar("oyente", limpio);
    setUltimoOyente(limpio);
    setParcial("");
    setEscrituraOyente("");
  }

  function alternarEscucha() {
    if (vozRef.current) {
      vozRef.current.detener();
      vozRef.current = null;
      setEscuchando(false);
      setParcial("");
      return;
    }
    setErrorVoz("");
    const instancia = iniciarVoz({
      idiomas: IDIOMAS_VOZ,
      // Esta página no usa la frase de Alerta Visual: el mensaje queda sin frase final.
      complemento: "",
      alParcial: setParcial,
      alFinal: (texto) => {
        setErrorVoz("");
        agregar("oyente", texto);
        setUltimoOyente(texto);
        setParcial("");
      },
      alError: setErrorVoz,
      // Si la transcripción se apaga sola (error fatal), el botón vuelve a "Hablar".
      alDetenido: () => {
        if (vozRef.current !== instancia) return;
        instancia.detener();
        vozRef.current = null;
        setEscuchando(false);
        setParcial("");
      },
    });
    vozRef.current = instancia;
    setEscuchando(true);
  }

  // Mientras el equipo habla, el micrófono no se transcribe a sí mismo.
  function leerEnVoz(texto: string) {
    if (!texto || !("speechSynthesis" in window)) return;
    const frase = new SpeechSynthesisUtterance(texto);
    frase.lang = "es-PE";
    const voces = speechSynthesis.getVoices();
    const voz = ["es-pe", "es-419", "es-us", "es-mx", "es"]
      .map((l) =>
        voces.find((v) => v.lang.toLowerCase().replace("_", "-").startsWith(l)),
      )
      .find(Boolean);
    if (voz) frase.voice = voz;
    fraseRef.current = frase;
    const terminar = () => {
      if (fraseRef.current !== frase) return;
      fraseRef.current = null;
      clearInterval(vigiaRef.current);
      vozRef.current?.reanudar();
    };
    frase.onend = frase.onerror = terminar;
    vozRef.current?.pausar();
    speechSynthesis.cancel();
    speechSynthesis.speak(frase);
    // Por si nunca llega onend.
    clearInterval(vigiaRef.current);
    vigiaRef.current = setInterval(() => {
      if (!speechSynthesis.speaking && !speechSynthesis.pending) terminar();
    }, 1000);
  }

  function borrar() {
    if (!window.confirm("¿Borrar toda la conversación?")) return;
    setMensajes([]);
    setMostrado("");
    setUltimoOyente("");
    setParcial("");
    setBorrador("");
  }

  function alternarPantallaCompleta() {
    if (document.fullscreenElement) void document.exitFullscreen().catch(() => {});
    else void rootRef.current?.requestFullscreen?.().catch(() => {});
  }

  const textoOyente = parcial || ultimoOyente;

  return (
    <section
      ref={rootRef}
      aria-labelledby={`${id}-titulo`}
      className="flex flex-col gap-5 [&:fullscreen]:h-dvh [&:fullscreen]:overflow-y-auto [&:fullscreen]:bg-fondo [&:fullscreen]:p-4"
    >
      <div className="flex flex-wrap items-center gap-3">
        <h2 id={`${id}-titulo`} className="mr-auto text-3xl font-bold">
          {titulo ?? "Conversación cara a cara"}
        </h2>
        <button
          type="button"
          onClick={() => guardarDisposicion(girado ? "lado" : "girado")}
          aria-pressed={!girado}
          className={botonBarra}
        >
          {girado ? (
            <Monitor aria-hidden="true" size={22} />
          ) : (
            <Smartphone aria-hidden="true" size={22} />
          )}
          Sin girar (computadora)
        </button>
        {hayPantallaCompleta && (
          <button type="button" onClick={alternarPantallaCompleta} className={botonBarra}>
            {enPantallaCompleta ? (
              <Minimize aria-hidden="true" size={22} />
            ) : (
              <Maximize aria-hidden="true" size={22} />
            )}
            {enPantallaCompleta ? "Salir de pantalla completa" : "Pantalla completa"}
          </button>
        )}
        {hayWakeLock && (
          <button
            type="button"
            onClick={() => {
              setErrorPantalla("");
              setPantallaFija((v) => !v);
            }}
            aria-pressed={pantallaFija}
            className={botonBarra}
          >
            <Sun aria-hidden="true" size={22} />
            Mantener pantalla encendida
          </button>
        )}
      </div>
      {errorPantalla && (
        <p role="alert" className="rounded-xl border-2 border-error p-3 text-lg text-error">
          {errorPantalla}
        </p>
      )}

      <div className={`flex flex-col gap-4 ${girado ? "" : "md:flex-row"}`}>
        {/* Lado de la persona oyente: se gira para que lo lea de frente. */}
        <div className={`${lado} ${girado ? "rotate-180" : ""}`}>
          <p className="text-xl font-bold text-suave">Para la persona oyente</p>
          <div
            aria-hidden="true"
            className={`flex min-h-0 flex-1 items-center justify-center overflow-y-auto break-words text-center leading-tight text-texto ${
              mostrado ? `font-bold ${tamanoTexto(mostrado)}` : "text-2xl text-suave"
            }`}
          >
            {mostrado || "Aquí aparece lo que escribe la persona Sorda."}
          </div>
          <button
            type="button"
            onClick={alternarEscucha}
            disabled={!hayVoz}
            aria-pressed={escuchando}
            className={botonAccion}
          >
            {escuchando ? (
              <MicOff aria-hidden="true" size={28} />
            ) : (
              <Mic aria-hidden="true" size={28} />
            )}
            {escuchando ? "Dejar de escuchar" : "Hablar"}
          </button>
          {escuchando && <p className="text-lg">Escuchando. Hable con calma.</p>}
          {!hayVoz && (
            <p className="text-lg">
              Este navegador no puede transcribir voz. Use Chrome o Edge, o escriba abajo.
            </p>
          )}
          {errorVoz && (
            <p role="alert" className="rounded-xl border-2 border-error p-3 text-lg text-error">
              {errorVoz}
            </p>
          )}
          <details className="rounded-2xl border-2 border-borde bg-fondo-alt p-3">
            <summary className="flex min-h-12 cursor-pointer items-center gap-2 text-lg font-bold">
              <Keyboard aria-hidden="true" size={22} />
              Escribir en vez de hablar
            </summary>
            <form onSubmit={decirOyente} className="mt-3 flex flex-col gap-3">
              <label htmlFor={`${id}-oyente`} className="text-lg font-bold">
                Escriba lo que dice la persona oyente
              </label>
              <input
                id={`${id}-oyente`}
                value={escrituraOyente}
                onChange={(e) => setEscrituraOyente(e.target.value)}
                maxLength={300}
                className={campo}
              />
              <button type="submit" className={botonBarra}>
                Enviar
              </button>
            </form>
          </details>
        </div>

        {/* Lado de la persona Sorda: de frente a quien escribe. */}
        <div className={lado}>
          <p className="text-xl font-bold text-suave">Lo que dice la otra persona</p>
          <div
            aria-hidden="true"
            className={`flex min-h-0 flex-1 items-center justify-center overflow-y-auto break-words text-center leading-tight text-texto ${
              textoOyente ? `font-bold ${tamanoTexto(textoOyente)}` : "text-2xl text-suave"
            }`}
          >
            {textoOyente
              ? parcial
                ? `${textoOyente}…`
                : textoOyente
              : "Aquí aparece lo que dice la otra persona."}
          </div>

          <label htmlFor={`${id}-sordo`} className="text-xl font-bold">
            Escriba aquí lo que quiere mostrar
          </label>
          <textarea
            id={`${id}-sordo`}
            value={borrador}
            onChange={(e) => setBorrador(e.target.value)}
            rows={3}
            maxLength={300}
            className={`${campo} text-2xl`}
          />
          <button
            type="button"
            onClick={() => {
              mostrar(borrador);
              setBorrador("");
            }}
            disabled={!borrador.trim()}
            className={botonAccion}
          >
            Mostrar
          </button>

          <p id={`${id}-frases`} className="text-xl font-bold">
            Frases rápidas
          </p>
          <div role="group" aria-labelledby={`${id}-frases`} className="flex flex-wrap gap-2">
            {frasesTodas.map((frase) => (
              <button
                key={frase}
                type="button"
                onClick={() => mostrar(frase)}
                className={chip}
              >
                {frase}
              </button>
            ))}
          </div>

          {hayLectura && (
            <button
              type="button"
              onClick={() => leerEnVoz(mostrado)}
              disabled={!mostrado}
              className={botonBarra}
            >
              <Volume2 aria-hidden="true" size={22} />
              Leer en voz alta
            </button>
          )}
        </div>
      </div>

      <section aria-labelledby={`${id}-historial`} className={bloque}>
        <div className="flex flex-wrap items-center gap-3">
          <h3 id={`${id}-historial`} className="mr-auto text-2xl font-bold">
            Conversación
          </h3>
          <button type="button" onClick={borrar} className={botonBarra}>
            <Trash2 aria-hidden="true" size={22} />
            Borrar conversación
          </button>
        </div>
        <div
          role="log"
          aria-live="polite"
          aria-relevant="additions"
          aria-label="Mensajes"
          className="flex max-h-[45dvh] flex-col gap-3 overflow-y-auto rounded-xl bg-fondo-alt p-4 text-xl"
        >
          {mensajes.length === 0 && (
            <p className="text-suave">Todavía no hay mensajes.</p>
          )}
          {mensajes.map((m) => (
            <p key={m.id} className="border-l-4 border-acento pl-3 break-words">
              <span className="font-bold">
                {m.quien === "sordo" ? "Tú: " : "La otra persona: "}
              </span>
              {m.texto}
            </p>
          ))}
        </div>
      </section>

      <p className="text-lg text-suave">
        Chrome y Edge envían el audio a los servidores de Google o Microsoft para
        transcribirlo. Esta página no guarda ni envía la conversación: se borra
        al cerrarla.
      </p>
    </section>
  );
}

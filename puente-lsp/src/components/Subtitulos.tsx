"use client";

import { memo, useEffect, useRef, useState, type FormEvent } from "react";
import {
  etiquetasPresentes,
  textoEtiqueta,
  type EtiquetaDetectada,
} from "@/lib/etiquetas";
import { iniciarVoz, vozDisponible } from "@/lib/voz";

type Item = {
  id: number;
  tipo: "voz" | "sonido" | "yo";
  texto: string;
  hora: Date;
};

type Suscribir = (fn: (valores: ArrayLike<number>) => void) => () => void;

const TAMANOS = ["text-2xl", "text-3xl", "text-4xl", "text-5xl"];
const CLAVE_TAMANO = "alerta-visual:tamano-subtitulos";
// Un sonido debe repetirse en ventanas cercanas antes de escribirse.
const GOLPES = 2;
const ENTRE_GOLPES_MS = 1500;
// Tiempo antes de volver a escribir el mismo sonido.
const REPETIR_MS = 20000;
// Tiempo que un sonido sigue en la franja de "Sonidos ahora".
const FRANJA_MS = 2500;
// Tras una alarma, sus pitidos no se nombran aparte durante este tiempo.
const ALARMA_TAPA_PITIDO_MS = 30000;

let siguienteId = 0;


function leerTamano() {
  try {
    const n = Number(localStorage.getItem(CLAVE_TAMANO));
    if (n >= 0 && n < TAMANOS.length) return n;
  } catch {}
  return 1;
}

export function Subtitulos({
  suscribir,
  alCerrar,
}: {
  suscribir: Suscribir;
  alCerrar: () => void;
}) {
  const [items, setItems] = useState<Item[]>([]);
  const [parcial, setParcial] = useState("");
  const [ahora, setAhora] = useState<EtiquetaDetectada[]>([]);
  const [error, setError] = useState(() =>
    vozDisponible()
      ? ""
      : "Este navegador no puede transcribir voz. Usa Chrome o Edge. Los sonidos sí se muestran.",
  );
  const [tamano, setTamano] = useState(leerTamano);
  const [respuesta, setRespuesta] = useState("");
  const [copiado, setCopiado] = useState(false);

  const panelRef = useRef<HTMLDivElement>(null);
  const listaRef = useRef<HTMLDivElement>(null);
  const vozRef = useRef<ReturnType<typeof iniciarVoz> | null>(null);
  const fraseRef = useRef<SpeechSynthesisUtterance | null>(null);
  const vigiaVozRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  const [esAndroid] = useState(() => /Android/i.test(navigator.userAgent));

  const agregar = (tipo: Item["tipo"], texto: string) =>
    setItems((xs) =>
      [...xs, { id: siguienteId++, tipo, texto, hora: new Date() }].slice(-300),
    );

  // Voz → texto.
  useEffect(() => {
    if (!vozDisponible()) return;
    vozRef.current = iniciarVoz({
      idiomas: ["es-PE", "es-419", "es-US", "es"],
      alParcial: setParcial,
      alFinal: (texto) => {
        setError("");
        agregar("voz", texto);
      },
      alError: setError,
    });
    return () => {
      vozRef.current?.detener();
      clearInterval(vigiaVozRef.current);
    };
  }, []);

  // Sonidos → etiquetas en la franja y dentro del texto.
  useEffect(() => {
    const golpes = new Map<string, { n: number; ultimo: number }>();
    const escrito = new Map<string, number>();
    const enFranja = new Map<string, { d: EtiquetaDetectada; visto: number }>();
    let ultimaAlarma = 0;
    let franjaAnterior = "";

    return suscribir((valores) => {
      const t = Date.now();
      const presentes = etiquetasPresentes(valores);
      if (presentes.some((d) => d.etiqueta.id === "incendio")) ultimaAlarma = t;
      const tapaPitido = t - ultimaAlarma < ALARMA_TAPA_PITIDO_MS;
      if (tapaPitido) enFranja.delete("pitido");
      for (const d of presentes) {
        const id = d.etiqueta.id;
        if (tapaPitido && id === "pitido") continue;
        enFranja.set(id, { d, visto: t });
        const g = golpes.get(id);
        const n = g && t - g.ultimo < ENTRE_GOLPES_MS ? g.n + 1 : 1;
        golpes.set(id, { n, ultimo: t });
        const necesarios = d.etiqueta.golpes ?? GOLPES;
        if (n >= necesarios && t - (escrito.get(id) ?? 0) > REPETIR_MS) {
          escrito.set(id, t);
          agregar("sonido", textoEtiqueta(d));
        }
      }
      for (const [id, { visto }] of enFranja) {
        if (t - visto > FRANJA_MS) enFranja.delete(id);
      }
      // Solo se re-renderiza si la franja cambió.
      const franja = [...enFranja.values()].map((x) => x.d);
      const clave = franja.map(textoEtiqueta).join("|");
      if (clave !== franjaAnterior) {
        franjaAnterior = clave;
        setAhora(franja);
      }
    });
  }, [suscribir]);

  // Baja sola al final, salvo que la persona haya subido a releer.
  useEffect(() => {
    const lista = listaRef.current;
    if (!lista) return;
    const cerca = lista.scrollHeight - lista.scrollTop - lista.clientHeight < 200;
    if (cerca) lista.scrollTop = lista.scrollHeight;
  }, [items, parcial]);

  function cambiarTamano(delta: number) {
    setTamano((t) => {
      const n = Math.min(TAMANOS.length - 1, Math.max(0, t + delta));
      try {
        localStorage.setItem(CLAVE_TAMANO, String(n));
      } catch {}
      return n;
    });
  }

  function hablar(e: FormEvent) {
    e.preventDefault();
    const texto = respuesta.trim();
    if (!texto || !("speechSynthesis" in window)) return;
    const frase = new SpeechSynthesisUtterance(texto);
    frase.lang = "es-PE";
    const voces = speechSynthesis.getVoices();
    const voz = ["es-pe", "es-419", "es-us", "es-mx", "es"]
      .map((l) => voces.find((v) => v.lang.toLowerCase().replace("_", "-").startsWith(l)))
      .find(Boolean);
    if (voz) frase.voice = voz;
    // La frase se guarda en un ref: si Chrome la libera de memoria antes de
    // terminar, nunca avisa que terminó.
    fraseRef.current = frase;
    const terminar = () => {
      if (fraseRef.current !== frase) return;
      fraseRef.current = null;
      clearInterval(vigiaVozRef.current);
      vozRef.current?.reanudar();
    };
    frase.onend = frase.onerror = terminar;
    vozRef.current?.pausar();
    speechSynthesis.cancel();
    speechSynthesis.speak(frase);
    // Por si nunca llega onend: se reanuda cuando ya no está hablando.
    clearInterval(vigiaVozRef.current);
    vigiaVozRef.current = setInterval(() => {
      if (!speechSynthesis.speaking && !speechSynthesis.pending) terminar();
    }, 1000);
    agregar("yo", texto);
    setRespuesta("");
  }

  async function copiar() {
    const texto = items
      .map((i) =>
        i.tipo === "sonido"
          ? `(${i.texto})`
          : i.tipo === "yo"
            ? `Yo: ${i.texto}`
            : i.texto,
      )
      .join("\n");
    try {
      await navigator.clipboard.writeText(texto);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {}
  }

  function pantallaCompleta() {
    if (document.fullscreenElement) void document.exitFullscreen();
    else void panelRef.current?.requestFullscreen?.();
  }

  const boton =
    "rounded-xl border-2 border-borde px-4 py-2 text-lg font-bold hover:bg-fondo-alt";

  return (
    <section
      ref={panelRef}
      aria-labelledby="titulo-subtitulos"
      className="mb-10 flex flex-col rounded-3xl border-2 border-borde bg-fondo p-4 sm:p-6 [&:fullscreen]:h-screen [&:fullscreen]:rounded-none"
    >
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <h2 id="titulo-subtitulos" className="mr-auto text-2xl font-bold">
          💬 Subtítulos
        </h2>
        <button
          onClick={() => cambiarTamano(-1)}
          className={boton}
          aria-label="Letra más pequeña"
        >
          A−
        </button>
        <button
          onClick={() => cambiarTamano(1)}
          className={boton}
          aria-label="Letra más grande"
        >
          A+
        </button>
        <button onClick={pantallaCompleta} className={boton}>
          ⛶ Pantalla completa
        </button>
        <button onClick={copiar} className={boton}>
          {copiado ? "✓ Copiado" : "Copiar"}
        </button>
        <button onClick={() => setItems([])} className={boton}>
          Borrar
        </button>
        <button onClick={alCerrar} className={boton}>
          Cerrar
        </button>
      </div>

      {/* Franja de sonidos del momento, como en Live Transcribe. */}
      <div
        aria-hidden="true"
        className="mb-3 flex min-h-12 flex-wrap items-center gap-2 rounded-xl bg-fondo-alt px-3 py-2 text-lg"
      >
        <span className="text-suave">Sonidos ahora:</span>
        {ahora.length === 0 ? (
          <span className="text-suave">—</span>
        ) : (
          ahora.map((d) => (
            <span
              key={d.etiqueta.id}
              className="rounded-full border-2 border-borde px-3 py-0.5 font-semibold"
            >
              {textoEtiqueta(d)}
            </span>
          ))
        )}
      </div>

      {error && (
        <p role="alert" className="mb-3 rounded-xl border-2 border-error p-3 text-lg text-error">
          ⚠ {error}
        </p>
      )}

      <div
        ref={listaRef}
        role="log"
        aria-relevant="additions"
        aria-label="Transcripción"
        className={`min-h-64 flex-1 overflow-y-auto rounded-xl bg-fondo-alt p-4 leading-snug ${TAMANOS[tamano]} max-h-[60vh] [:fullscreen_&]:max-h-none`}
      >
        {items.length === 0 && !parcial && (
          <p aria-hidden="true" className="text-suave">
            Esperando voz o sonidos…
          </p>
        )}
        <Lista items={items} />
        {/* El texto parcial cambia varias veces por segundo: no se anuncia. */}
        {parcial && (
          <p aria-hidden="true" className="my-2 text-suave">
            {parcial}…
          </p>
        )}
      </div>

      <form onSubmit={hablar} className="mt-4 flex flex-col gap-2 sm:flex-row">
        <label htmlFor="respuesta" className="sr-only">
          Escribe lo que quieres decir en voz alta
        </label>
        <input
          id="respuesta"
          value={respuesta}
          onChange={(e) => setRespuesta(e.target.value)}
          placeholder="Escribe para responder en voz alta…"
          className="flex-1 rounded-xl border-2 border-borde bg-fondo px-4 py-3 text-xl"
        />
        <button
          type="submit"
          className="rounded-xl bg-acento px-6 py-3 text-xl font-bold text-sobre-acento hover:bg-acento-hover"
        >
          🔊 Decir
        </button>
      </form>

      {esAndroid && (
        <p className="mt-3 rounded-xl border-2 border-borde p-3 text-base">
          En celulares Android, la transcripción y los avisos usan el micrófono
          a la vez. Comprueba que la barra de “Escuchando” siga moviéndose con
          los subtítulos abiertos.
        </p>
      )}

      <p className="mt-3 text-base text-suave">
        Para transcribir la voz, el navegador envía el audio a Google. Los demás
        sonidos se analizan en tu equipo. El texto no se guarda: se borra al
        cerrar la página.
      </p>
    </section>
  );
}

// Lista aparte y memorizada: no se vuelve a dibujar con cada texto parcial.
const Lista = memo(function Lista({ items }: { items: Item[] }) {
  return (
    <>
      {items.map((i) =>
        i.tipo === "sonido" ? (
          <p key={i.id} className="my-2 font-semibold text-acento">
            ({i.texto})
          </p>
        ) : i.tipo === "yo" ? (
          <p key={i.id} className="my-2 border-l-4 border-acento pl-3">
            <span className="text-suave">Tú dijiste: </span>
            {i.texto}
          </p>
        ) : (
          <p key={i.id} className="my-2">
            {i.texto}
          </p>
        ),
      )}
    </>
  );
});

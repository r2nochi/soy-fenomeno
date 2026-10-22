"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { MessageCircle, SendHorizontal, X } from "lucide-react";
import { SUGERIDAS, responder, type Respuesta } from "@/lib/respuestas";
import { enlaceWhatsapp } from "@/lib/sitio";


// Temas en los que conviene ofrecer hablar con una persona.
const CON_WHATSAPP = new Set(["no-entiendo", "colaborar", "empresas"]);

type Mensaje =
  | { id: number; rol: "tu"; texto: string }
  | { id: number; rol: "puente"; respuesta: Respuesta; relacionadas: Respuesta[] };

// Personaje de Puente LSP: una cara amable bajo el arco del logo. Saluda con la
// mano, pero no hace señas (las señas las hacen personas reales).
function Personaje({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 64 64" className={className}>
      <path d="M8 30 Q32 -2 56 30" fill="none" stroke="#9ec0ff" strokeWidth="5" strokeLinecap="round" />
      <circle cx="32" cy="38" r="20" fill="#ffffff" />
      <circle cx="25" cy="35" r="3" fill="#0f1729" />
      <circle cx="39" cy="35" r="3" fill="#0f1729" />
      <path d="M24 44 Q32 51 40 44" fill="none" stroke="#0f1729" strokeWidth="3" strokeLinecap="round" />
      <circle cx="20" cy="42" r="2.5" fill="#ffb3c1" />
      <circle cx="44" cy="42" r="2.5" fill="#ffb3c1" />
      <path d="M53 40 l5 -9 M56 42 l7 -6 M57 46 l7 -2" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function Lineas({ lineas }: { lineas: string[] }) {
  return (
    <>
      {lineas.map((l, i) =>
        l.startsWith("- ") ? (
          <p key={i} className="flex gap-2">
            <span aria-hidden="true">•</span>
            <span>{l.slice(2)}</span>
          </p>
        ) : (
          <p key={i}>{l}</p>
        ),
      )}
    </>
  );
}

function Preguntas({ lista, alElegir }: { lista: Respuesta[]; alElegir: (r: Respuesta) => void }) {
  return (
    <ul className="space-y-2">
      {lista.map((r) => (
        <li key={r.id}>
          <button
            onClick={() => alElegir(r)}
            className="w-full rounded-2xl border-2 border-borde/55 px-4 py-2 text-left text-base font-bold hover:border-acento"
          >
            {r.pregunta}
          </button>
        </li>
      ))}
    </ul>
  );
}

export function Asistente() {
  const [abierto, setAbierto] = useState(false);
  const [entrada, setEntrada] = useState("");
  const [mensajes, setMensajes] = useState<Mensaje[]>([]);
  const entradaRef = useRef<HTMLTextAreaElement>(null);
  const listaRef = useRef<HTMLDivElement>(null);
  const botonRef = useRef<HTMLButtonElement>(null);
  const siguienteId = useRef(0);

  function cerrar() {
    setAbierto(false);
    botonRef.current?.focus();
  }

  useEffect(() => {
    if (abierto) entradaRef.current?.focus();
  }, [abierto]);

  // Escape cierra el panel aunque el foco esté fuera de él.
  useEffect(() => {
    if (!abierto) return;
    const alPulsar = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setAbierto(false);
        botonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", alPulsar);
    return () => document.removeEventListener("keydown", alPulsar);
  }, [abierto]);

  // Lleva a la vista el inicio de la última respuesta, no el final de la lista.
  useEffect(() => {
    listaRef.current?.querySelector("[data-ultima]")?.scrollIntoView({ block: "start" });
  }, [mensajes]);

  function agregar(texto: string, respuesta: Respuesta, relacionadas: Respuesta[]) {
    setMensajes((m) => [
      ...m,
      { id: siguienteId.current++, rol: "tu", texto },
      { id: siguienteId.current++, rol: "puente", respuesta, relacionadas },
    ]);
  }

  function enviar(texto: string) {
    const limpio = texto.trim().slice(0, 300);
    if (!limpio) return;
    const { respuesta, relacionadas } = responder(limpio);
    agregar(limpio, respuesta, relacionadas);
    setEntrada("");
  }

  const elegir = (r: Respuesta) => agregar(r.pregunta, r, []);

  // Para lectores de pantalla y braille: se anuncia la última respuesta.
  const ultima = mensajes.at(-1);
  const anuncio = ultima?.rol === "puente" ? `Puente: ${ultima.respuesta.lineas.map((l) => l.replace(/^- /, "")).join(" ")}` : "";
  const whatsapp = enlaceWhatsapp("Hola, tengo una pregunta sobre Puente LSP.");

  return (
    <div className="fixed right-4 bottom-4 z-40 flex flex-col items-end gap-3 sm:right-6 sm:bottom-6">
      {abierto && (
        <section
          role="dialog"
          aria-label="Asistente Puente"
          className="flex h-[min(36rem,calc(100vh-7rem))] w-[min(26rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-[28px] border-[3px] border-borde/55 bg-superficie shadow-[0_24px_60px_-20px_rgb(15_23_41/0.5)]"
        >
          <header className="flex items-center gap-3 bg-accion px-5 py-4 text-sobre-accion">
            <Personaje className="size-11 shrink-0" />
            <div className="flex-1">
              <h2 className="text-xl font-bold">Pregúntale a Puente</h2>
              <p className="text-base opacity-85">Respondo por escrito, en español sencillo.</p>
            </div>
            <button onClick={cerrar} aria-label="Cerrar el panel" className="rounded-xl p-2 hover:bg-white/15">
              <X aria-hidden="true" className="size-6" />
            </button>
          </header>

          <div ref={listaRef} className="flex-1 space-y-4 overflow-y-auto px-5 py-5 text-lg leading-snug">
            {mensajes.length === 0 && (
              <div>
                <p>
                  Hola. Te ayudo con intérpretes de LSP, Alerta Visual, trabajos y
                  tips para comunicarte mejor. No hago señas: para eso, nada
                  reemplaza a una persona.
                </p>
                <div className="mt-4">
                  <Preguntas lista={SUGERIDAS} alElegir={elegir} />
                </div>
              </div>
            )}

            {mensajes.map((m) =>
              m.rol === "tu" ? (
                <div key={m.id} className="ml-8 rounded-2xl bg-acento-fondo px-4 py-3">
                  <span className="sr-only">Tú:</span>
                  {m.texto}
                </div>
              ) : (
                <div key={m.id} data-ultima={m === ultima || undefined} className="mr-4 scroll-mt-4 space-y-2">
                  <span className="sr-only">Puente:</span>
                  <Lineas lineas={m.respuesta.lineas} />
                  {(!!m.respuesta.enlaces?.length || (!!whatsapp && CON_WHATSAPP.has(m.respuesta.id))) && (
                    <p className="flex flex-wrap gap-2 pt-1">
                      {m.respuesta.enlaces?.map((e) => (
                        <Link
                          key={e.href + e.texto}
                          href={e.href}
                          className="rounded-full bg-accion px-4 py-2 text-base font-bold text-sobre-accion no-underline hover:bg-accion-hover"
                        >
                          {e.texto}
                        </Link>
                      ))}
                      {whatsapp && CON_WHATSAPP.has(m.respuesta.id) && (
                        <a
                          href={whatsapp}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-full border-2 border-borde px-4 py-2 text-base font-bold no-underline hover:border-acento"
                        >
                          <MessageCircle aria-hidden="true" className="size-5" />
                          Escribir por WhatsApp
                        </a>
                      )}
                    </p>
                  )}
                  {m.relacionadas.length > 0 && (
                    <div className="pt-2">
                      <p className="mb-2 text-base text-suave">También te puede servir:</p>
                      <Preguntas lista={m.relacionadas} alElegir={elegir} />
                    </div>
                  )}
                </div>
              ),
            )}
          </div>
          <p role="status" className="sr-only">
            {anuncio}
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              enviar(entrada);
            }}
            className="flex items-end gap-2 border-t-2 border-borde/25 p-3"
          >
            <label htmlFor="pregunta-asistente" className="sr-only">
              Escribe tu pregunta
            </label>
            <textarea
              id="pregunta-asistente"
              ref={entradaRef}
              value={entrada}
              rows={2}
              maxLength={300}
              onChange={(e) => setEntrada(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  enviar(entrada);
                }
              }}
              placeholder="Escribe tu pregunta…"
              className="flex-1 resize-none rounded-2xl border-2 border-borde bg-fondo px-4 py-3 text-lg"
            />
            <button
              type="submit"
              aria-label="Enviar pregunta"
              className="rounded-2xl bg-accion p-3 text-sobre-accion hover:bg-accion-hover"
            >
              <SendHorizontal aria-hidden="true" className="size-6" />
            </button>
          </form>
          <p className="px-4 pb-3 text-sm text-suave">
            Respuestas escritas por el equipo de Puente LSP. No es asesoría legal ni médica.
          </p>
        </section>
      )}

      <button
        ref={botonRef}
        onClick={() => (abierto ? cerrar() : setAbierto(true))}
        aria-expanded={abierto}
        className="flex items-center gap-3 rounded-full bg-accion py-2 pr-5 pl-2 text-lg font-bold text-sobre-accion shadow-[0_14px_30px_-12px_rgb(11_79_209/0.7)] hover:bg-accion-hover"
      >
        <Personaje className="size-11" />
        {abierto ? "Cerrar" : "Pregúntale a Puente"}
      </button>
    </div>
  );
}

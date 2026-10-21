"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import Link from "next/link";
import { Fragment, useEffect, useRef, useState, type ReactNode } from "react";
import { SendHorizontal, X } from "lucide-react";

const SUGERENCIAS = [
  "¿Cómo pido un intérprete de LSP?",
  "¿Cómo hablo con una persona Sorda?",
  "¿Qué hace Alerta Visual?",
];

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

// Convierte enlaces [texto](/ruta) y rutas sueltas del sitio en enlaces reales.
const PATRON =
  /\[([^\]]+)\]\(((?:\/|https?:\/\/)[^\s)]+)\)|(\/(?:interprete|herramientas\/alerta-visual|blog)(?:\/[\w-]+)*)/g;

function conEnlaces(texto: string): ReactNode[] {
  const partes: ReactNode[] = [];
  let ultimo = 0;
  for (const m of texto.matchAll(PATRON)) {
    if (m.index > ultimo) partes.push(texto.slice(ultimo, m.index));
    const href = m[2] ?? m[3];
    const etiqueta = m[1] ?? m[3];
    const clase = "font-bold text-acento underline underline-offset-4";
    partes.push(
      href.startsWith("/") ? (
        <Link key={m.index} href={href} className={clase}>
          {etiqueta}
        </Link>
      ) : (
        <a key={m.index} href={href} target="_blank" rel="noopener noreferrer" className={clase}>
          {etiqueta}
        </a>
      ),
    );
    ultimo = m.index + m[0].length;
  }
  if (ultimo < texto.length) partes.push(texto.slice(ultimo));
  return partes;
}

function Texto({ texto }: { texto: string }) {
  // Quita el formato **negrita** y muestra cada línea por separado.
  const lineas = texto.replace(/\*\*/g, "").split("\n").filter((l) => l.trim());
  return (
    <>
      {lineas.map((l, i) =>
        /^\s*[-•*]\s+/.test(l) ? (
          <p key={i} className="flex gap-2">
            <span aria-hidden="true">•</span>
            <span>{conEnlaces(l.replace(/^\s*[-•*]\s+/, ""))}</span>
          </p>
        ) : (
          <p key={i}>{conEnlaces(l)}</p>
        ),
      )}
    </>
  );
}

export function Asistente() {
  const [abierto, setAbierto] = useState(false);
  const [entrada, setEntrada] = useState("");
  const { messages, sendMessage, status, error, stop } = useChat({
    transport: new DefaultChatTransport({ api: "/api/asistente" }),
  });
  const entradaRef = useRef<HTMLTextAreaElement>(null);
  const listaRef = useRef<HTMLDivElement>(null);
  const ocupado = status === "submitted" || status === "streaming";

  useEffect(() => {
    if (abierto) entradaRef.current?.focus();
  }, [abierto]);

  useEffect(() => {
    listaRef.current?.scrollTo({ top: listaRef.current.scrollHeight });
  }, [messages, status]);

  function enviar(texto: string) {
    const limpio = texto.trim();
    if (!limpio || ocupado) return;
    void sendMessage({ text: limpio });
    setEntrada("");
  }

  return (
    <div className="fixed right-4 bottom-4 z-40 flex flex-col items-end gap-3 sm:right-6 sm:bottom-6">
      {abierto && (
        <section
          role="dialog"
          aria-label="Asistente Puente"
          onKeyDown={(e) => e.key === "Escape" && setAbierto(false)}
          className="flex h-[min(36rem,calc(100vh-7rem))] w-[min(26rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-[28px] border-[3px] border-borde/55 bg-superficie shadow-[0_24px_60px_-20px_rgb(15_23_41/0.5)]"
        >
          <header className="flex items-center gap-3 bg-accion px-5 py-4 text-sobre-accion">
            <Personaje className="size-11 shrink-0" />
            <div className="flex-1">
              <h2 className="text-xl font-bold">Pregúntale a Puente</h2>
              <p className="text-base opacity-85">Respondo por escrito, en español sencillo.</p>
            </div>
            <button
              onClick={() => setAbierto(false)}
              aria-label="Cerrar el asistente"
              className="rounded-xl p-2 hover:bg-white/15"
            >
              <X aria-hidden="true" className="size-6" />
            </button>
          </header>

          <div ref={listaRef} className="flex-1 space-y-4 overflow-y-auto px-5 py-5 text-lg leading-snug">
            {messages.length === 0 && (
              <div>
                <p>
                  Hola. Te ayudo con intérpretes de LSP, Alerta Visual y tips para
                  comunicarte mejor. No hago señas: para eso, nada reemplaza a una
                  persona.
                </p>
                <ul className="mt-4 space-y-2">
                  {SUGERENCIAS.map((s) => (
                    <li key={s}>
                      <button
                        onClick={() => enviar(s)}
                        className="w-full rounded-2xl border-2 border-borde/55 px-4 py-2 text-left text-base font-bold hover:border-acento"
                      >
                        {s}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {messages.map((m) => (
              <div
                key={m.id}
                className={
                  m.role === "user"
                    ? "ml-8 rounded-2xl bg-acento-fondo px-4 py-3"
                    : "mr-4 space-y-2"
                }
              >
                <span className="sr-only">{m.role === "user" ? "Tú:" : "Puente:"}</span>
                {m.parts.map((p, i) =>
                  p.type === "text" ? (
                    <Fragment key={i}>
                      <Texto texto={p.text} />
                    </Fragment>
                  ) : null,
                )}
              </div>
            ))}

            {status === "submitted" && (
              <p className="text-suave" role="status">
                Puente está escribiendo…
              </p>
            )}
            {error && (
              <p role="alert" className="rounded-2xl border-2 border-error p-3 text-base text-error">
                No pude responder ahora. Inténtalo de nuevo en un momento.
              </p>
            )}
          </div>

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
              maxLength={1200}
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
            {ocupado ? (
              <button
                type="button"
                onClick={stop}
                className="rounded-2xl border-2 border-borde px-4 py-3 text-base font-bold"
              >
                Detener
              </button>
            ) : (
              <button
                type="submit"
                aria-label="Enviar pregunta"
                className="rounded-2xl bg-accion p-3 text-sobre-accion hover:bg-accion-hover"
              >
                <SendHorizontal aria-hidden="true" className="size-6" />
              </button>
            )}
          </form>
          <p className="px-4 pb-3 text-sm text-suave">
            Respuestas generadas por IA: pueden equivocarse. No es asesoría legal ni médica.
          </p>
        </section>
      )}

      <button
        onClick={() => setAbierto((a) => !a)}
        aria-expanded={abierto}
        aria-label={abierto ? "Cerrar el asistente" : "Abrir el asistente Puente"}
        className="flex items-center gap-3 rounded-full bg-accion py-2 pr-5 pl-2 text-lg font-bold text-sobre-accion shadow-[0_14px_30px_-12px_rgb(11_79_209/0.7)] hover:bg-accion-hover"
      >
        <Personaje className="size-11" />
        {abierto ? "Cerrar" : "Pregúntale a Puente"}
      </button>
    </div>
  );
}

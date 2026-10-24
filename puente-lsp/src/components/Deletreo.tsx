"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { CAJA, IMAGEN_ALFABETO, LETRAS, aLetras } from "@/lib/aprende";
import { Espejo } from "./Espejo";

const VELOCIDADES = [
  { id: "lento", texto: "Lento", ms: 2200 },
  { id: "normal", texto: "Normal", ms: 1300 },
] as const;

// Deletreo con el alfabeto manual peruano: marca cada letra sobre la lámina
// oficial del MINEDU, una tras otra. La imagen no se modifica: el marco y el
// oscurecido son capas encima.
export function Deletreo() {
  const [texto, setTexto] = useState("");
  const [paso, setPaso] = useState(0);
  const [tocando, setTocando] = useState(false);
  const [velocidad, setVelocidad] = useState<(typeof VELOCIDADES)[number]["id"]>("lento");
  // Letra elegida tocando la lámina, fuera de un deletreo.
  const [elegida, setElegida] = useState<string | null>(null);

  const secuencia = useMemo(() => aLetras(texto), [texto]);
  const actual = elegida ?? (secuencia.length ? secuencia[Math.min(paso, secuencia.length - 1)] : null);
  const caja = LETRAS.find((l) => l.letra === actual);
  const anterior = paso > 0 ? secuencia[paso - 1] : null;
  const repetida = !elegida && actual !== " " && actual === anterior;

  useEffect(() => {
    if (!tocando) return;
    const ms = VELOCIDADES.find((v) => v.id === velocidad)!.ms;
    const id = setTimeout(() => {
      if (paso >= secuencia.length - 1) setTocando(false);
      else setPaso(paso + 1);
    }, ms);
    return () => clearTimeout(id);
  }, [tocando, paso, secuencia.length, velocidad]);

  const mover = (n: number) => {
    setElegida(null);
    setTocando(false);
    setPaso((p) => Math.max(0, Math.min(secuencia.length - 1, p + n)));
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <div>
        <label htmlFor="deletreo-texto" className="block text-xl font-bold">
          Escribe tu nombre o una palabra
        </label>
        <input
          id="deletreo-texto"
          value={texto}
          maxLength={40}
          autoComplete="off"
          onChange={(e) => {
            setTexto(e.target.value);
            setPaso(0);
            setElegida(null);
            setTocando(false);
          }}
          placeholder="Por ejemplo: Rosa"
          className="mt-2 min-h-14 w-full rounded-2xl border-[3px] border-borde/55 bg-superficie px-4 text-2xl focus:border-acento"
        />

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button
            type="button"
            disabled={!secuencia.length}
            onClick={() => {
              setElegida(null);
              if (!tocando && paso >= secuencia.length - 1) setPaso(0);
              setTocando(!tocando);
            }}
            className="inline-flex min-h-14 items-center gap-2 rounded-2xl bg-accion px-6 text-xl font-bold text-sobre-accion hover:bg-accion-hover disabled:opacity-50"
          >
            {tocando ? <Pause aria-hidden="true" className="size-6" /> : <Play aria-hidden="true" className="size-6" />}
            {tocando ? "Pausa" : "Deletrear"}
          </button>
          <button
            type="button"
            onClick={() => mover(-1)}
            disabled={!secuencia.length || paso === 0}
            aria-label="Letra anterior"
            className="inline-flex size-14 items-center justify-center rounded-2xl border-[3px] border-borde/55 disabled:opacity-40"
          >
            <ChevronLeft aria-hidden="true" className="size-7" />
          </button>
          <button
            type="button"
            onClick={() => mover(1)}
            disabled={!secuencia.length || paso >= secuencia.length - 1}
            aria-label="Letra siguiente"
            className="inline-flex size-14 items-center justify-center rounded-2xl border-[3px] border-borde/55 disabled:opacity-40"
          >
            <ChevronRight aria-hidden="true" className="size-7" />
          </button>
          <fieldset className="flex gap-2">
            <legend className="sr-only">Velocidad</legend>
            {VELOCIDADES.map((v) => (
              <label
                key={v.id}
                className="inline-flex min-h-12 cursor-pointer items-center rounded-full border-2 border-borde/55 px-4 text-lg font-bold has-checked:border-acento has-checked:bg-acento-fondo has-checked:text-acento has-focus-visible:outline-3 has-focus-visible:outline-offset-2 has-focus-visible:outline-acento"
              >
                <input
                  type="radio"
                  name="velocidad"
                  value={v.id}
                  checked={velocidad === v.id}
                  onChange={() => setVelocidad(v.id)}
                  className="sr-only"
                />
                {v.texto}
              </label>
            ))}
          </fieldset>
        </div>

        {/* La letra en grande y el resto de la palabra, con la actual marcada. */}
        <div aria-live="polite" className="mt-6 rounded-[28px] bg-tinta p-6 text-sobre-tinta">
          <p className="text-lg opacity-80">{actual ? "Letra" : "Toca una letra en la lámina o escribe arriba"}</p>
          <p className="text-8xl leading-none font-bold">
            {actual === " " ? <span className="text-3xl">(espacio entre palabras)</span> : actual ?? "–"}
          </p>
          {repetida && (
            <p className="mt-2 text-lg">Letra doble: haz un movimiento corto hacia la derecha.</p>
          )}
          {actual === "Ñ" && <p className="mt-2 text-lg">Ñ: doble movimiento hacia ambos lados.</p>}
          {!elegida && secuencia.length > 0 && (
            <p className="mt-4 flex flex-wrap gap-1 text-2xl font-bold tracking-widest" aria-hidden="true">
              {secuencia.map((l, i) => (
                <span
                  key={i}
                  className={i === paso ? "rounded-md bg-acento-claro px-1 text-tinta" : "px-1 opacity-60"}
                >
                  {l === " " ? "·" : l}
                </span>
              ))}
            </p>
          )}
        </div>

        <Espejo />
      </div>

      <figure>
        <div className="relative overflow-hidden rounded-[28px] border-[3px] border-borde/55 bg-white">
          <Image
            src={IMAGEN_ALFABETO.src}
            width={IMAGEN_ALFABETO.ancho}
            height={IMAGEN_ALFABETO.alto}
            sizes="(min-width: 1024px) 540px, 100vw"
            alt="Alfabeto dactilológico peruano del MINEDU: las 27 letras de la A a la Z, con la Ñ, dibujadas como formas de la mano."
            className="h-auto w-full"
          />
          {caja && actual !== " " && (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute rounded-xl ring-[5px] ring-acento shadow-[0_0_0_9999px_rgb(15_23_42/0.45)] transition-[left,top] duration-300 motion-reduce:transition-none"
              style={{ left: `${caja.x}%`, top: `${caja.y}%`, width: `${CAJA.ancho}%`, height: `${CAJA.alto}%` }}
            />
          )}
          {LETRAS.map((l) => (
            <button
              key={l.letra}
              type="button"
              aria-label={`Ver la letra ${l.letra}`}
              aria-current={actual === l.letra ? "true" : undefined}
              onClick={() => {
                setTocando(false);
                setElegida(l.letra);
              }}
              className="absolute rounded-xl focus-visible:outline-4 focus-visible:outline-acento"
              style={{ left: `${l.x}%`, top: `${l.y}%`, width: `${CAJA.ancho}%`, height: `${CAJA.alto}%` }}
            />
          ))}
        </div>
      </figure>
    </div>
  );
}

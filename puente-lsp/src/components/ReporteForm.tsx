"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { enviarReporte } from "@/app/lugares/actions";
import {
  ASPECTOS,
  DEPARTAMENTOS,
  LIMITES,
  RUBROS,
  type EstadoLugar,
} from "@/lib/lugares-datos";
import { SelectorUbicacion } from "@/components/SelectorUbicacion";

export type LugarReportado = {
  id: string;
  nombre: string;
};

const estadoInicial: EstadoLugar = { ok: false, mensaje: "" };

const campo =
  "w-full min-h-12 rounded-xl border-2 border-borde bg-superficie px-4 py-3 text-xl text-texto placeholder:text-suave aria-[invalid=true]:border-error";
const etiqueta = "mb-2 block text-xl font-bold";
const opcion =
  "flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border-2 border-borde p-4 text-xl has-[:checked]:border-acento has-[:checked]:bg-acento-fondo";

function MensajeError({ id, errores }: { id: string; errores?: string[] }) {
  if (!errores?.length) return null;
  return (
    <p id={id} role="alert" className="mt-2 text-lg font-bold text-error">
      ⚠ {errores[0]}
    </p>
  );
}

function texto(v: string | string[] | undefined): string {
  return typeof v === "string" ? v : "";
}

// Solo cuenta lo positivo en la v1: evita publicar acusaciones sin verificar.
export function ReporteForm({ lugar }: { lugar?: LugarReportado }) {
  const [estado, accion, enviando] = useActionState(enviarReporte, estadoInicial);
  const formRef = useRef<HTMLFormElement>(null);
  const exitoRef = useRef<HTMLDivElement>(null);
  const [comentario, setComentario] = useState(texto(estado.valores?.comentario));
  // Vuelve a montar los <select> no controlados tras cada envío (React reinicia el form).
  const [version, setVersion] = useState(0);

  useEffect(() => {
    if (estado.ok) {
      exitoRef.current?.focus();
    } else if (estado.errores) {
      formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
    }
  }, [estado]);

  const e = estado.errores ?? {};
  const invalido = (k: string) => ({
    "aria-invalid": !!e[k]?.length,
    "aria-describedby": e[k]?.length ? `error-${k}` : undefined,
  });
  const v = (k: string) => texto(estado.valores?.[k]);
  const aspectosEnviados = estado.valores?.aspecto;
  const marcado = (k: string) =>
    Array.isArray(aspectosEnviados) ? aspectosEnviados.includes(k) : false;

  if (estado.ok && !estado.valores) {
    return (
      <div
        ref={exitoRef}
        tabIndex={-1}
        role="status"
        className="rounded-[28px] border-[3px] border-exito bg-exito-fondo p-8 text-xl"
      >
        <p className="mb-2 text-2xl font-bold">✓ Gracias</p>
        <p className="mb-6">{estado.mensaje}</p>
        <Link href="/lugares" className="font-bold text-acento underline underline-offset-4">
          Ver los lugares
        </Link>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      action={(datos) => {
        setVersion((n) => n + 1);
        accion(datos);
      }}
      noValidate
      className="space-y-8"
    >
      {/* Campo trampa para bots: invisible para personas y lectores de pantalla. */}
      <div aria-hidden="true" className="absolute -left-[9999px]">
        <label>
          Sitio web
          <input name="sitio_web" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {lugar ? (
        <>
          <input type="hidden" name="lugar_id" value={lugar.id} />
          <div className="rounded-[28px] border-[3px] border-borde/55 bg-acento-fondo p-6">
            <p className="text-lg">Vas a contar sobre:</p>
            <p className="text-2xl font-bold">{lugar.nombre}</p>
          </div>
        </>
      ) : (
        <fieldset className="space-y-4">
          <legend className="mb-3 text-2xl font-bold">1. El lugar</legend>
          <div>
            <label htmlFor="nombre" className={etiqueta}>
              Nombre del lugar
            </label>
            <input
              id="nombre"
              name="nombre"
              defaultValue={v("nombre")}
              maxLength={LIMITES.nombre}
              required
              {...invalido("nombre")}
              className={campo}
            />
            <MensajeError id="error-nombre" errores={e.nombre} />
          </div>
          <div>
            <label htmlFor="rubro" className={etiqueta}>
              ¿Qué tipo de lugar es?
            </label>
            <select
              key={`rubro-${version}`}
              id="rubro"
              name="rubro"
              defaultValue={v("rubro")}
              {...invalido("rubro")}
              className={campo}
            >
              <option value="">Elige una opción</option>
              {Object.entries(RUBROS).map(([k, t]) => (
                <option key={k} value={k}>
                  {t}
                </option>
              ))}
            </select>
            <MensajeError id="error-rubro" errores={e.rubro} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="departamento" className={etiqueta}>
                Departamento
              </label>
              <select
                key={`dep-${version}`}
                id="departamento"
                name="departamento"
                defaultValue={v("departamento")}
                {...invalido("departamento")}
                className={campo}
              >
                <option value="">Elige un departamento</option>
                {DEPARTAMENTOS.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
              <MensajeError id="error-departamento" errores={e.departamento} />
            </div>
            <div>
              <label htmlFor="distrito" className={etiqueta}>
                Distrito
              </label>
              <input
                id="distrito"
                name="distrito"
                defaultValue={v("distrito")}
                maxLength={LIMITES.distrito}
                required
                {...invalido("distrito")}
                className={campo}
              />
              <MensajeError id="error-distrito" errores={e.distrito} />
            </div>
          </div>
        </fieldset>
      )}

      <fieldset className="space-y-4">
        <legend className="mb-3 text-2xl font-bold">
          {lugar ? "1." : "2."} ¿Qué fue bueno? Marca lo que aplique
        </legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {Object.entries(ASPECTOS).map(([k, t], i) => (
            <label key={k} className={opcion}>
              <input
                type="checkbox"
                name="aspecto"
                value={k}
                defaultChecked={marcado(k)}
                // Solo la primera casilla lleva el error: así el foco llega al grupo.
                {...(i === 0 ? invalido("aspecto") : {})}
                className="size-6 shrink-0 accent-acento"
              />
              {t}
            </label>
          ))}
        </div>
        <MensajeError id="error-aspecto" errores={e.aspecto} />
      </fieldset>

      <div>
        <label htmlFor="comentario" className={etiqueta}>
          Cuéntanos más <span className="font-normal text-suave">(opcional)</span>
        </label>
        <textarea
          id="comentario"
          name="comentario"
          rows={4}
          maxLength={LIMITES.comentario}
          value={comentario}
          onChange={(ev) => setComentario(ev.target.value)}
          {...invalido("comentario")}
          className={campo}
        />
        <p className="mt-2 text-base text-suave">
          {comentario.length} de {LIMITES.comentario} caracteres
        </p>
        <MensajeError id="error-comentario" errores={e.comentario} />
      </div>

      {!lugar && <SelectorUbicacion latInicial={v("lat") || undefined} lngInicial={v("lng") || undefined} />}

      <div>
        <label className="flex min-h-12 cursor-pointer items-start gap-3 text-xl">
          <input
            type="checkbox"
            name="consentimiento"
            defaultChecked={estado.valores?.consentimiento === "on"}
            required
            {...invalido("consentimiento")}
            className="mt-1 size-6 shrink-0 accent-acento"
          />
          <span>
            Acepto que Puente LSP guarde estos datos para publicar el lugar y
            contactarme. Leí la{" "}
            <Link href="/privacidad" className="font-bold text-acento underline underline-offset-4">
              política de privacidad
            </Link>
            .
          </span>
        </label>
        <MensajeError id="error-consentimiento" errores={e.consentimiento} />
      </div>

      {estado.mensaje && (
        <p role="alert" className="text-xl font-bold text-error">
          {estado.mensaje}
        </p>
      )}

      <button
        type="submit"
        disabled={enviando}
        className="min-h-14 w-full rounded-2xl bg-accion px-6 py-3 text-2xl font-bold text-sobre-accion hover:bg-accion-hover disabled:opacity-60 sm:w-auto"
      >
        {enviando ? "Enviando…" : "Enviar"}
      </button>
    </form>
  );
}

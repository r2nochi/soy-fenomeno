"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { enviarSolicitud } from "@/app/actions";
import {
  AMBITOS,
  LIMITES,
  TIPOS_SOLICITANTE,
  URGENCIAS,
  type EstadoFormulario,
  type Solicitud,
} from "@/lib/solicitud";

const estadoInicial: EstadoFormulario = { ok: false, mensaje: "" };

const campo =
  "w-full rounded-lg border-2 border-borde bg-superficie px-4 py-3 text-lg text-texto placeholder:text-suave focus:border-acento aria-[invalid=true]:border-error";
const etiqueta = "mb-2 block text-lg font-bold";
const opcion =
  "flex cursor-pointer items-center gap-3 rounded-lg border-2 border-borde p-4 text-lg has-[:checked]:border-acento has-[:checked]:bg-acento-fondo";

function MensajeError({ id, errores }: { id: string; errores?: string[] }) {
  if (!errores?.length) return null;
  return (
    <p id={id} className="mt-2 font-bold text-error">
      ⚠ {errores[0]}
    </p>
  );
}

export function SolicitudForm() {
  const [estado, accion, enviando] = useActionState(
    enviarSolicitud,
    estadoInicial,
  );
  const [tipo, setTipo] = useState(
    (estado.valores?.tipo as Solicitud["tipo"]) ?? "persona_sorda",
  );
  const [urgencia, setUrgencia] = useState(
    (estado.valores?.urgencia as "ahora" | "fecha" | undefined) ?? "ahora",
  );
  const formRef = useRef<HTMLFormElement>(null);
  const exitoRef = useRef<HTMLDivElement>(null);

  // Lleva el foco al primer campo con error, o al mensaje de éxito.
  useEffect(() => {
    if (estado.ok) {
      exitoRef.current?.focus();
    } else if (estado.errores) {
      formRef.current
        ?.querySelector<HTMLElement>('[aria-invalid="true"]')
        ?.focus();
    }
  }, [estado]);

  const e = estado.errores ?? {};
  const invalido = (k: keyof Solicitud) => ({
    "aria-invalid": !!e[k],
    "aria-describedby": e[k] ? `error-${k}` : undefined,
  });
  // React reinicia el formulario tras cada envío; así se conserva lo escrito.
  const v = (k: keyof Solicitud) => estado.valores?.[k] ?? "";

  if (estado.ok) {
    return (
      <div
        ref={exitoRef}
        tabIndex={-1}
        role="status"
        className="rounded-2xl border-2 border-exito bg-exito-fondo p-8 text-xl"
      >
        <p className="mb-2 text-2xl font-bold">✓ Listo</p>
        <p>{estado.mensaje}</p>
      </div>
    );
  }

  return (
    <form ref={formRef} action={accion} noValidate className="space-y-6">
      {/* Campo trampa para bots: invisible para personas y lectores de pantalla. */}
      <div aria-hidden="true" className="absolute -left-[9999px]">
        <label>
          Sitio web
          <input name="sitio_web" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <fieldset>
        <legend className={etiqueta}>¿Quién eres?</legend>
        <div className="grid gap-3 sm:grid-cols-3">
          {Object.entries(TIPOS_SOLICITANTE).map(([valor, texto]) => (
            <label key={valor} className={opcion}>
              <input
                type="radio"
                name="tipo"
                value={valor}
                defaultChecked={tipo === valor}
                onChange={() => setTipo(valor as Solicitud["tipo"])}
                className="size-5 accent-acento"
              />
              {texto}
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="nombre" className={etiqueta}>
          Tu nombre
        </label>
        <input
          id="nombre"
          name="nombre"
          defaultValue={v("nombre")}
          maxLength={LIMITES.nombre}
          autoComplete="name"
          required
          {...invalido("nombre")}
          className={campo}
        />
        <MensajeError id="error-nombre" errores={e.nombre} />
      </div>

      {(tipo === "entidad" || e.organizacion) && (
        <div>
          <label htmlFor="organizacion" className={etiqueta}>
            Empresa o entidad
          </label>
          <input
            id="organizacion"
            name="organizacion"
            defaultValue={v("organizacion")}
            maxLength={LIMITES.organizacion}
            autoComplete="organization"
            {...invalido("organizacion")}
            className={campo}
          />
          <MensajeError id="error-organizacion" errores={e.organizacion} />
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="whatsapp" className={etiqueta}>
            WhatsApp
          </label>
          <input
            id="whatsapp"
            name="whatsapp"
            defaultValue={v("whatsapp")}
            maxLength={LIMITES.whatsapp}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="+51 999 888 777"
            {...invalido("whatsapp")}
            className={campo}
          />
          <MensajeError id="error-whatsapp" errores={e.whatsapp} />
        </div>
        <div>
          <label htmlFor="email" className={etiqueta}>
            Correo <span className="font-normal text-suave">(opcional)</span>
          </label>
          <input
            id="email"
            name="email"
            defaultValue={v("email")}
            maxLength={LIMITES.email}
            type="email"
            autoComplete="email"
            {...invalido("email")}
            className={campo}
          />
          <MensajeError id="error-email" errores={e.email} />
        </div>
      </div>

      {tipo !== "interprete" && (
        <>
          <fieldset>
            <legend className={etiqueta}>
              ¿Cuándo te gustaría usarlo?
            </legend>
            <div className="grid gap-3 sm:grid-cols-2">
              {Object.entries(URGENCIAS).map(([valor, texto]) => (
                <label key={valor} className={opcion}>
                  <input
                    type="radio"
                    name="urgencia"
                    value={valor}
                    defaultChecked={urgencia === valor}
                    onChange={() =>
                      setUrgencia(valor as "ahora" | "fecha")
                    }
                    className="size-5 accent-acento"
                  />
                  {texto}
                </label>
              ))}
            </div>
          </fieldset>

          {(urgencia === "fecha" || e.fecha) && (
            <div>
              <label htmlFor="fecha" className={etiqueta}>
                Fecha y hora
              </label>
              <input
                id="fecha"
                name="fecha"
                defaultValue={v("fecha")}
                type="datetime-local"
                {...invalido("fecha")}
                className={campo}
              />
              <MensajeError id="error-fecha" errores={e.fecha} />
            </div>
          )}

          <div>
            <label htmlFor="ambito" className={etiqueta}>
              ¿Para qué?
            </label>
            <select
              id="ambito"
              name="ambito"
              defaultValue={v("ambito")}
              {...invalido("ambito")}
              className={campo}
            >
              <option value="">Elige una opción</option>
              {Object.entries(AMBITOS).map(([valor, texto]) => (
                <option key={valor} value={valor}>
                  {texto}
                </option>
              ))}
            </select>
            <MensajeError id="error-ambito" errores={e.ambito} />
            <p className="mt-2 text-base text-suave">
              Para emergencias, citas médicas o temas legales importantes, pide
              un intérprete certificado: el piloto no puede asegurar uno a tiempo.
            </p>
          </div>
        </>
      )}

      <div>
        <label htmlFor="mensaje" className={etiqueta}>
          {tipo === "interprete"
            ? "Cuéntanos tu experiencia"
            : "Algo más que debamos saber"}{" "}
          <span className="font-normal text-suave">(opcional)</span>
        </label>
        <textarea
          id="mensaje"
          name="mensaje"
          defaultValue={v("mensaje")}
          maxLength={LIMITES.mensaje}
          rows={3}
          {...invalido("mensaje")}
          className={campo}
        />
        <MensajeError id="error-mensaje" errores={e.mensaje} />
      </div>

      <div>
        <label className="flex cursor-pointer items-start gap-3 text-lg">
          <input
            type="checkbox"
            name="consentimiento"
            defaultChecked={estado.valores?.consentimiento === "on"}
            required
            {...invalido("consentimiento")}
            className="mt-1 size-5 shrink-0 accent-acento"
          />
          <span>
            Acepto que Puente LSP guarde estos datos y me contacte por WhatsApp
            o correo para el piloto. Leí la{" "}
            <a href="/privacidad" target="_blank" className="font-bold text-acento underline underline-offset-4">
              política de privacidad
            </a>
            .
          </span>
        </label>
        <MensajeError id="error-consentimiento" errores={e.consentimiento} />
      </div>

      {estado.mensaje && (
        <p role="alert" className="text-lg font-bold text-error">
          {estado.mensaje}
        </p>
      )}

      <button
        type="submit"
        disabled={enviando}
        className="w-full rounded-xl bg-accion px-6 py-4 text-xl font-bold text-sobre-accion hover:bg-accion-hover disabled:opacity-60 sm:w-auto"
      >
        {enviando ? "Enviando…" : "Anotarme"}
      </button>
    </form>
  );
}

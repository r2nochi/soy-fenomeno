"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { registrarSello } from "@/app/lugares/actions";
import {
  ATIENDE_LSP,
  DEPARTAMENTOS,
  FRASES_POR_RUBRO,
  LIMITES,
  RUBROS,
  type EstadoLugar,
} from "@/lib/lugares-datos";
import { SelectorUbicacion } from "@/components/SelectorUbicacion";

const estadoInicial: EstadoLugar = { ok: false, mensaje: "" };
const NUMERO_FRASES = 8;

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

export function SelloForm() {
  const [estado, accion, enviando] = useActionState(registrarSello, estadoInicial);
  const [rubro, setRubro] = useState(texto(estado.valores?.rubro));
  // React reinicia el formulario tras cada envío; esta versión vuelve a montar
  // los <select> no controlados para que recuperen el valor enviado.
  const [version, setVersion] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);
  const mensajeRef = useRef<HTMLParagraphElement>(null);

  // Tras un error, lleva el foco al primer campo marcado. Tras éxito, al aviso.
  useEffect(() => {
    if (estado.ok) {
      mensajeRef.current?.focus();
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

  // Frases: las de los valores enviados, o las sugeridas para el rubro.
  const frasEnviadas = estado.valores?.frase;
  const frasesEnviadas = Array.isArray(frasEnviadas) ? frasEnviadas : null;
  const sugeridas = rubro in FRASES_POR_RUBRO ? FRASES_POR_RUBRO[rubro as keyof typeof FRASES_POR_RUBRO] : [];
  const frasesIniciales = frasesEnviadas ?? sugeridas;

  if (estado.ok && !estado.valores) {
    return (
      <div
        ref={mensajeRef}
        tabIndex={-1}
        role="status"
        className="rounded-[28px] border-[3px] border-exito bg-exito-fondo p-8 text-xl"
      >
        <p className="mb-2 text-2xl font-bold">✓ Listo</p>
        <p>{estado.mensaje}</p>
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

      <fieldset className="space-y-4">
        <legend className="mb-3 text-2xl font-bold">1. Tu lugar</legend>
        <div>
          <label htmlFor="nombre" className={etiqueta}>
            Nombre del lugar
          </label>
          <input
            id="nombre"
            name="nombre"
            defaultValue={v("nombre")}
            maxLength={LIMITES.nombre}
            autoComplete="organization"
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
            id="rubro"
            name="rubro"
            value={rubro}
            onChange={(ev) => setRubro(ev.target.value)}
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

        <div>
          <label htmlFor="direccion" className={etiqueta}>
            Dirección <span className="font-normal text-suave">(opcional)</span>
          </label>
          <input
            id="direccion"
            name="direccion"
            defaultValue={v("direccion")}
            maxLength={LIMITES.direccion}
            autoComplete="street-address"
            {...invalido("direccion")}
            className={campo}
          />
          <MensajeError id="error-direccion" errores={e.direccion} />
        </div>
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="mb-3 text-2xl font-bold">2. Cómo atienden</legend>
        <div>
          <p className={etiqueta} id="lsp-titulo">
            ¿Su personal sabe Lengua de Señas Peruana (LSP)?
          </p>
          <div role="radiogroup" aria-labelledby="lsp-titulo" className="grid gap-3 sm:grid-cols-3">
            {Object.entries(ATIENDE_LSP).map(([k, t], i) => (
              <label key={k} className={opcion}>
                <input
                  type="radio"
                  name="atiende_lsp"
                  value={k}
                  defaultChecked={v("atiende_lsp") === k}
                  // Solo la primera opción lleva el error: así el foco llega al grupo.
                  {...(i === 0 ? invalido("atiende_lsp") : {})}
                  className="size-6 accent-acento"
                />
                {t}
              </label>
            ))}
          </div>
          <MensajeError id="error-atiende_lsp" errores={e.atiende_lsp} />
        </div>

        <div>
          <p className={etiqueta} id="interprete-titulo">
            ¿Pueden llamar a un intérprete de LSP cuando lo necesiten?
          </p>
          <div role="radiogroup" aria-labelledby="interprete-titulo" className="grid gap-3 sm:grid-cols-2">
            <label className={opcion}>
              <input
                type="radio"
                name="interprete"
                value="si"
                defaultChecked={v("interprete") === "si"}
                {...invalido("interprete")}
                className="size-6 accent-acento"
              />
              Sí
            </label>
            <label className={opcion}>
              <input type="radio" name="interprete" value="no" defaultChecked={v("interprete") === "no"} className="size-6 accent-acento" />
              No
            </label>
          </div>
          <MensajeError id="error-interprete" errores={e.interprete} />
        </div>
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="mb-3 text-2xl font-bold">3. Frases para el mostrador</legend>
        <p className="text-lg text-suave">
          Son frases que la persona Sorda puede tocar para decir lo que necesita.
          Se muestran grandes en la pantalla de su celular para que usted las
          lea. Les sugerimos frases según su tipo de lugar; puede cambiarlas o
          dejar algunas en blanco (máximo {NUMERO_FRASES}). Mientras Puente LSP
          revisa su lugar, se muestran las sugeridas; después, las suyas.
        </p>
        <div className="space-y-3" key={rubro || "sin-rubro"}>
          {Array.from({ length: NUMERO_FRASES }, (_, i) => (
            <div key={i}>
              <label htmlFor={`frase-${i}`} className="mb-1 block text-lg font-bold">
                Frase {i + 1}
              </label>
              <input
                id={`frase-${i}`}
                name="frase"
                defaultValue={frasesIniciales[i] ?? ""}
                maxLength={LIMITES.frase}
                className={campo}
              />
            </div>
          ))}
        </div>
        <MensajeError id="error-frase" errores={e.frase} />
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="mb-3 text-2xl font-bold">4. Contacto y mapa</legend>
        <div>
          <label htmlFor="email" className={etiqueta}>
            Correo de contacto
          </label>
          <input
            id="email"
            name="email"
            type="email"
            defaultValue={v("email")}
            maxLength={LIMITES.email}
            autoComplete="email"
            required
            {...invalido("email")}
            className={campo}
          />
          <p className="mt-2 text-lg text-suave">
            Este correo es privado: nunca se muestra en la página pública.
          </p>
          <MensajeError id="error-email" errores={e.email} />
        </div>

        <SelectorUbicacion latInicial={v("lat") || undefined} lngInicial={v("lng") || undefined} />
        <MensajeError id="error-lat" errores={e.lat} />
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="mb-3 text-2xl font-bold">5. Tu compromiso</legend>
        <div>
          <label className="flex min-h-12 cursor-pointer items-start gap-3 text-xl">
            <input
              type="checkbox"
              name="compromiso"
              defaultChecked={estado.valores?.compromiso === "on"}
              required
              {...invalido("compromiso")}
              className="mt-1 size-6 shrink-0 accent-acento"
            />
            <span>
              Nos comprometemos a atender con paciencia, a escribir o usar esta
              pantalla cuando haga falta, y a llamar a un intérprete de LSP
              cuando sea posible.
            </span>
          </label>
          <MensajeError id="error-compromiso" errores={e.compromiso} />
        </div>
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
      </fieldset>

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
        {enviando ? "Guardando…" : "Registrar mi lugar"}
      </button>
    </form>
  );
}

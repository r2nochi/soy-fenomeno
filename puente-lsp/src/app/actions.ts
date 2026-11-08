"use server";

import "server-only";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import { solicitudSchema, type EstadoFormulario } from "@/lib/solicitud";

const MENSAJE_EXITO =
  "Ya estás en la lista. Te escribimos por WhatsApp o correo cuando tengamos un intérprete disponible.";
const MENSAJE_EXITO_INTERPRETE =
  "Ya estás en la lista. Te escribimos por WhatsApp o correo para coordinar tu participación.";

export async function enviarSolicitud(
  _prev: EstadoFormulario,
  formData: FormData,
): Promise<EstadoFormulario> {
  // Los campos vacíos llegan como "" y se tratan como no enviados.
  const datos = Object.fromEntries(
    [...formData.entries()].filter(
      (par): par is [string, string] =>
        !par[0].startsWith("$ACTION") &&
        typeof par[1] === "string" &&
        par[1] !== "",
    ),
  );

  // Campo trampa invisible: solo un bot lo llena. Se le responde "ok" sin guardar.
  if (datos.sitio_web) {
    return { ok: true, mensaje: MENSAJE_EXITO };
  }

  // Las casillas de lenguas llegan repetidas; en `datos` quedan unidas por
  // comas para volver a marcarlas si hay un error.
  // País y lenguas solo se aceptan de intérpretes.
  const esInterprete = datos.tipo === "interprete";
  const lenguas = esInterprete
    ? [...new Set(formData.getAll("lenguas").filter((l) => typeof l === "string"))]
    : [];
  delete datos.lenguas;
  if (!esInterprete) delete datos.pais;
  if (lenguas.length > 0) datos.lenguas = lenguas.join(",");

  const resultado = solicitudSchema.safeParse({
    ...datos,
    lenguas: lenguas.length > 0 ? lenguas : undefined,
  });
  if (!resultado.success) {
    return {
      ok: false,
      valores: datos,
      mensaje: "Revisa los campos marcados.",
      errores: z.flattenError(resultado.error).fieldErrors,
    };
  }

  const url = process.env.SUPABASE_URL;
  const llave = process.env.SUPABASE_SECRET_KEY;
  if (!url || !llave) {
    console.error("Faltan SUPABASE_URL o SUPABASE_SECRET_KEY");
    return {
      ok: false,
      valores: datos,
      mensaje:
        "No pudimos guardar tu solicitud. Escríbenos por WhatsApp mientras lo arreglamos.",
    };
  }

  // El consentimiento se valida pero no se guarda como columna.
  const solicitud = { ...resultado.data, consentimiento: undefined };
  const supabase = createClient(url, llave, {
    auth: { persistSession: false },
  });
  const { error } = await supabase.from("solicitudes").insert(solicitud);

  if (error) {
    console.error("Error al guardar la solicitud:", error.message);
    return {
      ok: false,
      valores: datos,
      mensaje: "No pudimos guardar tu solicitud. Inténtalo otra vez.",
    };
  }

  return { ok: true, mensaje: esInterprete ? MENSAJE_EXITO_INTERPRETE : MENSAJE_EXITO };
}

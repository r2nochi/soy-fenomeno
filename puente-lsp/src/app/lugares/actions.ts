"use server";

import "server-only";
import { createHash } from "node:crypto";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import {
  generarIdLugar,
  leerDatos,
  reporteSchema,
  selloSchema,
  type EstadoLugar,
} from "@/lib/lugares-datos";
import { clienteServidor, lugarPorId } from "@/lib/lugares";

// Mismo criterio que los demás formularios: el campo trampa responde "ok" sin guardar.
const MENSAJE_SELLO =
  "Recibimos tu registro. Lo revisamos antes de publicarlo en el mapa.";
const MENSAJE_REPORTE =
  "Gracias por contarnos. Lo revisamos antes de publicarlo.";
const MENSAJE_ERROR_GUARDAR =
  "No pudimos guardar. Inténtalo otra vez en un momento.";
const MENSAJE_LIMITE =
  "Ya recibimos varios envíos desde tu conexión. Inténtalo otra vez dentro de una hora.";
const MENSAJE_COLA =
  "Tenemos muchos lugares esperando revisión. Inténtalo de nuevo en unos días.";

const CODIGO_DUPLICADO = "23505";
const ENVIOS_POR_HORA = 5;
const PENDIENTES_MAXIMOS = 200;
const HORA_MS = 60 * 60 * 1000;
const DIA_MS = 24 * HORA_MS;

// Inserta con un id nuevo; si por azar choca con otro, prueba de nuevo.
async function insertarLugar(fila: Record<string, unknown>): Promise<string> {
  const db = clienteServidor();
  for (let intento = 0; intento < 3; intento++) {
    const id = generarIdLugar();
    const { error } = await db.from("lugares").insert({ ...fila, id });
    if (!error) return id;
    if (error.code !== CODIGO_DUPLICADO) throw new Error(error.message);
  }
  throw new Error("No se pudo generar un id único");
}

// Clave de límite: acción + hash de la IP. La IP nunca se guarda en claro.
async function claveConexion(accion: "sello" | "reporte"): Promise<string> {
  const h = await headers();
  const ip = (h.get("x-forwarded-for") ?? "").split(",")[0].trim() || "desconocida";
  const sal = (process.env.SUPABASE_SECRET_KEY ?? "").slice(-16) || "puente-lsp-limites";
  const hash = createHash("sha256").update(`${sal}:${ip}`).digest("hex");
  return `${accion}:${hash}`;
}

// Anota el intento y después cuenta: así varios envíos a la vez no pasan todos
// el límite. También borra las filas de límite de más de 24 horas.
async function reservarEnvio(clave: string): Promise<boolean> {
  const db = clienteServidor();
  const { error } = await db.from("limites").insert({ clave });
  if (error) throw new Error(error.message);

  const antes = new Date(Date.now() - DIA_MS).toISOString();
  const { error: errorLimpieza } = await db.from("limites").delete().lt("creado_en", antes);
  if (errorLimpieza) console.error("No se pudo limpiar limites:", errorLimpieza.message);

  const desde = new Date(Date.now() - HORA_MS).toISOString();
  const { count, error: errorCuenta } = await db
    .from("limites")
    .select("clave", { count: "exact", head: true })
    .eq("clave", clave)
    .gte("creado_en", desde);
  if (errorCuenta) throw new Error(errorCuenta.message);
  return (count ?? 0) <= ENVIOS_POR_HORA;
}

// Cola de reportes pendientes de revisión (cada lugar nuevo de la comunidad trae su reporte).
async function colaLlena(): Promise<boolean> {
  const { count, error } = await clienteServidor()
    .from("reportes")
    .select("id", { count: "exact", head: true })
    .eq("aprobado", false)
    .eq("oculto", false);
  if (error) throw new Error(error.message);
  return (count ?? 0) > PENDIENTES_MAXIMOS;
}

export async function registrarSello(
  _prev: EstadoLugar,
  formData: FormData,
): Promise<EstadoLugar> {
  const datos = leerDatos([...formData.entries()]);

  if (datos.sitio_web) {
    return { ok: true, mensaje: MENSAJE_SELLO };
  }

  const resultado = selloSchema.safeParse(datos);
  if (!resultado.success) {
    return {
      ok: false,
      mensaje: "Revisa los campos marcados.",
      valores: datos,
      errores: z.flattenError(resultado.error).fieldErrors,
    };
  }

  const d = resultado.data;
  let id: string;
  try {
    const clave = await claveConexion("sello");
    if (!(await reservarEnvio(clave))) {
      return { ok: false, mensaje: MENSAJE_LIMITE, valores: datos };
    }

    id = await insertarLugar({
      tipo: "sello",
      nombre: d.nombre,
      rubro: d.rubro,
      departamento: d.departamento,
      distrito: d.distrito,
      direccion: d.direccion || null,
      lat: d.lat ?? null,
      lng: d.lng ?? null,
      atiende_lsp: d.atiende_lsp,
      interprete: d.interprete === "si",
      frases: d.frase,
      email_contacto: d.email,
      aprobado: false,
      consentimiento_en: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error al guardar el sello:", error);
    return { ok: false, mensaje: MENSAJE_ERROR_GUARDAR, valores: datos };
  }

  // Redirige fuera del bloque try: redirect lanza una excepción propia.
  redirect(`/sello/${id}/afiche`);
}

export async function enviarReporte(
  _prev: EstadoLugar,
  formData: FormData,
): Promise<EstadoLugar> {
  const datos = leerDatos([...formData.entries()]);

  if (datos.sitio_web) {
    return { ok: true, mensaje: MENSAJE_REPORTE };
  }

  const resultado = reporteSchema.safeParse(datos);
  if (!resultado.success) {
    return {
      ok: false,
      mensaje: "Revisa los campos marcados.",
      valores: datos,
      errores: z.flattenError(resultado.error).fieldErrors,
    };
  }

  const d = resultado.data;
  // Solo se llena si este envío crea un lugar nuevo: si falla el reporte, se borra esa fila.
  let lugarNuevoId: string | null = null;
  try {
    const clave = await claveConexion("reporte");
    if (!(await reservarEnvio(clave))) {
      return { ok: false, mensaje: MENSAJE_LIMITE, valores: datos };
    }
    if (await colaLlena()) {
      return { ok: false, mensaje: MENSAJE_COLA, valores: datos };
    }
    const ahora = new Date().toISOString();
    let lugarId: string;
    let datosLugar: {
      nombre: string;
      rubro: string;
      departamento: string;
      distrito: string;
    };

    if (d.lugar_id) {
      // El lugar viene del servidor, no del formulario, para no confiar en el texto enviado.
      const lugar = await lugarPorId(d.lugar_id);
      if (!lugar) {
        return {
          ok: false,
          mensaje: "Ese lugar ya no está disponible. Escribe sus datos abajo.",
          valores: datos,
        };
      }
      lugarId = lugar.id;
      datosLugar = {
        nombre: lugar.nombre,
        rubro: lugar.rubro,
        departamento: lugar.departamento,
        distrito: lugar.distrito,
      };
    } else {
      // Lugar nuevo de la comunidad: entra como pendiente de revisión.
      datosLugar = {
        nombre: d.nombre ?? "",
        rubro: d.rubro ?? "otro",
        departamento: d.departamento ?? "Lima",
        distrito: d.distrito ?? "",
      };
      lugarId = await insertarLugar({
        tipo: "comunidad",
        ...datosLugar,
        lat: d.lat ?? null,
        lng: d.lng ?? null,
        frases: [],
        aprobado: false,
        consentimiento_en: ahora,
      });
      lugarNuevoId = lugarId;
    }

    const { error } = await clienteServidor()
      .from("reportes")
      .insert({
        lugar_id: lugarId,
        nombre_lugar: datosLugar.nombre,
        rubro: datosLugar.rubro,
        departamento: datosLugar.departamento,
        distrito: datosLugar.distrito,
        aspectos: d.aspecto,
        comentario: d.comentario || null,
        aprobado: false,
        consentimiento_en: ahora,
      });
    if (error) throw new Error(error.message);
  } catch (error) {
    console.error("Error al guardar el reporte:", error);
    // Si el lugar nuevo quedó sin reporte, se quita solo esa fila.
    if (lugarNuevoId) {
      const { error: errorBorrar } = await clienteServidor()
        .from("lugares")
        .delete()
        .eq("id", lugarNuevoId);
      if (errorBorrar) {
        console.error("No se pudo quitar el lugar sin reporte:", errorBorrar.message);
      }
    }
    return { ok: false, mensaje: MENSAJE_ERROR_GUARDAR, valores: datos };
  }

  return { ok: true, mensaje: MENSAJE_REPORTE };
}

import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { cacheLife } from "next/cache";
import { connection } from "next/server";
import { REGEX_ID_LUGAR, type Rubro } from "@/lib/lugares-datos";

// Lo que se puede mostrar en público. Nunca incluye email_contacto.
export type LugarPublico = {
  id: string;
  tipo: "sello" | "comunidad";
  nombre: string;
  rubro: Rubro;
  departamento: string;
  distrito: string;
  direccion: string | null;
  lat: number | null;
  lng: number | null;
  atiende_lsp: "si" | "algo" | "no" | null;
  interprete: boolean | null;
  frases: string[];
  aprobado: boolean;
  confirmaciones: number;
};

const COLUMNAS_PUBLICAS =
  "id, tipo, nombre, rubro, departamento, distrito, direccion, lat, lng, atiende_lsp, interprete, frases, aprobado";

// Llave secreta: solo se usa en el servidor.
export function clienteServidor(): SupabaseClient {
  const url = process.env.SUPABASE_URL;
  const llave = process.env.SUPABASE_SECRET_KEY;
  if (!url || !llave) throw new Error("Faltan SUPABASE_URL o SUPABASE_SECRET_KEY");
  return createClient(url, llave, { auth: { persistSession: false } });
}

type FilaLugar = {
  id: string;
  tipo: "sello" | "comunidad";
  nombre: string;
  rubro: Rubro;
  departamento: string;
  distrito: string;
  direccion: string | null;
  lat: number | string | null;
  lng: number | string | null;
  atiende_lsp: "si" | "algo" | "no" | null;
  interprete: boolean | null;
  frases: string[] | null;
  aprobado: boolean;
};

function aPublico(fila: FilaLugar, confirmaciones: number): LugarPublico {
  return {
    ...fila,
    lat: fila.lat === null ? null : Number(fila.lat),
    lng: fila.lng === null ? null : Number(fila.lng),
    frases: fila.frases ?? [],
    confirmaciones,
  };
}

// Caché de 1 minuto: la lista pública no pide la base de datos en cada visita.
// Un lugar recién aprobado puede tardar hasta ese minuto en aparecer.
export async function lugaresAprobados(): Promise<LugarPublico[]> {
  "use cache";
  cacheLife("minutes");

  const db = clienteServidor();
  const [lugares, reportes] = await Promise.all([
    db
      .from("lugares")
      .select(COLUMNAS_PUBLICAS)
      .eq("aprobado", true)
      .eq("oculto", false)
      .order("creado_en", { ascending: false }),
    db
      .from("reportes")
      .select("lugar_id")
      .eq("aprobado", true)
      .eq("oculto", false)
      .not("lugar_id", "is", null),
  ]);
  if (lugares.error) throw new Error(lugares.error.message);
  if (reportes.error) throw new Error(reportes.error.message);

  const cuentas = new Map<string, number>();
  for (const r of reportes.data ?? []) {
    const id = r.lugar_id as string;
    cuentas.set(id, (cuentas.get(id) ?? 0) + 1);
  }
  return (lugares.data as FilaLugar[]).map((f) => aPublico(f, cuentas.get(f.id) ?? 0));
}

// Sin caché: /s/[id] y el afiche muestran una fila nueva de inmediato.
// Devuelve el lugar aunque no esté aprobado (el sello funciona antes de la revisión).
// Un lugar oculto (retirado en moderación) devuelve null.
export async function lugarPorId(id: string): Promise<LugarPublico | null> {
  await connection();
  if (!REGEX_ID_LUGAR.test(id)) return null;

  const db = clienteServidor();
  const { data, error } = await db
    .from("lugares")
    .select(COLUMNAS_PUBLICAS)
    .eq("id", id)
    .eq("oculto", false)
    .maybeSingle();
  if (error) throw new Error(error.message);
  if (!data) return null;

  const { count, error: errorCuenta } = await db
    .from("reportes")
    .select("id", { count: "exact", head: true })
    .eq("lugar_id", id)
    .eq("aprobado", true)
    .eq("oculto", false);
  if (errorCuenta) throw new Error(errorCuenta.message);

  return aPublico(data as FilaLugar, count ?? 0);
}

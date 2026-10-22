// Datos de "Mi tarjeta de emergencia". Todo se guarda solo en este equipo
// (localStorage). Nunca se envía a ningún servidor.

export const CLAVE_TARJETA = "tarjeta-emergencia:v1";

// Debe coincidir con CACHE_OFFLINE en public/sw-tarjeta.js.
export const CACHE_OFFLINE = "puente-offline-v1";

export const MENSAJE_POR_DEFECTO =
  "Soy Sordo/a. No escucho. Por favor escríbeme o háblame de frente, despacio.";

export const COMUNICACIONES = [
  { id: "escribir", nombre: "Escribir" },
  { id: "lsp", nombre: "Lengua de Señas Peruana (LSP)" },
  { id: "labios", nombre: "Leer los labios" },
  { id: "texto", nombre: "Mensajes de texto" },
] as const;

export type Comunicacion = (typeof COMUNICACIONES)[number]["id"];

export const TIPOS_SANGRE = [
  "",
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
  "O+",
  "O-",
  "No sé",
] as const;

export type TarjetaDatos = {
  nombre: string;
  mensaje: string;
  comunicacion: Comunicacion[];
  contacto: { nombre: string; telefono: string };
  medica: {
    tipoSangre: string;
    alergias: string;
    medicinas: string;
    condiciones: string;
  };
};

// Números de emergencia de Perú. Verificados el 2026-10-22 en:
// https://www.gob.pe/547-telefonos-de-emergencia (105, 116, 106)
// https://www.gob.pe/institucion/pnp/contacto-y-numeros-de-emergencias (105, 116)
// https://www.gob.pe/1013-solicitar-atencion-medica-en-caso-de-emergencia-samu (106)
// No se afirma que acepten SMS.
export const NUMEROS_EMERGENCIA = [
  { numero: "105", nombre: "Policía Nacional" },
  { numero: "116", nombre: "Bomberos" },
  { numero: "106", nombre: "SAMU (ambulancia, solo en algunas regiones)" },
] as const;

const LIMITES = {
  nombre: 80,
  mensaje: 300,
  contacto: 80,
  telefono: 20,
  medica: 300,
} as const;

export function datosIniciales(): TarjetaDatos {
  return {
    nombre: "",
    mensaje: MENSAJE_POR_DEFECTO,
    comunicacion: [],
    contacto: { nombre: "", telefono: "" },
    medica: { tipoSangre: "", alergias: "", medicinas: "", condiciones: "" },
  };
}

// Limpia cualquier valor leído del almacenamiento: tipos, largos y opciones válidas.
export function normalizarDatos(valor: unknown): TarjetaDatos {
  const base = datosIniciales();
  if (!valor || typeof valor !== "object") return base;
  const r = valor as Record<string, unknown>;
  const objeto = (v: unknown): Record<string, unknown> =>
    v && typeof v === "object" ? (v as Record<string, unknown>) : {};

  const texto = (v: unknown, max: number) =>
    typeof v === "string" ? v.trim().slice(0, max) : "";
  const contacto = objeto(r.contacto);
  const medica = objeto(r.medica);
  const sangre = texto(medica.tipoSangre, 5);
  const marcadas = Array.isArray(r.comunicacion) ? r.comunicacion : [];

  return {
    nombre: texto(r.nombre, LIMITES.nombre),
    mensaje: texto(r.mensaje, LIMITES.mensaje) || MENSAJE_POR_DEFECTO,
    // Solo los ids conocidos, en el orden de COMUNICACIONES.
    comunicacion: COMUNICACIONES.map((c) => c.id).filter((id) =>
      marcadas.includes(id),
    ),
    contacto: {
      nombre: texto(contacto.nombre, LIMITES.contacto),
      telefono: texto(contacto.telefono, LIMITES.telefono),
    },
    medica: {
      tipoSangre: (TIPOS_SANGRE as readonly string[]).includes(sangre) ? sangre : "",
      alergias: texto(medica.alergias, LIMITES.medica),
      medicinas: texto(medica.medicinas, LIMITES.medica),
      condiciones: texto(medica.condiciones, LIMITES.medica),
    },
  };
}

export function tieneDatosMedicos(datos: TarjetaDatos): boolean {
  const m = datos.medica;
  return Boolean(m.tipoSangre || m.alergias || m.medicinas || m.condiciones);
}

// Enlace tel: para el botón "Llamar a mi contacto". Null si no hay un número usable.
export function enlaceLlamada(telefono: string): string | null {
  const limpio = telefono.replace(/[^\d+]/g, "");
  const digitos = limpio.replace(/\D/g, "");
  if (digitos.length < 6) return null;
  return `tel:${limpio.startsWith("+") ? "+" : ""}${digitos}`;
}

type Almacen = Pick<Storage, "getItem" | "setItem" | "removeItem">;

function almacenPorDefecto(): Almacen | null {
  try {
    return typeof localStorage === "undefined" ? null : localStorage;
  } catch {
    // Algunos navegadores bloquean el acceso (modo privado, datos desactivados).
    return null;
  }
}

// Convierte el texto guardado (o null) en datos válidos.
export function desdeTexto(guardado: string | null): TarjetaDatos {
  try {
    return normalizarDatos(guardado ? JSON.parse(guardado) : null);
  } catch {
    return datosIniciales();
  }
}

export function cargarTarjeta(almacen: Almacen | null = almacenPorDefecto()): TarjetaDatos {
  try {
    return desdeTexto(almacen?.getItem(CLAVE_TARJETA) ?? null);
  } catch {
    return datosIniciales();
  }
}

// Devuelve false si no se pudo guardar.
export function guardarTarjeta(
  datos: TarjetaDatos,
  almacen: Almacen | null = almacenPorDefecto(),
): boolean {
  try {
    if (!almacen) return false;
    almacen.setItem(CLAVE_TARJETA, JSON.stringify(normalizarDatos(datos)));
    return true;
  } catch {
    return false;
  }
}

export function borrarTarjeta(almacen: Almacen | null = almacenPorDefecto()): boolean {
  try {
    if (!almacen) return false;
    almacen.removeItem(CLAVE_TARJETA);
    return true;
  } catch {
    return false;
  }
}

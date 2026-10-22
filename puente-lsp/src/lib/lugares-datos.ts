// Datos y validaciones de "Lugares accesibles" y "Sello". Sin imports de Next:
// se usa en formularios (cliente), acciones (servidor) y pruebas.
import { z } from "zod";

export const RUBROS = {
  farmacia: "Farmacia",
  banco: "Banco o finanzas",
  salud: "Salud (clínica o centro de salud)",
  gobierno: "Municipalidad o entidad pública",
  tienda: "Tienda o mercado",
  restaurante: "Restaurante o cafetería",
  transporte: "Transporte",
  educacion: "Educación",
  otro: "Otro",
} as const;

export type Rubro = keyof typeof RUBROS;

export const DEPARTAMENTOS = [
  "Amazonas", "Áncash", "Apurímac", "Arequipa", "Ayacucho", "Cajamarca",
  "Callao", "Cusco", "Huancavelica", "Huánuco", "Ica", "Junín",
  "La Libertad", "Lambayeque", "Lima", "Loreto", "Madre de Dios", "Moquegua",
  "Pasco", "Piura", "Puno", "San Martín", "Tacna", "Tumbes", "Ucayali",
] as const;

export const ASPECTOS = {
  personal_sabe_lsp: "El personal sabe LSP",
  hubo_interprete: "Hubo intérprete",
  me_escribieron: "Me escribieron o usamos la pantalla",
  paciencia_respeto: "Tuvieron paciencia y respeto",
  tiene_sello: "Tiene el Sello Puente",
} as const;

export type Aspecto = keyof typeof ASPECTOS;

export const ATIENDE_LSP = {
  si: "Sí",
  algo: "Algo",
  no: "No",
} as const;

export const LIMITES = {
  nombre: 120,
  distrito: 80,
  direccion: 200,
  email: 254,
  frase: 120,
  frases: 8,
  comentario: 300,
} as const;

// Caja aproximada del Perú: el mapa solo acepta puntos dentro de ella.
export const CAJA_PERU = { latMin: -18.5, latMax: 0.1, lngMin: -81.5, lngMax: -68.5 } as const;

// Frases que la persona Sorda toca para decir lo que necesita (escritas desde
// su punto de vista). Se muestran grandes en la pantalla del mostrador.
// Hasta que el lugar se aprueba, /s/[id] muestra solo estas.
export const FRASES_POR_RUBRO: Record<Rubro, string[]> = {
  farmacia: [
    "Necesito esta medicina.",
    "Tengo receta médica.",
    "¿Cuánto cuesta?",
    "¿Tiene otra marca más barata?",
    "¿Puede escribir el precio, por favor?",
    "Gracias, es todo.",
  ],
  banco: [
    "Quiero abrir una cuenta.",
    "Quiero hacer un depósito.",
    "Quiero retirar dinero.",
    "Traigo mi DNI.",
    "¿Puede escribir los pasos, por favor?",
    "Gracias, es todo.",
  ],
  salud: [
    "Me duele aquí.",
    "Tengo este síntoma desde hace días.",
    "Tengo alergia a un medicamento.",
    "No entiendo, ¿puede escribir, por favor?",
    "¿Puede escribir la indicación?",
    "Gracias, ya entendí.",
  ],
  gobierno: [
    "Quiero hacer este trámite.",
    "Traigo mi DNI.",
    "No tengo todos los papeles.",
    "¿Qué papeles me faltan?",
    "¿Puede escribir los pasos, por favor?",
    "Gracias, ya entendí.",
  ],
  tienda: [
    "Busco este producto.",
    "¿Cuánto cuesta?",
    "¿Tiene en otro color o talla?",
    "Pago en efectivo.",
    "Pago con tarjeta.",
    "Gracias, es todo.",
  ],
  restaurante: [
    "Quiero este plato, por favor.",
    "Tengo alergia a un alimento.",
    "¿Este plato tiene maní?",
    "Quiero algo para tomar.",
    "Quiero la cuenta, por favor.",
    "Gracias, estuvo muy rico.",
  ],
  transporte: [
    "¿Este bus va a este lugar?",
    "¿Cuánto cuesta el pasaje?",
    "¿A qué hora sale?",
    "¿Me avisa cuando llegue a mi parada?",
    "Necesito ayuda con mi equipaje.",
    "Gracias, bajo aquí.",
  ],
  educacion: [
    "Quiero matricularme.",
    "Tengo un pago pendiente.",
    "Necesito una constancia.",
    "No entendí, ¿puede repetir?",
    "¿Puede escribir las fechas, por favor?",
    "Gracias, ya entendí.",
  ],
  otro: [
    "Hola, necesito ayuda.",
    "¿Puede escribir, por favor?",
    "No entendí, ¿puede repetir?",
    "¿Puede mostrarlo en la pantalla?",
    "Gracias por su ayuda.",
    "Hasta luego, gracias.",
  ],
};

// Frases que el lugar ve en su mostrador: las suyas si ya fue aprobado y
// tiene alguna; si no, las sugeridas para su rubro.
export function frasesVisibles(lugar: {
  aprobado: boolean;
  rubro: Rubro;
  frases: string[];
}): string[] {
  if (lugar.aprobado && lugar.frases.length > 0) return lugar.frases;
  return FRASES_POR_RUBRO[lugar.rubro];
}

// Base62 de 10 caracteres con Web Crypto. Sin sesgo: se descartan los bytes
// >= 248 (248 es múltiplo de 62).
const ALFABETO = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
export const REGEX_ID_LUGAR = /^[0-9A-Za-z]{10}$/;

export function generarIdLugar(): string {
  let id = "";
  while (id.length < 10) {
    const bytes = globalThis.crypto.getRandomValues(new Uint8Array(16));
    for (const b of bytes) {
      if (b < 248 && id.length < 10) id += ALFABETO[b % 62];
    }
  }
  return id;
}

// Convierte los campos de un formulario en un objeto. Los campos repetidos
// (frase, aspecto) son listas; los vacíos se descartan.
const CAMPOS_LISTA = new Set(["frase", "aspecto"]);

export function leerDatos(
  entradas: [string, FormDataEntryValue][],
): Record<string, string | string[]> {
  const salida: Record<string, string | string[]> = {};
  for (const [clave, valor] of entradas) {
    if (clave.startsWith("$ACTION") || typeof valor !== "string") continue;
    if (CAMPOS_LISTA.has(clave)) {
      const lista = (salida[clave] as string[] | undefined) ?? [];
      if (valor.trim()) lista.push(valor);
      salida[clave] = lista;
    } else if (valor !== "") {
      salida[clave] = valor;
    }
  }
  return salida;
}

export type EstadoLugar = {
  ok: boolean;
  mensaje: string;
  errores?: Record<string, string[] | undefined>;
  valores?: Record<string, string | string[]>;
};

type Llaves<T> = [keyof T & string, ...(keyof T & string)[]];
const llaves = <T extends object>(o: T) => Object.keys(o) as Llaves<T>;

const muyLargo = (max: number) => ({ error: `Máximo ${max} caracteres.` });

// Coordenadas opcionales: llegan como texto del mapa; vacío significa sin punto.
const coordenada = (min: number, max: number, nombre: string) =>
  z.preprocess(
    (v) => (typeof v === "string" && v.trim() !== "" ? Number(v) : undefined),
    z
      .number({ error: `La ${nombre} del punto no es válida.` })
      .min(min, { error: "El punto está fuera del Perú." })
      .max(max, { error: "El punto está fuera del Perú." })
      .optional(),
  );

const puntoCompleto = (d: { lat?: number; lng?: number }) =>
  (d.lat === undefined) === (d.lng === undefined);

const errorPunto = {
  error: "Marca el punto completo en el mapa o no marques ninguno.",
  path: ["lat"],
};

const idLugar = z.string().regex(REGEX_ID_LUGAR).optional();

export const selloSchema = z
  .object({
    nombre: z
      .string({ error: "Escribe el nombre del lugar." })
      .trim()
      .min(2, { error: "Escribe el nombre del lugar." })
      .max(LIMITES.nombre, muyLargo(LIMITES.nombre)),
    rubro: z.enum(llaves(RUBROS), { error: "Elige un rubro." }),
    departamento: z.enum(DEPARTAMENTOS, { error: "Elige un departamento." }),
    distrito: z
      .string({ error: "Escribe el distrito." })
      .trim()
      .min(2, { error: "Escribe el distrito." })
      .max(LIMITES.distrito, muyLargo(LIMITES.distrito)),
    direccion: z
      .string()
      .trim()
      .max(LIMITES.direccion, muyLargo(LIMITES.direccion))
      .optional(),
    atiende_lsp: z.enum(llaves(ATIENDE_LSP), {
      error: "Elige una opción: ¿el personal sabe LSP?",
    }),
    interprete: z.enum(["si", "no"], {
      error: "Elige una opción: ¿pueden llamar a un intérprete?",
    }),
    frase: z
      .array(
        z
          .string()
          .trim()
          .min(1)
          .max(LIMITES.frase, muyLargo(LIMITES.frase)),
      )
      .max(LIMITES.frases, { error: `Máximo ${LIMITES.frases} frases.` })
      // Sin frases, el formulario no envía el campo: se usa lista vacía.
      .default([]),
    email: z
      .email({ error: "Escribe un correo válido." })
      .max(LIMITES.email, muyLargo(LIMITES.email)),
    lat: coordenada(CAJA_PERU.latMin, CAJA_PERU.latMax, "latitud"),
    lng: coordenada(CAJA_PERU.lngMin, CAJA_PERU.lngMax, "longitud"),
    compromiso: z.literal("on", {
      error: "Marca el compromiso para continuar.",
    }),
    consentimiento: z.literal("on", {
      error: "Necesitamos tu permiso para usar estos datos.",
    }),
  })
  .refine(puntoCompleto, errorPunto);

export const reporteSchema = z
  .object({
    lugar_id: idLugar,
    nombre: z.string().trim().max(LIMITES.nombre, muyLargo(LIMITES.nombre)).optional(),
    rubro: z.enum(llaves(RUBROS), { error: "Elige un rubro." }).optional(),
    departamento: z.enum(DEPARTAMENTOS, { error: "Elige un departamento." }).optional(),
    distrito: z.string().trim().max(LIMITES.distrito, muyLargo(LIMITES.distrito)).optional(),
    // Sin casillas marcadas el navegador no envía el campo: el mensaje va en el array.
    aspecto: z
      .array(z.enum(llaves(ASPECTOS), { error: "Marca al menos una cosa que fue buena." }), {
        error: "Marca al menos una cosa que fue buena.",
      })
      .min(1, { error: "Marca al menos una cosa que fue buena." }),
    comentario: z
      .string()
      .trim()
      .max(LIMITES.comentario, muyLargo(LIMITES.comentario))
      .optional(),
    lat: coordenada(CAJA_PERU.latMin, CAJA_PERU.latMax, "latitud"),
    lng: coordenada(CAJA_PERU.lngMin, CAJA_PERU.lngMax, "longitud"),
    consentimiento: z.literal("on", {
      error: "Necesitamos tu permiso para usar estos datos.",
    }),
  })
  .refine(puntoCompleto, errorPunto)
  // Sin lugar_id, el lugar nuevo necesita sus datos completos.
  // `when: () => true` muestra todos los errores a la vez, aunque otro campo falle.
  .refine((d) => !!d.lugar_id || (d.nombre?.length ?? 0) >= 2, {
    error: "Escribe el nombre del lugar.",
    path: ["nombre"],
    when: () => true,
  })
  .refine((d) => !!d.lugar_id || !!d.rubro, {
    error: "Elige un rubro.",
    path: ["rubro"],
    when: () => true,
  })
  .refine((d) => !!d.lugar_id || !!d.departamento, {
    error: "Elige un departamento.",
    path: ["departamento"],
    when: () => true,
  })
  .refine((d) => !!d.lugar_id || (d.distrito?.length ?? 0) >= 2, {
    error: "Escribe el distrito.",
    path: ["distrito"],
    when: () => true,
  });

export function estaEnPeru(lat: number, lng: number): boolean {
  return (
    lat >= CAJA_PERU.latMin &&
    lat <= CAJA_PERU.latMax &&
    lng >= CAJA_PERU.lngMin &&
    lng <= CAJA_PERU.lngMax
  );
}

import { z } from "zod";

export const TIPOS_SOLICITANTE = {
  persona_sorda: "Soy una persona Sorda",
  entidad: "Represento a una empresa o entidad",
  interprete: "Soy intérprete de LSP",
} as const;

export const URGENCIAS = {
  ahora: "Lo antes posible",
  fecha: "En una fecha específica",
} as const;

export const AMBITOS = {
  salud: "Salud",
  banco: "Banco o finanzas",
  legal: "Legal o notaría",
  educacion: "Educación",
  trabajo: "Trabajo o reunión",
  gobierno: "Trámite público",
  otro: "Otro",
} as const;

// Límites compartidos con los inputs y con los checks de la tabla SQL.
export const LIMITES = {
  nombre: 120,
  organizacion: 160,
  whatsapp: 20,
  email: 254,
  mensaje: 1000,
} as const;

type Llaves<T> = [keyof T & string, ...(keyof T & string)[]];
const llaves = <T extends object>(o: T) => Object.keys(o) as Llaves<T>;

const muyLargo = (max: number) => ({
  error: `Máximo ${max} caracteres.`,
});

export const solicitudSchema = z
  .object({
    tipo: z.enum(llaves(TIPOS_SOLICITANTE), { error: "Elige una opción." }),
    nombre: z
      .string()
      .trim()
      .min(2, { error: "Escribe tu nombre." })
      .max(LIMITES.nombre, muyLargo(LIMITES.nombre)),
    organizacion: z
      .string()
      .trim()
      .max(LIMITES.organizacion, muyLargo(LIMITES.organizacion))
      .optional(),
    // Se guarda sin espacios: "+51 999 888 777" → "+51999888777".
    whatsapp: z
      .string()
      .transform((s) => s.replace(/[\s-]/g, ""))
      .pipe(
        z.string().regex(/^\+?\d{7,15}$/, {
          error: "Escribe un número válido, por ejemplo +51 999 888 777.",
        }),
      )
      .optional(),
    email: z
      .email({ error: "Escribe un correo válido." })
      .max(LIMITES.email, muyLargo(LIMITES.email))
      .optional(),
    urgencia: z.enum(llaves(URGENCIAS)).optional(),
    fecha: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/, {
        error: "Elige una fecha y hora.",
      })
      .optional(),
    ambito: z.enum(llaves(AMBITOS), { error: "Elige una opción." }).optional(),
    mensaje: z
      .string()
      .trim()
      .max(LIMITES.mensaje, muyLargo(LIMITES.mensaje))
      .optional(),
    consentimiento: z.literal("on", {
      error: "Necesitamos tu permiso para contactarte.",
    }),
  })
  // `when` hace que estas reglas se revisen aunque otro campo tenga error,
  // para mostrar todos los errores de una vez.
  .refine((d) => d.whatsapp || d.email, {
    error: "Escribe tu WhatsApp o tu correo.",
    path: ["whatsapp"],
    when: () => true,
  })
  .refine((d) => d.tipo !== "entidad" || d.organizacion, {
    error: "Escribe el nombre de tu empresa o entidad.",
    path: ["organizacion"],
    when: () => true,
  })
  .refine((d) => d.urgencia !== "fecha" || d.fecha, {
    error: "Elige una fecha y hora.",
    path: ["fecha"],
    when: () => true,
  });

export type Solicitud = z.infer<typeof solicitudSchema>;

export type EstadoFormulario = {
  ok: boolean;
  mensaje: string;
  errores?: Partial<Record<keyof Solicitud, string[]>>;
  valores?: Partial<Record<keyof Solicitud, string>>;
};

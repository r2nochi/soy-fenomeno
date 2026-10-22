import { test } from "node:test";
import assert from "node:assert/strict";
import { z } from "zod";
import {
  ASPECTOS,
  CAJA_PERU,
  DEPARTAMENTOS,
  FRASES_POR_RUBRO,
  RUBROS,
  REGEX_ID_LUGAR,
  estaEnPeru,
  frasesVisibles,
  generarIdLugar,
  leerDatos,
  reporteSchema,
  selloSchema,
} from "../src/lib/lugares-datos.ts";

const selloValido = {
  nombre: "Farmacia San Juan",
  rubro: "farmacia",
  departamento: "Lima",
  distrito: "Miraflores",
  atiende_lsp: "algo",
  interprete: "no",
  frase: ["¿Qué medicina necesita?"],
  email: "dueno@ejemplo.pe",
  compromiso: "on",
  consentimiento: "on",
};

test("generarIdLugar devuelve 10 caracteres base62 y no repite en muestras", () => {
  const ids = new Set<string>();
  for (let i = 0; i < 500; i++) {
    const id = generarIdLugar();
    assert.match(id, REGEX_ID_LUGAR);
    ids.add(id);
  }
  assert.equal(ids.size, 500);
});

test("leerDatos descarta vacíos y junta campos repetidos", () => {
  const datos = leerDatos([
    ["nombre", "Banco"],
    ["direccion", ""],
    ["frase", "Hola"],
    ["frase", ""],
    ["frase", "   "],
    ["frase", "Gracias"],
    ["$ACTION_ID_1", "x"],
    ["sitio_web", ""],
  ]);
  assert.deepEqual(datos, { nombre: "Banco", frase: ["Hola", "Gracias"] });
});

test("selloSchema acepta un registro completo", () => {
  const r = selloSchema.safeParse(selloValido);
  assert.equal(r.success, true);
});

test("selloSchema exige correo, compromiso y consentimiento", () => {
  const r = selloSchema.safeParse({ ...selloValido, email: "", compromiso: undefined });
  assert.equal(r.success, false);
  if (!r.success) {
    const rutas = r.error.issues.map((i) => i.path[0]);
    assert.ok(rutas.includes("email"));
    assert.ok(rutas.includes("compromiso"));
  }
});

test("selloSchema rechaza más de 8 frases y frases de más de 120 caracteres", () => {
  const nueve = Array.from({ length: 9 }, (_, i) => `Frase ${i}`);
  assert.equal(selloSchema.safeParse({ ...selloValido, frase: nueve }).success, false);
  const larga = "a".repeat(121);
  assert.equal(selloSchema.safeParse({ ...selloValido, frase: [larga] }).success, false);
});

test("selloSchema exige el punto completo o ninguno", () => {
  const solo = selloSchema.safeParse({ ...selloValido, lat: "-12.1", lng: undefined });
  assert.equal(solo.success, false);
  const ninguno = selloSchema.safeParse({ ...selloValido, lat: "", lng: "" });
  assert.equal(ninguno.success, true);
  const completo = selloSchema.safeParse({ ...selloValido, lat: "-12.1", lng: "-77.0" });
  assert.equal(completo.success, true);
  if (completo.success) {
    assert.equal(completo.data.lat, -12.1);
    assert.equal(completo.data.lng, -77);
  }
});

test("selloSchema rechaza puntos fuera del Perú", () => {
  const r = selloSchema.safeParse({ ...selloValido, lat: "40", lng: "-3" });
  assert.equal(r.success, false);
});

test("selloSchema rechaza un departamento que no existe", () => {
  assert.equal(selloSchema.safeParse({ ...selloValido, departamento: "Narnia" }).success, false);
});

const reporteValido = {
  nombre: "Municipalidad de Chiclayo",
  rubro: "gobierno",
  departamento: "Lambayeque",
  distrito: "Chiclayo",
  aspecto: ["hubo_interprete", "paciencia_respeto"],
  comentario: "Me escribieron los pasos.",
  consentimiento: "on",
};

test("reporteSchema acepta un lugar nuevo completo", () => {
  assert.equal(reporteSchema.safeParse(reporteValido).success, true);
});

test("reporteSchema pide al menos un aspecto positivo", () => {
  const r = reporteSchema.safeParse({ ...reporteValido, aspecto: [] });
  assert.equal(r.success, false);
});

test("reporteSchema no acepta aspectos fuera de la lista (solo positivos)", () => {
  const r = reporteSchema.safeParse({ ...reporteValido, aspecto: ["maltrato"] });
  assert.equal(r.success, false);
});

test("reporteSchema con lugar_id no exige los datos del lugar", () => {
  const r = reporteSchema.safeParse({
    lugar_id: "AbCdEfGh12",
    aspecto: ["personal_sabe_lsp"],
    consentimiento: "on",
  });
  assert.equal(r.success, true);
});

test("reporteSchema sin lugar_id exige nombre, rubro, departamento y distrito", () => {
  const r = reporteSchema.safeParse({
    aspecto: ["personal_sabe_lsp"],
    consentimiento: "on",
  });
  assert.equal(r.success, false);
  if (!r.success) {
    const rutas = r.error.issues.map((i) => i.path[0]);
    for (const campo of ["nombre", "rubro", "departamento", "distrito"]) {
      assert.ok(rutas.includes(campo), `falta error de ${campo}`);
    }
  }
});

test("reporteSchema rechaza un comentario de más de 300 caracteres", () => {
  const r = reporteSchema.safeParse({ ...reporteValido, comentario: "a".repeat(301) });
  assert.equal(r.success, false);
});

test("reporteSchema rechaza un lugar_id con formato incorrecto", () => {
  const r = reporteSchema.safeParse({
    lugar_id: "../../x",
    aspecto: ["personal_sabe_lsp"],
    consentimiento: "on",
  });
  assert.equal(r.success, false);
});

test("las frases sugeridas cumplen el límite de 8 y de 120 caracteres", () => {
  for (const rubro of Object.keys(RUBROS)) {
    const frases = FRASES_POR_RUBRO[rubro as keyof typeof RUBROS];
    assert.ok(frases.length >= 1 && frases.length <= 8, rubro);
    for (const f of frases) assert.ok(f.length <= 120, f);
  }
});

test("hay 25 departamentos sin repetir y todos los aspectos tienen texto", () => {
  assert.equal(DEPARTAMENTOS.length, 25);
  assert.equal(new Set(DEPARTAMENTOS).size, 25);
  assert.ok(Object.values(ASPECTOS).every((t) => t.length > 0));
});

test("un formulario vacío muestra mensajes en español, no los de zod", () => {
  const sello = selloSchema.safeParse(leerDatos([]));
  assert.equal(sello.success, false);
  if (!sello.success) {
    const e = z.flattenError(sello.error).fieldErrors;
    assert.equal(e.nombre?.[0], "Escribe el nombre del lugar.");
    assert.equal(e.distrito?.[0], "Escribe el distrito.");
    assert.equal(e.frase, undefined);
    for (const lista of Object.values(e)) {
      for (const msg of lista ?? []) assert.doesNotMatch(msg, /Invalid input|expected/);
    }
  }

  const reporte = reporteSchema.safeParse(
    leerDatos([
      ["nombre", "Banco"],
      ["consentimiento", "on"],
    ]),
  );
  assert.equal(reporte.success, false);
  if (!reporte.success) {
    const e = z.flattenError(reporte.error).fieldErrors;
    assert.equal(e.aspecto?.[0], "Marca al menos una cosa que fue buena.");
    assert.equal(e.rubro?.[0], "Elige un rubro.");
    for (const lista of Object.values(e)) {
      for (const msg of lista ?? []) assert.doesNotMatch(msg, /Invalid input|expected/);
    }
  }
});

test("las frases sugeridas se escriben desde la persona Sorda, no desde el mostrador", () => {
  // Frases de personal: "Le escribo…", "Escriba…", "¿Desea…?", "Tome su tiempo".
  const vozDelMostrador =
    /^(Le |Escriba|Tome|Puede tomar|Puede preguntarme|Avíseme|Necesito su|¿Desea|¿Qué desea|¿Quiere |¿Qué necesita|¿Dónde le|¿Desde cuándo|¿Cuántas |¿Es para |¿Qué medicina|¿Para cuántas|¿Qué busca|¿Le |¿Tiene todos|¿Tiene alguna pregunta|¿Qué trámite|¿Qué bebe|Hola, ¿en qué le)/;
  for (const [rubro, frases] of Object.entries(FRASES_POR_RUBRO)) {
    for (const f of frases) {
      assert.doesNotMatch(f, vozDelMostrador, `${rubro}: "${f}" parece del mostrador`);
    }
  }
  assert.ok(FRASES_POR_RUBRO.farmacia.includes("Necesito esta medicina."));
  assert.ok(FRASES_POR_RUBRO.banco.includes("Quiero abrir una cuenta."));
});

test("frasesVisibles muestra las sugeridas hasta la aprobación y las propias después", () => {
  const propias = ["Hola, soy el dueño.", "Pregunte aquí."];
  // No aprobado: nunca las propias, aunque existan.
  assert.deepEqual(
    frasesVisibles({ aprobado: false, rubro: "farmacia", frases: propias }),
    FRASES_POR_RUBRO.farmacia,
  );
  // Aprobado con frases propias: las propias.
  assert.deepEqual(
    frasesVisibles({ aprobado: true, rubro: "farmacia", frases: propias }),
    propias,
  );
  // Aprobado sin frases propias: las sugeridas, nunca un panel vacío.
  assert.deepEqual(
    frasesVisibles({ aprobado: true, rubro: "banco", frases: [] }),
    FRASES_POR_RUBRO.banco,
  );
});

test("estaEnPeru separa Lima de un punto fuera de la caja", () => {
  assert.equal(estaEnPeru(-12.05, -77.04), true);
  assert.equal(estaEnPeru(CAJA_PERU.latMax + 1, -77), false);
});

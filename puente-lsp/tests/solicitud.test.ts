import { test } from "node:test";
import assert from "node:assert/strict";
import { LENGUAS_SENAS, PAISES, solicitudSchema } from "../src/lib/solicitud.ts";

const base = { nombre: "Ana Pérez", whatsapp: "+51 999 888 777", consentimiento: "on" };

const errores = (datos: object) => {
  const r = solicitudSchema.safeParse(datos);
  return r.success ? {} : Object.fromEntries(r.error.issues.map((i) => [i.path[0], i.message]));
};

test("un intérprete debe indicar país y al menos una lengua de señas", () => {
  const e = errores({ ...base, tipo: "interprete" });
  assert.ok(e.pais);
  assert.ok(e.lenguas);
});

test("el nombre vacío se explica en español", () => {
  assert.equal(errores({ tipo: "persona_sorda", whatsapp: "+51999888777", consentimiento: "on" }).nombre, "Escribe tu nombre.");
});

test("un intérprete con país y lenguas es válido", () => {
  const r = solicitudSchema.safeParse({
    ...base,
    tipo: "interprete",
    pais: "colombia",
    lenguas: ["lsc", "asl"],
  });
  assert.ok(r.success);
  assert.deepEqual(r.data.lenguas, ["lsc", "asl"]);
});

test("una persona Sorda no necesita país ni lenguas", () => {
  assert.ok(solicitudSchema.safeParse({ ...base, tipo: "persona_sorda" }).success);
});

test("rechaza un país o una lengua que no están en la lista", () => {
  assert.ok(errores({ ...base, tipo: "interprete", pais: "narnia", lenguas: ["lsp"] }).pais);
  assert.ok(errores({ ...base, tipo: "interprete", pais: "peru", lenguas: ["inventada"] }).lenguas);
});

test("no acepta más lenguas que las de la lista", () => {
  const lenguas = Array(Object.keys(LENGUAS_SENAS).length + 1).fill("lsp");
  assert.ok(errores({ ...base, tipo: "interprete", pais: "peru", lenguas }).lenguas);
});

test("las listas coinciden con los checks de la migración", async () => {
  const { readFile } = await import("node:fs/promises");
  const sql = await readFile(new URL("../supabase/migrations/0004_interpretes_pais_lenguas.sql", import.meta.url), "utf8");
  const lista = (bloque: string | undefined) => [...(bloque ?? "").matchAll(/'([a-z_]+)'/g)].map((m) => m[1]).sort();
  assert.deepEqual(lista(sql.match(/pais in \(([^)]*)\)/)?.[1]), Object.keys(PAISES).sort());
  assert.deepEqual(lista(sql.match(/array\[([^\]]*)\]/)?.[1]), Object.keys(LENGUAS_SENAS).sort());
});

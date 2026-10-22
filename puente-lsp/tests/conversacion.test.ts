import { test } from "node:test";
import assert from "node:assert/strict";
import { FRASES_BASE, tamanoTexto, unirFrases } from "../src/lib/conversacion.ts";

test("las frases del negocio van primero y no se repiten", () => {
  const lista = unirFrases(["Sí", "Consulta de dentista"]);
  assert.equal(lista[0], "Sí");
  assert.equal(lista[1], "Consulta de dentista");
  assert.equal(lista.filter((f) => f === "Sí").length, 1);
  assert.equal(lista.length, FRASES_BASE.length + 1);
});

test("unirFrases descarta vacías y limpia espacios", () => {
  const lista = unirFrases(["   ", "  Hola   amigo  "]);
  assert.equal(lista[0], "Hola amigo");
  assert.ok(lista.every((f) => f.length > 0));
});

test("las frases base no tienen repetidas", () => {
  assert.equal(new Set(FRASES_BASE).size, FRASES_BASE.length);
});

test("tamanoTexto baja el tamaño según el largo", () => {
  assert.equal(tamanoTexto("Sí"), "text-6xl sm:text-7xl");
  assert.equal(tamanoTexto("Un momento"), "text-5xl sm:text-6xl");
  assert.equal(tamanoTexto("x".repeat(50)), "text-3xl sm:text-4xl");
  assert.equal(tamanoTexto("x".repeat(300)), "text-2xl sm:text-3xl");
});

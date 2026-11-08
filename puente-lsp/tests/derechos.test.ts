import { test } from "node:test";
import assert from "node:assert/strict";
import {
  BENEFICIOS,
  CATEGORIAS,
  beneficiosDe,
  categoriaDe,
  categoriasDe,
  paisDerechos,
} from "../src/lib/derechos.ts";

test("cada beneficio tiene un id único y al menos una fuente https", () => {
  assert.equal(new Set(BENEFICIOS.map((b) => b.id)).size, BENEFICIOS.length);
  for (const b of BENEFICIOS) {
    assert.ok(b.fuentes.length > 0, b.id);
    for (const f of b.fuentes) assert.match(f.url, /^https:\/\//, b.id);
  }
});

test("las categorías no repiten su slug", () => {
  assert.equal(new Set(CATEGORIAS.map((c) => c.slug)).size, CATEGORIAS.length);
});

test("filtra por país y categoría", () => {
  const transporte = beneficiosDe("peru", "transporte");
  assert.ok(transporte.length > 0);
  assert.ok(transporte.every((b) => b.pais === "peru" && b.categoria === "transporte"));
  assert.equal(beneficiosDe("peru").length, BENEFICIOS.filter((b) => b.pais === "peru").length);
});

test("un país o una categoría sin contenido no existen", () => {
  assert.equal(paisDerechos("narnia"), undefined);
  assert.equal(categoriaDe("peru", "no-existe"), undefined);
  assert.deepEqual(categoriasDe("chile"), []);
});

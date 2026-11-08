import { test } from "node:test";
import assert from "node:assert/strict";
import {
  COMUNIDAD_POR_PAIS,
  PAISES_RECURSOS,
  TRABAJOS_POR_PAIS,
  paisRecurso,
  paisesComunidad,
} from "../src/lib/paises-recursos.ts";

test("cada entrada de la comunidad tiene fuente https y enlaces https", () => {
  for (const grupos of Object.values(COMUNIDAD_POR_PAIS)) {
    for (const g of grupos) {
      assert.ok(g.entradas.length > 0, g.id);
      for (const e of g.entradas) {
        assert.match(e.fuente, /^https:\/\//, e.nombre);
        for (const l of e.enlaces) assert.match(l.url, /^https:\/\//, e.nombre);
      }
    }
  }
});

test("cada país tiene al menos un portal de empleo con enlace https", () => {
  for (const p of PAISES_RECURSOS) {
    const portales = TRABAJOS_POR_PAIS[p.slug];
    assert.ok(portales.length > 0, p.slug);
    for (const t of portales) assert.match(t.url, /^https:\/\//, t.nombre);
  }
});

test("un país sin datos confirmados no aparece en Comunidad", () => {
  const slugs = paisesComunidad().map((p) => p.slug);
  assert.ok(!slugs.includes("mexico"));
  assert.ok(slugs.includes("colombia"));
});

test("un país desconocido no existe", () => {
  assert.equal(paisRecurso("narnia"), undefined);
});

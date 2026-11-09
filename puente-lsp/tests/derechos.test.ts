import { test } from "node:test";
import assert from "node:assert/strict";
import {
  BENEFICIOS,
  CATEGORIAS,
  beneficiosDe,
  categoriaDe,
  categoriasDe,
  paisDerechos,
  PAISES_DERECHOS,
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
  assert.deepEqual(categoriasDe("narnia"), []);
});

test("cada país publicado tiene contenido, aviso propio y resumen en cada categoría", () => {
  for (const p of PAISES_DERECHOS) {
    const categorias = categoriasDe(p.slug);
    assert.ok(categorias.length > 0, p.slug);
    assert.ok(p.aviso.length > 0, p.slug);
    for (const c of categorias) assert.notEqual(c.resumen, c.nombre, `${p.slug}/${c.slug}`);
  }
});

test("los resúmenes de otro país no mencionan beneficios peruanos", () => {
  for (const p of PAISES_DERECHOS.filter((x) => x.slug !== "peru")) {
    for (const c of categoriasDe(p.slug)) assert.doesNotMatch(c.resumen, /Conadis|Pensión Contigo/, p.slug);
    assert.doesNotMatch(p.aviso, /Conadis|29973/, p.slug);
    for (const b of beneficiosDe(p.slug)) {
      assert.doesNotMatch(`${b.que} ${b.quien} ${b.como ?? ""} ${b.atencion ?? ""}`, /Conadis|29973|\bLSP\b|S\/ /, b.id);
    }
  }
});

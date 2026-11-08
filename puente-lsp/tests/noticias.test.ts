import { test } from "node:test";
import assert from "node:assert/strict";
import {
  FILTROS,
  NOTICIAS,
  filtroPorSlug,
  filtrosConNoticias,
  noticiasDe,
  noticiasRecientes,
} from "../src/lib/noticias.ts";

test("los números van del 1 en adelante, sin saltos ni repetidos", () => {
  NOTICIAS.forEach((n, i) => assert.equal(n.numero, i + 1));
});

test("cada noticia tiene fecha válida, al menos un tema y una fuente https", () => {
  for (const n of NOTICIAS) {
    assert.match(n.fecha, /^\d{4}-\d{2}-\d{2}$/);
    assert.ok(n.temas.length > 0);
    assert.ok(n.fuentes.length > 0);
    for (const f of n.fuentes) assert.match(f.url, /^https:\/\//);
  }
});

test("los slugs de país y tema no se repiten entre sí", () => {
  assert.equal(new Set(FILTROS.map((f) => f.slug)).size, FILTROS.length);
});

test("filtrar por país o tema devuelve lo correcto, de la más nueva a la más antigua", () => {
  const peru = noticiasDe(filtroPorSlug("peru")!);
  assert.ok(peru.every((n) => n.pais === "peru"));
  assert.deepEqual(peru.map((n) => n.numero), [8, 5, 4, 3, 1]);
  const implante = noticiasDe(filtroPorSlug("salud-e-implante-coclear")!);
  assert.deepEqual(implante.map((n) => n.numero), [8, 1]);
  assert.equal(filtroPorSlug("no-existe"), undefined);
});

test("Internacional y Latinoamérica separan las noticias por región", () => {
  const intl = noticiasDe(filtroPorSlug("internacional")!);
  const latam = noticiasDe(filtroPorSlug("latinoamerica")!);
  assert.equal(intl.length + latam.length, NOTICIAS.length);
  assert.ok(intl.every((n) => !["peru", "mexico", "colombia", "chile", "argentina"].includes(n.pais)));
});

test("la lista va de la fecha más nueva a la más antigua", () => {
  const fechas = noticiasRecientes().map((n) => n.fecha);
  assert.deepEqual(fechas, [...fechas].sort().reverse());
});

test("no hay páginas de filtro vacías", () => {
  const slugs = filtrosConNoticias().map((f) => f.slug);
  assert.ok(!slugs.includes("trabajo"));
  assert.ok(slugs.includes("chile"));
  // Un tema sin noticias no tiene página: da 404.
  assert.equal(filtroPorSlug("trabajo"), undefined);
});

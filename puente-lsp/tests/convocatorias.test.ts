import { test } from "node:test";
import assert from "node:assert/strict";
import { areasDe, extraerConvocatorias } from "../src/lib/convocatorias.ts";

test("el área sale de los cargos, no del nombre de la entidad", () => {
  assert.deepEqual(areasDe("RED DE SALUD HUAYLAS: Digitador - Convocatoria octubre 2026"), ["administracion"]);
  assert.deepEqual(areasDe("HOSPITAL REGIONAL DOCENTE: (47) Médicos - Convocatoria"), ["salud"]);
  assert.deepEqual(areasDe("UGEL CUTERVO busca Analista de Planillas - Convocatoria octubre 2026"), ["rrhh"]);
  assert.deepEqual(areasDe("MUNICIPALIDAD X: Solicita Soporte Técnico - Convocatoria"), ["ti"]);
  assert.deepEqual(areasDe("MUNI requiere Soporte administrativo - Convocatoria"), ["administracion"]);
  assert.deepEqual(areasDe("MUNI requiere Técnico en medición"), []);
});

test("los avisos de sordera o LSP llevan la marca lsp primero", () => {
  assert.equal(areasDe("UGEL 3 requiere Especialista en Discapacidad Auditiva")[0], "lsp");
  assert.equal(areasDe("UGEL requiere Intérprete LSP")[0], "lsp");
  assert.deepEqual(areasDe("SENASA requiere Abogado"), ["legal"]);
});

const aviso = (slug: string, titulo: string, relleno = "") =>
  `<h4><a href="oferta-de-empleo-${slug}.html">${titulo}</a></h4>
  <p>Vigente hasta el 26/10/2026</p><span class="icon-mapa1"></span>Lima, ${relleno}<
  <div class="conv-rs"></div>`;

test("no pierde avisos con una lista larga de regiones", () => {
  const html =
    aviso("poder-judicial", "PODER JUDICIAL: (255) Especialistas y otros", "Ica, ".repeat(400)) +
    aviso("ugel", "UGEL 1 requiere Abogado");
  const avisos = extraerConvocatorias(html);
  assert.equal(avisos.length, 2);
  assert.equal(avisos[0].vigencia, "26/10/2026");
  assert.deepEqual(avisos[1].areas, ["legal"]);
});

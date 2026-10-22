import { test } from "node:test";
import assert from "node:assert/strict";
import { responder } from "../src/lib/respuestas.ts";

const id = (q: string) => responder(q).respuesta.id;

test("el asistente elige el tema correcto", () => {
  assert.equal(id("busco trabajo de atención al cliente"), "trabajo");
  assert.equal(id("busco empleo en sistemas"), "trabajo");
  assert.equal(id("tengo una empresa y quiero atender clientes sordos"), "empresas");
  assert.equal(id("necesito un intérprete"), "interprete");
  assert.equal(id("¿cómo hablo con una persona sorda?"), "hablar");
  assert.equal(id("receta de ceviche"), "no-entiendo");
});

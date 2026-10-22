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

test("el asistente lleva a las herramientas nuevas", () => {
  assert.equal(id("¿Cómo pido un intérprete a una entidad?"), "carta");
  assert.equal(id("quiero pedir intérprete al hospital"), "carta");
  assert.equal(id("necesito un intérprete en el banco"), "interprete");
  assert.equal(id("hacer mi tarjeta de emergencia"), "tarjeta");
  assert.equal(id("¿qué es el sello puente?"), "sello");
  assert.equal(id("¿dónde atienden bien a personas sordas?"), "lugares");
  assert.equal(id("conversar cara a cara con alguien que no sabe señas"), "conversacion");
});

test("las herramientas nuevas no roban preguntas de otros temas", () => {
  assert.equal(id("voz a texto"), "subtitulos");
  assert.equal(id("¿en qué lugar puedo aprender lengua de señas?"), "aprender");
  assert.equal(id("hablar con mi médico en el hospital"), "hablar");
  assert.equal(id("mi tarjeta de crédito"), "no-entiendo");
  assert.equal(id("qué hago en una emergencia"), "emergencia");
  assert.equal(id("¿Cómo pido un intérprete de LSP?"), "interprete");
});

test("una emergencia real nunca va a la tarjeta", () => {
  assert.equal(id("necesito una ambulancia tengo alergia"), "emergencia");
  assert.equal(id("estoy sin señal y hay un incendio"), "emergencia");
  assert.equal(id("tengo una alergia y necesito ayuda urgente"), "emergencia");
  assert.equal(id("quiero llenar la solicitud del piloto"), "interprete");
  assert.equal(id("en qué lugares enseñan lengua de señas"), "aprender");
  assert.equal(id("subtítulos en una conversación"), "subtitulos");
});

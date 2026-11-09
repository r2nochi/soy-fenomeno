import { test, type TestContext } from "node:test";
import assert from "node:assert/strict";
import { iniciarVoz } from "../src/lib/voz.ts";

class Falso {
  static todos: Falso[] = [];
  lang = "";
  continuous = false;
  interimResults = false;
  onresult: ((e: unknown) => void) | null = null;
  onerror: ((e: { error: string }) => void) | null = null;
  onend: (() => void) | null = null;
  start() {
    Falso.todos.push(this);
  }
  stop() {}
  abort() {}
}

function preparar(t: TestContext) {
  t.mock.timers.enable({ apis: ["setTimeout", "Date"] });
  Falso.todos = [];
  (globalThis as { window?: unknown }).window = { SpeechRecognition: Falso };
  const finales: string[] = [];
  const eventos: string[] = [];
  const voz = iniciarVoz({
    idiomas: ["es-PE"],
    alParcial: () => {},
    alFinal: (texto) => {
      finales.push(texto);
      eventos.push("final");
    },
    alError: () => eventos.push("error"),
  });
  t.after(() => voz.detener());
  return { finales, eventos, voz, ultimo: () => Falso.todos[Falso.todos.length - 1] };
}

const resultado = (texto: string, isFinal: boolean) => ({
  resultIndex: 0,
  results: [{ 0: { transcript: texto }, isFinal }],
});

test("los silencios largos no hacen esperar más para volver a escuchar", (t) => {
  const { ultimo } = preparar(t);
  for (let i = 0; i < 12; i++) {
    t.mock.timers.tick(8000);
    ultimo().onerror?.({ error: "no-speech" });
    ultimo().onend?.();
    t.mock.timers.tick(300);
    assert.equal(Falso.todos.length, i + 2, `silencio ${i + 1}`);
  }
});

test("una sesión larga sin error reinicia enseguida", (t) => {
  const { ultimo } = preparar(t);
  for (let i = 0; i < 6; i++) {
    t.mock.timers.tick(60000);
    ultimo().onend?.();
    t.mock.timers.tick(300);
    assert.equal(Falso.todos.length, i + 2, `sesión ${i + 1}`);
  }
});

test("si falla de inmediato una y otra vez, espera cada vez más", (t) => {
  const { ultimo } = preparar(t);
  ultimo().onerror?.({ error: "network" });
  ultimo().onend?.();
  t.mock.timers.tick(300);
  assert.equal(Falso.todos.length, 2);
  ultimo().onerror?.({ error: "network" });
  ultimo().onend?.();
  t.mock.timers.tick(300);
  assert.equal(Falso.todos.length, 2);
  t.mock.timers.tick(300);
  assert.equal(Falso.todos.length, 3);
});

test("un silencio que corta de inmediato también espera cada vez más", (t) => {
  const { ultimo } = preparar(t);
  ultimo().onerror?.({ error: "no-speech" });
  ultimo().onend?.();
  t.mock.timers.tick(300);
  assert.equal(Falso.todos.length, 2);
  ultimo().onerror?.({ error: "no-speech" });
  ultimo().onend?.();
  t.mock.timers.tick(300);
  assert.equal(Falso.todos.length, 2);
  t.mock.timers.tick(300);
  assert.equal(Falso.todos.length, 3);
});

test("un error de red tras una sesión larga sigue esperando cada vez más", (t) => {
  const { ultimo } = preparar(t);
  ultimo().onerror?.({ error: "network" });
  ultimo().onend?.();
  t.mock.timers.tick(300);
  assert.equal(Falso.todos.length, 2);
  t.mock.timers.tick(5000);
  ultimo().onerror?.({ error: "network" });
  ultimo().onend?.();
  t.mock.timers.tick(300);
  assert.equal(Falso.todos.length, 2);
  t.mock.timers.tick(300);
  assert.equal(Falso.todos.length, 3);
});

test("el aviso de error queda después del texto entregado", (t) => {
  const { eventos, ultimo } = preparar(t);
  ultimo().onresult?.(resultado("hola", false));
  ultimo().onerror?.({ error: "not-allowed" });
  ultimo().onend?.();
  assert.deepEqual(eventos, ["final", "error"]);
});

test("al detener se entrega el texto sin confirmar", (t) => {
  const { finales, ultimo, voz } = preparar(t);
  ultimo().onresult?.(resultado("ya terminé", false));
  voz.detener();
  assert.deepEqual(finales, ["ya terminé"]);
});

test("un resultado tardío después de pausar no se repite", (t) => {
  const { finales, ultimo, voz } = preparar(t);
  const viejo = ultimo();
  viejo.onresult?.(resultado("un momento", false));
  voz.pausar();
  viejo.onresult?.(resultado("un momento", true));
  assert.deepEqual(finales, ["un momento"]);
});

test("un resultado tardío después de cortarse la sesión no se repite", (t) => {
  const { finales, ultimo } = preparar(t);
  const viejo = ultimo();
  const alResultado = viejo.onresult;
  alResultado?.(resultado("buenos días", false));
  viejo.onend?.();
  alResultado?.(resultado("buenos días", true));
  assert.deepEqual(finales, ["buenos días"]);
});

test("si la sesión se corta, el texto sin confirmar no se pierde", (t) => {
  const { finales, ultimo } = preparar(t);
  ultimo().onresult?.(resultado("buenos días", false));
  ultimo().onend?.();
  assert.deepEqual(finales, ["buenos días"]);
});

test("un texto ya confirmado no se repite al cortarse la sesión", (t) => {
  const { finales, ultimo } = preparar(t);
  ultimo().onresult?.(resultado("buenos", false));
  ultimo().onresult?.(resultado("buenos días", true));
  ultimo().onend?.();
  assert.deepEqual(finales, ["buenos días"]);
});

test("al pausar se entrega lo que la otra persona estaba diciendo", (t) => {
  const { finales, ultimo, voz } = preparar(t);
  ultimo().onresult?.(resultado("un momento", false));
  voz.pausar();
  assert.deepEqual(finales, ["un momento"]);
});

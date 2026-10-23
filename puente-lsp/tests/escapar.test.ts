import { test } from "node:test";
import assert from "node:assert/strict";
import { escaparXml, jsonLd } from "../src/lib/escapar.ts";

test("jsonLd no deja cerrar la etiqueta <script>", () => {
  const texto = jsonLd({ titulo: "</script><script>alert(1)</script>" });
  assert.ok(!texto.includes("<"));
  assert.deepEqual(JSON.parse(texto), { titulo: "</script><script>alert(1)</script>" });
});

test("escaparXml escapa los caracteres especiales del feed", () => {
  assert.equal(escaparXml(`Sordos & oyentes <"hola">`), "Sordos &amp; oyentes &lt;&quot;hola&quot;&gt;");
});

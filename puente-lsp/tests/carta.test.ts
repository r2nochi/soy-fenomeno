import { test } from "node:test";
import assert from "node:assert/strict";
import {
  armarCarta,
  datosVacios,
  enlaceCorreo,
  enlaceWhatsapp,
  fechaLarga,
  validarDatos,
  type DatosCarta,
  type TipoEntidad,
} from "../src/lib/carta.ts";

const base = (): DatosCarta => ({
  ...datosVacios(),
  nombre: "Ana Quispe",
  dni: "12345678",
  conadis: "",
  tipoEntidad: "salud",
  nombreEntidad: "Hospital Regional",
  fecha: "2026-10-22",
  hora: "10:30",
  necesidad: "presencial",
  contacto: "987654321",
});

const HOY = "2026-10-21";

test("la fecha se lee sin desfase de zona horaria", () => {
  assert.equal(fechaLarga("2026-10-22"), "22 de octubre de 2026");
  assert.equal(armarCarta(base(), HOY).fecha, "21 de octubre de 2026");
  assert.equal(fechaLarga("2026-02-30"), "");
  assert.equal(fechaLarga("nope"), "");
});

test("salud y otras públicas citan la Ley 29535 art. 4 y no el art. 21.2", () => {
  for (const tipo of ["salud", "otra_publica"] as TipoEntidad[]) {
    const { texto } = armarCarta({ ...base(), tipoEntidad: tipo }, HOY);
    assert.match(texto, /artículo 4 de la Ley N\.° 29535/);
    assert.match(texto, /artículo 21\.1 de la Ley N\.° 29973/);
    assert.doesNotMatch(texto, /21\.2/);
  }
});

test("municipalidad y justicia citan el art. 21.2 como condicional de procedimiento", () => {
  for (const tipo of ["municipalidad", "justicia"] as TipoEntidad[]) {
    const { texto } = armarCarta({ ...base(), tipoEntidad: tipo }, HOY);
    assert.match(texto, /artículo 21\.2 de la Ley N\.° 29973/);
    assert.match(texto, /Si el trámite es/);
  }
});

test("bancos citan el art. 21.3 y las entidades privadas no reciben el art. 21.2", () => {
  const banco = armarCarta({ ...base(), tipoEntidad: "banco" }, HOY).texto;
  assert.match(banco, /artículo 21\.3 de la Ley N\.° 29973/);
  assert.doesNotMatch(banco, /21\.2/);

  for (const tipo of ["privada", "educacion"] as TipoEntidad[]) {
    const { texto } = armarCarta({ ...base(), tipoEntidad: tipo }, HOY);
    assert.doesNotMatch(texto, /21\.2/);
  }
});

test("ninguna carta dice undefined, reclamaciones ni código de consumidor", () => {
  const tipos: TipoEntidad[] = ["salud", "municipalidad", "justicia", "educacion", "banco", "privada", "otra_publica"];
  for (const tipo of tipos) {
    const { texto } = armarCarta({ ...base(), tipoEntidad: tipo }, HOY);
    assert.doesNotMatch(texto, /undefined|null/);
    assert.doesNotMatch(texto, /Reclamaciones|Protección y Defensa/);
  }
});

test("la necesidad y la cita aparecen en la carta", () => {
  const video = armarCarta({ ...base(), necesidad: "videollamada" }, HOY).texto;
  assert.match(video, /intérprete de LSP por videollamada/);
  const otra = armarCarta({ ...base(), necesidad: "otra", otraForma: "subtítulos en vivo" }, HOY).texto;
  assert.match(otra, /otra forma de comunicación accesible: subtítulos en vivo/);
  assert.match(otra, /22 de octubre de 2026 a las 10:30/);
});

test("los campos opcionales vacíos no dejan rastro", () => {
  const sinOpcionales = armarCarta({ ...base(), dni: "", conadis: "", hora: "" }, HOY);
  assert.doesNotMatch(sinOpcionales.texto, /DNI|CONADIS|a las \d/);
  assert.equal(sinOpcionales.despedida.length, 4);
});

test("validarDatos marca lo obligatorio y deja pasar lo opcional vacío", () => {
  assert.deepEqual(validarDatos(base()), {});
  const malo = validarDatos({ ...datosVacios(), dni: "123", hora: "25:00", necesidad: "otra", fecha: "2026-13-01" });
  assert.ok(malo.nombre);
  assert.ok(malo.dni);
  assert.ok(malo.tipoEntidad);
  assert.ok(malo.nombreEntidad);
  assert.ok(malo.fecha);
  assert.ok(malo.hora);
  assert.ok(malo.otraForma);
  assert.ok(malo.contacto);
});

test("los enlaces de WhatsApp y correo codifican el texto", () => {
  const texto = "Hola, necesito 100% un intérprete\nGracias";
  assert.equal(enlaceWhatsapp(texto), `https://wa.me/?text=${encodeURIComponent(texto)}`);
  assert.match(enlaceCorreo("Asunto & más", texto), /^mailto:\?subject=Asunto%20%26%20m%C3%A1s&body=/);
});

// Texto verificado del artículo 4 de la Ley 29535 (El Peruano). Debe citarse tal cual.
const ART4_TEXTO =
  "Las entidades e instituciones públicas o privadas que brinden servicios públicos o de atención al público proveen a las personas usuarias con discapacidad auditiva, de manera gratuita y en forma progresiva y según lo establezca el reglamento, el servicio de intérprete para sordos cuando éstos lo requieran.";

test("el artículo 4 se cita textualmente, entre comillas, en todas las entidades", () => {
  const tipos: TipoEntidad[] = ["salud", "municipalidad", "justicia", "educacion", "banco", "privada", "otra_publica"];
  for (const tipo of tipos) {
    const { texto } = armarCarta({ ...base(), tipoEntidad: tipo }, HOY);
    assert.ok(
      texto.includes(`El artículo 4 de la Ley N.° 29535 (texto publicado en El Peruano el 21 de mayo de 2010) dice: «${ART4_TEXTO}»`),
      `falta la cita textual para ${tipo}`,
    );
    assert.doesNotMatch(texto, /pueden recibir este pedido|pide a las entidades/);
  }
});

test("la carta no lleva la paráfrasis en lenguaje sencillo del artículo 4", () => {
  const { texto } = armarCarta(base(), HOY);
  assert.doesNotMatch(texto, /indica que las entidades|proveen un servicio de intérprete para sordos cuando la persona lo requiere/);
});

test("si la necesidad es otra forma, la carta no dice que la persona usa LSP", () => {
  const { texto, asunto } = armarCarta({ ...base(), necesidad: "otra", otraForma: "escritura" }, HOY);
  assert.doesNotMatch(texto, /me comunico en Lengua de Señas Peruana/);
  assert.match(asunto, /comunicación accesible/);
});

test("si la necesidad es otra forma, el cierre no pide un intérprete", () => {
  const { parrafos } = armarCarta({ ...base(), necesidad: "otra", otraForma: "subtítulos en vivo" }, HOY);
  const cierre = parrafos[parrafos.length - 1];
  assert.doesNotMatch(cierre, /intérprete/);
  assert.match(cierre, /coordinar esa forma de comunicación/);
  assert.match(cierre, /otra forma accesible/);
});

test("si la necesidad es intérprete, el cierre sí pide coordinar el intérprete", () => {
  for (const necesidad of ["presencial", "videollamada"] as const) {
    const { parrafos } = armarCarta({ ...base(), necesidad }, HOY);
    const cierre = parrafos[parrafos.length - 1];
    assert.match(cierre, /coordinar el intérprete/);
    assert.match(cierre, /Si no es posible un intérprete/);
  }
});

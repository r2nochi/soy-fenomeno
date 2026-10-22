import { test } from "node:test";
import assert from "node:assert/strict";
import {
  CLAVE_TARJETA,
  MENSAJE_POR_DEFECTO,
  borrarTarjeta,
  cargarTarjeta,
  datosIniciales,
  enlaceLlamada,
  guardarTarjeta,
  normalizarDatos,
  tieneDatosMedicos,
} from "../src/lib/tarjeta.ts";

// Almacén en memoria con la misma forma que localStorage.
function almacenFalso(inicial: Record<string, string> = {}) {
  const datos = new Map(Object.entries(inicial));
  return {
    datos,
    getItem: (k: string) => datos.get(k) ?? null,
    setItem: (k: string, v: string) => void datos.set(k, v),
    removeItem: (k: string) => void datos.delete(k),
  };
}

const almacenRoto = {
  getItem: () => {
    throw new Error("bloqueado");
  },
  setItem: () => {
    throw new Error("bloqueado");
  },
  removeItem: () => {
    throw new Error("bloqueado");
  },
};

test("los datos iniciales traen el mensaje por defecto y nada más", () => {
  const d = datosIniciales();
  assert.equal(d.mensaje, MENSAJE_POR_DEFECTO);
  assert.equal(d.nombre, "");
  assert.deepEqual(d.comunicacion, []);
  assert.equal(tieneDatosMedicos(d), false);
});

test("normalizar descarta tipos inválidos y recorta textos largos", () => {
  const d = normalizarDatos({
    nombre: "  Ana  ",
    mensaje: "x".repeat(999),
    comunicacion: ["lsp", "inventado", "escribir", "lsp"],
    contacto: { nombre: 5, telefono: "987 654 321" },
    medica: { tipoSangre: "Z9", alergias: "polen" },
  });
  assert.equal(d.nombre, "Ana");
  assert.equal(d.mensaje.length, 300);
  assert.deepEqual(d.comunicacion, ["escribir", "lsp"]);
  assert.equal(d.contacto.nombre, "");
  assert.equal(d.contacto.telefono, "987 654 321");
  assert.equal(d.medica.tipoSangre, "");
  assert.equal(d.medica.alergias, "polen");
});

test("normalizar acepta basura sin romperse", () => {
  assert.deepEqual(normalizarDatos(null), datosIniciales());
  assert.deepEqual(normalizarDatos("texto"), datosIniciales());
  assert.equal(normalizarDatos({ mensaje: "   " }).mensaje, MENSAJE_POR_DEFECTO);
});

test("guardar y cargar ida y vuelta", () => {
  const almacen = almacenFalso();
  const d = { ...datosIniciales(), nombre: "Luis", comunicacion: ["labios" as const] };
  assert.equal(guardarTarjeta(d, almacen), true);
  assert.ok(almacen.datos.has(CLAVE_TARJETA));
  assert.deepEqual(cargarTarjeta(almacen), d);
});

test("cargar con JSON dañado devuelve los datos iniciales", () => {
  const almacen = almacenFalso({ [CLAVE_TARJETA]: "{no es json" });
  assert.deepEqual(cargarTarjeta(almacen), datosIniciales());
});

test("sin almacenamiento disponible no falla", () => {
  assert.deepEqual(cargarTarjeta(null), datosIniciales());
  assert.equal(guardarTarjeta(datosIniciales(), null), false);
  assert.equal(borrarTarjeta(null), false);
});

test("si el navegador bloquea el almacenamiento, no lanza errores", () => {
  assert.deepEqual(cargarTarjeta(almacenRoto), datosIniciales());
  assert.equal(guardarTarjeta(datosIniciales(), almacenRoto), false);
  assert.equal(borrarTarjeta(almacenRoto), false);
});

test("borrar elimina los datos guardados", () => {
  const almacen = almacenFalso();
  guardarTarjeta({ ...datosIniciales(), nombre: "Ana" }, almacen);
  assert.equal(borrarTarjeta(almacen), true);
  assert.equal(almacen.datos.has(CLAVE_TARJETA), false);
  assert.deepEqual(cargarTarjeta(almacen), datosIniciales());
});

test("enlaceLlamada solo acepta números con al menos 6 dígitos", () => {
  assert.equal(enlaceLlamada("987 654 321"), "tel:987654321");
  assert.equal(enlaceLlamada("+51 987-654-321"), "tel:+51987654321");
  assert.equal(enlaceLlamada("105"), null);
  assert.equal(enlaceLlamada(""), null);
  assert.equal(enlaceLlamada("abc"), null);
});

test("tieneDatosMedicos detecta si hay algún dato médico", () => {
  const d = datosIniciales();
  d.medica.condiciones = "asma";
  assert.equal(tieneDatosMedicos(d), true);
});

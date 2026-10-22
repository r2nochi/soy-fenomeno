"use client";

// Abre el diálogo de impresión. El botón mismo no sale en la hoja (clase no-imprimir).
export function BotonImprimir() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="no-imprimir min-h-14 rounded-2xl bg-accion px-6 py-3 text-2xl font-bold text-sobre-accion hover:bg-accion-hover"
    >
      Imprimir este afiche
    </button>
  );
}

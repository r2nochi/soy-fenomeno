"use client";

import dynamic from "next/dynamic";

// Usa micrófono, localStorage y TensorFlow: no tiene sentido renderizarlo en el servidor.
export const AlertaCliente = dynamic(
  () => import("./AlertaApp").then((m) => m.AlertaApp),
  {
    ssr: false,
    loading: () => (
      <p className="mb-10 rounded-3xl bg-fondo-alt p-10 text-center text-xl">
        Cargando…
      </p>
    ),
  },
);

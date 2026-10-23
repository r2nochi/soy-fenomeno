"use client";

import { useState, useSyncExternalStore } from "react";
import { Link2, MessageCircle, Share2 } from "lucide-react";

const nadaQueEscuchar = () => () => {};

const boton =
  "inline-flex min-h-14 items-center gap-2 rounded-xl border-2 border-borde bg-superficie px-5 py-3 text-xl font-bold text-texto no-underline hover:border-acento";

// Botones para compartir una página: el menú del celular, WhatsApp o copiar el enlace.
export function Compartir({ titulo, url }: { titulo: string; url: string }) {
  // navigator.share solo existe en el navegador (y no en todos); en el servidor, no.
  const puedeCompartir = useSyncExternalStore(
    nadaQueEscuchar,
    () => typeof navigator.share === "function",
    () => false,
  );
  const [estado, setEstado] = useState("");

  async function compartir() {
    try {
      await navigator.share({ title: titulo, url });
    } catch {
      // La persona cerró el menú: no hace falta avisar.
    }
  }

  async function copiar() {
    try {
      await navigator.clipboard.writeText(url);
      setEstado("Enlace copiado.");
    } catch {
      setEstado("No pudimos copiar. Copia el enlace desde la barra del navegador.");
    }
  }

  return (
    <section aria-labelledby="titulo-compartir" className="mt-14">
      <h2 id="titulo-compartir" className="text-2xl font-bold">
        ¿Le sirve a alguien más? Compártelo
      </h2>
      <div className="mt-4 flex flex-wrap gap-3">
        {puedeCompartir && (
          <button type="button" onClick={compartir} className={boton}>
            <Share2 aria-hidden="true" className="size-6 text-acento" />
            Compartir
          </button>
        )}
        <a
          href={`https://wa.me/?text=${encodeURIComponent(`${titulo} ${url}`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className={boton}
        >
          <MessageCircle aria-hidden="true" className="size-6 text-acento" />
          WhatsApp
        </a>
        <button type="button" onClick={copiar} className={boton}>
          <Link2 aria-hidden="true" className="size-6 text-acento" />
          Copiar enlace
        </button>
      </div>
      <p role="status" aria-live="polite" className="mt-3 min-h-6 text-lg font-bold">
        {estado}
      </p>
    </section>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { Camera, CameraOff } from "lucide-react";

// Muestra la cámara como un espejo para practicar las señas. No graba ni envía
// nada: la imagen solo se ve en este equipo.
export function Espejo() {
  const video = useRef<HTMLVideoElement>(null);
  const montado = useRef(true);
  const [flujo, setFlujo] = useState<MediaStream | null>(null);
  const [pidiendo, setPidiendo] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    montado.current = true;
    return () => {
      montado.current = false;
    };
  }, []);

  useEffect(() => {
    if (video.current) video.current.srcObject = flujo;
    return () => flujo?.getTracks().forEach((t) => t.stop());
  }, [flujo]);

  const abrir = async () => {
    setError("");
    setPidiendo(true);
    try {
      const nuevo = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" }, audio: false });
      // Si la persona salió de la página mientras aceptaba el permiso, se apaga.
      if (!montado.current) {
        nuevo.getTracks().forEach((t) => t.stop());
        return;
      }
      setFlujo(nuevo);
    } catch {
      if (montado.current) setError("No se pudo abrir la cámara. Revisa el permiso del navegador.");
    } finally {
      if (montado.current) setPidiendo(false);
    }
  };

  return (
    <div className="mt-6 rounded-[28px] border-[3px] border-borde/55 bg-superficie p-5">
      <p className="text-xl font-bold">Modo espejo</p>
      <p className="mt-1 text-lg leading-snug text-suave">
        Mírate mientras haces las letras. La cámara no graba ni envía nada: solo
        la ves tú.
      </p>
      {flujo ? (
        <>
          {/* Volteado como un espejo. */}
          <video ref={video} autoPlay playsInline muted className="mt-4 aspect-video w-full -scale-x-100 rounded-2xl bg-tinta object-cover" />
          <button
            type="button"
            onClick={() => setFlujo(null)}
            className="mt-3 inline-flex min-h-12 items-center gap-2 rounded-2xl border-[3px] border-borde/55 px-5 text-lg font-bold"
          >
            <CameraOff aria-hidden="true" className="size-6" />
            Cerrar espejo
          </button>
        </>
      ) : (
        <button
          type="button"
          onClick={abrir}
          disabled={pidiendo}
          className="mt-3 inline-flex min-h-12 items-center gap-2 rounded-2xl border-[3px] border-acento px-5 text-lg font-bold text-acento disabled:opacity-60"
        >
          <Camera aria-hidden="true" className="size-6" />
          {pidiendo ? "Esperando permiso…" : "Abrir espejo"}
        </button>
      )}
      {error && <p role="alert" className="mt-2 text-lg text-error">{error}</p>}
    </div>
  );
}

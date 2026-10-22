import { CREDITO_FOTOS } from "@/lib/blog";

const enlace = "underline underline-offset-4";

export function CreditoFotos({ plural = false }: { plural?: boolean }) {
  return (
    <>
      {plural ? "Fotos" : "Foto"}:{" "}
      <a href={CREDITO_FOTOS.url} target="_blank" rel="noopener noreferrer" className={enlace}>
        {CREDITO_FOTOS.autor}
      </a>{" "}
      (
      <a href={CREDITO_FOTOS.urlLicencia} target="_blank" rel="noopener noreferrer license" className={enlace}>
        {CREDITO_FOTOS.licencia}
      </a>
      )
    </>
  );
}

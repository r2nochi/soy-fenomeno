// Símbolo de Puente LSP: una mano abierta sostiene el arco del puente.
// Las manos sostienen el puente entre personas Sordas y oyentes.
// Se usa en el logotipo, los íconos y las imágenes para compartir.

// Trazos gruesos para que se lea también en la pestaña del navegador (16 px).
const ANCHO_DEDO = 4.3;
const TRAZO = 5.2;

// [x, y, largo, giro] desde la palma; la muñeca está en (0, 0).
const DEDOS = [
  [-4.8, -10, 8.4, -33],
  [-1.7, -11, 11.4, -11],
  [1.7, -11, 11.6, 11],
  [4.8, -10, 9.6, 32],
  [5.4, -4, 8, 66], // pulgar
] as const;

export function SimboloPuente({
  ancho,
  color = "currentColor",
  className,
}: {
  ancho?: number;
  color?: string;
  className?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 16 64 31"
      width={ancho}
      height={ancho ? (ancho * 31) / 64 : undefined}
      className={className}
    >
      <g fill="none" stroke={color} strokeWidth={TRAZO} strokeLinecap="round">
        <path d="M4 44Q32 -6 60 44" />
        <path d="M3 44H61" />
      </g>
      <g fill={color} transform="translate(32 44) scale(1.1)">
        <rect x="-6.6" y="-12.5" width="13.2" height="12.5" rx="3.8" />
        {DEDOS.map(([x, y, largo, giro]) => (
          <rect
            key={giro}
            x={-ANCHO_DEDO / 2}
            y={-largo}
            width={ANCHO_DEDO}
            height={largo + ANCHO_DEDO / 2}
            rx={ANCHO_DEDO / 2}
            transform={`translate(${x} ${y}) rotate(${giro})`}
          />
        ))}
      </g>
    </svg>
  );
}

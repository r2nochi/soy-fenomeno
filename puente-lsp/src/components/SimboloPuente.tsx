// Símbolo de Puente LSP: una mano abierta sostiene el arco del puente.
// Las manos sostienen el puente entre personas Sordas y oyentes.
// Se usa en el logotipo, los íconos y las imágenes para compartir.

const ANCHO_DEDO = 3.3;

// [x, y, largo, giro] desde la palma; la muñeca está en (0, 0).
const DEDOS = [
  [-4.3, -10, 8.6, -27],
  [-1.5, -11, 11.6, -9],
  [1.5, -11, 11.8, 9],
  [4.3, -10, 9.8, 26],
  [5, -4, 8, 64], // pulgar
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
      viewBox="1 16.5 62 30"
      width={ancho}
      height={ancho ? (ancho * 30) / 62 : undefined}
      className={className}
    >
      <g fill="none" stroke={color} strokeWidth="3.4" strokeLinecap="round">
        <path d="M4 44Q32 -6 60 44" />
        <path d="M3 44H61" />
      </g>
      <g fill={color} transform="translate(32 44) scale(1.1)">
        <rect x="-6" y="-12" width="12" height="12" rx="3.5" />
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

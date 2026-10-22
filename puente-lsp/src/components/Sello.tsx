// Sello original de Puente LSP: una mano dentro de un globo de diálogo.
// No es un logo oficial ni una certificación del Estado.
export function Sello({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      role="img"
      aria-label="Sello de compromiso Puente LSP"
      className={className}
    >
      <circle cx="100" cy="100" r="96" fill="#0b4fd1" />
      <circle
        cx="100"
        cy="100"
        r="84"
        fill="none"
        stroke="#ffffff"
        strokeWidth="4"
        strokeDasharray="2 10"
        strokeLinecap="round"
      />
      {/* Globo de diálogo */}
      <path
        d="M52 56 h96 a14 14 0 0 1 14 14 v46 a14 14 0 0 1 -14 14 h-62 l-24 20 v-20 h-10 a14 14 0 0 1 -14 -14 v-46 a14 14 0 0 1 14 -14 z"
        fill="#ffffff"
      />
      {/* Mano abierta */}
      <g fill="#0b4fd1">
        <rect x="82" y="84" width="36" height="28" rx="12" />
        <rect x="83" y="66" width="6" height="26" rx="3" />
        <rect x="92" y="60" width="6" height="32" rx="3" />
        <rect x="101" y="62" width="6" height="30" rx="3" />
        <rect x="110" y="68" width="6" height="24" rx="3" />
        <rect x="74" y="88" width="10" height="6" rx="3" transform="rotate(-30 79 91)" />
      </g>
      <text
        x="100"
        y="178"
        textAnchor="middle"
        fontFamily="Atkinson Hyperlegible, system-ui, sans-serif"
        fontWeight="700"
        fontSize="30"
        fill="#ffffff"
      >
        LSP
      </text>
    </svg>
  );
}

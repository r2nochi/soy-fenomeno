import Link from "next/link";

// Logotipo: un arco de puente sobre dos pilares.
export function Marca({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-3 text-2xl font-bold tracking-tight no-underline ${className}`}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 40 28"
        className="h-7 w-10 shrink-0 text-acento"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
      >
        <path d="M3 24 Q20 -4 37 24" />
        <path d="M2 24h36" />
        <path d="M12 24v-9M28 24v-9M20 24V8" />
      </svg>
      Puente LSP
    </Link>
  );
}

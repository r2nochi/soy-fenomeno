import Link from "next/link";
import type { MDXComponents } from "mdx/types";
import type { ComponentProps, ReactNode } from "react";
import { Lightbulb } from "lucide-react";

// Recuadro para el consejo clave de una sección.
function Consejo({ children }: { children: ReactNode }) {
  return (
    <aside className="my-8 flex gap-4 rounded-3xl bg-acento-fondo p-6 text-xl leading-relaxed [&_p]:m-0">
      <Lightbulb aria-hidden="true" className="mt-1 size-7 shrink-0 text-acento" strokeWidth={2.25} />
      <div>{children}</div>
    </aside>
  );
}

function Enlace({ href = "", ...props }: ComponentProps<"a">) {
  const clase =
    "font-bold text-acento underline decoration-2 underline-offset-4 hover:decoration-4";
  if (href.startsWith("/")) return <Link href={href} className={clase} {...props} />;
  return <a href={href} className={clase} target="_blank" rel="noopener noreferrer" {...props} />;
}

const componentes: MDXComponents = {
  Consejo,
  a: Enlace,
  h2: (p) => (
    <h2 className="mt-14 mb-4 text-3xl font-bold leading-tight text-balance sm:text-4xl" {...p} />
  ),
  h3: (p) => <h3 className="mt-10 mb-3 text-2xl font-bold" {...p} />,
  p: (p) => <p className="my-5 text-xl leading-[1.7]" {...p} />,
  ul: (p) => <ul className="my-5 list-disc space-y-2 pl-7 text-xl leading-[1.6] marker:text-acento" {...p} />,
  ol: (p) => <ol className="my-5 list-decimal space-y-2 pl-7 text-xl leading-[1.6] marker:font-bold marker:text-acento" {...p} />,
  strong: (p) => <strong className="font-bold" {...p} />,
  blockquote: (p) => (
    <blockquote className="my-8 rounded-3xl bg-tinta px-7 py-5 text-xl text-sobre-tinta [&_p]:my-2 [&_strong]:text-acento-claro" {...p} />
  ),
};

export function useMDXComponents(): MDXComponents {
  return componentes;
}

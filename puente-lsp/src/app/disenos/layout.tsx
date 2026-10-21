import type { Metadata } from "next";

// Portadas alternativas para comparar. No se enlazan desde el sitio ni se indexan.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function LayoutDisenos({ children }: LayoutProps<"/disenos">) {
  return children;
}

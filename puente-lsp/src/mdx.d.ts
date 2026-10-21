// Cada artículo .mdx exporta sus datos como `metadata` (ver src/lib/blog.ts).
declare module "*.mdx" {
  import type { MDXProps } from "mdx/types";
  import type { DatosArticulo } from "@/lib/blog";
  export const metadata: DatosArticulo;
  export default function Contenido(props: MDXProps): React.JSX.Element;
}

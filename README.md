# soy-fenomeno

Proyecto **Puente LSP**: herramientas para romper la frontera entre personas Sordas y oyentes, empezando por Perú.

Sitio: https://puente-lsp.vercel.app

## La web (`puente-lsp/`)

Una sola app de Next.js con:

| Ruta | Qué es |
|------|--------|
| `/` | Inicio: la "mesa de herramientas" |
| `/interprete` | Pedir intérprete de LSP por videollamada (guarda en Supabase) |
| `/herramientas/alerta-visual` | Alerta Visual: sonidos convertidos en avisos y subtítulos en vivo |
| `/blog` | Tips y guías en español sencillo (artículos `.mdx` en `src/contenido/blog/`) |

Instrucciones técnicas en [`puente-lsp/README.md`](puente-lsp/README.md). Decisiones de producto y diseño en [`puente-lsp/PRODUCT.md`](puente-lsp/PRODUCT.md) y `puente-lsp/DESIGN.md`.

## Documentos

- [`ideas.md`](ideas.md): banco de ideas (Alerta Visual, subtítulos, llamadas con IA, portal, videos para redes).
- [`hoja-de-ruta-puente-lsp.md`](hoja-de-ruta-puente-lsp.md): fases del servicio de intérpretes.
- [`piloto-cohorte-lsp.md`](piloto-cohorte-lsp.md): cohorte de desarrolladores Sordos.

## Agregar un artículo al blog

1. Crear `puente-lsp/src/contenido/blog/<slug>.mdx` con su bloque `export const metadata = { ... }` (ver los existentes).
2. Agregarlo a la lista en `puente-lsp/src/lib/blog.ts`.

## Agregar una red social

Pegar el enlace en `REDES` dentro de `puente-lsp/src/lib/sitio.ts`. El botón aparece solo en el inicio y en el pie de página.

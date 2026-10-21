# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Personas Sordas en Perú**, sobre todo las que tienen la Lengua de Señas Peruana (LSP) como primera lengua y el español escrito como segunda. Usan la web para pedir un intérprete, para entender lo que suena a su alrededor (Alerta Visual con subtítulos) y para informarse en el blog.
- **Personas con hipoacusia u oralizadas**, que leen bien el español y aprovechan sobre todo los subtítulos y los avisos.
- **Empresas y entidades obligadas por la Ley 29535** (clínicas, bancos, universidades, municipalidades), que piden intérpretes para atender a sus clientes Sordos.
- **Intérpretes de LSP** que quieren sumarse a la red.
- **Familias, compañeros y público oyente** que quieren aprender a comunicarse e incluir mejor (lectores del blog y de las redes).

## Product Purpose

Puente LSP es la casa común de herramientas para romper la frontera entre personas Sordas y oyentes, empezando por Perú:

1. **Pedir intérprete LSP** por videollamada (Fase 0: formulario y atención manual).
2. **Alerta Visual**: convierte sonidos importantes en avisos visuales y la voz en subtítulos con los sonidos intercalados.
3. **Blog** con tips y guías para la comunidad Sorda y su entorno.
4. **Redes sociales** de la comunidad (TikTok, YouTube Shorts, Instagram, Facebook), con videos que se entienden sin sonido.

Se suman nuevas herramientas en el mismo sitio. Éxito significa que la gente vuelve a usar las herramientas, que las entidades piden intérpretes y que la comunidad Sorda confía en el proyecto.

## Positioning

Hecho en Perú, en español y pensado para LSP. Las herramientas son gratuitas, sin registro y funcionan en el navegador, también en la PC, donde casi no hay alternativas. Alerta Visual analiza el sonido en el equipo, sin enviarlo a ningún servidor. Se apoya en intérpretes humanos para la conversación y usa la IA solo donde funciona bien.

## Operating Context

- Uso en celulares Android de gama media o baja y en laptops modestas, con conexiones variables.
- Alerta Visual se deja abierta en casa o en el trabajo mientras la persona hace otras cosas.
- Las entidades visitan la web para cumplir la ley y quieren entender el servicio rápido.
- El blog llega desde Google y desde las redes sociales.

## Capabilities and Constraints

- Next.js 16 (App Router) + Tailwind v4, publicado en Vercel (`puente-lsp.vercel.app`), Supabase para las solicitudes.
- Rutas: inicio, `/interprete` (formulario), `/herramientas/alerta-visual`, `/blog`.
- Alerta Visual: YAMNet en el navegador. La transcripción de voz usa la Web Speech API, que envía la voz a Google, y eso se avisa en la interfaz.
- Las redes sociales todavía no existen: los enlaces quedan configurables y no se muestran hasta tener cuentas.
- Pendiente: aviso de privacidad (Ley 29733), video de presentación en LSP, asesor Sordo.

## Brand Commitments

- Nombre: **Puente LSP**.
- Se escribe "Sordo" con mayúscula cuando se habla de la comunidad e identidad Sorda, y LSP (nunca "LSC").
- Voz: español sencillo, frases cortas, una idea por frase, trato cercano ("tú").
- Honestidad: no prometer de más (por ejemplo, la app no reemplaza una alarma de incendio con luz). Decir "posible" cuando la IA no está segura.

## Evidence on Hand

- Leyes citadas con cuidado: Ley 29535 (LSP e intérpretes) y Ley 29973 (cuota de empleo).
- Investigación documentada en `docs-alerta-visual-investigacion.md` y en los documentos del repositorio raíz.
- **No hay** testimonios, usuarios, cifras de uso, aliados confirmados ni fotos reales todavía: no se deben inventar.

## Product Principles

1. **Nada sobre nosotros sin nosotros.** El contenido sobre la comunidad Sorda lo revisa una persona Sorda. Mientras eso no ocurra, se marca como "pendiente de revisión".
2. **Visual primero.** Todo se entiende sin sonido y con poco texto: íconos, color y estructura antes que párrafos largos.
3. **Útil al instante.** Sin registros ni formularios innecesarios: abrir y usar.
4. **Honestidad sobre la tecnología.** Decir qué hace la IA, qué no hace y adónde van los datos.
5. **La IA produce, no firma.** No se usan avatares de IA que hagan señas.

## Accessibility & Inclusion

- WCAG 2.2 AA como mínimo, buscando AAA en contraste de texto.
- Lectura fácil: letra grande, líneas de unos 65 caracteres, español sencillo.
- Sin mareos: nada de parallax, reproducción automática ni scroll secuestrado, y respetar `prefers-reduced-motion`.
- Parpadeos de 1 vez por segundo como máximo (WCAG 2.3.1).
- Navegación completa con teclado y lectores de pantalla, sin anuncios repetitivos para personas sordociegas con braille.

---
version: 1
slug: "src-app-page-tsx"
primary_target: "src/app/page.tsx"
related_targets: ["src/app/blog"]
---

# Inicio de Puente LSP

Modo: Persuade (portal). Construcción code-led (sin generación de imágenes).

Audiencia: personas Sordas (LSP como primera lengua), entidades que deben ofrecer intérprete, intérpretes, familias y público oyente. Acción principal: pedir intérprete. Acciones secundarias: abrir Alerta Visual con subtítulos y leer el blog. Restricciones: lectura fácil, sin mareos, visual primero. No hay prueba social real: no inventar testimonios ni cifras.

## Direction contract

THESIS: El inicio es una mesa de herramientas, no un folleto. Rechaza el arreglo de siempre (titular centrado sobre una fila de tarjetas iguales) y lo reemplaza por un mosaico con jerarquía, donde cada pieza ya muestra lo que hace.

OWN-WORLD: Fondo gris azulado claro (#f3f5f9 / oscuro #0c111c), tinta #0f1729, un solo azul de acción #0b4fd1 que ocupa la pieza principal entera, Atkinson Hyperlegible en todo, esquinas de 28px, bordes de 3px, íconos dibujados (lucide, trazo 2–2,25) como señal visual; los emoji solo aparecen dentro de las muestras, porque son lo que la herramienta realmente muestra; muestra de subtítulo y aviso en miniatura, marcados como Ejemplo, en tinta oscura que no cambia con el tema. Enmienda: emoji → íconos dibujados por la regla del craft floor contra emoji como sistema de íconos.

STORY: El visitante entiende en una mirada que aquí hay herramientas gratuitas para la comunidad Sorda, ve un ejemplo real de subtítulo con sonido intercalado, y pide intérprete o prueba Alerta Visual sin leer párrafos.

FIRST VIEWPORT: Barra superior con marca y enlaces. Titular corto a la izquierda («Herramientas para que nada se te escape.») con una línea de apoyo. Debajo, mosaico de 3 columnas: pieza azul a doble altura «Pedir intérprete LSP» con botón blanco abajo; «Alerta Visual»; «Subtítulos en vivo» con una muestra de subtítulo y la etiqueta (🚨 posible sirena); y abajo, a dos columnas, el último artículo del blog con su título como encabezado (sin etiqueta encima). En móvil, el mosaico se apila con la pieza azul primero.

FORM: Mesa de herramientas, posición 3 de mi lista ordenada (1 demostración de subtítulos, 2 dos orillas Sordo/oyente, 3 mesa de herramientas, 4 alfabeto manual como titular, 5 portada de periódico, 6 un día en la vida, 7 preguntas frecuentes). seed: f183a2c0c96a6520. Interacción distintiva: el texto de la muestra de subtítulo se ve siempre y la etiqueta de sonido se resalta una vez en azul de acción al cargar, como cuando la app la detecta (desactivada con prefers-reduced-motion); el resto de la página no se mueve. Enmienda: se descartó que las líneas aparezcan escribiéndose porque dejaba la muestra vacía al cargar (el craft floor exige contenido visible por defecto).

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

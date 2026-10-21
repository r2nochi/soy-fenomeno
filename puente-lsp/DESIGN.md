---
name: Puente LSP
description: Herramientas gratuitas para la comunidad Sorda del Perú, en una mesa de piezas que ya muestran lo que hacen.
colors:
  campo: "#f3f5f9"
  superficie: "#ffffff"
  campo-alt: "#e7ebf2"
  texto: "#0f1729"
  suave: "#4a5468"
  borde: "#6b7487"
  acento: "#0b4fd1"
  acento-hover: "#083c9f"
  acento-fondo: "#e6eeff"
  sobre-acento: "#ffffff"
  accion: "#0b4fd1"
  accion-hover: "#083c9f"
  sobre-accion: "#ffffff"
  tinta: "#0f1729"
  sobre-tinta: "#f2f5fa"
  acento-claro: "#9ec0ff"
  exito: "#0b6b3a"
  exito-fondo: "#e3f5ea"
  error: "#b00020"
  foco: "#a34a00"
typography:
  display:
    fontFamily: "Atkinson Hyperlegible, system-ui, sans-serif"
    fontSize: "3rem (3.75rem desde 640px)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Atkinson Hyperlegible, system-ui, sans-serif"
    fontSize: "2.25rem"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Atkinson Hyperlegible, system-ui, sans-serif"
    fontSize: "1.875rem"
    fontWeight: 700
    lineHeight: 1.25
  title-sm:
    fontFamily: "Atkinson Hyperlegible, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.375
  lead:
    fontFamily: "Atkinson Hyperlegible, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 400
    lineHeight: 1.375
  body:
    fontFamily: "Atkinson Hyperlegible, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 400
    lineHeight: 1.375
  body-articulo:
    fontFamily: "Atkinson Hyperlegible, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: "Atkinson Hyperlegible, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 700
    lineHeight: 1.6
rounded:
  campo: "8px"
  control: "12px"
  boton: "16px"
  panel: "24px"
  pieza: "28px"
  pastilla: "9999px"
spacing:
  margen: "16px"
  margen-sm: "32px"
  hueco-mosaico: "20px"
  pieza: "28px"
  pieza-principal: "32px"
  seccion: "64px"
  contenedor: "72rem"
  columna-articulo: "44rem"
components:
  button-primary:
    backgroundColor: "{colors.accion}"
    textColor: "{colors.sobre-accion}"
    typography: "{typography.body}"
    rounded: "{rounded.boton}"
    padding: "16px 24px"
  button-primary-hover:
    backgroundColor: "{colors.accion-hover}"
    textColor: "{colors.sobre-accion}"
  button-en-pieza:
    backgroundColor: "{colors.superficie}"
    textColor: "{colors.accion}"
    typography: "{typography.body}"
    rounded: "{rounded.boton}"
    padding: "16px 24px"
  button-secondary:
    backgroundColor: "{colors.superficie}"
    textColor: "{colors.texto}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "8px 16px"
  pieza:
    backgroundColor: "{colors.superficie}"
    textColor: "{colors.texto}"
    rounded: "{rounded.pieza}"
    padding: "{spacing.pieza}"
  pieza-principal:
    backgroundColor: "{colors.accion}"
    textColor: "{colors.sobre-accion}"
    rounded: "{rounded.pieza}"
    padding: "{spacing.pieza-principal}"
  muestra-tinta:
    backgroundColor: "{colors.tinta}"
    textColor: "{colors.sobre-tinta}"
    rounded: "{rounded.boton}"
    padding: "16px 20px"
  input-campo:
    backgroundColor: "{colors.superficie}"
    textColor: "{colors.texto}"
    typography: "{typography.label}"
    rounded: "{rounded.campo}"
    padding: "12px 16px"
  chip-sonido:
    textColor: "{colors.texto}"
    rounded: "{rounded.pastilla}"
    padding: "2px 12px"
  consejo:
    backgroundColor: "{colors.acento-fondo}"
    textColor: "{colors.texto}"
    rounded: "{rounded.panel}"
    padding: "24px"
---

# Design System: Puente LSP

## Overview

**Creative North Star: "La mesa de herramientas"**

Puente LSP no es un folleto: es una mesa donde cada herramienta está a la vista y ya muestra lo que hace. Sobre un campo gris azulado claro descansan piezas blancas de esquinas generosas y borde grueso; una sola pieza, la de pedir intérprete, ocupa entera el azul de acción. La página se lee con los ojos antes que con las palabras: íconos dibujados, color con un rol fijo y estructura clara antes que párrafos.

La densidad es baja y la letra, grande. Todo el sistema usa una sola familia, Atkinson Hyperlegible, en dos pesos, con texto de cuerpo a 20px y titulares compactos de tracking cerrado. El contraste de texto apunta a 7:1 en los dos temas (claro y oscuro, por `prefers-color-scheme`). El movimiento es casi nulo: un único resaltado al cargar en la muestra de subtítulos, un parpadeo de 1 Hz en los avisos de Alerta Visual, y nada más; todo se apaga con `prefers-reduced-motion`.

Las muestras de lo que la herramienta produce (subtítulo con sonido intercalado, aviso en miniatura) se pintan en tinta oscura que no cambia con el tema y llevan la marca «Ejemplo». Es la única zona donde aparecen emoji, porque son exactamente lo que la herramienta muestra.

**Key Characteristics:**
- Campo gris azulado, piezas blancas con borde de 3px y esquinas de 28px.
- Un solo azul de acción, invariante entre temas, para la acción principal.
- Una familia tipográfica (Atkinson Hyperlegible 400/700), cuerpo de 20px.
- Íconos dibujados con trazo de 2 a 2,25; emoji solo como contenido de las herramientas.
- Muestras en tinta invariante, marcadas «Ejemplo».
- Foco de dos tonos muy visible; movimiento mínimo y siempre desactivable.

## Colors

Paleta fría y sobria de un solo acento: un azul decidido sobre grises azulados, con tinta casi negra para lo que la herramienta produce.

### Primary
- **Azul Puente** (accion / acento, claro): el color de la acción principal. Rellena entera la pieza «Pedir intérprete», los botones primarios, la barra de progreso y la pieza destacada del blog. `accion` es invariante entre temas (el mismo azul en oscuro); `acento` es su versión para texto e íconos sobre superficie y en oscuro se aclara a #7aa7ff para mantener el contraste. Hover: Azul Puente Profundo (`accion-hover`, `acento-hover`). También es el `themeColor` del navegador, la selección de texto y el cursor de escritura.
- **Azul Velado** (acento-fondo): relleno de opciones marcadas (radios y casillas de sonido) y del recuadro «Consejo» del blog. En oscuro, #18284a.
- **Azul Señal** (acento-claro): la etiqueta de sonido dentro de la muestra de tinta y las negritas de las citas; invariante entre temas porque siempre va sobre tinta.

### Neutral
- **Campo Gris Azulado** (campo): el fondo de la página, sobre el que se apoyan las piezas. En oscuro, #0c111c.
- **Superficie** (superficie): el blanco de las piezas, la cabecera y los campos de formulario. En oscuro, #151c2b.
- **Campo Alterno** (campo-alt): bandas de sección («¿Para quién es?»), pie de página y zonas de lectura de las herramientas. En oscuro, #111827.
- **Tinta** (texto / tinta): texto principal y fondo de las muestras, de la banda de comunidad y de las citas. `tinta` es invariante (en oscuro se separa a #1d2738 para no fundirse con el campo); su texto es Papel (`sobre-tinta`).
- **Pizarra** (suave): texto secundario, metadatos, apoyo. En oscuro, #b6bfcf.
- **Borde** (borde): bordes de campos y controles a opacidad completa; los bordes de pieza lo usan al 55% y los divisores al 25%. En oscuro, #8a94a8.

### Estado
- **Verde Listo** (exito, exito-fondo): solo el mensaje de solicitud enviada.
- **Rojo Error** (error): bordes de campo inválido, mensajes de error y alertas de herramienta.
- **Ámbar Foco** (foco): exclusivo del anillo de foco. En oscuro, #ffc940.

### Colores de aviso
Cada sonido de Alerta Visual tiene su propio color de pantalla completa, definido en `src/lib/sonidos.ts` (fuego #d10000, puerta #0b5bd3, bebé #a3009c, sirena #9e4100, etc.). Son contenido de la herramienta, no tokens de la interfaz: solo aparecen en avisos reales y en su miniatura de ejemplo, siempre con texto blanco.

### Named Rules
**The One Blue Rule.** El azul de acción rellena una sola pieza o un solo botón primario por vista. Todo lo demás es superficie blanca con borde; el azul en texto (`acento`) marca enlaces, íconos y estados, nunca un segundo bloque relleno.

**The Invariant Ink Rule.** Lo que la herramienta produce (subtítulos, avisos de ejemplo, citas) se pinta en tinta y Papel que no cambian con el tema, para que la muestra se vea igual que la herramienta real.

**The Seven-to-One Rule.** Texto sobre fondo apunta a 7:1 en ambos temas. Para aclarar un color con texto blanco encima, se oscurece; nunca se aclara.

## Typography

**Display Font:** Atkinson Hyperlegible (con system-ui, sans-serif)
**Body Font:** Atkinson Hyperlegible (con system-ui, sans-serif)

**Character:** Una sola familia diseñada para baja visión, en regular y negrita. La jerarquía sale del tamaño y el peso, no del contraste entre familias.

### Hierarchy
- **Display** (700, 3rem a 3.75rem desde 640px, 1.05, tracking -0.025em): el titular de la página, ancho máximo de 18 caracteres, con `text-wrap: balance`.
- **Headline** (700, 2.25rem, 1.25, tracking -0.025em): títulos de sección y el título de la pieza principal.
- **Title** (700, 1.875rem, 1.25): título de las piezas de herramienta, del cierre y de los artículos en lista.
- **Title pequeño** (700, 1.5rem, 1.375): artículos destacados en tarjeta, filas de «¿Para quién es?», h3 de artículo.
- **Lead** (400, 1.5rem, 1.375): la línea de apoyo bajo cada titular, en Pizarra, de 50 a 52 caracteres de ancho.
- **Body** (400, 1.25rem, 1.375): todo el texto de apoyo de las piezas, de 30 a 60 caracteres por línea. En artículos sube a interlineado 1.7 sobre una columna de 44rem.
- **Label** (700, 1.125rem): etiquetas de formulario, navegación y metadatos («5 min de lectura»).

### Named Rules
**The Twenty-Pixel Floor Rule.** Los párrafos de piezas, secciones y artículos no bajan de 20px (1.25rem). Los 18px quedan para etiquetas, campos, navegación, metadatos y el texto de las muestras; los 16px, solo para notas al pie y avisos de privacidad.

**The No-Label-Above Rule.** Los títulos se sostienen solos: no llevan etiqueta pequeña ni categoría encima. El contexto («Del blog · 5 min de lectura») va debajo, en Pizarra.

## Layout

Contenedor de 72rem centrado, con márgenes de 16px en móvil y 32px desde 640px. Las secciones respiran con 64px arriba y abajo y alternan entre el campo, el Campo Alterno (con divisores de 2px al 25%) y una banda de tinta.

El inicio es un mosaico de tres columnas desde 1024px (proporciones 1.25 / 1 / 1, hueco de 20px): la pieza principal azul ocupa dos filas a la izquierda, dos piezas de herramienta a la derecha y, abajo, una pieza ancha de dos columnas. En móvil todo se apila en una columna con la pieza azul primero. Las listas largas (público, artículos) van dentro de una sola pieza con divisores internos, no como filas de tarjetas iguales. Los artículos se leen en una columna de 44rem.

**The Hierarchy Mosaic Rule.** Nunca una fila de tarjetas iguales: las piezas tienen tamaños distintos según su importancia, y la más importante es la más grande.

## Elevation & Depth

El sistema es plano. La profundidad se da por capas de tono (campo, superficie, tinta) y por bordes, no por sombras.

### Shadow Vocabulary
- **Halo azul** (`box-shadow: 0 18px 40px -18px rgb(11 79 209 / 0.6)`): solo bajo la pieza principal azul del inicio, para separarla del campo. Es la única sombra del sistema.
- **Separación de foco** (`box-shadow: 0 0 0 3px var(--fondo)`): parte del anillo de foco; ver Components.

### Named Rules
**The Flat-Table Rule.** Las piezas descansan planas sobre la mesa. Solo la pieza de la acción principal lleva sombra, suave y del mismo azul; ninguna otra superficie se levanta.

## Shapes

Esquinas generosas y redondeadas, escalonadas por tamaño: 28px para las piezas de la mesa, 24px para paneles de herramienta, recuadros «Consejo» y citas, 16px para botones grandes y muestras, 12px para controles y botones de herramienta, 8px para campos de formulario, y pastilla completa para chips de sonido, números de paso y enlaces de redes. Los bordes son gruesos: 3px en las piezas del inicio, 2px en campos, controles y paneles de herramienta. El logotipo es un arco de puente sobre pilares con trazo redondeado de 3,5.

## Components

### Buttons
Botones grandes y llanos, sin sombra, con texto en negrita a 20px.
- **Shape:** esquinas suaves (16px) en acciones principales; 12px en el formulario y en las barras de herramienta.
- **Primary:** Azul Puente con texto blanco, 16px por 24px (hasta 20px por 32px y 24px de texto en el botón de iniciar de Alerta Visual).
- **En pieza azul:** botón blanco con texto Azul Puente y flecha dibujada que se desplaza 4px a la derecha al pasar el puntero.
- **Hover / Focus:** el fondo pasa a Azul Puente Profundo; el foco usa el anillo global. Deshabilitado: opacidad 60%.
- **Secondary:** borde de 2px en Borde, fondo transparente, texto Tinta; al pasar el puntero se rellena con el campo o el Campo Alterno. Variante con borde y texto en `acento` para acciones como «Probar avisos».

### Chips
- **Style:** pastilla con borde de 2px en Borde, texto en negrita; muestra los sonidos detectados ahora en la barra de subtítulos.
- **Redes:** pastilla Papel con texto Tinta sobre la banda de tinta; si la red aún no existe, pastilla de borde al 40% con «· pronto».

### Cards / Containers
- **Corner Style:** 28px (pieza), 24px (panel).
- **Background:** Superficie sobre el campo; la pieza principal en Azul Puente.
- **Shadow Strategy:** plano; solo la pieza principal lleva el Halo azul.
- **Border:** 3px en Borde al 55%; al pasar el puntero, el borde pasa a `acento`. Los paneles de herramienta usan 2px.
- **Internal Padding:** 28px en piezas, 32px en la pieza principal y el cierre.

### Inputs / Fields
- **Style:** borde de 2px en Borde, fondo Superficie, esquinas de 8px, 12px por 16px, texto a 18px.
- **Focus:** el borde pasa a `acento` y se suma el anillo global.
- **Opciones:** radios y casillas envueltos en una opción de borde de 2px; marcada, borde `acento` y fondo Azul Velado.
- **Error:** borde Rojo Error y mensaje en negrita debajo, enlazado por `aria-describedby`; el foco salta al primer campo inválido.

### Navigation
Cabecera en Superficie con divisor inferior de 2px al 25%: logotipo a la izquierda, enlaces en negrita a 18px a la derecha, que se subrayan con 3px de `acento` y 8px de separación al pasar el puntero. En móvil los enlaces pasan debajo del logotipo. El pie va en Campo Alterno, en tres columnas desde 640px. Un enlace «Saltar al contenido» aparece en Azul Puente al recibir foco.

### Enlaces de texto
Texto `acento` en negrita, subrayado de 2px separado 4px; al pasar el puntero el subrayado engrosa a 4px. Las listas del blog usan viñetas y números en `acento`.

### Anillo de foco
Contorno de 4px en Ámbar Foco separado 3px, con un halo de 3px del color del campo que lo despega de cualquier fondo, y esquinas de 6px. Igual en todo el sitio.

### Muestra de subtítulos (signature)
Bloque de tinta invariante con esquinas de 16px y texto Papel a 18px. Las líneas de voz se ven siempre; la línea de sonido va en negrita en Azul Señal y, al cargar, se resalta una sola vez con fondo Azul Puente (2,4s, `cubic-bezier(0.16, 1, 0.3, 1)`, 0,6s de retardo), como cuando la app la detecta. Termina con «Ejemplo» alineado a la derecha.

### Aviso de Alerta Visual (signature)
A pantalla completa, en el color propio del sonido, con el emoji del sonido a 9 a 12rem, el nombre en display y un botón blanco para cerrar. Puede parpadear oscureciéndose al 70% de brillo a 1 vez por segundo (nunca más rápido; WCAG 2.3.1). Su miniatura en el inicio usa el mismo color, esquinas de 16px y la marca «Ejemplo».

### Consejo
Recuadro de artículo en Azul Velado, esquinas de 24px, 24px de relleno, con un ícono de bombilla dibujado en `acento`.

## Do's and Don'ts

### Do:
- **Do** apoyar cada pieza en Superficie con borde de 3px al 55% y esquinas de 28px sobre el campo gris azulado.
- **Do** reservar el relleno de Azul Puente para una sola pieza o botón primario por vista.
- **Do** usar íconos dibujados (lucide) con trazo de 2 a 2,25, a 40px en piezas y 48 a 56px en las cabezas de sección.
- **Do** pintar las muestras de herramienta en tinta invariante y marcarlas con «Ejemplo».
- **Do** mantener los párrafos en 20px o más, en Atkinson Hyperlegible regular o negrita.
- **Do** desactivar toda animación con `prefers-reduced-motion` y mantener cualquier parpadeo en 1 vez por segundo o menos.
- **Do** dejar el contenido visible por defecto: una animación solo resalta lo que ya está en pantalla.

### Don't:
- **Don't** armar filas de tarjetas iguales bajo un titular centrado; el mosaico tiene jerarquía.
- **Don't** usar emoji ni caracteres (⚠, ✓, →) como íconos de interfaz; los emoji solo aparecen como contenido de las herramientas (sonidos, avisos, muestras).
- **Don't** poner etiquetas pequeñas ni categorías encima de los títulos.
- **Don't** añadir sombras a piezas, paneles o botones; la única sombra es el Halo azul de la pieza principal.
- **Don't** aclarar un color que lleva texto blanco encima; se oscurece.
- **Don't** usar parallax, reproducción automática ni scroll secuestrado.
- **Don't** usar el Ámbar Foco para nada que no sea el foco.

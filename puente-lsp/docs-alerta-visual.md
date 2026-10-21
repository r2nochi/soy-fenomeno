# Alerta Visual

Convierte sonidos importantes en avisos que se ven: alarma de humo o incendio, timbre o golpes en la puerta, teléfono, bebé llorando, sirenas y más.

- Funciona en el navegador, en la PC o en un celular Android. No hay que instalar nada.
- Gratis, sin registro y sin servidor. **El audio se analiza en el propio equipo y nunca sale de él.**
- Ver `INVESTIGACION.md`: qué existe ya y por qué hacemos esto.

> ⚠ Solo funciona con la página abierta y puede equivocarse. **No reemplaza una alarma de incendio con luz.**

## Cómo funciona

1. El micrófono se captura a 16 kHz, sin supresión de ruido, porque esa supresión borra alarmas y timbres (`src/lib/detector.ts`).
2. Un AudioWorklet (`public/captura-worklet.js`) envía bloques de 0,5 s. Cada bloque se analiza con la última ventana de 0,975 s.
3. **YAMNet** (Google, 521 tipos de sonido) corre con TensorFlow.js. El modelo está guardado en `public/yamnet/`, así que no depende de servicios externos.
4. Cada aviso agrupa varias clases de YAMNet y tiene su propio umbral (`src/lib/sonidos.ts`). Para avisar, el sonido tiene que repetirse en ventanas seguidas. Después espera 15 s antes de volver a avisar del mismo sonido.
5. El aviso ocupa toda la pantalla con color, ícono y hora, y hace vibrar el equipo. Si la pestaña está oculta, también llega una notificación del sistema.

## Subtítulos en vivo

Con la escucha activa, el botón **"💬 Mostrar subtítulos"** abre un panel parecido a Live Transcribe:

- **Voz a texto** en español (Perú) con la transcripción del navegador (Web Speech API, en Chrome o Edge). **Para transcribir, el navegador envía la voz a Google.** Los demás sonidos se siguen analizando en el equipo.
- **Sonidos dentro del texto**, por ejemplo "(🚨 posible sirena)", "(🐦 pájaros)" o "(🎵 música)". Con menos de 60 % de confianza se dice "posible". Ver `src/lib/etiquetas.ts`.
- **Franja "Sonidos ahora"** con lo que suena en ese momento.
- **Responder en voz alta:** lo que escribes lo dice el equipo. Mientras habla, la transcripción se pausa para no copiarse a sí misma.
- Letra ajustable (A− / A+), pantalla completa, copiar y borrar. El texto no se guarda en ningún lado.
- Si suena una alarma, el aviso a pantalla completa aparece igual.

El parpadeo es de 1 vez por segundo, por debajo del límite de 3 por segundo de WCAG 2.3.1 (riesgo de crisis fotosensibles). Se puede apagar, y se apaga solo si el sistema tiene activado "reducir movimiento".

## Correr en local

```bash
npm install
npm run dev
```

El micrófono solo funciona en `localhost` o con HTTPS.

## Probado

- Una alarma de humo sintética (pitidos de 3,1 kHz) se detecta como "Smoke detector" con 0,50 de confianza y dispara el aviso completo.
- El silencio no dispara nada.
- El patrón real de una alarma de humo (3 pitidos y una pausa) dispara el aviso en unos 2 segundos, con distintos ritmos.
- Subtítulos probados con un reconocedor de voz simulado: la voz y los sonidos se intercalan bien.
- **Falta probar con sonidos y voz reales:** timbres, alarmas, bebés y conversaciones de verdad, para ajustar los umbrales.
- **Por verificar en Android:** si Chrome deja usar a la vez la transcripción de voz y el micrófono de los avisos.

## Próximos pasos

- **v2, "Oído de la casa":** un celular viejo escucha y el aviso llega a tu PC y a tu celular, emparejados con un código QR.
- **v3:** avisar si alguien dice tu nombre y aprender sonidos propios.

# Banco de ideas: herramientas útiles para personas Sordas

Herramientas que funcionan al abrirlas, sin formularios ni registros. La inspiración es Live Captions de Windows 11 (Win + Ctrl + L).

## Qué no cubre Live Captions

1. Solo transcribe palabras. No avisa de sonidos como el timbre, una alarma, golpes en la puerta, el teléfono o un bebé llorando.
2. Exige leer español rápido. Muchas personas Sordas tienen la LSP como primera lengua y el español escrito como segunda.
3. No guarda nada. Si te distraes unos segundos, pierdes lo que se dijo.

---

## A. Alerta Visual ⭐ (en desarrollo)

Convierte sonidos importantes en avisos visuales grandes: la pantalla parpadea, aparece un ícono y un color, y el celular vibra.

- **Sonidos:** alarma de incendio o de humo, timbre, golpes en la puerta, teléfono, bebé llorando, alguien que dice tu nombre.
- **Por qué:**
  - Los avisos son íconos y colores, así que no depende de leer español.
  - Es un tema de seguridad.
  - Todo corre en el dispositivo: no necesita servidor y el audio no sale del equipo.
- **Cómo:** web instalable (PWA) con el modelo abierto YAMNet, que reconoce sonidos, ejecutándose en el navegador.
- **Límite que hay que decir claro:** solo funciona con la app abierta. No reemplaza una alarma de incendio con luz estroboscópica.
- **Detalle:** ver `alerta-visual/INVESTIGACION.md`.
- **Estado:** v1 construida en `alerta-visual/`. Detecta en el navegador y muestra el aviso a pantalla completa. Falta probarla con sonidos reales y publicarla.

## B. Subtítulos con memoria

Una capa sobre lives y videos (Kick, Twitter/X, YouTube, reuniones):
- historial que se puede buscar y releer;
- resumen cada minuto en español sencillo;
- aviso cuando aparece una palabra clave o tu nombre;
- exportar la transcripción.

**Riesgo:** se parece a Live Captions. Tiene que destacar por la memoria y el español sencillo.

## C. Llamadas telefónicas con IA (relevo automático)

La persona escribe lo que quiere decir, la IA lo dice por teléfono y le transcribe la respuesta. Sirve para llamar al banco, a la clínica, a un call center ("presione 1") o al delivery.

- **Impacto:** el mayor de las tres. En Perú no hay un servicio de relevo telefónico.
- **Costo y complejidad:** altos. Telefonía por minuto, voz sintética y transcripción en tiempo real.
- **Ética:** la IA debe avisar a quien contesta que se trata de una llamada asistida.

## Relacionado

- `hoja-de-ruta-puente-lsp.md`: plataforma de intérpretes LSP (Fase 0 publicada en https://puente-lsp.vercel.app).
- `piloto-cohorte-lsp.md`: cohorte de desarrolladores Sordos.

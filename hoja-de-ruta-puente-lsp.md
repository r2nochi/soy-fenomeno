# Hoja de ruta: Puente LSP

Versión 0.1 · Perú primero, Latinoamérica después.

**Idea central:** usar intérpretes humanos para las conversaciones en vivo ahora, e IA para el contenido predecible después. Cada fase financia la siguiente y le da los datos que necesita.

---

## Cómo validar sin hacer entrevistas

En lugar de entrevistas, se valida con **uso real**: un servicio manual que se lanza en semanas y muestra si alguien pide intérpretes y si alguien paga.

Para reemplazar las entrevistas hay dos cosas que no se pueden saltar, porque sin ellas el proyecto pierde credibilidad ante la comunidad:
1. **Un asesor Sordo pagado por horas** (unas 4 horas al mes) que revise cada pantalla, mensaje y decisión antes de lanzarla.
2. **Al menos un intérprete de LSP como socio**, no solo como proveedor. Los intérpretes conocen la demanda mejor que nadie.

---

## Fase 0: Servicio manual (semanas 1 a 4) · sin programar

**Objetivo:** probar que hay demanda y que alguien paga.

- Sumar de 3 a 5 intérpretes de LSP dispuestos a atender por videollamada.
- Una landing page simple: "Intérprete de LSP por videollamada en menos de 30 minutos".
- El servicio funciona a mano: formulario o WhatsApp → se busca al intérprete → se envía un link de Google Meet → se cobra con transferencia o enlace de pago.
- Ofrecerlo a 10 o 15 entidades obligadas por la Ley 29535: clínicas, bancos, universidades, municipalidades, notarías.

**Pasa a Fase 1 si:** hay al menos 10 servicios atendidos y al menos 2 entidades piden repetir o un plan mensual.

**Referencia regional:** Colombia tiene un servicio estatal de relevo e interpretación en línea para personas Sordas (el Centro de Relevo). Antes de presentar el proyecto a aliados, conviene confirmar los datos actuales del servicio, pero muestra que el modelo funciona en la región. En EE. UU. y Europa, la interpretación remota por video es un servicio maduro, sobre todo en hospitales.

---

## Fase 1: Plataforma de interpretación remota (meses 2 a 6)

**Objetivo:** automatizar lo que en la Fase 0 se hacía a mano.

### Producto principal
1. **Solicitud inmediata o con cita**, y asignación automática del intérprete disponible.
2. **Videollamada en el navegador**, construida sobre un servicio de video existente. También se puede usar dentro de Meet, Zoom o Teams.
3. **Perfiles de intérpretes** con especialidad (salud, legal, bancos, educación) y calificaciones.
4. **Panel para empresas**: historial, facturación y reportes de cumplimiento de la Ley 29535.

### La idea diferencial: "Ventanilla LSP"
Un **código QR o una tablet en el mostrador** de bancos, clínicas, municipalidades y aeropuertos. La persona Sorda escanea el código y en segundos tiene un intérprete en pantalla para hablar con quien la atiende. La entidad paga una suscripción mensual y cumple la ley sin tener un intérprete de planta.
- Es fácil de vender: "cumple la ley con un QR".
- Es visible: cada ventanilla le muestra el servicio a la comunidad Sorda.

### Complementos baratos con IA (ya se pueden hacer)
- Subtítulos con color por hablante en las reuniones.
- **"Español sencillo"**: un LLM convierte actas, contratos o indicaciones médicas en frases cortas. Un intérprete o el asesor Sordo lo revisa antes de usarlo en temas sensibles.
- Alertas visuales para eventos importantes (turnos, llamados, emergencias).

### Modelo de ingresos
- Pago por minuto para uso eventual.
- Suscripción mensual por ventanilla o por sede.
- Planes para universidades (clases con intérprete).
- El intérprete recibe la mayor parte de cada servicio. La plataforma cobra una comisión.

---

## Fase 2: Datos y conocimiento de LSP (meses 6 a 18)

**Objetivo:** construir lo que nadie más tiene.

- **Glosarios por sector en video** (salud, bancos, legal, tecnología). Sirven de inmediato a intérpretes y personas Sordas, y se pueden vender como formación a las empresas.
- **Banco de datos de LSP con consentimiento**: sesiones grabadas solo con un permiso aparte, voluntario y revocable, y pagando a quienes participan. Sin este cuidado el proyecto pierde la confianza de la comunidad.
- **Alianza por proponer** con el grupo Señas Gramaticales de la PUCP para la anotación y el rigor lingüístico.
- **Formación**: cursos cortos de LSP y de etiqueta inclusiva para equipos de empresas clientes (los "Inclusion Nudges" de la idea original, como producto).

---

## Fase 3: IA de LSP en dominios acotados (desde el mes 18)

**Principio:** la IA empieza por lo **predecible**. Las conversaciones abiertas siguen con intérpretes humanos.

| Uso | Por qué es viable antes |
|-----|------------------------|
| **Avatar en LSP para mensajes fijos**: anuncios de transporte, alertas de emergencia, avisos en webs del Estado | El texto se conoce de antemano y lo pueden revisar personas Sordas. Así trabajan los proveedores de avatares de señas más avanzados de otros países |
| **Reconocimiento de señas con vocabulario limitado**: un mostrador bancario o el triaje de una clínica (unas 100 a 300 señas) | Un vocabulario pequeño es alcanzable con los datos de la Fase 2. La traducción abierta no lo es todavía |
| **Ayuda al intérprete**: sugerir la seña de un término técnico durante el servicio | No reemplaza al intérprete, le ayuda a trabajar mejor |

---

## Fase 4: Escalar (desde el año 2)

- **Otros países**: la plataforma de la Fase 1 sirve para cualquier lengua de señas cambiando los intérpretes. Primero países con leyes parecidas.
- **Agentia, la academia**: la cohorte de desarrolladores Sordos (ver `piloto-cohorte-lsp.md`) se lanza cuando haya ingresos para pagar estipendios, y forma al equipo que construye las Fases 2 y 3.
- **Contratos con el Estado**: alertas de emergencia en LSP y atención en servicios públicos.

---

## Qué construir primero (si se programa ya)

En este orden:
1. Landing page y formulario de solicitud (sirve para la Fase 0).
2. Agenda y asignación de intérpretes.
3. Videollamada con un servicio existente.
4. Ventanilla LSP: página que se abre con un QR y llama al intérprete disponible.
5. Panel para empresas y reportes.

Stack sugerido: Next.js, TypeScript, Supabase (base de datos y usuarios) y un servicio de video de terceros.

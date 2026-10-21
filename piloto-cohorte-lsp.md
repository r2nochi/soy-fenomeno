# Piloto: cohorte de desarrolladores Sordos que construyen el Puente LSP

Versión 0.1 · borrador para discutir con la comunidad Sorda, intérpretes y posibles aliados.

---

## 1. Propósito

Formar a un grupo pequeño de personas Sordas (5 a 8) como **desarrolladores junior con un portafolio real**. Ese portafolio es la Fase 1 del Puente LSP: una plataforma que conecta a empresas e instituciones con intérpretes de LSP en minutos.

El piloto no promete formar "ingenieros de élite". Promete gente capaz de construir, revisar y desplegar software con ayuda de agentes de IA, con evidencia de lo que hizo.

### Hipótesis y cómo sabremos si se cumplen

| # | Hipótesis | Se cumple si… |
|---|-----------|---------------|
| H1 | Con contenido en LSP primero y español sencillo, una persona Sorda puede aprender desarrollo web asistido por agentes al mismo ritmo que una cohorte oyente | Al menos el 75% termina el programa y entrega su módulo del Puente LSP funcionando |
| H2 | Los agentes de IA ayudan a aprender, no solo a copiar | En la semana 18, cada participante, sin ayuda, construye una funcionalidad pequeña (formulario + API + base de datos + prueba) y explica su código en LSP |
| H3 | Hay empresas dispuestas a contratar a los egresados | Al menos 3 empresas aliadas entrevistan a egresados y al menos 2 personas reciben una oferta (empleo o práctica) dentro de los 3 meses siguientes |
| H4 | La comunidad Sorda confía en el proyecto | Las asociaciones que participaron recomendarían una segunda cohorte |

Si H1 o H2 fallan, se corrige el método antes de crecer. Si falla H3, el problema es de empleabilidad y no de enseñanza, y se trabaja eso primero.

---

## 2. Semana 0: condiciones para arrancar (go / no-go)

El piloto **no empieza** hasta cumplir estas cinco condiciones:

- [ ] **Entrevistas hechas**: 15 a 20 personas Sordas y unos 5 intérpretes de LSP, a través de asociaciones de personas Sordas (por ejemplo, la Asociación de Sordos del Perú). Las preguntas están abajo.
- [ ] **Co-líder Sordo comprometido**: una persona Sorda en el equipo que dirige, con poder de decisión real, no como consultor ocasional.
- [ ] **Empresas aliadas**: de 2 a 3 empresas que se comprometen por escrito a entrevistar a los egresados. Argumento: la cuota de empleo de la Ley 29973 y la obligación de ofrecer intérprete de la Ley 29535.
- [ ] **Financiamiento confirmado** para todo el programa: estipendios, intérpretes y equipos (sección 10).
- [ ] **Acuerdo de propiedad del código** firmado y explicado en LSP (sección 9).

### Guion corto de entrevistas

**A personas Sordas** (con intérprete y grabación solo si la persona acepta):
1. ¿Cuál es tu primera lengua: LSP, español o ambas? ¿Cómo te sientes leyendo y escribiendo español?
2. ¿Cuál fue la última vez que necesitaste un intérprete y no lo conseguiste? ¿Qué pasó?
3. ¿Has trabajado o querido trabajar en tecnología? ¿Qué te detuvo?
4. Si existiera un programa así (explicarlo), ¿qué tendría que tener para que te inscribas? ¿Qué te haría abandonarlo?
5. ¿Qué te molesta de los proyectos de "tecnología para Sordos" que has visto?
6. ¿Podrías dedicar 20 semanas a esto? ¿Qué necesitarías (dinero, horario, equipo)?

**A intérpretes de LSP:**
1. ¿Cómo consiguen clientes hoy? ¿Cuánto tarda una empresa en conseguirte?
2. ¿Qué te impide atender más pedidos: tiempo, traslado, pagos o falta de solicitudes?
3. ¿Interpretarías por videollamada a pedido? ¿Qué condiciones pedirías?
4. ¿Cómo interpretas los términos técnicos que no tienen seña establecida?
5. ¿Te interesaría participar en el piloto como intérprete del aula?

---

## 3. Perfil y selección de participantes

**Requisitos:**
- Persona Sorda que use la LSP.
- Mayor de 18 años y con disponibilidad de 20 semanas a tiempo parcial (unas 20 horas por semana).
- Manejo básico de computadora (navegador, correo, archivos).
- Ganas de aprender, demostradas en una prueba práctica corta (no se exige saber programar).

**Decisión consciente de alcance: español escrito funcional.**
Para este primer piloto se pide poder leer instrucciones cortas en español. No es lo ideal: la barrera principal de muchas personas Sordas es justamente el español escrito. Se pide porque el desarrollo con agentes depende mucho del texto y el piloto tiene que probar primero que el método funciona. **Una segunda cohorte debe quitar este requisito**, con más contenido en LSP y más apoyo de lectoescritura.

**Selección:**
- Prueba práctica en LSP: resolver un acertijo lógico y seguir un tutorial visual corto.
- Conversación en LSP con el co-líder Sordo.
- Buscar diversidad de género, de región (no solo Lima) y de experiencia.

---

## 4. Equipo

| Rol | Dedicación | Qué hace |
|-----|-----------|----------|
| Líder técnico | Tiempo completo | Diseña el contenido técnico, enseña, revisa el código |
| Co-líder Sordo | Tiempo completo | Co-diseña la pedagogía, enseña en LSP, es el puente con la comunidad, tiene voto en las decisiones |
| 2 intérpretes de LSP | En todas las sesiones en vivo | Trabajan en pareja y se turnan cada 20 a 30 minutos, que es la práctica normal en sesiones largas |
| Mentores de empresas aliadas | 2 horas por semana | Revisión de código, simulacros de entrevista |

---

## 5. Cómo se enseña

### Principios
1. **LSP primero, visual siempre.** Cada concepto se explica en LSP, con un diagrama y con un ejemplo en pantalla. Nada solo en audio. Todo video lleva subtítulos.
2. **Español sencillo en todo lo escrito.** Frases cortas, una idea por frase, listas en vez de párrafos.
3. **Glosario técnico en LSP construido en clase.** Muchos términos (API, base de datos, despliegue) no tienen seña establecida. El grupo, con los intérpretes, acuerda señas y las graba en video. Ese glosario también es uno de los módulos del Puente LSP (sección 7).
4. **Primero a mano, después con el agente.** Cada tema nuevo se hace primero sin IA. Después se repite con el agente y se compara. El agente es tutor antes de ser ayudante.
5. **Las herramientas cambian, los fundamentos no.** Se usa el agente de programación que convenga en ese momento, pero se evalúa la comprensión: leer código, depurar, probar y explicar.
6. **Trabajo en parejas.** Dos personas, una pantalla, roles que rotan.

### Instrucciones para el agente de cada participante

Cada participante tiene un archivo de instrucciones (por ejemplo `CLAUDE.md` en Claude Code) con algo así:

```markdown
# Cómo hablar conmigo
- Soy una persona Sorda. Mi primera lengua es la LSP, no el español.
- Responde en español sencillo: frases cortas, una idea por frase.
- Usa listas numeradas para los pasos.
- No uses palabras técnicas sin explicarlas la primera vez.
- Si te pido explicar código, explica línea por línea.

# Cómo ayudarme a aprender
- Si estoy aprendiendo algo nuevo, NO escribas el código por mí.
  Dame una pista y deja que yo lo intente.
- Cuando escribas código, explica por qué lo hiciste así.
- Antes de cambiar archivos, dime qué vas a cambiar y espera mi "ok".
```

---

## 6. Ruta de 20 semanas

Unas 20 horas por semana: 12 horas en vivo (con intérpretes) y 8 horas de práctica individual.

### Bloque 0: Bases (semanas 1 y 2)
- Configurar el entorno accesible: pantalla, alertas visuales en lugar de sonidos, terminal legible.
- Qué es programar, cómo funciona la web. Terminal básica.
- Git y GitHub: guardar, compartir, revisar.
- Arrancar el glosario técnico en LSP.
- **Entrega:** página personal publicada en internet.

### Bloque 1: Fundamentos de la web (semanas 3 a 8)
- HTML y CSS, con accesibilidad desde el primer día.
- JavaScript: variables, funciones, listas, eventos.
- TypeScript básico.
- React: componentes, estado, formularios.
- Introducción al agente como tutor: pedir explicaciones y pistas.
- **Entrega:** una aplicación pequeña (por ejemplo, el glosario LSP en versión local).

### Bloque 2: Servidor y datos (semanas 9 a 12)
- Next.js: páginas, rutas y API.
- Base de datos Postgres (con Supabase): tablas, relaciones, permisos.
- Inicio de sesión de usuarios.
- Pruebas automáticas: por qué y cómo.
- Trabajo con agente como ayudante: escribir una especificación corta, revisar el diff que propone, pedir cambios y correr las pruebas.
- **Entrega:** aplicación completa con usuarios y datos, desplegada.

### Bloque 3: Construir el Puente LSP (semanas 13 a 20)
- Trabajo en equipo real: tablero de tareas, ciclos de 2 semanas, revisión de código entre parejas.
- Cada pareja es dueña de un módulo (sección 7).
- Semanas 13 y 14: diseño, maqueta y especificación de cada módulo, validados con personas Sordas e intérpretes reales.
- Semanas 15 a 18: construcción, pruebas y revisión.
- Semana 18: **prueba individual sin ayuda** (hipótesis H2).
- Semanas 19 y 20: integración, demo pública en LSP y con voz, y entrevistas con las empresas aliadas.

---

## 7. Puente LSP, Fase 1: quién construye qué

Con 6 a 8 participantes se arman 3 o 4 parejas. La lista de módulos, de más a menos prioritario:

| Módulo | Qué hace | Pareja |
|--------|----------|--------|
| **A. Solicitudes y agenda** | Una empresa pide un intérprete (ya o con fecha), ve la disponibilidad y confirma | Pareja 1 |
| **B. Videollamada con intérprete al instante** | Conecta a la persona Sorda, al oyente y al intérprete. Se construye sobre un servicio de video existente, no desde cero | Pareja 2 |
| **C. Perfiles de intérpretes** | Registro, especialidades (salud, legal, tecnología), disponibilidad, calificaciones | Pareja 3 |
| **D. Panel para empresas** | Historial de servicios, reportes para demostrar cumplimiento de la Ley 29535, pagos | Pareja 3 o 4 |
| **E. Glosario técnico en LSP** | Videos de señas técnicas, buscables. Crece con el trabajo del aula | Pareja 4 o compartido |
| **F. Extra: subtítulos por hablante + "español sencillo"** | Solo si sobra tiempo. Usa servicios de transcripción y un LLM existentes | Opcional |

Antes de la semana 13, cada módulo tiene una "definición de terminado" acordada: qué tiene que funcionar, qué pruebas tiene que pasar y quién lo validó (una persona Sorda o un intérprete de verdad).

---

## 8. Evaluación

### De cada participante (portafolio, no examen)
- Su módulo del Puente LSP funcionando y desplegado.
- Pruebas automáticas que pasan.
- Al menos 5 revisiones de código hechas a compañeros.
- La prueba individual de la semana 18.
- Una presentación en LSP explicando una decisión técnica que tomó.

### Del piloto
- **Retención:** cuántos terminan y por qué se fue quien se fue.
- **Comprensión:** encuesta quincenal en LSP ("¿qué no entendiste esta semana?").
- **Empleabilidad:** entrevistas conseguidas y ofertas recibidas (H3).
- **Producto:** si el Puente LSP Fase 1 se puede usar con usuarios reales.
- **Confianza:** opinión de las asociaciones participantes (H4).

---

## 9. Ética: lo que no se negocia

1. **Se paga a los participantes.** Están construyendo lo que puede ser el producto de una empresa. Reciben un estipendio mensual durante las 20 semanas. Construir gratis la empresa de otro no es inclusión.
2. **Propiedad del código clara desde el día 1.** Antes de empezar se decide y se firma una de estas opciones: (a) el código es de la iniciativa y los participantes reciben estipendio y prioridad de contratación; (b) los participantes tienen participación en el proyecto; (c) el código es abierto. Se explica en LSP y se entrega por escrito.
3. **Los datos de LSP son aparte.** Los videos de señas que puedan servir para el futuro banco de datos (Fase 2) requieren un **consentimiento separado, voluntario y revocable**. Participar en el curso **no depende** de aceptarlo. Quien no acepta, no queda en desventaja. Mezclar enseñanza con recolección de datos sin esta separación es la forma más rápida de perder la confianza de la comunidad.
4. **Nada sobre nosotros sin nosotros.** El co-líder Sordo tiene voto real en el contenido, la selección y el producto.
5. **No prometer de más.** Se comunica que el programa forma desarrolladores junior, no que garantiza empleo.

---

## 10. Costos (por cotizar)

| Partida | Nota |
|---------|------|
| Estipendios de participantes | 6 a 8 personas × 5 meses |
| Intérpretes de LSP | 2 intérpretes × 12 horas en vivo por semana × 20 semanas |
| Líder técnico y co-líder Sordo | 5 a 6 meses |
| Equipos | Laptops en préstamo para quien no tenga, internet |
| Licencias y servicios | Agentes de IA, alojamiento, base de datos, servicio de video |
| Espacio | Si hay sesiones presenciales |
| Imprevistos | 10% |

**Posibles fuentes de financiamiento (por explorar):** empresas aliadas que necesitan cumplir la cuota de la Ley 29973, fondos de cooperación e inclusión, programas de responsabilidad social, fondos de innovación.

---

## 11. Riesgos y decisiones abiertas

| Riesgo | Mitigación |
|--------|-----------|
| Falta de intérpretes disponibles (el mismo problema que queremos resolver) | Contratarlos con anticipación y tener intérpretes suplentes |
| Barrera del español escrito más alta de lo esperado | Más material en video LSP, tutoría de lectoescritura, ritmo flexible |
| Las herramientas de IA cambian a mitad del programa | Enseñar fundamentos, no tener el contenido atado a una sola herramienta |
| Abandono por razones económicas | Estipendio suficiente y pagado a tiempo |
| Las empresas no contratan | Asegurar el compromiso de entrevistas antes de empezar (Semana 0) |
| El Puente LSP queda a medias | Alcance mínimo claro: los módulos A, B y C son obligatorios; el resto, solo si hay tiempo |

**Decisiones que faltan tomar:**
- ¿Presencial, remoto o mixto? (Fuera de Lima, el remoto amplía el acceso.)
- ¿Qué opción de propiedad del código (sección 9)?
- ¿Se propone una alianza al grupo Señas Gramaticales de la PUCP para el glosario y el consentimiento de datos? (Por proponer, no existe aún.)
- ¿Quién es el co-líder Sordo?

---

## Próximo paso

Hacer las entrevistas de la Semana 0. Todo este documento se ajusta según lo que digan las personas Sordas y los intérpretes.

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
- **Detalle:** ver `puente-lsp/docs-alerta-visual-investigacion.md`.
- **Estado:** v1 con subtítulos en vivo, integrada en Puente LSP en `/herramientas/alerta-visual`. Falta probarla con sonidos y voz reales.

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

## D. Portal único (en desarrollo)

Una sola página que reúne todo: las herramientas (Alerta Visual con subtítulos, pedir intérprete LSP), un blog con tips para personas Sordas y sus entornos, y los enlaces a las redes de la comunidad. Cada herramienta nueva se suma ahí.

- **Por qué:**
  - una sola marca y un solo enlace para compartir;
  - el blog atrae visitas desde Google (SEO) y lleva a las herramientas;
  - las redes devuelven gente a la página.
- **Diseño:**
  - impecable, fácil de leer y sin mareos;
  - letra grande, buen contraste y poco movimiento;
  - textos que den curiosidad por seguir leyendo.

## E. Videos para TikTok, YouTube Shorts, Reels y Facebook con ayuda de IA

Contenido corto en redes para la comunidad Sorda y para oyentes que quieren aprender a incluir. Claude ayuda a automatizar cada fase. Las partes que requieren una cuenta o un paso manual las hace el usuario, que trabaja como ingeniero de IA.

### Regla de oro: la IA produce, no firma

La investigación muestra que la comunidad Sorda rechaza los **avatares de IA que hacen señas**:
- en China (Juegos Olímpicos de Invierno), información perdida o distorsionada, gestos rígidos y expresiones faciales mal hechas;
- la Asociación de Sordos de Austria calificó a su avatar "Iris" de "solución a medias";
- la federación alemana desaconseja usarlos por ahora.

Si publicamos videos con señas falsas hechas por IA, perdemos credibilidad desde el primer día. Por eso:
- **Las señas en LSP las hacen personas Sordas o intérpretes reales**, idealmente pagados o como colaboradores.
- **La IA se usa para la producción:** guion, edición, subtítulos grandes y bien sincronizados, animaciones y gráficos, portadas, versiones para cada red y calendario de publicación.
- **Los videos se entienden sin sonido:** visual primero, subtítulos siempre, nada que dependa solo del audio.

### Herramientas encontradas (por verificar antes de usar)

| Fase | Herramienta | Notas |
|------|-------------|-------|
| Guion e ideas | Claude | Adaptar artículos del blog en guiones de 30 a 60 s |
| Animaciones y gráficos | **Remotion + sus skills oficiales para Claude Code** (`npx skills add remotion-dev/skills`) | Videos hechos con código React. Ideal para tips con texto animado, datos y explicaciones. No sirve para edición general |
| Edición, subtítulos, formatos vertical/Shorts | **mcp-video** (servidor MCP) | Subtítulos, cortes, versiones para Shorts, Reels y TikTok, transcripción y voz local |
| Voz (solo para el público oyente) | ElevenLabs MCP (comunidad) | Nunca reemplaza los subtítulos |
| Presentador o avatar hablando | HeyGen MCP (oficial, remoto) | Solo para videos dirigidos a oyentes. Nunca para señas |
| Clips cinematográficos | Veo (vía servidores MCP de terceros) | Para planos de apoyo (B-roll) |
| Publicar en redes | ViralSpin MCP u APIs oficiales de TikTok, YouTube y Meta | Revisar reglas de publicación automática de cada red |

### Fases a automatizar

1. **Idea → guion:** desde un artículo del blog o una pregunta frecuente de la comunidad.
2. **Grabación de señas:** manual, con la persona Sorda o intérprete.
3. **Montaje:** Remotion para gráficos, subtítulos quemados y formato 9:16.
4. **Versiones:** una por red, con su portada.
5. **Publicación programada** y enlace de vuelta al portal.
6. **Métricas:** qué temas funcionan, para decidir los próximos videos.

### Fuentes
- [Remotion + Claude Code (Timewell)](https://timewell.jp/en/columns/remotion-claude-code-programmatic-video)
- [Remotion Agent Skills (mer.vin)](https://mer.vin/2026/05/remotion-agent-skills-install-remotion-dev-skills-for-claude-code-and-cursor/)
- [Mejores skills de Claude Code 2026 (Tella)](https://www.tella.com/blog/best-claude-code-skills.md)
- [mcp-video](https://mcpservers.org/es/servers/kyanitelabs/mcp-video)
- [ViralSpin MCP](https://glama.ai/mcp/servers/b5wwludhhg)
- [HeyGen Remote MCP](https://docs.heygen.com/docs/heygen-remote-mcp-server)
- [ElevenLabs MCP](https://playbooks.com/mcp/mamertofabian-elevenlabs)
- [Avatares de señas en China (Sixth Tone)](https://www.sixthtone.com/news/1017316)
- [Avatar "Iris" en Viena (Vienna.at)](https://www.vienna.at/poor-translation-sign-language-avatar-iris-not-well-received-by-those-affected/9174037)
- [Avatares en Alemania (CNLSE)](https://cnlse.es/es/recursos/biblioteca/sign-language-avatars-the-german-gold-rush-to-undercut-flesh-and-blood-interpreters)

## Relacionado

- `hoja-de-ruta-puente-lsp.md`: plataforma de intérpretes LSP (Fase 0 publicada en https://puente-lsp.vercel.app).
- `piloto-cohorte-lsp.md`: cohorte de desarrolladores Sordos.

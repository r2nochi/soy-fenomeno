# Progreso: 5 herramientas nuevas (pedido del 22/10/2026)

Pedido: construir en el portal actual (1) Sello + QR para negocios, (2) Modo conversación
cara a cara, (3) Tarjeta de emergencia sin internet, (4) Carta para pedir intérprete con la
ley, (5) Mapa colaborativo de lugares accesibles. Con subagentes y revisión final (judge).

Reglas: costo cero, sin avatares IA, sin inventar datos ni leyes, no borrar datos de
Supabase, no reiniciar el dev server, no hacer scraping prohibido.

## Plan

| # | Herramienta | Ruta | Agente | Estado |
|---|---|---|---|---|
| 2 | Conversación cara a cara | /herramientas/conversacion | A | listo (sin probar en navegador) |
| 3 | Tarjeta de emergencia | /herramientas/tarjeta | C | listo (sin probar en navegador) |
| 4 | Carta para pedir intérprete | /herramientas/carta | D | listo (judge propio aplicado; sin probar en navegador) |
| 1 | Sello + QR para negocios | /sello, /sello/[id] | B | listo (sin probar en navegador) |
| 5 | Lugares accesibles (mapa) | /lugares | B | listo (sin probar en navegador) |
| - | Integración: nav, portada, sitemap, asistente | — | yo | hecho |
| - | Revisión judge (2 pasadas) + build + deploy | — | yo | hecho |

## Notas
- Supabase del proyecto: ref bmcmhcjxehcynjwotroz (MCP plugin supabase).
- Integración hecha: src/lib/herramientas.ts, src/components/ListaHerramientas.tsx, /herramientas (índice),
  nav (Herramientas, Lugares), sitemap, portada (sección "Para el día a día", tarjeta empresas → /sello),
  asistente (temas conversacion, tarjeta, carta, lugares, sello + pruebas).
- Pendiente revisar: tarjeta dice SAMU 106 sin aclarar que no es nacional; sw.js intercepta todo /_next/static (network-first, sin escribir caché).
- Pendiente revisar: carta cita Ley 29535 art.4 (texto 2010) y Ley 29973 art.21 (mod. Ley 31707); confirmar estado de la reforma 29535 contra el artículo del blog.
- Build OK (31 rutas). Judge final lanzado. Smoke test en next start -p 3100.

## Revisión judge final (22/10) — 2 HIGH, 9 MEDIUM, 7 LOW
Correcciones en curso (agentes F1 lugares/sello, F2 tarjeta/sw, F3 conversación/carta; yo: asistente + /privacidad):
- HIGH sello sin retirar (agregar oculto + notFound; frases propias solo tras aprobar) — F1
- HIGH frases del rubro al revés (deben ser del cliente) — F1
- MED rate limit, consentimiento Ley 29733 + /privacidad, etiquetas "según el negocio", aviso siempre visible — F1/yo
- MED sw.js robusto / sw aparte con scope; precache sin performance entries — F2
- MED mic dice "escuchando" tras error fatal; nota Edge — F3
- LOW carta cierre "otra", aviso de borrador, emoji aria-hidden — F3/F2
- LOW asistente: voz, lugar, hospital, reclamo, tarjeta de crédito — yo
- Yo: asistente corregido (+pruebas), /privacidad creada y enlazada (pie, SolicitudForm). Texto de privacidad: revisar por el responsable.
- F2 (tarjeta/sw) y F3 (conversación/carta) listos. Falta F1 (sello/lugares).
- F1 listo (migración 0003 aplicada). Build OK (32 rutas), 55 pruebas pasan. Segunda revisión judge en curso. Luego: commit + push.
- Segunda revisión: corregido el asistente (emergencias reales nunca van a la tarjeta), límite de envíos atómico,
  carta con fecha del texto citado, privacidad con ANPD. Permiso de frases_validas para service_role: verificado (true).

## Queda para el responsable (no lo puede hacer el código)
- /privacidad: poner nombre y dirección del responsable del banco de datos e inscribirlo en la ANPD.
- Carta: confirmar si se promulgó la reforma de la Ley 29535 y actualizar la cita del art. 4.
- Moderación: aprobar (aprobado=true) o retirar (oculto=true) lugares y reportes en Supabase.
- Probar en un celular real: micrófono, tarjeta sin internet, impresión del afiche.

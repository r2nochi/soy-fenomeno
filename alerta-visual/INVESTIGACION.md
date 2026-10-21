# Alerta Visual: qué existe y qué podemos mejorar

Investigación del 21/10/2026.

## Lo que ya existe

| Herramienta | Dónde funciona | Qué hace | Límites |
|---|---|---|---|
| **Sound Notifications (Google)** | Pixel y "otros Android seleccionados" | Detecta alarmas de humo, sirenas, bebé, perro, golpes, timbre, pitidos de electrodomésticos, teléfono fijo y agua corriendo. Avisa con notificación, flash o vibración. Funciona sin internet, tiene una línea de tiempo y permite grabar sonidos propios. | Solo avisa en ese mismo celular. Recomiendan dejarlo en medio de la habitación. Gasta batería. No encontré reconocimiento de nombre. |
| **Sound Recognition (iPhone)** | iOS 14 o superior | Alarmas, timbre, golpes, bebé, agua y sonidos propios. **Reconocimiento de nombre desde iOS 26.** | Desactiva "Oye Siri". El aviso de nombre no puede activar Atajos, así que no se puede reenviar a otro aparato. Gasta batería. |
| **ALRM** | Solo iPhone | Usa YAMNet (521 tipos de sonido) para alarmas de incendio, humo, sirenas, disparos y pitido de batería baja. Avisa con flash, LED y vibración. | Solo iPhone. No encontré reseñas sobre su precisión. |
| **Windows 11** | PC | "Parpadear la pantalla con las notificaciones de audio". | Solo reacciona a los sonidos del propio sistema. **No escucha el ambiente.** |
| **Bellman y otros sistemas físicos** | Aparatos aparte | Detectores de timbre y alarma con luces y vibradores. | Caros y difíciles de conseguir en Perú. |
| **Prototipos latinoamericanos** | Ecuador (USFQ, Universidad Indoamérica 2026), Colombia, México | Sonido convertido en vibración, timbres para personas sordociegas. | Son académicos y no están disponibles para descargar. |

Las organizaciones de personas sordas, como la NDCS del Reino Unido, coinciden en algo: **estas apps no deben ser el único aviso en una emergencia.**

## Los huecos que encontramos

1. **No hay nada para la computadora.** No encontré ninguna app que escuche el ambiente en Windows, Mac o Chromebook. Muchas personas Sordas trabajan en la PC con el celular lejos.
2. **El aviso se queda en el aparato que escucha.** Si el celular está en la cocina y tú en otro cuarto, te enteras recién cuando lo miras. Nadie reenvía el aviso a tu PC, a otro celular, a un familiar o a un foco inteligente. Usuarios de Ring y Wyze lo piden en los foros sin respuesta.
3. **El reconocimiento de nombre llegó tarde y solo a iPhone.** Lo trae iOS 26, cuando la mayoría de los celulares en Perú son Android de gama media o baja.
4. **Sonidos locales.** Los sonidos de casa en Perú no están en las listas, por ejemplo la campana del camión de basura o el portero eléctrico.

## Qué haremos distinto

1. **Funciona en la computadora**, abriendo una página web, sin instalar nada.
2. **"Oído de la casa".** Un celular viejo se queda en la puerta o la cocina escuchando, y el aviso llega a tu PC y a tu celular. Se emparejan con un código QR, sin cuenta.
3. **Avisos que se entienden sin leer:** ícono grande, color y parpadeo.
4. **Historial de avisos**, por si no estabas mirando.
5. **Más adelante:** que avise si alguien dice tu nombre en español, y que aprenda sonidos propios con 5 grabaciones.
6. **Honestidad:** la app dice claramente que no reemplaza una alarma de incendio con luz.

## Plan

- **v1:** web para PC y Android. Escucha con el micrófono, YAMNet corre en el navegador, aviso a pantalla completa, vibración e historial.
- **v2:** "Oído de la casa", emparejando dos aparatos con un código QR.
- **v3:** reconocimiento de tu nombre y sonidos propios.

## Fuentes

- [Hearing accessibility on iOS (Swappie)](https://swappie.com/en/blog/hearing-accessibility-ios-iphone/)
- [Alerting systems (NDCS)](https://www.ndcs.org.uk/information-and-support/assistive-technology/technology-products/alerting-devices)
- [Sound Notifications de Google (Xataka)](https://www.xataka.com.mx/aplicaciones/notificaciones-para-cuando-llora-bebe-suenan-alarmas-asi-como-google-quiere-ayudar-a-personas-problemas-auditivos)
- [Sound Notifications (ChannelNews)](https://www.channelnews.com.au/androids-sound-notification-feature-knows-when-your-baby-cries-or-dog-barks/)
- [Name Recognition en iOS 26 (NewsBytes)](https://www.newsbytesapp.com/news/science/how-to-set-up-name-recognition-on-ios-26/story)
- [Pedido de Atajos para Name Recognition (Apple Developer Forums)](https://developer.apple.com/forums/thread/801503)
- [Sound Recognition en iOS 18 (AbilityNet)](https://mcmw.abilitynet.org.uk/how-to-detect-sounds-using-your-iphone-or-ipad-with-ios-18)
- [ALRM (App Store)](https://apps.apple.com/app/alrm/id6739757486)
- [Alternativas visuales a los sonidos en Windows (Microsoft)](https://support.microsoft.com/en-US/accessibility/windows/use-text-or-visual-alternative-to-sounds)
- [Pedido de luces que parpadeen (Ring Community)](https://community.ring.com/t/flashing-or-strobing-light-system-for-hearing-impaired/7715)
- [Pedido de funciones para sordos (Wyze Forums)](https://forums.wyze.com/t/add-special-features-for-deaf-hearing-impaired/173287)
- [Tecnología en Ecuador (Primicias)](https://www.primicias.ec/ciencia-tecnologia/tecnologia-ecuador-sonidos-vibraciones-sordos-inteligencia-artificial-135021/)
- [Transfer learning con YAMNet (TensorFlow Blog)](https://blog.tensorflow.org/2021/03/transfer-learning-for-audio-data-with-yamnet.html)

# FREX Club

Caso profesional de un producto de fidelización multiempresa que integra plataforma Laravel, panel administrativo, API y aplicación Flutter.

## Problema y decisiones

El negocio compra la plataforma para operar su programa de fidelización; sus clientes utilizan la billetera para identificarse y consultar beneficios. Esa diferencia de responsabilidades guía el panel web, la API y la app.

- **Identidad global y membresías independientes.** Una persona puede tener tarjetas de distintos comercios. Cada membresía mantiene el saldo, las reglas y las recompensas de su empresa; no se presenta como una bolsa compartida de puntos.
- **Historial de puntos sin sobrescritura.** Acumular y canjear generan movimientos; corregir requiere un ajuste o reverso. Así se conserva el origen de un saldo y el motivo de una corrección.
- **Operación asistida por personal.** El cliente muestra su tarjeta y solicita un beneficio; el equipo del negocio registra compras y confirma canjes. El MVP mantiene manuales la operación en caja y la activación de suscripciones.
- **Evolución de alcance documentada.** El alcance inicial de «Puntos SaaS» contemplaba tarjetas, puntos, catálogo y reportes básicos. Las notas posteriores incorporan promociones generales y de cumpleaños; las reuniones de seguimiento detallan cambios visuales y nuevas consultas de actividad.

## Autoría y periodo

- Darinel Escobar: desarrollador full stack freelance y único integrante del equipo.
- Responsabilidad integral: planificación, requerimientos, arquitectura, desarrollo y documentación.
- Desarrollo: 10 de junio a 10 de septiembre de 2026, tres meses según confirmación del autor.
- Las capturas del portafolio se prepararon el 30 de octubre de 2026. Representan una revisión posterior del producto; no prueban una fecha de publicación en tiendas.
- El video conceptual se produjo el 16 de octubre de 2026 y se incorporó al caso el 31 de octubre. No se presenta como parte de una campaña comercial aprobada.

## Fuentes y contenido

- Flutter: rama `codex/frex-handoff-point-c`, revisión `3600e6d`.
- Laravel: rama `main` del repositorio de la plataforma FREX, revisión `c55a206`.
- Las capacidades descritas se contrastaron con los manifiestos, contratos y documentación de entrega de ambos repositorios.
- El caso integra billetera de tarjetas, acceso por enlace, QR, puntos, recompensas, promociones, gestión de clientes, reglas y reportes.
- No se atribuyen métricas comerciales ni validación nativa de iOS.
- Se contrastaron las decisiones con «Project Scope - Puntos SaaS» (5 de febrero de 2026), su versión de cliente (6 de febrero), las notas de promociones de julio y el seguimiento de la reunión del 12 de octubre. Las fechas y objetivos de esos documentos son antecedentes de planificación, no prueba de una publicación ni de cumplimiento de un calendario.

El contenido inglés vive en [experience.json](../data/experience.json); su traducción española, en [experience.ts](../src/content/portfolio/experience.ts). El nombre estable es `FREX Club`. Se presenta como primera experiencia destacada, seguida de EZTICKET y AMIFIT Cobro.

## Galería

La selección principal combina nueve imágenes y un video. Las imágenes de [FREX](../src/assets/images/FREX/) muestran las interfaces reales; la portada combina capturas del panel y de la billetera. Los archivos públicos se optimizan en WebP y las capturas móviles excluyen las barras del sistema Android. El QR público está protegido.

| Archivo | Escena |
| --- | --- |
| `cover.webp` | Portada web y móvil |
| `frex-club-fidelizacion.mp4` | Video promocional conceptual «Fidelización a tu manera» |
| `mobile-home.webp` | Tarjetas y promociones |
| `mobile-qr.webp` | Presentación del QR con código protegido |
| `admin-points.webp` | Compra de $950 MXN y cálculo de 95 puntos |
| `mobile-card.webp` | Consulta del saldo de 566 puntos y movimientos |
| `mobile-rewards.webp` | Recompensas y progreso |
| `admin-promotions.webp` | Configuración de promociones del negocio |
| `mobile-promotion-detail.webp` | Beneficio y condiciones |
| `admin-summary.webp` | Resumen del negocio |

Las capturas de alta de cliente, ficha y listado de promociones se conservan como material complementario. La selección principal alterna la operación web y la consulta móvil para explicar su conexión.

### Video seleccionado

[Ver el MP4](../public/videos/frex-club-fidelizacion.mp4): variante F16 V4.2, «Fidelización a tu manera», 41.55 segundos, 1920×1080 a 60 fps, H.264/AAC. Se eligió por su variedad de giros y por explicar con claridad que cada negocio configura un programa independiente.

Es una pieza conceptual de comunicación para compradores empresariales, con comercios y operaciones ficticios. Utiliza ilustraciones e interfaces diseñadas para el video. Las capturas de la aplicación aportan por separado la evidencia de la interfaz real.

La reproducción se inicia con los controles nativos del navegador, sin autoplay. Incluye una portada y [subtítulos en español](../public/videos/frex-club-fidelizacion.es.vtt) e [inglés](../public/videos/frex-club-fidelizacion.en.vtt), basados en el guion y los tiempos de la locución del proyecto original. El MP4 se conserva sin recodificación.

## Datos demostrativos

Las capturas utilizan la empresa y el cliente de prueba autorizados. Se prepararon nombres profesionales, contactos ficticios, compras, saldos y promociones coherentes. Los importes, cantidades y tasas visibles son datos de demostración; no son indicadores de adopción, ventas ni impacto real del producto.

Se utilizaron registros de prueba autorizados. Los datos sensibles se excluyeron o protegieron; la preparación operativa y sus respaldos se conservan fuera del caso público. La captura del saldo no se presenta como prueba visual completa de la transacción de 95 puntos, porque ese movimiento no aparece entre sus primeras filas.

Los tokens, contraseñas, perfiles de conexión y respaldos de la base no forman parte de este repositorio.

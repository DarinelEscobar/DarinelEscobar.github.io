# FREX Club

Caso profesional de un producto de fidelización multiempresa que integra plataforma Laravel, panel administrativo, API y aplicación Flutter.

## Autoría y periodo

- Darinel Escobar: desarrollador full stack freelance y único integrante del equipo.
- Responsabilidad integral: planificación, requerimientos, arquitectura, desarrollo y documentación.
- Desarrollo: 10 de junio a 10 de septiembre de 2026, tres meses según confirmación del autor.
- Las capturas del portafolio se prepararon el 30 de octubre de 2026. Representan una revisión posterior del producto; no prueban una fecha de publicación en tiendas.

## Fuentes y contenido

- Flutter: rama `codex/frex-handoff-point-c`, revisión `3600e6d`.
- Laravel: rama `main` del repositorio de la plataforma FREX, revisión `c55a206`.
- Las capacidades descritas se contrastaron con los manifiestos, contratos y documentación de entrega de ambos repositorios.
- El caso integra billetera de tarjetas, acceso por enlace, QR, puntos, recompensas, promociones, gestión de clientes, reglas y reportes.
- No se atribuyen métricas comerciales ni validación nativa de iOS.

El contenido inglés vive en [experience.json](../data/experience.json); su traducción española, en [experience.ts](../src/content/portfolio/experience.ts). El nombre estable es `FREX Club`. Se presenta como primera experiencia destacada, seguida de EZTICKET y AMIFIT Cobro.

## Galería

Las imágenes de [FREX](../src/assets/images/FREX/) son capturas de las interfaces reales. La portada combina capturas del panel y de la billetera. Los originales se conservan fuera del repositorio; las imágenes públicas se optimizan en WebP y las móviles excluyen las barras del sistema Android. El QR de la captura pública se protege con una etiqueta superpuesta.

| Archivo | Escena |
| --- | --- |
| `cover.webp` | Portada web y móvil |
| `mobile-home.webp` | Tarjetas y promociones |
| `mobile-card.webp` | Saldo y movimientos |
| `mobile-qr.webp` | Presentación del QR con código protegido |
| `mobile-rewards.webp` | Recompensas y progreso |
| `mobile-promotions.webp` | Exploración de promociones |
| `mobile-promotion-detail.webp` | Beneficio y condiciones |
| `admin-summary.webp` | Resumen del negocio |
| `admin-client-registration.webp` | Formulario de alta con datos ficticios, sin envío |
| `admin-client-detail.webp` | Ficha del cliente |
| `admin-points.webp` | Registro de compra y puntos |
| `admin-promotions.webp` | Administración de promociones |

## Datos demostrativos

Las capturas utilizan la empresa y el cliente de prueba autorizados. Se prepararon nombres profesionales, contactos ficticios, compras, saldos y promociones coherentes. Los importes, cantidades y tasas visibles son datos de demostración; no son indicadores de adopción, ventas ni impacto real del producto.

Las modificaciones de datos de prueba cuentan con respaldo privado y registro de inserciones fuera del portafolio. Se conserva el historial anterior y se verifica la correspondencia del saldo con el ledger. La tarjeta ajena al caso se separa del cliente de demostración conservando su historial. Una promoción compartida con contenido de prueba se oculta temporalmente durante las capturas y se restaura después; los logos y la identidad de otras empresas se conservan.

Los tokens, contraseñas, perfiles de conexión y respaldos de la base no forman parte de este repositorio.

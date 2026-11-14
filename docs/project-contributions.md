# Contribuciones verificadas para el portafolio

Revisión: 2026-10-30. Alcance: portafolio; sin cambios al CV ni despliegue.

## Criterio de atribución

Identidades confirmadas: Darinel Escobar (variantes de mayúsculas), Darinel EG; correos darinel.escobar@outlook.com y cescobar@grupocybac.com. FitLog también registra DarinelGuillen y el noreply de DarinelEscobar. Se excluyen merges y snapshots de stash. Las fechas delimitan commits propios observados en HEAD; no prueban fechas contractuales, fin de colaboración ni lanzamiento. Las fichas describen participación en sistemas existentes sin atribuir métricas económicas, porcentajes de mejora ni autoría completa del producto.

## EcoBrush — POS & CEDIS

- Fuente: `C:/laragon/www/pos-eco`.
- Período documentado: 2026-05-05 — 2026-09-16.

- 2026-09-16 · `0a4a0e3` · feat(1.12): integrar catalogo maestro CEDIS con pedidos y altas POS
- 2026-09-01 · `a9b6f13` · chore: migrate POS domains to ecobrush.mx
- 2026-08-24 · `ac5a555` · chore: Update .gitignore
- 2026-08-21 · `9f38c7c` · feat: Improve price calculation for added items in checkout by ensuring numeric validation
- 2026-08-18 · `9d25442` · chore: ignore local MCP tooling artifacts

## Resident Check

- Fuente: `C:/laragon/www/residentcheckweb`.
- Período documentado: 2026-02-16 — 2026-07-20.

- 2026-07-20 · `4f3136b` · fix: keep invited passwords in sync
- 2026-06-01 · `c82e434` · feat: enhance password recovery email with reset URL and token expiration update
- 2026-06-01 · `42f282d` · feat: implement password recovery functionality with email token
- 2026-04-10 · `d2e7bf5` · Fix iOS QR and report downloads
- 2026-04-08 · `f4e45cc` · feat: support account report download and refresh viewfeat: support account report download and refresh view

## IMCHISSA

- Fuente: `C:/laragon/www/web-imchissa-v1`.
- Período documentado: 2025-11-18 — 2026-04-20.

- 2026-04-20 · `1efcde4` · refactor: Clean up Login component and update seeders with new user data
- 2026-04-20 · `2c0294d` · feat: Fix migrations and seeders order/schema
- 2026-04-17 · `e883bd9` · feat: add file field support and validation to SiteSettingsService
- 2026-04-17 · `5845434` · refactor: store uploaded files to public path directly
- 2026-04-17 · `d31d092` · fix(cms): enable ramps links and relative public urls

## TuxVentas

- Fuente: `C:/laragon/www/web-tuxventa-v1`.
- Período documentado: 2026-01-09 — 2026-07-17.

- 2026-07-17 · `a403563` · feat: Add branding images and update styles across components for consistent theming
- 2026-06-16 · `ec82df8` · feat: Revamp registration form with improved layout, error handling, and user guidance
- 2026-06-11 · `daeda95` · feat: Implement image lightbox functionality in marketplace
- 2026-06-08 · `d288422` · feat: Enhance NotificationBell component with notification reload and error handling in MessageObserver
- 2026-06-08 · `93c9c4d` · feat: Enhance NotificationBell component with improved notification handling and UI updates

## Voldo

- Fuente: `C:/laragon/www/web-voldo-v1`.
- Período documentado: 2025-12-19 — 2026-07-16.

- 2026-07-16 · `925d00a` · Añadir gestión de imágenes de venta y ajustes en la configuración de pedidos
- 2026-01-08 · `59462d0` · refactor modalValidarVenta layout for improved responsiveness and clarity
- 2025-12-22 · `2b10f97` · Add document management functionality to SalesOrder component
- 2025-12-22 · `b989758` · Enhance document link styling in client edit form
- 2025-12-22 · `45ae19c` · Add document management features to client edit form

## Finance App (Nivo)

- Fuente: `C:/Users/Cybac/Documents/New_folder/finance-app`.
- Período documentado: 2026-04-22 — 2026-10-11.

- 2026-10-11 · `a04d934` · chore(release): bump version to 1.0.6+11
- 2026-10-11 · `ef9eb9d` · feat(finance): integrate cash tracking, selective imports, spending allowance and appearance
- 2026-10-11 · `947e0f3` · style: restore floating navigation surface
- 2026-10-11 · `6ecd357` · Polish finance icons and floating navigation
- 2026-10-09 · `b3abb60` · style: polish add transaction button

## FitLog

- Fuente: `C:/Users/Cybac/Documents/New_folder/fit_log`.
- Período documentado: 2025-04-21 — 2026-10-25.

- 2026-10-25 · `145d16d` · feat(check-in): refine physique and discomfort capture
- 2026-10-19 · `5cff3fb` · feat(check-in): capture physique observations and apply explicit routine updates
- 2026-10-15 · `ce3f494` · chore: add  .gitignore
- 2026-10-08 · `d42fe5a` · style: make add routine button circular
- 2026-10-04 · `0b240bd` · docs(release): record v1.1.9 signing mismatch

## Evidencia de implementación contrastada

- EcoBrush POS: `0a4a0e3` modifica catálogo, checkout y productos; CEDIS: `d128907`, `073bab5`, `63a03a0` cubren catálogo, SKU y abastecimiento. Documentación existente: `docs/project-overview.md`, `docs/modules.md` y `docs/integration/pos.md`. No se atribuyen CRM ni sitio corporativo sin autoría propia comprobada.
- Resident Check: `04fe46f` agrega constructor y vista previa de estados de cuenta; `d2e7bf5` corrige descargas iOS; `42f282d` y `4f3136b` cubren recuperación y contraseñas de invitados.
- IMCHISSA: `441ba07`, `1119714`, `72168e3`, `cf81820` vinculan CMS, vistas públicas y catálogo.
- TuxVentas: `bda1b98` agrega 23 archivos de migraciones/seeders para usuarios, roles, categorías, anuncios, conversaciones y reseñas; `d2d2920` implementa aceptación/cierre de conversaciones en `ConversationController` y rutas API; `433923c` agrega reseñas, alertas e índices de base de datos. `c7fc908` es una contribución de interfaz para QR (`resources/js/marketplace/listing-qr.js`), no una prueba de autoría backend; las especificaciones `specs/ERD.md` y marketplace aportan contexto, no atribución individual por sí mismas. La traducción huérfana se reemplazó por alcance propio y se conectó al catálogo activo.
- Voldo: `6dd716f` agrega migración, modelo y controlador de documentos de clientes; `2b10f97` y `925d00a` cubren documentos e imágenes de ventas. Participación puntual.
- Aplicaciones personales: capacidades contrastadas con README, pubspec y commits propios; se presentan fuera de experiencia profesional.

## Capturas y reproducción

Las galerías combinan capturas WebP y diagramas SVG localizados en español e inglés. Algunas capturas usan datos ficticios o se modificaron temporalmente en el navegador para ilustrar información; esas imágenes están identificadas en sus descripciones. No demuestran que se haya guardado un archivo, concretado una cotización o ejecutado una transacción.

| Ficha / carpeta de imágenes | Procedencia y vistas |
| --- | --- |
| EcoBrush | Catálogo y cotización locales: precios, etiquetas de archivos y renglón/totales de cotización añadidos temporalmente al DOM como ejemplos; no son documentos reales. El carrito POS se llenó mediante la interfaz local con un artículo y precio de muestra. CEDIS se respalda con commits y documentación. |
| ResidentCheck | [Sitio público oficial](https://residentcheck.com.mx/), estado de cuenta local y diagrama explicativo de las aportaciones. Residencial, vivienda, cuota de $1,500, abono aplicado de $1,000 y saldo pendiente de $500 son ficticios; la aplicación del pago se registró en la base demo. El diagrama no es una captura de pantalla. |
| IMCHISSA | Capturas públicas de [inicio](https://imchissa.com/) y [rampas](https://imchissa.com/rampas), un diagrama conceptual CMS-sitio basado en la implementación y una captura del editor CMS local con cuenta administradora ficticia. Desarrollo en equipo; el diagrama no es una captura del CMS. |
| TuxVentas | Catálogo y detalle locales con anuncios ficticios. En el catálogo se editaron títulos, descripciones y ubicación, y se ocultaron tarjetas; en el detalle se modificó temporalmente la descripción y se ocultaron miniaturas sin imagen; las preguntas y respuestas de ejemplo se insertaron en el DOM y se ocultaron dos miniaturas sin imagen. El diagrama es una simplificación de entidades documentadas; no muestra pagos integrados ni todo el esquema. |
| Voldo | Clientes, documento y cotización locales con datos ficticios. El nombre y el indicador del PDF, el estado de disponibilidad, el registro del equipo y el resumen de precio e IVA se añadieron o modificaron temporalmente en el DOM: no se subió un archivo ni se completó una venta. |
| Finance-App | La portada reutiliza docs/screenshots/home.png (referencia 5e57add, 2026-10-04). Movimientos y reportes se recapturaron en un emulador Android de solo lectura con el conjunto público de datos de muestra, sin importar el paquete privado. La captura de reportes muestra noviembre de 2026. |
| FitLog | Se reutilizaron capturas Android con fixture ficticia main_demo.dart documentadas en el README: docs/images/screens/routines-library.png, active-workout-session.png y performance-dashboard.png. Referencia: 2c6565f (2026-10-04). No se presentan como capturas nuevas. |

Las capturas web nuevas se tomaron localmente durante las revisiones. Las versiones PNG quedan en la carpeta temporal portfolio-contributions/captures del usuario; las versiones WebP están en src/assets/images, dentro de la carpeta indicada por ficha. Los diagramas SVG también se encuentran en esas carpetas. Las descripciones se guardan en el catálogo inglés y en su traducción española, en el mismo orden.

### Dominios

- EcoBrush: https://pos.tuxtla.ecobrush.mx/ confirmado mediante el commit propio a9b6f13 y la pantalla pública de acceso, coincidente con el POS local. Los hosts CEDIS y matriz también aparecen en ese cambio; no se probaron accesos privados.
- Resident Check: https://residentcheck.com.mx/ confirmado por sitio público y marca del producto.
- IMCHISSA: https://imchissa.com/ confirmado por sitio público y secciones del proyecto.
- Voldo: https://sistemavoldo.com/ confirmado por pantalla pública de Grupo Voldo y recursos de marca coincidentes con el repositorio. El sitio corporativo es https://grupovoldo.com/; no se atribuye su desarrollo en esta ficha.
- TuxVentas: no se confirmó un dominio oficial; se omite el enlace de despliegue.
- Los enlaces de repositorios personales se contrastaron con origin, retirando cualquier información de autenticación. No se publican enlaces de repositorios profesionales privados.

### Reproducción local

1. Usar las dependencias de cada aplicación y preparar MySQL independiente, enlazado exclusivamente a 127.0.0.1:3317, con datos dentro de la carpeta temporal portfolio-contributions/mysql. En esta ejecución se inicializó una instancia nueva; no se importaron respaldos ni se reemplazaron bases del usuario. Crear únicamente las bases portfolio_demo_pos, portfolio_demo_tux, portfolio_demo_voldo, portfolio_demo_resident y portfolio_demo_resident_unit. La base portfolio_demo_cedis quedó reservada y vacía.
2. Inyectar configuración por proceso: DB_CONNECTION=mysql, DB_HOST=127.0.0.1, DB_PORT=3317 y DB_DATABASE de demostración; usar credenciales locales de esta instancia. Definir APP_KEY de demostración válida, APP_ENV=local, MAIL_MAILER=log, CACHE_DRIVER=array, SESSION_DRIVER=file, SESSION_DOMAIN=null y una SESSION_COOKIE distinta por aplicación. Apuntar APP_CONFIG_CACHE y APP_ROUTES_CACHE a archivos inexistentes dentro del directorio temporal para evitar configuración cacheada de otros entornos. No iniciar workers, scheduler ni cobros.
3. POS: ejecutar primero la migración existente tests/Support/Database/migrations y después database/migrations. El documento docs/testing/coverage-remediation/pos-schema-reconciliation.md explica los prerrequisitos históricos. Solo en la base demo se añadieron settings.mantenimiento y distributor_types.proterm con valor cero, products.ide nullable y proveedor de ejemplo con supplier_id por defecto; después se ejecutaron los seeders existentes. Son ajustes para una demostración del esquema histórico, no migraciones de producción. Sustituir usuarios y clientes por nombres Demo y correos example.test antes de abrir el navegador. No se alteraron archivos de migración del proyecto.
4. TuxVentas: ejecutar migrate y db:seed en portfolio_demo_tux. El seeder existente incluye fixtures de anuncios, conversaciones y alertas, y desactiva correo mediante Mail::fake. Los recursos de imágenes se sirven por las rutas reales listing-images; el enlace storage preexistente apunta a otra copia y no se sustituyó. Se corrigió la coherencia visual de dos anuncios de la fixture únicamente en la base demo.
5. Voldo: ejecutar migrate y db:seed en portfolio_demo_voldo. Antes de capturar, anonimizar people, users y clients: nombres Cliente Demo, correos example.test, dirección Avenida Ejemplo 100, teléfono ficticio y RFC genérico XAXX010101000. Cambiar las contraseñas de esas cuentas demo por hashes nuevos locales. Los logotipos faltantes se descargaron de las rutas públicas storage/Login/img_soft_voldo-white.png e img_soft_voldo-black.png del dominio confirmado sistemavoldo.com y se colocaron en public/storage/Login de la copia local. Las imágenes ilustran módulos existentes; no acreditan la autoría de toda su interfaz.
6. Resident Check: se usó la copia residentcheckweb-alta-asistida, que conserva dependencias locales. Migrar la base central nueva. El DatabaseSeeder completo se detiene porque UsersSeeder requiere el rol guardia que RolesSeeder no crea; por ello se ejecutaron los seeders individuales de ImagenLogin, GoogleCaptcha, Informacion, Contactanos y Planes. Se generaron claves Passport locales que no existían. Crear una cuenta central ficticia con rol cliente, registrar el esquema y residencial demo, asociar users_schematas y ejecutar los métodos existentes App/database/CrearTablas::up e Insertar::up sobre portfolio_demo_resident_unit con datos ficticios de administración. Configurar DB_DATABASE_RESIDENCIAL, DB_USERNAME_RESIDENCIAL y DB_PASSWORD_RESIDENCIAL para la instancia de demostración. Añadir una vivienda y dos movimientos relacionados con estado_cuenta: cuota de mantenimiento de $1,500 y pago de $1,000 en octubre de 2026. La pantalla de recuperación se capturó sin enviar correo.
7. Ejecutar PHP con el directorio public y el router de la versión Laravel correspondiente, o artisan serve. En esta sesión se usaron localhost:8111 (POS), 8113 (TuxVentas), 8134 (Voldo) y 8115 (Resident Check). Si existe public/hot apuntando a un Vite apagado, conservarlo temporalmente fuera de public y utilizar el manifest compilado existente; restaurarlo al cerrar la captura. No se modificaron los .env de los proyectos.
8. Las aplicaciones Android no se reinstalaron ni se conectaron a un dispositivo personal: se reutilizaron sus artefactos de demostración verificados. Para recapturar, usar un emulador con almacenamiento independiente y la fixture documentada por cada aplicación; no habilitar el seeder privado de Finance App sobre datos personales.

### Integración y validación

Las fichas reutilizan el catálogo y las traducciones existentes. Finance App y FitLog tienen source=personal; EcoBrush, Resident Check, IMCHISSA, TuxVentas y Voldo tienen source=experience. No hay cambios de API, tipos públicos ni dependencias del portafolio.

Comprobar con npm run lint, npm run build y node --test tests/portfolio-projects.test.mjs. La revisión de datos debe exigir una ficha por nombre, recursos resolubles y textos/captions en español e inglés. Revisar el filtro profesional y los controles de galería a 1440 px y 390 px. No se validó el funcionamiento de módulos privados de producción ni se enviaron solicitudes en sitios oficiales.


### Resultados de la revisión inicial (antes de los cambios editoriales)

- npm run lint: PASS.
- npm run build: PASS.
- node --test tests/portfolio-projects.test.mjs: 1 prueba, PASS.
- Verificación en el navegador mediante los módulos reales de Vite: 18 fichas totales, las siete nuevas sin duplicados, tres imágenes por ficha y 21 imágenes decodificadas correctamente; roles y captions diferenciados en español e inglés.
- Filtro profesional: 14 fichas; Finance App y FitLog quedan fuera. Galería verificada en escritorio y móvil de 390 px, incluyendo avance a imagen 2/3 y cambio de idioma.
- git diff --check: sin errores de espacios en los archivos de esta tarea.
- Los navegadores de captura y servidores PHP/MySQL de demostración se cierran al finalizar; la instancia temporal se conserva en disco. El servidor Vite del portafolio queda en localhost:5199 para revisión.

### Revisión editorial y visual posterior

- Las fechas marcadas como «Actividad documentada en Git» delimitan el primer y último commit propio observado, no una relación laboral ni la duración total del producto. La marca se aplica únicamente a estas siete fichas.
- El catálogo y la cotización EcoBrush, las preguntas y la galería de TuxVentas y las pantallas de documento y cotización de Voldo contienen modificaciones temporales del DOM. Son ejemplos ilustrativos identificados en cada pie de imagen, no transacciones ni archivos guardados.
- Los tres diagramas son interpretaciones resumidas: Resident Check se basa en cambios propios de acceso y reportes; IMCHISSA en la integración CMS/sitio desarrollada en equipo; TuxVentas en migraciones, controladores y `specs/ERD.md`. No representan esquemas completos ni autoría exclusiva.
- TuxVentas no se presenta con pasarela de pagos: su especificación describe acuerdos entre usuarios. La atribución del QR se limita a su interfaz.
- Finance App y FitLog mantienen capturas existentes de emulador y se identifican como proyectos personales. No se validaron módulos privados de producción.
- Verificación posterior: las siete fichas tienen textos en ambos idiomas y recursos cargados; se inspeccionó la galería en escritorio y a 390 px. Finance App y FitLog conservan la clasificación de proyectos personales.
- Vite, ESLint y dos pruebas de portafolio: correctos. La comprobación adicional tsc -b falla por seis errores preexistentes, reproducidos también en el commit de respaldo: cuatro incompatibilidades de tipos en datos importados y dos módulos ausentes en src/pages/Home/index.ts.

### Corrección visual posterior

- Resident Check: se registró en la base de demostración la aplicación del abono de $1,000 a la cuota de $1,500. La interfaz muestra $500 pendientes; la captura corresponde a la interfaz real con datos ficticios.
- TuxVentas: la captura de preguntas conserva respuestas insertadas en el DOM y oculta dos miniaturas sin imagen.
- IMCHISSA: se migró una base local aislada `portfolio_demo_imchissa` en 127.0.0.1:3317 y se ejecutaron los seeders de estados, roles, personas, usuarios y CMS. Se sustituyó el administrador usado para la captura por una cuenta ficticia. La imagen muestra el editor real de inicio; el diagrama se conserva.
- Validación posterior: build, ESLint y dos pruebas de portafolio correctos; galerías y descripciones de los tres casos comprobadas en español e inglés y a 390 px y 1440 px.

### Ajustes posteriores de presentación

- Resident Check: se recapturó el estado de cuenta local con todos los totales visibles; la cuota ficticia de $1,500 y el abono de $1,000 dejan $500 pendientes.
- TuxVentas: se recapturaron catálogo, detalle y preguntas para mantener visible el buscador, la fotografía y las respuestas; las modificaciones temporales del DOM y los datos ficticios siguen identificados en los pies.
- Los pies de Nivo y FitLog identifican los registros como datos de muestra o ficticios. Las fichas distinguen entregables comprobables de responsabilidades y no presentan la sincronización de EcoBrush como una mejora medida.

- Nivo: se recapturaron movimientos y reporte mensual en inglés con los datos públicos de muestra en un emulador Android de solo lectura. No se importaron registros personales. La portada anterior se conserva.

### Ampliación de galerías y revisión de afirmaciones (2026-11-11)

- EcoBrush y Voldo incluyen diagramas bilingües de sus aportaciones, basados en la evidencia anterior; son gráficos explicativos, no capturas de las aplicaciones.
- Resident Check recupera la captura local del formulario de contraseña, sin envío de correo. IMCHISSA incorpora la captura ya existente de la sección pública de remolques.
- Nivo agrega la captura de configuración del README (`docs/screenshots/settings-planning.png`, referencia `5e57add`); FitLog agrega historial y gestión de respaldos de la fixture ficticia `main_demo.dart` (`docs/images/screens/history-overview.png` y `data-management.png`, referencia `2c6565f`). Se convirtieron a WebP sin modificar el contenido visual.
- Se retiraron de Lavafy los porcentajes de ahorro de tiempo y cobertura que no se pudieron respaldar en esta revisión. También se sustituyeron afirmaciones de adopción y efectos no cuantificados en COEPES, así como afirmaciones de visibilidad del portafolio y productividad de SmartNavbar, por descripciones de funciones. Esto no acredita las demás métricas o resultados históricos que todavía requieran evidencia.


### Portadas conceptuales del portafolio (2026-11-13)

- Se agregó una portada conceptual a EcoBrush, Resident Check, IMCHISSA, TuxVentas, Voldo, Nivo y FitLog. Las escenas son ilustraciones generadas, no fotografías de productos, capturas reales ni logotipos oficiales. Sus pies lo indican en español e inglés; las capturas y diagramas anteriores se conservaron.
- Los fondos se generaron mediante OpenDesign con el proveedor de imagen de Codex. El adaptador no reconoció los nombres `exec-*.png` de los resultados; se recuperaron los PNG generados y se incorporaron manualmente al proyecto local de OpenDesign `cb93f09b-ff10-4148-9191-d7f48ee43cde`. Los originales se conservaron en `C:/Dev/RESULTS-OpenDesging/results/PORTFOLIO/Portadas-Proyectos`; allí quedan los fondos, los títulos SVG editables y `index.html` para revisión. Las versiones WebP del portafolio combinan cada fondo con su título.
- Se ajustaron los logros de EcoBrush y Voldo para destacar, respectivamente, la validación numérica de precios y la migración, el modelo y el controlador de documentos; la atribución se respalda en los commits `9f38c7c` y `6dd716f`.
- La galeria muestra el pie fuera de la imagen en vista normal para mantenerlo legible; en pantalla completa muestra el texto en la parte superior. Las miniaturas de imagen muestran el recurso completo sin recortarlo.

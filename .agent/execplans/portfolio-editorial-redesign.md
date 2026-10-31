# Reimaginar el portafolio como una publicación de proyectos

Este documento es un plan vivo. Mantener progreso, descubrimientos, decisiones y resultados sincronizados con la ejecución.

```yaml
plan_status: completed
created: 2026-10-28
last_updated: 2026-10-28
```

## Propósito y alcance

Construir un portafolio profesional memorable, visualmente lujoso y fácil de explorar: identidad, inicio, proyectos, detalle, habilidades y contacto, con animación deliberada, versiones móvil y escritorio, español e inglés y temas claro y oscuro. El usuario evaluará el plan antes de autorizar la implementación. No inventar clientes, métricas, resultados, fechas ni disponibilidad.

## Diagnóstico de origin/master

Revisión visual en navegador de una copia local del commit `1e70dbf47d1de5f8efcc409eb32e535f1c77d3a5` de `origin/master`: portada, presentación, catálogo, detalle AMIFIT y contacto. No se verificó visualmente el móvil ni el tema oscuro durante esta planificación.

- La fotografía y la tipografía serif dan personalidad, pero el primer pliegue dedica casi todo el espacio al nombre: la propuesta profesional y las acciones quedan para después. La presentación siguiente usa texto muy grande, cortes forzados y mucho espacio sin contenido.
- La cabecera muestra ubicación, reloj y etiquetas con el mismo peso visual que la navegación; cuesta identificar una acción principal. En el catálogo, al desplazarse se observó contenido detrás de la cabecera.
- El catálogo editorial aporta orden y datos reales, pero sus miniaturas son pequeñas frente a títulos extensos; las filas repetidas y etiquetas en mayúsculas dificultan distinguir proyectos. El filtro flotante ocupa el borde inferior.
- El detalle de AMIFIT contiene información útil y capturas, pero la portada usa un párrafo largo y los resultados, contribución y galería quedan alejados; el recorrido comienza como una ficha genérica.
- Contacto tiene una cuadrícula singular y canales reales, aunque los iconos dispersos y las letras decorativas compiten con el correo y hacen menos directa la elección del canal.

## Dirección visual propuesta: Estudio / Archivo

Un estudio digital con precisión editorial y calidez: fondo marfil `#F3F0E8`, tinta carbón `#171A1B`, verde petróleo `#173D3A`, acento cobre `#B96743` y líneas arena `#D8D0C1`. Modo oscuro carbón y superficies verde profundo, con contraste comprobado. Reservar el cobre para acciones y énfasis, no para texto pequeño. La serif Cormorant existente aporta carácter a títulos; Lato existente sostiene texto e interfaz. La geometría procede de líneas finas, marcos y bloques asimétricos, evitando adornos que tapen el trabajo.

Inicio: cabecera compacta con identidad, navegación, idioma y tema; hero con propuesta concreta basada en el perfil, dos acciones «Ver proyectos» y «Contactar», fotografía integrada y un detalle gráfico discreto. Debajo, tres proyectos destacados como composiciones grandes con capturas reales, alternando escala y posición: EZTICKET, AMIFIT Cobro y COEPES público, sujetos a disponibilidad de imágenes y datos verificables. Seguir con una presentación breve, capacidades agrupadas por tipo de problema, y contacto visible. Mantener acceso al catálogo completo.

Proyectos: catálogo visual con imágenes legibles, título, tipo de producto, rol y resumen breve; controles de origen existentes claros y sin cubrir contenido. Cada detalle cuenta contexto, contribución y evidencia disponible, seguido de galería grande y ficha técnica compacta. Reutilizar datos y medios reales; cuando falte información omitirla, no inventarla. Conservar el acceso a todos los proyectos, enlaces disponibles y comportamiento de rutas existentes.

Contacto: cierre con una frase directa, correo visible como acción principal y enlaces identificados a GitHub, LinkedIn y WhatsApp existentes. Sin formulario ni promesas de disponibilidad. Movimiento: apariciones breves, transiciones de imagen y respuestas al puntero discretas; sin bloquear el desplazamiento. Con `prefers-reduced-motion`, presentar el contenido inmediatamente y sin desplazamientos animados esenciales.

## Contexto y contratos

`src/pages/Home/HomePage.tsx` reúne seis secciones y usa `usePageWheelScroll`, restauración `activeSection` y carga diferida. `src/container/Routes.tsx` define `/`, `/Project` y `/Contact` con transiciones; preservar los enlaces hash existentes. `src/components/Projects/Projects.tsx` comparte el catálogo entre inicio y página, filtra por origen y abre `DetailsProjects`; sus detalles y galería están en `src/components/DetailsProjects/`. `src/components/ContactMe/`, `src/components/Header/`, `src/pages/Home/Skills.tsx` y `src/assets/styles/globals.css` son puntos de cambio. `src/lib/portfolioContent.ts` combina `data/experience.json`, `data/projects.json`, `data/data.json` con traducciones y tipos de `src/content/portfolio/`; las imágenes están en `src/assets/images/`. Los datos de `origin/master` están versionados aunque el README diga que se ignoran: corregir la documentación si cambia el flujo. Hay imágenes WebP, Cormorant y Lato y Framer Motion instalados; reutilizarlos.

## Dependencias y estrategia

| Hito | Depende de | Paralelizable |
| --- | --- | --- |
| M0 Identidad e inicio | Ninguno | No |
| M1 Proyectos y casos | M0 | No |
| M2 Capacidades y contacto | M1 | No |

Ejecución directa y secuencial: comparten estilos, navegación y contenido. No se autorizó delegación. Cada hito incorpora su propia validación y documentación.

## Entrega y rama

Este plan espera aprobación explícita. Tras aprobarlo, actualizar `origin`, comprobar su HEAD y árbol limpio, y crear una nueva rama local desde el `origin/master` entonces vigente; registrar su SHA antes de modificar código. Si cambió desde `1e70dbf`, revisar diferencias y ajustar el plan. La rama actual `dev/portfolio-ui-refresh` contiene un rediseño distinto y debe conservarse; no mezclarlo automáticamente. El plan está en esa rama como archivos locales sin seguimiento: trasladar únicamente estos documentos de planificación a la nueva rama sin perderlos. No se autorizan commit, push, merge ni despliegue.

## Hitos

### M0 — Identidad, navegación e inicio

```yaml
id: M0
status: completed
depends_on: []
parallelizable: false
completed_at: 2026-10-28T13:51:57Z
owned_paths:
  - src/assets/styles/
  - src/components/Header/
  - src/pages/Home/
  - src/container/Routes.tsx
  - src/content/portfolio/
runtime_resources:
  - navegador y servidor local
```

#### Implementation
Crear tokens de color, tipografía y espaciado; rediseñar cabecera y hero según la dirección visual. Reordenar el inicio hacia un flujo natural y eliminar la captura de rueda/restauración por sección si impiden una navegación predecible; revisar `SectionWrapper`, `DeferredSection` y `usePageWheelScroll` al retirar su uso. Mantener rutas, idioma y temas. Crear texto ES/EN basado en el perfil real, sin afirmaciones nuevas. Preparar imágenes destacadas usando medios existentes.

#### Tests
Si se cambia lógica de navegación o persistencia, cubrir sus casos con el mecanismo existente o una comprobación pequeña; no agregar un framework solo para estilos.

#### Local validation
`npm run lint` y `npm run build`; abrir localmente inicio en escritorio y móvil, ambos idiomas y temas; probar navegación con teclado, foco visible, scroll y movimiento reducido.

#### Documentation
Actualizar `README.md` si se reemplazan scroll por secciones, estructura de inicio o comandos documentados; reconciliar `docs/language-switch-technical.md` si cambia el contrato de idioma.

#### Acceptance criteria
El primer pliegue presenta identidad, actividad y acciones; navegación sin superposición ni desplazamiento forzado; contenido visible con movimiento reducido y controles operables.

#### Completion gate
Completar solo con comandos exitosos y criterios observados; registrar evidencia y cualquier equivalente aprobado.

#### Completion evidence

- `npm run lint` y `npm run build`: exit 0. Inicio observado en navegador de escritorio y móvil 390×844, en inglés/claro y español/oscuro; foco visible y contenido visible con movimiento reducido emulado. El desplazamiento ya no se intercepta ni restaura por sección.
- documentation_impact: updated; documentation_files: `README.md`; documentation_basis: navegación y datos reales; canonical_reused: README; documentation_checks: lectura de las rutas y comandos actuales.
- Changed paths: `src/components/Header/Header.tsx`, `src/pages/Home/HomePage.tsx`, `src/pages/Home/MainContent.tsx`, `src/container/Routes.tsx`, `src/main.tsx`, `src/assets/styles/editorial.css`, `README.md`. Lote de integración sin commit: `feat: redesign portfolio experience`, sujeto a autorización.

### M1 — Proyectos y casos de estudio

```yaml
id: M1
status: completed
depends_on: [M0]
parallelizable: false
completed_at: 2026-10-28T13:54:05Z
owned_paths:
  - src/components/Projects/
  - src/components/DetailsProjects/
  - src/content/portfolio/
  - src/pages/Project/
runtime_resources:
  - navegador y servidor local
```

#### Implementation
Crear selección destacada en inicio y catálogo completo con capturas grandes; conservar filtro por origen y manejo de datos ausentes. Rediseñar detalle con contexto, rol, contribuciones, resultados verificables, galería y tecnología; mostrar enlaces solo cuando existan. Mantener todos los registros, traducciones y descripciones accesibles de imágenes. El detalle puede seguir siendo modal; asegurar nombre accesible, foco inicial y retenido, Escape, cierre y devolución del foco.

#### Tests
Comprobar selección, filtro y proyectos sin imagen, fecha o enlace; añadir prueba pequeña si se introduce lógica nueva de selección o filtrado.

#### Local validation
`npm run lint` y `npm run build`; en navegador abrir un proyecto con varias imágenes y otro con datos incompletos, navegar galería y filtro en ambos idiomas, con teclado y en móvil.

#### Documentation
Actualizar en `README.md` la estructura y el flujo real de datos y medios si cambian; conservar como fuentes canónicas `data/*.json` y `src/content/portfolio/`.

#### Acceptance criteria
Los tres destacados tienen imágenes reales legibles; todo el catálogo sigue accesible; detalle y filtros funcionan y no hay afirmaciones o enlaces inventados.

#### Completion gate
Completar solo con comandos exitosos y criterios observados; registrar evidencia y cualquier equivalente aprobado.

### M2 — Capacidades, contacto y coherencia final

```yaml
id: M2
status: completed
depends_on: [M1]
parallelizable: false
completed_at: 2026-10-28T13:56:33Z
owned_paths:
  - src/pages/Home/Skills.tsx
  - src/components/ContactMe/
  - src/components/Footer/
  - src/pages/Contact/
  - src/assets/styles/
runtime_resources:
  - navegador y servidor local
```

#### Implementation
Agrupar capacidades verificadas sin eliminar información de origen; convertir contacto en cierre claro con correo y enlaces existentes. Aplicar el sistema visual y movimiento consistente en inicio y rutas dedicadas; comprobar que temas e idiomas cubren todas las secciones.

#### Tests
Probar enlaces y controles mediante navegación local; no enviar mensajes. Comprobar foco, nombres accesibles y orden lógico.

#### Local validation
`npm run lint` y `npm run build`; comprobar `/`, `/#/Project` y `/#/Contact`, escritorio y móvil, ES/EN, claro/oscuro, teclado y movimiento reducido; inspeccionar desbordamiento y legibilidad de capturas.

#### Documentation
Actualizar `README.md` para describir secciones, rutas y edición de contenido reales; actualizar `docs/language-switch-technical.md` solo si cambia el mecanismo.

#### Acceptance criteria
Los canales de contacto son identificables y funcionan; capacidades se leen sin saturación; todas las rutas conservan identidad, funcionalidad y acceso móvil.

#### Completion gate
Completar solo con comandos exitosos y criterios observados; registrar evidencia y cualquier equivalente aprobado.

## Validación integrada y riesgos

Registrar tamaños de viewport, capturas y resultados de las comprobaciones finales. Verificar contraste de texto y controles en ambos temas, foco de modal y recuperación, rutas hash y contenido bilingüe. No depender de animación para revelar información. Revisar visualmente recortes de capturas y omitir resultados no respaldados. Si falla una comprobación, conservar evidencia y corregir antes de cerrar; no borrar cambios ajenos ni restablecer la rama del usuario. No publicar automáticamente.

## Progreso

- 2026-10-28: plan creado para revisión; todos los hitos pendientes y sin autorización de implementación.
- 2026-10-28: el usuario pidió continuar y autorizó la implementación. Se creó `dev/portfolio-editorial-redesign` desde `origin/master` en `1e70dbf`; M0 iniciado. Solo los documentos del plan estaban sin seguimiento. Los cambios compartidos entre hitos se conservarán como un lote de integración sin commit hasta autorización.
- 2026-10-28T13:51:57Z: M0 completado; M1 iniciado. La compilación y el lint de la base también pasaron.
- 2026-10-28T13:54:05Z: M1 completado; M2 iniciado. `node --test tests/portfolio-projects.test.mjs`, `npm run lint` y `npm run build` pasaron. En navegador se verificaron tres destacados, filtro, galería, cierre con Escape y retorno del foco; AMIFIT en español/escritorio e inglés/móvil y Lavafy sin fecha ni cliente. `README.md` explica selección y prueba. Archivos: `src/components/Projects/Projects.tsx`, `quickViewUtils.ts`, `src/components/DetailsProjects/DetailsProjects.tsx`, `src/assets/styles/editorial.css`, `tests/portfolio-projects.test.mjs`, `README.md`. documentation_impact: updated; documentation_files: README; documentation_basis: nuevo catálogo y prueba; canonical_reused: README; documentation_checks: lectura y comandos. Commit diferido en el mismo lote de integración de M0 por estilos compartidos.
- 2026-10-28T13:56:33Z: M2 completado. `npm run lint`, `npm run build`, `node --test tests/portfolio-projects.test.mjs` y `git diff --check` pasaron. Renderizado SSR con proyecto sin medios ni enlaces pasó. Navegador integrado: rutas inicio, proyectos y contacto en escritorio 1280 y móvil 390×844, idiomas y temas, imágenes y acciones visibles; `scrollWidth` igual a ancho en contacto y catálogo móviles; enlaces de contacto inspeccionados sin enviar mensajes. Foco, Escape y retorno comprobados; movimiento reducido emulado. Contraste calculado de las combinaciones principales de texto: mínimo 4.91:1. documentation_impact: updated; documentation_files: `README.md`, `docs/language-switch-technical.md`; documentation_basis: rutas, contenido e integración de idioma; canonical_reused: ambos archivos; documentation_checks: rutas de código y comandos contrastados con el árbol. Changed paths de M2: `src/pages/Home/Skills.tsx`, `src/components/ContactMe/ContactMe.tsx`, `src/pages/Contact/Contact.tsx`, `src/pages/Project/Project.tsx`, `src/content/portfolio/resume.ts`, `src/content/portfolio/ui.ts`, `src/assets/styles/editorial.css`, `src/container/Routes.tsx`, `index.html`, `public/favicon.svg`, documentación. Commit diferido de integración `feat: redesign portfolio experience`, sin autorización para commit.

## Descubrimientos

- `origin/HEAD` apunta a `master`; el commit revisado es `1e70dbf`. La rama local actual difiere en 34 archivos respecto a esa base.
- El README afirma que `data/` se ignora, pero los tres JSON están versionados en el commit remoto.

## Decisiones

- 2026-10-28: usar una dirección editorial cálida y capturas reales como eje visual. El usuario delegó las decisiones creativas y revisará el plan.
- 2026-10-28: mantener modalidades, rutas y datos existentes salvo donde el plan indique un cambio; las funcionalidades concretas se verifican durante ejecución.

## Resultados y retrospectiva

Implementados la identidad, el inicio, la selección y catálogo, el detalle accesible, capacidades y contacto. Se reutilizaron medios y datos existentes; los resultados y enlaces del contenido heredado no se verificaron contra fuentes externas. La rama permanece local sin commit ni despliegue. Verificaciones en Progreso; la revisión visual fue puntual, no una auditoría exhaustiva de todos los dispositivos y combinaciones.

## Registro de revisiones

- 2026-10-28: versión inicial para revisión.

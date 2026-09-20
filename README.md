# Darinel Escobar · Portfolio

Portafolio bilingüe construido con React 18, TypeScript, Vite y Tailwind CSS. Presenta proyectos profesionales y personales, habilidades y canales de contacto.

## Desarrollo local

```bash
npm install
npm run dev
```

Vite muestra la dirección local al iniciar. Validaciones:

```bash
npm run lint
npx tsc -b --pretty false
npm run build
npm run preview
```

El build se genera en `dist/`. El proyecto incluye locks de npm y pnpm; evita mezclar gestores al actualizar dependencias.

## Rutas y navegación

Se conserva `HashRouter` para GitHub Pages:

| Ruta interna | URL pública | Contenido |
| --- | --- | --- |
| `/` | `/#/` | Presentación, proyectos seleccionados, perfil, habilidades y contacto |
| `/Project` | `/#/Project` | Catálogo completo, filtros, búsqueda y detalles |
| `/Contact` | `/#/Contact` | Correo y enlaces de contacto |

El header y el footer son compartidos entre rutas. Home usa scroll nativo, sin interceptar la rueda ni restaurar un índice de sección en `localStorage`. El CTA de proyectos navega a `/#projects` dentro del router. Las rutas y etiquetas principales mantienen su significado.

## Contenido

Los archivos bajo `data/` contienen la información de origen:

- `data.json`: datos personales, educación, habilidades, idiomas y certificaciones.
- `experience.json`: proyectos profesionales.
- `projects.json`: proyectos personales.

No sobrescribas estos archivos con `dataSAMPLE/`: esa carpeta sirve como referencia de estructura.

Los adaptadores y traducciones viven en `src/content/portfolio/`. `src/lib/portfolioContent.ts` proporciona los hooks de acceso. La UI general está en `ui.ts`; los textos de presentación, catálogo y contacto están en `presentation.ts`, disponibles mediante `usePresentationCopy()`.

### Proyectos

Cada proyecto admite nombre, descripción, rol, fechas, tecnologías agrupadas, responsabilidades, logros, cliente, equipo, enlaces y `media`. `quick_view` define un resumen, una etiqueta de impacto y tecnologías destacadas. Los datos de logros y métricas proceden del contenido existente.

- Home selecciona proyectos con `preview_variant` igual a `ticketing`, `payments` y `automotive`; si ninguno existe, muestra los primeros tres.
- El catálogo agrupa por año descendente, con un grupo adicional para proyectos sin fecha.
- Los filtros separan todo, trabajo profesional y personal.
- La búsqueda combina nombre, rol, cliente, resumen y tecnologías; ignora mayúsculas y acentos.
- Los detalles conservan el proyecto seleccionado por nombre, para que la selección sea estable al traducir.
- La galería permite botones, flechas de teclado dentro de la galería, gestos táctiles, miniaturas y ampliación.
- Las imágenes deben existir bajo `src/assets/images/` y referenciarse como `assets/images/carpeta/archivo.webp`. Los fallos de imagen muestran un estado legible.

### Habilidades y contacto

Las habilidades conservan sus nombres completos. Frontend, backend, móvil y bases de datos están visibles; las demás categorías se expanden mediante un control nativo `details`.

El correo y las redes se toman de `personal_info`. Copiar correo muestra confirmación o un mensaje de error. No se envían mensajes desde la aplicación ni se añade un formulario con backend.

## Diseño y accesibilidad

Los tokens semánticos y estilos de las páginas viven en `src/assets/styles/globals.css`; Tailwind los expone a los componentes. Las fuentes están alojadas localmente.

- Claro y oscuro siguen la preferencia del sistema hasta que se elige un tema, persistido como `localStorage.theme`.
- El tema se inicializa antes de montar React para evitar un cambio de colores al cargar.
- Español e inglés se conservan en `localStorage.language`; el idioma inicial sigue siendo inglés.
- Navegación con foco visible, enlace para saltar al contenido y botones etiquetados.
- Menú y detalles usan `dialog` nativo para contener el foco, hacer inerte el fondo y cerrar con Escape.
- La galería ampliada es un diálogo anidado; cerrar la imagen mantiene abiertos los detalles.
- Las animaciones y el scroll suave respetan `prefers-reduced-motion`.
- Los layouts se adaptan sin forzar secciones a la altura de la pantalla.

## Archivos principales

- `src/App.tsx`: estructura compartida.
- `src/container/Routes.tsx`: rutas y desplazamiento al navegar.
- `src/pages/Home/`: portada, perfil y habilidades.
- `src/components/Projects/`: selección, catálogo y previews.
- `src/components/DetailsProjects/`: detalle y galería.
- `src/components/ContactMe/ContactMe.tsx`: contacto responsive.
- `src/hooks/useModalDialog.ts`: apertura, bloqueo del scroll y cierre de diálogos.
- [Documentación del idioma](docs/language-switch-technical.md).

## Publicación

`npm run deploy` compila y publica `dist/` en la rama `gh-pages`. Es una operación separada de la compilación y de los commits locales; ejecútala únicamente cuando quieras publicar.

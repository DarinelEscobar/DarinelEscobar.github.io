# Darinel Escobar – Portfolio Documentation

Bienvenido al repositorio del portafolio profesional de Darinel Escobar. El proyecto está construido con **React**, **TypeScript** y **Vite**, y combina animaciones fluidas con una arquitectura modular para mostrar experiencia, proyectos y formas de contacto de manera clara y atractiva.

## 🛰️ Visión general
- **SPA multipágina**: Home, Projects y Contact están orquestadas con React Router y transiciones animadas con Framer Motion para ofrecer una navegación continua incluso cuando se cambia de ruta.【F:src/container/Routes.tsx†L1-L63】
- **Scroll narrativo**: La página principal usa secciones a pantalla completa que se registran en `localStorage` para recordar el último bloque visitado y reubicar al usuario en futuras visitas.【F:src/pages/Home/HomePage.tsx†L12-L69】【F:src/components/SectionWrapper.tsx†L1-L27】
- **Contenido dinámico**: Toda la información personal, habilidades, proyectos y certificaciones se obtiene desde archivos JSON externos, lo que facilita su edición sin tocar el código fuente.【F:src/hooks/useSkillSections.ts†L18-L111】【F:dataSAMPLE/data.json†L2-L120】【F:dataSAMPLE/projects.json†L1-L55】【F:dataSAMPLE/experience.json†L1-L200】

## 🧭 Rutas y secciones
| Ruta | Componentes principales | Descripción |
| ---- | ---------------------- | ----------- |
| `/` | `Header`, `MainContent`, `AboutMe`, `Projects`, `Skills`, `ContactMe`, `Title` | Hero animado, presentación personal, carrusel de proyectos, mosaico de habilidades y CTA de contacto.【F:src/pages/Home/HomePage.tsx†L8-L69】【F:src/pages/Home/MainContent.tsx†L7-L63】【F:src/pages/Home/AboutMe.tsx†L7-L114】【F:src/components/Projects/Projects.tsx†L13-L82】【F:src/components/ContactMe/ContactMe.tsx†L18-L98】 |
| `/Project` | `Header`, `Projects` | Vista enfocada para recorrer el catálogo completo de proyectos, con navegación y detalle ampliado.【F:src/pages/Project/Project.tsx†L3-L14】【F:src/components/Projects/Projects.tsx†L13-L82】 |
| `/Contact` | `Header`, `ContactMe` | Página dedicada para contactar por correo, WhatsApp, GitHub o LinkedIn desde un layout adaptable.【F:src/pages/Contact/Contact.tsx†L3-L15】【F:src/components/ContactMe/ContactMe.tsx†L18-L205】 |

## 🛠️ Stack tecnológico
- **Framework:** React 18 con TypeScript y Vite 5 para compilación rápida y módulos ES.【F:package.json†L1-L34】
- **UI & estilos:** Tailwind CSS, fuentes personalizadas y componentes de shadcn/ui.【F:package.json†L14-L34】【F:tailwind.config.ts†L1-L40】
- **Animaciones:** Framer Motion para transiciones entre rutas y entrada de secciones.【F:src/container/Routes.tsx†L1-L63】【F:src/pages/Home/AboutMe.tsx†L34-L74】
- **Utilidades:** React Icons y Lucide para iconografía, react-intersection-observer para disparar animaciones, Embla Carousel para carruseles de proyectos.【F:package.json†L14-L34】【F:src/components/Projects/Projects.tsx†L1-L82】

## 🧱 Estructura del proyecto
```
src/
├── App.tsx                # Monta el enrutador principal
├── assets/                # Imágenes y estilos globales
├── components/            # Componentes reutilizables (Header, Footer, Projects, Contact, etc.)
├── container/Routes.tsx   # Definición de rutas y transiciones
├── hooks/                 # Lógica reutilizable (dark mode, media queries, data mapping)
├── lib/                   # Utilidades compartidas
├── pages/                 # Páginas agrupadas por ruta (Home, Project, Contact)
└── main.tsx               # Punto de entrada y montaje en DOM
```
Cada carpeta mantiene un único componente u objetivo, favoreciendo responsabilidades claras y escalabilidad.

## 📂 Gestión de contenido
1. Copia la carpeta `dataSAMPLE/` como `data/` en la raíz del repositorio (el directorio real está ignorado en Git).【F:.gitignore†L19-L27】
2. Actualiza los archivos JSON:
   - `data/data.json` contiene información personal, resumen profesional y habilidades con iconos específicos.【F:dataSAMPLE/data.json†L2-L120】
   - `data/projects.json` incluye proyectos personales, tecnologías por categoría y recursos multimedia.【F:dataSAMPLE/projects.json†L1-L55】
   - `data/experience.json` agrega proyectos ejecutados en experiencias laborales con responsabilidades y logros detallados.【F:dataSAMPLE/experience.json†L1-L200】
3. Los iconos admiten librerías `lucide-react`, `fa`, `si` y `gi`. Si no se encuentra un icono se usa uno genérico, por lo que conviene revisar nombres y librerías antes de publicar.【F:src/hooks/useSkillSections.ts†L18-L103】
4. Las imágenes referenciadas en `media.url` deben existir bajo `src/assets/...`. Usa rutas relativas como `assets/images/<carpeta>/<archivo>.png` para mantener consistencia.【F:dataSAMPLE/projects.json†L21-L54】【F:dataSAMPLE/experience.json†L43-L199】

### Estructura de `data/data.json`
| Clave | Descripción | Ejemplo |
| ----- | ----------- | ------- |
| `resume.personal_info` | Datos de cabecera que se muestran en el hero, header y secciones de contacto (nombre, rol, email, redes sociales). | `"full_name": "Christian Darinel Escobar Guillen"`【F:dataSAMPLE/data.json†L3-L16】 |
| `resume.professional_summary` | Texto destacado en el bloque “About me”, admite un campo opcional `note` para mensajes secundarios. | `"summary": "I'm Darinel..."`【F:dataSAMPLE/data.json†L17-L19】 |
| `resume.Skills_Technologies` | Colección de categorías con iconos, colores y listas de habilidades. Cada entrada puede usar `skills` o `languages_list`. | `"technical_skills": { ... }`【F:dataSAMPLE/data.json†L20-L94】 |
| `resume.education` | Arreglo con la formación académica, se utiliza en el modal de detalle de proyectos para contextualizar experiencia. | `"degree": "Bachelor of Software Engineering"`【F:dataSAMPLE/data.json†L95-L105】 |
| `resume.certifications` | Sección opcional que se representa como tarjetas dentro de Skills. El hook `useSkillSections` genera iconos tipo medalla si no se provee uno. | `"items": [{ "name": "AWS Academy Cloud Foundations", ... }]`【F:dataSAMPLE/data.json†L106-L119】 |

### Estructura de `data/projects.json`
- `projects.personal_projects` es un arreglo con proyectos destacados que se muestran tanto en Home como en `/Project`. Cada proyecto acepta campos `technologies` separados por dominio para alimentar la barra lateral del modal de detalles.【F:dataSAMPLE/projects.json†L1-L55】【F:src/components/DetailsProjects/TechnicalSidebar.tsx†L1-L120】
- `media` es un arreglo de objetos `{ type, description, url }`. Actualmente se admiten imágenes, pero el componente está preparado para extenderse a videos o enlaces externos si se requiere.【F:dataSAMPLE/projects.json†L33-L54】【F:src/components/DetailsProjects/MediaGallery.tsx†L1-L120】
- Los campos `responsibilities` y `achievements` se renderizan como listas con bullet points en el modal, por lo que conviene usar oraciones concisas.【F:dataSAMPLE/projects.json†L21-L32】【F:src/components/DetailsProjects/ProjectDetails.tsx†L1-L160】

### Estructura de `data/experience.json`
- `experience.projects` agrupa entregables ejecutados para clientes. El componente `Projects` fusiona estos registros con los personales, manteniendo orden cronológico según la posición en el arreglo.【F:dataSAMPLE/experience.json†L1-L200】【F:src/components/Projects/Projects.tsx†L17-L27】
- Puedes añadir campos adicionales (por ejemplo `metrics` o `stackHighlights`) y extender los componentes `ProjectDetails` o `TechnicalSidebar` para mostrarlos manteniendo la separación entre UI y datos.【F:src/components/DetailsProjects/ProjectDetails.tsx†L1-L160】【F:src/components/DetailsProjects/TechnicalSidebar.tsx†L1-L120】
- Cada entrada debe declarar `media` para alimentar la galería; si se omite, el componente mostrará un placeholder amigable, por lo que no se rompe la UI.【F:dataSAMPLE/experience.json†L43-L199】【F:src/components/Projects/ProjectCard.tsx†L83-L116】

## 🧩 Componentes clave
- **Header**: detecta el modo actual, permite alternar tema oscuro y muestra la hora local actualizada cada segundo.【F:src/components/Header/Header.tsx†L1-L34】【F:src/hooks/useDarkMode.ts†L1-L31】【F:src/hooks/useCurrentTime.ts†L1-L21】
- **SectionWrapper**: asigna `snap` vertical y registra la sección activa en `localStorage` para restaurar la posición.【F:src/components/SectionWrapper.tsx†L1-L27】
- **Projects**: mezcla proyectos personales y de experiencia, controla carrusel de imágenes, animaciones y modal de detalles extendidos.【F:src/components/Projects/Projects.tsx†L13-L82】【F:src/components/Projects/ProjectCard.tsx†L1-L116】【F:src/components/DetailsProjects/DetailsProjects.tsx†L1-L78】
- **ContactMe**: renderiza variantes específicas para mobile, tablet y desktop, con posiciones pseudo-aleatorias de íconos en escritorio para aportar dinamismo.【F:src/components/ContactMe/ContactMe.tsx†L18-L205】

## 🧠 Hooks personalizados
| Hook | Propósito |
| ---- | --------- |
| `useDarkMode` | Sincroniza el tema con `localStorage` y aplica la clase `dark` en `<html>` para habilitar variantes de Tailwind.【F:src/hooks/useDarkMode.ts†L1-L31】 |
| `useCurrentTime` | Devuelve la hora formateada y se actualiza cada segundo para mostrarla en el header.【F:src/hooks/useCurrentTime.ts†L1-L21】 |
| `useMediaQuery` | Evalúa consultas CSS para renderizar versiones específicas de componentes (por ejemplo en Contact).【F:src/hooks/useMediaQuery.ts†L1-L16】 |
| `useSkillSections` | Combina habilidades, idiomas y certificaciones en un arreglo amigable para renderizar tarjetas visuales.【F:src/hooks/useSkillSections.ts†L18-L111】 |

## 🎨 Estilos y temas
- Tailwind está configurado con colores personalizados (`bg-whi`, `text-dar`, etc.) y fuentes variables para resaltar distintas secciones.【F:tailwind.config.ts†L1-L40】
- Las secciones de Home incluyen gradientes radiales, efectos `hover` y transiciones definidas con Framer Motion para aportar profundidad.【F:src/pages/Home/AboutMe.tsx†L38-L114】【F:src/pages/Home/MainContent.tsx†L33-L63】
- El modo oscuro se consigue con clases `dark:` y se conserva entre sesiones mediante el hook `useDarkMode`.【F:src/hooks/useDarkMode.ts†L1-L31】

## ♿ Accesibilidad y UX
- Botones y enlaces incluyen atributos `aria-label` y estados `hover`/`focus` contrastantes, especialmente en la sección de contacto y navegación de proyectos.【F:src/components/ContactMe/ContactMe.tsx†L29-L72】【F:src/components/Projects/ProjectNavigation.tsx†L1-L52】
- El diseño responsive implementa variantes dedicadas para mobile, tablet y desktop, evitando layouts comprimidos y asegurando que la información crítica permanezca visible.【F:src/components/ContactMe/ContactMe.tsx†L18-L205】【F:src/components/Projects/ProjectCard.tsx†L55-L116】
- Las animaciones poseen transiciones suaves y thresholds con `react-intersection-observer` para no saturar al usuario, además de respetar la preferencia de scroll suave nativa de cada navegador.【F:src/components/Projects/Projects.tsx†L1-L82】【F:src/components/SectionWrapper.tsx†L1-L27】

## 🧭 Estado y navegación
- `SectionWrapper` guarda el índice de sección activa y `Routes` lo consulta al montar la página principal para restaurar la posición del usuario.【F:src/components/SectionWrapper.tsx†L1-L27】【F:src/pages/Home/HomePage.tsx†L12-L69】
- El componente `Projects` controla el índice de proyecto actual, la imagen activa y la dirección de navegación para animar entradas y salidas coherentes.【F:src/components/Projects/Projects.tsx†L29-L70】
- El modal `DetailsProjects` mantiene estado local para el slide activo de la galería y ofrece un botón de cierre siempre visible, mejorando la usabilidad en pantallas grandes.【F:src/components/DetailsProjects/DetailsProjects.tsx†L1-L78】

## 🧪 Scripts y flujo de trabajo
1. **Instalación**
   ```bash
   pnpm install
   ```
2. **Servidor de desarrollo**
   ```bash
   pnpm dev
   ```
   Abre [http://localhost:5173](http://localhost:5173) para explorar el portafolio en vivo.
3. **Linting**
   ```bash
   pnpm lint
   ```
   Ejecuta ESLint sobre el proyecto para garantizar estándares consistentes.【F:package.json†L7-L26】
4. **Build de producción**
   ```bash
   pnpm build
   npx gh-pages -d dist #Desply in gp pages branch
   serve dist #Local only
   ```
   Genera el contenido optimizado en `dist/` listo para desplegar en GitHub Pages o cualquier hosting estático.
5. **Vista previa del build**
   ```bash
   pnpm preview
   ```

> También se incluyen archivos `package-lock.json` y `pnpm-lock.yaml`. Se recomienda mantener un solo gestor de paquetes por entorno para evitar inconsistencias.

## 🚀 Despliegue en GitHub Pages
El script `pnpm deploy` compila el proyecto, duplica `index.html` como `404.html` (requerido para SPAs en Pages) y publica `dist/` en la rama `gh-pages` usando `gh-pages` CLI.【F:package.json†L7-L26】

## 🔐 Buenas prácticas adicionales
- Mantén las responsabilidades separadas: componentes para UI, hooks para lógica y datos aislados en JSON externos.
- Revisa que cada archivo modificado conserve menos de ~300 líneas para facilitar mantenimiento, siguiendo las convenciones internas.
- Usa commits descriptivos y ejecuta linting antes de desplegar.

## 📮 Feedback
Si detectas un bug, deseas proponer mejoras de diseño o agregar nuevos proyectos, abre un issue o contacta directamente a través de cualquiera de los medios listados en la sección de contacto del portafolio.


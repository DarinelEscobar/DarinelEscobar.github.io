# Darinel Escobar — Portafolio

Portafolio construido con React, TypeScript y Vite. El inicio presenta el perfil y los proyectos en un recorrido de desplazamiento normal; las rutas `/#/Project` y `/#/Contact` ofrecen el catálogo y los medios de contacto. El idioma y el tema se guardan en el navegador.

## Desarrollo local

```bash
npm install
npm run dev
npm run lint
npm run build
```

## Contenido

Los datos versionados están en `data/data.json`, `data/experience.json` y `data/projects.json`. Las traducciones y normalización están en `src/content/portfolio/`; `src/lib/portfolioContent.ts` los expone a los componentes. Las imágenes están en `src/assets/images/`. Verifica los enlaces y datos antes de publicarlos.

La selección de inicio está definida por nombre en `src/components/Projects/Projects.tsx`. El catálogo completo conserva el filtro de trabajo profesional y abre cada proyecto en un diálogo con galería cuando hay imágenes. Para comprobar la selección y el filtro, ejecuta `node --test tests/portfolio-projects.test.mjs` con Node 24.

FREX Club reúne la plataforma Laravel y la app Flutter en una experiencia profesional, con contenido en español e inglés y capturas de datos demostrativos. Su autoría, periodo, fuentes y galería se describen en [el caso FREX Club](docs/frex-club.md).

Las contribuciones verificadas de EcoBrush, Resident Check, IMCHISSA, TuxVentas y Voldo, junto con los proyectos personales Finance App y FitLog, se describen en [contribuciones y capturas del portafolio](docs/project-contributions.md). Incluye fechas de intervención, commits de respaldo y reproducción de las galerías con datos ficticios.

La publicación en GitHub Pages requiere autorización separada; `npm run deploy` genera y publica la rama `gh-pages`.

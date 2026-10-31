# Cambio de idioma

El portafolio admite inglés y español con `LanguageProvider` y `useLanguage`. La preferencia se guarda en `localStorage`, actualiza `document.documentElement.lang` y se aplica sin cambiar la ruta. El control de idioma está en `src/components/Header/Header.tsx`.

`src/lib/portfolioContent.ts` reúne los datos de `data/` y las traducciones de `src/content/portfolio/`. Los textos específicos de la nueva presentación están en los componentes de inicio, proyectos y contacto y se seleccionan mediante el idioma del contexto. Al agregar contenido, mantener ambos idiomas y comprobar las tres rutas.

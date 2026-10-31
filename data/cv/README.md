# CV en LaTeX

La versión predeterminada editable está en `source/`: `main.tex` genera el CV en español y `main-en.tex` el de inglés. Sus secciones están en `source/uploads/cv_es.tex` y `cv_en.tex`. Se conserva el formato del archivo recibido. Los proyectos Lavafy y EZTICKET se basan en `data/experience.json`; Lavafy no tiene fechas en esa fuente, por lo que no se afirma cuándo se realizó.

Ambos idiomas reúnen la experiencia y los proyectos en una sola sección. `source/main-soltero.tex` es la variante en español que añade el estado civil al encabezado y comparte el contenido de `uploads/cv_es.tex` con la versión general; su PDF es `output/pdf/main-soltero.pdf`. El PDF `cv-actualizado-es.pdf` es la instantánea anterior a esta reorganización.

`original/prism-projects-2026-10-30.zip` es el archivo recibido sin modificar y `original/extracted/` contiene su extracción. Incluye un archivo de conversación: revisa su contenido antes de compartirlo o publicarlo. El banco `source/uploads/informacion.tex` proviene del original y contiene ejemplos; no se incluye en el CV generado.

## Actualizar o generar

1. Para una solicitud de actualizar el CV, revisa primero `data/data.json`, `data/experience.json` y `data/projects.json`, y confirma cualquier dato nuevo que no esté respaldado. Actualiza ambas versiones cuando corresponda, sin inventar fechas, logros o credenciales.
2. Conserva `source/` como la versión general más actual. Para una variante por puesto, copia `source/` a otra carpeta y adapta esa copia; no sustituyas la versión general salvo que se solicite actualizarla.
3. En Overleaf, crea un proyecto con el contenido de `source/` y selecciona `main.tex` o `main-en.tex` como documento principal. Para compilar localmente en Windows, abre PowerShell en `data/cv/source` y ejecuta:

   ```powershell
   & "$env:USERPROFILE\.local\bin\tectonic.exe" main.tex
   & "$env:USERPROFILE\.local\bin\tectonic.exe" main-en.tex
   & "$env:USERPROFILE\.local\bin\tectonic.exe" main-soltero.tex
   ```

   Los PDF se guardan junto a cada archivo principal; mueve o copia el resultado donde se necesite. Tectonic 0.17.0 se instaló en esa ruta para este usuario y descarga los paquetes LaTeX que faltan durante la primera compilación, por lo que necesita conexión. En otro equipo, instala Tectonic desde su [guía oficial](https://tectonic-typesetting.github.io/book/latest/installation/).
4. Revisa el PDF, sus enlaces y la distribución en páginas antes de entregarlo. Generar el archivo no autoriza enviarlo a terceros; envíalo solo cuando el usuario indique el destinatario y autorice el envío.

Para reproducir el ejemplo original del ZIP sin escribir en la extracción, abre PowerShell en `original/extracted/cv darinel` y ejecuta `& "$env:USERPROFILE\.local\bin\tectonic.exe" --outdir "..\..\..\output\pdf" main.tex`. Se genera `output/pdf/main.pdf`. El original usa `uploads/cv_es.tex`; para cambiar el idioma, modifica una copia y activa solo la entrada correspondiente en `main.tex`. No edites la extracción original para preparar variantes. Los ejemplos `output/pdf/cv-original-es.pdf` y `output/pdf/cv-actualizado-es.pdf` son instantáneas y no se actualizan automáticamente.

El proyecto de Overleaf existente no se sincroniza automáticamente con esta carpeta.

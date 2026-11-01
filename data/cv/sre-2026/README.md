# CV para SRE, TI y digitalización

Variante en español adaptada al concurso de la rama técnico-administrativa de 2026. `main.tex` y `contenido.tex` son la fuente; el PDF generado está en `../output/pdf/cv-sre-ti-2026.pdf`.

Las fechas y descripciones de FREX, EZTICKET y COEPES proceden de `data/experience.json`. Los periodos de EcoBrush y Resident Check describen aportaciones documentadas en `docs/project-contributions.md`, no fechas contractuales. Lavafy figura sin fecha porque esa fuente no registra su periodo. Confirma las fechas, funciones y niveles de idiomas antes de presentar el documento. La convocatoria y el portal deben revisarse para confirmar sus requisitos vigentes; esta variante no acredita por sí sola su cumplimiento.

Para regenerar desde esta carpeta en PowerShell:

```powershell
& "$env:USERPROFILE\.local\bin\tectonic.exe" main.tex
```

El resultado será `main.pdf` en esta carpeta. Revísalo antes de sustituir el PDF de salida. Esta variante es independiente del CV general en `../source/`.

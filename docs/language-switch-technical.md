# Language Switch Technical Documentation

## Overview

The language switch is a lightweight in-app internationalization layer built without external i18n libraries.

It is based on:

- a global React context for the active language
- localized content modules stored in the codebase
- a small adapter that resolves the correct dataset for the current language
- UI components that consume localized content through a single hook

The current supported languages are:

- `en`
- `es`

The language switch does not change routes, URLs, or router behavior. It only changes rendered content and locale-sensitive formatting.

## Main Design Decisions

- No `i18next` or third-party i18n dependency was added.
- Language state is global and persisted in `localStorage`.
- Components consume localized data through `usePortfolioContent()` and presentation copy through `usePresentationCopy()`.
- The source of truth for language is the `LanguageProvider`.
- Locale-sensitive formatting uses language-specific locale values from UI copy, not hardcoded values inside components.

## File Map

Core state:

- [src/context/LanguageProvider.tsx](../src/context/LanguageProvider.tsx)
- [src/hooks/useLanguage.ts](../src/hooks/useLanguage.ts)
- [src/main.tsx](../src/main.tsx)

Localized content resolution:

- [src/lib/portfolioContent.ts](../src/lib/portfolioContent.ts)
- [src/content/portfolio/types.ts](../src/content/portfolio/types.ts)
- [src/content/portfolio/ui.ts](../src/content/portfolio/ui.ts)
- [src/content/portfolio/resume.ts](../src/content/portfolio/resume.ts)
- [src/content/portfolio/experience.ts](../src/content/portfolio/experience.ts)
- [src/content/portfolio/projects.ts](../src/content/portfolio/projects.ts)

UI integration:

- [src/components/Header/Header.tsx](../src/components/Header/Header.tsx)
- [src/components/Header/LanguageToggle.tsx](../src/components/Header/LanguageToggle.tsx)
- [src/hooks/useCurrentTime.ts](../src/hooks/useCurrentTime.ts)
- [src/components/Projects/dateUtils.ts](../src/components/Projects/dateUtils.ts)
- [src/components/DetailsProjects/TechnicalSidebar.tsx](../src/components/DetailsProjects/TechnicalSidebar.tsx)

## Runtime Flow

### 1. App bootstrap

The app is wrapped in `LanguageProvider` at startup in [src/main.tsx](../src/main.tsx).

This makes the language state available to the whole React tree before the router renders the app.

### 2. Language initialization

`LanguageProvider` does three things:

1. Reads `localStorage["language"]`
2. Falls back to `"en"` if there is no valid stored value
3. Exposes the active language through React context

The initialization logic lives in `getInitialLanguage()` inside [src/context/LanguageProvider.tsx](../src/context/LanguageProvider.tsx).

Behavior:

- SSR-safe fallback: if `window` is unavailable, it returns `"en"`
- persisted values accepted today: `"en"` and `"es"`
- any non-`"es"` stored value resolves to `"en"`

### 3. Language side effects

When `language` changes, the provider updates:

- `document.documentElement.lang`
- `localStorage["language"]`

That effect also lives in [src/context/LanguageProvider.tsx](../src/context/LanguageProvider.tsx).

### 4. Consumer access

Components read language state through [src/hooks/useLanguage.ts](../src/hooks/useLanguage.ts), which is a thin wrapper around the provider context.

The exposed API is:

- `language`
- `setLanguage(language)`
- `toggleLanguage()`
- `isEnglish`
- `isSpanish`

## Content Resolution Layer

### `usePortfolioContent()`

The main integration point is [src/lib/portfolioContent.ts](../src/lib/portfolioContent.ts).

It centralizes language-based content resolution.

`usePortfolioContent()`:

- reads the current language from `useLanguage()`
- returns the localized `resume`
- returns the localized `projects`
- returns the localized `ui` copy
- returns `language` as part of the result

This keeps most UI components unaware of the underlying storage format.

### `getPortfolioContent(language)`

Presentation copy for the hero, filters, gallery and contact actions lives in
`src/content/portfolio/presentation.ts`. `usePresentationCopy()` in
`src/lib/portfolioContent.ts` reads the same language context. Both locales
share a checked key set, and switching languages preserves the selected project.

`getPortfolioContent(language)` is the pure function version used by the hook.

It combines:

- `resumeContent[language]`
- `experienceContent[language]`
- `personalProjectsContent[language]`
- `uiCopy[language]`

Projects are merged into a single array:

```ts
projects: [...experienceContent[language], ...personalProjectsContent[language]]
```

## Localized Data Shape

The shared content contracts live in [src/content/portfolio/types.ts](../src/content/portfolio/types.ts).

Important types:

- `Language = "en" | "es"`
- `PortfolioContent`
- `UiCopy`
- `ResumeData`
- `ProjectData`

This is important because both language datasets must respect the same shape.

If `en` and `es` drift structurally, components may compile but fail at runtime with missing copy or partial rendering.

## Header Integration

The header wiring lives in [src/components/Header/Header.tsx](../src/components/Header/Header.tsx).

That component:

- gets `language` and `setLanguage` from `useLanguage()`
- gets `ui` from `usePortfolioContent()`
- renders shared desktop navigation and a native mobile navigation dialog
- passes `language` and `setLanguage` to the shared language toggle

### `LanguageToggle`

The visible switch lives in [src/components/Header/LanguageToggle.tsx](../src/components/Header/LanguageToggle.tsx).

Current behavior:

- renders the destination language as `EN` or `ES`
- describes the destination language in `aria-label` and `title`
- remains keyboard accessible with a visible focus ring
- receives `language` and `setLanguage` as props
- has no local source of truth

That last point is intentional: the component is purely presentational and delegates state changes upward.

## Locale-Sensitive Formatting

The language switch also affects formatting, not only static strings.

### Current time

The redesigned header does not display a clock. This helper remains available for legacy components.

[src/hooks/useCurrentTime.ts](../src/hooks/useCurrentTime.ts) formats the live clock using:

```ts
currentTime.toLocaleTimeString(locale, {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: true,
})
```

The locale comes from:

- `ui.locale.time`

Examples currently configured in [src/content/portfolio/ui.ts](../src/content/portfolio/ui.ts):

- English: `en-US`
- Spanish: `es-MX`

### Project month/year formatting

The catalog groups projects by year. The following formatter remains available for legacy components.

[src/components/Projects/dateUtils.ts](../src/components/Projects/dateUtils.ts) formats dates with:

```ts
toLocaleString(locale, { month: "short", year: "numeric" })
```

Then it normalizes output with:

- `replace(".", "")`
- `toUpperCase()`

This keeps abbreviated month formatting visually consistent across languages.

### Project period

`TechnicalSidebar` displays the available start and end dates using
`locale.date`, long month names, the year, and UTC to avoid date shifts
between time zones. Missing dates are omitted; no duration is inferred.

## Adding or Updating Copy

### Add a new UI string

For presentation strings, add matching keys to both locales in
`src/content/portfolio/presentation.ts` and consume `usePresentationCopy()`.
For the existing shared UI contract, follow the steps below.

1. Add the field to `UiCopy` in [src/content/portfolio/types.ts](../src/content/portfolio/types.ts)
2. Add the value for `en` in [src/content/portfolio/ui.ts](../src/content/portfolio/ui.ts)
3. Add the value for `es` in [src/content/portfolio/ui.ts](../src/content/portfolio/ui.ts)
4. Consume it from `usePortfolioContent()` in the component

### Add a new localized resume/project field

1. Update the relevant shared type in [src/content/portfolio/types.ts](../src/content/portfolio/types.ts)
2. Add the field to both language datasets
3. Keep both datasets structurally aligned
4. Read the field through `usePortfolioContent()`

## Maintenance Rules

- Do not hardcode `en-US`, `es-MX`, or translated copy inside components if it belongs to content configuration.
- Prefer `usePortfolioContent()` instead of importing content files directly in UI components.
- Keep `LanguageToggle` stateless.
- When adding a language-dependent formatter, read locale from `ui.locale.*`.
- Keep `en` and `es` data files in sync structurally.
- If a field is optional in `ProjectData`, UI should hide it rather than render placeholder garbage.

## Known Constraints

- The system currently supports only two languages.
- There is no fallback per string; fallback happens at the language selection layer.
- Route paths are not localized.
- The app uses a custom content-driven approach, so scaling to many languages would likely require a more formal translation workflow.

## Quick Debug Checklist

If language switching stops working, check these points in order:

1. Confirm [src/main.tsx](../src/main.tsx) still wraps the app in `LanguageProvider`.
2. Confirm `useLanguage()` is being called inside the provider tree.
3. Confirm `localStorage["language"]` changes when clicking the switch.
4. Confirm `document.documentElement.lang` updates after a click.
5. Confirm the relevant component reads copy through `usePortfolioContent()`.
6. Confirm both `en` and `es` datasets contain the required field.
7. Confirm the UI is not being overridden by local uncommitted changes in the active worktree.

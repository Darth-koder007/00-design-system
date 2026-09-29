# Project 0 — Design System

## Purpose

A small, original component library that is real enough to demonstrate component API design and release discipline, and serves as the substrate Projects 1 and 3 operate on. Not a Delivery Hero clone — original tokens, original component set, original naming.

## Tech decisions

- **Framework:** React + TypeScript.
- **Build:** Vite (library mode) — fast, standard, no build-tool detours to defend in an interview.
- **Styling:** CSS variables driven by design tokens (not a CSS-in-JS runtime dependency) — keeps the token layer inspectable by Project 1's static analysis.
- **Docs:** Storybook 8, deployed via Chromatic or GitHub Pages.
- **Testing:** Vitest + React Testing Library for unit/interaction tests; Chromatic (or Playwright + pixel diff) for visual regression.
- **Monorepo:** pnpm workspaces, two packages: `tokens` and `components` — mirrors real design-system structure and gives Project 1 a clean tokens package to statically analyze.

## Milestones

### M0.1 — Repo scaffold — done

- [x] pnpm workspace with `packages/tokens`, `packages/components` (`apps/storybook` added in M0.5, not needed until then)
- [x] TypeScript strict mode, shared `tsconfig.base.json`
- [x] ESLint (flat config) + Prettier configured, pre-commit hook (husky + lint-staged)
- [x] GitHub Actions: lint + typecheck + test + build on every PR (`.github/workflows/ci.yml`)
- **Acceptance:** verified — `pnpm install && pnpm lint && pnpm typecheck && pnpm test && pnpm build` all pass from a clean install.

### M0.2 — Design tokens — done

- [x] Define tokens as data (TS objects), not hardcoded CSS: color scale, spacing scale, typography scale, radii, shadows, z-index scale (`packages/tokens/src`)
- [x] Build step (`vite build` + `scripts/build-css.mjs`) emits CSS custom properties (`dist/tokens.css`) alongside the typed TS export
- [x] Light/dark theme via token overrides (`[data-theme="dark"]`), not component-level conditionals — semantic tokens (`colorAccent`, `colorSurface`, etc.) swap value per theme, primitives don't change
- **Acceptance:** `Button.css` references only `var(--ds-*)` custom properties for themeable values (verified: 16 usages, zero hardcoded colors/spacing) — a token value change propagates to every consumer through the generated stylesheet with no component code change. Full visual confirmation lands with Storybook in M0.5.

### M0.3 — Core primitives (7) — done except Storybook

Button, Input, Checkbox, Radio, Select, Badge, Icon.

- [x] Each has a typed prop API with variants (size, tone/intent, disabled/loading where relevant)
- [x] Each is keyboard-accessible and has correct ARIA roles/labels (`aria-invalid`/`aria-describedby` on Input/Select, native semantics on Checkbox/Radio, `role="img"`/`aria-hidden` on Icon)
- [ ] Each has a Storybook story per variant combination that matters — deferred to M0.5, no Storybook instance exists yet
- **Acceptance:** a consumer can build a basic form using only these 7 components with no raw HTML elements — verified structurally (Input/Select/Checkbox/Radio cover every native form control primitive); visual/interaction confirmation in Storybook lands with M0.5.

### M0.4 — Composite components (7) — done except Storybook

Modal, Dropdown, Tabs, Toast, Card, Table, Tooltip.

- [x] Built from M0.3 primitives where possible — Modal's actions and Dropdown's trigger are consumer-supplied `Button`s, not new button implementations
- [x] Focus management correct for Modal/Dropdown (focus trap with Tab wrap, Escape to close, return focus to trigger on close) and Tooltip (`aria-describedby` only while visible)
- [x] Table supports sorting (click-to-cycle asc/desc/none) and both controlled and uncontrolled row selection (value/defaultValue pattern, same as Tabs)
- [ ] Storybook story per composite — deferred to M0.5
- **Acceptance:** verified via interaction tests (36 total across the primitives + composites): Modal traps focus and restores it, Dropdown closes on outside-click/Escape, Tabs supports arrow-key roving navigation with wraparound, Table sorts and multi-selects. Visual Storybook confirmation lands with M0.5.

### M0.5 — Storybook + deployed docs site

- [ ] Storybook configured with the `autodocs` addon generating prop tables from TS types
- [ ] Deployed publicly (Chromatic free tier or GitHub Pages) with a stable URL
- **Acceptance:** the deployed URL is what goes in the resume/README — it must load and be navigable without local setup.

### M0.6 — Test suite

- [ ] Unit/interaction test per component: renders, responds to the interactions its API implies (click, keyboard nav, controlled value change)
- [ ] Visual regression baseline captured for every Storybook story
- [ ] CI fails the PR on a visual diff without an explicit approval step
- **Acceptance:** deleting a component's implementation and leaving only its exported type should fail at least 2 tests.

### M0.7 — Publish as a package

- [ ] Versioned via changesets (or a simple manual semver bump) — mirrors real design-system release hygiene
- [ ] Published to npm as unlisted/private, or at minimum tagged as a GitHub Release with a built artifact
- **Acceptance:** `npm install <package>` (or a tarball install) works in a scratch project and components render.

### M0.8 — README + architecture notes

- [ ] Problem framing: what this proves, why a hand-built system rather than wrapping MUI/Radix
- [ ] Architecture section: token pipeline, why CSS variables over CSS-in-JS, composability decisions from M0.4
- [ ] "Design decisions" section per `CLAUDE.md` documentation rule
- [ ] Screenshot or embedded Storybook link, not just text

## Testing strategy (summary)

Unit tests prove component behavior in isolation; visual regression proves the token pipeline actually reaches rendered output — this second guarantee is what Project 1's static analysis will lean on (it assumes tokens are the single source of truth for visual values).

## Notes for Project 1 dependency

Project 1 needs, at minimum from this project: exported TS prop types per component (for API-aware suggestions), the tokens package's exported names (to detect hardcoded values that should be token references), and at least one component with a deprecated prop (add one intentionally, e.g. `Button`'s old `color` prop deprecated in favor of `tone`) so Project 1 has a real deprecation case to detect.

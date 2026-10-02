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

### M0.3 — Core primitives (7) — done

Button, Input, Checkbox, Radio, Select, Badge, Icon.

- [x] Each has a typed prop API with variants (size, tone/intent, disabled/loading where relevant)
- [x] Each is keyboard-accessible and has correct ARIA roles/labels (`aria-invalid`/`aria-describedby` on Input/Select, native semantics on Checkbox/Radio, `role="img"`/`aria-hidden` on Icon)
- [x] Each has a Storybook story covering its meaningful variants (M0.5)
- **Acceptance:** a consumer can build a basic form using only these 7 components with no raw HTML elements — verified structurally and in Storybook.

### M0.4 — Composite components (7) — done

Modal, Dropdown, Tabs, Toast, Card, Table, Tooltip.

- [x] Built from M0.3 primitives where possible — Modal's actions and Dropdown's trigger are consumer-supplied `Button`s, not new button implementations
- [x] Focus management correct for Modal/Dropdown (focus trap with Tab wrap, Escape to close, return focus to trigger on close) and Tooltip (`aria-describedby` only while visible)
- [x] Table supports sorting (click-to-cycle asc/desc/none) and both controlled and uncontrolled row selection (value/defaultValue pattern, same as Tabs)
- [x] Storybook story per composite (M0.5)
- **Acceptance:** verified via interaction tests (36 total across the primitives + composites) and Storybook stories: Modal traps focus and restores it, Dropdown closes on outside-click/Escape, Tabs supports arrow-key roving navigation with wraparound, Table sorts and multi-selects.

### M0.5 — Storybook + deployed docs site — done, live

- [x] Storybook 8 (`apps/storybook`) configured with `@storybook/addon-essentials` (includes autodocs) and `@storybook/addon-a11y`; a story per primitive/composite, colocated with source (14 files, `packages/components/src/*.stories.tsx`)
- [x] Light/dark theme toolbar wired to the token package's `[data-theme]` mechanism from M0.2
- [x] `pnpm build` at the workspace root now builds tokens → components → storybook in order; verified locally, produces `apps/storybook/storybook-static`
- [x] `.github/workflows/deploy-storybook.yml` added — builds and deploys `storybook-static` to GitHub Pages on push to `main`
- [x] Pushed and deployed for real: **https://darth-koder007.github.io/00-design-system/** — live-verified (title, zero console errors) via a headless browser hit against the real URL, not just "the workflow succeeded"
- **Acceptance:** local build succeeds and is navigable; the public URL is live and verified.

### M0.6 — Test suite — done

- [x] Unit/interaction test per component: 36 tests across 14 files, covering render + the interactions each API implies (click, keyboard nav, controlled/uncontrolled value change, focus management)
- [x] Visual regression baseline captured for every Storybook story — `@storybook/test-runner` + Playwright + `jest-image-snapshot`, self-hosted (no Chromatic account needed), 30 PNG baselines committed under `apps/storybook/__snapshots__`
- [x] CI fails the PR on a visual diff without an explicit approval step — separate `visual` job in `ci.yml`, runs against a fresh Chromium, uploads the diff image as an artifact on failure; accepting a real change requires deliberately running `test:visual:update` locally and committing the new baseline
- **Acceptance:** verified end-to-end — deliberately changed a token color, confirmed 29/30 snapshots failed with the diff correctly detected and a non-zero exit code, then reverted and confirmed a clean pass. Caught a real bug in the process: Vite's library build strips CSS side-effect imports from `dist/index.js`, so `@ds/components` had no working public CSS export — fixed by adding an explicit `"./css": "./dist/components.css"` export (same pattern as `@ds/tokens`), now required reading for anyone consuming this package.

### M0.7 — Publish as a package — done (as a tarball; npm registry publish still optional/not done)

- [x] Manual semver bump to `0.1.0` for both packages + a `CHANGELOG.md` each — real changesets tooling would be the next step if this graduates past a portfolio piece, manual bump matches the plan's "or a simple manual semver bump" allowance
- [x] `files` field added to both `package.json`s so the published tarball ships only `dist/` + `CHANGELOG.md`, not source/tests (initial `pnpm pack` shipped the full `src/` tree — caught and fixed)
- [x] GitHub repo access resolved — `@ds/components`/`@ds/tokens` are consumed as real `link:` dependencies by Projects 1 and 4 now, both verified working against the pushed repo
- [ ] An actual npm registry publish is still not done — optional, not blocking anything else in this portfolio (every consumer uses a workspace/git link, not the npm registry)
- **Acceptance:** verified without needing a registry — `pnpm pack` both packages, installed the resulting tarballs via plain `npm install file:...` in a from-scratch consumer project (no workspace access), rendered `<Button>` with `react-dom/server`, and confirmed both the expected CSS classes and the actual token/component CSS content are present in the installed package. This is the "tarball install" path the acceptance criterion explicitly allows.

### M0.8 — README + architecture notes — done

- [x] Problem framing: what this proves, why a hand-built system rather than wrapping MUI/Radix
- [x] Architecture section: token pipeline, why CSS variables over CSS-in-JS, why CSS is a separate export (the real bug from M0.6/M0.7), composability decisions from M0.4
- [x] "What was actually hard" section per `CLAUDE.md`'s documentation rule
- [x] Live Storybook link added now that M0.5 is deployed: **https://darth-koder007.github.io/00-design-system/**
- **Acceptance:** `README.md` written for a hiring-decision reader per `CLAUDE.md` — leads with what it proves, documents the two real bugs found during development (missing CSS export, screenshot-selector/threshold false negatives in visual testing) rather than only listing what went right.

### M0.9 — Flip repo to public — done

- [x] Pushed to `github.com/Darth-koder007/00-design-system`, public from the start (all milestones here were already complete and verified before the push, so there was no reason to stage through private first)
- **Found and fixed two real CI bugs during the actual push, not just locally:** (1) `pnpm/action-setup@v4`'s explicit `version: 10` conflicted with this repo's own `packageManager: "pnpm@10.33.0"` field in `package.json` — fixed by removing the redundant explicit version (this repo is the only one in the portfolio with a root-level `packageManager` field, so this exact fix doesn't generalize to the others, which still need the explicit version). (2) The visual-regression baselines, captured on macOS during local development, failed 23/30 snapshots in CI (Ubuntu) purely from font/subpixel rendering differences — a real cross-platform visual-regression gap. Fixed properly by adding a `workflow_dispatch` job (`update-visual-baselines.yml`) that regenerates the baselines using CI's own exact environment, rather than hand-matching a local Docker image to GitHub's runner (tried, and still didn't match closely enough — see the commit history for the full chase). Both CI and the Storybook deploy are green on the current `main`.

## Testing strategy (summary)

Unit tests prove component behavior in isolation; visual regression proves the token pipeline actually reaches rendered output — this second guarantee is what Project 1's static analysis will lean on (it assumes tokens are the single source of truth for visual values).

## Notes for Project 1 dependency

Project 1 needs, at minimum from this project: exported TS prop types per component (for API-aware suggestions), the tokens package's exported names (to detect hardcoded values that should be token references), and at least one component with a deprecated prop (add one intentionally, e.g. `Button`'s old `color` prop deprecated in favor of `tone`) so Project 1 has a real deprecation case to detect.

Both `@ds/tokens` and `@ds/components` require a separate CSS import (`@ds/tokens/css`, `@ds/components/css`) alongside the JS import — this is intentional (CSS variables, not CSS-in-JS, per the M0.1 tech decision) but easy to miss; a "missing CSS import" check could itself be a rule candidate for Project 1's assistant.

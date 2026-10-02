# Design System

A small, original React component library — 7 primitives, 7 composites, a token pipeline, Storybook docs, and a self-hosted visual regression suite. Built from scratch rather than wrapping MUI or Radix, because the point was to prove component API design and release discipline, not to prove I can write JSX around someone else's primitives.

**Live Storybook: https://darth-koder007.github.io/00-design-system/**

It also exists to give the next two projects in this portfolio something real to operate on — a design-system-aware AI assistant and a RAG-based doc search need an actual design system with actual conventions (and, deliberately, one actual deprecated prop) to be meaningfully tested against.

## What's in here

- `packages/tokens` — color, spacing, typography, radii, shadow, and z-index primitives as typed TS exports, plus a light/dark semantic theme built on top. A build step emits both a typed JS export and a plain CSS custom-properties file.
- `packages/components` — Button, Input, Checkbox, Radio, Select, Badge, Icon (primitives); Modal, Dropdown, Tabs, Toast, Card, Table, Tooltip (composites). 36 unit/interaction tests.
- `apps/storybook` — a story per component, plus a self-hosted visual regression gate.

## Architecture decisions

**CSS variables, not CSS-in-JS.** Every themeable value in every component is a `var(--ds-*)` reference, resolved from a stylesheet the tokens package generates from its TS token data. This keeps the token layer statically inspectable — a static-analysis tool can grep for `var(--ds-color-accent)` and know exactly what design decision it maps to, which isn't true of a runtime CSS-in-JS value. It also means light/dark theming is just swapping which stylesheet block applies (`:root` vs `[data-theme="dark"]`), not a React context threaded through every component.

**CSS is a separate export, not a JS side effect.** The obvious approach — `import "./Button.css"` inside each component file — works in dev but silently breaks once the package is built: Vite's library mode extracts all CSS into a single `dist/components.css` and strips the side-effect imports from the JS bundle entirely. I hit this directly (see M0.6/M0.7 in `PLAN.md` — Storybook was rendering completely unstyled components for a while, and I only caught it because the visual regression suite's baseline looked suspiciously plain). The fix: an explicit `"./css"` entry in `exports`, and every consumer — including this repo's own Storybook — imports `@ds/components/css` alongside the JS. It's an extra line to remember, and worth documenting loudly rather than hiding, because "just works" isn't true here and pretending otherwise would just mean the next consumer hits the same bug.

**Visual regression without a paid service.** Chromatic is the default reach for design-system visual testing, but it's an external account and a recurring cost for what is, here, a portfolio project. `@storybook/test-runner` + Playwright + `jest-image-snapshot` gets the same guarantee — a PR that changes rendered output fails CI until someone deliberately regenerates the baseline — entirely self-hosted. The tradeoff is a slightly rougher local workflow (baselines are PNGs committed to git, and updating them is a manual `test:visual:update` run) versus Chromatic's hosted review UI.

**Composites are built from primitives, not parallel implementations.** Modal's action buttons and Dropdown's trigger are consumer-supplied `<Button>`s, not a second button-shaped thing living inside the composite. This is a real constraint, not a talking point — it means primitives have to be genuinely composable (forwarding refs, accepting arbitrary event handlers) rather than just visually similar.

## What was actually hard here

Focus management for Modal (trap Tab at the boundaries, restore focus to whatever triggered it, without a focus-trap library) and Table's controlled/uncontrolled duality (selection and sort can each be either controlled or internally managed, mirroring the same pattern used in `Tabs`) were the two places where "looks right" and "is actually correct" diverged the most in testing — both are covered by interaction tests that exercise the real DOM behavior (`toHaveFocus()`, keyboard events), not just prop assertions.

## Running it locally

```bash
pnpm install
pnpm build          # tokens -> components -> storybook, in that order
pnpm test           # 36 unit/interaction tests
pnpm --filter @ds/storybook dev   # Storybook at localhost:6006
pnpm --filter @ds/storybook run test:visual   # visual regression suite (spins up its own server)
```

## Status

Pushed, public, and deployed — see `PLAN.md` for the full milestone breakdown, including two real CI bugs the push itself surfaced (a pnpm-version config conflict, and a cross-platform visual-regression baseline mismatch between macOS and CI's Ubuntu runners), and `PROGRESS.md` (one level up) for cross-project status. An npm registry publish is still optional and not done — every consumer in this portfolio uses a `link:`/workspace dependency, not the registry; see M0.7 in `PLAN.md` for a from-scratch tarball-install test that already proves the packaging works without one.

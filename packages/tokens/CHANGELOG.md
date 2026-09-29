# @ds/tokens

## 0.1.1

- Added a `"./package.json"` export entry, same fix and reason as `@ds/components` 0.1.2.

## 0.1.0

Initial release.

- Color, spacing, typography, radii, shadow, and z-index primitives as typed TS exports.
- Light/dark semantic theme (`lightTheme`/`darkTheme`) built from the primitives.
- `toCssVariables()` build step emitting `dist/tokens.css`, exported as `@ds/tokens/css`.

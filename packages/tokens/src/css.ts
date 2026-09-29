import { color } from "./color";
import { radii } from "./radii";
import { shadow } from "./shadow";
import { spacing } from "./spacing";
import { darkTheme, lightTheme, type Theme } from "./theme";
import { fontFamily, fontSize, fontWeight, lineHeight } from "./typography";
import { zIndex } from "./z-index";

function toKebabCase(key: string): string {
  return key.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
}

function themeVarLines(theme: Theme): string[] {
  return Object.entries(theme).map(([key, value]) => `  --ds-${toKebabCase(key)}: ${value};`);
}

function primitiveVarLines(): string[] {
  const lines: string[] = [];
  for (const [ramp, steps] of Object.entries(color)) {
    for (const [step, value] of Object.entries(steps)) {
      lines.push(`  --ds-color-${ramp}-${step}: ${value};`);
    }
  }
  for (const [key, value] of Object.entries(spacing)) {
    lines.push(`  --ds-spacing-${key}: ${value}px;`);
  }
  for (const [key, value] of Object.entries(radii)) {
    lines.push(`  --ds-radius-${key}: ${value};`);
  }
  for (const [key, value] of Object.entries(shadow)) {
    lines.push(`  --ds-shadow-${key}: ${value};`);
  }
  for (const [key, value] of Object.entries(zIndex)) {
    lines.push(`  --ds-z-${key}: ${value};`);
  }
  lines.push(`  --ds-font-family-base: ${fontFamily.base};`);
  lines.push(`  --ds-font-family-mono: ${fontFamily.mono};`);
  for (const [key, value] of Object.entries(fontSize)) {
    lines.push(`  --ds-font-size-${key}: ${value};`);
  }
  for (const [key, value] of Object.entries(fontWeight)) {
    lines.push(`  --ds-font-weight-${key}: ${value};`);
  }
  for (const [key, value] of Object.entries(lineHeight)) {
    lines.push(`  --ds-line-height-${key}: ${value};`);
  }
  return lines;
}

export function toCssVariables(): string {
  const rootLines = [...primitiveVarLines(), ...themeVarLines(lightTheme)];
  const darkLines = themeVarLines(darkTheme);

  return [":root {", ...rootLines, "}", "", '[data-theme="dark"] {', ...darkLines, "}", ""].join(
    "\n"
  );
}

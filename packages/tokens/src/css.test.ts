import { describe, expect, it } from "vitest";
import { toCssVariables } from "./css";

describe("toCssVariables", () => {
  it("emits primitive and light-theme variables under :root", () => {
    const css = toCssVariables();
    expect(css).toContain(":root {");
    expect(css).toContain("--ds-color-blue-500: #2f7ff0;");
    expect(css).toContain("--ds-spacing-4: 16px;");
    expect(css).toContain("--ds-color-accent: #2f7ff0;");
  });

  it("overrides semantic color variables under [data-theme=dark] without redefining primitives", () => {
    const css = toCssVariables();
    const darkBlock = css.split('[data-theme="dark"] {')[1];
    expect(darkBlock).toContain("--ds-color-accent: #8fbaff;");
    expect(darkBlock).not.toContain("--ds-spacing-4");
  });
});

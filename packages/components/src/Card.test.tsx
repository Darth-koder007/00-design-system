import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Card } from "./Card";

describe("Card", () => {
  it("renders its children inside a padded surface", () => {
    render(<Card>Content</Card>);
    expect(screen.getByText("Content")).toHaveClass("ds-card", "ds-card--padding-md");
  });

  it("applies the requested padding size", () => {
    render(<Card padding="lg">Content</Card>);
    expect(screen.getByText("Content")).toHaveClass("ds-card--padding-lg");
  });
});

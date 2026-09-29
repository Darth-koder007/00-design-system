import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Badge } from "./Badge";

describe("Badge", () => {
  it("renders its content", () => {
    render(<Badge>Beta</Badge>);
    expect(screen.getByText("Beta")).toBeInTheDocument();
  });

  it("applies the tone as a CSS class, defaulting to neutral", () => {
    render(<Badge>Default</Badge>);
    expect(screen.getByText("Default")).toHaveClass("ds-badge--neutral");

    render(<Badge tone="danger">Failing</Badge>);
    expect(screen.getByText("Failing")).toHaveClass("ds-badge--danger");
  });
});

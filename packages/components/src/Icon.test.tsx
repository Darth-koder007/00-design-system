import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Icon } from "./Icon";

describe("Icon", () => {
  it("is hidden from assistive tech when purely decorative", () => {
    const { container } = render(
      <Icon>
        <path d="M4 4h16v16H4z" />
      </Icon>
    );

    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("aria-hidden", "true");
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("exposes an accessible name when a label is given", () => {
    render(
      <Icon label="Close">
        <path d="M4 4h16v16H4z" />
      </Icon>
    );

    expect(screen.getByRole("img", { name: "Close" })).toBeInTheDocument();
  });

  it("applies the size class", () => {
    const { container } = render(
      <Icon size="lg">
        <path d="M4 4h16v16H4z" />
      </Icon>
    );

    expect(container.querySelector("svg")).toHaveClass("ds-icon--lg");
  });
});

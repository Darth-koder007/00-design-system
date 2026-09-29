import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Button } from "./Button";

describe("Button", () => {
  it("renders its children and responds to a click", async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Save</Button>);

    const button = screen.getByRole("button", { name: "Save" });
    await userEvent.click(button);

    expect(onClick).toHaveBeenCalledOnce();
  });

  it("applies size and tone as CSS classes", () => {
    render(
      <Button size="lg" tone="danger">
        Delete
      </Button>
    );

    const button = screen.getByRole("button", { name: "Delete" });
    expect(button).toHaveClass("ds-button--lg", "ds-button--danger");
  });

  it("falls back to the deprecated color prop when tone is not set", () => {
    render(<Button color="danger">Delete</Button>);
    expect(screen.getByRole("button", { name: "Delete" })).toHaveClass("ds-button--danger");
  });

  it("prefers tone over the deprecated color prop when both are given", () => {
    render(
      <Button color="danger" tone="accent">
        Save
      </Button>
    );
    expect(screen.getByRole("button", { name: "Save" })).toHaveClass("ds-button--accent");
  });

  it("is not clickable when disabled", async () => {
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        Save
      </Button>
    );

    await userEvent.click(screen.getByRole("button", { name: "Save" }));

    expect(onClick).not.toHaveBeenCalled();
  });
});

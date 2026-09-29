import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Button } from "./Button";
import { Tooltip } from "./Tooltip";

describe("Tooltip", () => {
  it("is not in the document until the trigger is hovered or focused", async () => {
    render(
      <Tooltip content="Save this document">
        <Button>Save</Button>
      </Tooltip>
    );

    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();

    await userEvent.hover(screen.getByRole("button", { name: "Save" }));

    expect(screen.getByRole("tooltip")).toHaveTextContent("Save this document");
  });

  it("hides again on unhover and links itself via aria-describedby while visible", async () => {
    render(
      <Tooltip content="Save this document">
        <Button>Save</Button>
      </Tooltip>
    );

    const button = screen.getByRole("button", { name: "Save" });
    await userEvent.hover(button);
    const tooltip = screen.getByRole("tooltip");
    expect(button).toHaveAttribute("aria-describedby", tooltip.id);

    await userEvent.unhover(button);

    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });
});

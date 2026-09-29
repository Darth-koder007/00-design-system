import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Button } from "./Button";
import { Dropdown } from "./Dropdown";

function renderDropdown(onSelect = vi.fn()) {
  render(
    <Dropdown
      trigger={<Button>Options</Button>}
      items={[
        { value: "edit", label: "Edit", onSelect },
        { value: "delete", label: "Delete", onSelect: vi.fn() },
      ]}
    />
  );
  return onSelect;
}

describe("Dropdown", () => {
  it("opens the menu on trigger click and closes it on selection", async () => {
    const onSelect = renderDropdown();

    await userEvent.click(screen.getByRole("button", { name: "Options" }));
    expect(screen.getByRole("menu")).toBeInTheDocument();

    await userEvent.click(screen.getByRole("menuitem", { name: "Edit" }));

    expect(onSelect).toHaveBeenCalledOnce();
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("closes on Escape and returns focus to the trigger", async () => {
    renderDropdown();
    const trigger = screen.getByRole("button", { name: "Options" });

    await userEvent.click(trigger);
    expect(screen.getByRole("menu")).toBeInTheDocument();

    await userEvent.keyboard("{Escape}");

    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it("closes when clicking outside the dropdown", async () => {
    renderDropdown();
    render(<div data-testid="outside">outside</div>);

    await userEvent.click(screen.getByRole("button", { name: "Options" }));
    expect(screen.getByRole("menu")).toBeInTheDocument();

    await userEvent.click(screen.getByTestId("outside"));

    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });
});

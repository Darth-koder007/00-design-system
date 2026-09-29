import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";
import { Button } from "./Button";
import { Modal } from "./Modal";

function Harness() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button onClick={() => setOpen(true)}>Open</Button>
      <Modal open={open} onClose={() => setOpen(false)} title="Delete item">
        <p>Are you sure?</p>
        <Button onClick={() => setOpen(false)}>Confirm</Button>
      </Modal>
    </div>
  );
}

describe("Modal", () => {
  it("is not rendered when closed, and moves focus into itself when opened", async () => {
    render(<Harness />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: "Open" }));

    expect(screen.getByRole("dialog", { name: "Delete item" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Close dialog" })).toHaveFocus();
  });

  it("closes on Escape and returns focus to the trigger that opened it", async () => {
    render(<Harness />);
    const openButton = screen.getByRole("button", { name: "Open" });

    await userEvent.click(openButton);
    await userEvent.keyboard("{Escape}");

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(openButton).toHaveFocus();
  });

  it("traps Tab focus within the dialog", async () => {
    render(<Harness />);
    await userEvent.click(screen.getByRole("button", { name: "Open" }));

    const closeButton = screen.getByRole("button", { name: "Close dialog" });
    const confirmButton = screen.getByRole("button", { name: "Confirm" });

    confirmButton.focus();
    await userEvent.tab();

    expect(closeButton).toHaveFocus();
  });

  it("closes when clicking the overlay but not when clicking inside the dialog", async () => {
    const onClose = vi.fn();
    render(
      <Modal open onClose={onClose} title="Delete item">
        <p>Are you sure?</p>
      </Modal>
    );

    await userEvent.click(screen.getByText("Are you sure?"));
    expect(onClose).not.toHaveBeenCalled();

    await userEvent.click(screen.getByRole("dialog").parentElement as HTMLElement);
    expect(onClose).toHaveBeenCalledOnce();
  });
});

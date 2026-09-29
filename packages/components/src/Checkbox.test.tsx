import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";
import { Checkbox } from "./Checkbox";

describe("Checkbox", () => {
  it("toggles checked state on click via its label", async () => {
    const onChange = vi.fn();
    render(<Checkbox label="Accept terms" onChange={onChange} />);

    const checkbox = screen.getByLabelText("Accept terms");
    expect(checkbox).not.toBeChecked();

    await userEvent.click(checkbox);

    expect(onChange).toHaveBeenCalledOnce();
  });

  it("sets the indeterminate DOM property without affecting checked state", () => {
    const ref = createRef<HTMLInputElement>();
    render(<Checkbox ref={ref} label="Select all" indeterminate />);

    expect(ref.current?.indeterminate).toBe(true);
    expect(ref.current?.checked).toBe(false);
  });
});

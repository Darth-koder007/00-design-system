import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Input } from "./Input";

describe("Input", () => {
  it("associates the label with the input via htmlFor/id", () => {
    render(<Input label="Email" />);
    const input = screen.getByLabelText("Email");
    expect(input.tagName).toBe("INPUT");
  });

  it("calls onChange with the typed value", async () => {
    const onChange = vi.fn();
    render(<Input label="Name" onChange={onChange} />);

    await userEvent.type(screen.getByLabelText("Name"), "a");

    expect(onChange).toHaveBeenCalledOnce();
  });

  it("marks the field invalid and exposes help text via aria-describedby", () => {
    render(<Input label="Email" invalid helpText="Enter a valid email" />);
    const input = screen.getByLabelText("Email");

    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAccessibleDescription("Enter a valid email");
  });
});

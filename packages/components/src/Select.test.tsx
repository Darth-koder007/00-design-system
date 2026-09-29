import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Select } from "./Select";

const fruitOptions = [
  { value: "apple", label: "Apple" },
  { value: "pear", label: "Pear" },
];

describe("Select", () => {
  it("lists the given options and reflects the selected value", async () => {
    render(<Select label="Fruit" options={fruitOptions} />);

    const select = screen.getByLabelText("Fruit") as HTMLSelectElement;
    await userEvent.selectOptions(select, "pear");

    expect(select.value).toBe("pear");
  });

  it("renders a disabled placeholder option when provided", () => {
    render(<Select label="Fruit" options={fruitOptions} placeholder="Choose a fruit" />);

    const placeholderOption = screen.getByRole("option", { name: "Choose a fruit" });
    expect(placeholderOption).toBeDisabled();
  });
});

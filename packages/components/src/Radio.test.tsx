import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Radio } from "./Radio";

describe("Radio", () => {
  it("only one option in a native radio group can be selected at a time", async () => {
    render(
      <fieldset>
        <Radio name="plan" value="free" label="Free" defaultChecked />
        <Radio name="plan" value="pro" label="Pro" />
      </fieldset>
    );

    const free = screen.getByLabelText("Free");
    const pro = screen.getByLabelText("Pro");
    expect(free).toBeChecked();

    await userEvent.click(pro);

    expect(pro).toBeChecked();
    expect(free).not.toBeChecked();
  });
});

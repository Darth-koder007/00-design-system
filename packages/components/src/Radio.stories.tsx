import type { Meta, StoryObj } from "@storybook/react";
import { Radio } from "./Radio";

const meta: Meta<typeof Radio> = {
  title: "Primitives/Radio",
  component: Radio,
};

export default meta;
type Story = StoryObj<typeof Radio>;

export const Group: Story = {
  render: () => (
    <fieldset style={{ display: "flex", flexDirection: "column", gap: 8, border: "none" }}>
      <legend>Plan</legend>
      <Radio name="plan" value="free" label="Free" defaultChecked />
      <Radio name="plan" value="pro" label="Pro" />
      <Radio name="plan" value="enterprise" label="Enterprise" disabled />
    </fieldset>
  ),
};

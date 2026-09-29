import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Primitives/Button",
  component: Button,
  args: { children: "Save changes" },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Neutral: Story = { args: { tone: "neutral" } };
export const Accent: Story = { args: { tone: "accent" } };
export const Danger: Story = { args: { tone: "danger" } };
export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
      <Button {...args} size="sm" />
      <Button {...args} size="md" />
      <Button {...args} size="lg" />
    </div>
  ),
};
export const Disabled: Story = { args: { disabled: true } };

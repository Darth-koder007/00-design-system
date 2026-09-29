import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./Input";

const meta: Meta<typeof Input> = {
  title: "Primitives/Input",
  component: Input,
  args: { label: "Email address", placeholder: "you@example.com" },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {};
export const WithHelpText: Story = {
  args: { helpText: "We'll never share your email." },
};
export const Invalid: Story = {
  args: { invalid: true, helpText: "Enter a valid email address." },
};
export const Disabled: Story = { args: { disabled: true } };

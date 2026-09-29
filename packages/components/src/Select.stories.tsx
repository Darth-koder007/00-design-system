import type { Meta, StoryObj } from "@storybook/react";
import { Select } from "./Select";

const fruitOptions = [
  { value: "apple", label: "Apple" },
  { value: "pear", label: "Pear" },
  { value: "peach", label: "Peach", disabled: true },
];

const meta: Meta<typeof Select> = {
  title: "Primitives/Select",
  component: Select,
  args: { label: "Favorite fruit", options: fruitOptions },
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {};
export const WithPlaceholder: Story = { args: { placeholder: "Choose a fruit" } };
export const Invalid: Story = { args: { invalid: true } };

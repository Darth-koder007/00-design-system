import type { Meta, StoryObj } from "@storybook/react";
import { Icon } from "./Icon";

const CheckPath = () => <path d="M5 13l4 4L19 7" strokeWidth="2" strokeLinecap="round" />;

const meta: Meta<typeof Icon> = {
  title: "Primitives/Icon",
  component: Icon,
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
      <Icon size="sm">
        <CheckPath />
      </Icon>
      <Icon size="md">
        <CheckPath />
      </Icon>
      <Icon size="lg">
        <CheckPath />
      </Icon>
    </div>
  ),
};

export const AccessibleLabel: Story = {
  render: () => (
    <Icon label="Task complete">
      <CheckPath />
    </Icon>
  ),
};

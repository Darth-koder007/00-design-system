import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "./Card";

const meta: Meta<typeof Card> = {
  title: "Composites/Card",
  component: Card,
  args: { children: "A surface for grouping related content." },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {};
export const Paddings: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: 12 }}>
      <Card {...args} padding="sm" />
      <Card {...args} padding="md" />
      <Card {...args} padding="lg" />
    </div>
  ),
};

import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./Badge";

const meta: Meta<typeof Badge> = {
  title: "Primitives/Badge",
  component: Badge,
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const AllTones: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 8 }}>
      <Badge tone="neutral">Draft</Badge>
      <Badge tone="accent">New</Badge>
      <Badge tone="success">Shipped</Badge>
      <Badge tone="warning">Pending</Badge>
      <Badge tone="danger">Failed</Badge>
    </div>
  ),
};

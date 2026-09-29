import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";
import { Tooltip } from "./Tooltip";

const meta: Meta<typeof Tooltip> = {
  title: "Composites/Tooltip",
  component: Tooltip,
  args: { content: "Save this document" },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const OnButton: Story = {
  render: (args) => (
    <Tooltip {...args}>
      <Button>Save</Button>
    </Tooltip>
  ),
};

export const Placements: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 48, padding: 48 }}>
      {(["top", "bottom", "left", "right"] as const).map((placement) => (
        <Tooltip key={placement} content={placement} placement={placement}>
          <Button>{placement}</Button>
        </Tooltip>
      ))}
    </div>
  ),
};

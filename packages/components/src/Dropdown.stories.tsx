import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";
import { Dropdown } from "./Dropdown";

const meta: Meta<typeof Dropdown> = {
  title: "Composites/Dropdown",
  component: Dropdown,
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

export const RowActions: Story = {
  render: () => (
    <Dropdown
      trigger={<Button>Options</Button>}
      items={[
        { value: "edit", label: "Edit", onSelect: () => {} },
        { value: "duplicate", label: "Duplicate", onSelect: () => {} },
        { value: "delete", label: "Delete", disabled: true, onSelect: () => {} },
      ]}
    />
  ),
};

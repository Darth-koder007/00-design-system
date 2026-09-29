import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Button } from "./Button";
import { Modal } from "./Modal";

function Demo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Delete item</Button>
      <Modal open={open} onClose={() => setOpen(false)} title="Delete item">
        <p>This action cannot be undone.</p>
        <div style={{ display: "flex", gap: 8, marginTop: 16, justifyContent: "flex-end" }}>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button tone="danger" onClick={() => setOpen(false)}>
            Delete
          </Button>
        </div>
      </Modal>
    </>
  );
}

const meta: Meta<typeof Modal> = {
  title: "Composites/Modal",
  component: Modal,
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const ConfirmationDialog: Story = {
  render: () => <Demo />,
};

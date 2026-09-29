import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";
import { ToastProvider, useToast } from "./Toast";

function Demo() {
  const { showToast } = useToast();
  return (
    <div style={{ display: "flex", gap: 8 }}>
      <Button onClick={() => showToast("Changes saved")}>Neutral</Button>
      <Button tone="accent" onClick={() => showToast("Invite sent", { tone: "success" })}>
        Success
      </Button>
      <Button tone="danger" onClick={() => showToast("Could not save changes", { tone: "danger" })}>
        Danger
      </Button>
    </div>
  );
}

const meta: Meta<typeof ToastProvider> = {
  title: "Composites/Toast",
  component: ToastProvider,
};

export default meta;
type Story = StoryObj<typeof ToastProvider>;

export const Triggered: Story = {
  render: () => (
    <ToastProvider>
      <Demo />
    </ToastProvider>
  ),
};

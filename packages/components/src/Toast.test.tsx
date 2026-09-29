import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ToastProvider, useToast } from "./Toast";

function TriggerButton({ tone, duration }: { tone?: "success" | "danger"; duration: number }) {
  const { showToast } = useToast();
  return (
    <button
      type="button"
      onClick={() => showToast("Saved successfully", { tone: tone ?? "neutral", duration })}
    >
      Trigger
    </button>
  );
}

describe("Toast", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("shows a toast when triggered and auto-dismisses after its duration", () => {
    render(
      <ToastProvider>
        <TriggerButton duration={1000} />
      </ToastProvider>
    );

    fireEvent.click(screen.getByRole("button", { name: "Trigger" }));
    expect(screen.getByText("Saved successfully")).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(screen.queryByText("Saved successfully")).not.toBeInTheDocument();
  });

  it("can be dismissed manually before its timer elapses", () => {
    render(
      <ToastProvider>
        <TriggerButton duration={5000} />
      </ToastProvider>
    );

    fireEvent.click(screen.getByRole("button", { name: "Trigger" }));
    fireEvent.click(screen.getByRole("button", { name: "Dismiss notification" }));

    expect(screen.queryByText("Saved successfully")).not.toBeInTheDocument();
  });

  it("uses role=alert for danger-tone toasts so they interrupt assistive tech", () => {
    render(
      <ToastProvider>
        <TriggerButton tone="danger" duration={5000} />
      </ToastProvider>
    );

    fireEvent.click(screen.getByRole("button", { name: "Trigger" }));

    expect(screen.getByRole("alert")).toHaveTextContent("Saved successfully");
  });
});

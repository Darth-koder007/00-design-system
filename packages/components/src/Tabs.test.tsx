import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Tab, TabList, TabPanel, Tabs } from "./Tabs";

function BasicTabs() {
  return (
    <Tabs defaultValue="profile">
      <TabList>
        <Tab value="profile">Profile</Tab>
        <Tab value="billing">Billing</Tab>
      </TabList>
      <TabPanel value="profile">Profile settings</TabPanel>
      <TabPanel value="billing">Billing settings</TabPanel>
    </Tabs>
  );
}

describe("Tabs", () => {
  it("shows only the panel matching the default active tab", () => {
    render(<BasicTabs />);

    expect(screen.getByText("Profile settings")).toBeInTheDocument();
    expect(screen.queryByText("Billing settings")).not.toBeInTheDocument();
  });

  it("switches panels on click and updates aria-selected", async () => {
    render(<BasicTabs />);

    await userEvent.click(screen.getByRole("tab", { name: "Billing" }));

    expect(screen.getByText("Billing settings")).toBeInTheDocument();
    expect(screen.queryByText("Profile settings")).not.toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Billing" })).toHaveAttribute("aria-selected", "true");
  });

  it("moves selection with ArrowRight/ArrowLeft and wraps at the ends", async () => {
    render(<BasicTabs />);

    const profileTab = screen.getByRole("tab", { name: "Profile" });
    profileTab.focus();

    await userEvent.keyboard("{ArrowRight}");
    expect(screen.getByRole("tab", { name: "Billing" })).toHaveFocus();
    expect(screen.getByText("Billing settings")).toBeInTheDocument();

    await userEvent.keyboard("{ArrowRight}");
    expect(screen.getByRole("tab", { name: "Profile" })).toHaveFocus();
  });
});

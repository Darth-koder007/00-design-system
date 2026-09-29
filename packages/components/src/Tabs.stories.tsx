import type { Meta, StoryObj } from "@storybook/react";
import { Tab, TabList, TabPanel, Tabs } from "./Tabs";

const meta: Meta<typeof Tabs> = {
  title: "Composites/Tabs",
  component: Tabs,
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const AccountSettings: Story = {
  render: () => (
    <Tabs defaultValue="profile">
      <TabList>
        <Tab value="profile">Profile</Tab>
        <Tab value="billing">Billing</Tab>
        <Tab value="notifications">Notifications</Tab>
      </TabList>
      <TabPanel value="profile">Profile settings go here.</TabPanel>
      <TabPanel value="billing">Billing settings go here.</TabPanel>
      <TabPanel value="notifications">Notification preferences go here.</TabPanel>
    </Tabs>
  ),
};

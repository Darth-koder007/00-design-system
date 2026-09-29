import type { Meta, StoryObj } from "@storybook/react";
import { Table, type TableColumn } from "./Table";

interface Invoice {
  id: string;
  customer: string;
  amount: number;
  status: "paid" | "pending";
}

const invoices: Invoice[] = [
  { id: "inv-1", customer: "Acme Corp", amount: 1200, status: "paid" },
  { id: "inv-2", customer: "Globex", amount: 450, status: "pending" },
  { id: "inv-3", customer: "Initech", amount: 980, status: "paid" },
];

const columns: TableColumn<Invoice>[] = [
  { key: "customer", header: "Customer", accessor: (row) => row.customer, sortable: true },
  { key: "amount", header: "Amount", accessor: (row) => row.amount, sortable: true },
  { key: "status", header: "Status", accessor: (row) => row.status },
];

const meta: Meta<typeof Table<Invoice>> = {
  title: "Composites/Table",
  component: Table<Invoice>,
  args: { columns, data: invoices, getRowId: (row: Invoice) => row.id },
};

export default meta;
type Story = StoryObj<typeof Table<Invoice>>;

export const Sortable: Story = {};
export const Selectable: Story = { args: { selectable: true } };

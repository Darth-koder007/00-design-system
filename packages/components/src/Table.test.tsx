import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Table, type TableColumn } from "./Table";

interface Person {
  id: string;
  name: string;
  age: number;
}

const people: Person[] = [
  { id: "1", name: "Bea", age: 34 },
  { id: "2", name: "Ada", age: 41 },
];

const columns: TableColumn<Person>[] = [
  { key: "name", header: "Name", accessor: (row) => row.name, sortable: true },
  { key: "age", header: "Age", accessor: (row) => row.age, sortable: true },
];

describe("Table", () => {
  it("renders one row per data item in the given order by default", () => {
    render(<Table columns={columns} data={people} getRowId={(row) => row.id} />);

    const rows = screen.getAllByRole("row").slice(1);
    expect(rows[0]).toHaveTextContent("Bea");
    expect(rows[1]).toHaveTextContent("Ada");
  });

  it("sorts ascending then descending then back to unsorted on repeated header clicks", async () => {
    render(<Table columns={columns} data={people} getRowId={(row) => row.id} />);
    const nameHeader = screen.getByRole("button", { name: /Name/ });

    await userEvent.click(nameHeader);
    let rows = screen.getAllByRole("row").slice(1);
    expect(rows[0]).toHaveTextContent("Ada");

    await userEvent.click(nameHeader);
    rows = screen.getAllByRole("row").slice(1);
    expect(rows[0]).toHaveTextContent("Bea");

    await userEvent.click(nameHeader);
    rows = screen.getAllByRole("row").slice(1);
    expect(rows[0]).toHaveTextContent("Bea");
  });

  it("supports row selection with a select-all checkbox", async () => {
    const onSelectionChange = vi.fn();
    render(
      <Table
        columns={columns}
        data={people}
        getRowId={(row) => row.id}
        selectable
        onSelectionChange={onSelectionChange}
      />
    );

    await userEvent.click(screen.getByLabelText("Select row 1"));
    expect(onSelectionChange).toHaveBeenLastCalledWith(["1"]);

    await userEvent.click(screen.getByLabelText("Select all rows"));
    expect(onSelectionChange).toHaveBeenLastCalledWith(["1", "2"]);
  });
});

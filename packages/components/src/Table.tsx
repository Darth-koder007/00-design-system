import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";

export type SortDirection = "asc" | "desc";

export interface SortState {
  columnKey: string;
  direction: SortDirection;
}

export interface TableColumn<T> {
  key: string;
  header: string;
  render?: (row: T) => ReactNode;
  accessor?: (row: T) => string | number;
  sortable?: boolean;
}

export interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  getRowId: (row: T) => string;
  selectable?: boolean;
  selectedIds?: string[];
  defaultSelectedIds?: string[];
  onSelectionChange?: (ids: string[]) => void;
  sort?: SortState | null;
  defaultSort?: SortState | null;
  onSortChange?: (sort: SortState | null) => void;
}

function nextDirection(current: SortDirection | undefined): SortDirection | undefined {
  if (current === undefined) return "asc";
  if (current === "asc") return "desc";
  return undefined;
}

export function Table<T>({
  columns,
  data,
  getRowId,
  selectable = false,
  selectedIds,
  defaultSelectedIds = [],
  onSelectionChange,
  sort,
  defaultSort = null,
  onSortChange,
}: TableProps<T>) {
  const [internalSelected, setInternalSelected] = useState(new Set(defaultSelectedIds));
  const [internalSort, setInternalSort] = useState<SortState | null>(defaultSort);

  const isSelectionControlled = selectedIds !== undefined;
  const activeSelected = isSelectionControlled ? new Set(selectedIds) : internalSelected;

  const isSortControlled = sort !== undefined;
  const activeSort = isSortControlled ? sort : internalSort;

  const headerCheckboxRef = useRef<HTMLInputElement>(null);

  const sortedData = useMemo(() => {
    if (!activeSort) return data;
    const column = columns.find((candidate) => candidate.key === activeSort.columnKey);
    if (!column?.accessor) return data;

    const accessor = column.accessor;
    const factor = activeSort.direction === "asc" ? 1 : -1;
    return [...data].sort((a, b) => {
      const left = accessor(a);
      const right = accessor(b);
      if (left < right) return -1 * factor;
      if (left > right) return 1 * factor;
      return 0;
    });
  }, [data, activeSort, columns]);

  const allIds = sortedData.map(getRowId);
  const selectedCount = allIds.filter((id) => activeSelected.has(id)).length;
  const allSelected = allIds.length > 0 && selectedCount === allIds.length;
  const partiallySelected = selectedCount > 0 && !allSelected;

  useEffect(() => {
    if (headerCheckboxRef.current) headerCheckboxRef.current.indeterminate = partiallySelected;
  }, [partiallySelected]);

  const commitSelection = (ids: Set<string>) => {
    if (!isSelectionControlled) setInternalSelected(ids);
    onSelectionChange?.(Array.from(ids));
  };

  const toggleRow = (id: string) => {
    const next = new Set(activeSelected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    commitSelection(next);
  };

  const toggleAll = () => {
    commitSelection(allSelected ? new Set() : new Set(allIds));
  };

  const handleSort = (column: TableColumn<T>) => {
    if (!column.sortable) return;
    const currentDirection =
      activeSort?.columnKey === column.key ? activeSort.direction : undefined;
    const direction = nextDirection(currentDirection);
    const next = direction ? { columnKey: column.key, direction } : null;
    if (!isSortControlled) setInternalSort(next);
    onSortChange?.(next);
  };

  return (
    <table className="ds-table">
      <thead>
        <tr>
          {selectable && (
            <th className="ds-table-cell ds-table-cell--checkbox">
              <input
                ref={headerCheckboxRef}
                type="checkbox"
                aria-label="Select all rows"
                checked={allSelected}
                onChange={toggleAll}
              />
            </th>
          )}
          {columns.map((column) => {
            const isActive = activeSort?.columnKey === column.key;
            return (
              <th key={column.key} className="ds-table-cell ds-table-header-cell">
                {column.sortable ? (
                  <button
                    type="button"
                    className="ds-table-sort-button"
                    onClick={() => handleSort(column)}
                    aria-sort={
                      isActive
                        ? activeSort.direction === "asc"
                          ? "ascending"
                          : "descending"
                        : "none"
                    }
                  >
                    {column.header}
                    {isActive && (
                      <span aria-hidden="true">{activeSort.direction === "asc" ? " ▲" : " ▼"}</span>
                    )}
                  </button>
                ) : (
                  column.header
                )}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {sortedData.map((row) => {
          const id = getRowId(row);
          return (
            <tr key={id} className="ds-table-row">
              {selectable && (
                <td className="ds-table-cell ds-table-cell--checkbox">
                  <input
                    type="checkbox"
                    aria-label={`Select row ${id}`}
                    checked={activeSelected.has(id)}
                    onChange={() => toggleRow(id)}
                  />
                </td>
              )}
              {columns.map((column) => (
                <td key={column.key} className="ds-table-cell">
                  {column.render ? column.render(row) : String(column.accessor?.(row) ?? "")}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

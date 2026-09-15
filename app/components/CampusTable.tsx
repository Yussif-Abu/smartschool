"use client";

import { useCreateAtom, useSelector } from "@tanstack/react-store";
import {
  createColumnHelper,
  type PaginationState,
  type SortingState,
} from "@tanstack/react-table";
import { useCallback, useEffect, useState } from "react";
import type { Campus } from "@/constants/campuses";
import { DataGrid, dataGridFeatures, type DataGridFilter } from "./DataGrid";

export type CampusTableUrlState = {
  pageIndex: number;
  pageSize: number;
  query: string;
  sorting: SortingState;
};

const columnHelper = createColumnHelper<typeof dataGridFeatures, Campus>();

const columns = columnHelper.columns([
  columnHelper.accessor("campusName", {
    header: "Campus",
    sortFn: "text",
    cell: ({ getValue, row }) => (
      <div>
        <p className="data-grid-primary-value">{getValue()}</p>
        <p className="data-grid-secondary-value">{row.original.email}</p>
      </div>
    ),
  }),
  columnHelper.accessor("campusCode", {
    header: "Code",
    sortFn: "alphanumeric",
  }),
  columnHelper.accessor("campusHead", {
    header: "Campus Head",
    sortFn: "text",
  }),
  columnHelper.accessor("cityTown", { header: "City / Town", sortFn: "text" }),
  columnHelper.accessor("region", { header: "Region", sortFn: "text" }),
  columnHelper.accessor("studentCapacity", {
    header: "Capacity",
    sortFn: "alphanumeric",
  }),
  columnHelper.accessor("status", {
    header: "Status",
    sortFn: "text",
    cell: ({ getValue }) => {
      const status = getValue();
      const color =
        status === "Active" ? "status-badge-active" : "status-badge-inactive";
      return <span className={`status-badge ${color}`}>{status}</span>;
    },
  }),
]);

const filters: DataGridFilter[] = [
  {
    allLabel: "All statuses",
    columnId: "status",
    label: "Status",
    options: [
      { label: "Active", value: "Active" },
      { label: "Inactive", value: "Inactive" },
    ],
  },
  {
    allLabel: "All regions",
    columnId: "region",
    label: "Region",
    options: [{ label: "Greater Accra", value: "Greater Accra" }],
  },
];

function syncTableUrl(
  query: string,
  sorting: SortingState,
  pagination: PaginationState,
) {
  const params = new URLSearchParams(window.location.search);

  if (query) params.set("q", query);
  else params.delete("q");
  if (sorting[0])
    params.set("sort", `${sorting[0].id}.${sorting[0].desc ? "desc" : "asc"}`);
  else params.delete("sort");
  if (pagination.pageIndex)
    params.set("page", String(pagination.pageIndex + 1));
  else params.delete("page");
  if (pagination.pageSize !== 5)
    params.set("size", String(pagination.pageSize));
  else params.delete("size");

  const queryString = params.toString();
  window.history.replaceState(
    null,
    "",
    `${window.location.pathname}${queryString ? `?${queryString}` : ""}${window.location.hash}`,
  );
}

type CampusTableProps = {
  initialData: Campus[];
  initialUrlState: CampusTableUrlState;
};

export function CampusTable({
  initialData,
  initialUrlState,
}: CampusTableProps) {
  const [rows, setRows] = useState(initialData);
  const globalFilter = useCreateAtom<unknown>(initialUrlState.query);
  const sorting = useCreateAtom<SortingState>(initialUrlState.sorting);
  const pagination = useCreateAtom<PaginationState>({
    pageIndex: initialUrlState.pageIndex,
    pageSize: initialUrlState.pageSize,
  });
  const queryValue = useSelector(globalFilter, (value) => String(value ?? ""));
  const sortingValue = useSelector(sorting);
  const paginationValue = useSelector(pagination);

  useEffect(() => {
    syncTableUrl(queryValue, sortingValue, paginationValue);
  }, [paginationValue, queryValue, sortingValue]);

  const handleEdit = useCallback((campus: Campus) => {
    window.alert(`Edit ${campus.campusName}`);
  }, []);

  const handleDelete = useCallback((campus: Campus) => {
    if (!window.confirm(`Delete ${campus.campusName}?`)) return;
    setRows((current) =>
      current.filter((row) => row.campusCode !== campus.campusCode),
    );
  }, []);

  return (
    <DataGrid
      atoms={{ globalFilter, pagination, sorting }}
      columns={columns}
      data={rows}
      exportFileName="campuses"
      filters={filters}
      getRowId={(campus) => campus.campusCode}
      onDelete={handleDelete}
      onEdit={handleEdit}
      searchLabel="Search campuses"
    />
  );
}

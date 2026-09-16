"use client";

import { useCreateAtom, useSelector } from "@tanstack/react-store";
import {
  createColumnHelper,
  type PaginationState,
  type SortingState,
} from "@tanstack/react-table";
import { useCallback, useEffect, useState } from "react";
import type { Staff } from "@/constants/staff";
import { capturePostHogEvent } from "@/helper/posthog";
import { DataGrid, dataGridFeatures, type DataGridFilter } from "./DataGrid";

export type StaffTableUrlState = {
  pageIndex: number;
  pageSize: number;
  query: string;
  sorting: SortingState;
};

const columnHelper = createColumnHelper<typeof dataGridFeatures, Staff>();

const columns = columnHelper.columns([
  columnHelper.accessor(
    (staffMember) => `${staffMember.firstName} ${staffMember.lastName}`,
    {
      id: "name",
      header: "Staff Member",
      sortFn: "text",
      cell: ({ getValue, row }) => (
        <div>
          <p className="data-grid-primary-value">{getValue()}</p>
          <p className="data-grid-secondary-value">{row.original.email}</p>
        </div>
      ),
    },
  ),
  columnHelper.accessor("staffNumber", {
    header: "Staff Number",
    sortFn: "alphanumeric",
  }),
  columnHelper.accessor("jobRole", { header: "Job Role", sortFn: "text" }),
  columnHelper.accessor("department", { header: "Department", sortFn: "text" }),
  columnHelper.accessor("campus", { header: "Campus", sortFn: "text" }),
  columnHelper.accessor("status", {
    header: "Status",
    sortFn: "text",
    cell: ({ getValue }) => {
      const status = getValue();
      const color =
        status === "Active"
          ? "status-badge-active"
          : status === "Pending"
            ? "status-badge-pending"
            : "status-badge-inactive";
      return <span className={`status-badge ${color}`}>{status}</span>;
    },
  }),
]);

const filters: DataGridFilter[] = [
  {
    allLabel: "All campuses",
    columnId: "campus",
    label: "Campus",
    options: [
      { label: "Central Campus", value: "Central Campus" },
      { label: "North Campus", value: "North Campus" },
      { label: "West Campus", value: "West Campus" },
    ],
  },
  {
    allLabel: "All statuses",
    columnId: "status",
    label: "Status",
    options: [
      { label: "Active", value: "Active" },
      { label: "Inactive", value: "Inactive" },
      { label: "Pending", value: "Pending" },
    ],
  },
  {
    allLabel: "All departments",
    columnId: "department",
    label: "Department",
    options: [
      { label: "Administration", value: "Administration" },
      { label: "Finance", value: "Finance" },
      { label: "Facilities", value: "Facilities" },
    ],
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

type StaffTableProps = {
  initialData: Staff[];
  initialUrlState: StaffTableUrlState;
};

export function StaffTable({ initialData, initialUrlState }: StaffTableProps) {
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

  const handleEdit = useCallback((staffMember: Staff) => {
    window.alert(`Edit ${staffMember.firstName} ${staffMember.lastName}`);
  }, []);

  const handleDelete = useCallback((staffMember: Staff) => {
    if (
      !window.confirm(
        `Delete ${staffMember.firstName} ${staffMember.lastName}?`,
      )
    )
      return;
    capturePostHogEvent("staff_deleted", {
      entity_type: "staff",
      source: "data_grid",
    });
    setRows((current) =>
      current.filter((row) => row.staffNumber !== staffMember.staffNumber),
    );
  }, []);

  return (
    <DataGrid
      atoms={{ globalFilter, pagination, sorting }}
      columns={columns}
      data={rows}
      exportFileName="staff"
      filters={filters}
      getRowId={(staffMember) => staffMember.staffNumber}
      onDelete={handleDelete}
      onEdit={handleEdit}
      searchLabel="Search staff"
    />
  );
}

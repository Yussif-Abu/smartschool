"use client";

import { useCreateAtom, useSelector } from "@tanstack/react-store";
import {
  createColumnHelper,
  type PaginationState,
  type SortingState,
} from "@tanstack/react-table";
import { useCallback, useEffect, useState } from "react";
import type { Teacher } from "@/constants/teachers";
import { DataGrid, dataGridFeatures, type DataGridFilter } from "./DataGrid";

export type TeachersTableUrlState = {
  pageIndex: number;
  pageSize: number;
  query: string;
  sorting: SortingState;
};

const columnHelper = createColumnHelper<typeof dataGridFeatures, Teacher>();

const columns = columnHelper.columns([
  columnHelper.accessor(
    (teacher) => `${teacher.title} ${teacher.firstName} ${teacher.lastName}`,
    {
      id: "name",
      header: "Teacher",
      sortFn: "text",
      cell: ({ getValue, row }) => (
        <div>
          <p className="data-grid-primary-value">{getValue()}</p>
          <p className="data-grid-secondary-value">{row.original.email}</p>
        </div>
      ),
    },
  ),
  columnHelper.accessor("teacherNumber", {
    header: "Teacher Number",
    sortFn: "alphanumeric",
  }),
  columnHelper.accessor("department", { header: "Department", sortFn: "text" }),
  columnHelper.accessor("employmentType", {
    header: "Employment Type",
    sortFn: "text",
  }),
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
      { label: "Pending", value: "Pending" },
      { label: "Inactive", value: "Inactive" },
    ],
  },
  {
    allLabel: "All departments",
    columnId: "department",
    label: "Department",
    options: [
      { label: "Mathematics", value: "Mathematics" },
      { label: "Science", value: "Science" },
      { label: "English", value: "English" },
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

type TeachersTableProps = {
  initialData: Teacher[];
  initialUrlState: TeachersTableUrlState;
};

export function TeachersTable({
  initialData,
  initialUrlState,
}: TeachersTableProps) {
  const [rows, setRows] = useState(initialData);

  // Routing owns only the state users should be able to share or refresh.
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

  const handleEdit = useCallback((teacher: Teacher) => {
    window.alert(`Edit ${teacher.firstName} ${teacher.lastName}`);
  }, []);

  const handleDelete = useCallback((teacher: Teacher) => {
    if (!window.confirm(`Delete ${teacher.firstName} ${teacher.lastName}?`))
      return;
    setRows((current) =>
      current.filter((row) => row.teacherNumber !== teacher.teacherNumber),
    );
  }, []);

  return (
    <DataGrid
      atoms={{ globalFilter, pagination, sorting }}
      columns={columns}
      data={rows}
      exportFileName="teachers"
      filters={filters}
      getRowId={(teacher) => teacher.teacherNumber}
      onDelete={handleDelete}
      onEdit={handleEdit}
      searchLabel="Search teachers"
    />
  );
}

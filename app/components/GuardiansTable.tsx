"use client";

import { useCreateAtom, useSelector } from "@tanstack/react-store";
import {
  createColumnHelper,
  type PaginationState,
  type SortingState,
} from "@tanstack/react-table";
import { useCallback, useEffect, useState } from "react";
import type { Guardian } from "@/constants/guardians";
import { capturePostHogEvent } from "@/helper/posthog";
import { DataGrid, dataGridFeatures, type DataGridFilter } from "./DataGrid";

export type GuardiansTableUrlState = {
  pageIndex: number;
  pageSize: number;
  query: string;
  sorting: SortingState;
};

const columnHelper = createColumnHelper<typeof dataGridFeatures, Guardian>();

const columns = columnHelper.columns([
  columnHelper.accessor(
    (guardian) => `${guardian.firstName} ${guardian.lastName}`,
    {
      id: "name",
      header: "Guardian",
      sortFn: "text",
      cell: ({ getValue, row }) => (
        <div>
          <p className="data-grid-primary-value">{getValue()}</p>
          <p className="data-grid-secondary-value">{row.original.email}</p>
        </div>
      ),
    },
  ),
  columnHelper.accessor("guardianId", {
    header: "Guardian ID",
    sortFn: "alphanumeric",
  }),
  columnHelper.accessor("linkedStudent", {
    header: "Linked Student",
    sortFn: "alphanumeric",
  }),
  columnHelper.accessor("primaryPhone", {
    header: "Primary Phone",
    sortFn: "text",
  }),
  columnHelper.accessor("preferredCommunication", {
    header: "Preferred Contact",
    sortFn: "text",
  }),
  columnHelper.accessor("portalAccess", {
    header: "Portal Access",
    sortFn: "text",
    cell: ({ getValue }) => {
      const access = getValue();
      const color =
        access === "Enabled" ? "status-badge-active" : "status-badge-inactive";
      return <span className={`status-badge ${color}`}>{access}</span>;
    },
  }),
]);

const filters: DataGridFilter[] = [
  {
    allLabel: "All portal access",
    columnId: "portalAccess",
    label: "Portal Access",
    options: [
      { label: "Enabled", value: "Enabled" },
      { label: "Disabled", value: "Disabled" },
    ],
  },
  {
    allLabel: "All communication methods",
    columnId: "preferredCommunication",
    label: "Communication",
    options: [
      { label: "SMS", value: "SMS" },
      { label: "Email", value: "Email" },
      { label: "Phone", value: "Phone" },
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

type GuardiansTableProps = {
  initialData: Guardian[];
  initialUrlState: GuardiansTableUrlState;
};

export function GuardiansTable({
  initialData,
  initialUrlState,
}: GuardiansTableProps) {
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

  const handleEdit = useCallback((guardian: Guardian) => {
    window.alert(`Edit ${guardian.firstName} ${guardian.lastName}`);
  }, []);

  const handleDelete = useCallback((guardian: Guardian) => {
    if (!window.confirm(`Delete ${guardian.firstName} ${guardian.lastName}?`))
      return;
    capturePostHogEvent("guardian_deleted", {
      entity_type: "guardian",
      source: "data_grid",
    });
    setRows((current) =>
      current.filter((row) => row.guardianId !== guardian.guardianId),
    );
  }, []);

  return (
    <DataGrid
      atoms={{ globalFilter, pagination, sorting }}
      columns={columns}
      data={rows}
      exportFileName="guardians"
      filters={filters}
      getRowId={(guardian) => guardian.guardianId}
      onDelete={handleDelete}
      onEdit={handleEdit}
      searchLabel="Search guardians"
    />
  );
}

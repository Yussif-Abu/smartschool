"use client";

import { useCreateAtom, useSelector } from "@tanstack/react-store";
import {
  createColumnHelper,
  type PaginationState,
  type SortingState,
} from "@tanstack/react-table";
import { useCallback, useEffect, useState } from "react";

import type { Subject } from "@/constants/subject";
import { capturePostHogEvent } from "@/helper/posthog";
import { DataGrid, dataGridFeatures, type DataGridFilter } from "./DataGrid";

export type SubjectTableUrlState = {
  pageIndex: number;
  pageSize: number;
  query: string;
  sorting: SortingState;
};

const columnHelper = createColumnHelper<typeof dataGridFeatures, Subject>();

const columns = columnHelper.columns([
  columnHelper.accessor("code", {
    header: "Code",
    sortFn: "alphanumeric",
  }),
  columnHelper.accessor("subject", {
    header: "Subject",
    sortFn: "text",
  }),
  columnHelper.accessor("department", {
    header: "Department",
    sortFn: "text",
  }),
]);

const filters: DataGridFilter[] = [
  {
    allLabel: "All departments",
    columnId: "department",
    label: "Department",
    options: [
      { label: "STEM", value: "STEM" },
      { label: "Science", value: "Science" },
      { label: "Humanities", value: "Humanities" },
      { label: "Social Studies", value: "Social Studies" },
      { label: "Commerce", value: "Commerce" },
      { label: "Creative Arts", value: "Creative Arts" },
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

type SubjectTableProps = {
  initialData: Subject[];
  initialUrlState: SubjectTableUrlState;
};

export function SubjectTable({
  initialData,
  initialUrlState,
}: SubjectTableProps) {
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

  const handleEdit = useCallback((subject: Subject) => {
    window.alert(`Edit ${subject.subject}`);
  }, []);

  const handleDelete = useCallback((subject: Subject) => {
    if (!window.confirm(`Delete ${subject.subject}?`)) return;
    capturePostHogEvent("subject_deleted", {
      entity_type: "subject",
      source: "data_grid",
    });
    setRows((current) => current.filter((row) => row.code !== subject.code));
  }, []);

  return (
    <DataGrid
      atoms={{ globalFilter, pagination, sorting }}
      columns={columns}
      data={rows}
      exportFileName="subjects"
      filters={filters}
      getRowId={(subject) => subject.code}
      onDelete={handleDelete}
      onEdit={handleEdit}
      searchLabel="Search subjects"
    />
  );
}

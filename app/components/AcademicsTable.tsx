"use client";

import { useCreateAtom, useSelector } from "@tanstack/react-store";
import {
  createColumnHelper,
  type PaginationState,
  type SortingState,
} from "@tanstack/react-table";
import { useCallback, useEffect, useState } from "react";

import type { Academic} from "@/constants/academics";
import { capturePostHogEvent } from "@/helper/posthog";
import { DataGrid, dataGridFeatures, type DataGridFilter } from "./DataGrid";

export type AcademicTableUrlState = {
  pageIndex: number;
  pageSize: number;
  query: string;
  sorting: SortingState;
};

const columnHelper = createColumnHelper<
  typeof dataGridFeatures,
  Academic
>();

const columns = columnHelper.columns([
  columnHelper.accessor("id", {
    header: "ID",
    sortFn: "alphanumeric",
  }),
  columnHelper.accessor("grade", {
    header: "Grade",
    sortFn: "alphanumeric",
  }),
  columnHelper.accessor("className", {
    header: "Class Name",
    sortFn: "text",
  }),
  columnHelper.accessor("stream", {
    header: "Stream",
    sortFn: "text",
  }),
  columnHelper.accessor("formTeacher", {
    header: "Form Teacher",
    sortFn: "text",
  }),
  columnHelper.accessor("campus", {
    header: "Campus",
    sortFn: "text",
  }),
  columnHelper.accessor("students", {
    header: "Students",
    sortFn: "alphanumeric",
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
    allLabel: "All grades",
    columnId: "grade",
    label: "Grade",
    options: [
      { label: "Grade 7", value: "Grade 7" },
      { label: "Grade 8", value: "Grade 8" },
      { label: "Grade 9", value: "Grade 9" },
      { label: "Grade 10", value: "Grade 10" },
      { label: "Grade 11", value: "Grade 11" },
      { label: "Grade 12", value: "Grade 12" },
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

type AcademicsTableProps = {
  initialData: Academic[];
  initialUrlState: AcademicTableUrlState;
};

export function AcademicsTable({
  initialData,
  initialUrlState,
}: AcademicsTableProps) {
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

  const handleEdit = useCallback((academicClass: Academic) => {
    window.alert(`Edit ${academicClass.className}`);
  }, []);

  const handleDelete = useCallback((academicClass: Academic) => {
    if (!window.confirm(`Delete ${academicClass.className}?`)) return;
    capturePostHogEvent("class_deleted", {
      entity_type: "academic_class",
      source: "data_grid",
    });
    setRows((current) => current.filter((row) => row.id !== academicClass.id));
  }, []);

  return (
    <DataGrid
      atoms={{ globalFilter, pagination, sorting }}
      columns={columns}
      data={rows}
      exportFileName="academics"
      filters={filters}
      getRowId={(academic) => academic.id}
      onDelete={handleDelete}
      onEdit={handleEdit}
      searchLabel="Search classes"
    />
  );
}

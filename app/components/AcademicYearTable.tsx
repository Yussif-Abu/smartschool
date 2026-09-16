"use client";

import { useCreateAtom, useSelector } from "@tanstack/react-store";
import {
  createColumnHelper,
  type PaginationState,
  type SortingState,
} from "@tanstack/react-table";
import { useCallback, useEffect, useState } from "react";

import type { AcademicYear } from "@/constants/academic_year";
import { capturePostHogEvent } from "@/helper/posthog";
import { DataGrid, dataGridFeatures, type DataGridFilter } from "./DataGrid";

export type AcademicYearTableUrlState = {
  pageIndex: number;
  pageSize: number;
  query: string;
  sorting: SortingState;
};

const columnHelper = createColumnHelper<
  typeof dataGridFeatures,
  AcademicYear
>();

const columns = columnHelper.columns([
  columnHelper.accessor("academicYear", {
    header: "Academic Year",
    sortFn: "text",
  }),
  columnHelper.accessor("startDate", {
    header: "Start Date",
    sortFn: "text",
  }),
  columnHelper.accessor("endDate", {
    header: "End Date",
    sortFn: "text",
  }),
]);

const filters: DataGridFilter[] = [
  {
    allLabel: "All academic years",
    columnId: "academicYear",
    label: "Academic Year",
    options: [
      { label: "2024/2025", value: "2024/2025" },
      { label: "2025/2026", value: "2025/2026" },
      { label: "2026/2027", value: "2026/2027" },
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

type AcademicYearTableProps = {
  initialData: AcademicYear[];
  initialUrlState: AcademicYearTableUrlState;
};

export function AcademicYearTable({
  initialData,
  initialUrlState,
}: AcademicYearTableProps) {
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

  const handleEdit = useCallback((academicYear: AcademicYear) => {
    window.alert(`Edit ${academicYear.academicYear}`);
  }, []);

  const handleDelete = useCallback((academicYear: AcademicYear) => {
    if (!window.confirm(`Delete ${academicYear.academicYear}?`)) return;
    capturePostHogEvent("academic_year_deleted", {
      entity_type: "academic_year",
      source: "data_grid",
    });
    setRows((current) =>
      current.filter((row) => row.academicYear !== academicYear.academicYear),
    );
  }, []);

  return (
    <DataGrid
      atoms={{ globalFilter, pagination, sorting }}
      columns={columns}
      data={rows}
      exportFileName="academic-years"
      filters={filters}
      getRowId={(academicYear) => academicYear.academicYear}
      onDelete={handleDelete}
      onEdit={handleEdit}
      searchLabel="Search academic years"
    />
  );
}

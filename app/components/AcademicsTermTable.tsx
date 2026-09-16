"use client";

import { useCreateAtom, useSelector } from "@tanstack/react-store";
import {
  createColumnHelper,
  type PaginationState,
  type SortingState,
} from "@tanstack/react-table";
import { useCallback, useEffect, useState } from "react";

import type { AcademicTerm } from "@/constants/academicTerm";
import { capturePostHogEvent } from "@/helper/posthog";
import { DataGrid, dataGridFeatures, type DataGridFilter } from "./DataGrid";

export type AcademicTermTableUrlState = {
  pageIndex: number;
  pageSize: number;
  query: string;
  sorting: SortingState;
};

const columnHelper = createColumnHelper<
  typeof dataGridFeatures,
  AcademicTerm
>();

const columns = columnHelper.columns([
  columnHelper.accessor("term", {
    header: "Term",
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
    allLabel: "All terms",
    columnId: "term",
    label: "Term",
    options: [
      { label: "Term 1", value: "Term 1" },
      { label: "Term 2", value: "Term 2" },
      { label: "Term 3", value: "Term 3" },
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

type AcademicTermTableProps = {
  initialData: AcademicTerm[];
  initialUrlState: AcademicTermTableUrlState;
};

export function AcademicsTermTable({
  initialData,
  initialUrlState,
}: AcademicTermTableProps) {
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

  const handleEdit = useCallback((term: AcademicTerm) => {
    window.alert(`Edit ${term.term}`);
  }, []);

  const handleDelete = useCallback((term: AcademicTerm) => {
    if (!window.confirm(`Delete ${term.term}?`)) return;
    capturePostHogEvent("academic_term_deleted", {
      entity_type: "academic_term",
      source: "data_grid",
    });
    setRows((current) => current.filter((row) => row.term !== term.term));
  }, []);

  return (
    <DataGrid
      atoms={{ globalFilter, pagination, sorting }}
      columns={columns}
      data={rows}
      exportFileName="academic-terms"
      filters={filters}
      getRowId={(term) => term.term}
      onDelete={handleDelete}
      onEdit={handleEdit}
      searchLabel="Search terms"
    />
  );
}

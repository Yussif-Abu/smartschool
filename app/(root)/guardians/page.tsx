import type { SortingState } from "@tanstack/react-table";
import {
  GuardiansTable,
  type GuardiansTableUrlState,
} from "@/components/GuardiansTable";
import { guardians } from "@/constants";

type GuardiansPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function positiveInteger(value: string | undefined, fallback: number) {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
}

function parseSorting(value: string | undefined): SortingState {
  if (!value) return [];
  const [id, direction] = value.split(".");
  const sortableColumns = new Set([
    "name",
    "guardianId",
    "linkedStudent",
    "primaryPhone",
    "preferredCommunication",
    "portalAccess",
  ]);
  return sortableColumns.has(id) &&
    (direction === "asc" || direction === "desc")
    ? [{ id, desc: direction === "desc" }]
    : [];
}

export default async function GuardiansPage({
  searchParams,
}: GuardiansPageProps) {
  const params = await searchParams;
  const requestedSize = positiveInteger(first(params.size), 5);
  const initialUrlState: GuardiansTableUrlState = {
    pageIndex: positiveInteger(first(params.page), 1) - 1,
    pageSize: [5, 10, 15].includes(requestedSize) ? requestedSize : 5,
    query: first(params.q) ?? "",
    sorting: parseSorting(first(params.sort)),
  };

  return (
    <GuardiansTable initialData={guardians} initialUrlState={initialUrlState} />
  );
}

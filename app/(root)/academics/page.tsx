import type { SortingState } from "@tanstack/react-table";

import {
  AcademicsTable,
  type AcademicTableUrlState,
} from "@/components/AcademicsTable";
import { AcademicYearTable } from "@/components/AcademicYearTable";
import { AcademicsTermTable } from "@/components/AcademicsTermTable";
import { SubjectTable } from "@/components/SubjectTable";
import { academicTerms, academicYears, classes, subjects } from "@/constants";
import Heading from "@/components/Heading";
import Button from "@/components/Button";
import { Plus } from "lucide-react";

type AcademicsPageProps = {
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
    "className",
    "id",
    "grade",
    "stream",
    "formTeacher",
    "campus",
    "students",
  ]);

  return sortableColumns.has(id) &&
    (direction === "asc" || direction === "desc")
    ? [{ id, desc: direction === "desc" }]
    : [];
}

export default async function AcademicsPage({
  searchParams,
}: AcademicsPageProps) {
  const params = await searchParams;
  const requestedSize = positiveInteger(first(params.size), 5);
  const initialUrlState: AcademicTableUrlState = {
    pageIndex: positiveInteger(first(params.page), 1) - 1,
    pageSize: [5, 10, 15].includes(requestedSize) ? requestedSize : 5,
    query: first(params.q) ?? "",
    sorting: parseSorting(first(params.sort)),
  };

  const subjectInitialUrlState = {
    pageIndex: 0,
    pageSize: 5,
    query: "",
    sorting: [] as SortingState,
  };

  const termInitialUrlState = {
    pageIndex: 0,
    pageSize: 5,
    query: "",
    sorting: [] as SortingState,
  };

  const academicYearInitialUrlState = {
    pageIndex: 0,
    pageSize: 5,
    query: "",
    sorting: [] as SortingState,
  };

  return (
    <div className="space-y-8">
      <AcademicsTable initialData={classes} initialUrlState={initialUrlState} />
      <div className="flex flex-col gap-4 md:flex-row md:gap-6">
        <div className="flex flex-col gap-2">
          <Heading title="Subject" subtitle="">
            <Button variant="primary" size="sm" href="/academics/subject">
              <Plus className="mr-2 h-4 w-4" />
              Add Subject
            </Button>
          </Heading>
          <SubjectTable
            initialData={subjects}
            initialUrlState={subjectInitialUrlState}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Heading title="Academic Term" subtitle="">
            <Button variant="primary" size="sm" href="/academics/academic_term">
              <Plus className="mr-2 h-4 w-4" />
              Add Term
            </Button>
          </Heading>
          <AcademicsTermTable
            initialData={academicTerms}
            initialUrlState={termInitialUrlState}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Heading title="Academic Year" subtitle="">
          <Button variant="primary" size="sm" href="/academics/academic_year">
            <Plus className="mr-2 h-4 w-4" />
            Add Academic Year
          </Button>
        </Heading>
        <AcademicYearTable
          initialData={academicYears}
          initialUrlState={academicYearInitialUrlState}
        />
      </div>
    </div>
  );
}

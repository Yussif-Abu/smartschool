import type { ReactNode } from "react";
import { BookOpenText, CalendarRange, GraduationCap, Plus } from "lucide-react";

import Button from "@/components/Button";
import Heading from "@/components/Heading";
import StatsGrid, { type StatItem } from "@/components/ui/stat-grid";

const academicSummaryStats: StatItem[] = [
  {
    title: "Academic Year",
    value: "2026/2027",
    description: "Current school year",
    icon: CalendarRange,
  },
  {
    title: "Classes",
    value: 28,
    description: "Across all campuses",
    icon: GraduationCap,
  },
  {
    title: "Subjects",
    value: 32,
    description: "Active learning areas",
    icon: BookOpenText,
  },
];

const AcademicsLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="page-container">
      <Heading
        title="Academics"
        subtitle="Manage classes, subjects, and academic records across the school."
      >
        <Button variant="primary" size="sm" href="/academics/class">
          <Plus className="mr-2 h-4 w-4" />
          Add Class
        </Button>
      </Heading>
      <StatsGrid stats={academicSummaryStats} />
      {children}
    </div>
  );
};

export default AcademicsLayout;

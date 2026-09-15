import type { ReactNode } from "react";
import { BriefcaseBusiness, Plus, UserRound, Users, UserX } from "lucide-react";

import Button from "@/components/Button";
import Heading from "@/components/Heading";
import StatsGrid, { type StatItem } from "@/components/ui/stat-grid";

const teacherStats: StatItem[] = [
  {
    title: "All Teachers",
    value: 84,
    description: "Registered teachers",
    icon: Users,
  },
  {
    title: "Active",
    value: 78,
    description: "Currently teaching",
    icon: UserRound,
  },
  {
    title: "Departments",
    value: 9,
    description: "Teaching departments",
    icon: BriefcaseBusiness,
  },
  {
    title: "Inactive",
    value: 6,
    description: "Accounts needing review",
    icon: UserX,
  },
];

const TeacherLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="page-container">
      <Heading
        title="Teachers"
        subtitle="Manage teacher profiles, subjects, and employment details."
      >
        <Button variant="primary" size="sm" href="/teachers/new">
          <Plus className="mr-2 h-4 w-4" />
          Add Teacher
        </Button>
      </Heading>
      <StatsGrid stats={teacherStats} />
      {children}
    </div>
  );
};

export default TeacherLayout;

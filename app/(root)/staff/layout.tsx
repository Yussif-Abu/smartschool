import type { ReactNode } from "react";
import { BriefcaseBusiness, Plus, UserRound, Users, UserX } from "lucide-react";

import Button from "@/components/Button";
import Heading from "@/components/Heading";
import StatsGrid, { type StatItem } from "@/components/ui/stat-grid";

const staffStats: StatItem[] = [
  {
    title: "All Staff",
    value: 84,
    description: "Registered staff members",
    icon: Users,
  },
  {
    title: "Active",
    value: 78,
    description: "Currently working",
    icon: UserRound,
  },
  {
    title: "Departments",
    value: 9,
    description: "Staff departments",
    icon: BriefcaseBusiness,
  },
  {
    title: "Inactive",
    value: 6,
    description: "Accounts needing review",
    icon: UserX,
  },
];

const StaffLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="page-container">
      <Heading
        title="Staff"
        subtitle="Manage staff profiles, employment, and payroll details."
      >
        <Button variant="primary" size="sm" href="/staff/new">
          <Plus className="mr-2 h-4 w-4" />
          Add Staff Member
        </Button>
      </Heading>
      <StatsGrid stats={staffStats} />
      {children}
    </div>
  );
};

export default StaffLayout;

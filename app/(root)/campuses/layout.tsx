import type { ReactNode } from "react";
import { Building2, Plus, Users, UserRound, UserX } from "lucide-react";

import Button from "@/components/Button";
import Heading from "@/components/Heading";
import StatsGrid, { type StatItem } from "@/components/ui/stat-grid";

const campusStats: StatItem[] = [
  {
    title: "All Campuses",
    value: 4,
    description: "Registered school campuses",
    icon: Building2,
  },
  {
    title: "Active",
    value: 3,
    description: "Currently operating",
    icon: UserRound,
  },
  {
    title: "Student Capacity",
    value: 2500,
    description: "Across all campuses",
    icon: Users,
  },
  {
    title: "Inactive",
    value: 1,
    description: "Campus requiring review",
    icon: UserX,
  },
];

const CampusLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="page-container">
      <Heading
        title="Campuses"
        subtitle="Manage your school campuses, capacity, and contact details."
      >
        <Button variant="primary" size="sm" href="/campuses/new">
          <Plus className="mr-2 h-4 w-4" />
          Add Campus
        </Button>
      </Heading>
      <StatsGrid stats={campusStats} />
      {children}
    </div>
  );
};

export default CampusLayout;

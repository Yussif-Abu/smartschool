import type { ReactNode } from "react";
import { Link as LinkIcon, Plus, UserRound, Users, UserX } from "lucide-react";

import Button from "@/components/Button";
import Heading from "@/components/Heading";
import StatsGrid, { type StatItem } from "@/components/ui/stat-grid";

const guardianStats: StatItem[] = [
  {
    title: "All Guardians",
    value: 986,
    description: "Registered guardians",
    icon: Users,
  },
  {
    title: "Active",
    value: 942,
    description: "Active portal accounts",
    icon: UserRound,
  },
  {
    title: "Linked Students",
    value: 915,
    description: "Guardians linked to students",
    icon: LinkIcon,
  },
  {
    title: "Inactive",
    value: 44,
    description: "Accounts needing review",
    icon: UserX,
  },
];

const GuardiansLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="page-container">
      <Heading
        title="Guardians"
        subtitle="Manage guardian profiles, contacts, and student links."
      >
        <Button variant="primary" size="sm" href="/guardians/new">
          <Plus className="mr-2 h-4 w-4" />
          Add Guardian
        </Button>
      </Heading>
      <StatsGrid stats={guardianStats} />
      {children}
    </div>
  );
};

export default GuardiansLayout;

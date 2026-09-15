import type { Metadata } from "next";

import StatsGrid from "@/components/ui/stat-grid";
import { dashboardStats } from "@/constants";

export const metadata: Metadata = {
  title: "Dashboard",
};

const DashboardPage = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>

        <p className="page-description">Overview of your school.</p>
      </div>

      <StatsGrid stats={dashboardStats} />
    </div>
  );
};

export default DashboardPage;

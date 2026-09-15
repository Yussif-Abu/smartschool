import DashboardShell from "@/components/Dashboard-shell";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return <DashboardShell>{children}</DashboardShell>;
};

export default DashboardLayout;

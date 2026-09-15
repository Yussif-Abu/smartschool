"use client";

import { useEffect, useState } from "react";

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

type DashboardShellProps = {
  children: React.ReactNode;
};

const DashboardShell = ({ children }: DashboardShellProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isSidebarOpen]);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener("keydown", closeOnEscape);

    return () => {
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  return (
    <div className="dashboard-shell">
      {isSidebarOpen && (
        <button
          type="button"
          className="sidebar-overlay"
          onClick={() => setIsSidebarOpen(false)}
          aria-label="Close navigation overlay"
        />
      )}

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="dashboard-body">
        <Navbar onMenuClick={() => setIsSidebarOpen(true)} />

        <main className="dashboard-main">{children}</main>
      </div>
    </div>
  );
};

export default DashboardShell;

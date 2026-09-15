"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GraduationCap, X } from "lucide-react";

import {navigationGroups,portalNavigationItems,logoutNavigationItem,} from "@/config/navigation";

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const pathname = usePathname();

  const LogoutIcon = logoutNavigationItem.icon;

  /**
   * Determines whether a sidebar route is active.
   *
   * Example:
   *
   * /students
   * /students/12
   * /students/12/edit
   *
   * will all keep the Students menu active.
   */
  const isActiveRoute = (href: string) => {
    if (href === "/dashboard") {
      return pathname === href;
    }

    return (
      pathname === href ||
      pathname.startsWith(`${href}/`)
    );
  };

  return (
    <aside
      className={`dashboard-sidebar ${
        isOpen ? "dashboard-sidebar-open" : ""
      }`}
      aria-label="Main navigation"
    >

      {/* Brand */}
      <div className="sidebar-header">

        <Link
          href="/dashboard"
          className="sidebar-brand"
          onClick={onClose}
        >
          <span className="sidebar-brand-icon">
            <GraduationCap size={22} />
          </span>

          <span>
            <span className="sidebar-brand-title">
              School Portal
            </span>

            <span className="sidebar-brand-subtitle">
              Management System
            </span>
          </span>
        </Link>

        <button
          type="button"
          className="sidebar-close-button"
          onClick={onClose}
          aria-label="Close navigation"
        >
          <X size={20} />
        </button>

      </div>


      {/* Navigation */}
      <nav className="sidebar-navigation">

        {navigationGroups.map((group) => (
          <div
            key={group.title}
            className="sidebar-nav-group"
          >

            <p className="sidebar-section-title">
              {group.title}
            </p>

            <ul className="sidebar-menu">

              {group.items.map((item) => {
                const Icon = item.icon;

                const active = isActiveRoute(
                  item.href
                );

                return (
                  <li key={item.href}>

                    <Link
                      href={item.href}
                      onClick={onClose}
                      className={`sidebar-link ${
                        active
                          ? "sidebar-link-active"
                          : ""
                      }`}
                      aria-current={
                        active
                          ? "page"
                          : undefined
                      }
                    >

                      <Icon
                        size={19}
                        strokeWidth={1.8}
                      />

                      <span>{item.title}</span>

                    </Link>

                  </li>
                );
              })}

            </ul>

          </div>
        ))}

      </nav>


      {/* Footer */}
      <div className="sidebar-footer">

        <div className="sidebar-footer-links">

          {portalNavigationItems.map((item) => {
            const Icon = item.icon;

            const active = isActiveRoute(
              item.href
            );

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`sidebar-link ${
                  active
                    ? "sidebar-link-active"
                    : ""
                }`}
              >

                <Icon
                  size={19}
                  strokeWidth={1.8}
                />

                <span>{item.title}</span>

              </Link>
            );
          })}


          <Link
            href={logoutNavigationItem.href}
            className="sidebar-logout-button"
          >

            <LogoutIcon
              size={19}
              strokeWidth={1.8}
            />

            <span>
              {logoutNavigationItem.title}
            </span>

          </Link>

        </div>

      </div>

    </aside>
  );
};

export default Sidebar;
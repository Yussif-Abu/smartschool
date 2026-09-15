"use client";

import { Bell, Menu, Search } from "lucide-react";

type NavbarProps = {
  onMenuClick: () => void;
};

const Navbar = ({ onMenuClick }: NavbarProps) => {
  return (
    <header className="dashboard-navbar">
      <div className="navbar-left">
        <button
          type="button"
          className="navbar-menu-button"
          onClick={onMenuClick}
          aria-label="Open navigation"
        >
          <Menu size={22} />
        </button>

        <div className="navbar-search">
          <Search size={18} className="navbar-search-icon" />

          <input
            type="search"
            placeholder="Search..."
            className="navbar-search-input"
            aria-label="Search"
          />
        </div>
      </div>

      <div className="navbar-actions">
        <button
          type="button"
          className="navbar-icon-button"
          aria-label="Notifications"
        >
          <Bell size={20} />
          <span className="navbar-notification-indicator" />
        </button>

        <button type="button" className="navbar-profile">
          <span className="navbar-avatar">YA</span>

          <span className="navbar-profile-information">
            <span className="navbar-profile-name">Yussif Abu</span>
            <span className="navbar-profile-role">Administrator</span>
          </span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
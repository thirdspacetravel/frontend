import React from "react";
import CloseIcon from "../../../icons/CloseIcon";
import { NavLink, useNavigate } from "react-router";
import UsersIcon from "../../../icons/UsersIcon";
import CalendarIcon from "../../../icons/CalendarIcon";
import DashboardIcon from "../../../icons/DashboardIcon";
import GlobeIcon from "../../../icons/GlobeIcon";
import InboxIcon from "../../../icons/InboxIcon";
import LogoutIcon from "../../../icons/LogoutIcon";
import { trpc } from "../../../trpc";
interface NavItem {
  label: string;
  icon: React.ReactNode;
  path: string;
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", icon: <DashboardIcon />, path: "/admin" },
  { label: "Trips", icon: <GlobeIcon />, path: "/admin/trips" },
  { label: "Bookings", icon: <CalendarIcon />, path: "/admin/bookings" },
  { label: "Enquiries", icon: <InboxIcon />, path: "/admin/enquiries" },
  { label: "Customers", icon: <UsersIcon />, path: "/admin/customers" },
];

const useAdminLogout = () => {
  const navigate = useNavigate();
  const utils = trpc.useUtils();

  const logoutMutation = trpc.admin.logout.useMutation({
    onSuccess: () => {
      utils.admin.checkStatus.invalidate();
      utils.invalidate();
      navigate("/admin/login", { replace: true });
    },
    onError: () => {
      navigate("/admin/login", { replace: true });
    },
  });

  return {
    handleLogout: () => logoutMutation.mutate(),
    isLoggingOut: logoutMutation.isPending,
  };
};
const NavigationSidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { handleLogout, isLoggingOut } = useAdminLogout();
  return (
    <aside className={`sidebar ${isOpen ? "sidebar--open" : ""}`}>
      <header className="sidebar__header">
        <h1 className="sidebar__brand">Third Space Travel</h1>
        <div
          className="sidebar__close"
          onClick={onClose}
          aria-label="Close Sidebar"
        >
          <CloseIcon />
        </div>
      </header>

      <nav className="sidebar__nav">
        <ul className="sidebar__nav-list">
          {NAV_ITEMS.map(({ label, icon, path }) => (
            <li key={label}>
              <NavLink
                key={path}
                to={path}
                end={path === "/admin"}
                className={({ isActive }) =>
                  `sidebar__nav-link ${isActive ? "active" : ""}`
                }
                onClick={onClose}
              >
                {icon}
                <span className="sidebar__label">{label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <footer className="sidebar__footer">
        <button onClick={handleLogout} disabled={isLoggingOut}>
          <LogoutIcon />
          Logout
        </button>
      </footer>
    </aside>
  );
};

export default NavigationSidebar;

import { useState } from "react";
import NavigationSidebar from "../components/layout/NavigationSidebar";
import { Outlet } from "react-router";
const AdminDashboardLayout = () => {
  const [isOpen, setOpen] = useState(false);
  const toggle = () => setOpen(!isOpen);
  const close = () => setOpen(false);
  return (
    <div
      className={`admin-container ${isOpen ? "admin-container--sidebar-open" : ""}`}
    >
      <div className="sidebar-overlay" onClick={toggle} />
      <NavigationSidebar onClose={close} isOpen={isOpen} />
      <main className="main-layout">
        <Outlet context={{ toggle, isOpen }} />
      </main>
    </div>
  );
};

export default AdminDashboardLayout;

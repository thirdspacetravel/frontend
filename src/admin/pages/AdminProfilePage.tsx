import { NavLink, useOutletContext } from "react-router";
import MenuIcon from "../../icons/MenuIcon";
import NotificationIcon from "../../icons/NotificationIcon";
import AdminProfile from "../components/profile/AdminProfile";
interface ContextType {
  toggle: () => void;
  isOpen: boolean;
}

const AdminProfilePage = () => {
  const { toggle } = useOutletContext<ContextType>();
  return (
    <>
      <header className="layout-header">
        <div className="layout-header__left">
          <div className="menu-toggle" onClick={toggle}>
            <MenuIcon />
          </div>
          <h2 className="layout-header__title">Profile</h2>
        </div>

        <NavLink to={"/admin/notifications"}>
          <div className="layout-header__actions">
            <NotificationIcon />
          </div>
        </NavLink>
      </header>
      <div className="content">
        <AdminProfile />
      </div>
    </>
  );
};

export default AdminProfilePage;

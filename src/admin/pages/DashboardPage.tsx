import { NavLink, useOutletContext } from "react-router";
import MenuIcon from "../../icons/MenuIcon";
import DashboardContainer from "../components/dashboard/DashboardContainer";
import UsersIcon from "../../icons/UsersIcon";

interface ContextType {
  toggle: () => void;
  isOpen: boolean;
}
const DashboardPage = () => {
  const { toggle } = useOutletContext<ContextType>();
  return (
    <>
      <header className="layout-header">
        <div className="layout-header__left">
          <div className="menu-toggle" onClick={toggle}>
            <MenuIcon />
          </div>
          <h2 className="layout-header__title">Dashboard Overview</h2>
        </div>

        <NavLink to={"/admin/profile"}>
          <div className="layout-header__actions">
            <UsersIcon />
          </div>
        </NavLink>
      </header>
      <div className="content">
        <DashboardContainer />
      </div>
    </>
  );
};

export default DashboardPage;

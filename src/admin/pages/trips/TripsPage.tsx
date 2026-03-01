import { NavLink, useOutletContext } from "react-router";
import MenuIcon from "../../../icons/MenuIcon";
import UsersIcon from "../../../icons/UsersIcon";
import TripsTable from "../../components/tables/TripsTable";
interface ContextType {
  toggle: () => void;
  isOpen: boolean;
}

const TripsPage = () => {
  const { toggle } = useOutletContext<ContextType>();
  return (
    <>
      <header className="layout-header">
        <div className="layout-header__left">
          <div className="menu-toggle" onClick={toggle}>
            <MenuIcon />
          </div>
          <h2 className="layout-header__title">Trips</h2>
        </div>
        <NavLink to={"/admin/profile"}>
          <div className="layout-header__actions">
            <UsersIcon />
          </div>
        </NavLink>
      </header>
      <div className="content">
        <TripsTable />
      </div>
    </>
  );
};

export default TripsPage;

import { NavLink, useOutletContext } from "react-router";
import MenuIcon from "../../icons/MenuIcon";
import CustomersTable from "../components/tables/CustomersTable";
import UserIcon from "../../icons/UserIcon";
interface ContextType {
  toggle: () => void;
  isOpen: boolean;
}

const CustomersPage = () => {
  const { toggle } = useOutletContext<ContextType>();
  return (
    <>
      <header className="layout-header">
        <div className="layout-header__left">
          <div className="menu-toggle" onClick={toggle}>
            <MenuIcon />
          </div>
          <h2 className="layout-header__title">Customers</h2>
        </div>

        <NavLink to={"/admin/profile"}>
          <div className="layout-header__actions">
            <UserIcon />
          </div>
        </NavLink>
      </header>
      <div className="content">
        <CustomersTable />
      </div>
    </>
  );
};

export default CustomersPage;

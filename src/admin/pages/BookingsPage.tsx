import { NavLink, useOutletContext } from "react-router";
import MenuIcon from "../../icons/MenuIcon";
import NotificationIcon from "../../icons/NotificationIcon";
import BookingsTable from "../components/tables/BookingsTable";

interface ContextType {
  toggle: () => void;
  isOpen: boolean;
}

const BookingsPage = () => {
  const { toggle } = useOutletContext<ContextType>();
  return (
    <>
      <header className="layout-header">
        <div className="layout-header__left">
          <div className="menu-toggle" onClick={toggle}>
            <MenuIcon />
          </div>
          <h2 className="layout-header__title">Bookings</h2>
        </div>

        <NavLink to={"/admin/notifications"}>
          <div className="layout-header__actions">
            <NotificationIcon />
          </div>
        </NavLink>
      </header>
      <div className="content">
        <BookingsTable />
      </div>
    </>
  );
};

export default BookingsPage;

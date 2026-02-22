import { useOutletContext } from "react-router";
import MenuIcon from "../../icons/MenuIcon";
import Tabs from "../components/notifications/NotificationCategoryTabs";
import NotificationItem from "../components/notifications/NotificationItem";
interface ContextType {
  toggle: () => void;
  isOpen: boolean;
}

const NotificationsPage = () => {
  const { toggle } = useOutletContext<ContextType>();
  return (
    <>
      <header className="layout-header">
        <div className="layout-header__left">
          <div className="menu-toggle" onClick={toggle}>
            <MenuIcon />
          </div>
          <h2 className="layout-header__title">Notifications</h2>
        </div>
      </header>
      <div className="content">
        <Tabs />
        <NotificationItem />
      </div>
    </>
  );
};

export default NotificationsPage;

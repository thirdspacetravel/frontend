import { NavLink, useOutletContext } from "react-router";
import MenuIcon from "../../../icons/MenuIcon";
import UsersIcon from "../../../icons/UsersIcon";
import BlogsTable from "../../components/tables/BlogsTable";
interface ContextType {
  toggle: () => void;
  isOpen: boolean;
}

const BlogsPage = () => {
  const { toggle } = useOutletContext<ContextType>();
  return (
    <>
      <header className="layout-header">
        <div className="layout-header__left">
          <div className="menu-toggle" onClick={toggle}>
            <MenuIcon />
          </div>
          <h2 className="layout-header__title">Blogs</h2>
        </div>
        <NavLink to={"/admin/profile"}>
          <div className="layout-header__actions">
            <UsersIcon />
          </div>
        </NavLink>
      </header>
      <div className="content">
        <BlogsTable />
      </div>
    </>
  );
};

export default BlogsPage;

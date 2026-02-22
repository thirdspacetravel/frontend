import { Outlet } from "react-router";
import Header from "./Header";
import Footer from "./Footer";

const MainLayout = () => (
  <>
    <Header />
    <Outlet />
    <Footer />
  </>
);
export default MainLayout;

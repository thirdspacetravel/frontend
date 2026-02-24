import { Outlet } from "react-router";
import Header from "./Header";
import Footer from "./Footer";
import { useSmoothScroll } from "../../hooks/useSmoothScroll";

const MainLayout = () => {
  useSmoothScroll();
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};
export default MainLayout;

import { Outlet } from "react-router";
import Header from "./Header";
import Footer from "./Footer";
import WhatsAppIcon from "../../icons/WhatsAppIcon";
// import { useSmoothScroll } from "../../hooks/useSmoothScroll";

const MainLayout = () => {
  // useSmoothScroll();
  return (
    <>
      <Header />
      <Outlet />
      <Footer />

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/7719783377" // Replace with actual number
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-floating-btn"
        aria-label="Chat on WhatsApp"
      >
        <WhatsAppIcon className="whatsapp-icon" />
      </a>
    </>
  );
};
export default MainLayout;

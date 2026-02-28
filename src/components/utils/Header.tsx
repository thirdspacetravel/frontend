import React, { useState } from "react";
import { useNavigate, NavLink, useLocation } from "react-router";
import Button from "./Button";
import ArrowRight from "../../icons/ArrowRightIcon";
import MenuIcon from "../../icons/MenuIcon";
import CloseIcon from "../../icons/CloseIcon";
import UserProfile from "./UserProfile";
import { trpc } from "../../trpc";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Group Trips", href: "/group-trips" },
  { label: "Corporate & Institutional Trips", href: "/corporate-trips" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const NavLinks = ({
  className,
  onClose,
}: {
  className: string;
  onClose?: () => void;
}) => (
  <ul className={`${className}__list`}>
    {NAV_LINKS.map((link) => (
      <li key={link.label} className={`${className}__item`}>
        {/* NavLink automatically adds an "active" class when the route matches */}
        <NavLink
          to={link.href}
          className={({ isActive }) =>
            `${className}__link ${isActive ? "active" : ""}`
          }
          onClick={onClose} // Closes mobile menu when a link is clicked
        >
          {link.label}
        </NavLink>
      </li>
    ))}
  </ul>
);

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const toggleMenu = () => setIsOpen(!isOpen);
  const { data, isLoading } = trpc.user.checkStatus.useQuery(undefined, {
    retry: false,
    refetchOnWindowFocus: false,
  });
  const handleLogin = () => {
    navigate("/login");
  };
  const location = useLocation();
  return (
    <header
      className={`header ${NAV_LINKS.some((link) => link.href.startsWith(location.pathname)) ? "fixed" : ""}`}
    >
      <div className="header__container">
        <div className="header__logo" onClick={() => navigate("/")}>
          <span className="logo-text">THIRD SPACE TRAVEL</span>
        </div>

        <nav className="header__desktop-nav">
          <NavLinks className="nav-desktop" />
        </nav>

        <div className="header__actions">
          {isLoading || !data?.authenticated || !data?.user ? (
            <Button className="u-hide-mobile" onClick={handleLogin}>
              <span>LOGIN</span>
              <ArrowRight />
            </Button>
          ) : (
            <UserProfile
              name={data.user.fullName}
              email={data.user.email}
              avatarUrl={
                data.user.avatar
                  ? `${import.meta.env.VITE_API_URL}/images/${data.user.avatar}`
                  : "/avatars/user.png"
              }
              onClick={() => {
                navigate("/profile");
              }}
            />
          )}
          <Button
            className="nav-toggle"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            <MenuIcon />
          </Button>
        </div>
      </div>

      <div
        className={`filter-overlay ${isOpen ? "" : "is-hidden"}`}
        onClick={toggleMenu}
      ></div>
      <div className={`mobile-menu ${isOpen ? "is-open" : ""}`}>
        <div className="mobile-menu__header">
          <Button
            className="nav-toggle"
            onClick={toggleMenu}
            aria-label="Close Menu"
          >
            <CloseIcon />
          </Button>
        </div>
        <div className="mobile-menu__content">
          <nav className="mobile-menu__nav">
            <NavLinks className="nav-mobile" onClose={() => setIsOpen(false)} />
          </nav>
          <div className="mobile-menu__footer">
            {isLoading || !data?.authenticated || !data?.user ? (
              <Button className="u-hide-mobile" onClick={handleLogin}>
                <span>LOGIN</span>
                <ArrowRight />
              </Button>
            ) : (
              <UserProfile
                name={data.user.fullName}
                email={data.user.email}
                avatarUrl={
                  data.user.avatar
                    ? `${import.meta.env.VITE_API_URL}/images/${data.user.avatar}`
                    : "/avatars/user.png"
                }
                onClick={() => {
                  navigate("/profile");
                }}
              />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

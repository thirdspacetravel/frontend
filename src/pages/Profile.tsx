import { useState } from "react";
import UserIcon from "../icons/UserIcon";
import CalendarIcon from "../icons/CalendarIcon";
import SettingsIcon from "../icons/SettingsIcon";
import LogoutIcon from "../icons/LogoutIcon";
import Header from "../components/utils/Header";
import ProfileSettings from "../components/cards/ProfileSettings";
import BookingCard from "../components/cards/ProfileBookings";
import ProfileInfo from "../components/cards/ProfileInfo";
import { useNavigate } from "react-router";
import { trpc } from "../trpc";

const useUserLogout = () => {
  const navigate = useNavigate();
  const utils = trpc.useUtils();

  const logoutMutation = trpc.user.logout.useMutation({
    onSuccess: () => {
      utils.user.checkStatus.invalidate();
      utils.invalidate();
      navigate("/login", { replace: true });
    },
    onError: () => {
      navigate("/login", { replace: true });
    },
  });

  return {
    handleLogout: () => logoutMutation.mutate(),
    isLoggingOut: logoutMutation.isPending,
  };
};
const UserProfile = () => {
  const [activeId, setActiveId] = useState<string>("profile");
  const { handleLogout, isLoggingOut } = useUserLogout();
  const navItems = [
    { id: "profile", label: "My Profile", icon: <UserIcon /> },
    { id: "bookings", label: "My Bookings", icon: <CalendarIcon /> },
    { id: "settings", label: "Settings", icon: <SettingsIcon /> },
  ];
  return (
    <>
      <Header />
      <section className="profile-page">
        <div className="profile-page__container">
          <nav className="profile-nav">
            {navItems.map((item) => (
              <a
                key={item.id}
                onClick={() => {
                  setActiveId(item.id);
                }}
                className={`profile-nav__link ${activeId === item.id ? "profile-nav__link--active" : ""}`}
              >
                <div className="profile-nav__icon">{item.icon}</div>
                <span className="profile-nav__label">{item.label}</span>
              </a>
            ))}
            <a
              onClick={() => {
                if (!isLoggingOut) handleLogout();
              }}
              className="profile-nav__link profile-nav__link--logout"
            >
              <div className="profile-nav__icon">
                <LogoutIcon />
              </div>
              <span className="profile-nav__label">Log Out</span>
            </a>
          </nav>
          {activeId === "profile" && <ProfileInfo />}
          {activeId === "bookings" && <BookingCard />}
          {activeId === "settings" && <ProfileSettings />}
        </div>
      </section>
    </>
  );
};

export default UserProfile;

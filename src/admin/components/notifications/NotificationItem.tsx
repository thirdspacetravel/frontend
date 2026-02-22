import React, { type ReactNode } from "react";
import RupeeIcon from "../../../icons/RupeeIcon";
import CalendarIcon from "../../../icons/CalendarIcon";
import AlertIcon from "../../../icons/AlertIcon";
import MailIcon from "../../../icons/MailIcon";
import UserIcon from "../../../icons/UserIcon";
import SettingsIcon from "../../../icons/SettingsIcon";

type NotificationCategory =
  | "success"
  | "payment"
  | "enquiry"
  | "warning"
  | "update"
  | "system";

interface NotificationData {
  id: string;
  category: NotificationCategory;
  title: string;
  time: string;
  message: ReactNode;
  isUnread?: boolean;
  actionLabel?: string;
}

const mockNotifications: NotificationData[] = [
  {
    id: "1",
    category: "success",
    title: "New Booking Confirmed",
    time: "2 min ago",
    message: (
      <>
        <span className="notification__text-dark-bold">Aarav Patel</span>{" "}
        successfully booked{" "}
        <span className="notification__text-light-bold">
          Spiti Valley Expedition
        </span>{" "}
        for 2 people.
      </>
    ),
    isUnread: true,
  },
  {
    id: "2",
    category: "payment",
    title: "Payment Received",
    time: "15 min ago",
    message: (
      <>
        Received payment of{" "}
        <span className="notification__text-dark-bold">₹18,500</span> via UPI
        from Vikram Malhotra.
      </>
    ),
    isUnread: true,
  },
  {
    id: "3",
    category: "enquiry",
    title: "New B2B Enquiry",
    time: "1 hr ago",
    message: (
      <>
        <span className="notification__text-light-bold">
          St. Xavier's College
        </span>{" "}
        sent an enquiry for a group of 40 students for Manali.
      </>
    ),
    isUnread: true,
    actionLabel: "View Enquiry",
  },
  {
    id: "4",
    category: "warning",
    title: "Low Seats Alert",
    time: "3 hrs ago",
    message: (
      <>
        <span className="notification__text-light-bold">
          Bir Billing Camping
        </span>{" "}
        (Feb 18) has only 2 seats remaining.
      </>
    ),
  },
  {
    id: "5",
    category: "update",
    title: "New Customer Registration",
    time: "Yesterday",
    message: "Sneha Gupta created a new account via Google Login.",
  },
  {
    id: "6",
    category: "system",
    title: "System Maintenance",
    time: "2 days ago",
    message:
      "Scheduled maintenance completed successfully. All systems are operational.",
  },
];

interface IconProps {
  category: NotificationCategory;
}

const Icon: React.FC<IconProps> = ({ category }) => {
  switch (category) {
    case "success":
      return <CalendarIcon />;
    case "payment":
      return <RupeeIcon />;
    case "enquiry":
      return <MailIcon />;
    case "warning":
      return <AlertIcon />;
    case "update":
      return <UserIcon />;
    case "system":
      return <SettingsIcon />;
    default:
      return <></>;
  }
};
const NotificationItem: React.FC = () => {
  return (
    <div className="notification-list">
      {mockNotifications.map((notification) => (
        <div
          key={notification.id}
          className={`notification ${notification.isUnread ? "notification--unread" : ""}`}
        >
          <div
            className={`notification__icon notification__icon--${notification.category}`}
          >
            <Icon category={notification.category} />
          </div>

          <div className="notification__content">
            <div className="notification__header">
              <span className="notification__title">{notification.title}</span>
              <span className="notification__time">{notification.time}</span>
            </div>

            <p className="notification__message">{notification.message}</p>

            {notification.actionLabel && (
              <button className="btn">{notification.actionLabel}</button>
            )}
          </div>

          {notification.isUnread && (
            <div
              className="notification__indicator"
              aria-label="Unread notification"
            ></div>
          )}
        </div>
      ))}
      <button className="btn load-more">Load older notifications</button>
    </div>
  );
};
export default NotificationItem;

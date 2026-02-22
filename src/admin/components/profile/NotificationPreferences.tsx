import { useState } from "react";
import { Switch } from "../../../components/utils/InputUtils";
import type { AdminUser } from "./types";
const NotificationPreferences = ({
  admin,
}: {
  admin: AdminUser | undefined;
}) => {
  const [settings, setSettings] = useState({
    alerts: admin?.newBookingAlerts || false,
    payments: admin?.paymentConfirmations || false,
    digest: admin?.weeklyDigest || false,
  });

  const handleToggle = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const notificationItems = [
    {
      id: "alerts",
      title: "New Booking Alerts",
      description: "Receive email when a new customer books a trip.",
    },
    {
      id: "payments",
      title: "Payment Confirmations",
      description: "Get notified when a payment is successfully processed.",
    },
    {
      id: "digest",
      title: "Weekly Digest",
      description: "Receive a summary of weekly performance.",
    },
  ];

  return (
    <div className="profile__card">
      <header className="profile__header">
        <div className="profile__info">
          <h2 className="profile__title">Notification Preferences</h2>
          <p className="profile__subtitle">Manage what alerts you receive.</p>
        </div>
      </header>

      <div className="profile__body no-padding">
        {notificationItems.map((item) => (
          <div key={item.id} className="data-row">
            <div className="data-row__content">
              <span className="data-row__label">{item.title}</span>
              <span className="data-row__desc">{item.description}</span>
            </div>
            <Switch
              initialValue={settings[item.id as keyof typeof settings]}
              onChange={async (nextState) => {
                console.log(`Toggled ${item.id}:`, nextState);
                handleToggle(item.id as keyof typeof settings);
                return true;
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationPreferences;

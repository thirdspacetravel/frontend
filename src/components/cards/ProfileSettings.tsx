import { useState } from "react";
import Button from "../utils/Button";
import { TextInput } from "../utils/InputUtils";
import { Switch } from "../utils/InputUtils";
const ProfileSettings = () => {
  const [passwords, setPasswords] = useState({
    current: "",
    next: "",
    confirm: "",
  });
  const [notifications, setNotifications] = useState({
    trips: true,
    promo: false,
  });
  const handleToggle = (key: "trips" | "promo") => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };
  return (
    <main className="profile-content">
      <header className="profile-content__header">
        <h1>Account Settings</h1>
        <p>Manage your security, notifications, and account preferences.</p>
      </header>
      <div className="profile-section">
        <div className="profile-section__title">
          <h2>Security & Login</h2>
        </div>
        <div className="profile-form">
          <TextInput
            wrapperClass="fillbox"
            placeholder="Enter current password"
            label="Current Password"
            name="currentPassword"
            value={passwords.current}
            onChange={(e) =>
              setPasswords({ ...passwords, current: e.target.value })
            }
          />
          <TextInput
            label="New Password"
            placeholder="Enter new password"
            name="newPassword"
            value={passwords.next}
            onChange={(e) =>
              setPasswords({ ...passwords, next: e.target.value })
            }
          />
          <TextInput
            label="Confirm New Password"
            placeholder="Confirm new password"
            name="confirmNewPassword"
            value={passwords.confirm}
            onChange={(e) =>
              setPasswords({ ...passwords, confirm: e.target.value })
            }
          />
        </div>
        <Button solid>Update Password</Button>
      </div>
      <hr className="divider" />
      <div className="profile-section">
        <div className="profile-section__title">
          <h2>Notifications</h2>
        </div>
        <div className="toggle-list">
          <ToggleRow
            title="Trip Updates"
            desc="Receive essential updates about your booked trips via WhatsApp."
            active={notifications.trips}
            onToggle={async (nextState) => {
              console.log("Toggling Trip Updates to:", nextState);
              handleToggle("trips");
              return true;
            }}
          />
          <ToggleRow
            title="Promotional Emails"
            desc="Get notified about new group trips, discounts, and offers."
            active={notifications.promo}
            onToggle={async (nextState) => {
              console.log("Toggling Promotional Emails to:", nextState);
              handleToggle("promo");
              return true;
            }}
          />
        </div>
      </div>
      <hr className="divider" />
      <div className="profile-section danger-zone">
        <div className="profile-section__title">
          <h2>Danger Zone</h2>
        </div>
        <div className="danger-card">
          <div className="danger-card__text">
            <h3>Delete Account</h3>
            <p>
              Permanently remove your account and all booking history. This
              action cannot be undone.
            </p>
          </div>
          <Button solid>Delete Account</Button>
        </div>
      </div>
    </main>
  );
};
interface ToggleRowProps {
  title: string;
  desc: string;
  active: boolean;
  onToggle: (nextState: boolean) => boolean | Promise<boolean>;
}
const ToggleRow = ({ title, desc, active, onToggle }: ToggleRowProps) => (
  <div className="toggle-row">
    <div className="toggle-row__info">
      <h4>{title}</h4>
      <p>{desc}</p>
    </div>
    <Switch initialValue={active} onChange={onToggle} />
  </div>
);

export default ProfileSettings;

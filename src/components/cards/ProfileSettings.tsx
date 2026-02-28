import { useState } from "react";
// import Button from "../utils/Button";
import { TextInput, Switch } from "../utils/InputUtils";
import { trpc } from "../../trpc"; // Adjust this import to your trpc helper path
import InteractiveButton from "../utils/InteractiveButton";

const ProfileSettings = () => {
  const [passwords, setPasswords] = useState({
    current: "",
    next: "",
    confirm: "",
  });

  const changePassword = trpc.user.changePassword.useMutation({
    onSuccess: () => {
      alert("Password updated successfully!");
      setPasswords({ current: "", next: "", confirm: "" }); // Reset form
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  const handlePasswordChange = async () => {
    if (!passwords.current || !passwords.next) {
      alert("Please fill in all fields.");
      return;
    }

    if (passwords.next !== passwords.confirm) {
      alert("New passwords do not match!");
      return;
    }

    try {
      await changePassword.mutateAsync({
        currentPassword: passwords.current,
        newPassword: passwords.next,
      });
      alert("Password updated successfully!");
      setPasswords({ current: "", next: "", confirm: "" });
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
      }
    }
  };
  const { data: user, isLoading, error } = trpc.user.getMe.useQuery();
  const updateSettings = trpc.user.updateSettings.useMutation();
  if (isLoading) return <div>Loading profile...</div>;
  if (error || !user) return <div>Error loading profile data.</div>;
  const handleSettingChange = async (
    key: "receiveTripUpdates" | "receivePromoEmails",
    nextState: boolean,
  ) => {
    try {
      await updateSettings.mutateAsync({
        key,
        value: nextState,
      });
      return true;
    } catch (error) {
      console.error(`Failed to update ${key}:`, error);
      return false;
    }
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
            type="password"
            value={passwords.current}
            onChange={(e) =>
              setPasswords({ ...passwords, current: e.target.value })
            }
          />
          <TextInput
            label="New Password"
            placeholder="Enter new password"
            type="password"
            value={passwords.next}
            onChange={(e) =>
              setPasswords({ ...passwords, next: e.target.value })
            }
          />
          <TextInput
            label="Confirm New Password"
            placeholder="Confirm new password"
            type="password"
            value={passwords.confirm}
            onChange={(e) =>
              setPasswords({ ...passwords, confirm: e.target.value })
            }
          />
        </div>

        <InteractiveButton solid onClick={handlePasswordChange}>
          Update Password
        </InteractiveButton>
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
            active={user.receiveTripUpdates} // Using fetched data
            onToggle={(nextState) =>
              handleSettingChange("receiveTripUpdates", nextState)
            }
          />
          <ToggleRow
            title="Promotional Emails"
            desc="Get notified about new group trips, discounts, and offers."
            active={user.receivePromoEmails} // Using fetched data
            onToggle={(nextState) =>
              handleSettingChange("receivePromoEmails", nextState)
            }
          />
        </div>
      </div>

      {/* <hr className="divider" />

      <div className="profile-section danger-zone">
        <div className="profile-section__title">
          <h2>Danger Zone</h2>
        </div>
        <div className="danger-card">
          <div className="danger-card__text">
            <h3>Delete Account</h3>
            <p>Permanently remove your account and all booking history.</p>
          </div>
          <Button solid>Delete Account</Button>
        </div>
      </div> */}
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

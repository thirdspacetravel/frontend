import AvatarUpload from "../../../components/utils/AvatarUpload";
import { TextInput } from "../../../components/utils/InputUtils";
import Button from "../../../components/utils/Button";
import type { AdminUser } from "./types";
const AdminInfoCard = ({ admin }: { admin: AdminUser | undefined }) => {
  return (
    <div className="profile__card">
      <header className="profile__header">
        <div className="profile__info">
          <h2 className="profile__title">Profile Information</h2>
          <p className="profile__subtitle">
            Update your personal details and public profile.
          </p>
        </div>
        <Button solid>Save Changes</Button>
      </header>
      <div className="profile__body">
        <AvatarUpload imageUrl={`/avatars/${admin?.avatarUrl || ""}`} />
        <div className="profile__row col-2">
          <TextInput
            label="First Name"
            id="first-name"
            defaultValue={admin?.firstName || "Admin"}
          />
          <TextInput
            label="Last Name"
            id="last-name"
            defaultValue={admin?.lastName || "User"}
          />
        </div>
        <div className="profile__row col-2">
          <TextInput
            label="Username"
            id="username"
            defaultValue={admin?.username || "admin"}
          />
          <TextInput
            label="Password"
            id="password"
            type="password"
            defaultValue=""
          />
        </div>
        {/* Email Address */}
        <TextInput
          label="Email Address"
          id="email"
          type="email"
          defaultValue={admin?.email || "admin@thirdspace.com"}
        />
        <TextInput
          label="Role"
          id="role"
          defaultValue={admin?.role || "Super Admin"}
          readOnly
          disabled
        />
      </div>
    </div>
  );
};

export default AdminInfoCard;

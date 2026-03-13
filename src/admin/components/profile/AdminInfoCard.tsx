import { useState } from "react";
import AvatarUpload from "../../../components/utils/AvatarUpload";
import { TextInput } from "../../../components/utils/InputUtils";
import Button from "../../../components/utils/Button";
import type { AdminUser } from "./types";
import { trpc } from "../../../trpc";

const AdminInfoCard = ({ admin }: { admin: AdminUser | undefined }) => {
  const utils = trpc.useUtils();
  const updateMutation = trpc.admin.updateProfile.useMutation({
    onSuccess: () => {
      utils.admin.getMe.invalidate();
      alert("Profile updated!");
    },
  });
  const [formData, setFormData] = useState({
    firstName: admin?.firstName || "",
    lastName: admin?.lastName || "",
    username: admin?.username || "",
    email: admin?.email || "",
    password: "",
    avatarUrl: admin?.avatarUrl || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = () => {
    const payload = {
      ...formData,
      ...(formData.password.length > 0 ? { password: formData.password } : {}),
    };

    console.log("Updating admin data:", payload);

    // Call your API function here:
    updateMutation.mutate({
      id: admin?.id || "",
      firstName: formData.firstName,
      lastName: formData.lastName,
      username: formData.username,
      password: formData.password,
      avatarUrl: formData.avatarUrl,
    });
  };

  return (
    <div className="profile__card">
      <header className="profile__header">
        <div className="profile__info">
          <h2 className="profile__title">Profile Information</h2>
          <p className="profile__subtitle">
            Update your personal details and public profile.
          </p>
        </div>
        {/* Trigger submit */}
        <Button solid onClick={handleSubmit}>
          Save Changes
        </Button>
      </header>
      <div className="profile__body">
        <AvatarUpload
          imageUrl={
            formData.avatarUrl
              ? formData.avatarUrl === "admin.png"
                ? `/avatars/admin.png`
                : `${import.meta.env.VITE_API_URL}/images/${formData.avatarUrl}`
              : `/avatars/admin.png`
          }
          onUploadSuccess={(url) => {
            setFormData((prev) => ({ ...prev, avatarUrl: url }));
          }}
        />
        <div className="profile__row col-2">
          <TextInput
            label="First Name"
            id="firstName" // Changed to match state key
            value={formData.firstName}
            onChange={handleChange}
          />
          <TextInput
            label="Last Name"
            id="lastName" // Changed to match state key
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>
        <div className="profile__row col-2">
          <TextInput
            label="Username"
            id="username"
            value={formData.username}
            onChange={handleChange}
          />
          <TextInput
            label="Password"
            id="password"
            type="password"
            autoComplete="new-password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Leave blank to keep current"
          />
        </div>
        <TextInput
          label="Email Address"
          id="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
        />
        <TextInput
          label="Role"
          id="role"
          defaultValue={admin?.role || ""}
          readOnly
          disabled
        />
      </div>
    </div>
  );
};

export default AdminInfoCard;

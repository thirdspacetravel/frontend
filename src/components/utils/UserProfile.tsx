import React from "react";

interface UserProfileProps {
  name: string;
  email: string;
  avatarUrl: string;
  onClick?: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({
  name,
  email,
  avatarUrl,
  onClick = undefined,
}) => {
  return (
    <div className="user-profile" onClick={onClick}>
      <div className="user-profile__avatar-container">
        <img
          src={avatarUrl}
          alt="User Avatar"
          className="user-profile__avatar"
        />
      </div>
      <div className="user-profile__details">
        <h3 className="user-profile__name">{name}</h3>
        <p className="user-profile__email">{email}</p>
      </div>
    </div>
  );
};

export default UserProfile;

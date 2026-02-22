import React, { useState } from "react";
import { PrefixInput, TextInput } from "../../../components/utils/InputUtils";
import Button from "../../../components/utils/Button";

const InviteTeamMemberForm: React.FC = () => {
  const [number, setNumber] = useState("");
  const [fullName, setFullName] = useState("");
  return (
    <div className="profile__card">
      <header className="profile__header">
        <div className="profile__info">
          <h2 className="profile__title">Invite Team Member</h2>
          <p className="profile__subtitle">
            Invite a new user to collaborate in the admin dashboard.
          </p>
        </div>
        <button className="profile__close" aria-label="Close modal">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M15 5L5 15M5 5L15 15"
              stroke="currentColor"
              strokeWidth="1.66"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </header>

      <div className="profile__body">
        <TextInput
          label="Full Name"
          id="full-name"
          placeholder="e.g. Priya Sharma"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <PrefixInput
          label="Phone Number"
          id="phone-number"
          prefix="+91"
          placeholder="234 567 890"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
      </div>

      <footer className="profile__footer">
        <Button>Cancel</Button>
        <Button solid>Add Member</Button>
      </footer>
    </div>
  );
};

export default InviteTeamMemberForm;

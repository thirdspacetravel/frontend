import React from "react";
import Button from "../../../components/utils/Button";
const TeamMembersSection: React.FC = () => {
  const members = [
    {
      id: 1,
      name: "Admin User (You)",
      email: "admin@thirdspace.com",
      role: "Super Admin",
      status: "active",
      avatar: "https://placehold.co/40x40",
    },
    {
      id: 2,
      name: "Rahul Mehta",
      email: "rahul.m@thirdspace.com",
      role: "Trip Manager",
      status: "active",
      avatar: "https://placehold.co/40x40",
    },
    {
      id: 3,
      name: "Sarah Jenkins",
      email: "sarah.j@thirdspace.com",
      role: "Trip Manager",
      status: "active",
      avatar: "https://placehold.co/40x40",
    },
    {
      id: 4,
      name: "Anjali Gupta",
      email: "anjali.g@thirdspace.com",
      role: "Trip Manager",
      status: "active",
      initials: "AG",
    },
  ];

  return (
    <div className="profile__card">
      <div className="profile__header">
        <div className="profile__info">
          <h2 className="profile__title">Team Members</h2>
          <p className="profile__subtitle">
            Manage who has access to the admin dashboard and their roles.
          </p>
        </div>
        <Button solid>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M3.3335 8.00016H12.6668M8.00016 3.3335V12.6668"
              stroke="white"
              strokeWidth="1.33"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Add Member
        </Button>
      </div>

      <div className="profile__body no-padding">
        {members.map((member) => (
          <div key={member.id} className="data-row">
            <div className="data-row__profile">
              {member.avatar ? (
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="data-row__avatar"
                />
              ) : (
                <div className="data-row__initials">{member.initials}</div>
              )}
              <div className="data-row__details">
                <span className="data-row__name">{member.name}</span>
                <span className="data-row__email">{member.email}</span>
              </div>
            </div>

            <div className="data-row__actions">
              <span
                className={`badge badge--${member.role.toLowerCase().replace(" ", "-")}`}
              >
                {member.role}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamMembersSection;

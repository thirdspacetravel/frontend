const UserVerifiedIcon = ({ color = "currentColor", ...props }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* User Body/Shoulders */}
      <path
        d="M3 22C3 18.13 6.85 15 11.59 15C12.55 15 13.48 15.13 14.35 15.37"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Verified Badge Circle */}
      <path
        d="M22 18C22 18.75 21.79 19.46 21.42 20.06C21.21 20.42 20.94 20.74 20.63 21C19.93 21.63 19.01 22 18 22C16.54 22 15.27 21.22 14.58 20.06C14.21 19.46 14 18.75 14 18C14 16.74 14.58 15.61 15.5 14.88C16.19 14.33 17.06 14 18 14C20.21 14 22 15.79 22 18Z"
        stroke={color}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Checkmark inside Badge */}
      <path
        d="M16.44 18L17.43 18.99L19.56 17.02"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default UserVerifiedIcon;

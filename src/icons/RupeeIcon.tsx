const RupeeIcon = ({ color = "currentColor", ...props }) => {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M5 2.5H15M5 6.66667H15M5 10.8333L12.0833 17.5M5 10.8333H7.5M7.5 10.8333C13.0558 10.8333 13.0558 2.5 7.5 2.5"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default RupeeIcon;

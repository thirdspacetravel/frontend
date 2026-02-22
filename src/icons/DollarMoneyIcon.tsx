const DollarMoneyIcon = ({ color = "currentColor", ...props }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M9.5 13.75C9.5 14.72 10.25 15.5 11.17 15.5H13.05C13.85 15.5 14.5 14.82 14.5 13.97C14.5 13.06 14.1 12.73 13.51 12.52L10.5 11.47C9.91 11.26 9.51001 10.94 9.51001 10.02C9.51001 9.17999 10.16 8.48999 10.96 8.48999H12.84C13.76 8.48999 14.51 9.26999 14.51 10.24"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 7.5V16.5"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Main Circle Path */}
      <path
        d="M21.9995 12C21.9995 17.52 17.5195 22 11.9995 22C6.47951 22 1.99951 17.52 1.99951 12C1.99951 6.48 6.47951 2 11.9995 2"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Top Right Arrow/Indicator */}
      <path
        d="M22 6V2H18"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17 7L22 2"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default DollarMoneyIcon;

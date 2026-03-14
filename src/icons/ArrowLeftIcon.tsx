import React from "react";

interface ArrowLeftIconProps extends React.SVGProps<SVGSVGElement> {
  color?: string;
}

const ArrowLeftIcon: React.FC<ArrowLeftIconProps> = ({
  color = "currentColor",
  ...props
}) => {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M6.38 3.95L2.33 8L6.38 12.05"
        stroke={color}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.67 8H2.45"
        stroke={color}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ArrowLeftIcon;

import React from "react";
import type { ReactNode, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  solid?: boolean;
  bold?: boolean;
  inverted?: boolean;
  uppercase?: boolean;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  solid = false,
  bold = false,
  inverted = false,
  uppercase = false,
  disabled = false,
  className = "",
  ...props
}) => {
  const variantClasses = `${solid ? "btn-solid" : ""} ${bold ? "fw-bold" : ""} ${uppercase ? "uppercase" : ""} ${inverted ? "inverted" : ""} ${disabled ? "btn--disabled" : ""}`;
  const combinedClasses = `btn ${variantClasses} ${className}`.trim();

  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
};

export default Button;

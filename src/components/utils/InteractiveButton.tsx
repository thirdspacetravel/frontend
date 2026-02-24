import React, { useState } from "react";
import type { ReactNode, ButtonHTMLAttributes, MouseEvent } from "react";
import Spinner from "./Spinner";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  solid?: boolean;
  bold?: boolean;
  inverted?: boolean;
  uppercase?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  solid = false,
  bold = false,
  inverted = false,
  uppercase = false,
  disabled = false,
  className = "",
  onClick,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleClick = async (e: MouseEvent<HTMLButtonElement>) => {
    if (!onClick) return;

    const result: unknown = onClick(e);

    if (result instanceof Promise) {
      setIsLoading(true);
      try {
        await result;
      } finally {
        setIsLoading(false);
      }
    }
  };

  const variantClasses = `
    ${solid ? "btn-solid" : ""} 
    ${bold ? "fw-bold" : ""} 
    ${uppercase ? "uppercase" : ""} 
    ${inverted ? "inverted" : ""} 
    ${disabled || isLoading ? "btn--disabled" : ""}
  `.trim();

  return (
    <button
      className={`btn ${variantClasses} ${className}`}
      onClick={handleClick}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <div className="spinner-wrapper">
          <Spinner size={20} strokeWidth={2} speed={0.8} />
        </div>
      )}
      <span
        className={`interactive-btn-container ${isLoading ? "is-loading" : ""}`}
      >
        {children}
      </span>
    </button>
  );
};

export default Button;

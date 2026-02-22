import React, { useState, useEffect, useRef } from "react";
import ChevronDownIcon from "../../icons/ChevronDownIcon";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  wrapperClass?: string;
}

export const TextInput: React.FC<TextInputProps> = ({
  label,
  id,
  wrapperClass = "",
  ...props
}) => {
  return (
    <div className={`input__field ${wrapperClass ? wrapperClass : ""}`}>
      <label htmlFor={id}>{label}</label>
      <input id={id} type="text" {...props} />
    </div>
  );
};
interface PrefixInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  prefix: string;
}

export const PrefixInput: React.FC<PrefixInputProps> = ({
  label,
  prefix,
  id,
  ...props
}) => {
  return (
    <div className="input__field">
      <label htmlFor={id}>{label}</label>
      <div className="input-prefix">
        <span className="prefix">{prefix}</span>
        <input id={id} {...props} />
      </div>
    </div>
  );
};

interface NumberInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const NumberInput: React.FC<NumberInputProps> = ({
  label,
  id,
  ...props
}) => {
  return (
    <div className="input__field">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type="number"
        min={2} // Ensures the value cannot go below zero
        {...props}
      />
    </div>
  );
};

interface DropdownOption {
  label: string;
  value: number | null;
}

interface CustomDropdownProps {
  options: DropdownOption[];
  value?: number | null;
  onSelect?: (option: number | null) => void;
  placeholder?: string;
  direction?: "down" | "up";
}

export const CustomDropdown: React.FC<CustomDropdownProps> = ({
  options,
  value = null,
  onSelect,
  placeholder = "Select an option",
  direction = "down",
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<number | null>(value);

  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  const selectedOption = options.find((opt) => opt.value === selectedValue);
  const displayLabel = selectedOption ? selectedOption.label : placeholder;
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleOptionClick = (optionValue: number | null) => {
    setSelectedValue(optionValue);
    if (onSelect) onSelect(optionValue);
    setIsOpen(false);
  };

  return (
    <div
      className={`custom-select ${isOpen ? "custom-select--open" : ""} ${direction == "up" ? "custom-select--dropup" : ""} `}
      ref={dropdownRef}
    >
      <div
        className="custom-select__header"
        onClick={() => setIsOpen(!isOpen)}
        role="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") setIsOpen(!isOpen);
        }}
      >
        <span>{displayLabel}</span>
        <ChevronDownIcon
          className={`custom-select__arrow ${isOpen ? "up" : "down"}`}
        />
      </div>

      <ul className="custom-select__list" role="listbox">
        {options.map((option, index) => (
          <li
            key={option.value !== null ? option.value : `null-opt-${index}`}
            className={`custom-select__item ${
              option.value === selectedValue
                ? "custom-select__item--active"
                : ""
            }`}
            role="option"
            aria-selected={option.value === selectedValue}
            onClick={() => handleOptionClick(option.value)}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  fillbox?: boolean;
}

export const TextArea: React.FC<TextAreaProps> = ({
  label,
  id,
  fillbox = false,
  ...props
}) => {
  return (
    <div className={`input__field ${fillbox ? "fillbox" : ""}`}>
      <label htmlFor={id}>{label}</label>
      <textarea id={id} {...props} />
    </div>
  );
};

interface SwitchProps {
  initialValue?: boolean;
  onChange?: (nextState: boolean) => boolean | Promise<boolean>;
  className?: string;
  disabled?: boolean;
}

export const Switch: React.FC<SwitchProps> = ({
  initialValue = false,
  onChange,
  className = "",
  disabled = false,
}) => {
  const [isActive, setIsActive] = useState<boolean>(initialValue);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleToggle = async () => {
    if (isLoading || disabled) return;
    const nextState = !isActive;
    if (!onChange) {
      setIsActive(nextState);
      return;
    }

    try {
      setIsLoading(true);
      const shouldToggle = await onChange(nextState);

      if (shouldToggle === true) {
        setIsActive(nextState);
      }
    } catch (error) {
      console.error("Switch validation failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`switch ${isActive ? "active" : ""} ${isLoading ? "loading" : ""} ${disabled ? "disabled" : ""} ${className}`}
      onClick={handleToggle}
    >
      <div className="switch__handle"></div>
    </div>
  );
};

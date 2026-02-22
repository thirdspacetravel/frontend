import React, { useState, useRef, useEffect } from "react";
import ChevronDownIcon from "../../icons/ChevronDownIcon";

interface FilterOption {
  label: string;
  value: string | number | null;
}

interface FilterItemProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  options: FilterOption[];
  onChange: (selected: FilterOption | null) => void;
}

const FilterItem: React.FC<FilterItemProps> = ({
  icon: Icon,
  label,
  options,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleSelect = (option: FilterOption | null) => {
    if (!option) {
      setSelectedLabel(null);
      onChange(null);
      setIsOpen(false);
    } else {
      setSelectedLabel(option.label);
      onChange(option);
    }
    setIsOpen(false);
  };

  return (
    <div className="filter-bar__item" ref={dropdownRef}>
      <div className="filter-bar__clickable" onClick={() => setIsOpen(!isOpen)}>
        <Icon className="filter-icon" />
        <span
          className={`filter-bar__label ${selectedLabel ? "is-selected" : ""}`}
        >
          {selectedLabel || label}
        </span>
        <ChevronDownIcon className={`chevron ${isOpen ? "rotate" : ""}`} />
      </div>

      {isOpen && (
        <ul className="filter-dropdown">
          <li
            className={`filter-dropdown__option ${selectedLabel === null ? "filter-dropdown__option--active" : ""}`}
            onClick={() => handleSelect(null)}
          >
            Select {label}
          </li>

          <div className="filter-dropdown__divider" />
          {options.map((opt) => (
            <li
              key={opt.value?.toString()}
              className={`filter-dropdown__option ${opt.label === selectedLabel ? "filter-dropdown__option--active" : ""}`}
              onClick={() => handleSelect(opt)}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default FilterItem;

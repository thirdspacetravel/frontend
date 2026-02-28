import React, { useLayoutEffect, useRef, useState } from "react";

export interface ActionOption {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  isDanger?: boolean;
}

interface ActionMenuProps {
  title?: string;
  sections: ActionOption[][];
}

const ActionMenu: React.FC<ActionMenuProps> = ({
  title = "Actions",
  sections,
}) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [isUpsideDown, setIsUpsideDown] = useState(false);

  useLayoutEffect(() => {
    if (menuRef.current) {
      const rect = menuRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // If the bottom of the menu goes past the viewport height, flip it
      if (rect.bottom > viewportHeight) {
        setIsUpsideDown(true);
      }
    }
  }, []);
  return (
    <div
      ref={menuRef}
      className={`action-menu ${isUpsideDown ? "action-menu--reverse" : ""}`}
    >
      <div className="action-menu__header">
        <span className="action-menu__title">{title}</span>
      </div>

      {sections.map((group, groupIndex) => (
        <React.Fragment key={groupIndex}>
          <div className="action-menu__section">
            {group.map((option, optionIndex) => (
              <button
                key={optionIndex}
                className={`action-menu__item ${option.isDanger ? "action-menu__item--danger" : ""}`}
                onClick={option.onClick}
              >
                {option.icon}
                <span>{option.label}</span>
              </button>
            ))}
          </div>
          {groupIndex < sections.length - 1 && (
            <hr className="action-menu__divider" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default ActionMenu;

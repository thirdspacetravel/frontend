import React, { useState } from "react";
interface TabData {
  id: string;
  label: string;
}

interface TabsProps {
  initialActiveTab?: string;
  onTabChange?: (tabId: string) => void;
}

const TABS: TabData[] = [
  { id: "all", label: "All" },
  { id: "unread", label: "Unread (3)" },
  { id: "bookings", label: "Bookings" },
  { id: "enquiries", label: "Enquiries" },
  { id: "alerts", label: "Alerts" },
];

const NotificationCategoryTabs: React.FC<TabsProps> = ({
  initialActiveTab = "all",
  onTabChange,
}) => {
  const [activeTab, setActiveTab] = useState<string>(initialActiveTab);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    if (onTabChange) {
      onTabChange(tabId);
    }
  };

  return (
    <div className="tabs" role="tablist">
      {TABS.map((tab) => {
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            className={`tabs__item ${isActive ? "tabs__item--active" : ""}`}
            onClick={() => handleTabClick(tab.id)}
            role="tab"
            aria-selected={isActive}
            tabIndex={isActive ? 0 : -1}
          >
            <span
              className={`tabs__text ${isActive ? "tabs__text--active" : ""}`}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default NotificationCategoryTabs;

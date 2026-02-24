import React, { useState } from "react";
import { TextArea, TextInput } from "../../../components/utils/InputUtils";
import Button from "../../../components/utils/Button";
import AddIcon from "../../../icons/AddIcon";
interface DayData {
  title: string;
  subtitle: string;
}

interface ItineraryPlannerProps {
  ItineraryData: DayData[];
  onChange: (newData: DayData[]) => void;
}

const ItineraryPlanner: React.FC<ItineraryPlannerProps> = ({
  ItineraryData,
  onChange,
}) => {
  // Local state to track which index is currently open (accordion style)
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  // Sync changes back to the parent component
  const updateItem = (index: number, field: keyof DayData, value: string) => {
    const newData = [...ItineraryData];
    newData[index] = { ...newData[index], [field]: value };
    onChange(newData);
  };

  const handleAddDay = () => {
    const newDay: DayData = { title: "", subtitle: "" };
    const updatedData = [...ItineraryData, newDay];
    onChange(updatedData);
    // Automatically focus the new day
    setExpandedIndex(updatedData.length - 1);
  };

  const handleDeleteActive = () => {
    // Only delete if an item is currently selected/expanded
    if (expandedIndex !== null) {
      const updatedData = ItineraryData.filter((_, i) => i !== expandedIndex);
      onChange(updatedData);
      // Close the accordion since that specific data no longer exists
      setExpandedIndex(null);
    }
  };

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="content-canvas__card">
      <header className="content-canvas__header">
        <h2 className="content-canvas__title">Day-wise Itinerary</h2>
        <div className="button-wrap">
          <Button
            className={`btn ${expandedIndex === null || ItineraryData.length === 0 ? "btn--disabled" : "btn--danger"}`}
            onClick={handleDeleteActive}
            disabled={expandedIndex === null || ItineraryData.length === 0}
          >
            Delete
          </Button>
          <Button solid onClick={handleAddDay}>
            <AddIcon /> Add Day
          </Button>
        </div>
      </header>

      <div className="content-canvas__body">
        {ItineraryData.map((day, index) => {
          const isExpanded = expandedIndex === index;

          return (
            <div
              key={index}
              className={`itinerary-day ${isExpanded ? "itinerary-day--active" : ""}`}
            >
              <div
                className="itinerary-day__header"
                style={{ cursor: "pointer" }}
                onClick={() => toggleExpand(index)}
              >
                <h3 className="itinerary-day__label">
                  Day {index + 1}: {day.title || "New Day"}
                </h3>
                <span
                  className={`itinerary-day__arrow ${isExpanded ? "itinerary-day__arrow--down" : ""}`}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d={isExpanded ? "M4 6L8 10L12 6" : "M6 12L10 8L6 4"}
                      stroke="currentColor"
                      strokeWidth="1.33"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>

              {isExpanded && (
                <div className="itinerary-day__details">
                  <TextInput
                    label="Title"
                    id={`itinerary-title-${index}`}
                    value={day.title}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      updateItem(index, "title", e.target.value)
                    }
                  />
                  <TextArea
                    label="Description"
                    id={`itinerary-desc-${index}`}
                    value={day.subtitle}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                      updateItem(index, "subtitle", e.target.value)
                    }
                    rows={3}
                  />
                </div>
              )}
            </div>
          );
        })}

        {ItineraryData.length === 0 && (
          <p className="empty-iternary">
            No days added. Click "+ Add Day" to begin.
          </p>
        )}
      </div>
    </div>
  );
};

export default ItineraryPlanner;

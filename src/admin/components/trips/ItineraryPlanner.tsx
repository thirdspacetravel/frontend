import React, { useState } from "react";
import { TextArea, TextInput } from "../../../components/utils/InputUtils";

// interface DayItem {
//   id: number;
//   title: string;
//   description: string;
//   isDinnerIncluded: boolean;
//   isHotelStay: boolean;
//   isExpanded: boolean;
// }

const ItineraryPlanner: React.FC = () => {
  const [isDayOneExpanded, setIsDayOneExpanded] = useState(true);

  return (
    <div className="content-canvas__card">
      <header className="content-canvas__header">
        <h2 className="content-canvas__title">Day-wise Itinerary</h2>
        <div className="button-wrap">
          <div className="btn btn--disabled">Delete</div>
          <button className="btn btn--secondary">+ Add Day</button>
        </div>
      </header>

      {/* Days List div */}
      <div className="content-canvas__body">
        {/* Day 1 - Expanded Example */}
        <div
          className={`itinerary-day ${isDayOneExpanded ? "itinerary-day--active" : ""}`}
        >
          <div
            className="itinerary-day__header"
            onClick={() => setIsDayOneExpanded(!isDayOneExpanded)}
          >
            <h3 className="itinerary-day__label">
              Day 1: Departure from Chandigarh
            </h3>
            <span
              className={`itinerary-day__arrow ${isDayOneExpanded ? "itinerary-day__arrow--down" : ""}`}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M4 6L8 10L12 6"
                  stroke="currentColor"
                  strokeWidth="1.33"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>

          {isDayOneExpanded && (
            <div className="itinerary-day__details">
              {/* Title Field */}
              <TextInput
                label="Title"
                id="itinerary-title"
                defaultValue="Departure from Chandigarh"
              />
              <TextArea
                label="Description"
                id="itinerary-desc"
                defaultValue="Meet at Sector 43 ISBT at 8 PM. Overnight journey to Kalpa/Reckong Peo."
                rows={3}
              />
            </div>
          )}
        </div>
        <div className="itinerary-day">
          <div className="itinerary-day__header">
            <h3 className="itinerary-day__label">Day 2: Arrival in Kalpa</h3>
            <span className="itinerary-day__arrow">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M6 12L10 8L6 4"
                  stroke="currentColor"
                  strokeWidth="1.33"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
        </div>

        {/* Day 3 - Collapsed Example */}
        <div className="itinerary-day">
          <div className="itinerary-day__header">
            <h3 className="itinerary-day__label">Day 3: Transfer to Kaza</h3>
            <span className="itinerary-day__arrow">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M6 12L10 8L6 4"
                  stroke="currentColor"
                  strokeWidth="1.33"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItineraryPlanner;

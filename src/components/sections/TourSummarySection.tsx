import React from "react";
import LocationIcon from "../../icons/LocationIcon";
import CalendarIcon from "../../icons/CalendarIcon";
import ClockIcon from "../../icons/ClockIcon";

interface TourSummaryProps {
  title?: string;
  location?: string;
  dateRange?: string;
  duration?: string;
  features?: string;
}

const TourSummary: React.FC<TourSummaryProps> = ({
  title = "Himalayan Highland Escape",
  location = "Manali & Spiti Valley",
  dateRange = "Jun 15 - Jun 20",
  duration = "6 Days / 5 Nights",
  features = "Stay • Meal • Trek • Transport",
}) => {
  return (
    <div className="tour-summary">
      <div className="tour-summary__info">
        <h1 className="tour-summary__title">{title}</h1>

        <div className="tour-summary__details">
          <div className="tour-summary__detail-item">
            <span className="tour-summary__icon">
              <LocationIcon />
            </span>
            <span className="tour-summary__detail-text">{location}</span>
          </div>
          <div className="tour-summary__detail-item">
            <span className="tour-summary__icon">
              <CalendarIcon />
            </span>
            <span className="tour-summary__detail-text">{dateRange}</span>
          </div>
          <div className="tour-summary__detail-item">
            <span className="tour-summary__icon">
              <ClockIcon />
            </span>
            <span className="tour-summary__detail-text">{duration}</span>
          </div>
        </div>
      </div>

      <div className="tour-summary__features">
        <span className="tour-summary__feature-text">{features}</span>
      </div>
    </div>
  );
};

export default TourSummary;

import CalendarIcon from "../../icons/CalendarIcon";
import ClockIcon from "../../icons/ClockIcon";
import Button from "../utils/Button";

export interface TripData {
  id: string;
  title: string;
  image: string;
  badge: string;
  date: string;
  duration: string;
  tags: string[];
  price: string;
}

// 2. Define the Component Props
interface TripCardProps {
  trip: TripData;
  className?: string;
  onClick?: () => void;
}

const TripCard = ({
  trip,
  className = "",
  onClick = () => {},
}: TripCardProps) => {
  return (
    <article className={`trip-card ${className}`}>
      <div className="trip-card__image-wrapper">
        <img src={trip.image} alt={trip.title} className="trip-card__image" />
      </div>

      <div className="trip-card__content">
        <div className="trip-card__header">
          <h3 className="trip-card__title">{trip.title}</h3>
          <span className="trip-card__badge">{trip.badge}</span>
        </div>

        <div className="trip-card__details">
          <div className="trip-card__info-item">
            <CalendarIcon />
            <span>{trip.date}</span>
          </div>
          <div className="trip-card__info-item">
            <ClockIcon />
            <span>{trip.duration}</span>
          </div>
        </div>

        <div className="trip-card__tags">
          {trip.tags.map((tag) => (
            <span key={tag} className="trip-card__tag">
              {tag}
            </span>
          ))}
        </div>

        <footer className="trip-card__footer">
          <div className="trip-card__price-box">
            <span className="trip-card__price-label">Starting from</span>
            <span className="trip-card__price-value">₹{trip.price}</span>
          </div>
          <Button solid onClick={onClick}>
            View Details
          </Button>
        </footer>
      </div>
    </article>
  );
};
export default TripCard;

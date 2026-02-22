import React from "react";
import CalendarIcon from "../../icons/CalendarIcon";
import CardIcon from "../../icons/CardIcon";
import ClockIcon from "../../icons/ClockIcon";
import FilterItem from "../utils/FilterItem";
import Button from "../utils/Button";
import TripCard from "../cards/TripCard";
import LocationIcon from "../../icons/LocationIcon";

const TRIPS = [
  {
    id: 1,
    title: "Manali Leisure",
    image: "https://placehold.co/363x240",
    badge: "Best Seller",
    date: "Apr 12-15",
    duration: "4D/3N",
    tags: ["Stay", "Meals", "Trek", "Transport"],
    price: "8,499",
  },
  {
    id: 2,
    title: "Goa Unwind",
    image: "https://placehold.co/363x240",
    badge: "Relaxing",
    date: "May 05-08",
    duration: "4D/3N",
    tags: ["Villa Stay", "Breakfast", "Yoga", "Scooter"],
    price: "12,999",
  },
  {
    id: 3,
    title: "Gokarna Beach Trek",
    image: "https://placehold.co/363x240",
    badge: "Adventure",
    date: "Apr 20-22",
    duration: "3D/2N",
    tags: ["Camping", "Bonfire", "Guide", "Meals"],
    price: "5,999",
  },
  {
    id: 4,
    title: "Kashmir Great Lakes",
    image: "https://placehold.co/363x240",
    badge: "Summer Special",
    date: "Jun 10-16",
    duration: "7D/6N",
    tags: ["Stay", "Meals", "Trek", "Transport"],
    price: "24,999",
  },
  {
    id: 5,
    title: "Tirthan Valley Escape",
    image: "https://placehold.co/363x240",
    badge: "Offbeat",
    date: "Apr 28-30",
    duration: "3D/2N",
    tags: ["Villa Stay", "Breakfast", "Yoga", "Scooter"],
    price: "7,499",
  },
  {
    id: 6,
    title: "Bir Billing Weekend",
    image: "https://placehold.co/363x240",
    badge: "Weekend",
    date: "May 12-14",
    duration: "3D/2N",
    tags: ["Camping", "Bonfire", "Guide", "Meals"],
    price: "6,499",
  },
];
interface FilterOption {
  label: string;
  value: string | number | null;
}
const filterConfigs = [
  {
    id: "month",
    label: "Month",
    icon: CalendarIcon,
    options: [
      { label: "Jan", value: 1 },
      { label: "Feb", value: 2 },
    ],
  },
  {
    id: "budget",
    label: "Budget",
    icon: CardIcon,
    options: [
      { label: "Low", value: "l" },
      { label: "High", value: "h" },
    ],
  },
  {
    id: "dest",
    label: "Destination",
    icon: LocationIcon,
    options: [
      { label: "Paris", value: "par" },
      { label: "Tokyo", value: "tok" },
    ],
  },
  {
    id: "duration",
    label: "Duration",
    icon: ClockIcon,
    options: [
      { label: "1 Week", value: 7 },
      { label: "2 Weeks", value: 14 },
    ],
  },
];

const handleUpdate = (id: string, selected: FilterOption | null) => {
  console.log(`Filter ${id} is now:`, selected ? selected.value : "Cleared");
};
const BookingSection: React.FC = () => {
  return (
    <section className="trips-section booking-section">
      <div className="trips-section__container">
        <header className="trips-section__header">
          <h2 className="trips-section__title">Upcoming Group Trips</h2>
          <p className="trips-section__subtitle">
            Curated experiences designed for connection and calm.
          </p>
        </header>
        <div className="filter-bar">
          {filterConfigs.map((item, index) => (
            <React.Fragment key={item.id}>
              <FilterItem
                icon={item.icon}
                label={item.label}
                options={item.options}
                onChange={(val) => handleUpdate(item.id, val)}
              />
              {index < filterConfigs.length - 1 && (
                <div className="filter-bar__divider" />
              )}
            </React.Fragment>
          ))}
          <Button solid>Filter</Button>
        </div>
        <div className="trips-section__grid">
          {TRIPS.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BookingSection;

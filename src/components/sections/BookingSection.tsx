import React from "react";
import CalendarIcon from "../../icons/CalendarIcon";
import CardIcon from "../../icons/CardIcon";
import ClockIcon from "../../icons/ClockIcon";
import FilterItem from "../utils/FilterItem";
import Button from "../utils/Button";
import TripCard, { type TripData } from "../cards/TripCard";
import { trpc } from "../../trpc";
import { useNavigate } from "react-router";
import LocationIcon from "../../icons/LocationIcon";
// The shape of your Prisma model
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
  const navigate = useNavigate();
  const { data: TRIPS = [], isLoading } = trpc.public.fetchLiveTrips.useQuery(
    {
      page: 1,
    },
    {
      select: (data) =>
        data.map((trip): TripData => {
          const images = trip.images;
          const categories = trip.categories;

          // 1. Convert potential string to Date object
          const dateObject = trip.startDateTime
            ? new Date(trip.startDateTime)
            : null;

          return {
            id: trip.id,
            title: trip.tripName,
            image: images[0]
              ? `${import.meta.env.VITE_API_URL}/images/${images[0]}`
              : "https://placehold.co/363x240",
            badge: trip.isFeatured
              ? "Featured"
              : trip.featuredCategories
                ? trip.featuredCategories.replace(/_/g, " ") // Capitalize first letter of each word
                : "General",
            date: dateObject
              ? dateObject.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              : "Dates TBD",
            duration:
              trip.days && trip.nights
                ? `${trip.days}D/${trip.nights}N`
                : "TBD",
            tags: categories.length > 0 ? categories : ["Adventure"],
            price: (
              [trip.priceQuad, trip.priceTriple, trip.priceDouble].find(
                (price) => price !== null,
              ) || 0
            ).toLocaleString("en-IN", { style: "currency", currency: "INR" }),
          };
        }),
    },
  );
  if (isLoading) return <div></div>;
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
          {TRIPS.map((trip_item) => (
            <TripCard
              key={trip_item.id}
              trip={trip_item}
              onClick={() => {
                navigate(`/trip/${trip_item.id}`);
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BookingSection;

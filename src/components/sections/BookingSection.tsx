import React from "react";
// import CalendarIcon from "../../icons/CalendarIcon";
// import CardIcon from "../../icons/CardIcon";
// import ClockIcon from "../../icons/ClockIcon";
// import FilterItem from "../utils/FilterItem";
// import Button from "../utils/Button";
import TripCard, { type TripData } from "../cards/TripCard";
import { trpc } from "../../trpc";
import type { DayData } from "../../admin/components/trips/types";
// import LocationIcon from "../../icons/LocationIcon";
// The shape of your Prisma model
interface TripRecord {
  id: string;
  tripName: string;
  destination: string;
  tripType?: number | null;
  fullOverview: string;
  days?: number | null;
  nights?: number | null;
  totalSeats?: number | null;
  pickupLocation: string;
  dropOffLocation: string;
  inclusions: string;
  exclusions: string;
  itinerary: DayData[];
  status: number;
  isFeatured: boolean;
  isAcceptingBookings: boolean;
  categories: string[];
  priceQuad?: number | null;
  priceTriple?: number | null;
  priceDouble?: number | null;
  startDateTime?: Date | string | null;
  endDateTime?: Date | string | null;
  images: string[];
}

const transformTrip = (trip: TripRecord): TripData => {
  // Helper to format date range: "Apr 12-15"
  const formatDateRange = (
    start?: Date | string | null,
    end?: Date | string | null,
  ): string => {
    if (!start || !end) return "Dates TBD";
    const s = new Date(start);
    const month = s.toLocaleString("en-US", { month: "short" });
    return `${month} ${s.getDate()}`;
  };

  const images = trip.images;
  const categories = trip.categories;

  return {
    id: trip.id,
    title: trip.tripName,
    image: images[0]
      ? `${import.meta.env.VITE_API_URL}/images/${images[0]}`
      : "https://placehold.co/363x240",
    badge: trip.isFeatured ? "Featured" : "Winter Special",
    date: formatDateRange(trip.startDateTime, trip.endDateTime),
    duration:
      trip.days && trip.nights ? `${trip.days}D/${trip.nights}N` : "TBD",
    tags: categories.length > 0 ? categories : ["Adventure"],
    price: trip.priceQuad ? trip.priceQuad.toLocaleString() : "0",
  };
};
// interface FilterOption {
//   label: string;
//   value: string | number | null;
// }
// const filterConfigs = [
//   {
//     id: "month",
//     label: "Month",
//     icon: CalendarIcon,
//     options: [
//       { label: "Jan", value: 1 },
//       { label: "Feb", value: 2 },
//     ],
//   },
//   {
//     id: "budget",
//     label: "Budget",
//     icon: CardIcon,
//     options: [
//       { label: "Low", value: "l" },
//       { label: "High", value: "h" },
//     ],
//   },
//   {
//     id: "dest",
//     label: "Destination",
//     icon: LocationIcon,
//     options: [
//       { label: "Paris", value: "par" },
//       { label: "Tokyo", value: "tok" },
//     ],
//   },
//   {
//     id: "duration",
//     label: "Duration",
//     icon: ClockIcon,
//     options: [
//       { label: "1 Week", value: 7 },
//       { label: "2 Weeks", value: 14 },
//     ],
//   },
// ];

// const handleUpdate = (id: string, selected: FilterOption | null) => {
//   console.log(`Filter ${id} is now:`, selected ? selected.value : "Cleared");
// };
const BookingSection: React.FC = () => {
  const { data: TRIPS = [], isLoading } = trpc.public.fetchTrips.useQuery(
    undefined,
    {
      select: (data) => data.map(transformTrip),
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
        {/* <div className="filter-bar">
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
        </div> */}
        <div className="trips-section__grid">
          {TRIPS.map((trip_item) => (
            <TripCard key={trip_item.id} trip={trip_item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BookingSection;

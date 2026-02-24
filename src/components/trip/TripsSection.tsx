import React from "react";
import { useNavigate } from "react-router";
import ArrowRight from "../../icons/ArrowRightIcon";
import Button from "../utils/Button";
import TripCard, { type TripData } from "../cards/TripCard";
import type { DayData } from "../../admin/components/trips/types";
import { trpc } from "../../trpc";
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
const TripsSection: React.FC = () => {
  const navigate = useNavigate();
  const { data: TRIPS = [], isLoading } = trpc.public.fetchTrips.useQuery(
    undefined,
    {
      select: (data) => data.map(transformTrip),
    },
  );
  if (isLoading) return <div></div>;
  return (
    <section className="trips-section">
      <div className="trips-section__container">
        <header className="trips-section__header">
          <h2 className="trips-section__title">Upcoming Group Trips</h2>
          <p className="trips-section__subtitle">
            Curated experiences designed for connection and calm.
          </p>
        </header>

        <div className="trips-section__grid">
          {TRIPS.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </div>

        <div className="trips-section__actions">
          <Button
            onClick={() => {
              navigate("/group-trips");
            }}
            solid
          >
            See All
            <ArrowRight />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TripsSection;

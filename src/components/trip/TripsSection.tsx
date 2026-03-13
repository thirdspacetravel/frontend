import React from "react";
import { useNavigate } from "react-router";
import ArrowRight from "../../icons/ArrowRightIcon";
import Button from "../utils/Button";
import TripCard, { type TripData } from "../cards/TripCard";
import { trpc } from "../../trpc";
import Spinner from "../utils/Spinner";
const TripsSection: React.FC = () => {
  const navigate = useNavigate();
  const { data: TRIPS = [], isLoading } = trpc.public.fetchLiveTrips.useQuery(
    {
      limit: 3,
      page: 1,
    },
    {
      select: (data) =>
        data.map((trip): TripData => {
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
            badge: trip.isFeatured
              ? "Featured"
              : trip.featuredCategories
                ? trip.featuredCategories.replace(/_/g, " ") // Capitalize first letter of each word
                : "General",
            date: formatDateRange(trip.startDateTime, trip.endDateTime),
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
          {isLoading ? (
            <Spinner
              size={40}
              strokeWidth={2}
              trackColor="transparent"
              color="#333"
            />
          ) : TRIPS.length > 0 ? (
            TRIPS.map((trip) => (
              <TripCard
                key={trip.id}
                trip={trip}
                onClick={() => {
                  navigate(`/trip/${trip.id}`);
                }}
              />
            ))
          ) : (
            <div className="empty-state">
              <p>No Trips Yet.</p>
            </div>
          )}
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

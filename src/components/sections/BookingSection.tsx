import React, { useState, useMemo } from "react";
import CalendarIcon from "../../icons/CalendarIcon";
import ClockIcon from "../../icons/ClockIcon";
import LocationIcon from "../../icons/LocationIcon";
import FilterItem from "../utils/FilterItem";
import TripCard, { type TripData } from "../cards/TripCard";
import { trpc } from "../../trpc";
import { useNavigate } from "react-router";
import Spinner from "../utils/Spinner";
import InteractiveButton from "../utils/InteractiveButton";

const BookingSection: React.FC = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    month: null as string | null,
    destination: null as string | null,
    duration: null as number | null,
  });

  // --- 1. Fetch Dynamic Filter Options ---
  const { data: filterOptions, isLoading: isLoadingFilters } =
    trpc.public.tripFilters.useQuery();

  // --- 2. Fetch Trips (Infinite Query) ---
  const {
    data,
    isLoading: isLoadingTrips,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = trpc.public.fetchLiveTrips.useInfiniteQuery(
    {
      limit: 6,
      ...filters,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    },
  );

  // --- 3. Map Filter Options to UI Format ---
  const dynamicFilterConfigs = useMemo(() => {
    if (!filterOptions) return [];

    return [
      {
        id: "month",
        label: "Month",
        icon: CalendarIcon,
        options: filterOptions.months.map((m) => ({ label: m, value: m })),
      },
      {
        id: "duration",
        label: "Duration",
        icon: ClockIcon,
        options: filterOptions.durations.map((d) => ({
          label: `${d} Days`,
          value: d,
        })),
      },
      {
        id: "destination",
        label: "Destination",
        icon: LocationIcon,
        options: filterOptions.destinations.map((d) => ({
          label: d,
          value: d,
        })),
      },
    ];
  }, [filterOptions]);

  // --- 4. Transform Trip Data for Grid ---
  const allTrips = useMemo(() => {
    if (!data) return [];
    return data.pages
      .flatMap((page) => page.trips)
      .map((trip): TripData => {
        const dateObject = trip.startDateTime
          ? new Date(trip.startDateTime)
          : null;
        return {
          id: trip.id,
          title: trip.tripName,
          image: trip.images[0]
            ? `${import.meta.env.VITE_API_URL}/images/${trip.images[0]}`
            : "https://placehold.co/363x240",
          badge: trip.isFeatured
            ? "Featured"
            : trip.featuredCategories?.replace(/_/g, " ") || "General",
          date: dateObject
            ? dateObject.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })
            : "Dates TBD",
          duration:
            trip.days && trip.nights ? `${trip.days}D/${trip.nights}N` : "TBD",
          tags: trip.categories.length > 0 ? trip.categories : ["Adventure"],
          price: (
            [trip.priceQuad, trip.priceTriple, trip.priceDouble].find(
              (p) => p !== null,
            ) || 0
          ).toLocaleString("en-IN", { style: "currency", currency: "INR" }),
        };
      });
  }, [data]);

  const handleFilterUpdate = (
    id: string,
    val: string | number | null | undefined,
  ) => {
    setFilters((prev) => ({ ...prev, [id]: val }));
  };

  return (
    <section className="trips-section booking-section">
      <div className="trips-section__container">
        <header className="trips-section__header">
          <h2 className="trips-section__title">Upcoming Group Trips</h2>
          <p className="trips-section__subtitle">
            Curated experiences designed for connection and calm.
          </p>
        </header>

        {/* Filter Bar */}
        <div className="filter-bar">
          {!isLoadingFilters &&
            dynamicFilterConfigs.map((item, index) => (
              <React.Fragment key={item.id}>
                <FilterItem
                  icon={item.icon}
                  label={item.label}
                  options={item.options}
                  onChange={(opt) => handleFilterUpdate(item.id, opt?.value)}
                />
                {index < dynamicFilterConfigs.length - 1 && (
                  <div className="filter-bar__divider" />
                )}
              </React.Fragment>
            ))}
          {isLoadingFilters && (
            <p className="filter-loading">Loading filters...</p>
          )}
        </div>

        {/* Trips Grid */}
        <div className="trips-section__grid">
          {isLoadingTrips ? (
            <Spinner
              size={40}
              strokeWidth={2}
              trackColor="transparent"
              color="#333"
            />
          ) : allTrips.length > 0 ? (
            allTrips.map((trip) => (
              <TripCard
                key={trip.id}
                trip={trip}
                onClick={() => navigate(`/trip/${trip.id}`)}
              />
            ))
          ) : (
            <div className="empty-state">
              <p>No trips found matching these criteria.</p>
            </div>
          )}
        </div>

        {/* Load More */}
        {hasNextPage && (
          <InteractiveButton
            disabled={isFetchingNextPage}
            solid
            onClick={async () => await fetchNextPage()}
          >
            See More Trips
          </InteractiveButton>
        )}
      </div>
    </section>
  );
};

export default BookingSection;

import React, { useState } from "react";
import TourSummary from "../sections/TourSummarySection"; // Assuming this still fits the context
import { CustomDropdown, SuffixInput, TextInput } from "../utils/InputUtils";
import Button from "../utils/Button";
import type { TripDetails } from "../../admin/components/trips/types";
import { trpc } from "../../trpc";
import { useNavigate } from "react-router";

const formatTripDates = (start: Date | null, end: Date | null) => {
  if (!start || !end) return "Dates TBD";
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
  };

  const sameYear = start.getFullYear() === end.getFullYear();
  const yearOptions: Intl.DateTimeFormatOptions = sameYear
    ? {}
    : { year: "numeric" };

  const startDateStr = start.toLocaleDateString("en-US", options);
  const endDateStr = end.toLocaleDateString("en-US", {
    ...options,
    ...yearOptions,
  });

  return `${startDateStr} - ${endDateStr}`;
};
const BookingCard: React.FC<{ trip: TripDetails }> = ({ trip }) => {
  const packageOptions = [
    { label: "Quad Sharing", value: 1 },
    { label: "Triple Sharing", value: 2 },
    { label: "Double Sharing", value: 3 },
  ];
  const charges = [trip.priceQuad, trip.priceTriple, trip.priceDouble];
  const [passengers, setPassengers] = useState(2);
  const [tripRoom, setRoom] = useState(1);
  const navigate = useNavigate();

  // 1. Define the mutation
  const bookingMutation = trpc.user.initializePayment.useMutation({
    onSuccess: (data) => {
      console.log("Booking created:", data.bookingId);
      navigate(`/mock-paytm/${data.bookingId}`);
    },
    onError: (error) => {
      alert(`Booking failed: ${error.message}`);
    },
  });

  const handleBooking = async () => {
    if (bookingMutation.isPending) return;
    bookingMutation.mutate({
      tripId: trip.id,
      roomType: tripRoom,
      adults: passengers,
    });
  };
  return (
    <section className="booking-card">
      <div className="booking-card__container">
        {/* Main Content Area */}
        <div className="booking-card__main-content">
          <TourSummary
            title={trip.tripName}
            location={trip.destination}
            dateRange={formatTripDates(trip.startDateTime, trip.endDateTime)}
            duration={`${trip.days} Days / ${trip.nights} Nights`}
            features={trip.categories.join(" • ")}
          />
          <div className="booking-card__gallery">
            <img
              className="booking-card__hero"
              src={
                trip.images[0]
                  ? `${import.meta.env.VITE_API_URL}/images/${trip.images[0]}`
                  : "https://placehold.co/845x360"
              }
              alt={trip.tripName}
            />
            {/* <div className="booking-card__thumbnails">
              <img src="https://placehold.co/276x180" alt="Trip Thumb 1" />
              <img src="https://placehold.co/276x180" alt="Trip Thumb 2" />
              <img src="https://placehold.co/276x180" alt="Trip Thumb 3" />
            </div> */}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="booking-card__sidebar">
          <div className="booking-sidebar">
            <div className="booking-sidebar__pricing">
              <div>
                <span className="booking-sidebar__amount">
                  ₹{(charges[tripRoom - 1] || 0).toLocaleString()}
                </span>
                <span className="booking-sidebar__label">
                  per person, all-inclusive
                </span>
              </div>
              <div className="booking-sidebar__guarantee">
                Verified experiences
              </div>
            </div>

            <form className="booking-form" onSubmit={(e) => e.preventDefault()}>
              <div className="booking-form__row">
                <TextInput
                  label="Start Date"
                  type="date"
                  value={
                    trip.startDateTime
                      ? new Date(trip.startDateTime).toISOString().split("T")[0]
                      : ""
                  }
                  readOnly
                />
                <TextInput
                  label="End Date"
                  type="date"
                  value={
                    trip.endDateTime
                      ? new Date(trip.endDateTime).toISOString().split("T")[0]
                      : ""
                  }
                  readOnly
                />
              </div>

              <SuffixInput
                label="Travelers"
                id="passengers"
                type="number"
                min="1"
                max="10"
                value={passengers}
                onChange={(e) => setPassengers(parseInt(e.target.value))}
                suffix="people"
              />

              <div className="booking-form__field">
                <label>Package Option</label>
                <CustomDropdown
                  options={packageOptions}
                  value={tripRoom}
                  onSelect={(val) => setRoom(val || 1)}
                />
              </div>

              <Button
                solid
                onClick={handleBooking}
                disabled={bookingMutation.isPending}
              >
                {bookingMutation.isPending ? "Securing..." : "Secure Your Spot"}
              </Button>
            </form>

            <div className="booking-sidebar__summary">
              <span>Total for {passengers} people</span>
              <span className="booking-sidebar__total-price">
                ₹{(passengers * (charges[tripRoom - 1] || 0)).toLocaleString()}
                <small> Incl. transport & stay</small>
              </span>
            </div>
          </div>

          {/* <div className="booking-card__actions">
            <Button>Itinerary PDF</Button>
            <Button solid>Enquire Now</Button>
          </div> */}
        </aside>
      </div>
    </section>
  );
};

export default BookingCard;

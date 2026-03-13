import React from "react";
import TourSummary from "../sections/TourSummarySection";
import Button from "../utils/Button";
import type { TripDetails } from "../../admin/components/trips/types";
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
  const navigate = useNavigate();
  // const allPackageOptions = [
  //   { label: "Quad Sharing", value: 1, price: trip.priceQuad },
  //   { label: "Triple Sharing", value: 2, price: trip.priceTriple },
  //   { label: "Double Sharing", value: 3, price: trip.priceDouble },
  // ];

  // const availableOptions = allPackageOptions.filter(
  //   (option) => option.price !== null,
  // );

  // const [passengers, setPassengers] = useState(2);
  // const [tripRoom, setRoom] = useState(availableOptions[0]?.value || 3);
  // const currentOption = allPackageOptions.find((opt) => opt.value === tripRoom);
  // const currentPrice = currentOption?.price || 0;

  // const handleBooking = async () => {
  //   // if (bookingMutation.isPending) return;
  //   // bookingMutation.mutate({
  //   //   tripId: trip.id,
  //   //   roomType: tripRoom,
  //   //   adults: passengers,
  //   // });
  // };

  return (
    <section className="booking-card">
      <div className="booking-card__container">
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
          </div>
        </div>
        {trip.status !== "COMPLETED" && (
          <aside className="booking-card__sidebar">
            <div className="booking-sidebar">
              {trip.status === "PUBLISHED" && trip.isAcceptingBookings ? (
                // <>
                //   <div className="booking-sidebar__pricing">
                //     <div>
                //       <span className="booking-sidebar__amount">
                //         ₹{currentPrice.toLocaleString()}
                //       </span>
                //       <span className="booking-sidebar__label">
                //         per person, all-inclusive
                //       </span>
                //     </div>
                //     <div className="booking-sidebar__guarantee">
                //       Verified experiences
                //     </div>
                //   </div>
                //   <form
                //     className="booking-form"
                //     onSubmit={(e) => e.preventDefault()}
                //   >
                //     <div className="booking-form__row">
                //       <TextInput
                //         label="Start Date"
                //         type="date"
                //         value={
                //           trip.startDateTime
                //             ? new Date(trip.startDateTime)
                //                 .toISOString()
                //                 .split("T")[0]
                //             : ""
                //         }
                //         readOnly
                //       />
                //       <TextInput
                //         label="End Date"
                //         type="date"
                //         value={
                //           trip.endDateTime
                //             ? new Date(trip.endDateTime)
                //                 .toISOString()
                //                 .split("T")[0]
                //             : ""
                //         }
                //         readOnly
                //       />
                //     </div>

                //     <SuffixInput
                //       label="Travelers"
                //       id="passengers"
                //       type="number"
                //       min="1"
                //       max="10"
                //       value={passengers}
                //       onChange={(e) => setPassengers(parseInt(e.target.value))}
                //       suffix="people"
                //     />

                //     <div className="booking-form__field">
                //       <label>Package Option</label>
                //       <CustomDropdown
                //         options={availableOptions}
                //         value={tripRoom}
                //         onSelect={(val) =>
                //           setRoom(val || availableOptions[0]?.value || 3)
                //         }
                //       />
                //     </div>

                //     <Button solid onClick={handleBooking}>
                //       Secure Your Spot
                //     </Button>
                //   </form>
                //   <div className="booking-sidebar__summary">
                //     <span>Total for {passengers} people</span>
                //     <span className="booking-sidebar__total-price">
                //       ₹{(passengers * currentPrice).toLocaleString()}
                //       <small> Incl. transport & stay</small>
                //     </span>
                //   </div>
                // </>
                <div className="booking-sidebar__unavailable">
                  Online Booking is currently under development. Please contact
                  us directly to book your trip. We apologize for the
                  inconvenience and appreciate your understanding as we work to
                  bring you a seamless booking experience soon.
                  <Button solid onClick={() => navigate("/contact")}>
                    Contact Us
                  </Button>
                </div>
              ) : (
                <div className="booking-sidebar__unavailable">
                  {trip.status === "CANCELLED"
                    ? "This trip has been cancelled. Please contact support for more information. We apologize for the inconvenience."
                    : "We are not accepting bookings for this trip at the moment. Please check back later or contact support for more information."}
                </div>
              )}
            </div>
          </aside>
        )}
      </div>
    </section>
  );
};

export default BookingCard;

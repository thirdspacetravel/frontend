import React, { useState } from "react";
import TourSummary from "../sections/TourSummarySection";
import { CustomDropdown } from "../utils/InputUtils";
import Button from "../utils/Button";

const BookingCard: React.FC = () => {
  const roomOptions = [
    { label: "Standard Room", value: 1 },
    { label: "Deluxe Mountain View", value: 2 },
    { label: "Presidential Suite", value: 3 },
  ];
  const [checkIn, setCheckIn] = useState("2025-09-14");
  const [checkOut, setCheckOut] = useState("2025-09-17");
  const [guests, setGuests] = useState(2);
  return (
    <section className="booking-card">
      <div className="booking-card__container">
        {/* Main Content Area */}
        <div className="booking-card__main-content">
          <TourSummary />
          <div className="booking-card__gallery">
            <img
              className="booking-card__hero"
              src="https://placehold.co/845x360"
              alt="Main"
            />
            <div className="booking-card__thumbnails">
              <img src="https://placehold.co/276x180" alt="Thumb 1" />
              <img src="https://placehold.co/276x180" alt="Thumb 2" />
              <img src="https://placehold.co/276x180" alt="Thumb 3" />
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="booking-card__sidebar">
          <div className="booking-sidebar">
            <div className="booking-sidebar__pricing">
              <div>
                <span className="booking-sidebar__amount">$287</span>
                <span className="booking-sidebar__label">
                  per night, per room
                </span>
              </div>
              <div className="booking-sidebar__guarantee">
                Best price guarantee
              </div>
            </div>
            <form className="booking-form" onSubmit={(e) => e.preventDefault()}>
              <div className="booking-form__row">
                <div className="booking-form__field">
                  <label htmlFor="check-in">Check-in</label>
                  <input
                    id="check-in"
                    type="date"
                    className="booking-form__input"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                  />
                </div>
                <div className="booking-form__field">
                  <label htmlFor="check-out">Check-out</label>
                  <input
                    id="check-out"
                    type="date"
                    className="booking-form__input"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                  />
                </div>
              </div>

              <div className="booking-form__field">
                <label htmlFor="guests">Guests</label>
                <div className="booking-form__input-wrapper">
                  <input
                    id="guests"
                    type="number"
                    min="1"
                    max="10"
                    className="booking-form__input"
                    value={guests}
                    onChange={(e) => setGuests(parseInt(e.target.value))}
                  />
                  <span className="booking-form__input-suffix">adults</span>
                </div>
              </div>
              <div className="booking-form__field">
                <label>Room Type</label>

                <CustomDropdown
                  options={roomOptions}
                  onSelect={(val) => console.log(val)}
                />
              </div>
              <Button solid>Book now</Button>
            </form>
            <div className="booking-sidebar__summary">
              <span>Total for 3 nights</span>
              <span className="booking-sidebar__total-price">
                $861 <small>per person • Excl. flights</small>
              </span>
            </div>
          </div>

          <div className="booking-card__actions">
            <Button>Itinerary PDF</Button>
            <Button solid>Enquire Now</Button>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default BookingCard;

import React from "react";
import Button from "../utils/Button";

interface Booking {
  id: string;
  orderId: string;
  title: string;
  image: string;
  status: "Confirmed" | "Completed" | "Cancelled";
  startDate: string;
  endDate: string;
  travelers: string;
  totalPaid: string;
}

const MOCK_BOOKINGS: Booking[] = [
  {
    id: "1",
    orderId: "#TS-29384-MNL",
    title: "Manali: The Mountain Call",
    image:
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=400&q=80",
    status: "Confirmed",
    startDate: "Apr 12",
    endDate: "Apr 15, 2024",
    travelers: "2 Adults",
    totalPaid: "₹14,998",
  },
  {
    id: "2",
    orderId: "#TS-10293-RSH",
    title: "Rishikesh: Adventure & Chill",
    image:
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=400&q=80",
    status: "Completed",
    startDate: "Dec 10",
    endDate: "Dec 12, 2023",
    travelers: "4 Adults",
    totalPaid: "₹23,996",
  },
];

const BookingCard: React.FC<{ booking: Booking }> = ({ booking }) => {
  const isCompleted = booking.status === "Completed";

  return (
    <div className={`booking-card ${isCompleted ? "booking-card--past" : ""}`}>
      <div className="booking-card__image-container">
        <img
          src={booking.image}
          alt={booking.title}
          className="booking-card__image"
        />
      </div>

      <div className="booking-card__content">
        <div className="booking-card__header">
          <div className="booking-card__title-group">
            <h3>{booking.title}</h3>
            <span className="booking-card__order-id">{booking.orderId}</span>
          </div>
          <div
            className={`status-badge status-badge--${booking.status.toLowerCase()}`}
          >
            {booking.status === "Confirmed" && <CheckIcon />}
            <span>{booking.status}</span>
          </div>
        </div>

        <div className="booking-card__stats">
          <div className="stat">
            <label>Travel Dates</label>
            <p>
              {booking.startDate} - {booking.endDate}
            </p>
          </div>
          <div className="stat">
            <label>Travelers</label>
            <p>{booking.travelers}</p>
          </div>
          <div className="stat">
            <label>Total Paid</label>
            <p>{booking.totalPaid}</p>
          </div>
        </div>

        <div className="booking-card__actions">
          {isCompleted ? (
            <Button solid>Book Again</Button>
          ) : (
            <>
              <Button>
                <DownloadIcon /> Invoice
              </Button>
              <Button solid>View Ticket</Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const MyBookings: React.FC = () => {
  return (
    <div className="profile-content">
      <header className="profile-content__header">
        <h1>My Bookings</h1>
        <p>View and manage your upcoming adventures.</p>
      </header>

      <div className="bookings-list">
        {MOCK_BOOKINGS.map((booking) => (
          <BookingCard key={booking.id} booking={booking} />
        ))}
      </div>
    </div>
  );
};

const CheckIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M1.16 7a5.83 5.83 0 1111.66 0 5.83 5.83 0 01-11.66 0zM5.25 7l1.16 1.16L8.75 5.83" />
  </svg>
);

const DownloadIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M7 8.75V1.75M12.25 8.75V11.08c0 .64-.52 1.17-1.17 1.17H2.92c-.64 0-1.17-.52-1.17-1.17V8.75M4.08 5.83L7 8.75l2.92-2.92" />
  </svg>
);

export default MyBookings;

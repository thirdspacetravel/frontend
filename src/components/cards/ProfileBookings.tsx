import React from "react";
import { trpc } from "../../trpc";
import type { TransactionStatus } from "../../../../backend/src/generated/prisma/enums";
import InteractiveButton from "../utils/InteractiveButton";
import { useNotification } from "../../hooks/useNotification";

interface Booking {
  id: string;
  orderId: string;
  title: string;
  image: string;
  status: TransactionStatus;
  startDate: string;
  endDate: string;
  travelers: string;
  totalPaid: string;
}

const BookingCard: React.FC<{ booking: Booking }> = ({ booking }) => {
  const isCompleted = booking.status === "TXN_SUCCESS";
  const isPending = booking.status === "TXN_PENDING";
  const bookingStatus =
    booking.status === "TXN_SUCCESS"
      ? "Confirmed"
      : booking.status === "TXN_PENDING"
        ? "Pending Payment"
        : "Failed";
  const utils = trpc.useUtils();
  const { notify } = useNotification();
  const pendingMutation = trpc.user.pendingPayment.useMutation({
    onSuccess: (data) => {
      if (data.hasPendingPayment) {
        if ("paymentUrl" in data && data.paymentUrl) {
          window.location.href = data.paymentUrl;
        }
      } else {
        if ("hasPaymentFailed" in data && data.hasPaymentFailed) {
          utils.user.fetchBookings.invalidate();
          notify(
            "Your previous payment attempt failed. Please try booking again.",
            "error",
          );
        } else {
          utils.user.fetchBookings.invalidate();
          notify("Your booking is now confirmed!", "success");
        }
      }
    },
    onError: (error) => {
      notify(error.message, "error");
    },
  });
  const handlePending = async () => {
    if (pendingMutation.isPending) return;
    if (isPending) {
      await pendingMutation.mutateAsync({
        id: booking.id,
      });
      return;
    }
  };

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
            className={`status-badge status-badge--${bookingStatus.toLowerCase()}`}
          >
            {booking.status === "TXN_SUCCESS" && <CheckIcon />}
            <span>{bookingStatus}</span>
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
          {isPending && (
            <InteractiveButton solid onClick={handlePending}>
              Complete Your Payment
            </InteractiveButton>
          )}
        </div>
      </div>
    </div>
  );
};

const MyBookings: React.FC = () => {
  const { data = [], isLoading } = trpc.user.fetchBookings.useQuery(undefined, {
    select: (data) =>
      data.map((b) => ({
        id: b.id,
        orderId: `#ORD-${b.id.slice(0, 4).toUpperCase()}-${b.id.slice(4, 8).toUpperCase()}`,
        title: b.trip?.tripName || "Unknown Trip",
        image: b.trip?.images?.[0]
          ? `${import.meta.env.VITE_API_URL}/images/${b.trip.images[0]}`
          : "https://via.placeholder.com/400x300?text=No+Image",
        status: b.resultStatus,
        // Fix: Check if date exists before passing to Date constructor
        startDate: b.trip?.startDateTime
          ? new Date(b.trip.startDateTime).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })
          : "N/A",
        endDate: b.trip?.endDateTime
          ? new Date(b.trip.endDateTime).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })
          : "N/A",
        travelers: `${b.adults} Persons`, // Consider replacing with b.pax or similar if available
        totalPaid: `₹${b.amount || "0"}`, // Map this to your actual price field
      })),
  });
  return (
    <div className="profile-content">
      <header className="profile-content__header">
        <h1>My Bookings</h1>
        <p>View and manage your upcoming adventures.</p>
      </header>

      <div className="bookings-list">
        {data.length > 0 &&
          data.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))}
        {(data.length == 0 || isLoading) && (
          <p className="no-bookings">
            You have no bookings yet. Start exploring and book your next
            adventure!
          </p>
        )}
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

export default MyBookings;

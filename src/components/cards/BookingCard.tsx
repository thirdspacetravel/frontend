import React, { useRef, useState } from "react";
import TourSummary from "../sections/TourSummarySection";
import { CustomDropdown, SuffixInput, TextInput } from "../utils/InputUtils";
import Button from "../utils/Button";
import type { TripDetails } from "../../admin/components/trips/types";
import { trpc } from "../../trpc";
// 1. Define types for Paytm and your backend response
declare global {
  interface Window {
    Paytm?: {
      CheckoutJS: {
        onLoad: (callback: () => void) => void;
        init: (config: PaytmConfig) => Promise<void>;
        invoke: () => void;
      };
    };
  }
}

interface PaytmConfig {
  root: string;
  flow: string;
  data: {
    orderId: string;
    token: string;
    tokenType: string;
    amount: string;
  };
  handler: {
    notifyMerchant: (eventName: string, data: any) => void;
  };
}

interface PaymentResponse {
  orderId: string;
  txnToken: string;
  amount: string;
  mid: string;
}
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
  const allPackageOptions = [
    { label: "Quad Sharing", value: 1, price: trip.priceQuad },
    { label: "Triple Sharing", value: 2, price: trip.priceTriple },
    { label: "Double Sharing", value: 3, price: trip.priceDouble },
  ];

  const availableOptions = allPackageOptions.filter(
    (option) => option.price !== null,
  );

  const [passengers, setPassengers] = useState(2);
  const [tripRoom, setRoom] = useState(availableOptions[0]?.value || 3);
  const scriptLoaded = useRef(false);

  const bookingMutation = trpc.user.initializePayment.useMutation({
    onSuccess: (data: PaymentResponse) => {
      console.log("Backend returned payment data:", data);

      // 1. Validate data before trying to use it
      if (!data.txnToken || !data.orderId || !data.mid) {
        console.error("Invalid payment data received", data);
        alert("Payment initialization failed. Please try again.");
        return;
      }

      handlePaytmFlow(data);
    },
    onError: (error) => {
      alert(`Backend Error: ${error.message}`);
    },
  });

  const handlePaytmFlow = (paymentData: PaymentResponse) => {
    const config: PaytmConfig = {
      root: "",
      flow: "DEFAULT",
      data: {
        orderId: paymentData.orderId,
        token: paymentData.txnToken, // Ensure this token is fresh
        tokenType: "TXN_TOKEN",
        amount: paymentData.amount,
      },
      handler: {
        notifyMerchant: function (eventName: string, data: any) {
          console.log("notifyMerchant handler", eventName, data);

          // 2. Better Handling for Errors
          if (eventName === "SESSION_EXPIRED") {
            alert("Your session has expired. Please try paying again.");
            // Optionally trigger a new mutation here to get a fresh token
          }
          if (eventName === "FETCH_PAYMENT_OPTIONS_ERROR") {
            console.error("Error fetching options:", data);
            alert("Failed to load payment options. Please check your network.");
          }
        },
      },
    };

    if (scriptLoaded.current) {
      initializeAndInvoke(config);
    } else {
      const scriptElement = document.createElement("script");
      // 3. Ensure MID is correctly placed
      scriptElement.src = `https://securestage.paytmpayments.com/merchantpgpui/checkoutjs/merchants/${paymentData.mid}.js`;
      scriptElement.async = true;
      scriptElement.crossOrigin = "anonymous";
      scriptElement.type = "application/javascript";

      scriptElement.onload = () => {
        scriptLoaded.current = true;
        console.log("Paytm Script Loaded");
        initializeAndInvoke(config);
      };

      scriptElement.onerror = () => {
        console.error("Failed to load Paytm script");
      };

      document.body.appendChild(scriptElement);
    }
  };

  const initializeAndInvoke = (config: PaytmConfig) => {
    if (window.Paytm && window.Paytm.CheckoutJS) {
      window.Paytm.CheckoutJS.onLoad(() => {
        window.Paytm?.CheckoutJS.init(config)
          .then(() => {
            window.Paytm?.CheckoutJS.invoke();
          })
          .catch((error: any) => {
            console.error("Initialization error => ", error);
          });
      });
    } else {
      console.error("Paytm CheckoutJS not found");
    }
  };
  const currentOption = allPackageOptions.find((opt) => opt.value === tripRoom);
  const currentPrice = currentOption?.price || 0;

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
                <>
                  <div className="booking-sidebar__pricing">
                    <div>
                      <span className="booking-sidebar__amount">
                        ₹{currentPrice.toLocaleString()}
                      </span>
                      <span className="booking-sidebar__label">
                        per person, all-inclusive
                      </span>
                    </div>
                    <div className="booking-sidebar__guarantee">
                      Verified experiences
                    </div>
                  </div>
                  <form
                    className="booking-form"
                    onSubmit={(e) => e.preventDefault()}
                  >
                    <div className="booking-form__row">
                      <TextInput
                        label="Start Date"
                        type="date"
                        value={
                          trip.startDateTime
                            ? new Date(trip.startDateTime)
                                .toISOString()
                                .split("T")[0]
                            : ""
                        }
                        readOnly
                      />
                      <TextInput
                        label="End Date"
                        type="date"
                        value={
                          trip.endDateTime
                            ? new Date(trip.endDateTime)
                                .toISOString()
                                .split("T")[0]
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
                        options={availableOptions}
                        value={tripRoom}
                        onSelect={(val) =>
                          setRoom(val || availableOptions[0]?.value || 3)
                        }
                      />
                    </div>

                    <Button
                      solid
                      onClick={handleBooking}
                      disabled={bookingMutation.isPending}
                    >
                      {bookingMutation.isPending
                        ? "Securing..."
                        : "Secure Your Spot"}
                    </Button>
                  </form>
                  <div className="booking-sidebar__summary">
                    <span>Total for {passengers} people</span>
                    <span className="booking-sidebar__total-price">
                      ₹{(passengers * currentPrice).toLocaleString()}
                      <small> Incl. transport & stay</small>
                    </span>
                  </div>
                </>
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

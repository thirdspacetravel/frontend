import React, { useState } from "react";
import { trpc } from "../../../trpc";
import SearchIcon from "../../../icons/SearchIcon";
import Spinner from "../../../components/utils/Spinner";

const BookingsTable: React.FC = () => {
  const [page, setPage] = useState(1);
  const utils = trpc.useUtils();
  const { data: bookings = [], isLoading: isBookingsLoading } =
    trpc.admin.fetchBookings.useQuery({ page });
  const { data: countData } = trpc.admin.getBookingsCount.useQuery();
  const markAsRefunded = trpc.admin.markAsRefunded.useMutation({
    onSuccess() {
      utils.admin.fetchBookings.invalidate();
    },
  });
  const getStatusLabel = (status: string) => {
    switch (status) {
      case "TXN_SUCCESS":
        return { text: "Paid", class: "paid" };
      case "TXN_PENDING":
        return { text: "Pending", class: "pending" };
      case "TXN_FAILURE":
        return { text: "Failed", class: "cancelled" };
      case "TXN_CANCELLED":
        return { text: "Cancelled", class: "cancelled" };
      default:
        return { text: status, class: "pending" };
    }
  };

  // 3. Date Formatter
  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };
  const formatTime = (date: Date | string) => {
    return new Date(date).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };
  const LIMIT = 10; // Should match your backend LIMIT
  const totalItems = countData?.total || 0;
  const totalPages = countData?.totalPages || 1;
  const startRange = (page - 1) * LIMIT + 1;
  const endRange = Math.min(page * LIMIT, totalItems);
  return (
    <>
      <header className="dashboard-header">
        <div className="dashboard-header__search-wrapper">
          <SearchIcon className="dashboard-header__search-icon" />
          <input
            type="text"
            className="dashboard-header__search-input"
            placeholder="Search by ID, customer name..."
          />
        </div>
      </header>

      <div className="dashboard-card">
        <div className="dashboard-card__header">
          <h2 className="dashboard-card__title">Bookings</h2>
        </div>

        {bookings.length > 0 ? (
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Booking ID</th>
                  <th>Customer</th>
                  <th>Trip Details</th>
                  <th>Travelers</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Room</th>
                  <th>Txn ID</th>
                  <th>Bank Txn ID</th>
                  <th>Txn Amount</th>
                  <th>Type</th>
                  <th>Gateway</th>
                  <th>Bank</th>
                  <th>Mode</th>
                  <th>Refund Amt</th>
                  <th>Refund</th>
                  <th>Txn Date</th>
                  <th>Txn Time</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => {
                  const status = getStatusLabel(booking.resultStatus);
                  return (
                    <tr key={booking.id}>
                      <td>
                        #BK-{booking.id.slice(0, 4).toUpperCase()}-
                        {booking.id.slice(4, 8).toUpperCase()}-
                        {booking.bookingno.toString().padStart(4, "0")}
                      </td>
                      <td>
                        <div className="table-info">
                          <img
                            className="round"
                            src={
                              booking.user.avatarUrl
                                ? `${import.meta.env.VITE_API_URL}/images/${booking.user.avatarUrl}`
                                : "/avatars/user.png"
                            }
                            alt={booking.user.fullName}
                          />
                          <div>
                            <div className="table__title">
                              {booking.user.fullName}
                            </div>
                            <div className="table__subtitle">
                              {booking.user.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="table__wrap">
                          <span className="table__title">
                            {booking.trip.tripName}
                          </span>
                          <span className="table__subtitle">
                            {booking.trip.destination}
                          </span>
                        </div>
                      </td>
                      <td>{booking.adults} Pax</td>
                      <td className="table__amount">
                        ₹{Number(booking.amount).toLocaleString("en-IN")}
                      </td>
                      <td>
                        <span
                          className={`status-badge status-badge--${status.class}`}
                        >
                          {status.text}
                        </span>
                      </td>
                      <td>{booking.roomtype}</td>
                      <td className="text-xs font-mono">
                        {booking.txnId || "—"}
                      </td>
                      <td className="text-xs font-mono">
                        {booking.bankTxnId || "—"}
                      </td>
                      <td>
                        {booking.txnAmount ? `₹${booking.txnAmount}` : "—"}
                      </td>
                      <td>{booking.txnType || "—"}</td>
                      <td>{booking.gatewayName || "—"}</td>
                      <td>{booking.bankName || "—"}</td>
                      <td>{booking.paymentMode || "—"}</td>
                      <td>
                        {booking.refundAmt ? `₹${booking.refundAmt}` : "—"}
                      </td>
                      <td>
                        {booking.resultStatus == "TXN_CANCELLED" ? (
                          <span
                            className={`status-badge ${booking.refunded ? "status-badge--paid" : "status-badge--cancelled"}`}
                            onClick={() => {
                              if (!booking.refunded) {
                                if (confirm("Mark this booking as refunded?")) {
                                  markAsRefunded.mutate({
                                    bookingId: booking.id,
                                  });
                                }
                              }
                            }}
                          >
                            {booking.refunded ? "YES" : "NO"}
                          </span>
                        ) : (
                          "—"
                        )}
                      </td>
                      <td className="table__date">
                        {booking.txnDate ? formatDate(booking.txnDate) : "—"}
                      </td>
                      <td className="table__date">
                        {booking.txnDate ? formatTime(booking.txnDate) : "—"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-state">
            {isBookingsLoading ? (
              <Spinner size={20} strokeWidth={1} />
            ) : (
              <p>No bookings found.</p>
            )}
          </div>
        )}

        <footer className="dashboard-card__pagination">
          <span className="pagination-info">
            Showing {totalItems > 0 ? `${startRange}-${endRange}` : "0"} of{" "}
            {totalItems} bookings
          </span>

          <div className="pagination-controls">
            <button
              className={`btn ${page === 1 ? "btn--disabled" : ""}`}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              Previous
            </button>
            <button
              className={`btn ${page >= totalPages ? "btn--disabled" : ""}`}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
            >
              Next
            </button>
          </div>
        </footer>
      </div>
    </>
  );
};

export default BookingsTable;

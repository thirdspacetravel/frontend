import React, { useState } from "react";
import { trpc } from "../../../trpc";
import SearchIcon from "../../../icons/SearchIcon";
import Spinner from "../../../components/utils/Spinner";
import InteractiveButton from "../../../components/utils/InteractiveButton";
import { useDebounce } from "../../../hooks/useDebounce";
import { useNotification } from "../../../hooks/useNotification";
import TrashIcon from "../../../icons/TrashIcon";

const BookingsTable: React.FC = () => {
  const [page, setPage] = useState(1);
  const [searchConfig, setSearchConfig] = useState("");
  const { notify, confirm } = useNotification();

  // Debounce the search to prevent API spamming while typing
  const debouncedKeyword = useDebounce(searchConfig, 500);

  const utils = trpc.useUtils();
  const LIMIT = 10;

  // 1. Fetch Bookings with keyword support
  const { data: bookings = [], isLoading: isBookingsLoading } =
    trpc.admin.fetchBookings.useQuery({
      page,
      keyword: debouncedKeyword, // Added keyword
    });

  // 2. Fetch Count for Pagination with keyword support
  const { data: countData } = trpc.admin.getBookingsCount.useQuery({
    keyword: debouncedKeyword, // Added keyword
  });

  const totalItems = countData?.total || 0;
  const totalPages = countData?.totalPages || 1;
  const startRange = (page - 1) * LIMIT + 1;
  const endRange = Math.min(page * LIMIT, totalItems);

  // Search handler that resets pagination
  const handleSearchChange = (value: string) => {
    setSearchConfig(value);
    setPage(1);
  };

  const markAsRefunded = trpc.admin.markAsRefunded.useMutation({
    onSuccess() {
      utils.admin.fetchBookings.invalidate();
      utils.user.fetchBookings.invalidate();
      notify("Booking marked as refunded.", "success");
    },
    onError(error) {
      notify(error.message || "Failed to mark as refunded.", "error");
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
  const [isExporting, setIsExporting] = useState(false);

  // Define the mutation
  const exportMutation = trpc.admin.exportBookings.useMutation({
    onSuccess: (data) => {
      if (data.url) {
        downloadFile(data.url);
      }
      setIsExporting(false);
    },
    onError: (error) => {
      console.error("Export failed:", error.message);
      setIsExporting(false);
      alert("Something went wrong during export.");
    },
  });
  const cancelBooking = trpc.admin.cancelBooking.useMutation({
    onSuccess: () => {
      utils.admin.fetchBookings.invalidate();
      utils.admin.getBookingsCount.invalidate();
      notify("Booking cancelled successfully.", "success");
    },
    onError: (error) => {
      notify(error.message || "Failed to cancel booking", "error");
    },
  });

  const handleCancel = async (bookingId: string) => {
    const confirmed = await confirm(
      "Are you sure you want to cancel this booking?",
      "info",
    );
    if (confirmed) {
      await cancelBooking.mutateAsync({ bookingId });
    }
  };
  const downloadFile = (url: string) => {
    const link = document.createElement("a");
    link.href = `${import.meta.env.VITE_API_URL}${url}`;
    link.setAttribute("download", url.split("/").pop() || "bookings.csv");
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const handleExport = () => {
    setIsExporting(true);
    exportMutation.mutate();
  };
  return (
    <>
      <header className="dashboard-header">
        <div className="dashboard-header__search-wrapper">
          <SearchIcon className="dashboard-header__search-icon" />
          <input
            type="text"
            className="dashboard-header__search-input"
            placeholder="Search ID, Customer Name or Trip Name..."
            value={searchConfig}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
        </div>
        <InteractiveButton solid onClick={handleExport} disabled={isExporting}>
          Export as CSV
        </InteractiveButton>
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
                  <th>Refund Amt</th>
                  <th>Refund</th>
                  <th>Txn Date</th>
                  <th>Txn Time</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => {
                  const status = getStatusLabel(booking.resultStatus);
                  const isDeleting =
                    cancelBooking.isPending &&
                    cancelBooking.variables?.bookingId === booking.id;
                  return (
                    <tr key={booking.id}>
                      <td>
                        #BK-{booking.id.slice(0, 4).toUpperCase()}-
                        {booking.id.slice(4, 8).toUpperCase()}
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
                      <td>
                        {booking.refundAmt ? `₹${booking.refundAmt}` : "—"}
                      </td>
                      <td>
                        {booking.resultStatus == "TXN_CANCELLED" ? (
                          <span
                            className={`status-badge ${booking.refunded ? "status-badge--paid" : "status-badge--cancelled"}`}
                            onClick={async () => {
                              if (!booking.refunded) {
                                const confirmed = await confirm(
                                  "Mark this booking as refunded?",
                                  "warning",
                                );
                                if (confirmed) {
                                  await markAsRefunded.mutateAsync({
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
                      <td>
                        {booking.resultStatus !== "TXN_CANCELLED" && (
                          <button
                            className="action-btn"
                            onClick={async (e) => {
                              e.stopPropagation();
                              await handleCancel(booking.id);
                            }}
                            disabled={cancelBooking.isPending}
                          >
                            {isDeleting ? (
                              <Spinner size={16} strokeWidth={1} />
                            ) : (
                              <TrashIcon color="red" />
                            )}
                          </button>
                        )}
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

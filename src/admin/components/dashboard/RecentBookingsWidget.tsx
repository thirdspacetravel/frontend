import { useNavigate } from "react-router";
import { trpc } from "../../../trpc";

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
const RecentBookingsWidget: React.FC = () => {
  const navigate = useNavigate();
  const { data: bookings, isLoading: isBookingsLoading } =
    trpc.admin.fetchBookings.useQuery(
      { page: 1 },
      {
        select: (data) =>
          data.slice(0, 5).map((b) => ({
            id: `#BK-${b.id.slice(0, 4).toUpperCase()}-${b.id.slice(4, 8).toUpperCase()}-${b.bookingno.toString().padStart(4, "0")}`,
            customerName: b.user.fullName,
            customerEmail: b.user.email,
            tripName: b.trip.tripName,
            date: new Date(b.createdAt).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            }),
            amount: `₹${b.amount.toLocaleString()}`,
            status: getStatusLabel(b.resultStatus),
          })),
      },
    );
  if (isBookingsLoading) return <div>Loading bookings...</div>;
  return (
    <div className="dashboard-card">
      <div className="dashboard-card__header">
        <h2 className="dashboard-card__title">Recent Bookings</h2>
        <button
          onClick={() => navigate("/admin/bookings")}
          className="dashboard-card__link"
        >
          View All
        </button>
      </div>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Trip</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings?.map((b) => (
              <tr key={b.id}>
                <td>
                  <div className="table__wrap">
                    <span className="table__title">{b.customerName}</span>
                    <span className="table__subtitle">{b.customerEmail}</span>
                  </div>
                </td>
                <td>{b.tripName}</td>
                <td className="table__date">{b.date}</td>
                <td>{b.amount}</td>
                <td>
                  <span
                    className={`status-badge status-badge--${b.status.class}`}
                  >
                    {b.status.text}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default RecentBookingsWidget;

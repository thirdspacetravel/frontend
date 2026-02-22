type StatusType = "Paid" | "Pending" | "Cancelled";

interface Booking {
  id: number;
  customerName: string;
  customerEmail: string;
  tripName: string;
  date: string;
  amount: string;
  status: StatusType;
}

const bookings: Booking[] = [
  {
    id: 1,
    customerName: "Aarav Patel",
    customerEmail: "aarav.p@gmail.com",
    tripName: "Spiti Valley Expedition",
    date: "Feb 12, 2024",
    amount: "₹18,500",
    status: "Paid",
  },
  {
    id: 2,
    customerName: "Sneha Gupta",
    customerEmail: "sneha.g@outlook.com",
    tripName: "Manali Weekend",
    date: "Feb 11, 2024",
    amount: "₹6,500",
    status: "Pending",
  },
  {
    id: 3,
    customerName: "Rahul Verma",
    customerEmail: "rahul.v@gmail.com",
    tripName: "Kasol Trek",
    date: "Feb 10, 2024",
    amount: "₹4,200",
    status: "Paid",
  },
  {
    id: 4,
    customerName: "Priya Singh",
    customerEmail: "priya.s88@gmail.com",
    tripName: "Spiti Valley Expedition",
    date: "Feb 09, 2024",
    amount: "₹18,500",
    status: "Cancelled",
  },
  {
    id: 5,
    customerName: "Vikram Malhotra",
    customerEmail: "vikram.m@tech.io",
    tripName: "Meghalaya Backpacking",
    date: "Feb 08, 2024",
    amount: "₹24,000",
    status: "Paid",
  },
];

const RecentBookingsWidget: React.FC = () => (
  <div className="dashboard-card">
    <div className="dashboard-card__header">
      <h2 className="dashboard-card__title">Recent Bookings</h2>
      <button className="dashboard-card__link">View All</button>
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
          {bookings.map((b) => (
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
                  className={`status-badge status-badge--${b.status.toLowerCase()}`}
                >
                  {b.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
export default RecentBookingsWidget;

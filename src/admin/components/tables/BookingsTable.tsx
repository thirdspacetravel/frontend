import React from "react";
import CalendarIcon from "../../../icons/CalendarIcon";
import FilterIcon from "../../../icons/FilterIcon";
import SearchIcon from "../../../icons/SearchIcon";
interface BookingType {
  id: string;
  customer: {
    name: string;
    email: string;
    avatarUrl?: string;
  };
  trip: {
    title: string;
    dates: string;
  };
  travelers: number;
  totalAmount: string;
  status: "Paid" | "Pending" | "Cancelled";
  dateBooked: string;
}

const MOCK_BOOKINGS: BookingType[] = [
  {
    id: "#BK-2024-001",
    customer: {
      name: "Arjun Mehta",
      email: "arjun.m@example.com",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun",
    },
    trip: {
      title: "Manali & Kasol Escape",
      dates: "14 Oct - 18 Oct",
    },
    travelers: 2,
    totalAmount: "₹16,998",
    status: "Paid",
    dateBooked: "Oct 10, 2024",
  },
  {
    id: "#BK-2024-002",
    customer: {
      name: "Sneha Kapoor",
      email: "sneha.kap@example.com",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sneha",
    },
    trip: {
      title: "Spiti Valley Adventure",
      dates: "20 Oct - 26 Oct",
    },
    travelers: 4,
    totalAmount: "₹48,000",
    status: "Pending",
    dateBooked: "Oct 11, 2024",
  },
  {
    id: "#BK-2024-003",
    customer: {
      name: "Rohan Das",
      email: "r.das99@example.com",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rohan",
    },
    trip: {
      title: "Goa Workation",
      dates: "01 Nov - 07 Nov",
    },
    travelers: 1,
    totalAmount: "₹12,500",
    status: "Paid",
    dateBooked: "Oct 12, 2024",
  },
  {
    id: "#BK-2024-004",
    customer: {
      name: "Priya Sharma",
      email: "priya.s@example.com",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
    },
    trip: {
      title: "Manali & Kasol Escape",
      dates: "14 Oct - 18 Oct",
    },
    travelers: 2,
    totalAmount: "₹16,998",
    status: "Cancelled",
    dateBooked: "Oct 08, 2024",
  },
  {
    id: "#BK-2024-005",
    customer: {
      name: "Vikram Singh",
      email: "vikram.singh@example.com",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Vikram",
    },
    trip: {
      title: "Kerala Backwaters",
      dates: "10 Dec - 15 Dec",
    },
    travelers: 6,
    totalAmount: "₹92,400",
    status: "Paid",
    dateBooked: "Oct 12, 2024",
  },
];

const BookingsTable: React.FC = () => {
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

        <div className="dashboard-header__filters">
          <button className="dashboard-header__filter-btn">
            <FilterIcon />
            <span>Status: All</span>
          </button>

          <button className="dashboard-header__filter-btn">
            <CalendarIcon />
            <span>Date Range</span>
          </button>
        </div>
      </header>

      <div className="dashboard-card">
        <div className="dashboard-card__header">
          <h2 className="dashboard-card__title">bookings</h2>
        </div>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Customer</th>
                <th>Trip Details</th>
                <th>Travelers</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date Booked</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_BOOKINGS.map((booking) => (
                <tr key={booking.id}>
                  <td>{booking.id}</td>
                  <td>
                    <div className="table__wrap">
                      <span className="table__title">
                        {booking.customer.name}
                      </span>
                      <span className="table__subtitle">
                        {booking.customer.email}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="table__wrap">
                      <span className="table__title">{booking.trip.title}</span>
                      <span className="table__subtitle">
                        {booking.trip.dates}
                      </span>
                    </div>
                  </td>
                  <td>{booking.travelers} Pax</td>
                  <td className="table__amount">{booking.totalAmount}</td>
                  <td>
                    <span
                      className={`status-badge status-badge--${booking.status.toLowerCase()}`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td className="table__date">{booking.dateBooked}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <footer className="dashboard-card__pagination">
          <span className="pagination-info">Showing 1-5 of 48 bookings</span>

          <div className="pagination-controls">
            <button className="btn btn--disabled">Previous</button>
            <button className="btn">Next</button>
          </div>
        </footer>
      </div>
    </>
  );
};
export default BookingsTable;

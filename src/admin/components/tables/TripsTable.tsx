import React from "react";
import CalendarIcon from "../../../icons/CalendarIcon";
import FilterIcon from "../../../icons/FilterIcon";
import SearchIcon from "../../../icons/SearchIcon";
import MoreIcon from "../../../icons/MoreIcon";
import { useNavigate } from "react-router";
import Button from "../../../components/utils/Button";
import AddIcon from "../../../icons/AddIcon";
interface TripBooking {
  id: string;
  tripName: string;
  location: string;
  departures: string;
  duration: string;
  price: string;
  nextDate: string; // Use ISO string or formatted string
  status: "Active" | "Draft" | "Cancelled";
  image?: string; // Optional image URL or base64
}

const TRIP_DATA: TripBooking[] = [
  // {
  //   id: "TRP-001",
  //   tripName: "Spiti Valley Expedition",
  //   location: "Himachal Pradesh",
  //   departures: "4 upcoming departures",
  //   duration: "7 Days / 6 Nights",
  //   price: "₹18,500",
  //   nextDate: "Feb 15, 2024",
  //   status: "Active",
  // },
  // {
  //   id: "TRP-002",
  //   tripName: "Manali Weekend Escape",
  //   location: "Himachal Pradesh",
  //   departures: "2 upcoming departures",
  //   duration: "3 Days / 2 Nights",
  //   price: "₹6,500",
  //   nextDate: "Feb 22, 2024",
  //   status: "Active",
  // },
  // {
  //   id: "TRP-003",
  //   tripName: "Meghalaya Backpacking",
  //   location: "North East",
  //   departures: "1 upcoming departure",
  //   duration: "6 Days / 5 Nights",
  //   price: "₹24,000",
  //   nextDate: "Mar 10, 2024",
  //   status: "Active",
  // },
  // {
  //   id: "TRP-004",
  //   tripName: "Kasol & Kheerganga Trek",
  //   location: "Himachal Pradesh",
  //   departures: "No dates added",
  //   duration: "3 Days / 2 Nights",
  //   price: "₹5,200",
  //   nextDate: "-",
  //   status: "Draft",
  // },
  // {
  //   id: "TRP-005",
  //   tripName: "Vietnam Explorer",
  //   location: "International",
  //   departures: "Planning Phase",
  //   duration: "9 Days / 8 Nights",
  //   price: "₹45,000",
  //   nextDate: "Apr 05, 2024",
  //   status: "Draft",
  // },
];
const TripsTable: React.FC = () => {
  const navigate = useNavigate();
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
          <h2 className="dashboard-card__title">Trip Management</h2>
          <Button solid>
            <AddIcon /> Add Trip
          </Button>
        </div>

        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Trip Name</th>
                <th>Duration</th>
                <th>Price</th>
                <th>Next Date</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {TRIP_DATA.length > 0 ? (
                TRIP_DATA.map((item) => (
                  <tr
                    key={item.id}
                    onClick={() => {
                      navigate(`/admin/trips/${item.id}`);
                    }}
                  >
                    {/* Primary Info */}
                    <td>
                      <div className="table-info">
                        <img src="https://placehold.co/100" alt="" />
                        <div>
                          <div className="table__title">{item.tripName}</div>
                          <div className="table__subtitle">
                            {item.location} • {item.departures} upcoming
                            departures
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span>{item.duration}</span>
                    </td>
                    <td>
                      <span>{item.price}</span>
                    </td>
                    <td>
                      <span>{item.nextDate}</span>
                    </td>
                    <td>
                      <span
                        className={`status-badge status-badge--${item.status.toLowerCase()}`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td>
                      <button className="action-btn" aria-label="Options">
                        <MoreIcon />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6}>
                    <div className="empty-state">
                      <p>No trips found.</p>
                      <p>
                        It looks like there are no trips scheduled at the
                        moment.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
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
export default TripsTable;

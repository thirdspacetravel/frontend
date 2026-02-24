import React from "react";
import CalendarIcon from "../../../icons/CalendarIcon";
import FilterIcon from "../../../icons/FilterIcon";
import SearchIcon from "../../../icons/SearchIcon";
import MoreIcon from "../../../icons/MoreIcon";
import { useNavigate } from "react-router";
import InteractiveButton from "../../../components/utils/InteractiveButton";
import AddIcon from "../../../icons/AddIcon";
import { trpc } from "../../../trpc";

const getStatusDetails = (status: number) => {
  switch (status) {
    case 1:
      return { label: "Draft", class: "draft" };
    case 2:
      return { label: "Active", class: "active" };
    case 3:
      return { label: "Completed", class: "completed" };
    default:
      return { label: "Unknown", class: "unknown" };
  }
};
const TripsTable: React.FC = () => {
  const navigate = useNavigate();

  const utils = trpc.useUtils();

  const createTripMutation = trpc.admin.createDraftTrip.useMutation({
    onSuccess: () => {
      utils.admin.fetchTrips.invalidate();
    },
  });

  const handleAddTrip = async () => {
    await createTripMutation.mutateAsync();
  };

  const { data: trips = [] } = trpc.admin.fetchTrips.useQuery();
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
          <InteractiveButton solid onClick={handleAddTrip}>
            <AddIcon /> Add Trip
          </InteractiveButton>
        </div>

        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Trip Name</th>
                <th>Duration</th>
                <th>Starting Price</th>
                <th>Next Date</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {trips.length > 0 ? (
                trips.map((trip) => {
                  const statusInfo = getStatusDetails(trip.status);
                  const tripImages = trip.images || JSON.parse("[]"); // Handle JSON string if not auto-parsed

                  return (
                    <tr
                      key={trip.id}
                      onClick={() => navigate(`/admin/trips/${trip.id}`)}
                    >
                      <td>
                        <div className="table-info">
                          <img
                            src={
                              tripImages[0]
                                ? `${import.meta.env.VITE_API_URL}/images/${tripImages[0]}`
                                : "https://placehold.co/100"
                            }
                            alt={trip.tripName}
                          />
                          <div>
                            <div className="table__title">{trip.tripName}</div>
                            <div className="table__subtitle">
                              {trip.destination} • {trip.pickupLocation}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="duration-text">
                          {trip.days}D / {trip.nights}N
                        </span>
                      </td>

                      <td>
                        <span className="price-tag">{trip.priceQuad}</span>
                      </td>

                      <td>
                        <span>
                          {trip.startDateTime
                            ? new Date(trip.startDateTime).toLocaleDateString(
                                "en-IN",
                                { day: "numeric", month: "short" },
                              )
                            : "TBD"}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`status-badge status-badge--${statusInfo.class}`}
                        >
                          {statusInfo.label}
                        </span>
                      </td>

                      <td>
                        <button
                          className="action-btn"
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent row click
                            // Handle menu
                          }}
                        >
                          <MoreIcon />
                        </button>
                      </td>
                    </tr>
                  );
                })
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

import React from "react";
import SearchIcon from "../../../icons/SearchIcon";
import { useNavigate } from "react-router";
import InteractiveButton from "../../../components/utils/InteractiveButton";
import AddIcon from "../../../icons/AddIcon";
import { trpc } from "../../../trpc";
import TrashIcon from "../../../icons/TrashIcon";
import Spinner from "../../../components/utils/Spinner";

const TripsTable: React.FC = () => {
  const [page, setPage] = React.useState(1);
  const navigate = useNavigate();

  const utils = trpc.useUtils();

  const createTripMutation = trpc.admin.createDraftTrip.useMutation({
    onSuccess: () => {
      utils.admin.fetchTrips.invalidate();
      utils.admin.getTripsCount.invalidate();
    },
  });
  const deleteTripMutation = trpc.admin.deleteTrip.useMutation({
    onSuccess: () => {
      utils.admin.fetchTrips.invalidate();
      utils.admin.getTripsCount.invalidate();
    },
  });
  const handleAddTrip = async () => {
    await createTripMutation.mutateAsync();
  };
  // Fetch paginated data
  const { data: trips = [] } = trpc.admin.fetchTrips.useQuery({
    page,
  });

  // Fetch total count for pagination logic
  const { data: countData } = trpc.admin.getTripsCount.useQuery();

  const totalPages = countData?.totalPages || 1;
  const totalItems = countData?.total || 0;

  // Calculate showing range: e.g., "Showing 11-20 of 48"
  const startRange = (page - 1) * 10 + 1;
  const endRange = Math.min(page * 10, totalItems);
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
                <th>Trip Id</th>
                <th>Duration</th>
                <th>Starting Price</th>
                <th>Seats Booked</th>
                <th>Start Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {trips.length > 0 ? (
                trips.map((trip) => {
                  const tripImages = trip.images || JSON.parse("[]"); // Handle JSON string if not auto-parsed
                  const isDeletingThisTrip =
                    deleteTripMutation.isPending &&
                    deleteTripMutation.variables?.id === trip.id;
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
                        #TR-{trip.status.slice(0, 3).toUpperCase()}-
                        {trip.tripNo
                          .toString()
                          .padStart(countData?.total || 4, "0")}
                      </td>
                      <td>
                        <span className="duration-text">
                          {trip.days}D / {trip.nights}N
                        </span>
                      </td>

                      <td>
                        <span className="price-tag">
                          {trip.priceQuad && `₹${trip.priceQuad}`}
                          {!trip.priceQuad &&
                            trip.priceTriple &&
                            `₹${trip.priceTriple}`}
                          {!trip.priceQuad &&
                            !trip.priceTriple &&
                            trip.priceDouble &&
                            `₹${trip.priceDouble}`}
                          {!trip.priceQuad &&
                            !trip.priceTriple &&
                            !trip.priceDouble &&
                            "TBD"}
                        </span>
                      </td>
                      <td>
                        {trip.totalSeats
                          ? `${trip.bookedSeats}/${trip.totalSeats}`
                          : "TBD"}
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
                          className={`status-badge status-badge--${trip.status.toLowerCase()}`}
                        >
                          {trip.status}
                        </span>
                      </td>

                      <td>
                        {trip.status === "DRAFT" && (
                          <button
                            className="action-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (
                                confirm(
                                  "Are you sure you want to delete this Trip?",
                                )
                              ) {
                                deleteTripMutation.mutate({ id: trip.id });
                              }
                            }}
                            disabled={deleteTripMutation.isPending}
                          >
                            {isDeletingThisTrip ? (
                              <Spinner size={16} strokeWidth={1} />
                            ) : (
                              <TrashIcon color="red" />
                            )}
                          </button>
                        )}
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
          <span className="pagination-info">
            Showing {totalItems > 0 ? `${startRange}-${endRange}` : "0"} of{" "}
            {totalItems} trips
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
export default TripsTable;

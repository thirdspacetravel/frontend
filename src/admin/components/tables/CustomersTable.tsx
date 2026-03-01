import React from "react";
import { trpc } from "../../../trpc";
import SearchIcon from "../../../icons/SearchIcon";
import Spinner from "../../../components/utils/Spinner";
import UserRemoveIcon from "../../../icons/UserSuspend";

const ITEMS_PER_PAGE = 10;

const CustomersTable: React.FC = () => {
  const [page, setPage] = React.useState(1);
  const utils = trpc.useUtils();

  // 1. Fetch paginated user data
  const { data: users = [], isLoading } = trpc.admin.fetchUsers.useQuery({
    page,
  });

  // 2. Fetch total count for pagination logic
  const { data: countData } = trpc.admin.getUsersCount.useQuery();

  // 3. Delete mutation (matching your TripsTable logic)
  const deleteUserMutation = trpc.admin.deleteUser.useMutation({
    onSuccess: () => {
      utils.admin.fetchUsers.invalidate();
      utils.admin.getUsersCount.invalidate();
    },
  });

  const totalPages = countData?.totalPages || 1;
  const totalItems = countData?.total || 0;

  // Pagination range calculations
  const startRange = (page - 1) * ITEMS_PER_PAGE + 1;
  const endRange = Math.min(page * ITEMS_PER_PAGE, totalItems);

  return (
    <>
      <header className="dashboard-header">
        <div className="dashboard-header__search-wrapper">
          <SearchIcon className="dashboard-header__search-icon" />
          <input
            type="text"
            className="dashboard-header__search-input"
            placeholder="Search by name, email or phone..."
          />
        </div>
      </header>

      <div className="dashboard-card">
        <div className="dashboard-card__header">
          <h2 className="dashboard-card__title">Customers</h2>
        </div>

        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Phone</th>
                <th>Location</th>
                <th>Joined Date</th>
                <th>Bookings</th>
                <th>Total Spent</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td
                    colSpan={6}
                    style={{ textAlign: "center", padding: "2rem" }}
                  >
                    <Spinner size={24} />
                  </td>
                </tr>
              ) : users.length > 0 ? (
                users.map((user) => {
                  const isDeleting =
                    deleteUserMutation.isPending &&
                    deleteUserMutation.variables?.id === user.id;

                  return (
                    <tr key={user.id}>
                      <td>
                        <div className="table-info">
                          <img
                            className="round"
                            src={
                              user.avatarUrl
                                ? `${import.meta.env.VITE_API_URL}/images/${user.avatarUrl}`
                                : "/avatars/user.png"
                            }
                            alt={user.fullName}
                          />
                          <div>
                            <div className="table__title">{user.fullName}</div>
                            <div className="table__subtitle">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="table__subtitle">
                          {user.phoneNumber ? `+91 ${user.phoneNumber}` : "N/A"}
                        </span>
                      </td>
                      <td>
                        <div className="table__wrap">
                          <span className="table__title">
                            {user.city || "Unknown City"}
                          </span>
                          <span className="table__subtitle">
                            {user.country || "-"}
                          </span>
                        </div>
                      </td>
                      <td>
                        <span>
                          {new Date(user.createdAt).toLocaleDateString(
                            "en-IN",
                            {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            },
                          )}
                        </span>
                      </td>
                      <td>
                        <span className="table__bookings-badge">
                          {user.bookings}
                        </span>
                      </td>
                      <td className="table__amount">₹{user.totalSpent}</td>
                      <td>
                        <span
                          className={`status-badge status-badge--${user.status.toLowerCase()}`}
                        >
                          {user.status.replace("_", " ")}
                        </span>
                      </td>
                      <td>
                        {user.status !== "SUSPENDED" && (
                          <button
                            className="action-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (
                                confirm(
                                  "Are you sure you want to Suspend this user?",
                                )
                              ) {
                                deleteUserMutation.mutate({ id: user.id });
                              }
                            }}
                            disabled={deleteUserMutation.isPending}
                          >
                            {isDeleting ? (
                              <Spinner size={16} strokeWidth={1} />
                            ) : (
                              <UserRemoveIcon color="red" />
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
                      <p>No customers found.</p>
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
            {totalItems} customers
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

export default CustomersTable;

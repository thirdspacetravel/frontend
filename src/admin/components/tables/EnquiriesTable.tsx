import React, { useState } from "react";
import SearchIcon from "../../../icons/SearchIcon";
import { useNavigate } from "react-router";
import { trpc } from "../../../trpc";
import Spinner from "../../../components/utils/Spinner";
const EnquiriesTable: React.FC = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  // 1. Fetch Enquiries
  const { data: enquiries = [], isLoading } =
    trpc.admin.fetchEnquiries.useQuery({
      page,
    });

  // 2. Fetch Count for Pagination
  const { data: countData } = trpc.admin.getEnquiriesCount.useQuery();
  const LIMIT = 10;
  const totalItems = countData?.total || 0;
  const totalPages = countData?.totalPages || 1;
  const startRange = (page - 1) * LIMIT + 1;
  const endRange = Math.min(page * LIMIT, totalItems);
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
          <h2 className="dashboard-card__title">Recent Enquiries</h2>
        </div>
        {enquiries.length > 0 ? (
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Customer</th>
                  <th>Enquiry Details</th>
                  <th>Group Size</th>
                  <th>Status</th>
                  <th>Enquiry Date</th>
                  <th>Enquiry Time</th>
                </tr>
              </thead>
              <tbody>
                {enquiries.map((enquiry) => (
                  <tr
                    onClick={() => {
                      // Navigate using the unique cuid
                      navigate(`/admin/enquiries/${enquiry.id}`);
                    }}
                    key={enquiry.id}
                    style={{ cursor: "pointer" }}
                  >
                    <td>
                      #ENQ-{enquiry.id.slice(0, 4).toUpperCase()}-
                      {enquiry.id.slice(4, 8).toUpperCase()}-
                      {enquiry.enquiryNo.toString().padStart(4, "0")}
                    </td>
                    <td>
                      <div className="table__wrap">
                        <span className="table__title">
                          {enquiry.fullName || enquiry.fullName}
                        </span>
                        <span className="table__subtitle">
                          {enquiry.email || enquiry.email}
                        </span>
                      </div>
                    </td>
                    <td>
                      <div className="table__wrap">
                        <span className="table__title">{enquiry.subject}</span>
                        <span className="table__subtitle">
                          {enquiry.destination || "N/A"}
                        </span>
                      </div>
                    </td>
                    <td>{enquiry.groupSize || "N/A"}</td>
                    <td>
                      <span
                        className={`status-badge status-badge--${enquiry.status.toLowerCase()}`}
                      >
                        {enquiry.type == "CONTACT"
                          ? enquiry.status == "NEW"
                            ? enquiry.status
                            : enquiry.status == "ACCEPTED"
                              ? "REPLIED"
                              : "NOT REPLIED"
                          : enquiry.status}
                      </span>
                    </td>
                    <td className="table__date">
                      {formatDate(new Date(enquiry.createdAt))}
                    </td>
                    <td className="table__date">
                      {formatTime(new Date(enquiry.createdAt))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-state">
            {isLoading ? (
              <Spinner size={20} strokeWidth={1} />
            ) : (
              <p>No enquiries found.</p>
            )}
          </div>
        )}

        {/* Updated Pagination Footer */}
        <footer className="dashboard-card__pagination">
          <span className="pagination-info">
            Showing {totalItems > 0 ? `${startRange}-${endRange}` : "0"} of{" "}
            {totalItems} enquiries
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
export default EnquiriesTable;

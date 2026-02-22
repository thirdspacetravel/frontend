import React from "react";
import CalendarIcon from "../../../icons/CalendarIcon";
import FilterIcon from "../../../icons/FilterIcon";
import SearchIcon from "../../../icons/SearchIcon";
import { useNavigate } from "react-router";
interface Enquiry {
  id: string;
  customer: {
    name: string;
    email: string;
  };
  enquiryDetails: {
    tripName: string;
    category: string;
  };
  pax: number;
  status: "New" | "Contacted" | "Converted" | "Closed";
  date: string;
}

const MOCK_ENQUIRIES: Enquiry[] = [
  {
    id: "ENQ-001",
    customer: { name: "Priya Sharma", email: "priya.s@example.com" },
    enquiryDetails: {
      tripName: "Manali College Trip Request",
      category: "Institutional",
    },
    pax: 45,
    status: "New",
    date: "Mar 12, 2024",
  },
  {
    id: "ENQ-002",
    customer: { name: "Rahul Verma", email: "rahul.verma@techcorp.in" },
    enquiryDetails: {
      tripName: "Corporate Retreat Inquiry",
      category: "Corporate",
    },
    pax: 20,
    status: "Contacted",
    date: "Mar 11, 2024",
  },
  {
    id: "ENQ-003",
    customer: { name: "Aisha Khan", email: "aisha.k@delhiuniv.ac.in" },
    enquiryDetails: {
      tripName: "Kasol Trek Booking for Group",
      category: "Group Trip",
    },
    pax: 12,
    status: "Converted",
    date: "Mar 10, 2024",
  },
  {
    id: "ENQ-004",
    customer: { name: "Vikram Singh", email: "vikram.singh@gmail.com" },
    enquiryDetails: {
      tripName: "Price Quote for Spiti Valley",
      category: "Spiti Expedition",
    },
    pax: 5,
    status: "New",
    date: "Mar 09, 2024",
  },
  {
    id: "ENQ-005",
    customer: { name: "Sneha Gupta", email: "sneha.g@startup.io" },
    enquiryDetails: {
      tripName: "Offsite Planning - Goa",
      category: "Corporate",
    },
    pax: 30,
    status: "Closed",
    date: "Mar 08, 2024",
  },
  {
    id: "ENQ-006",
    customer: { name: "Arjun Mehta", email: "arjun.m@freelance.com" },
    enquiryDetails: {
      tripName: "Solo Trip to Tirthan",
      category: "Weekend Trip",
    },
    pax: 1,
    status: "Contacted",
    date: "Mar 07, 2024",
  },
];

const EnquiriesTable: React.FC = () => {
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
          <h2 className="dashboard-card__title">Recent Enquiries</h2>
        </div>
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
              </tr>
            </thead>
            <tbody>
              {MOCK_ENQUIRIES.map((enquiry) => (
                <tr
                  onClick={() => {
                    navigate(`/admin/enquiries/${enquiry.id}`);
                  }}
                  key={enquiry.id}
                >
                  <td>#{enquiry.id}</td>
                  <td>
                    <div className="table-info">
                      <img
                        className="round"
                        src="https://placehold.co/100"
                        alt=""
                      />
                      <div className="table__wrap">
                        <span className="table__title">
                          {enquiry.customer.name}
                        </span>
                        <span className="table__subtitle">
                          {enquiry.customer.email}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="table__wrap">
                      <span className="table__title">
                        {enquiry.enquiryDetails.tripName}
                      </span>
                      <span className="table__subtitle">
                        {enquiry.enquiryDetails.category}
                      </span>
                    </div>
                  </td>
                  <td>{enquiry.pax} Pax</td>
                  <td>
                    <span
                      className={`status-badge status-badge--${enquiry.status.toLowerCase()}`}
                    >
                      {enquiry.status}
                    </span>
                  </td>
                  <td className="table__date">{enquiry.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <footer className="dashboard-card__pagination">
          <span className="pagination-info">
            Showing {MOCK_ENQUIRIES.length} enquiries
          </span>

          <div className="pagination-controls">
            <button className="btn btn--disabled">Previous</button>
            <button className="btn">Next</button>
          </div>
        </footer>
      </div>
    </>
  );
};
export default EnquiriesTable;

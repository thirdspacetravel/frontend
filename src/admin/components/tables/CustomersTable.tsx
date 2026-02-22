import React from "react";
import CalendarIcon from "../../../icons/CalendarIcon";
import FilterIcon from "../../../icons/FilterIcon";
import SearchIcon from "../../../icons/SearchIcon";
import MoreIcon from "../../../icons/MoreIcon";
interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatarUrl?: string;
  totalBookings: number;
  lastTrip: {
    destination: string;
    date: string;
  };
  totalSpent: string;
  status: "Active" | "Inactive" | "Pending";
}

const MOCK_CUSTOMERS: Customer[] = [
  {
    id: "CUST-001",
    name: "Aditi Sharma",
    email: "aditi.s@gmail.com",
    phone: "+91 98765 43210",
    totalBookings: 3,
    lastTrip: {
      destination: "Spiti Valley Expedition",
      date: "Feb 15, 2024",
    },
    totalSpent: "₹52,000",
    status: "Active",
  },
  {
    id: "CUST-002",
    name: "Rahul Verma",
    email: "rahul.v88@yahoo.com",
    phone: "+91 99887 77665",
    totalBookings: 1,
    lastTrip: {
      destination: "Manali Weekend",
      date: "Jan 10, 2024",
    },
    totalSpent: "₹6,500",
    status: "Active",
  },
  {
    id: "CUST-003",
    name: "Priya Singh",
    email: "priya.design@gmail.com",
    phone: "+91 88776 65544",
    totalBookings: 5,
    lastTrip: {
      destination: "Meghalaya Trip",
      date: "Dec 05, 2023",
    },
    totalSpent: "₹85,500",
    status: "Active",
  },
  {
    id: "CUST-004",
    name: "Karan Malhotra",
    email: "karan.m@college.edu",
    phone: "+91 76543 21098",
    totalBookings: 0,
    lastTrip: {
      destination: "-",
      date: "-",
    },
    totalSpent: "₹0",
    status: "Inactive",
  },
  {
    id: "CUST-005",
    name: "Sneha Kapoor",
    email: "sneha.k@corp.com",
    phone: "+91 98123 45678",
    totalBookings: 2,
    lastTrip: {
      destination: "Bir Billing Paragliding",
      date: "Nov 12, 2023",
    },
    totalSpent: "₹15,000",
    status: "Active",
  },
];

const CustomersTable: React.FC = () => {
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
          <h2 className="dashboard-card__title">Customers</h2>
        </div>

        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Phone</th>
                <th>Bookings</th>
                <th>Last Trip</th>
                <th>Total Spent</th>
                <th>Status</th>
                <th aria-label="Actions"></th>
              </tr>
            </thead>
            <tbody>
              {MOCK_CUSTOMERS.map((customer) => (
                <tr key={customer.id}>
                  <td>
                    <div className="table-info">
                      <img
                        className="round"
                        src="https://placehold.co/100"
                        alt=""
                      />
                      <div>
                        <div className="table__title">{customer.name}</div>
                        <div className="table__subtitle">{customer.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="table__subtitle">{customer.phone}</span>
                  </td>
                  <td>
                    <span className="table__bookings-badge">
                      {customer.totalBookings}
                    </span>
                  </td>
                  <td>
                    <div className="table__wrap">
                      <span className="table__title">
                        {customer.lastTrip.destination}
                      </span>
                      <span className="table__subtitle">
                        {customer.lastTrip.date}
                      </span>
                    </div>
                  </td>
                  <td className="table__amount">{customer.totalSpent}</td>
                  <td>
                    <span
                      className={`status-badge status-badge--${customer.status.toLowerCase()}`}
                    >
                      {customer.status}
                    </span>
                  </td>
                  <td>
                    <button className="action-btn" aria-label="Options">
                      <MoreIcon />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <footer className="dashboard-card__pagination">
          <span className="pagination-info">Showing 1-1 of 1 customers</span>
          <div className="pagination-controls">
            <button className="btn btn--disabled">Previous</button>
            <button className="btn">Next</button>
          </div>
        </footer>
      </div>
    </>
  );
};
export default CustomersTable;

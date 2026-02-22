import type { StatItem } from "./MetricCard";
import StatCard from "./MetricCard";
import UpcomingDepartures from "./UpcomingDeparturesWidget";
import NewEnquiries from "./NewEnquiriesWidget";
import RecentBookings from "./RecentBookingsWidget";
import RupeeIcon from "../../../icons/RupeeIcon";
import CalendarIcon from "../../../icons/CalendarIcon";
import GlobeIcon from "../../../icons/GlobeIcon";
import UsersIcon from "../../../icons/UsersIcon";
const statsData: StatItem[] = [
  {
    label: "Total Revenue",
    value: "₹12,45,000",
    trend: "+12.5% from last month",
    trendType: "up",
    icon: <RupeeIcon />,
  },
  {
    label: "Active Bookings",
    value: "45",
    trend: "+4 new today",
    trendType: "up",
    icon: <CalendarIcon />,
  },
  {
    label: "Upcoming Trips",
    value: "8",
    trend: "Next: Spiti Valley (Feb 15)",
    trendType: "neutral",
    icon: <GlobeIcon />,
  },
  {
    label: "Total Customers",
    value: "1,240",
    trend: "+28 this month",
    trendType: "up",
    icon: <UsersIcon />,
  },
];
const DashboardContainer = () => {
  return (
    <>
      <div className="stats-grid">
        {statsData.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>
      <div className="dashboard-grid">
        <RecentBookings />
        <aside className="dashboard-grid__side">
          <UpcomingDepartures />
          <NewEnquiries />
        </aside>
      </div>
    </>
  );
};

export default DashboardContainer;

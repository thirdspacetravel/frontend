import type { StatItem } from "./MetricCard";
import StatCard from "./MetricCard";
import UpcomingDepartures from "./UpcomingDeparturesWidget";
import NewEnquiries from "./NewEnquiriesWidget";
import RecentBookings from "./RecentBookingsWidget";
import RupeeIcon from "../../../icons/RupeeIcon";
import CalendarIcon from "../../../icons/CalendarIcon";
import GlobeIcon from "../../../icons/GlobeIcon";
import UsersIcon from "../../../icons/UsersIcon";
import { trpc } from "../../../trpc";
const DashboardContainer = () => {
  const { data: stats, isLoading } = trpc.public.fetchStats.useQuery();
  if (isLoading) return <div className="loading-wrapper">Loading stats...</div>;
  const statsData: StatItem[] = [
    {
      label: "Total Revenue",
      value:
        stats?.totalRevenue.toLocaleString("en-IN", {
          style: "currency",
          currency: "INR",
        }) || "₹0",
      icon: <RupeeIcon />,
    },
    {
      label: "Active Bookings",
      value: stats?.totalBookings || 0,
      icon: <CalendarIcon />,
    },
    {
      label: "Upcoming Trips",
      value: stats?.totalTrips || 0,
      icon: <GlobeIcon />,
    },
    {
      label: "Total Customers",
      value: stats?.totalUsers || 0,
      icon: <UsersIcon />,
    },
  ];
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

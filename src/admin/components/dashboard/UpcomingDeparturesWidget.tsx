import { useNavigate } from "react-router";
import ChevronRightIcon from "../../../icons/ChevronRightIcon";
import { trpc } from "../../../trpc";

const UpcomingDeparturesWidget: React.FC = () => {
  const navigate = useNavigate();
  const { data: departures = [], isLoading } =
    trpc.public.fetchUpcomingTrips.useQuery(
      { page: 1 },
      {
        select: (data) =>
          data.slice(0, 3).map((trip) => ({
            id: trip.id,
            title: trip.tripName,
            schedule: trip.startDateTime
              ? new Date(trip.startDateTime).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })
              : "TBD",
            image: trip.images[0] || null,
          })),
      },
    );
  if (isLoading)
    return (
      <div className="loading-wrapper">Loading upcoming departures...</div>
    );
  return (
    <div className="dashboard-card">
      <div className="dashboard-card__header">
        <h2 className="dashboard-card__title">Upcoming Departures</h2>
      </div>
      <ul className="side-list">
        {departures.length > 0 ? (
          departures.map((d) => (
            <li
              key={d.id}
              className="side-list__item"
              onClick={() => navigate(`/admin/trips/${d.id}`)}
            >
              <div className="side-list__icon-box">
                {d.image && (
                  <img
                    src={`${import.meta.env.VITE_API_URL}/images/${d.image}`}
                    alt="Trip Icon"
                  />
                )}
              </div>
              <div className="side-list__content">
                <span className="side-list__title">{d.title}</span>
                <span className="side-list__meta">{d.schedule}</span>
              </div>
              <ChevronRightIcon />
            </li>
          ))
        ) : (
          <div className="empty-state">
            <p>No upcoming departures found.</p>
          </div>
        )}
      </ul>
    </div>
  );
};
export default UpcomingDeparturesWidget;

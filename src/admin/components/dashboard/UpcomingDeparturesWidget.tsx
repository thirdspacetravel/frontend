import ChevronRightIcon from "../../../icons/ChevronRightIcon";

interface Departure {
  id: number;
  title: string;
  schedule: string;
  iconType: "mountain" | "tent" | "bus";
}
const departures: Departure[] = [
  {
    id: 1,
    title: "Spiti Valley Winter",
    schedule: "Feb 15 • 12/14 Seats Full",
    iconType: "mountain",
  },
  {
    id: 2,
    title: "Bir Billing Camping",
    schedule: "Feb 18 • 8/20 Seats Full",
    iconType: "tent",
  },
  {
    id: 3,
    title: "Manali Roadtrip",
    schedule: "Feb 22 • 15/15 Seats Full",
    iconType: "bus",
  },
];
const UpcomingDeparturesWidget: React.FC = () => (
  <div className="dashboard-card">
    <div className="dashboard-card__header">
      <h2 className="dashboard-card__title">Upcoming Departures</h2>
    </div>
    <ul className="side-list">
      {departures.map((d) => (
        <li key={d.id} className="side-list__item">
          <div className="side-list__icon-box"></div>
          <div className="side-list__content">
            <span className="side-list__title">{d.title}</span>
            <span className="side-list__meta">{d.schedule}</span>
          </div>
          <ChevronRightIcon />
        </li>
      ))}
    </ul>
  </div>
);
export default UpcomingDeparturesWidget;

interface Enquiry {
  id: number;
  title: string;
  meta: string;
  isNew?: boolean;
}

const enquiries: Enquiry[] = [
  {
    id: 1,
    title: "College Trip for 40 students",
    meta: "St. Xavier's College • Today",
    isNew: true,
  },
  {
    id: 2,
    title: "Corporate Retreat Inquiry",
    meta: "TechSoft Solutions • Yesterday",
  },
];
const NewEnquiriesWidget: React.FC = () => (
  <div className="dashboard-card">
    <div className="dashboard-card__header">
      <h2 className="dashboard-card__title">New Enquiries</h2>
      <button className="dashboard-card__link">View All</button>
    </div>
    <ul className="side-list">
      {enquiries.map((e) => (
        <li key={e.id} className="side-list__item side-list__item--simple">
          <div className="side-list__content">
            <span className="side-list__title">{e.title}</span>
            <span className="side-list__meta">{e.meta}</span>
          </div>
          {e.isNew && <span className="badge-new">New</span>}
        </li>
      ))}
    </ul>
  </div>
);
export default NewEnquiriesWidget;

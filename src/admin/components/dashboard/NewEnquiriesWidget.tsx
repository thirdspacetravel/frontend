import { useNavigate } from "react-router";
import { trpc } from "../../../trpc";

const NewEnquiriesWidget: React.FC = () => {
  const navigate = useNavigate();
  const { data: enquiries, isLoading } = trpc.admin.fetchEnquiries.useQuery(
    { page: 1 },
    {
      select: (data) =>
        data.slice(0, 3).map((b) => ({
          id: b.id,
          title: b.subject,
          meta: `${b.fullName} • ${new Date(b.createdAt).toLocaleDateString()}`,
          isNew: b.status === "NEW",
        })),
    },
  );
  if (isLoading)
    return <div className="loading-wrapper">Loading enquiries...</div>;
  return (
    <div className="dashboard-card">
      <div className="dashboard-card__header">
        <h2 className="dashboard-card__title">New Enquiries</h2>
        <button className="dashboard-card__link">View All</button>
      </div>
      <ul className="side-list">
        {enquiries?.map((e) => (
          <li
            key={e.id}
            className="side-list__item side-list__item--simple"
            onClick={() => navigate(`/admin/enquiries/${e.id}`)}
          >
            <div className="side-list__content">
              <span className="side-list__title">{e.title}</span>
              <span className="side-list__meta">{e.meta}</span>
            </div>
            {e.isNew ? (
              <span className="badge">New</span>
            ) : (
              <span className="badge">Read</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default NewEnquiriesWidget;

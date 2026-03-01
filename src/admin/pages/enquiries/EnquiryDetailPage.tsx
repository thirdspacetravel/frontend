import { useOutletContext, useParams } from "react-router";
import MenuIcon from "../../../icons/MenuIcon";
import EnquiryDetailsView from "../../components/enquiries/EnquiryDetailsView";
import { trpc } from "../../../trpc";
interface ContextType {
  toggle: () => void;
  isOpen: boolean;
}

const EnquiryDetailPage = () => {
  const { toggle } = useOutletContext<ContextType>();
  const { enquiryId } = useParams();

  // tRPC Query Hook
  // We use 'enabled' to prevent the query from running until the ID is available
  const enquiryQuery = trpc.admin.fetchEnquiriesById.useQuery(
    { id: enquiryId as string },
    {
      enabled: !!enquiryId,
      select: (data) => ({
        ...data,
        createdAt: new Date(data.createdAt),
        updatedAt: new Date(data.updatedAt),
      }),
    },
  );

  if (enquiryQuery.isLoading) {
    return <div>Loading enquiry details...</div>;
  }

  if (enquiryQuery.isError) {
    return <div>Error: {enquiryQuery.error.message}</div>;
  }
  if (!enquiryQuery.data) {
    return <div>No enquiry found with ID: {enquiryId}</div>;
  }
  return (
    <>
      <header className="layout-header">
        <div className="layout-header__left">
          <div className="menu-toggle" onClick={toggle}>
            <MenuIcon />
          </div>
          <h2 className="layout-header__title">
            {" "}
            #ENQ-{enquiryQuery.data.id.slice(0, 4).toUpperCase()}-
            {enquiryQuery.data.id.slice(4, 8).toUpperCase()}-
            {enquiryQuery.data.enquiryNo.toString().padStart(4, "0")}
          </h2>
        </div>
      </header>
      <div className="content">
        <EnquiryDetailsView enquiryData={enquiryQuery.data} />
      </div>
    </>
  );
};

export default EnquiryDetailPage;

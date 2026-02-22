import { useOutletContext, useParams } from "react-router";
import MenuIcon from "../../../icons/MenuIcon";
import EnquiryDetailsView from "../../components/enquiries/EnquiryDetailsView";
interface ContextType {
  toggle: () => void;
  isOpen: boolean;
}

const EnquiryDetailPage = () => {
  const { toggle } = useOutletContext<ContextType>();
  const { enquiryId } = useParams();
  return (
    <>
      <header className="layout-header">
        <div className="layout-header__left">
          <div className="menu-toggle" onClick={toggle}>
            <MenuIcon />
          </div>
          <h2 className="layout-header__title">#{enquiryId}</h2>
        </div>
      </header>
      <div className="content">
        <EnquiryDetailsView />
      </div>
    </>
  );
};

export default EnquiryDetailPage;

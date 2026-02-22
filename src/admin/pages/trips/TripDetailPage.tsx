import { useOutletContext, useParams } from "react-router";
import MenuIcon from "../../../icons/MenuIcon";
import TripEditorForm from "../../components/trips/TripEditorForm";
interface ContextType {
  toggle: () => void;
  isOpen: boolean;
}

const TripDetailPage = () => {
  const { toggle } = useOutletContext<ContextType>();
  const { tripId } = useParams();
  return (
    <>
      <header className="layout-header">
        <div className="layout-header__left">
          <div className="menu-toggle" onClick={toggle}>
            <MenuIcon />
          </div>
          <h2 className="layout-header__title">#{tripId}</h2>
        </div>
      </header>
      <div className="content">
        <TripEditorForm />
      </div>
    </>
  );
};

export default TripDetailPage;

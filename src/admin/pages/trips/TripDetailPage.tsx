import { useRef } from "react";
import { useOutletContext, useParams } from "react-router";
import MenuIcon from "../../../icons/MenuIcon";
import TripEditorForm, {
  type ChildHandle,
} from "../../components/trips/TripEditorForm";
import { trpc } from "../../../trpc";
import { deserializeTrip } from "../../components/trips/utils";
import InteractiveButton from "../../../components/utils/InteractiveButton";
interface ContextType {
  toggle: () => void;
  isOpen: boolean;
}

const TripDetailPage = () => {
  const { toggle } = useOutletContext<ContextType>();
  const { tripId } = useParams();
  const childRef = useRef<ChildHandle>(null);
  const fetchtripQuery = trpc.admin.fetchTripById.useQuery(
    { id: tripId! },
    { enabled: !!tripId },
  );
  if (fetchtripQuery.isLoading || !tripId)
    return <div>Loading trip details...</div>;
  if (fetchtripQuery.isError)
    return <div>Error: {fetchtripQuery.error.message}</div>;
  if (!fetchtripQuery.data) return <div>Trip not found.</div>;

  const handleSave = async () => {
    if (!childRef.current) return;
    await childRef.current.handleSave();
  };
  return (
    <>
      <header className="layout-header">
        <div className="layout-header__left">
          <div className="menu-toggle" onClick={toggle}>
            <MenuIcon />
          </div>
          <h2 className="layout-header__title">#{tripId}</h2>
        </div>
        <InteractiveButton onClick={handleSave}>Save Changes</InteractiveButton>
      </header>
      <div className="content">
        <TripEditorForm
          ref={childRef}
          key={tripId}
          id={tripId}
          initialData={deserializeTrip(fetchtripQuery.data)}
        />
      </div>
    </>
  );
};

export default TripDetailPage;

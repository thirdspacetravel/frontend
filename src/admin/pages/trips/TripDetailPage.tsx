import { useEffect, useRef, useState } from "react";
import { useOutletContext, useParams } from "react-router";
import MenuIcon from "../../../icons/MenuIcon";
import TripEditorForm, {
  type ChildHandle,
} from "../../components/trips/TripEditorForm";
import { trpc } from "../../../trpc";
import InteractiveButton from "../../../components/utils/InteractiveButton";
interface ContextType {
  toggle: () => void;
  isOpen: boolean;
}

const TripDetailPage = () => {
  const { toggle } = useOutletContext<ContextType>();
  const [isDirty, setIsDirty] = useState(false);
  const { tripId } = useParams();
  const childRef = useRef<ChildHandle>(null);
  const fetchtripQuery = trpc.admin.fetchTripById.useQuery(
    { id: tripId! },
    {
      enabled: !!tripId,
      select: (data) => ({
        ...data,
        startDateTime: data.startDateTime ? new Date(data.startDateTime) : null,
        endDateTime: data.endDateTime ? new Date(data.endDateTime) : null,
      }),
    },
  );
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (isDirty) {
        event.preventDefault();
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isDirty]);
  if (fetchtripQuery.isLoading || !tripId)
    return <div>Loading trip details...</div>;
  if (fetchtripQuery.isError)
    return <div>Error: {fetchtripQuery.error.message}</div>;
  if (!fetchtripQuery.data) return <div>Trip not found.</div>;

  const handleSave = async () => {
    if (!childRef.current) return;
    await childRef.current.handleSave();
  };
  const handlePublish = async () => {
    if (!childRef.current) return;
    await childRef.current.handlePublish();
  };
  const handleCancel = async () => {
    if (!childRef.current) return;
    await childRef.current.handleCancel();
  };
  const handleComplete = async () => {
    if (!childRef.current) return;
    await childRef.current.handleComplete();
  };
  return (
    <>
      <header className="layout-header">
        <div className="layout-header__left">
          <div className="menu-toggle" onClick={toggle}>
            <MenuIcon />
          </div>
          <h2 className="layout-header__title">
            #TR-{fetchtripQuery.data.status.slice(0, 3).toUpperCase()}-
            {fetchtripQuery.data.tripNo}
          </h2>
        </div>
      </header>
      <div className="content">
        {(fetchtripQuery.data.status === "DRAFT" ||
          fetchtripQuery.data.status === "PUBLISHED") && (
          <div className="content__actions">
            <InteractiveButton onClick={handleSave} disabled={!isDirty}>
              Save Changes
            </InteractiveButton>
            {fetchtripQuery.data.status === "DRAFT" && (
              <InteractiveButton
                solid
                onClick={handlePublish}
                disabled={isDirty}
              >
                Publish Trip
              </InteractiveButton>
            )}
            {fetchtripQuery.data.status === "PUBLISHED" && (
              <>
                <InteractiveButton
                  solid
                  onClick={handleCancel}
                  className="btn--danger"
                >
                  Cancel Trip
                </InteractiveButton>
                <InteractiveButton solid onClick={handleComplete}>
                  Mark Completed
                </InteractiveButton>
              </>
            )}
          </div>
        )}
        <TripEditorForm
          ref={childRef}
          key={tripId}
          id={tripId}
          initialData={fetchtripQuery.data}
          onDirtyChange={setIsDirty}
        />
      </div>
    </>
  );
};

export default TripDetailPage;

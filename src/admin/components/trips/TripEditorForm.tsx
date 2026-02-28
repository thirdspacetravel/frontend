import InclusionsExclusionsList from "./InclusionsExclusionsList";
import ItineraryPlanner from "./ItineraryPlanner";
import LogisticsAndPricingForm from "./LogisticsAndPricingForm";
import MediaGalleryUpload from "./MediaGalleryUpload";
import TripPreviewCard from "./TripPreviewCard";
import PublishStatusToggle from "./PublishStatusToggle";
import TripCategorySelector from "./TripCategorySelector";
import PricingDatesForm from "./PricingDatesForm";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import type { TripDetails } from "./types";
import { trpc } from "../../../trpc";
import { validateTripForPublishing } from "./validation";
interface Props {
  id: string;
  initialData: TripDetails;
  onDirtyChange: (isDirty: boolean) => void;
}
export type ChildHandle = {
  handleSave: () => Promise<void>;
  handlePublish: () => Promise<void>;
  handleCancel: () => Promise<void>;
  handleComplete: () => Promise<void>;
};

const TripEditorForm = forwardRef<ChildHandle, Props>(
  ({ id, initialData, onDirtyChange }, ref) => {
    const [tripData, setTripData] = useState<TripDetails>(initialData);
    const lastDirtyRef = useRef<boolean>(false);

    useEffect(() => {
      const currentDataString = JSON.stringify(tripData);
      const initialDataString = JSON.stringify(initialData);
      const isDirty = currentDataString !== initialDataString;
      if (isDirty !== lastDirtyRef.current) {
        lastDirtyRef.current = isDirty;
        onDirtyChange(isDirty);
      }
    }, [tripData, initialData, onDirtyChange]);
    const updateTripField = <K extends keyof TripDetails>(
      label: K,
      value: TripDetails[K],
    ) => {
      setTripData((prev) => ({ ...prev, [label]: value }));
    };
    const utils = trpc.useUtils();
    const updateTripMutation = trpc.admin.updateTrip.useMutation({
      onSuccess: () => {
        utils.admin.fetchTripById.invalidate({ id });
      },
      onError: (error) => {
        console.error("Mutation failed:", error.message);
        alert(`Error: ${error.message}`);
      },
    });
    useImperativeHandle(ref, () => ({
      handleSave: async () => {
        const { isValid, errors } = validateTripForPublishing(tripData);
        if (!isValid && tripData.status === "PUBLISHED") {
          alert(`Trip is not ready for Saving. Errors: ${errors.join(", ")}`);
          return;
        }
        await updateTripMutation.mutateAsync(tripData);
      },
      handlePublish: async () => {
        const { isValid, errors } = validateTripForPublishing(tripData);
        if (!isValid) {
          alert(
            `Trip is not ready for publishing. Errors: ${errors.join(", ")}`,
          );
          return;
        }
        updateTripField("status", "PUBLISHED");
        await updateTripMutation.mutateAsync({
          ...tripData,
          status: "PUBLISHED",
        });
      },
      handleCancel: async () => {
        updateTripField("status", "CANCELLED");
        await updateTripMutation.mutateAsync({
          ...tripData,
          status: "CANCELLED",
        });
      },
      handleComplete: async () => {
        updateTripField("status", "COMPLETED");
        await updateTripMutation.mutateAsync({
          ...tripData,
          status: "COMPLETED",
        });
      },
    }));
    return (
      <div className="content-canvas__container">
        <main className="content-canvas__main">
          <TripPreviewCard onChange={updateTripField} tripData={tripData} />
          <LogisticsAndPricingForm
            onChange={updateTripField}
            tripData={tripData}
          />
          <ItineraryPlanner
            ItineraryData={tripData.itinerary}
            onChange={(newData) => updateTripField("itinerary", newData)}
          />
          <InclusionsExclusionsList
            onChange={updateTripField}
            tripData={tripData}
          />
        </main>
        <aside className="content-canvas__sidebar">
          <MediaGalleryUpload
            tripData={tripData}
            onChange={(urls) => updateTripField("images", urls)}
          />
          <PublishStatusToggle onChange={updateTripField} tripData={tripData} />
          <TripCategorySelector
            categories={tripData.categories}
            onChange={updateTripField}
          />
          <PricingDatesForm
            tripData={tripData}
            onChange={(label, value) => updateTripField(label, value)}
          />
        </aside>
      </div>
    );
  },
);

export default TripEditorForm;

import InclusionsExclusionsList from "./InclusionsExclusionsList";
import ItineraryPlanner from "./ItineraryPlanner";
import LogisticsAndPricingForm from "./LogisticsAndPricingForm";
import MediaGalleryUpload from "./MediaGalleryUpload";
import TripPreviewCard from "./TripPreviewCard";
import PublishStatusToggle from "./PublishStatusToggle";
import TripCategorySelector from "./TripCategorySelector";
import PricingDatesForm from "./PricingDatesForm";
import OrganizationDetailsCard from "./OrganizationDetailsCard";
import { forwardRef, useImperativeHandle, useState } from "react";
import type { TripDetails } from "./types";
import { trpc } from "../../../trpc";
import { serializeTrip } from "./utils";
interface Props {
  id: string;
  initialData: TripDetails;
}
export type ChildHandle = {
  handleSave: () => Promise<void>;
};

const TripEditorForm = forwardRef<ChildHandle, Props>(
  ({ id, initialData }, ref) => {
    const [tripData, setTripData] = useState<TripDetails>(initialData);

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
        await updateTripMutation.mutateAsync({
          id,
          ...serializeTrip(tripData),
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
          <OrganizationDetailsCard />
        </aside>
      </div>
    );
  },
);

export default TripEditorForm;

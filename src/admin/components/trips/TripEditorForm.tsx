import InclusionsExclusionsList from "./InclusionsExclusionsList";
import ItineraryPlanner from "./ItineraryPlanner";
import LogisticsAndPricingForm from "./LogisticsAndPricingForm";
import MediaGalleryUpload from "./MediaGalleryUpload";
import TripPreviewCard from "./TripPreviewCard";
import PublishStatusToggle from "./PublishStatusToggle";
import TripCategorySelector from "./TripCategorySelector";
import PricingDatesForm from "./PricingDatesForm";
import OrganizationDetailsCard from "./OrganizationDetailsCard";
const TripEditorForm = () => {
  return (
    <div className="content-canvas__container">
      <main className="content-canvas__main">
        <TripPreviewCard />
        <LogisticsAndPricingForm />
        <ItineraryPlanner />
        <InclusionsExclusionsList />
      </main>
      <aside className="content-canvas__sidebar">
        <MediaGalleryUpload />
        <PublishStatusToggle />
        <TripCategorySelector />
        <PricingDatesForm />
        <OrganizationDetailsCard />
      </aside>
    </div>
  );
};

export default TripEditorForm;

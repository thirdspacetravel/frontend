import { useState } from "react";
import {
  CustomDropdown,
  TextInput,
  TextArea,
} from "../../../components/utils/InputUtils";
const TripPreviewCard = () => {
  const tripTypeOptions = [
    { label: "Group Trip", value: 1 },
    { label: "Private Trip", value: 2 },
    { label: "Customized", value: 3 },
  ];
  const [selectedTripType, setSelectedTripType] = useState<number | null>(null);
  return (
    <div className="content-canvas__card">
      <header className="content-canvas__header">
        <div className="content-canvas__info">
          <h2 className="content-canvas__title">Basic Information</h2>
          <p className="content-canvas__subtitle">
            Trip name, destination and key details used for listing.
          </p>
        </div>
      </header>
      <div className="content-canvas__body">
        {/* Trip Name */}
        <TextInput
          label="Trip Name"
          id="tripName"
          placeholder="e.g. Spiti Valley Winter Expedition"
        />

        <div className="content-canvas__row col-2">
          <TextInput
            label="Destination"
            id="destination"
            placeholder="e.g. Kaza, Himachal Pradesh"
          />

          <div className="input__field">
            <label>Trip Type</label>
            <CustomDropdown
              options={tripTypeOptions}
              value={selectedTripType}
              onSelect={(val) => setSelectedTripType(val)}
              placeholder="Select Trip Type"
            />
          </div>
        </div>

        <TextArea
          label="Short Description (for cards)"
          id="shortDesc"
          className="content-canvas__textarea--short"
          placeholder="Brief summary used in trip cards..."
        />
        <TextArea
          label="Full Overview"
          id="fullOverview"
          className="content-canvas__textarea--long"
          placeholder="Detailed trip description..."
          rows={5}
        />
      </div>
    </div>
  );
};

export default TripPreviewCard;

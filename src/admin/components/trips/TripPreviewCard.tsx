import {
  CustomDropdown,
  TextInput,
  TextArea,
} from "../../../components/utils/InputUtils";
import type { TripDetails } from "./types";
const TripPreviewCard = ({
  onChange,
  tripData,
}: {
  onChange: (label: keyof TripDetails, value: string | number | null) => void;
  tripData: TripDetails;
}) => {
  const tripTypeOptions = [
    { label: "Group Trip", value: 1 },
    { label: "Private Trip", value: 2 },
  ];
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
          value={tripData.tripName}
          onChange={(e) => onChange("tripName", e.target.value)}
        />

        <div className="content-canvas__row col-2">
          <TextInput
            label="Destination"
            id="destination"
            placeholder="e.g. Kaza, Himachal Pradesh"
            value={tripData.destination}
            onChange={(e) => onChange("destination", e.target.value)}
          />

          <div className="input__field">
            <label>Trip Type</label>
            <CustomDropdown
              options={tripTypeOptions}
              value={tripData.tripType}
              onSelect={(val) => onChange("tripType", val)}
              placeholder="Select Trip Type"
            />
          </div>
        </div>
        <TextArea
          label="Full Overview"
          id="fullOverview"
          className="content-canvas__textarea--long"
          placeholder="Detailed trip description..."
          value={tripData.fullOverview}
          onChange={(e) => onChange("fullOverview", e.target.value)}
          rows={5}
        />
      </div>
    </div>
  );
};

export default TripPreviewCard;

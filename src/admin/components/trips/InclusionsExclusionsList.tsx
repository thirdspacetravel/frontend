import { TextArea } from "../../../components/utils/InputUtils";
import type { OnChangeHandler, TripDetails } from "./types";

const InclusionsExclusionsList = ({
  onChange,
  tripData,
}: {
  onChange: OnChangeHandler;
  tripData: TripDetails;
}) => {
  return (
    <div className="content-canvas__card">
      <header className="content-canvas__header">
        <h2 className="content-canvas__title">Inclusions & Exclusions</h2>
      </header>

      <div className="content-canvas__body">
        <TextArea
          label="Inclusions (One per line)"
          id="inclusions"
          placeholder="e.g. Tempo Traveler Transport"
          defaultValue={tripData.inclusions === null ? "" : tripData.inclusions}
          onChange={(e) => onChange("inclusions", e.target.value)}
          rows={5}
        />

        <TextArea
          label="Exclusions (One per line)"
          id="exclusions"
          placeholder="e.g. Lunch on all days"
          defaultValue={tripData.exclusions === null ? "" : tripData.exclusions}
          onChange={(e) => onChange("exclusions", e.target.value)}
          rows={4}
        />
      </div>
    </div>
  );
};

export default InclusionsExclusionsList;

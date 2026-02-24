import { TextInput } from "../../../components/utils/InputUtils";
import type { OnChangeHandler, TripDetails } from "./types";

const PricingDatesForm = ({
  tripData,
  onChange,
}: {
  tripData: TripDetails;
  onChange: OnChangeHandler;
}) => {
  return (
    <aside className="content-canvas__card">
      <header className="content-canvas__header">
        <h2 className="content-canvas__title">Pricing & Dates</h2>
      </header>

      <div className="content-canvas__body">
        <TextInput
          label="Start Date"
          id="start-date"
          type="date"
          value={tripData.startDate || ""}
          onChange={(e) => onChange("startDate", e.target.value)}
        />
        <TextInput
          label="Start Time"
          id="start-time"
          type="time"
          value={tripData.startTime || ""}
          onChange={(e) => onChange("startTime", e.target.value)}
        />
        <TextInput
          label="End Date"
          id="end-date"
          type="date"
          value={tripData.endDate || ""}
          onChange={(e) => onChange("endDate", e.target.value)}
        />
        <TextInput
          label="End Time"
          id="end-time"
          type="time"
          value={tripData.endTime || ""}
          onChange={(e) => onChange("endTime", e.target.value)}
        />
      </div>
    </aside>
  );
};

export default PricingDatesForm;

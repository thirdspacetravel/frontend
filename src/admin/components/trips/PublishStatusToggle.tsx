import { CustomDropdown } from "../../../components/utils/InputUtils";
import { Switch } from "../../../components/utils/InputUtils";
import type { OnChangeHandler, TripDetails } from "./types";

const PublishStatusToggle = ({
  onChange,
  tripData,
}: {
  onChange: OnChangeHandler;
  tripData: TripDetails;
}) => {
  const statusOptions = [
    { label: "Draft", value: 1 },
    { label: "Active", value: 2 },
    { label: "Completed", value: 3 },
  ];
  return (
    <aside className="content-canvas__card">
      <header className="content-canvas__header">
        <h2 className="content-canvas__title">Status & Visibility</h2>
      </header>
      <div className="content-canvas__body">
        <div className="input__field ">
          <label>Status</label>
          <CustomDropdown
            options={statusOptions}
            value={tripData.status}
            onSelect={(val) => onChange("status", val)}
          />
        </div>
        <div className="content-canvas__toggle-row">
          <Switch
            initialValue={tripData.isFeatured}
            onChange={async (nextState) => {
              onChange("isFeatured", nextState);
              return true;
            }}
          />
          <span className="content-canvas__toggle-label">Featured Trip</span>
        </div>
        <div className="content-canvas__toggle-row">
          <Switch
            initialValue={tripData.isAcceptingBookings}
            onChange={(nextState) => {
              onChange("isAcceptingBookings", nextState);
              return true;
            }}
          />
          <span className="content-canvas__toggle-label">
            Accepting Bookings
          </span>
        </div>
      </div>
    </aside>
  );
};

export default PublishStatusToggle;

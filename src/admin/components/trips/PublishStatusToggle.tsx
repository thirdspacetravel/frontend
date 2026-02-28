import { TripCategory } from "../../../../../backend/src/generated/prisma/enums";
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
  // Category Options
  const categoryOptions = [
    { label: "Winter Expedition", value: TripCategory.WINTER_EXPEDITION },
    { label: "Summer Special", value: TripCategory.SUMMER_SPECIAL },
    { label: "Trekking", value: TripCategory.TREKKING },
    { label: "Biking Trip", value: TripCategory.BIKING_TRIP },
    { label: "Backpacking", value: TripCategory.BACKPACKING },
    { label: "Weekend Getaway", value: TripCategory.WEEKEND_GETAWAY },
  ];

  return (
    <aside className="content-canvas__card">
      <header className="content-canvas__header">
        <h2 className="content-canvas__title">Settings & Trip Feature</h2>
      </header>
      <div className="content-canvas__body">
        <div className="input__field">
          <label htmlFor="trip-feature">Trip Feature</label>
          <CustomDropdown<TripCategory>
            options={categoryOptions} // Update with your actual category options array
            placeholder="Select Category"
            value={tripData.featuredCategories}
            onSelect={(val) => onChange("featuredCategories", val || null)}
            direction="up"
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

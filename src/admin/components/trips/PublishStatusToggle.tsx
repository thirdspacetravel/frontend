import React, { useState } from "react";
import { CustomDropdown } from "../../../components/utils/InputUtils";
import { Switch } from "../../../components/utils/InputUtils";

const PublishStatusToggle: React.FC = () => {
  const [isFeatured, setIsFeatured] = useState(true);
  const [isAcceptingBookings, setIsAcceptingBookings] = useState(false);
  const statusOptions = [
    { label: "Draft", value: 0 },
    { label: "Active", value: 1 },
    { label: "Sold Out", value: 2 },
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
            onSelect={(val) => console.log("Status changed to:", val)}
          />
        </div>
        <div className="content-canvas__toggle-row">
          <Switch
            initialValue={isFeatured}
            onChange={async (nextState) => {
              console.log("Featured toggle:", nextState);
              setIsFeatured(nextState);
              return true;
            }}
          />
          <span className="content-canvas__toggle-label">Featured Trip</span>
        </div>
        <div className="content-canvas__toggle-row">
          <Switch
            initialValue={isAcceptingBookings}
            onChange={(nextState) => {
              console.log("Accepting bookings toggle:", nextState);
              setIsAcceptingBookings(nextState);
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

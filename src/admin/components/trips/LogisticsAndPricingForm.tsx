import React from "react";
import { PrefixInput, TextInput } from "../../../components/utils/InputUtils";

const LogisticsAndPricingForm: React.FC = () => {
  return (
    <div className="content-canvas__card">
      <header className="content-canvas__header">
        <h2 className="content-canvas__title">Logistics & Pricing</h2>
      </header>

      <div className="content-canvas__body">
        <div className="content-canvas__row col-3">
          <TextInput
            label="Duration"
            id="duration"
            placeholder="e.g. 5 Days / 4 Nights"
          />

          <PrefixInput
            label="Base Price"
            id="base-price"
            placeholder="0.00"
            prefix="₹"
          />

          <TextInput
            label="Group Size"
            id="group-size"
            placeholder="Max seats"
          />
        </div>
        <div className="content-canvas__row col-2">
          <TextInput
            label="Pickup Location"
            id="pickup"
            placeholder="e.g. Chandigarh Sector 17"
          />
          <TextInput
            label="Drop-off Location"
            id="drop-off"
            placeholder="e.g. Chandigarh Sector 17"
          />
        </div>
      </div>
    </div>
  );
};

export default LogisticsAndPricingForm;

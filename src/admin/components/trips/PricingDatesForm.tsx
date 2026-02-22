import React from "react";
import { PrefixInput, TextInput } from "../../../components/utils/InputUtils";

const PricingDatesForm: React.FC = () => {
  return (
    <aside className="content-canvas__card">
      <header className="content-canvas__header">
        <h2 className="content-canvas__title">Pricing & Dates</h2>
      </header>

      <div className="content-canvas__body">
        {/* Price Input */}
        <PrefixInput
          label="Price per person"
          id="price"
          prefix="₹"
          type="number"
          defaultValue="18500"
        />

        {/* Compare at Price */}
        <PrefixInput
          label="Compare at Price"
          id="compare-price"
          prefix="₹"
          type="number"
          defaultValue="22000"
        />

        {/* Start Date */}
        <TextInput
          label="Start Date"
          id="start-date"
          type="date"
          defaultValue="2024-02-15"
        />

        {/* End Date */}
        <TextInput
          label="End Date"
          id="end-date"
          type="date"
          defaultValue="2024-02-21"
        />
      </div>
    </aside>
  );
};

export default PricingDatesForm;

import React from "react";
import { CustomDropdown } from "../../../components/utils/InputUtils";
const OrganizationDetailsCard: React.FC = () => {
  // Category Options
  const categoryOptions = [
    { label: "Winter Expedition", value: 1 },
    { label: "Trekking", value: 2 },
    { label: "Biking Trip", value: 3 },
    { label: "Backpacking", value: 4 },
    { label: "Weekend Getaway", value: 5 },
  ];

  // Trip Leader Options
  const leaderOptions = [
    { label: "Amit Thakur", value: 101 },
    { label: "Priya Sharma", value: 102 },
    { label: "Vikram Singh", value: 103 },
  ];
  return (
    <aside className="content-canvas__card">
      <header className="content-canvas__header">
        <h2 className="content-canvas__title">Organization</h2>
      </header>

      <div className="content-canvas__body">
        {/* Category Dropdown */}
        <div className="input__field">
          <label htmlFor="trip-category">Category</label>
          <CustomDropdown
            options={categoryOptions} // Update with your actual category options array
            placeholder="Select Category"
            onSelect={(val) => console.log("Category selected:", val)}
            direction="up" // Example of using the new direction prop to make the dropdown open upwards
          />
        </div>
        <div className="input__field">
          <label htmlFor="trip-leader">Trip Leader</label>
          <CustomDropdown
            options={leaderOptions} // Update with your actual leaders options array
            placeholder="Assign a Leader"
            onSelect={(val) => console.log("Leader assigned:", val)}
            direction="up" // Example of using the new direction prop to make the dropdown open upwards
          />
        </div>
      </div>
    </aside>
  );
};

export default OrganizationDetailsCard;

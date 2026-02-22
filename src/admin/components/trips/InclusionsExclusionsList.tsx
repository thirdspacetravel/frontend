import React from "react";
import { TextArea } from "../../../components/utils/InputUtils";

const InclusionsExclusionsList: React.FC = () => {
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
          defaultValue={`Tempo Traveler Transport\nBreakfast & Dinner\nOxygen Cylinders\nTrip Coordinator`}
          rows={5}
        />

        <TextArea
          label="Exclusions (One per line)"
          id="exclusions"
          placeholder="e.g. Lunch on all days"
          defaultValue={`Lunch on all days\nPersonal expenses\nEntry tickets`}
          rows={4}
        />
      </div>
    </div>
  );
};

export default InclusionsExclusionsList;

import { useState } from "react";
import { TextInput } from "../../../components/utils/InputUtils";
import type { OnChangeHandler, TripDetails } from "./types";

const PricingDatesForm = ({
  tripData,
  onChange,
}: {
  tripData: TripDetails;
  onChange: OnChangeHandler;
}) => {
  const [dateTimes, setDateTimes] = useState({
    startDate: tripData.startDateTime
      ? new Date(tripData.startDateTime).toISOString().split("T")[0]
      : "",
    startTime: tripData.startDateTime
      ? new Date(tripData.startDateTime).toTimeString().slice(0, 5)
      : "",
    endDate: tripData.endDateTime
      ? new Date(tripData.endDateTime).toISOString().split("T")[0]
      : "",
    endTime: tripData.endDateTime
      ? new Date(tripData.endDateTime).toTimeString().slice(0, 5)
      : "",
  });

  const updateDateTime = (
    type: "start" | "end",
    newDate: string,
    newTime: string,
  ) => {
    // Update local state
    const updated = {
      ...dateTimes,
      [`${type}Date`]: newDate,
      [`${type}Time`]: newTime,
    };
    setDateTimes(updated);

    if (updated[`${type}Date`] && updated[`${type}Time`]) {
      const combined = new Date(
        `${updated[`${type}Date`]}T${updated[`${type}Time`]}:00`,
      );
      onChange(`${type}DateTime`, combined);
    }
  };

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
          value={dateTimes.startDate}
          onChange={(e) =>
            updateDateTime("start", e.target.value, dateTimes.startTime)
          }
        />
        <TextInput
          label="Start Time"
          id="start-time"
          type="time"
          value={dateTimes.startTime}
          onChange={(e) =>
            updateDateTime("start", dateTimes.startDate, e.target.value)
          }
        />
        <TextInput
          label="End Date"
          id="end-date"
          type="date"
          value={dateTimes.endDate}
          onChange={(e) =>
            updateDateTime("end", e.target.value, dateTimes.endTime)
          }
        />
        <TextInput
          label="End Time"
          id="end-time"
          type="time"
          value={dateTimes.endTime}
          onChange={(e) =>
            updateDateTime("end", dateTimes.endDate, e.target.value)
          }
        />
      </div>
    </aside>
  );
};

export default PricingDatesForm;

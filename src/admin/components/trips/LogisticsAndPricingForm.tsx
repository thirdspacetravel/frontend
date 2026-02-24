import {
  NumberInput,
  PrefixInput,
  TextInput,
} from "../../../components/utils/InputUtils";
import type { OnChangeHandler, TripDetails } from "./types";
const LogisticsAndPricingForm = ({
  onChange,
  tripData,
}: {
  onChange: OnChangeHandler;
  tripData: TripDetails;
}) => {
  return (
    <div className="content-canvas__card">
      <header className="content-canvas__header">
        <h2 className="content-canvas__title">Logistics & Pricing</h2>
      </header>

      <div className="content-canvas__body">
        <div className="content-canvas__row col-3">
          <NumberInput
            minValue={1}
            label="Days"
            id="days"
            placeholder="e.g 3 Days"
            value={tripData.days === null ? "" : tripData.days}
            onChange={(e) =>
              onChange(
                "days",
                e.target.value === "" ? null : parseInt(e.target.value, 10),
              )
            }
          />
          <NumberInput
            minValue={1}
            label="Nights"
            id="nights"
            placeholder="e.g 2 Nights"
            value={tripData.nights === null ? "" : tripData.nights}
            onChange={(e) =>
              onChange(
                "nights",
                e.target.value === "" ? null : parseInt(e.target.value, 10),
              )
            }
          />
          <NumberInput
            label="Total Seats"
            id="total-seats"
            placeholder="e.g. 10 Seats"
            minValue={1}
            value={tripData.totalSeats === null ? "" : tripData.totalSeats}
            onChange={(e) =>
              onChange(
                "totalSeats",
                e.target.value === "" ? null : parseInt(e.target.value, 10),
              )
            }
          />
        </div>
        <div className="content-canvas__row col-2">
          <TextInput
            label="Pickup Location"
            id="pickup"
            placeholder="e.g. Chandigarh Sector 17"
            value={tripData.pickupLocation}
            onChange={(e) => onChange("pickupLocation", e.target.value)}
          />
          <TextInput
            label="Drop-off Location"
            id="drop-off"
            placeholder="e.g. Chandigarh Sector 17"
            value={tripData.dropOffLocation}
            onChange={(e) => onChange("dropOffLocation", e.target.value)}
          />
        </div>
        <div className="content-canvas__row col-3">
          <PrefixInput
            label="Quad Sharing Price"
            id="quad-sharing-price"
            prefix="₹"
            type="number"
            defaultValue={
              tripData.prices.quad === null ? "" : tripData.prices.quad
            }
            onChange={(e) =>
              onChange("prices", {
                ...tripData.prices,
                quad:
                  e.target.value === "" ? null : parseInt(e.target.value, 10),
              })
            }
          />
          <PrefixInput
            label="Triple Sharing Price"
            id="triple-sharing-price"
            prefix="₹"
            type="number"
            defaultValue={
              tripData.prices.triple === null ? "" : tripData.prices.triple
            }
            onChange={(e) =>
              onChange("prices", {
                ...tripData.prices,
                triple:
                  e.target.value === "" ? null : parseInt(e.target.value, 10),
              })
            }
          />
          <PrefixInput
            label="Double Sharing Price"
            id="double-sharing-price"
            prefix="₹"
            type="number"
            defaultValue={
              tripData.prices.double === null ? "" : tripData.prices.double
            }
            onChange={(e) =>
              onChange("prices", {
                ...tripData.prices,
                double:
                  e.target.value === "" ? null : parseInt(e.target.value, 10),
              })
            }
          />
        </div>
      </div>
    </div>
  );
};

export default LogisticsAndPricingForm;

import type { TripDetails } from "./types";
interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

/**
 * Validates trip data to ensure it is ready for publication.
 */
export const validateTripForPublishing = (
  trip: TripDetails,
): ValidationResult => {
  const errors: string[] = [];

  // 1. Check required strings for empty values
  const requiredStrings: (keyof TripDetails)[] = [
    "tripName",
    "destination",
    "fullOverview",
    "pickupLocation",
    "dropOffLocation",
    "tripType",
    "featuredCategories",
  ];

  requiredStrings.forEach((field) => {
    const value = trip[field];
    if (value === null || value === undefined || value === "") {
      errors.push(`${field} is missing or empty.`);
    }
  });

  // 2. Check required numbers
  const requiredNumbers: (keyof TripDetails)[] = [
    "days",
    "nights",
    "totalSeats",
  ];

  requiredNumbers.forEach((field) => {
    if (trip[field] === null || trip[field] === undefined) {
      errors.push(`${field} must be provided.`);
    }
  });

  // 3. Check for mandatory lists/arrays
  if (!trip.itinerary || trip.itinerary.length === 0) {
    errors.push("Itinerary must contain at least one stop.");
  }

  if (!trip.images || trip.images.length === 0) {
    errors.push("At least one image is required.");
  }

  // 4. Validate Dates
  if (!trip.startDateTime || !trip.endDateTime) {
    errors.push("Start and End dates must be set.");
  } else if (new Date(trip.startDateTime) >= new Date(trip.endDateTime)) {
    errors.push("End date must be after the start date.");
  }

  // --- UPDATED VALIDATION: Check that at least one price is not null ---
  if (
    trip.priceQuad === null &&
    trip.priceTriple === null &&
    trip.priceDouble === null
  ) {
    errors.push(
      "At least one pricing option (Quad, Triple, or Double) must be provided.",
    );
  }
  // ---------------------------------------------------------------------

  return {
    isValid: errors.length === 0,
    errors,
  };
};

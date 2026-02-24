import type { TripDetails, DayData } from "./types"; // Adjust path as needed
import type { Trip } from "../../../../../backend/src/generated/prisma/client";

export const serializeTrip = (data: TripDetails) => {
  const combineDateTime = (date: string | null, time: string | null) => {
    if (!date || !time) return null;
    return new Date(`${date}T${time}:00`);
  };

  return {
    tripName: data.tripName,
    destination: data.destination,
    tripType: data.tripType,
    fullOverview: data.fullOverview,
    days: data.days,
    nights: data.nights,
    totalSeats: data.totalSeats,
    pickupLocation: data.pickupLocation,
    dropOffLocation: data.dropOffLocation,
    inclusions: data.inclusions,
    exclusions: data.exclusions,
    itinerary: data.itinerary,
    status: data.status,
    isFeatured: data.isFeatured,
    isAcceptingBookings: data.isAcceptingBookings,
    categories: data.categories,
    priceQuad: data.prices.quad,
    priceTriple: data.prices.triple,
    priceDouble: data.prices.double,
    startDateTime: combineDateTime(data.startDate, data.startTime),
    endDateTime: combineDateTime(data.endDate, data.endTime),
    images: data.images,
  };
};
type SerializedTrip = Omit<
  Trip,
  "createdAt" | "updatedAt" | "startDateTime" | "endDateTime"
> & {
  createdAt: string | Date;
  updatedAt: string | Date;
  startDateTime: string | Date | null;
  endDateTime: string | Date | null;
};

export const deserializeTrip = (dbData: SerializedTrip): TripDetails => {
  const splitDateTime = (dt: Date | string | null) => {
    if (!dt) return { date: null, time: null };

    // Ensure we are working with a Date object
    const dateObj = typeof dt === "string" ? new Date(dt) : dt;

    // Check for invalid dates
    if (isNaN(dateObj.getTime())) return { date: null, time: null };

    const isoString = dateObj.toISOString();
    return {
      date: isoString.split("T")[0],
      time: isoString.split("T")[1].substring(0, 5), // "HH:mm"
    };
  };

  const start = splitDateTime(dbData.startDateTime);
  const end = splitDateTime(dbData.endDateTime);

  return {
    tripName: dbData.tripName,
    destination: dbData.destination,
    tripType: dbData.tripType,
    fullOverview: dbData.fullOverview,
    days: dbData.days,
    nights: dbData.nights,
    totalSeats: dbData.totalSeats,
    pickupLocation: dbData.pickupLocation,
    dropOffLocation: dbData.dropOffLocation,
    inclusions: dbData.inclusions,
    exclusions: dbData.exclusions,
    // Cast these since Prisma returns them as JsonValue but you know they are specific types
    itinerary: dbData.itinerary as unknown as DayData[],
    status: dbData.status,
    isFeatured: dbData.isFeatured,
    isAcceptingBookings: dbData.isAcceptingBookings,
    categories: dbData.categories as string[],
    images: dbData.images as string[],
    prices: {
      quad: dbData.priceQuad,
      triple: dbData.priceTriple,
      double: dbData.priceDouble,
    },
    startDate: start.date || "",
    startTime: start.time || "",
    endDate: end.date || "",
    endTime: end.time || "",
  };
};

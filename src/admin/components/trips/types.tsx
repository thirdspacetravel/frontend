import type { Trip } from "../../../../../backend/src/generated/prisma/client";
export interface DayData {
  title: string;
  subtitle: string;
}

export interface TripDetails extends Omit<
  Trip,
  | "createdAt"
  | "updatedAt"
  | "passwordHash"
  | "itinerary"
  | "categories"
  | "images"
> {
  itinerary: DayData[];
  categories: string[];
  images: string[];
  userBooking?: {
    id: string;
    roomtype: string;
    adults: number;
    resultStatus:
      | "TXN_SUCCESS"
      | "TXN_PENDING"
      | "TXN_FAILURE"
      | "TXN_CANCELLED";
    txnId?: string | null;
  } | null;
}
export interface OnChangeHandler {
  <K extends keyof TripDetails>(label: K, value: TripDetails[K]): void;
}

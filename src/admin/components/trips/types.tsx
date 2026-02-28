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
}
export interface OnChangeHandler {
  <K extends keyof TripDetails>(label: K, value: TripDetails[K]): void;
}

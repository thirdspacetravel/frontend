export interface DayData {
  title: string;
  subtitle: string;
}

export interface TripDetails {
  tripName: string;
  destination: string;
  tripType: number | null;
  fullOverview: string;
  days: number | null;
  nights: number | null;
  totalSeats: number | null;
  pickupLocation: string;
  dropOffLocation: string;
  inclusions: string;
  exclusions: string;
  itinerary: DayData[];
  status: number;
  isFeatured: boolean;
  isAcceptingBookings: boolean;
  categories: string[];
  prices: {
    quad: number | null;
    triple: number | null;
    double: number | null;
  };
  startDate: string; // Format: "YYYY-MM-DD"
  startTime: string; // Format: "HH:MM"
  endDate: string; // Format: "YYYY-MM-DD"
  endTime: string; // Format: "HH:MM"
  images: string[];
}

export interface OnChangeHandler {
  (
    label: keyof TripDetails,
    value:
      | string
      | number
      | null
      | DayData[]
      | boolean
      | string[]
      | TripDetails["prices"],
  ): void;
}

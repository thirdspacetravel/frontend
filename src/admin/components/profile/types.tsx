export type AdminRole = "TRIP_MANAGER" | "SUPER_ADMIN";

export interface AdminUser {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  avatarUrl?: string | null;
  newBookingAlerts: boolean;
  paymentConfirmations: boolean;
  weeklyDigest: boolean;
  role: AdminRole;
}

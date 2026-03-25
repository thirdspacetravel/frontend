import { createContext, useContext } from "react";

export type ToastType = "info" | "success" | "warning" | "error";

export interface ToastItem {
  id: string;
  type: ToastType;
  message: React.ReactNode;
}

// We can simplify or remove ConfirmConfig if it's only used internally,
// but here is how it looks for the async approach:
export interface ConfirmConfig {
  message: React.ReactNode;
  type: ToastType;
}

interface NotificationContextType {
  notify: (message: React.ReactNode, type?: ToastType) => void;
  /**
   * Opens a confirmation dialog.
   * @returns A promise that resolves to true if confirmed, false if cancelled.
   */
  confirm: (message: React.ReactNode, type?: ToastType) => Promise<boolean>;
}

export const NotificationContext = createContext<
  NotificationContextType | undefined
>(undefined);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider",
    );
  }
  return context;
};

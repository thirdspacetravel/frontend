import { createContext, useContext } from "react";

export type ToastType = "info" | "success" | "warning" | "error";

export interface ToastItem {
  id: string;
  type: ToastType;
  message: React.ReactNode;
}

export interface ConfirmConfig {
  message: React.ReactNode;
  type: ToastType;
  onConfirm: () => void;
}

interface NotificationContextType {
  notify: (message: React.ReactNode, type?: ToastType) => void;
  confirm: (
    message: React.ReactNode,
    onConfirm: () => void,
    type?: ToastType,
  ) => void;
}

export const NotificationContext = createContext<
  NotificationContextType | undefined
>(undefined);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context)
    throw new Error("useNotification must be used within NotificationProvider");
  return context;
};

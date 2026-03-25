import React, { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  NotificationContext,
  type ToastItem,
  type ToastType,
} from "../../hooks/useNotification";
import Toast from "./Toast";

// Update this interface to reflect the new async structure
interface ConfirmData {
  message: React.ReactNode;
  type: ToastType;
  resolve: (value: boolean) => void;
}

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [confirmData, setConfirmData] = useState<ConfirmData | null>(null);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const notify = (message: React.ReactNode, type: ToastType = "info") => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  // Refactored to return a Promise
  const confirm = (
    message: React.ReactNode,
    type: ToastType = "warning",
  ): Promise<boolean> => {
    return new Promise((resolve) => {
      setConfirmData({
        message,
        type,
        resolve, // Store the resolve function to be called later
      });
    });
  };

  // Helper to handle the user's choice and clear state
  const handleConfirmAction = (choice: boolean) => {
    if (confirmData) {
      confirmData.resolve(choice);
      setConfirmData(null);
    }
  };

  return (
    <NotificationContext.Provider value={{ notify, confirm }}>
      {children}

      <div className="notification-area">
        <AnimatePresence mode="popLayout">
          {toasts.map((t) => (
            <Toast
              key={t.id}
              type={t.type}
              message={t.message}
              onClose={() => removeToast(t.id)}
            />
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {confirmData && (
          <div className="confirm-overlay">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <Toast
                type={confirmData.type}
                message={confirmData.message}
                showActions
                onConfirm={() => handleConfirmAction(true)}
                onCancel={() => handleConfirmAction(false)}
                onClose={() => handleConfirmAction(false)}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </NotificationContext.Provider>
  );
};

import React, { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  NotificationContext,
  type ToastItem,
  type ConfirmConfig,
  type ToastType,
} from "../../hooks/useNotification";
import Toast from "./Toast";

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [confirmData, setConfirmData] = useState<ConfirmConfig | null>(null);

  // Helper function to remove a specific toast by ID
  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const notify = (message: React.ReactNode, type: ToastType = "info") => {
    const id = Math.random().toString(36).substr(2, 9);

    setToasts((prev) => [...prev, { id, message, type }]);

    // Auto-remove after 4 seconds
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const confirm = (
    message: React.ReactNode,
    onConfirm: () => void,
    type: ToastType = "warning",
  ) => {
    setConfirmData({ message, onConfirm, type });
  };

  return (
    <NotificationContext.Provider value={{ notify, confirm }}>
      {children}

      {/* Stacked Toasts Container */}
      <div className="notification-area">
        <AnimatePresence mode="popLayout">
          {toasts.map((t) => (
            <Toast
              key={t.id}
              type={t.type}
              message={t.message}
              onClose={() => removeToast(t.id)} // Pass the manual close handler here
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Confirmation Overlay */}
      <AnimatePresence>
        {confirmData && (
          <div className="confirm-overlay">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              <Toast
                type={confirmData.type}
                message={confirmData.message}
                showActions
                onConfirm={() => {
                  confirmData.onConfirm();
                  setConfirmData(null);
                }}
                onCancel={() => setConfirmData(null)}
                // onClose is usually not needed for modals, but you can add it if required
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </NotificationContext.Provider>
  );
};

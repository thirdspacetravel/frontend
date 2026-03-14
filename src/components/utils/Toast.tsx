import React from "react";
import { motion } from "framer-motion";
import type { ToastType } from "../../hooks/useNotification";
import CloseIcon from "../../icons/CloseIcon";

interface ToastProps {
  type: ToastType;
  message: React.ReactNode;
  onConfirm?: () => void;
  onCancel?: () => void;
  showActions?: boolean;
  onClose?: () => void;
}

const Toast: React.FC<ToastProps> = ({
  type,
  message,
  onConfirm,
  onCancel,
  showActions,
  onClose,
}) => {
  return (
    <motion.div
      layout // This handles the smooth sliding when others are removed
      initial={{ opacity: 0, x: 50, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
      className={`toast toast--${type}`}
    >
      <div className="toast__icon-container" onClick={onClose}>
        <CloseIcon />
      </div>
      <div className="toast__content">
        <div className="toast__message">{message}</div>
        {showActions && (
          <div className="toast__actions">
            <button
              className="toast__btn toast__btn--confirm"
              onClick={onConfirm}
            >
              Confirm
            </button>
            <button
              className="toast__btn toast__btn--cancel"
              onClick={onCancel}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Toast;

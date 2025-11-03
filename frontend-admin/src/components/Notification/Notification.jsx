// components/Notification/Notification.jsx
import { useEffect } from "react";
import styles from "./Notification.module.css";

export default function Notification({ message, type = "info", onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`${styles["notification"]} ${styles[`notification-${type}`]}`}
    >
      <div className={styles["notification-content"]}>
        <span className={styles["notification-message"]}>{message}</span>
        <button className={styles["notification-close"]} onClick={onClose}>
          ×
        </button>
      </div>
    </div>
  );
}

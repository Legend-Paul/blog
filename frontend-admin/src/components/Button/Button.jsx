import styles from "./Button.module.css";

export default function Button({
  key,
  label,
  handleClick,
  variant,
  isLoading,
  action,
}) {
  return (
    <button
      key={key}
      className={`${styles["action-btn"]} ${styles[`action-${variant}`]}`}
      onClick={handleClick}
      disabled={isLoading === action}
    >
      {isLoading === action ? (
        <div className={styles["btn-spinner"]}></div>
      ) : (
        label
      )}
    </button>
  );
}

import styles from "./Button.module.css";

export default function Button({
  key,
  label,
  onClick,
  variant,
  disabled = false,
  type = "button",
}) {
  return (
    <button
      key={key}
      type={type}
      className={`${styles["action-btn"]} ${styles[`action-${variant}`]}`}
      onClick={onClick}
      disabled={disabled}
    >
      {disabled ? <div className={styles["btn-spinner"]}></div> : label}
    </button>
  );
}

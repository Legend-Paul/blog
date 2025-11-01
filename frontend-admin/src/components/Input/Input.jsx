// components/Input/Input.jsx
import styles from "./Input.module.css";

export default function Input({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  disabled = false,
  required = true,
  className = "",
}) {
  return (
    <div className={styles["container"]}>
      {label && (
        <label className={styles["label"]}>
          {label}
          {required && <span className={styles["required"]}>*</span>}
        </label>
      )}

      <input
        type={type}
        className={`${styles["input"]} ${
          error ? styles["error"] : ""
        } ${className}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
      />

      {error && <div className={styles.errorText}>{error}</div>}
    </div>
  );
}

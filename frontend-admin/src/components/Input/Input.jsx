// components/Input/Input.jsx
import styles from "./Input.module.css";

export default function Input({
  label,
  type = "text",
  name,
  placeholder,
  value,
  onChange,
  error,
  id,
  disabled = false,
  required = true,
  className = "",
}) {
  return (
    <div className={styles["container"]}>
      {label && (
        <label className={styles["label"]} htmlFor={id}>
          {label}
          {required && <span className={styles["required"]}>*</span>}
        </label>
      )}

      <input
        type={type}
        id={id}
        name={name}
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

export function Textarea({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  id,
  disabled = false,
  required = true,
  className = "",
  name,
}) {
  return (
    <div className={styles["container"]}>
      {label && (
        <label className={styles["label"]} htmlFor={id}>
          {label}
          {required && <span className={styles["required"]}>*</span>}
        </label>
      )}
      <textarea
        type={type}
        id={id}
        name={name}
        className={`${styles["input"]} ${
          error ? styles["error"] : ""
        } ${className}`}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
        required={required}
      >
        {value}
      </textarea>
    </div>
  );
}

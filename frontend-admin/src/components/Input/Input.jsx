// components/Input/Input.jsx
import styles from "./Input.module.css";

export default function Input({
  label,
  type = "text",
  name,
  placeholder,
  error,
  id,
  maxLength,
  disabled = false,
  required = true,
  className = "",
  inputRef,
  title,
  pattern,
  minLength = 2,
}) {
  return (
    <div className={styles["container"]}>
      {label && (
        <label className={styles["label"]} htmlFor={id}>
          <h4>{label}</h4>
          {required && <span className={styles["required"]}>*</span>}
        </label>
      )}

      <input
        type={type}
        pattern={pattern}
        maxLength={maxLength}
        minLength={minLength}
        id={id}
        name={name}
        className={`${styles["input"]} ${
          error ? styles["error"] : ""
        } ${className}`}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        ref={inputRef}
        title={title}
      />

      {error && <div className={styles.errorText}>{error}</div>}
    </div>
  );
}

export function Textarea({
  label,
  type = "text",
  placeholder,
  error,
  id,
  maxLength,
  disabled = false,
  required = true,
  className = "",
  name,
  textareaRef,
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
        ref={textareaRef}
        type={type}
        id={id}
        maxLength={maxLength}
        minLength={2}
        name={name}
        className={`${styles["textarea"]} ${
          error ? styles["error"] : ""
        } ${className}`}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
      ></textarea>
    </div>
  );
}

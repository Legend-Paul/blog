import styles from "./Spinnner.module.css";

export default function Spinnner() {
  return (
    <div className={styles["spinner-container"]}>
      <div className={styles["spinner"]}></div>
      <p className={styles["loading-text"]}>Please Wait...</p>
    </div>
  );
}

import { useState } from "react";
import styles from "./CopyButton.module.css";

export default function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={styles["copy-button-container"]}>
      {copied ? (
        <p className={styles["copied"]}>Copied!</p>
      ) : (
        <div className={styles["copy-button"]}>
          <svg
            class="nav-icon"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            onClick={handleCopy}
          >
            <path
              strokeWinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
          <p className={styles["copy-link-label"]}>Copy Link</p>
        </div>
      )}
    </div>
  );
}

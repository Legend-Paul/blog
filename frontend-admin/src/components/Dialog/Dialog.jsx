// components/Dialog/Dialog.jsx
import { useState } from "react";
import Input, { Textarea } from "../Input/Input";
import Button from "../Button/Button";
import styles from "./Dialog.module.css";
import { Form } from "react-router-dom";

export default function Dialog({ isOpen, onClose }) {
  return (
    <div
      className={`${styles["overlay"]} ${
        isOpen ? styles["overlay-visible"] : styles["overlay-hidden"]
      }`}
      onClick={onClose}
    >
      <div
        className={`${styles["dialog"]} `}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles["header"]}>
          <h2 className={styles["title"]}>Create New Blog</h2>
          <button className={styles["close-button"]} onClick={onClose}>
            ×
          </button>
        </div>
        <p className={styles["form-instruction"]}>
          Fill all the fields with <span>*</span>
        </p>
        <Form method="post">
          <div className={styles["form-content"]}>
            <Input
              label="Slug"
              name={"slug"}
              maxLength={"40"}
              id={"slug"}
              placeholder="Enter blog slug"
              required
            />

            <Textarea
              label={"Title"}
              name={"title"}
              id={"title"}
              maxLength={"60"}
              placeholder={"Blog title"}
              required={true}
            />

            <Textarea
              label={"Description"}
              name={"description"}
              id={"description"}
              maxLength={"255"}
              placeholder={"Blog description"}
              required={true}
            />

            <div className={styles["select-group"]}>
              <label className={styles["label"]} htmlFor="select">
                Status <span style={{ color: "var(--error-color)" }}>*</span>
              </label>
              <select
                id="select"
                className={styles["select"]}
                defaultValue={"DRAFT"}
                name="status"
              >
                <option value="PENDING">Pending</option>
                <option value="DRAFT">Draft</option>
                <option value="PUBLISHED">Published</option>
                <option value="ARCHIVED">Archived</option>
              </select>
            </div>
          </div>

          <div className={styles["footer"]}>
            <Button
              type="button"
              variant={"danger"}
              onClick={onClose}
              label={"Cancel"}
            />

            <Button
              label={"Save Blog"}
              type="submit"
              variant={"primary"}
              className={styles["submit-button"]}
            />
          </div>
        </Form>
      </div>
    </div>
  );
}

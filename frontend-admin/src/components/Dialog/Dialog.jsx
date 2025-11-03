import { useEffect, useRef, useState } from "react";
import Input, { Textarea } from "../Input/Input";
import Button from "../Button/Button";
import styles from "./Dialog.module.css";
import { Form } from "react-router-dom";

export default function Dialog({
  isOpen,
  onClose,
  state,
  content,
  dialogFieldsValue,
}) {
  const slugRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const statusRef = useRef(null);
  useEffect(() => {
    if (dialogFieldsValue && slugRef.current) {
      slugRef.current.value = dialogFieldsValue.slug || "";
      slugRef.current.focus();
      slugRef.current.select();

      if (titleRef.current)
        titleRef.current.value = dialogFieldsValue.title || "";
      if (descriptionRef.current)
        descriptionRef.current.value = dialogFieldsValue.description || "";
      if (statusRef.current)
        statusRef.current.value = dialogFieldsValue.status || "";
    }
  }, [dialogFieldsValue]);
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
        <Form method="post" replace>
          <div className={styles["form-content"]}>
            <input readOnly type="hidden" value={content} name="content" />
            <Input
              label="Slug"
              name={"slug"}
              maxLength={"40"}
              id={"slug"}
              placeholder="Enter blog slug"
              required
              inputRef={slugRef}
            />

            <Textarea
              label={"Title"}
              name={"title"}
              id={"title"}
              maxLength={"60"}
              placeholder={"Blog title"}
              required={true}
              textareaRef={titleRef}
            />

            <Textarea
              label={"Description"}
              name={"description"}
              id={"description"}
              maxLength={"255"}
              placeholder={"Blog description"}
              required={true}
              textareaRef={descriptionRef}
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
                statusRef={statusRef}
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
              disabled={state == "submitting"}
            />

            <Button
              label={dialogFieldsValue ? "Update" : "Save"}
              type="submit"
              variant={"primary"}
              disabled={state == "submitting"}
              className={styles["submit-button"]}
            />
          </div>
        </Form>
      </div>
    </div>
  );
}

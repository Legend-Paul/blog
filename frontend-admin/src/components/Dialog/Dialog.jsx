// components/Dialog/Dialog.jsx
import { useState } from "react";
import Input from "../Input/Input";
import Button from "../Button/Button";
import styles from "./Dialog.module.css";

export default function Dialog({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "PUBLISHED",
    category: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
    // Reset form
    setFormData({
      title: "",
      description: "",
      status: "DRAFT",
      category: "",
    });
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  if (!isOpen) return null;

  return (
    <div className={styles["overlay"]} onClick={onClose}>
      <div className={styles["dialog"]} onClick={(e) => e.stopPropagation()}>
        <div className={styles["header"]}>
          <h2 className={styles["title"]}>Create New Blog</h2>
          <button className={styles["close-button"]} onClick={onClose}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles["form"]}>
          <div className={styles["form-content"]}>
            <Input
              label="Title"
              id={"title"}
              placeholder="Enter blog title"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              required
            />

            <Input
              label="Slug"
              id={"slug"}
              placeholder="Enter blog slug"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              required
            />

            <Input
              id={"description"}
              label="Description"
              placeholder="Enter blog description"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />

            <div className={styles["select-group"]}>
              <label className={styles["label"]} htmlFor="select">
                Status <span style={{ color: "var(--error-color)" }}>*</span>
              </label>
              <select
                id="select"
                className={styles["select"]}
                value={formData.status}
                onChange={(e) => handleChange("status", e.target.value)}
              >
                <option value="DRAFT">Draft</option>
                <option value="PENDING">Pending</option>
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
              label={"Create Blog"}
              type="submit"
              variant={"primary"}
              className={styles["submit-button"]}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

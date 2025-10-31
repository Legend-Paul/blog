import { useNavigate } from "react-router-dom";
import styles from "./CreateBlog.module.css";

export default function () {
  const navigate = useNavigate();
  return (
    <button
      className={styles["create-btn"]}
      onClick={() => navigate("/api/blogs/new")}
    >
      <svg
        class="nav-icon"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
        />
      </svg>
      <p>Create New Blog</p>
    </button>
  );
}

import { useEffect, useState } from "react";
import styles from "./Dashboard.module.css";

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/blogs", {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImU5NDExOTU0LTU3MjAtNDQwOC1iM2I3LTRjZTg2YjU1M2RhYSIsImZ1bGxOYW1lIjoiUGF1bCBNYWluYSIsInVzZXJuYW1lIjoibGVnZW5kIiwicm9sZSI6IkFVVEhPUiIsImNyZWF0ZWRBdCI6IjIwMjUtMTAtMjlUMTc6NDk6MDYuNjU4WiIsInVwZGF0ZWRBdCI6IjIwMjUtMTAtMjlUMTc6NDk6MDYuNjU4WiIsImlhdCI6MTc2MTc2MTY5NCwiZXhwIjoxNzY0MzUzNjk0fQ.KFXzG0_HJYNgWfNfQ4M4kIdV-bdK6Mh4T4GEZvJBxs8`,
      },
    })
      .then((response) => response.json())
      .then((res) => setData(res.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Show loading while data is not yet available
  if (!data) {
    return (
      <div className={styles["dashboard-container"]}>
        <div className={styles["dashboard"]}>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  const published = (data.blogs || []).filter((b) => b.status === "PUBLISHED");
  const draft = (data.blogs || []).filter((b) => b.status === "DRAFT").length;
  const pending = (data.blogs || []).filter(
    (b) => b.status === "PENDING"
  ).length;
  const archived = (data.blogs || []).filter(
    (b) => b.status === "ARCHIVED"
  ).length;

  return (
    <div className={styles["dashboard-container"]}>
      <div className={styles["dashboard"]}>
        <div className={styles["user-table"]}>
          <table>
            <caption>Author Information</caption>
            <tbody>
              <tr>
                <td>Fullname</td>
                <td>{data.user.fullName}</td>
              </tr>
              <tr>
                <td>Username</td>
                <td>{data.user.username}</td>
              </tr>
              <tr>
                <td>Role</td>
                <td>{data.user.role}</td>
              </tr>
              <tr>
                <td>Created At</td>
                <td>{data.user.createdAt}</td>
              </tr>
              <tr>
                <td>Updated At</td>
                <td>{data.user.updatedAt}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={styles["published-blogs-container"]}>
          <h3>Published blogs</h3>
          <div className={styles["published-blogs"]}>
            {published.map((blog) => {
              return (
                <div
                  className={styles["blog"]}
                  key={blog.id || blog._id || blog.slug}
                >
                  <a href={blog.slug}>{blog.title}</a>
                </div>
              );
            })}
          </div>
        </div>
        <div className={styles["blog-summary-container"]}>
          <h3>Blogs Summary</h3>
          <div className={styles["blogs-summary"]}>
            <div className={styles["blog-status"]}>
              <h4 className={styles["status-name"]}>PUBLISHED</h4>
              <p className={styles["status"]}>{published.length}</p>
            </div>
            <div className={styles["blog-status"]}>
              <h4 className={styles["status-name"]}>DRAFT</h4>
              <p className={styles["status"]}>{draft}</p>
            </div>
            <div className={styles["blog-status"]}>
              <h4 className={styles["status-name"]}>PENDING</h4>
              <p className={styles["status"]}>{pending}</p>
            </div>
            <div className={styles["blog-status"]}>
              <h4 className={styles["status-name"]}>ARCHIVED</h4>
              <p className={styles["status"]}>{archived}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

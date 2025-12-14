import { useEffect, useState } from "react";
import styles from "./Dashboard.module.css";
import Header from "../../components/Header/Header";
import Spinnner from "../../components/Spinnner/Spinnner";
import CreateBlog from "../../components/CreateBlog/CreateBlog";
import checkAuth from "../../utils/checkAuth";
import { useLocation } from "react-router-dom";
import CopyButton from "../../components/CopyButton/CopyButton";

const API_BASE_URL = "https://blog-backend-tf6n.onrender.com";

export default function Dashboard() {
  checkAuth();

  const [data, setData] = useState(null);
  const location = useLocation();
  const blogsSearchParams = location.state?.searchParams || "";
  const token = localStorage.getItem("Authorization");

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/blogs`, {
      headers: {
        Authorization: token,
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
        <Header searchParams={blogsSearchParams} />
        <Spinnner />
      </div>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

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
      <Header />
      <CreateBlog />
      <section className={styles["dashboard"]}>
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
                <td>Created At</td>
                <td>{formatDate(data.user.createdAt)}</td>
              </tr>
              <tr>
                <td>Updated At</td>
                <td>{formatDate(data.user.updatedAt)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className={styles["published-blogs-container"]}>
          <h3>Published blogs</h3>
          <div className={styles["published-blogs"]}>
            {published.length < 1 && (
              <div
                className={`${styles["no-published-blog"]} ${styles["blog"]}`}
              >
                <p>You don't have published blog yet</p>
              </div>
            )}
            {published.map((blog) => {
              return (
                <div
                  className={styles["blog"]}
                  key={blog.id || blog._id || blog.slug}
                >
                  <a
                    href={
                      `https://legendblog.onrender.com/${data.user.username}/blogs/` +
                      blog.slug
                    }
                    target="_blank"
                  >
                    {blog.title}
                  </a>
                  <CopyButton
                    text={
                      `https://legendblog.onrender.com/${data.user.username}/blogs/` +
                      blog.slug
                    }
                  />
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
      </section>
    </div>
  );
}

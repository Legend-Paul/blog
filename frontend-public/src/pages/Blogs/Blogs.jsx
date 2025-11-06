import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Header from "../../components/Header/Header";
import Spinnner from "../../components/Spinnner/Spinnner";
import styles from "./Blogs.module.css";

export default function Blogs() {
  const [data, setData] = useState(null);

  const activeStatus = "PUBLISHED";

  useEffect(() => {
    fetch("http://localhost:5000/legend/api/blogs")
      .then((response) => response.json())
      .then((res) => setData(res.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  if (!data) {
    return (
      <div className={styles["dashboard-container"]}>
        <Header />
        <Spinnner />
      </div>
    );
  }

  const { blogs } = data;

  return (
    <div className={styles["blogs-container"]}>
      <Header />

      <section className={styles["blogs-content"]}>
        <div className={styles["blogs-header"]}>
          <h1>My Blogs</h1>
        </div>

        <div className={styles["blogs-grid"]}>
          {blogs?.length > 0 ? (
            <BlogSection status={activeStatus} blogs={blogs} />
          ) : (
            <div className={styles["empty-state"]}>
              <h3>Opps!</h3>
              <p>No Published blogs found</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

// Blog Section Component (unchanged)
function BlogSection({ blogs }) {
  return (
    <div className={styles["blog-section"]}>
      <div className={styles["section-header"]}>
        <h2 className={styles["blogs-name"]}>Blogs</h2>
        <span className={styles["blog-count"]}>{blogs.length}</span>
      </div>

      <div className={styles["blogs-list"]}>
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
}

// Blog Card Component (unchanged)
function BlogCard({ blog }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const author = useLocation().pathname.split("/")[0];

  return (
    <div className={styles["blog-card"]}>
      <div className={styles["blog-header"]}>
        <Link
          to={`${author}/blogs/${blog.slug}`}
          className={styles["blog-title"]}
        >
          {blog.title}
        </Link>
        <span className={styles["blog-date"]}>
          Created At {formatDate(blog.createdAt)}
        </span>
      </div>

      <p className={styles["blog-description"]}>
        {blog.description || "No description available"}
      </p>
    </div>
  );
}

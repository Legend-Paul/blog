import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import Spinnner from "../../components/Spinnner/Spinnner";
import styles from "./Blogs.module.css";

export default function Blogs() {
  const [data, setData] = useState(null);
  const [user, setUser] = useState(null);
  const { author } = useParams();
  const token = localStorage.getItem("Authorization");

  useEffect(() => {
    Promise.all([
      fetch(`http://localhost:5000/${author}/api/blogs`).then((res) =>
        res.json()
      ),
      fetch("http://localhost:5000/", {
        headers: { Authorization: token },
      }).then((res) => res.json()),
    ])
      .then(([blogsResponse, userResponse]) => {
        setData(blogsResponse.data);
        setUser(userResponse.user);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [author, token]);

  if (!data) {
    return (
      <div className={styles["dashboard-container"]}>
        <Spinnner />
      </div>
    );
  }
  const { blogs } = data;
  const userStaus =
    user?.userType === "user"
      ? { author, label: "Signout", route: "signout" }
      : { author, label: "Login", route: "login" };

  console.log(user);

  return (
    <div className={styles["blogs-container"]}>
      <Header userStaus={userStaus} />

      <section className={styles["blogs-content"]}>
        <div className={styles["blogs-header"]}>
          <h1>{author} Blogs</h1>
        </div>

        <div className={styles["blogs-grid"]}>
          {blogs?.length > 0 ? (
            <BlogSection author={author} blogs={blogs} />
          ) : (
            <div className={styles["empty-state"]}>
              <h3>Opps!</h3>
              <p>{author}'s Published blogs not found</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

// Blog Section Component (unchanged)
function BlogSection({ blogs, author }) {
  return (
    <div className={styles["blog-section"]}>
      <div className={styles["section-header"]}>
        <h2 className={styles["blogs-name"]}>Blogs</h2>
        <span className={styles["blog-count"]}>{blogs.length}</span>
      </div>

      <div className={styles["blogs-list"]}>
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} author={author} />
        ))}
      </div>
    </div>
  );
}

// Blog Card Component (unchanged)
function BlogCard({ blog, author }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className={styles["blog-card"]}>
      <div className={styles["blog-header"]}>
        <Link
          to={`/${author}/blogs/${blog.slug}`}
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

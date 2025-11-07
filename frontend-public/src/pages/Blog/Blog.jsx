import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Spinnner from "../../components/Spinnner/Spinnner";
import styles from "./Blog.module.css";
import { Textarea } from "../../components/Input/Input";

export default function Blog() {
  const [blogData, setBlogData] = useState();
  const [blogsData, setBlogsData] = useState();
  const [commentsData, setCommentsData] = useState();
  const [error, setError] = useState(null);
  const { author, slug } = useParams();
  const token = localStorage.getItem("Authorization");

  useEffect(() => {
    Promise.all([
      fetch(`http://localhost:5000/${author}/api/blog/${slug}`).then((res) =>
        res.json()
      ),
      fetch(`http://localhost:5000/${author}/api/blogs`).then((res) =>
        res.json()
      ),
      fetch(`http://localhost:5000/${author}/api/blog/${slug}/comments`).then(
        (res) => res.json()
      ),
    ])
      .then(([blogRes, blogsRes, commentsRes]) => {
        setBlogData(blogRes.data);
        setBlogsData(blogsRes.data);
        setCommentsData(commentsRes.data);
      })
      .catch((err) => {
        console.error("Error fetching blog:", err);
        setError(err.message);
      });
  }, [author, slug]);

  if (error) {
    return (
      <div className={styles["error-container"]}>
        <p>Error loading blog: {error}</p>
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

  if (!blogData) {
    return (
      <div>
        <Spinnner />
      </div>
    );
  }

  const blog = blogData;
  const blogs = blogsData.blogs.filter((b) => b.slug != blog.slug);

  console.log(blog);

  return (
    <div className={styles["preview-blog-container"]}>
      <section>
        <div dangerouslySetInnerHTML={{ __html: blog.content }} />
        <OtherBlogs blogs={blogs} author={author} formatDate={formatDate} />
        <Link to={"#comments"}>Comments</Link>
        <CommentsTextarea commentsCount={blog?._count.comments} />
        <Comments comments={commentsData} formatDate={formatDate} />
      </section>
    </div>
  );
}

function Comments({ comments, formatDate }) {
  console.log("global replies", comments);
  return (
    <article className={styles["comments-article"]}>
      <div className={styles["comments"]}>
        {comments.map((comment) => {
          console.log("replies", comment.replies);
          return (
            <div className={`${styles["comment-container"]}`} key={comment.id}>
              <div
                className={`${styles["comment"]} ${
                  comment.parentId
                    ? styles["parent-comment"]
                    : styles["child-comment"]
                }`}
              >
                <div className={styles["heading"]}>
                  <h4>{comment.user.username}</h4>
                  <span>{formatDate(comment.createdAt)}</span>
                </div>
                <p className={styles["comment-text"]}>{comment.content}</p>
                <div className={styles["comment-icons"]}></div>
              </div>
              <div className={styles["replies"]}>
                {comment.replies.length > 0 ? (
                  <Comments
                    comments={comment.replies}
                    formatDate={formatDate}
                  />
                ) : (
                  ""
                )}
              </div>
            </div>
          );
        })}
      </div>
    </article>
  );
}

function CommentsTextarea({ commentsCount }) {
  return (
    <div id="comments" className={styles["comment-textarea"]}>
      <Textarea
        placeholder={"Enter your comment"}
        label={`Comments (${commentsCount})`}
        id={"comments-textarea"}
        required={false}
      />
      <div className={styles["icons"]}>
        <button>
          <svg
            className={styles["nav-icon"]}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

function OtherBlogs({ blogs, author, formatDate }) {
  return (
    <article className={styles["other-blogs-container"]}>
      <h3>Other Blogs</h3>
      <div className={styles["other-blogs"]}>
        {blogs.map((blog) => {
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
        })}
      </div>
    </article>
  );
}

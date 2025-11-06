import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinnner from "../../components/Spinnner/Spinnner";
import styles from "./Blog.module.css";

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

  if (!blogData) {
    return (
      <div>
        <Spinnner />
      </div>
    );
  }

  const blog = blogData;
  console.log(blog);
  console.log(commentsData);

  return (
    <div className={styles["preview-blog-container"]}>
      <section>
        <div dangerouslySetInnerHTML={{ __html: blog.content }} />
      </section>
    </div>
  );
}

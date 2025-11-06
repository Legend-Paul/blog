import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigation, useParams } from "react-router-dom";
import Spinnner from "../../components/Spinnner/Spinnner";
import styles from "./Blog.module.css";

export default function Blog() {
  const [data, setData] = useState();
  const { author, slug } = useParams();
  const token = localStorage.getItem("Authorization");
  console.log("Blogging");

  useEffect(() => {
    fetch(`http://localhost:5000/${author}/api/blogs`)
      .then((response) => response.json())
      .then((res) => setData(res.data))
      .catch((error) => {
        throw new Error(error.message);
      });
  }, []);

  if (!data) {
    return (
      <div>
        <Spinnner />
      </div>
    );
  }

  const blog = data.blogs.find((blog) => blog.slug === slug);
  console.log(blog);

  return (
    <div className={styles["preview-blog-container"]}>
      <section>
        <div dangerouslySetInnerHTML={{ __html: blog.content }} />
      </section>
    </div>
  );
}

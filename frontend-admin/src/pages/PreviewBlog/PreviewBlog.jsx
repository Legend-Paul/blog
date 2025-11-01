import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinnner from "../../components/Spinnner/Spinnner";
import Header from "../../components/Header/Header";
import styles from "./PreviewBlog.module.css";

export default function PreviewBlog() {
  const [data, setData] = useState();
  const { slug } = useParams();

  useEffect(() => {
    fetch(`http://localhost:5000/api/blog/${slug}`, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImU5NDExOTU0LTU3MjAtNDQwOC1iM2I3LTRjZTg2YjU1M2RhYSIsImZ1bGxOYW1lIjoiUGF1bCBNYWluYSIsInVzZXJuYW1lIjoibGVnZW5kIiwicm9sZSI6IkFVVEhPUiIsImNyZWF0ZWRBdCI6IjIwMjUtMTAtMjlUMTc6NDk6MDYuNjU4WiIsInVwZGF0ZWRBdCI6IjIwMjUtMTAtMjlUMTc6NDk6MDYuNjU4WiIsImlhdCI6MTc2MTc2MTY5NCwiZXhwIjoxNzY0MzUzNjk0fQ.KFXzG0_HJYNgWfNfQ4M4kIdV-bdK6Mh4T4GEZvJBxs8`,
      },
    })
      .then((response) => response.json())
      .then((res) => setData(res.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  if (!data) {
    return (
      <div>
        <Spinnner />
      </div>
    );
  }

  return (
    <div className={styles["preview-blog-container"]}>
      <section>
        <div dangerouslySetInnerHTML={{ __html: data.content }} />
      </section>
    </div>
  );
}

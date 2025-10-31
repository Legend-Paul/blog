import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Spinnner from "../../components/Spinnner/Spinnner";
import styles from "./Blogs.module.css";

export default function () {
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
        <Header />
        <Spinnner />
      </div>
    );
  }
  return (
    <div className="blog-contaner">
      <Header />
      <section className="blog"></section>
    </div>
  );
}

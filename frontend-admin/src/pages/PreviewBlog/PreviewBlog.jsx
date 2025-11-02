import { useEffect, useState } from "react";
import {
  redirect,
  useActionData,
  useLocation,
  useNavigate,
  useNavigation,
  useParams,
} from "react-router-dom";
import Spinnner from "../../components/Spinnner/Spinnner";
import { EditorHeader } from "../../components/Header/Header";
import styles from "./PreviewBlog.module.css";
import Dialog from "../../components/Dialog/Dialog";

export default function PreviewBlog() {
  const [data, setData] = useState();
  const { slug } = useParams();
  console.log(slug);

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
  console.log(data);

  return (
    <div className={styles["preview-blog-container"]}>
      <section>
        <div dangerouslySetInnerHTML={{ __html: data.content }} />
      </section>
    </div>
  );
}

export async function Action({ request }) {
  const formData = await request.formData();
  const slug = formData.get("slug").trim().split(" ").join("-");
  const title = formData.get("title");
  const description = formData.get("description");
  const status = formData.get("status");
  const content = formData.get("content");
  const blogData = { status, slug, title, description, content };
  console.log({ status, slug, title, description, content });

  try {
    const response = await fetch("http://localhost:5000/api/blogs/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImU5NDExOTU0LTU3MjAtNDQwOC1iM2I3LTRjZTg2YjU1M2RhYSIsImZ1bGxOYW1lIjoiUGF1bCBNYWluYSIsInVzZXJuYW1lIjoibGVnZW5kIiwicm9sZSI6IkFVVEhPUiIsImNyZWF0ZWRBdCI6IjIwMjUtMTAtMjlUMTc6NDk6MDYuNjU4WiIsInVwZGF0ZWRBdCI6IjIwMjUtMTAtMjlUMTc6NDk6MDYuNjU4WiIsImlhdCI6MTc2MTc2MTY5NCwiZXhwIjoxNzY0MzUzNjk0fQ.KFXzG0_HJYNgWfNfQ4M4kIdV-bdK6Mh4T4GEZvJBxs8`,
      },
      body: JSON.stringify(blogData),
    });

    if (!response.ok) {
      throw new Error("Failed to create blog");
    }

    const data = await response.json();
    return redirect("/api/blogs");
  } catch (error) {
    return { error: error.message };
  }
}
export function EditorPreview() {
  const location = useLocation();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const content = location.state?.blogContent || "";
  const navigation = useNavigation();
  const editorRoute = {
    label: "Editor",
    endpoint: "/api/blogs/new",
    state: content,
  };

  const navigationState = navigation.state;
  const onClose = () => {
    setIsDialogOpen((prev) => !prev);
  };

  return (
    <div
      className={`${styles["preview-blog-container"]} ${styles["editor-blog-preview"]}`}
    >
      <EditorHeader onClose={onClose} route={editorRoute} />
      <section>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </section>
      <Dialog
        isOpen={isDialogOpen}
        onClose={onClose}
        state={navigationState}
        content={content}
      />
      ;
    </div>
  );
}

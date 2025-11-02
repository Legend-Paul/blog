import { useEffect, useState, useRef } from "react";
import {
  redirect,
  useLocation,
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

export function EditorPreview() {
  const location = useLocation();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const slugRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const statusRef = useRef(null);
  const content = location.state?.blogContent || "";
  const dialogFieldsValue = location.state?.dialogFieldsValue || "";
  const navigation = useNavigation();
  const editorPath = location.pathname.split("/").slice(0, -1).join("/");
  const editorRoute = {
    label: "Editor",
    endpoint: editorPath,
    state: { blogContent: content, dialogFieldsValue },
  };

  useEffect(() => {
    if (dialogFieldsValue && slugRef.current) {
      slugRef.current.value = dialogFieldsValue.slug;
      slugRef.current.focus();
      slugRef.current.select();

      if (titleRef.current) titleRef.current.value = dialogFieldsValue.title;
      if (descriptionRef.current)
        descriptionRef.current.value = dialogFieldsValue.description;
      if (statusRef.current) statusRef.current.value = dialogFieldsValue.status;
    }
  }, [dialogFieldsValue]);

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
        slugRef={slugRef}
        titleRef={titleRef}
        descriptionRef={descriptionRef}
        statusRef={statusRef}
      />
      ;
    </div>
  );
}

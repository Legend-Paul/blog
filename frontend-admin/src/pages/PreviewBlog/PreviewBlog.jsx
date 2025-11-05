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
import checkAuth from "../../utils/checkAuth";

export default function PreviewBlog() {
  checkAuth();
  const [data, setData] = useState();
  const { slug } = useParams();
  const token = localStorage.getItem("Authorization");

  useEffect(() => {
    fetch(`http://localhost:5000/api/blog/${slug}`, {
      headers: {
        Authorization: token,
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

export function EditorPreview() {
  const location = useLocation();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const content = location.state?.blogContent || "";
  const dialogFieldsValue = location.state?.dialogFieldsValue || "";
  const navigation = useNavigation();
  const editorPath = location.pathname.split("/").slice(0, -1).join("/");
  const editorRoute = {
    label: "Editor",
    endpoint: editorPath,
    state: { blogContent: content, dialogFieldsValue },
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
        dialogFieldsValue={dialogFieldsValue}
      />
      ;
    </div>
  );
}

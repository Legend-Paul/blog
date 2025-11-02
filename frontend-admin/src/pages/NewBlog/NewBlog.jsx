import styles from "./NewBlog.module.css";
import { useState, useRef, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { EditorHeader } from "../../components/Header/Header";
import Dialog from "../../components/Dialog/Dialog";
import { useLocation, redirect, useNavigation } from "react-router-dom";

export async function Action({ request }) {
  const formData = await request.formData();
  const slug = formData.get("slug").trim().split(" ").join("-");
  const title = formData.get("title");
  const description = formData.get("description");
  const status = formData.get("status");
  const content = formData.get("content");
  const blogData = { status, slug, title, description, content };
  console.log(blogData);

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

export default function NewBlog() {
  const location = useLocation();
  const prevContent = location.state?.blogContent || "";
  const [content, setContent] = useState(prevContent || "");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const editorRef = useRef(null);
  const totalBrowserHeight = window.outerHeight - 200;
  const navigation = useNavigation();
  const navigationState = navigation.state;

  const previewRoute = {
    label: "Preview",
    endpoint: "preview",
    state: content,
  };
  console.log(navigationState);

  const handleEditorChange = (newContent, editor) => {
    setContent(newContent);
  };

  const onClose = () => {
    setIsDialogOpen((prev) => !prev);
  };

  return (
    <div className={styles["new-blog-container"]}>
      <EditorHeader onClose={onClose} route={previewRoute} />
      <section className={styles["new-blog"]}>
        <div className={styles["editor-container"]}>
          <Editor
            apiKey="qvpl8exv0lseodpogvqksucgywoqf0lbkp6rqdz6txc1a28i"
            onInit={(evt, editor) => (editorRef.current = editor)}
            value={content}
            onEditorChange={handleEditorChange}
            init={{
              height: totalBrowserHeight,
              menubar: false,
              plugins: [
                "anchor",
                "autolink",
                "charmap",
                "codesample",
                "emoticons",
                "link",
                "lists",
                "media",
                "searchreplace",
                "table",
                "visualblocks",
                "wordcount",
                "checklist",
                "mediaembed",
                "casechange",
                "formatpainter",
                "pageembed",
                "a11ychecker",
                "tinymcespellchecker",
                "permanentpen",
                "powerpaste",
                "advtable",
                "advcode",
                "advtemplate",
                "ai",
                "uploadcare",
                "mentions",
                "tinycomments",
                "tableofcontents",
                "footnotes",
                "mergetags",
                "autocorrect",
                "typography",
                "inlinecss",
                "markdown",
                "importword",
                "exportword",
                "exportpdf",
              ],
              toolbar:
                "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography uploadcare | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
              tinycomments_mode: "embedded",
              tinycomments_author: "Author name",
              mergetags_list: [
                { value: "First.Name", title: "First Name" },
                { value: "Email", title: "Email" },
              ],
              ai_request: (request, respondWith) =>
                respondWith.string(() =>
                  Promise.reject("See docs to implement AI Assistant")
                ),
              uploadcare_public_key: "367367409ba1cc5dfc7b",
            }}
          />
        </div>
      </section>

      <Dialog
        isOpen={isDialogOpen}
        onClose={onClose}
        state={navigationState}
        content={content}
      />
    </div>
  );
}

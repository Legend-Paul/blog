import styles from "./NewBlog.module.css";
import { useState, useRef, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { EditorHeader } from "../../components/Header/Header";
import Dialog from "../../components/Dialog/Dialog";
import { useActionData, useNavigate } from "react-router-dom";

export async function Action({ request }) {
  const formData = await request.formData();
  const slug = formData.get("slug").split(" ").join("-");
  const title = formData.get("title");
  const description = formData.get("description");
  const status = formData.get("status");

  console.log("Form data received:", Object.fromEntries(formData));

  return { status, slug, title, description };
}

export default function NewBlog() {
  // Removed 'async' here
  const [content, setContent] = useState("Welcome to TinyMCE!");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const editorRef = useRef(null);
  const totalBrowserHeight = window.outerHeight - 200;
  const data = useActionData();
  const navigate = useNavigate();

  // Use useEffect to handle the data submission
  useEffect(() => {
    if (data) {
      const blogData = { ...data, content: content };
      console.log(blogData);

      fetch("http://localhost:5000/api/blogs/new", {
        method: "POST", // Added method
        headers: {
          "Content-Type": "application/json", // Added Content-Type
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImU5NDExOTU0LTU3MjAtNDQwOC1iM2I3LTRjZTg2YjU1M2RhYSIsImZ1bGxOYW1lIjoiUGF1bCBNYWluYSIsInVzZXJuYW1lIjoibGVnZW5kIiwicm9sZSI6IkFVVEhPUiIsImNyZWF0ZWRBdCI6IjIwMjUtMTAtMjlUMTc6NDk6MDYuNjU4WiIsInVwZGF0ZWRBdCI6IjIwMjUtMTAtMjlUMTc6NDk6MDYuNjU4WiIsImlhdCI6MTc2MTc2MTY5NCwiZXhwIjoxNzY0MzUzNjk0fQ.KFXzG0_HJYNgWfNfQ4M4kIdV-bdK6Mh4T4GEZvJBxs8`,
        },
        body: JSON.stringify(blogData),
      })
        .then((res) => {
          if (res.ok) {
            navigate("/api/blogs");
          }
          return res.json();
        })
        .then((data) => console.log("Response:", data))
        .catch((error) => console.error("Error fetching data:", error));
    }
  }, [data, content, navigate]); // Added dependencies

  const handleEditorChange = (newContent, editor) => {
    setContent(newContent);
  };

  const onClose = () => {
    setIsDialogOpen((prev) => !prev);
  };

  return (
    <div className={styles["new-blog-container"]}>
      <EditorHeader onClose={onClose} />
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

              // Background color (optional)
              content_style:
                "body { background-color: #ffffff; padding: 20px; }",

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

              // Add custom button to toolbar
              toolbar:
                "undo redo | addsection | blocks fontfamily fontsize | bold italic underline strikethrough | link media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography uploadcare | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",

              // Custom section button
              setup: (editor) => {
                editor.ui.registry.addButton("addsection", {
                  text: "+ Section",
                  tooltip: "Add new section",
                  onAction: () => {
                    editor.insertContent(`
            <hr style="margin: 30px 0; border: none; border-top: 2px solid #e0e0e0;">
            <h2>New Section</h2>
            <p>Start writing your content here...</p>
            <br>
          `);
                  },
                });
              },

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

      <Dialog isOpen={isDialogOpen} onClose={onClose} />
    </div>
  );
}

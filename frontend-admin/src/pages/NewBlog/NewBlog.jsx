import styles from "./NewBlog.module.css";
import { useState, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import Header from "../../components/Header/Header";
import Button from "../../components/Button/Button";

export default function NewBlog() {
  const [content, setContent] = useState("Welcome to TinyMCE!");
  const editorRef = useRef(null);

  const handleEditorChange = (newContent, editor) => {
    setContent(newContent);
  };

  const handleCreateBlog = () => {
    console.log("Blog content:", content);
  };

  return (
    <div className={styles["new-blog-container"]}>
      <Header />
      <section className={styles["new-blog"]}>
        <div className={styles["editor-container"]}>
          <Editor
            apiKey="qvpl8exv0lseodpogvqksucgywoqf0lbkp6rqdz6txc1a28i"
            onInit={(evt, editor) => (editorRef.current = editor)}
            value={content}
            onEditorChange={handleEditorChange}
            init={{
              height: 500,
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
          <Button
            handleClick={handleCreateBlog}
            label={"Create Blog"}
            action={"create"}
            variant={"success"}
          />
        </div>
      </section>
    </div>
  );
}

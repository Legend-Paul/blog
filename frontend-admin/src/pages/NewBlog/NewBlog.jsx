import styles from "./NewBlog.module.css";
import { useState, useRef, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { EditorHeader } from "../../components/Header/Header";
import Dialog from "../../components/Dialog/Dialog";
import { useLocation, redirect, useNavigation } from "react-router-dom";

export default function NewBlog() {
  const location = useLocation();
  const prevContent = location.state?.blogContent || "";
  const dialogFieldsValue = location.state?.dialogFieldsValue || "";
  const [content, setContent] = useState(prevContent || "");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const editorRef = useRef(null);
  const slugRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const statusRef = useRef(null);
  const totalBrowserHeight = window.outerHeight - 200;
  const navigation = useNavigation();
  const navigationState = navigation.state;
  console.log(location.state);
  const previewRoute = {
    label: "Preview",
    endpoint: "preview",
    state: { blogContent: content, dialogFieldsValue },
  };

  const handleEditorChange = (newContent, editor) => {
    setContent(newContent);
  };

  const onClose = () => {
    setIsDialogOpen((prev) => !prev);
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
        slugRef={slugRef}
        titleRef={titleRef}
        descriptionRef={descriptionRef}
        statusRef={statusRef}
      />
    </div>
  );
}

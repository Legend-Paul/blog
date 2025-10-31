// import styles from "./NewBlog.modules.css";
import { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import Header from "../../components/Header/Header";

export default function NewBlog() {
  const [content, setContent] = useState(null);

  return (
    <div className="new-blog-container">
      <Header />
      <section className="new-blog">
        <div>
          <Editor
            apiKey="your-api-key-here"
            value={content}
            onEditorChange={(newContent) => setContent(newContent)}
            init={{
              height: 500,
              menubar: false,
              plugins: ["advlist", "autolink", "lists", "link", "image"],
              toolbar: "undo redo | bold italic | bullist numlist",
            }}
          />
          <button onClick={() => console.log(content)}>Get Content</button>
        </div>
      </section>
    </div>
  );
}

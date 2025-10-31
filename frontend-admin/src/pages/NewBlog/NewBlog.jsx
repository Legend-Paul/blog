import styles from "./NewBlog.modules.css";
import Header from "../../components/Header/Header";

export default function NewBlog() {
  return (
    <div className="new-blog-container">
      <Header />
      <section className="new-blog"></section>
    </div>
  );
}

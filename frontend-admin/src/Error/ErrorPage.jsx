import { Link, useRouteError } from "react-router-dom";
import styles from "./ErrorPage.module.css";

export default function ErrorPage() {
  const error = useRouteError();
  return (
    <div className={styles["error-page"]}>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <Link to="/">Go back to home page</Link>
    </div>
  );
}

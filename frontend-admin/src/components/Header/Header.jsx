import styles from "./Header.module.css";

export default function Header() {
  return (
    <div className={styles["header-container"]}>
      <header>
        <div className={styles["logo"]}>
          <a href="/">Logo</a>
        </div>
        <nav>
          <ul>
            <li>
              <a href="/dashboard">Dashboard</a>
            </li>
          </ul>
          <ul>
            <li>
              <a href="/">Blogs</a>
            </li>
          </ul>
          <ul>
            <li>
              <a href="/signout">Sign Out</a>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
}

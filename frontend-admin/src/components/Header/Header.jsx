import { useState } from "react";
import styles from "./Header.module.css";
import { useLocation } from "react-router-dom";

export default function Header() {
  const [active, setActive] = useState("dashboard");
  const location = useLocation();
  const currentPath = location.pathname;
  return (
    <div className={styles["header-container"]}>
      <header>
        <div className={styles["logo"]}>
          <a href="/">Blog</a>
        </div>
        <nav>
          <ul>
            <li>
              <a
                className={
                  styles[
                    `${
                      currentPath.includes("dashboard") ||
                      currentPath.endsWith("/")
                        ? "active"
                        : ""
                    }`
                  ]
                }
                href="/dashboard"
              >
                Dashboard
              </a>
            </li>
          </ul>
          <ul>
            <li>
              <a
                className={
                  styles[`${currentPath.includes("blog") ? "active" : ""}`]
                }
                href="/"
              >
                Blogs
              </a>
            </li>
          </ul>
          <ul>
            <li>
              <a
                className={
                  styles[`${currentPath.includes("signout") ? "active" : ""}`]
                }
                href="/signout"
              >
                Sign Out
              </a>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
}

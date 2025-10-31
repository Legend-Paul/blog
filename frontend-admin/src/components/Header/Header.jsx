import { useState } from "react";
import styles from "./Header.module.css";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const [active, setActive] = useState("dashboard");
  const location = useLocation();
  const currentPath = location.pathname;
  return (
    <div className={styles["header-container"]}>
      <header>
        <div className={styles["logo"]}>
          <Link to="/">Blog</Link>
        </div>
        <nav>
          <ul>
            <li>
              <Link
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
                to="/dashboard"
              >
                Dashboard
              </Link>
            </li>
          </ul>
          <ul>
            <li>
              <Link
                className={
                  styles[`${currentPath.includes("blogs") ? "active" : ""}`]
                }
                to="/blogs"
              >
                Blogs
              </Link>
            </li>
          </ul>
          <ul>
            <li>
              <Link
                className={
                  styles[`${currentPath.includes("signout") ? "active" : ""}`]
                }
                to="/signout"
              >
                Sign Out
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
}

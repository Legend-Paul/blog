import { useState } from "react";
import styles from "./Header.module.css";
import { Link, useLocation } from "react-router-dom";

export default function Header({ searchParams }) {
  const location = useLocation();
  const currentPath = location.pathname;
  console.log(location.state);
  const blogsSearchParams = location.state?.searchParams || "";

  return (
    <div className={styles["header-container"]}>
      <header>
        <div className={styles["logo"]}>
          <Link
            to="/"
            state={{ searchParams: searchParams ? searchParams : "" }}
          >
            Blog
          </Link>
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
                state={{ searchParams: searchParams ? searchParams : "" }}
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
                to={`/blogs?${blogsSearchParams}`}
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

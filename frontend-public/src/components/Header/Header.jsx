import { useState } from "react";
import styles from "./Header.module.css";
import { NavLink, useLocation } from "react-router-dom";

export default function Header({ searchParams }) {
  const location = useLocation();
  const currentPath = location.pathname;

  const blogsSearchParams = location.state?.searchParams || "";

  return (
    <div className={styles["header-container"]}>
      <header>
        <div className={styles["logo"]}>
          <NavLink
            to="/"
            state={{ searchParams: searchParams ? searchParams : "" }}
          >
            bloog
          </NavLink>
        </div>
        <nav>
          <ul>
            <li>
              <NavLink
                className={
                  styles[`${currentPath.includes("blogs") ? "active" : ""}`]
                }
                to={`/api/blogs?${blogsSearchParams}`}
              >
                Blogs
              </NavLink>
            </li>
          </ul>
          <ul className={styles["profile-cont"]}>
            <li
              className={`${styles["profile"]} ${
                styles[`${currentPath.includes("auth") ? "active" : ""}`]
              }`}
            >
              <svg
                className={`${styles["nav-icon"]} `}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </li>
            <li className={styles["profile-action"]}>
              <div className={styles["signout"]}>
                <NavLink
                  className={
                    styles[`${currentPath.includes("signout") ? "active" : ""}`]
                  }
                  to="/auth/signout"
                >
                  Signout
                </NavLink>
              </div>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
}

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
            Blog
          </NavLink>
        </div>
        <nav>
          <ul>
            <li>
              <NavLink
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
              </NavLink>
            </li>
          </ul>
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
          <ul>
            <li>
              <NavLink
                className={
                  styles[`${currentPath.includes("signout") ? "active" : ""}`]
                }
                to="/signout"
              >
                Sign Out
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
}

export function EditorHeader({ onClose, route }) {
  const location = useLocation();
  const currentPath = location.pathname;
  console.log(route);
  return (
    <div className={styles["header-container"]}>
      <header>
        <div className={styles["logo"]}>
          <NavLink to="/">Blog</NavLink>
        </div>
        <nav>
          <ul>
            <li onClick={onClose}>
              <NavLink
                className={
                  styles[`${currentPath.endsWith("/new") ? "active" : ""}`]
                }
                to="."
              >
                Save Blog
              </NavLink>
            </li>
          </ul>
          <ul>
            <li>
              <NavLink
                className={
                  styles[
                    `${
                      currentPath.endsWith(route.endpoint.split("/").at(-1))
                        ? "active"
                        : ""
                    }`
                  ]
                }
                to={route.endpoint}
                state={{ blogContent: route.state }}
              >
                {route.label}
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
}

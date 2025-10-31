import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import Spinnner from "../../components/Spinnner/Spinnner";
import CreateBlog from "../../components/CreateBlog/CreateBlog";
import styles from "./Blogs.module.css";

export default function Blogs() {
  const [data, setData] = useState(null);
  const [loadingStates, setLoadingStates] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();
  const activeStatus = searchParams.get("status") || "ALL";

  useEffect(() => {
    fetch("http://localhost:5000/api/blogs", {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImU5NDExOTU0LTU3MjAtNDQwOC1iM2I3LTRjZTg2YjU1M2RhYSIsImZ1bGxOYW1lIjoiUGF1bCBNYWluYSIsInVzZXJuYW1lIjoibGVnZW5kIiwicm9sZSI6IkFVVEhPUiIsImNyZWF0ZWRBdCI6IjIwMjUtMTAtMjlUMTc6NDk6MDYuNjU4WiIsInVwZGF0ZWRBdCI6IjIwMjUtMTAtMjlUMTc6NDk6MDYuNjU4WiIsImlhdCI6MTc2MTc2MTY5NCwiZXhwIjoxNzY0MzUzNjk0fQ.KFXzG0_HJYNgWfNfQ4M4kIdV-bdK6Mh4T4GEZvJBxs8`,
      },
    })
      .then((response) => response.json())
      .then((res) => setData(res.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleStatusFilter = (status) => {
    if (status === "ALL") {
      // Remove status parameter to show all
      // const newParams = new URLSearchParams(searchParams);
      // newParams.delete("status");
      setSearchParams((prevParams) => {
        prevParams.delete("status");
        return prevParams;
      });
    } else {
      // Set the status parameter
      setSearchParams({ status });
    }
  };

  const handleBlogAction = async (blogId, action) => {
    setLoadingStates((prev) => ({ ...prev, [blogId]: action }));

    try {
      const response = await fetch(
        `http://localhost:5000/api/blogs/${blogId}/${action}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImU5NDExOTU0LTU3MjAtNDQwOC1iM2I3LTRjZTg2YjU1M2RhYSIsImZ1bGxOYW1lIjoiUGF1bCBNYWluYSIsInVzZXJuYW1lIjoibGVnZW5kIiwicm9sZSI6IkFVVEhPUiIsImNyZWF0ZWRBdCI6IjIwMjUtMTAtMjlUMTc6NDk6MDYuNjU4WiIsInVwZGF0ZWRBdCI6IjIwMjUtMTAtMjlUMTc6NDk6MDYuNjU4WiIsImlhdCI6MTc2MTc2MTY5NCwiZXhwIjoxNzY0MzUzNjk0fQ.KFXzG0_HJYNgWfNfQ4M4kIdV-bdK6Mh4T4GEZvJBxs8`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const updatedData = await fetch("http://localhost:5000/api/blogs", {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImU5NDExOTU0LTU3MjAtNDQwOC1iM2I3LTRjZTg2YjU1M2RhYSIsImZ1bGxOYW1lIjoiUGF1bCBNYWluYSIsInVzZXJuYW1lIjoibGVnZW5kIiwicm9sZSI6IkFVVEhPUiIsImNyZWF0ZWRBdCI6IjIwMjUtMTAtMjlUMTc6NDk6MDYuNjU4WiIsInVwZGF0ZWRBdCI6IjIwMjUtMTAtMjlUMTc6NDk6MDYuNjU4WiIsImlhdCI6MTc2MTc2MTY5NCwiZXhwIjoxNzY0MzUzNjk0fQ.KFXzG0_HJYNgWfNfQ4M4kIdV-bdK6Mh4T4GEZvJBxs8`,
          },
        }).then((res) => res.json());

        setData(updatedData.data);
      } else {
        console.error(`Failed to ${action} blog`);
      }
    } catch (error) {
      console.error(`Error ${action}ing blog:`, error);
    } finally {
      setLoadingStates((prev) => ({ ...prev, [blogId]: null }));
    }
  };

  const handleDelete = async (blogId) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    setLoadingStates((prev) => ({ ...prev, [blogId]: "delete" }));

    try {
      const response = await fetch(
        `http://localhost:5000/api/blogs/${blogId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImU5NDExOTU0LTU3MjAtNDQwOC1iM2I3LTRjZTg2YjU1M2RhYSIsImZ1bGxOYW1lIjoiUGF1bCBNYWluYSIsInVzZXJuYW1lIjoibGVnZW5kIiwicm9sZSI6IkFVVEhPUiIsImNyZWF0ZWRBdCI6IjIwMjUtMTAtMjlUMTc6NDk6MDYuNjU4WiIsInVwZGF0ZWRBdCI6IjIwMjUtMTAtMjlUMTc6NDk6MDYuNjU4WiIsImlhdCI6MTc2MTc2MTY5NCwiZXhwIjoxNzY0MzUzNjk0fQ.KFXzG0_HJYNgWfNfQ4M4kIdV-bdK6Mh4T4GEZvJBxs8`,
          },
        }
      );

      if (response.ok) {
        const updatedData = await fetch("http://localhost:5000/api/blogs", {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImU5NDExOTU0LTU3MjAtNDQwOC1iM2I3LTRjZTg2YjU1M2RhYSIsImZ1bGxOYW1lIjoiUGF1bCBNYWluYSIsInVzZXJuYW1lIjoibGVnZW5kIiwicm9sZSI6IkFVVEhPUiIsImNyZWF0ZWRBdCI6IjIwMjUtMTAtMjlUMTc6NDk6MDYuNjU4WiIsInVwZGF0ZWRBdCI6IjIwMjUtMTAtMjlUMTc6NDk6MDYuNjU4WiIsImlhdCI6MTc2MTc2MTY5NCwiZXhwIjoxNzY0MzUzNjk0fQ.KFXzG0_HJYNgWfNfQ4M4kIdV-bdK6Mh4T4GEZvJBxs8`,
          },
        }).then((res) => res.json());

        setData(updatedData.data);
      } else {
        console.error("Failed to delete blog");
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
    } finally {
      setLoadingStates((prev) => ({ ...prev, [blogId]: null }));
    }
  };

  console.log(searchParams.toString());

  if (!data) {
    return (
      <div className={styles["dashboard-container"]}>
        <Header searchParams={searchParams.toString()} />
        <Spinnner />
      </div>
    );
  }

  const blogs = (data.blogs || []).reduce((acc, curr) => {
    if (!acc[curr.status]) acc[curr.status] = [];
    acc[curr.status].push(curr);
    return acc;
  }, {});

  // Calculate counts for each status
  const statusCounts = {
    ALL: data.blogs?.length || 0,
    DRAFT: blogs.DRAFT?.length || 0,
    PENDING: blogs.PENDING?.length || 0,
    PUBLISHED: blogs.PUBLISHED?.length || 0,
    ARCHIVED: blogs.ARCHIVED?.length || 0,
  };

  const statusOrder = ["DRAFT", "PENDING", "PUBLISHED", "ARCHIVED"];

  return (
    <div className={styles["blogs-container"]}>
      <Header searchParams={searchParams.toString()} />
      <CreateBlog />
      <section className={styles["blogs-content"]}>
        <div className={styles["blogs-header"]}>
          <h1>My Blogs</h1>
        </div>

        {/* Status Filter Chips */}
        <div className={styles["status-filters"]}>
          {[
            { key: "ALL", label: "All Blogs", count: statusCounts.ALL },
            { key: "DRAFT", label: "Drafts", count: statusCounts.DRAFT },
            { key: "PENDING", label: "Pending", count: statusCounts.PENDING },
            {
              key: "PUBLISHED",
              label: "Published",
              count: statusCounts.PUBLISHED,
            },
            {
              key: "ARCHIVED",
              label: "Archived",
              count: statusCounts.ARCHIVED,
            },
          ].map(({ key, label, count }) => (
            <button
              key={key}
              className={`${styles["status-chip"]} ${
                activeStatus === key ? styles["status-chip-active"] : ""
              }`}
              onClick={() => handleStatusFilter(key)}
              data-status={key}
            >
              <span className={styles["chip-label"]}>{label}</span>
              <span className={styles["chip-count"]}>{count}</span>
            </button>
          ))}
        </div>

        <div className={styles["blogs-grid"]}>
          {activeStatus === "ALL" ? (
            // Show all sections when "ALL" is selected
            statusOrder.map(
              (status) =>
                blogs[status]?.length > 0 && (
                  <BlogSection
                    key={status}
                    status={status}
                    blogs={blogs[status]}
                    onAction={handleBlogAction}
                    onDelete={handleDelete}
                    loadingStates={loadingStates}
                  />
                )
            )
          ) : // Show only the selected status section
          blogs[activeStatus]?.length > 0 ? (
            <BlogSection
              status={activeStatus}
              blogs={blogs[activeStatus]}
              onAction={handleBlogAction}
              onDelete={handleDelete}
              loadingStates={loadingStates}
            />
          ) : (
            <div className={styles["empty-state"]}>
              <h3>No {activeStatus.toLowerCase()} blogs found</h3>
              <p>
                You don't have any blogs with {activeStatus.toLowerCase()}{" "}
                status.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

// Blog Section Component (same as before)
function BlogSection({ status, blogs, onAction, onDelete, loadingStates }) {
  const statusConfig = {
    DRAFT: { color: "var(--warning-color)", label: "Drafts" },
    PENDING: { color: "var(--info-color)", label: "Pending Review" },
    PUBLISHED: { color: "var(--success-color)", label: "Published" },
    ARCHIVED: { color: "var(--text-muted)", label: "Archived" },
  };

  const config = statusConfig[status] || {
    color: "var(--text-muted)",
    label: status,
  };

  return (
    <div className={styles["blog-section"]}>
      <div className={styles["section-header"]}>
        <h2 style={{ color: config.color }}>{config.label}</h2>
        <span className={styles["blog-count"]}>{blogs.length}</span>
      </div>

      <div className={styles["blogs-list"]}>
        {blogs.map((blog) => (
          <BlogCard
            key={blog.id}
            blog={blog}
            status={status}
            onAction={onAction}
            onDelete={onDelete}
            isLoading={loadingStates[blog.id]}
          />
        ))}
      </div>
    </div>
  );
}

// Blog Card Component (same as before)
function BlogCard({ blog, status, onAction, onDelete, isLoading }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusActions = (currentStatus) => {
    const baseActions = [
      { label: "View", action: "view", variant: "secondary" },
      { label: "Edit", action: "edit", variant: "secondary" },
      { label: "Delete", action: "delete", variant: "danger" },
    ];

    switch (currentStatus) {
      case "DRAFT":
        return [
          ...baseActions,
          { label: "Publish", action: "publish", variant: "primary" },
        ];
      case "PENDING":
        return [
          ...baseActions,
          { label: "Publish", action: "publish", variant: "primary" },
        ];
      case "PUBLISHED":
        return [
          ...baseActions,
          { label: "Unpublish", action: "unpublish", variant: "warning" },
        ];
      case "ARCHIVED":
        return [
          ...baseActions,
          { label: "Publish", action: "publish", variant: "primary" },
        ];
      default:
        return baseActions;
    }
  };

  const actions = getStatusActions(status);

  const handleActionClick = (action) => {
    if (action === "view") {
      window.open(`/blog/${blog.slug}`, "_blank");
    } else if (action === "edit") {
      window.location.href = `/edit/${blog.id}`;
    } else if (action === "delete") {
      onDelete(blog.id);
    } else {
      onAction(blog.id, action);
    }
  };

  return (
    <div className={styles["blog-card"]}>
      <div className={styles["blog-header"]}>
        <h3 className={styles["blog-title"]}>{blog.title}</h3>
        <span className={styles["blog-date"]}>
          {formatDate(blog.createdAt)}
        </span>
      </div>

      <p className={styles["blog-description"]}>
        {blog.description || "No description available"}
      </p>

      <div className={styles["blog-actions"]}>
        {actions.map(({ label, action, variant }) => (
          <button
            key={action}
            className={`${styles["action-btn"]} ${styles[`action-${variant}`]}`}
            onClick={() => handleActionClick(action)}
            disabled={isLoading === action}
          >
            {isLoading === action ? (
              <div className={styles["btn-spinner"]}></div>
            ) : (
              label
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

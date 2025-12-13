import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import Spinnner from "../../components/Spinnner/Spinnner";
import CreateBlog from "../../components/CreateBlog/CreateBlog";
import Button from "../../components/Button/Button";
import Notification from "../../components/Notification/Notification";
import checkAuth from "../../utils/checkAuth";
import styles from "./Blogs.module.css";

const API_BASE_URL = "https://blog-backend-tf6n.onrender.com";

export default function Blogs() {
  checkAuth();

  const [data, setData] = useState(null);
  const [loadingStates, setLoadingStates] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();
  const [notifications, setNotifications] = useState([]);
  const activeStatus = searchParams.get("status") || "ALL";
  const token = localStorage.getItem("Authorization");

  // Add notification function
  const addNotification = (message, type = "info") => {
    const id = Date.now();
    setNotifications(() => [{ id, message, type }]);

    // Auto remove after 5 seconds
    setTimeout(() => {
      setNotifications((prev) =>
        prev.filter((notification) => notification.id !== id)
      );
    }, 5000);
  };

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/blogs`, {
      headers: {
        Authorization: token,
      },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((res) => setData(res.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, [token]);

  const handleStatusFilter = (status) => {
    if (status === "ALL") {
      setSearchParams((prevParams) => {
        prevParams.delete("status");
        return prevParams;
      });
    } else {
      setSearchParams({ status });
    }
  };

  const handleBlogAction = async (slug, action) => {
    setLoadingStates((prev) => ({ ...prev, [slug]: action }));
    let status = "PUBLISHED";
    if (action === "unpublish") status = "PENDING";
    if (action === "archive") status = "ARCHIVED";

    try {
      const response = await fetch(`${API_BASE_URL}/api/blog/edit/${slug}`, {
        method: "PUT",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        const updatedData = await fetch(`${API_BASE_URL}/api/blogs`, {
          headers: {
            Authorization: token,
          },
          credentials: "include",
        }).then((res) => res.json());

        setData(updatedData.data);
        addNotification(
          `Blog ${
            action == "archive" ? action.slice(0, -1) : action
          }ed successfully!`,
          "success"
        );
      } else {
        console.error(`Failed to ${action} blog`);
        addNotification(`Failed to ${action} blog`, "error");
      }
    } catch (error) {
      console.error(`Error ${action}ing blog:`, error);
      addNotification(`Error ${action}ing blog: ${error.message}`, "error");
    } finally {
      setLoadingStates((prev) => ({ ...prev, [slug]: null }));
    }
  };

  const handleDelete = async (slug) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    setLoadingStates((prev) => ({ ...prev, [slug]: "delete" }));

    try {
      const response = await fetch(`${API_BASE_URL}/api/blog/${slug}`, {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
        credentials: "include",
      });

      if (response.ok) {
        const updatedData = await fetch(`${API_BASE_URL}/api/blogs`, {
          headers: {
            Authorization: token,
          },
          credentials: "include",
        }).then((res) => res.json());

        setData(updatedData.data);
        addNotification("Blog deleted successfully!", "success");
      } else {
        console.error("Failed to delete blog");
        addNotification("Failed to delete blog", "error");
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
      addNotification("Error deleting blog", "error");
    } finally {
      setLoadingStates((prev) => ({ ...prev, [slug]: null }));
    }
  };

  // Remove notification function
  const removeNotification = (id) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  };

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

      {/* Notification Container */}
      <div className={styles["notifications-container"]}>
        {notifications.map((notification) => (
          <Notification
            key={notification.id}
            message={notification.message}
            type={notification.type}
            onClose={() => removeNotification(notification.id)}
          />
        ))}
      </div>

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
                    user={data.user}
                  />
                )
            )
          ) : blogs[activeStatus]?.length > 0 ? (
            <BlogSection
              status={activeStatus}
              blogs={blogs[activeStatus]}
              onAction={handleBlogAction}
              onDelete={handleDelete}
              loadingStates={loadingStates}
              user={data.user}
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

// Blog Section Component
function BlogSection({
  status,
  blogs,
  onAction,
  onDelete,
  loadingStates,
  user,
}) {
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
            isLoading={loadingStates[blog.slug]}
            user={user}
          />
        ))}
      </div>
    </div>
  );
}

// Blog Card Component
function BlogCard({ blog, status, onAction, onDelete, isLoading, user }) {
  const navigate = useNavigate();
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
          { label: "Archive", action: "archive", variant: "error" },
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
      window.open(`https://legendblog.onrender.com/${user.username}`, "_blank");
    } else if (action === "edit") {
      navigate(`/api/blog/edit/${blog.slug}`, {
        state: {
          blogContent: blog.content,
          dialogFieldsValue: {
            slug: blog.slug,
            title: blog.title,
            description: blog.description,
            status: blog.status,
          },
        },
      });
    } else if (action === "delete") {
      onDelete(blog.slug);
    } else {
      onAction(blog.slug, action);
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
          <Button
            key={action}
            onClick={() => handleActionClick(action)}
            disabled={isLoading == action}
            label={label}
            action={action}
            variant={variant}
          />
        ))}
      </div>
    </div>
  );
}

import { useEffect, useMemo, useState } from "react";
import {
  useParams,
  Link,
  Form,
  redirect,
  useActionData,
} from "react-router-dom";
import Spinnner from "../../components/Spinnner/Spinnner";
import styles from "./Blog.module.css";
import { Textarea } from "../../components/Input/Input";

async function postData(url, data, author, slug, user) {
  if (!user)
    return (window.location.href = `/${author}/auth/login?redirectTo=${`/${author}/blogs/${slug}`}`);

  const token = localStorage.getItem("Authorization");
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return await response.json();
}

export async function Action({ request }) {
  const formData = await request.formData();
  const content = await formData.get("content");
  const parentId = await formData.get("parentId");
  const author = await formData.get("author");
  const slug = await formData.get("slug");
  const user = await formData.get("user");

  const commentData = { content, parentId };
  console.log(commentData);
  try {
    let data = null;

    if (parentId)
      data = await postData(
        `http://localhost:5000/${author}/api/blog/${slug}/comments/${parentId}/reply`,
        commentData,
        author,
        slug,
        user
      );
    else
      data = await postData(
        `http://localhost:5000/${author}/api/blog/${slug}/comments/new`,
        commentData,
        author,
        slug
      );

    return { data };
  } catch (error) {
    return { error: error.message };
  }
}

export default function Blog() {
  const data = useActionData();
  const [blogData, setBlogData] = useState();
  const [blogsData, setBlogsData] = useState();
  const [commentsData, setCommentsData] = useState();
  const [user, setUser] = useState();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const [liking, setLiking] = useState(false);
  const { author, slug } = useParams();
  let token = localStorage.getItem("Authorization");
  token = token ? token : "";

  // Memoize the API URLs to prevent recreating them on every render
  const apiUrls = useMemo(
    () => ({
      blog: `http://localhost:5000/${author}/api/blog/${slug}`,
      blogs: `http://localhost:5000/${author}/api/blogs`,
      comments: `http://localhost:5000/${author}/api/blog/${slug}/comments`,
      user: "http://localhost:5000/",
    }),
    [author, slug]
  );

  // Memoize the fetch functions
  const fetchData = useMemo(
    () => ({
      blog: () => fetch(apiUrls.blog).then((res) => res.json()),
      blogs: () => fetch(apiUrls.blogs).then((res) => res.json()),
      comments: () => fetch(apiUrls.comments).then((res) => res.json()),
      user: (token) =>
        fetch(apiUrls.user, {
          headers: { Authorization: token },
        }).then((res) => res.json()),
    }),
    [apiUrls]
  );

  useEffect(() => {
    setLoading(true);
    const requests = token
      ? [
          fetchData.blog(),
          fetchData.blogs(),
          fetchData.comments(),
          fetchData.user(token),
        ]
      : [fetchData.blog(), fetchData.blogs(), fetchData.comments()];

    Promise.all(requests)
      .then((responses) => {
        const [blogRes, blogsRes, commentsRes, userRes] = responses;
        setBlogData(blogRes.data);
        setBlogsData(blogsRes.data);
        setCommentsData(commentsRes.data);
        if (userRes) setUser(userRes.user);
      })
      .catch((err) => {
        console.error("Error fetching blog:", err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, [token, fetchData, data]);

  if (error) {
    return (
      <div className={styles["error-container"]}>
        <p>Error loading blog: {error}</p>
      </div>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (!blogData) {
    return (
      <div>
        <Spinnner />
      </div>
    );
  }

  const blog = blogData;
  const blogs = blogsData.blogs.filter((b) => b.slug != blog.slug);

  const handleLikeBlog = async () => {
    setLiking(true);

    try {
      const data = await postData(
        `http://localhost:5000/${author}/api/blog/${slug}/likes/new`,
        {},
        author,
        slug,
        user
      );
      const res = await fetchData.blog();

      setLiking(false);

      setBlogData(res.data);
    } catch (error) {
      setLiking(false);
      throw new Error(error.message);
    }
  };

  return (
    <div className={styles["preview-blog-container"]}>
      <main>
        <div dangerouslySetInnerHTML={{ __html: blog.content }} />
        <OtherBlogs blogs={blogs} author={author} formatDate={formatDate} />
        <div className={styles["blog-likes"]}>
          {liking ? (
            <div className={styles["btn-spinner"]}></div>
          ) : (
            <button onClick={handleLikeBlog}>
              <svg
                className="nav-icon"
                fill="currentColor"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>{" "}
              Likes {blog._count.likes}
            </button>
          )}
        </div>
        <div id="comments" className={styles["comments-section-container"]}>
          <div className={styles["comments-heading"]}>
            <h3>
              <a href={"#comments"}>Comments ({blog?._count.comments})</a>
            </h3>
            {user?.userType === "user" ? (
              <Link
                to={`/${author}/auth/signout`}
                className={styles["account"]}
              >
                Sign Out
              </Link>
            ) : (
              <Link to={`/${author}/auth/login`} className={styles["account"]}>
                Log In
              </Link>
            )}
          </div>
          <CommentsTextarea
            author={author}
            slug={slug}
            user={user}
            disabled={loading}
          />
          <Comments
            comments={commentsData}
            formatDate={formatDate}
            author={author}
            slug={slug}
            user={user}
            disabled={loading}
            setCommentsData={setCommentsData}
            fetchData={fetchData}
          />
        </div>
      </main>
    </div>
  );
}

function Comments({
  comments,
  formatDate,
  author,
  slug,
  user,
  disabled,
  setCommentsData,
  fetchData,
}) {
  const [reply, setReply] = useState({});
  const [liking, setLiking] = useState({});

  function handleDisplayRepy(id) {
    setReply((prevReplies) => {
      if (prevReplies[id]) return { ...prevReplies, [id]: false };
      const replies = Object.fromEntries(
        Object.entries(([key, value]) => [key, false])
      );
      return { ...replies, [id]: true };
    });
  }

  const handleLikeComment = async (id) => {
    setLiking((prev) => {
      return { ...prev, [id]: true };
    });
    try {
      await postData(
        `http://localhost:5000/${author}/api/blog/${slug}/comments/${id}/likes/new`,
        {},
        author,
        slug,
        user
      );

      const res = await fetchData.comments();

      setLiking((prev) => {
        return { ...prev, [id]: false };
      });

      setCommentsData(res.data);
    } catch (error) {
      setLiking((prev) => {
        return { ...prev, [id]: false };
      });
      throw new Error(error.message);
    }
  };

  return (
    <section className={styles["comments-section"]}>
      <div className={styles["comments"]}>
        {comments.map((comment) => {
          return (
            <div className={`${styles["comment-container"]}`} key={comment.id}>
              <div
                className={`${styles["comment"]} ${
                  comment.parentId
                    ? styles["parent-comment"]
                    : styles["child-comment"]
                }`}
              >
                <div className={styles["heading"]}>
                  <h4>{comment.user.username}</h4>
                  <span>{formatDate(comment.createdAt)}</span>
                </div>
                <p className={styles["comment-text"]}>{comment.content}</p>
                <div className={styles["comment-icons"]}>
                  {liking[comment.id] ? (
                    <div className={styles["btn-spinner"]}></div>
                  ) : (
                    <button
                      className={styles["comment-icon"]}
                      onClick={() => handleLikeComment(comment.id)}
                    >
                      <svg
                        className={styles["nav-icon"]}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                        />
                      </svg>
                      <span>Likes {comment._count.likes}</span>
                    </button>
                  )}
                  <button
                    className={styles["comment-icon"]}
                    onClick={() => handleDisplayRepy(comment.id)}
                  >
                    <svg
                      className={styles["nav-icon"]}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6M9 10h.01"
                      />
                    </svg>
                    <span>Replies {comment._count.replies}</span>
                  </button>
                </div>

                {reply[comment.id] && (
                  <CommentsTextarea
                    parentId={comment.id}
                    author={author}
                    slug={slug}
                    user={user}
                  />
                )}
              </div>
              <div className={styles["replies"]}>
                {comment.replies.length > 0 ? (
                  <Comments
                    comments={comment.replies}
                    formatDate={formatDate}
                    author={author}
                    slug={slug}
                    user={user}
                    disabled={disabled}
                    setCommentsData={setCommentsData}
                  />
                ) : (
                  ""
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function CommentsTextarea({ parentId = "", author, slug, user, disabled }) {
  return (
    <div className={styles["comment-textarea"]}>
      <Form method="post">
        <input type="hidden" name="parentId" value={parentId} />
        <input type="hidden" name="author" value={author} />
        <input type="hidden" name="slug" value={slug} />
        <input type="hidden" name="user" value={user} />
        <Textarea
          placeholder={"Enter your comment"}
          id={"comments-textarea"}
          required={false}
          name={"content"}
        />
        <div className={styles["icons"]}>
          <button type="submit">
            {disabled ? (
              <div className={styles["btn-spinner"]}></div>
            ) : (
              <svg
                className={styles["nav-icon"]}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            )}
          </button>
        </div>
      </Form>
    </div>
  );
}

function OtherBlogs({ blogs, author, formatDate }) {
  return (
    <article className={styles["other-blogs-container"]}>
      <h3>Other Blogs</h3>
      <div className={styles["other-blogs"]}>
        {blogs.map((blog) => {
          return (
            <div className={styles["blog-card"]} key={blog.id}>
              <div className={styles["blog-header"]}>
                <Link
                  to={`/${author}/blogs/${blog.slug}`}
                  className={styles["blog-title"]}
                >
                  {blog.title}
                </Link>
                <span className={styles["blog-date"]}>
                  Created At {formatDate(blog.createdAt)}
                </span>
              </div>

              <p className={styles["blog-description"]}>
                {blog.description || "No description available"}
              </p>
            </div>
          );
        })}
      </div>
    </article>
  );
}

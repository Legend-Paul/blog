import { redirect } from "react-router-dom";

export default async function Action({ request }) {
  const formData = await request.formData();
  const slug = formData.get("slug").trim().split(" ").join("-");
  const title = formData.get("title");
  const description = formData.get("description");
  const status = formData.get("status");
  const content = formData.get("content");
  const blogData = { status, slug, title, description, content };
  const token = localStorage.getItem("Authorization");

  try {
    const response = await fetch(
      `http://localhost:5000/api/blog/edit/${slug}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(blogData),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to create blog");
    }

    const data = await response.json();
    return redirect("/api/blogs");
  } catch (error) {
    return { error: error.message };
  }
}

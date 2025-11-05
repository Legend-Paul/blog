import express from "express";
import {
  createBlog,
  getBlogs,
  getBlog,
  deleteBlog,
  updateBlog,
} from "../controllers/blogHandler.js";

const blogRoute = express.Router();

//blogs
blogRoute.get("/blogs", getBlogs);
blogRoute.get("/blog/:slug", getBlog);
blogRoute.put("/blog/edit/:slug", updateBlog);
blogRoute.delete("/blog/:slug", deleteBlog);
blogRoute.post("/blogs/new", createBlog);

export default blogRoute;

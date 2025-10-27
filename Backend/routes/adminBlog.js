import express from "express";
import {
    createBlog,
    getBlogs,
    getBlog,
    deleteBlog,
    updateBlog,
} from "../controllers/adminBlogHandler.js";
const adminBlogRoute = express.Router();

adminBlogRoute.get("/blogs", getBlogs);
adminBlogRoute.get("/blogs/:slug", getBlog);
adminBlogRoute.put("/blogs/:slug", updateBlog);
adminBlogRoute.delete("/blogs/:slug", deleteBlog);
adminBlogRoute.post("/blogs/new", createBlog);

// messages

export default adminBlogRoute;

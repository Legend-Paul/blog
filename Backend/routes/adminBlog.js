import express from "express";
import {
    createBlog,
    getBlogs,
    getBlog,
    deleteBlog,
    updateBlog,
} from "../controllers/adminBlogHandler.js";
import { createComment } from "../controllers/commentHandlerj.js";

const adminBlogRoute = express.Router();

// messages
adminBlogRoute.post("/blogs/:slug/messages/new", createComment);

adminBlogRoute.get("/blogs", getBlogs);
adminBlogRoute.get("/blogs/:slug", getBlog);
adminBlogRoute.put("/blogs/:slug", updateBlog);
adminBlogRoute.delete("/blogs/:slug", deleteBlog);
adminBlogRoute.post("/blogs/new", createBlog);

export default adminBlogRoute;

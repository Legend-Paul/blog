import express from "express";
import {
    createBlog,
    getBlogs,
    getBlog,
    deleteBlog,
    updateBlog,
} from "../controllers/adminBlogHandler.js";
import {
    createComment,
    getBlogComments,
    createCommentReply,
} from "../controllers/commentHandler.js";

const adminBlogRoute = express.Router();

// messages
adminBlogRoute.post("/blogs/:slug/messages/new", createComment);
adminBlogRoute.post("/blogs/:slug/messages/:id/reply", createCommentReply);
adminBlogRoute.get("/blogs/:slug/messages", getBlogComments);

adminBlogRoute.get("/blogs", getBlogs);
adminBlogRoute.get("/blogs/:slug", getBlog);
adminBlogRoute.put("/blogs/:slug", updateBlog);
adminBlogRoute.delete("/blogs/:slug", deleteBlog);
adminBlogRoute.post("/blogs/new", createBlog);

export default adminBlogRoute;

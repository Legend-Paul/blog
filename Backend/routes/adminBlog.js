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
    deleteComments,
} from "../controllers/commentHandler.js";

import {
    createBlogLike,
    createCommentLike,
} from "../controllers/likesHandler.js";

const adminBlogRoute = express.Router();

// comments
adminBlogRoute.post("/blogs/:slug/comments/new", createComment);
adminBlogRoute.post("/blogs/:slug/comments/:id/reply", createCommentReply);
adminBlogRoute.get("/blogs/:slug/comments", getBlogComments);
adminBlogRoute.delete("/blogs/:slug/comments/:id", deleteComments);

//likes
adminBlogRoute.post("/blogs/:slug/likes/new", createBlogLike);
adminBlogRoute.post("/blogs/:slug/comments/:id/likes/new", createCommentLike);

adminBlogRoute.get("/blogs", getBlogs);
adminBlogRoute.get("/blogs/:slug", getBlog);
adminBlogRoute.put("/blogs/:slug", updateBlog);
adminBlogRoute.delete("/blogs/:slug", deleteBlog);
adminBlogRoute.post("/blogs/new", createBlog);

export default adminBlogRoute;

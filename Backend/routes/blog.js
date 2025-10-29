import express from "express";
import {
    createBlog,
    getBlogs,
    getBlog,
    deleteBlog,
    updateBlog,
} from "../controllers/blogHandler.js";
import {
    createComment,
    getBlogComments,
    createCommentReply,
    deleteComments,
} from "../controllers/commentHandler.js";

import {
    createBlogLike,
    createCommentLike,
    deleteBlogLike,
    deleteCommentLike,
} from "../controllers/likesHandler.js";

const blogRoute = express.Router();

// comments
blogRoute.post("/blogs/:slug/comments/new", createComment);
blogRoute.post("/blogs/:slug/comments/:id/reply", createCommentReply);
blogRoute.get("/blogs/:slug/comments", getBlogComments);
blogRoute.delete("/blogs/:slug/comments/:id", deleteComments);

//likes
blogRoute.post("/blogs/:slug/likes/new", createBlogLike);
blogRoute.post("/blogs/:slug/comments/:id/likes/new", createCommentLike);

blogRoute.delete("/blogs/:slug/likes/:id", deleteBlogLike);
blogRoute.delete("/blogs/:slug/comments/likes/:id", deleteCommentLike);

//blogs
blogRoute.get("/blogs", getBlogs);
blogRoute.get("/blogs/:slug", getBlog);
blogRoute.put("/blogs/:slug", updateBlog);
blogRoute.delete("/blogs/:slug", deleteBlog);
blogRoute.post("/blogs/new", createBlog);

export default blogRoute;

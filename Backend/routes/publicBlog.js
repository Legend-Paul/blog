import express from "express";
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

const publicBlogRoute = express.Router({ mergeParams: true });

// Comments
publicBlogRoute.get("/blogs/:slug/comments", getBlogComments);
publicBlogRoute.post("/blogs/:slug/comments/new", createComment);
publicBlogRoute.post("/blogs/:slug/comments/:id/reply", createCommentReply);
publicBlogRoute.delete("/blogs/:slug/comments/:id", deleteComments);

//likes
publicBlogRoute.post("/blogs/:slug/likes/new", createBlogLike);
publicBlogRoute.delete("/blogs/:slug/likes/:id", deleteBlogLike);
publicBlogRoute.post("/blogs/:slug/comments/:id/likes/new", createCommentLike);
publicBlogRoute.delete("/blogs/:slug/comments/likes/:id", deleteCommentLike);

export default publicBlogRoute;

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

const publicActionRoute = express.Router({ mergeParams: true });

// Comments
publicActionRoute.get("/blogs/:slug/comments", getBlogComments);
publicActionRoute.post("/blogs/:slug/comments/new", createComment);
publicActionRoute.post("/blogs/:slug/comments/:id/reply", createCommentReply);
publicActionRoute.delete("/blogs/:slug/comments/:id", deleteComments);

//likes
publicActionRoute.post("/blogs/:slug/likes/new", createBlogLike);
publicActionRoute.delete("/blogs/:slug/likes/:id", deleteBlogLike);
publicActionRoute.post(
  "/blogs/:slug/comments/:id/likes/new",
  createCommentLike
);
publicActionRoute.delete("/blogs/:slug/comments/likes/:id", deleteCommentLike);

// blog
export default publicActionRoute;

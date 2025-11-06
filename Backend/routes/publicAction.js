import express from "express";
import {
  createComment,
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
publicActionRoute.post("/blog/:slug/comments/new", createComment);
publicActionRoute.post("/blog/:slug/comments/:id/reply", createCommentReply);
publicActionRoute.delete("/blog/:slug/comments/:id", deleteComments);

//likes
publicActionRoute.post("/blog/:slug/likes/new", createBlogLike);
publicActionRoute.delete("/blog/:slug/likes/:id", deleteBlogLike);
publicActionRoute.post("/blog/:slug/comments/:id/likes/new", createCommentLike);
publicActionRoute.delete("/blog/:slug/comments/likes/:id", deleteCommentLike);

// blog
export default publicActionRoute;

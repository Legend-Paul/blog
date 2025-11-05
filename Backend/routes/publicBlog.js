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
publicBlogRoute.post("/blogs/:slug/comments/new", createComment);

//likes
publicBlogRoute.post("/blogs/:slug/likes/new", createBlogLike);
publicBlogRoute.delete("/blogs/:slug/likes/:id", deleteBlogLike);

export default publicBlogRoute;

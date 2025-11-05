import express from "express";
import {
  createBlogLike,
  createCommentLike,
  deleteBlogLike,
  deleteCommentLike,
} from "../controllers/likesHandler.js";

const publicBlogRoute = express.Router({ mergeParams: true });

//likes
publicBlogRoute.post("/blogs/:slug/likes/new", createBlogLike);
publicBlogRoute.delete("/blogs/:slug/likes/:id", deleteBlogLike);

export default publicBlogRoute;

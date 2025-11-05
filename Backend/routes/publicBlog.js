import express from "express";
import { createBlogLike } from "../controllers/likesHandler.js";

const publicBlogRoute = express.Router({ mergeParams: true });

//likes
publicBlogRoute.post("/blogs/:slug/likes/new", createBlogLike);

export default publicBlogRoute;

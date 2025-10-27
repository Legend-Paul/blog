import express from "express";
import { createBlog, getBlogs } from "../controllers/dashboardHandler.js";

const dashboardRoute = express.Router();

dashboardRoute.get("/blogs", getBlogs);
dashboardRoute.post("/blogs/new", createBlog);

export default dashboardRoute;

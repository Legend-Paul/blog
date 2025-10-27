import express from "express";
import {
    createBlog,
    getBlogs,
    getBlog,
    deleteBlog,
} from "../controllers/dashboardHandler.js";

const dashboardRoute = express.Router();

dashboardRoute.get("/blogs", getBlogs);
dashboardRoute.get("/blogs/:slug", getBlog);
dashboardRoute.delete("/blogs/:slug", deleteBlog);
dashboardRoute.post("/blogs/new", createBlog);

export default dashboardRoute;

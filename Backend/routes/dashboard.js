import express from "express";
import {
    createBlog,
    getBlogs,
    getBlog,
} from "../controllers/dashboardHandler.js";

const dashboardRoute = express.Router();

dashboardRoute.get("/blogs", getBlogs);
dashboardRoute.get("/blogs/:slug", getBlog);
dashboardRoute.post("/blogs/new", createBlog);

export default dashboardRoute;

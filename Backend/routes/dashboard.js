import express from "express";
import { createBlog } from "../controllers/dashboardHandler.js";

const dashboardRoute = express.Router();

dashboardRoute.post("/blogs/new", createBlog);

export default dashboardRoute;

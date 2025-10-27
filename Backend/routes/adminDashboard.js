import express from "express";
import getSummary from "../controllers/adminDashboardHandler.js";

const adminDashboardRoute = express.Router();

adminDashboardRoute.get("/", getSummary);

export default adminDashboardRoute;

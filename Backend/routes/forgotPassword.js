import express from "express";
import updatePassword from "../controllers/forgotPasswordHandler.js";

const forgotPasswordRoute = express.Router();

forgotPasswordRoute.post("/", updatePassword);

export default forgotPasswordRoute;

import express from "express";
import updatePassword from "../controllers/publicforgotPasswordHandler.js";

const publicforgotPasswordRoute = express.Router({ mergeParams: true });

publicforgotPasswordRoute.post("/", updatePassword);

export default publicforgotPasswordRoute;

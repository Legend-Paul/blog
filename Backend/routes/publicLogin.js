import express from "express";
import validateLogin from "../controllers/publicLoginHandler.js";

const publicLoginRoute = express.Router({ mergeParams: true });

publicLoginRoute.post("/", validateLogin);

export default publicLoginRoute;

import express from "express";
import { validateUser } from "../controllers/publicLoginHandler.js";

const publicLoginRoute = express.Router({ mergeParams: true });

publicLoginRoute.post("/", validateUser);

export default publicLoginRoute;

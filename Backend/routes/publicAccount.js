import express from "express";
import { createUser } from "../controllers/publicAccountHandler.js";

const publicAccountRoute = express.Router({ mergeParams: true });

publicAccountRoute.post("/signup", createUser);

export default publicAccountRoute;

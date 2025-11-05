import express from "express";
import { createUser } from "../controllers/publicAccountHandler.js";

const publicAccountRoute = express.Router();

publicAccountRoute.post("/", createUser);

export default publicAccountRoute;

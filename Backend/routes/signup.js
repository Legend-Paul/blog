import express from "express";
import { createUser } from "../controllers/signupHandler.js";

const signupRoute = express.Router();

signupRoute.post("/", createUser);

export default signupRoute;

import express from "express";
import { createAuthor } from "../controllers/signupHandler.js";

const signupRoute = express.Router();

signupRoute.post("/", createAuthor);

export default signupRoute;

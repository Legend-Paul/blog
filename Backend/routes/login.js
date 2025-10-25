import express from "express";
import { validateLogin } from "../controllers/loginHandler.js";

const loginRoute = express.Router();

loginRoute.post("/", validateLogin);

export default loginRoute;

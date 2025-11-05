import express from "express";
import { createUser } from "../controllers/publicSignupHandler.js";

const publicSignupRoute = express.Router({ mergeParams: true });

publicSignupRoute.post("/", createUser);

export default publicSignupRoute;

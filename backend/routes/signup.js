import expres from "express";
import { createUser } from "signupHandler.js";

const signupRoute = expres.Router();

signupRoute.post("/", createUser);

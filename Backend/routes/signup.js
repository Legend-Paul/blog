import express from "express";

const signupRoute = express.Router();

signupRoute.post("/", createUser);

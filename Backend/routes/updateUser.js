import express from "express";
import updateUserHandler from "../controllers/updateUserHandler.js";

const updateUser = express.Router();

updateUser.post("/", updateUserHandler);

export default updateUser;

import express from "express";
import updateAuthorHandler from "../controllers/updateAuthorHandler.js";

const updateAuthor = express.Router();

updateAuthor.put("/", updateAuthorHandler);

export default updateAuthor;

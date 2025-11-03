import prisma from "../config/prisma.js";
import { body, validationResult } from "express-validator";

const validate = [
  body("fullName").trim().notEmpty().withMessage("FullName is required"),
  body("username").trim().notEmpty().withMessage("Username is required"),
];

const updateUserHandler = [
  validate,
  async (req, res) => {
    const data = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    const canUpate = await prisma.user.findUnique({
      where: {
        username: data.username,
      },
    });

    if (canUpate)
      return res.status(400).json({ message: "Username already taken" });

    const user = await prisma.user.update({
      where: {
        id: req.user.id,
      },
      data: data,
    });
    return res.status(201).json({ message: "User updated", user });
  },
];

export default updateUserHandler;

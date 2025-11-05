import prisma from "../config/prisma.js";
import { body, validationResult } from "express-validator";

const validate = [
  body("fullName").trim().notEmpty().withMessage("FullName is required"),
  body("username").trim().notEmpty().withMessage("Username is required"),
];

const updateAuthorHandler = [
  validate,
  async (req, res) => {
    const data = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }

    try {
      const canUpate = await prisma.author.findUnique({
        where: {
          username: data.username,
        },
      });

      if (canUpate)
        return res.status(400).json({ message: "Username already taken" });

      const author = await prisma.author.update({
        where: {
          id: req.user.id,
        },
        data: data,
      });
      return res.status(201).json({ message: "User updated", author });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Server error" });
    }
  },
];

export default updateAuthorHandler;

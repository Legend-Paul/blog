import prisma from "../config/prisma.js";
import { body, validationResult } from "express-validator";
import bcryptjs from "bcryptjs";

const validate = [
  body("fullName").trim().notEmpty().withMessage("FullName is required"),
  body("username").trim().notEmpty().withMessage("Username is required"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be atleast 8 character long"),
];

const updateAuthorHandler = [
  validate,
  async (req, res) => {
    const { username, fullName, password } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }

    try {
      const canUpate = await prisma.author.findUnique({
        where: {
          username: username,
        },
      });

      if (canUpate)
        return res.status(400).json({ message: "Username already taken" });

      const hashedPassword = await bcryptjs.hash(password, 10);

      const author = await prisma.author.update({
        where: {
          id: req.user.id,
        },
        data: {
          username,
          fullName,
          password: hashedPassword,
        },
      });
      return res.status(201).json({ message: "User updated", author });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Server error" });
    }
  },
];

export default updateAuthorHandler;

import prisma from "../config/prisma.js";
import bcryptjs from "bcryptjs";
import { body, validationResult } from "express-validator";

const validate = [
  body("fullName")
    .trim()
    .notEmpty()
    .withMessage("FullName is required")
    .isAlpha("en-US", { ignore: " " })
    .withMessage("FullName must be only letters"),
  body("username").trim().notEmpty().withMessage("Username is required"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be atleast 8 character long"),
  body("confirmPassword")
    .trim()
    .custom((value, { req }) => value === req.body.password)
    .withMessage("Password must be equal"),
];

const createAuthor = [
  ...validate,
  async (req, res) => {
    const { fullName, username, password } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }

    // check if username already exists
    const existing = await prisma.author.findUnique({
      where: { username },
    });
    if (existing)
      return res.status(400).json({ message: "Username already taken" });

    const hashedPassword = await bcryptjs.hash(password, 10);
    const author = await prisma.author.create({
      data: {
        fullName,
        username,
        password: hashedPassword,
      },
      select: {
        id: true,
        fullName: true,
        username: true,
        createdAt: true,
      },
    });
    return res.status(200).json({ message: "Author created", author });
  },
];

export { createAuthor };

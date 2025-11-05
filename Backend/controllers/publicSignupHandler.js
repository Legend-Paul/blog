import prisma from "../config/prisma.js";
import bcryptjs from "bcryptjs";
import { body, validationResult } from "express-validator";

const validate = [
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

const createUser = [
  ...validate,
  async (req, res) => {
    const { username, password } = req.body;
    const authorName = req.params.author;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    // find the Author
    const author = await prisma.author.findUnique({
      where: {
        username: authorName,
      },
    });
    // check if username already exists
    const existing = await prisma.user.findUnique({
      where: {
        username_authorId: {
          username: username,
          authorId: author.id,
        },
      },
    });
    if (existing)
      return res.status(400).json({ message: "Username already taken" });

    const hashedPassword = await bcryptjs.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        authorId: author.id,
      },
      select: {
        id: true,
        username: true,
        createdAt: true,
      },
    });
    return res.status(200).json({ message: "User created", user });
  },
];

export { createUser };

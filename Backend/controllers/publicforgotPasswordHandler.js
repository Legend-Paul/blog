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

const updatePassword = [
  ...validate,
  async (req, res) => {
    const { username, password } = req.body;
    const authorName = req.params.author;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    try {
      // check author
      const author = await prisma.author.findUnique({
        where: {
          username: authorName,
        },
      });

      if (!author) return res.status(400).json({ message: "Author not found" });

      // Check user
      const user = await prisma.user.findUnique({
        where: {
          username_authorId: {
            username,
            authorId: author.id,
          },
        },
      });

      if (!user) return res.status(400).json({ message: "Username not found" });

      const hashedPassword = await bcryptjs.hash(password, 10);

      const updatedUser = await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          password: hashedPassword,
        },
        select: {
          id: true,
          username: true,
          createdAt: true,
        },
      });
      return res
        .status(201)
        .json({ message: "Password updated", user: updatedUser });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Server error" });
    }
  },
];
export default updatePassword;

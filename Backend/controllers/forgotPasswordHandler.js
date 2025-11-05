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

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    try {
      const author = await prisma.author.findUnique({
        where: { username },
      });
      if (!author)
        return res
          .status(400)
          .json({ message: "Incorrect username or password" });

      const hashedPassword = await bcryptjs.hash(password, 10);

      const updatedAuthor = await prisma.author.update({
        where: {
          id: author.id,
        },
        data: {
          password: hashedPassword,
        },
        select: {
          id: true,
          fullName: true,
          username: true,
          createdAt: true,
        },
      });
      return res
        .status(201)
        .json({ message: "Password updated", author: updatedAuthor });
    } catch (err) {
      res.status(500).json({ error: "Server error" });
    }
  },
];
export default updatePassword;

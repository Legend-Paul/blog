import dotenv from "dotenv";
import bcryptjs from "bcryptjs";
import prisma from "../config/prisma.js";
import jwt from "jsonwebtoken";
import { body, validationResult } from "express-validator";
dotenv.config();

const validate = [
  body("username").trim().notEmpty().withMessage("Username is required"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be atleast 8 character long"),
];

const validateLogin = [
  ...validate,
  async (req, res) => {
    const { username, password } = req.body;
    const authorName = req.params.author;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    try {
      // find the Author
      const author = await prisma.author.findUnique({
        where: {
          username: authorName,
        },
      });

      if (!author) return res.status(400).json({ message: "Author not found" });

      const user = await prisma.user.findUnique({
        where: {
          username_authorId: {
            username,
            authorId: author.id,
          },
        },
      });
      if (!user)
        return res
          .status(404)
          .json({ message: "Incorrect username or password" });

      const isMatch = await bcryptjs.compare(password, user.password);
      if (!isMatch)
        return res
          .status(401)
          .json({ message: "Incorrect username or password" });

      const { password: _userPassword, ...restField } = user;
      const payload = { ...restField };

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "30d",
      });

      return res.status(200).json({
        message: "Login successful",
        token: `Bearer ${token}`,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Server error" });
    }
  },
];

export default validateLogin;

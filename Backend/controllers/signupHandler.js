// ...existing code...
import prisma from "../utils/prisma.js";
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

const createUser = [
    ...validate,
    async (req, res) => {
        const { fullName, username, role, password } = req.body;

        const errors = validationResult(req);
        if (!errors.isEmpty) {
            return res.status(400).json({ error: errors.array });
        }

        try {
            // check if username already exists
            const existing = await prisma.user.findUnique({
                where: { username },
            });
            if (existing)
                return res
                    .status(400)
                    .json({ message: "Username already taken" });

            const hashedPassword = await bcryptjs.hash(password, 10);
            const user = await prisma.user.create({
                data: {
                    fullName,
                    username,
                    role,
                    password: hashedPassword,
                },
                select: {
                    id: true,
                    fullName: true,
                    username: true,
                    role: true,
                    createdAt: true,
                },
            });
            return res.status(201).json({ message: "User created", user });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Server error" });
        }
    },
];

export { createUser };

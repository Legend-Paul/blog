// ...existing code...
import prisma from "../utils/prisma.js";
import bcryptjs from "bcryptjs";

const createUser = async (req, res) => {
    console.log(req.body);
    const { fullName, username, role, password } = req.body;
    try {
        // check if username already exists
        const existing = await prisma.user.findUnique({
            where: { username },
        });
        if (existing) {
            return res.status(409).json({ message: "Username already taken" });
        }

        const hashedPassword = await bcryptjs.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                fullName,
                username,
                role,
                hashedPassword,
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
};
// ...existing code...

export { createUser };

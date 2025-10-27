import prisma from "../config/prisma.js";

const getSummary = async (req, res) => {
    try {
        const user = await prisma.user.findFirst({
            where: {
                id: req.user.id,
            },
            include: {
                blogs: true,
            },
        });
        const { password, ...restUser } = user;
        return res
            .status(200)
            .json({ meassage: "User detailed", data: restUser });
    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
};
export default getSummary;

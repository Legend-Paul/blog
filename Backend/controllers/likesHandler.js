import prisma from "../config/prisma.js";

export const createLike = async (req, res) => {
    try {
        const { slug } = req.params;

        const blog = await prisma.blog.findUnique({
            where: { slug },
        });

        if (!blog) return res.status(400).json({ message: "Blog not found!" });

        const like = await prisma.like.create({
            data: {
                blogId: blog.id,
                userId: req.user.id,
            },
        });

        res.status(201).json({
            message: "Blog liked successifully",
            data: like,
        });
    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
};

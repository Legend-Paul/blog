import prisma from "../config/prisma.js";

export const createBlogLike = async (req, res) => {
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

export const createCommentLike = async (req, res) => {
    try {
        const { id } = req.params;

        const comment = await prisma.comment.findUnique({
            where: { id },
        });

        if (!comment)
            return res.status(400).json({ message: "Comment not found!" });

        const like = await prisma.commentLike.create({
            data: {
                commentId: comment.id,
                userId: req.user.id,
            },
        });

        res.status(201).json({
            message: "Comment liked successifully",
            data: like,
        });
    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
};

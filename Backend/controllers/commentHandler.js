import prisma from "../config/prisma.js";

// createComment
export const createComment = async (req, res) => {
    try {
        const { content } = req.body;
        const { slug } = req.params;

        const blog = await prisma.blog.findUnique({
            where: { slug },
        });

        if (!blog) return res.status(400).json({ message: "Blog not found!" });

        const comment = await prisma.comment.create({
            data: {
                content,
                authorId: req.user.id,
                blogId: blog.id,
            },
        });

        return res
            .status(200)
            .json({ message: "Comment sent successifuly", data: comment });
    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
};

// get Blog Comments
export const getBlogComments = async (req, res) => {
    try {
        const { slug } = req.params;

        const blog = await prisma.blog.findUnique({
            where: { slug },
        });

        if (!blog) return res.status(404).json({ message: "Blog not found!" });

        const comments = await prisma.comment.findMany({
            where: {
                blogId: blog.id,
                parentId: null, // IMPORTANT: Only fetch top-level comments
            },
            include: {
                author: {
                    select: {
                        id: true,
                        fullName: true,
                        username: true,
                        role: true,
                        createdAt: true,
                    },
                },
                replies: {
                    include: {
                        author: {
                            select: {
                                id: true,
                                fullName: true,
                                username: true,
                                role: true,
                                createdAt: true,
                            },
                        },
                    },
                    orderBy: {
                        createdAt: "asc",
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return res
            .status(200)
            .json({ message: "Comments found successfully", data: comments });
    } catch (error) {
        console.error("Error fetching comments:", error);
        return res.status(500).json({ message: "Server error" });
    }
};

// create replies
export const createCommentReply = async (req, res) => {
    const { slug, id } = req.params;
    const { content } = req.body;

    const blog = await prisma.blog.findUnique({
        where: { slug },
    });

    if (!blog) return res.status(400).json({ message: "Blog not found!" });

    const comment = await prisma.comment.create({
        data: {
            content,
            authorId: req.user.id,
            parentId: id,
            blogId: blog.id,
        },
    });

    return res
        .status(200)
        .json({ message: "Comments found successfully", data: comment });
};

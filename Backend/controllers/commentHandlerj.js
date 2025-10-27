import prisma from "../config/prisma.js";

export const createComment = async (req, res) => {
    const { content } = req.body;
    const { slug } = req.params;

    const blog = await prisma.blog.findUnique({
        where: { slug },
    });
    console.log(blog);

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
};

import prisma from "../config/prisma.js";

export const createBlog = async (req, res) => {
    const { title, content, slug, status } = req.body;
    try {
        const blogExist = await prisma.blog.findUnique({
            where: {
                slug,
            },
        });
        if (blogExist)
            return res.status(400).json({ message: "Blog slug already exist" });

        const blog = await prisma.blog.create({
            data: {
                title,
                content,
                slug,
                status,
                authorId: req.user.id,
            },
        });
        return res.status(201).json({ message: "Blog created", blog });
    } catch (err) {
        return res.status(500).json({ message: "Server error" });
    }
};

export const getBlogs = async (req, res) => {
    try {
        const blogs = await prisma.blog.findMany({
            where: { authorId: req.user.id },
        });

        return res.status(200).json({ message: "All blogs", blogs });
    } catch (err) {
        return res.status(500).json({ message: "Server error" });
    }
};

export const getBlog = async (req, res) => {
    try {
        const { slug } = req.params;
        const blog = await prisma.blog.findMany({
            where: { slug, authorId: req.user.id },
        });

        return res.status(200).json({ message: "All blogs", blog });
    } catch (err) {
        return res.status(500).json({ message: "Server error" });
    }
};

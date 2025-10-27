import prisma from "../config/prisma.js";

export const createBlog = async (req, res) => {
    const { title, content, slug, status } = req.body;
    console.log({ title, content, slug, status });
    try {
        const blogExist = await prisma.blog.findUnique({
            where: {
                slug,
            },
        });
        console.log(blogExist);
        console.log(req.user);
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
        console.log(blog);
        return res.status(201).json({ message: "Blog created", blog });
    } catch (err) {
        return res.status(500).json({ message: "Server error" });
    }
};

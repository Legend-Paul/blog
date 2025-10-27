import prisma from "../config/prisma.js";

// create blog
export const createBlog = async (req, res) => {
    const { title, content, slug, status } = req.body;
    try {
        const blogExist = await prisma.blog.findUnique({
            where: {
                slug,
                authorId: req.user.id,
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

// get all blogs
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

// get a blog
export const getBlog = async (req, res) => {
    try {
        const { slug } = req.params;
        const blog = await prisma.blog.findMany({
            where: { slug, authorId: req.user.id },
        });

        return res
            .status(200)
            .json({ message: "Blog accessed successifully", blog });
    } catch (err) {
        return res.status(500).json({ message: "Server error" });
    }
};

//delete a blog
export const deleteBlog = async (req, res) => {
    try {
        const { slug } = req.params;
        const blog = await prisma.blog.delete({
            where: { slug, authorId: req.user.id },
        });

        return res
            .status(201)
            .json({ message: "Deleted  successifully", blog });
    } catch (err) {
        return res.status(500).json({ message: "Server error" });
    }
};

// update a blog
export const updateBlog = async (req, res) => {
    const { slug: _slug } = req.params;
    const data = req.body;
    const filteredData = Object.fromEntries(
        Object.entries(data).filter(([_, v]) => v !== undefined)
    );
    const { slug } = filteredData;
    try {
        const [_blogExist, _slugNameTaken] = await Promise.all([
            prisma.blog.findUnique({
                where: {
                    slug: _slug,
                    authorId: req.user.id,
                },
            }),
            prisma.blog.findUnique({
                where: {
                    slug,
                    authorId: req.user.id,
                },
            }),
        ]);

        if (!_blogExist)
            return res.status(400).json({ message: "Blog not found" });

        if (_slugNameTaken && _slug !== slug)
            return res.status(400).json({ message: "Slug already in use" });

        const blog = await prisma.blog.update({
            data: filteredData,
            where: {
                authorId: req.user.id,
                slug: _slug,
            },
        });

        return res
            .status(200)
            .json({ message: "Blog updated successifully", blog });
    } catch (err) {
        return res.status(500).json({ message: "Server error" });
    }
};

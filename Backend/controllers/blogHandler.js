import prisma from "../config/prisma.js";

// create blog
export const createBlog = async (req, res) => {
  const { title, content, description, slug, status } = req.body;

  const blogExist = await prisma.blog.findUnique({
    where: {
      slug_authorId: {
        slug,
        authorId: req.user.id,
      },
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
      description,
      authorId: req.user.id,
    },
  });
  return res.status(201).json({ message: "Blog created", data: blog });
};

// get all blogs
export const getBlogs = async (req, res) => {
  try {
    const blogs = await prisma.blog.findMany({
      where: {
        authorId: req.user.id,
      },
    });

    return res
      .status(200)
      .json({ message: "All blogs", data: { blogs, user: req.user } });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

// get a blog
export const getBlog = async (req, res) => {
  try {
    const { slug } = req.params;
    const blog = await prisma.blog.findUnique({
      where: {
        slug_authorId: {
          slug,
          authorId: req.user.id,
        },
      },
      include: {
        _count: {
          select: {
            likes: true,
          },
        },
        author: {
          select: {
            id: true,
            fullName: true,
            username: true,
          },
        },
      },
    });

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    return res
      .status(200)
      .json({ message: "Blog accessed successfully", data: blog });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

//delete a blog
export const deleteBlog = async (req, res) => {
  try {
    const { slug } = req.params;
    const blog = await prisma.blog.delete({
      where: {
        slug_authorId: {
          slug,
          authorId: req.user.id,
        },
      },
    });

    return res
      .status(201)
      .json({ message: "Deleted  successifully", data: blog });
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

  const { slug } = req.params;
  try {
    const _blogExist = await prisma.blog.findUnique({
      where: {
        slug_authorId: {
          slug: _slug,
          authorId: req.user.id,
        },
      },
    });

    if (!_blogExist) return res.status(400).json({ message: "Blog not found" });

    const blog = await prisma.blog.update({
      data: filteredData,
      where: {
        slug_authorId: {
          slug: _slug,
          authorId: req.user.id,
        },
      },
    });

    return res
      .status(200)
      .json({ message: "Blog updated successifully", data: blog });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

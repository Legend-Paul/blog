import prisma from "../config/prisma.js";

export const getPublicBlogs = async (req, res) => {
  const params = req.params;
  const {
    page = 1,
    limit = 10,
    sortBy = "createdAt",
    order = "desc",
  } = req.query;

  try {
    // Check if author exists
    const author = await prisma.author.findUnique({
      where: {
        username: params.author,
      },
      select: {
        id: true,
        username: true,
        fullName: true,
        createdAt: true,
        _count: {
          select: {
            blogs: {
              where: {
                status: "PUBLISHED",
              },
            },
          },
        },
      },
    });

    if (!author) {
      return res.status(404).json({
        message: "Author not found",
        data: { blogs: [], author: null },
      });
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const take = parseInt(limit);

    // Valid sort fields
    const validSortFields = ["createdAt", "updatedAt", "title"];
    const sortField = validSortFields.includes(sortBy) ? sortBy : "createdAt";
    const sortOrder = order === "asc" ? "asc" : "desc";

    // Fetch blogs with counts
    const [blogs, totalCount] = await Promise.all([
      prisma.blog.findMany({
        where: {
          authorId: author.id,
          status: "PUBLISHED",
        },
        select: {
          id: true,
          title: true,
          description: true,
          slug: true,
          createdAt: true,
          updatedAt: true,
          _count: {
            select: {
              likes: true,
              comments: true,
            },
          },
        },
        orderBy: {
          [sortField]: sortOrder,
        },
        skip,
        take,
      }),
      prisma.blog.count({
        where: {
          authorId: author.id,
          status: "PUBLISHED",
        },
      }),
    ]);

    const totalPages = Math.ceil(totalCount / take);

    return res.status(200).json({
      message: "Blogs fetched successfully",
      data: {
        author: {
          username: author.username,
          fullName: author.fullName,
          createdAt: author.createdAt,
          totalPublishedBlogs: author._count.blogs,
        },
        blogs,
        pagination: {
          currentPage: parseInt(page),
          totalPages,
          totalBlogs: totalCount,
          blogsPerPage: take,
          hasNextPage: parseInt(page) < totalPages,
          hasPrevPage: parseInt(page) > 1,
        },
      },
    });
  } catch (err) {
    console.error("Error fetching blogs:", err);
    return res.status(500).json({
      message: "Server error",
      error: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
};
// get a blog
export const getPublicBlog = async (req, res) => {
  const params = req.params;
  try {
    // check author
    const author = await prisma.author.findUnique({
      where: {
        username: params.author,
      },
    });

    if (!author) return res.status(400).json({ message: "Author not found" });

    const blog = await prisma.blog.findUnique({
      where: {
        slug_authorId: { slug: params.slug, authorId: author.id },
        status: "PUBLISHED",
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
      return res.status(404).json({ message: "Blog not found", data: {} });
    }

    return res
      .status(200)
      .json({ message: "Blog accessed successfully", data: blog });
  } catch (err) {
    console.error("Error fetching blog:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

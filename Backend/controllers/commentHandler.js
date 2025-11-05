import prisma from "../config/prisma.js";

// createComment
export const createComment = async (req, res) => {
  const { content } = req.body;
  const params = req.params;

  try {
    const [blog, author] = await Promise.all([
      prisma.blog.findUnique({
        where: { slug: params.slug },
      }),
      prisma.author.findUnique({
        where: {
          username: params.author,
        },
      }),
    ]);

    if (!blog) return res.status(400).json({ message: "Blog not found!" });

    if (!author) return res.status(400).json({ message: "Author not found!" });

    const comment = await prisma.comment.create({
      data: {
        content,
        authorId: author.id,
        userId: req.user.id,
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
        parentId: null, // Only fetch top-level comments
      },
      include: {
        _count: {
          select: {
            likes: true,
            replies: true,
          },
        },
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

// create comment replies
export const createCommentReply = async (req, res) => {
  const { slug, id } = req.params;
  const { content } = req.body;

  try {
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
  } catch (error) {
    console.error("Error fetching comments:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// delete reply
export const deleteComments = async (req, res) => {
  const { slug, id } = req.params;
  try {
    const [_blog, _comment] = await Promise.all([
      prisma.blog.findUnique({
        where: { slug },
      }),
      prisma.comment.findUnique({
        where: { id },
      }),
    ]);

    if (!_blog) return res.status(400).json({ message: "Blog not found!" });

    if (!_comment)
      return res.status(400).json({ message: "Comment not found!" });

    const comment = await prisma.comment.delete({
      where: { id },
    });

    return res
      .status(201)
      .json({ message: "Comment deleted successiflly", data: comment });
  } catch (error) {
    console.error("Error fetching comments:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

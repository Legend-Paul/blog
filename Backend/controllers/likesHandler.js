import prisma from "../config/prisma.js";

export const createBlogLike = async (req, res) => {
  const params = req.params;

  try {
    // find author
    const author = await prisma.author.findUnique({
      where: {
        username: params.author,
      },
    });
    if (!author) return res.status(400).json({ message: "Author not found!" });

    const blog = await prisma.blog.findUnique({
      where: {
        slug_authorId: {
          slug: params.slug,
          authorId: author.id,
        },
      },
    });
    if (!blog) return res.status(400).json({ message: "Blog not found!" });

    const like = await prisma.like.create({
      data: {
        blogId: blog.id,
        userId: req.user.id,
        authorId: author.id,
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
  const params = req.params;

  try {
    const [author, comment] = await Promise.all([
      prisma.author.findUnique({
        where: {
          username: params.author,
        },
      }),
      prisma.comment.findUnique({
        where: { id: params.id },
      }),
    ]);

    if (!comment)
      return res.status(400).json({ message: "Comment not found!" });

    if (!author) return res.status(400).json({ message: "Author not found!" });

    const blog = await prisma.blog.findUnique({
      where: {
        slug_authorId: {
          slug: params.slug,
          authorId: author.id,
        },
      },
    });
    if (!blog) return res.status(400).json({ message: "Blog not found!" });

    const like = await prisma.commentLike.create({
      data: {
        commentId: comment.id,
        userId: req.user.id,
        authorId: author.id,
      },
    });

    res.status(200).json({
      message: "Comment liked successifully",
      data: like,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const deleteBlogLike = async (req, res) => {
  const { id } = req.params;

  try {
    const like = await prisma.like.delete({
      where: { id },
    });
    return res
      .status(200)
      .json({ message: "Like deleted successifully", data: like });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const deleteCommentLike = async (req, res) => {
  const { id } = req.params;

  const like = await prisma.commentLike.delete({
    where: { id },
  });

  return res
    .status(200)
    .json({ message: "Like deleted successifully", data: like });
};

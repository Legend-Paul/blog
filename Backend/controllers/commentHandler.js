import prisma from "../config/prisma.js";

// createComment
export const createComment = async (req, res) => {
  const { content } = req.body;
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
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// get Blog Comments
export const getBlogComments = async (req, res) => {
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

    const comments = await getCommentsWithAllReplies(blog.id);
    return res
      .status(200)
      .json({ message: "Comments found successfully", data: comments });
  } catch (error) {
    console.error("Error fetching comments:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Helper function to recursively fetch replies
async function getCommentsWithAllReplies(blogId) {
  // First, fetch all comments for the blog
  const allComments = await prisma.comment.findMany({
    where: {
      blogId: blogId,
    },
    include: {
      _count: {
        select: {
          likes: true,
          replies: true,
        },
      },
      user: {
        select: {
          id: true,
          username: true,
          createdAt: true,
        },
      },
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  // Build a nested structure
  const commentMap = new Map();
  const rootComments = [];

  // First pass: create map of all comments
  allComments.forEach((comment) => {
    commentMap.set(comment.id, { ...comment, replies: [] });
  });

  // Second pass: build the tree structure
  allComments.forEach((comment) => {
    if (comment.parentId === null) {
      rootComments.push(commentMap.get(comment.id));
    } else {
      const parent = commentMap.get(comment.parentId);
      if (parent) {
        parent.replies.push(commentMap.get(comment.id));
      }
    }
  });

  // Sort root comments by createdAt desc
  rootComments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return rootComments;
}

// create comment replies
export const createCommentReply = async (req, res) => {
  const { content } = req.body;
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

    const comment = await prisma.comment.create({
      data: {
        content,
        authorId: author.id,
        userId: req.user.id,
        parentId: params.id,
        blogId: blog.id,
      },
    });

    return res
      .status(200)
      .json({ message: "Replied successfully", data: comment });
  } catch (error) {
    console.error("Error fetching comments:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// delete reply
export const deleteComments = async (req, res) => {
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

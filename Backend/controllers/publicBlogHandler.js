import prisma from "../config/prisma.js";

export const getPublicBlogs = async (req, res) => {
  const params = req.params;
  try {
    // check author
    const author = await prisma.author.findUnique({
      where: {
        username: params.author,
      },
    });

    if (!author) return res.status(400).json({ message: "Author not found" });

    const blogs = await prisma.blog.findMany({
      where: {
        authorId: author.id,
        status: "PUBLISHED",
      },
    });

    return res
      .status(200)
      .json({ message: "All blogs", data: { blogs, user: req.user } });
  } catch (err) {
    console.error("Error fetching blogs:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

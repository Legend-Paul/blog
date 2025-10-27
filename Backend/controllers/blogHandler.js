export const createBlog = (req, res) => {
    const { title, content, slug, status } = req.body;
    console.log(req.user);
};

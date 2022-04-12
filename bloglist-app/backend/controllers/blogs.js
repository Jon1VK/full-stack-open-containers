const { userExtractor } = require("../utils/middleware");
const blogRouter = require("express").Router();
const Blog = require("../models/blog");

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { blogs: 0 });
  response.json(blogs);
});

blogRouter.post("/", userExtractor, async (request, response) => {
  const body = request.body;
  const user = request.user;

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user,
  });

  const createdBlog = await blog.save();

  user.blogs.push(createdBlog.id);
  user.save();

  response.status(201).json(await createdBlog.populate("user", { blogs: 0 }));
});

blogRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id).populate("user", {
    blogs: 0,
  });

  if (blog) {
    response.json(blog);
  } else {
    response.status(404).end();
  }
});

blogRouter.delete("/:id", userExtractor, async (request, response) => {
  const blog = await Blog.findById(request.params.id);

  if (!blog) {
    response.status(204).end();
  } else if (blog.user.toString() === request.user.id) {
    await blog.remove();
    response.status(204).end();
  } else {
    response.status(401).json({ error: "Unauthorized operation" });
  }
});

blogRouter.put("/:id", async (request, response) => {
  const update = { likes: request.body.likes };
  const blog = await Blog.findByIdAndUpdate(request.params.id, update, {
    new: true,
    runValidators: true,
    context: "query",
  });

  if (blog) {
    response.json(await blog.populate("user", { blogs: 0 }));
  } else {
    response.status(404).end();
  }
});

blogRouter.post("/:id/comments", async (request, response) => {
  const comment = request.body.comment;
  if (!comment) {
    return response.status(422).json({ error: "comment can't be empty" });
  }

  const blog = await Blog.findById(request.params.id);
  if (!blog) return response.status(404).end();

  blog.comments.push(comment);
  const createdBlog = await blog.save();
  response.status(201).json(await createdBlog.populate("user", { blogs: 0 }));
});

module.exports = blogRouter;

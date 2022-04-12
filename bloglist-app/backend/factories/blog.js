const { faker } = require("@faker-js/faker");
const Blog = require("../models/blog");

const buildBlogObj = (params = {}) => ({
  title: params.title ?? faker.lorem.words(),
  author: params.author ?? faker.name.findName(),
  url: params.url ?? faker.internet.url(),
  likes: params.likes ?? faker.datatype.number(100),
  comments: params.comments ?? [...Array(3)].map(() => faker.lorem.sentence()),
});

const createBlog = async (params) => {
  const blogObj = { ...buildBlogObj(params), user: params.user };
  const blog = new Blog(blogObj);
  const user = params.user;
  user.blogs.push(blog);
  await user.save();
  return await blog.save();
};

const blogFactory = { buildObj: buildBlogObj, create: createBlog };

module.exports = blogFactory;

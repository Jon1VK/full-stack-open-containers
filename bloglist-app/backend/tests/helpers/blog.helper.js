const { faker } = require("@faker-js/faker");
const Blog = require("../../models/blog");

const getAllFromDb = async () => await Blog.find({});

const getFromDb = async (id) => await Blog.findById(id);

const getRandomFromDb = async () => {
  const blogs = await getAllFromDb();
  return faker.random.arrayElement(blogs);
};

const validId = async () => {
  const blogs = await getAllFromDb();
  return faker.random.arrayElement(blogs).id;
};

const blogHelper = {
  getAllFromDb,
  getFromDb,
  getRandomFromDb,
  validId,
};

module.exports = blogHelper;

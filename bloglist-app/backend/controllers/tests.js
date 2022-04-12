const testRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const userFactory = require("../factories/user");

testRouter.post("/reset", async (request, response) => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  userFactory.create({
    username: "admin",
    password: "admin",
    name: "Admin",
  });

  response.status(204).end();
});

module.exports = testRouter;

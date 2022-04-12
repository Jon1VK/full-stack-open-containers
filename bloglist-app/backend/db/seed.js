const { faker } = require("@faker-js/faker");
const User = require("../models/user");
const Blog = require("../models/blog");
const userFactory = require("../factories/user");
const blogFactory = require("../factories/blog");

const seedDb = async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  await userFactory.create({
    username: "admin",
    password: "admin",
    name: "Admin",
  });

  for (let i = 0; i < 5; i++) {
    const user = await userFactory.create();

    for (let j = 0; j < faker.datatype.number({ min: 1, max: 4 }); j++) {
      await blogFactory.create({ user: user });
    }
  }
};

module.exports = seedDb;

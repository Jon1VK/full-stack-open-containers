const { faker } = require("@faker-js/faker");
const User = require("../../models/user");

const getAllFromDb = async () => await User.find({});

const getRandomFromDb = async () => {
  const users = await getAllFromDb();
  return faker.random.arrayElement(users);
};

const userHelper = {
  getAllFromDb,
  getRandomFromDb,
};

module.exports = userHelper;

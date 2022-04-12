const { faker } = require("@faker-js/faker");
const User = require("../models/user");

const buildUserObj = (params = {}) => ({
  username: params.username ?? faker.unique(faker.internet.userName),
  password: params.password ?? faker.internet.password(),
  name: params.name ?? faker.name.findName(),
});

const createUser = async (params) => {
  const user = new User(buildUserObj(params));
  return await user.save();
};

const userFactory = {
  buildObj: buildUserObj,
  create: createUser,
};

module.exports = userFactory;

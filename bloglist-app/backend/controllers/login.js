const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("../utils/config");
const loginRouter = require("express").Router();
const User = require("../models/user");

loginRouter.post("/", async (request, response) => {
  const { username, password } = request.body;
  const user = await User.findOne({ username });
  const passwordIsCorrect =
    user && (await bcrypt.compare(password, user.passwordHash));

  if (!passwordIsCorrect) {
    return response.status(401).json({
      error: "invalid username or password",
    });
  }

  const token = jwt.sign({ id: user.id }, config.SECRET);
  response
    .status(200)
    .json({ token, id: user.id, username: user.username, name: user.name });
});

module.exports = loginRouter;

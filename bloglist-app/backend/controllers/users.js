const userRouter = require("express").Router();
const User = require("../models/user");

userRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", { user: 0, likes: 0 });
  response.json(users);
});

userRouter.post("/", async (request, response) => {
  const body = request.body;

  const userInDb = await User.findOne({ username: body.username });
  if (userInDb) {
    return response.status("400").json({ error: "username is already taken" });
  }

  const user = new User({
    username: body.username,
    password: body.password,
    name: body.name,
  });

  const createdUser = await user.save();
  response.status(201).json(createdUser);
});

userRouter.get("/:id", async (request, response) => {
  const user = await User.findById(request.params.id).populate("blogs", {
    user: 0,
    likes: 0,
  });
  if (user) {
    response.json(user);
  } else {
    response.status(404).end();
  }
});

module.exports = userRouter;

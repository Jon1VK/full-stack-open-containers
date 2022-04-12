const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const SALT_ROUNDS = 10;

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    minLength: 3,
    unique: true,
  },
  passwordHash: String,
  name: {
    type: String,
    required: true,
  },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
    },
  ],
});

userSchema.virtual("password").set(function setPassword(password) {
  if (!password || password.length < 3) {
    this.invalidate(
      "password",
      "Password has to be at least 3 characters long"
    );
    return;
  }

  this.passwordHash = bcrypt.hashSync(password, SALT_ROUNDS);
});

userSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    delete ret.passwordHash;
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;

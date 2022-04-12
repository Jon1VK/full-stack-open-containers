require("dotenv").config();

const PORT = process.env.PORT;
const SECRET = process.env.SECRET;
const MONGODB_URI =
  process.env.NODE_ENV === "production"
    ? process.env.MONGODB_URI
    : process.env.TEST_MONGODB_URI;

const config = {
  PORT,
  SECRET,
  MONGODB_URI,
};

module.exports = config;

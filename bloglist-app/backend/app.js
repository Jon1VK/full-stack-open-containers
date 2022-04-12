const config = require("./utils/config");
require("express-async-errors");
const express = require("express");
const app = express();
const cors = require("cors");
const userRouter = require("./controllers/users");
const blogRouter = require("./controllers/blogs");
const loginRouter = require("./controllers/login");
const middleware = require("./utils/middleware");
const logger = require("./utils/logger");
const mongoose = require("mongoose");
const seedDb = require("./db/seed");

logger.info("connecting to MongoDB");

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    seedDb();
    setInterval(seedDb, 86400000);
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB:", error.message);
  });

app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use(middleware.tokenExtractor);
app.use("/api/users", userRouter);
app.use("/api/blogs", blogRouter);
app.use("/api/login", loginRouter);

if (process.env.NODE_ENV === "test") {
  const testRouter = require("./controllers/tests");
  app.use("/api/tests", testRouter);
}

app.use(middleware.errorHandler);

module.exports = app;

const jwt = require("jsonwebtoken");
const User = require("../models/user");
const config = require("./config");
const logger = require("./logger");

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === "CastError" || error.name === "ValidationError") {
    return response.status(400).send({ error: error.message });
  }

  if (error.name === "JsonWebTokenError") {
    return response.status(401).send({ error: error.message });
  }

  next(error);
};

const tokenExtractor = (request, response, next) => {
  const authorization = request.get("Authorization");

  if (authorization && authorization.toLowerCase().startsWith("bearer")) {
    const token = authorization.substring(7);
    request.token = token;
  }

  next();
};

const userExtractor = async (request, response, next) => {
  if (request.token) {
    const userFromToken = jwt.verify(request.token, config.SECRET);
    request.user = await User.findById(userFromToken.id);
  } else {
    return response.status(401).json({ error: "Unauthorized" });
  }

  next();
};

module.exports = { errorHandler, tokenExtractor, userExtractor };

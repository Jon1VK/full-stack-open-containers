const redis = require("../redis");
const express = require("express");
const router = express.Router();

/* GET statistics data. */
router.get("/", async (req, res) => {
  const addedTodos = +(await redis.getAsync("added_todos"));
  res.send({
    added_todos: addedTodos || 0,
  });
});

module.exports = router;

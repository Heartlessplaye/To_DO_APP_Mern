const express = require("express");
const router = express.Router();
const {
  getTodos,
  setTodo,
  updateTodo,
  deleteTodo,
} = require("../controller/todosController");

const { ProtectUser } = require("../middleware/authMiddleware");
router.route("/").get(ProtectUser, getTodos).post(ProtectUser, setTodo);
router.route("/:id").put(ProtectUser, updateTodo).delete(ProtectUser, deleteTodo);

module.exports = router;

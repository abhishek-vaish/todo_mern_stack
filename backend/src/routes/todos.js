const express = require("express");
const router = express.Router();
const {
  addTodo,
  getTodoById,
  deleteTodo,
  updateTodo,
  searchTodo,
  getTodo,
} = require("../controllers/todos");
const { getUserById, isAuthenticated } = require("../controllers/user");

// param
router.param("todoId", getTodoById);
router.param("userId", getUserById);

router.post("/addReminder/:userId", isAuthenticated, addTodo);
router.delete("/deleteReminder/:todoId/:userId", isAuthenticated, deleteTodo);
router.put("/updateReminder/:todoId/:userId", isAuthenticated, updateTodo);
router.get("/searchReminder", searchTodo);

module.exports = router;

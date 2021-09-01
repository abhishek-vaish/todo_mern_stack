const TodosList = require("../models/todos");
const { updateTodoList, deleteTodoList } = require("./helper");

// get reminder from the todoList using id
exports.getTodoById = async (req, res, next, id) => {
  await TodosList.findById(id).exec((err, todo) => {
    if (err) {
      return res.status(400).json({
        error: "Something went wrong while fetching data.",
      });
    }
    req.todo = todo;
    next();
  });
};

// create new reminder into todoList
exports.addTodo = async (req, res) => {
  const reminder = new TodosList(req.body);
  const currentUser = req.user;
  await reminder.save((err, todo) => {
    if (err) {
      console.log(err);

      return res.status(400).json({
        error: "Something went wrong while saving data.",
      });
    }
    // save the todo id into the todoList of the user database.
    updateTodoList(currentUser._id, todo);

    res.json({
      message: "Successfully added",
      data: todo,
    });
  });
};

// delete the reminder from the database using id
exports.deleteTodo = (req, res) => {
  const currentUser = req.user;
  TodosList.findOneAndDelete({ _id: req.todo._id }, (err, todo) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        error: "Something went wrong",
      });
    }
    // delete the todo id into the todoList of the user database.
    deleteTodoList(currentUser._id, todo._id);

    res.json({
      message: "Successfully deleted",
    });
  });
};

// update the reminder using the id
exports.updateTodo = async (req, res) => {
  await TodosList.findByIdAndUpdate(
    { _id: req.todo._id },
    { $set: req.body },
    (err) => {
      if (err) {
        return res.status(400).json({
          error: "Something went wrong.",
        });
      }
      res.json({
        message: "Successfuly update a reminder",
      });
    }
  );
};

// search the reminder with the help of title
exports.searchTodo = async (req, res) => {
  await TodosList.find({ title: req.body.title }, (err, todo) => {
    if (err) {
      return res.status(400).json({
        error: "Something went wrong while searching",
      });
    }

    res.json({ todo });
  });
};

const bcrypt = require("bcryptjs");
const UserSchema = require("../models/user");

exports.hashPassword = async (password) => {
  const hashPassword = await bcrypt.hash(password, 10);
  return hashPassword;
};

exports.verifyHashPassword = async (password, hashPassword) => {
  await bcrypt.compare(password, hashPassword, (err, result) => {
    if (err) {
      return false;
    }
    return result;
  });
};

exports.updateTodoList = (userId, todo) => {
  console.log(todo);
  UserSchema.findByIdAndUpdate(
    { _id: userId },
    { $push: { todos_id: [todo] } },
    (err) => {
      if (err) {
        return res.status(400).json({
          error: "Something went wrong while updating the list.",
        });
      }
    }
  );
};

exports.deleteTodoList = (userId, todoId) => {
  UserSchema.findByIdAndUpdate(
    { _id: userId },
    { $pullAll: { todos_id: [todoId] } },
    (err) => {
      if (err) {
        return res.status(400).json({
          error: "Something went wrong while updating the list.",
        });
      }
    }
  );
};

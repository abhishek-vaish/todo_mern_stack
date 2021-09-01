const mongoose = require("mongoose");

const TodosList = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
  },
  reminderDate: {
    type: Date,
    required: true,
  },
  addUser: [
    {
      type: String,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("TodosList", TodosList);

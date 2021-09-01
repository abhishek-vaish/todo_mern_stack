const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      trime: true,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    todos_id: [{
      type: mongoose.Schema.ObjectId,
      ref: "TodosList"
    }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserSchema", UserSchema);

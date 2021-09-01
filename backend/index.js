const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

const todoRouter = require("./routes/todos");
const userRouter = require("./routes/user");

const app = express();

// Middlewares
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.get("/", (req, res) => {
  res.json({
    message: "Success",
  });
});

// Database Connection
try {
  mongoose.connect(
    process.env.MONGODB_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: true,
    },
    () => {
      console.log("Database connected successfully!!");
    }
  );
} catch (error) {
  console.log("Something went wrong while connecting to database!!");
}

// Routes
app.use("/api", todoRouter);
app.use("/api", userRouter);

// Server Connection
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("Server running on a port:- 8080");
});

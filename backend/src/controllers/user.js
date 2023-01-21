const UserSchema = require("../models/user");
const { hashPassword, verifyHashPassword } = require("./helper");
const jwt = require("jsonwebtoken");

// get the user by id [param]
exports.getUserById = (req, res, next, id) => {
  UserSchema.findById(id, (err, user) => {
    if (err) {
      return res.status(400).json({
        error: "Something went wrong while fetching user id.",
      });
    }

    req.user = user;
    next();
  });
};

// get user
exports.getUser = async (req, res) => {
  const user = req.user;
  await UserSchema.findById(user._id)
    .populate("todos_id")
    .exec((err, user) => {
      if (err) {
        return res.json({
          error: "User not found",
        });
      }
      res.json({
        _id: user._id,
        todos_id: user.todos_id,
        firstName: user.firstName,
        lastName: user.lastName,
      });
    });
};

// create new user
exports.createUser = async (req, res) => {
  const newUser = new UserSchema(req.body);
  const plainPassword = newUser.password;

  if (!plainPassword || !newUser.email || !newUser.firstName) {
    return res.status(400).json({
      error: "Please enter the required fields.",
    });
  }

  // hash password and save it inside the response we get from the body
  newUser.password = await hashPassword(plainPassword);

  await newUser.save((err, user) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        err: "Something went wrong while creating user.",
      });
    }

    // put user token to the cookie so that it can be login immediately
    const payload = {
      _id: user._id,
      email: user.email,
    };
    const token = jwt.sign(payload, process.env.SECRET);

    res.cookie("validationToken", token, { expire: Date.now() + 1 });

    res.json({
      message: "Successfully created",
      token: token,
    });
  });
};

exports.signIn = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({
      error: "Please enter your email/password.",
    });
  }

  UserSchema.findOne({ email: email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User doesnot exit",
      });
    }

    if (verifyHashPassword(password, user.password)) {
      const payload = {
        _id: user._id,
        email: user.email,
        firstName: user.firstName,
      };
      const token = jwt.sign(payload, process.env.SECRET);

      res.cookie("validationToken", token, { expire: Date.now() + 1 });

      return res.status(200).json({
        message: "Successfully login",
        token: token,
      });
    }

    res.status(400).json({
      error: "Something went wrong while login the user.",
    });
  });
};

exports.signOut = (req, res) => {
  res.clearCookie("validationToken");
  res.status(200).json({
    message: "Successfully signout",
  });
};

exports.isAuthenticated = (req, res, next) => {
  // get the token from the cookie
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTIzZDdmZmVmOThlOTAzNjQ4ZmY1NWYiLCJlbWFpbCI6ImFiaGlzaGVrdmFpc2hAZ21haWwuY29tIiwiZmlyc3ROYW1lIjoiQWJoaXNoZWsiLCJpYXQiOjE2Mjk5ODQ4NzZ9.-YJA3wF0Sdid9Gt-o1Y29xdPmEul6AonBNqWByX0X54";

  // verify the token
  jwt.verify(token, process.env.SECRET, (err, decodedToken) => {
    if (err) {
      return res.status(400).json({
        error: "Something went wrong while authenticating the user.",
      });
    }
    // user id is of type object and decodedToken id is of type string. so we perform lossy comparison to just check the value
    if (req.user._id != decodedToken._id) {
      return res.status(400).json({
        error: "Failed to authenticate a user.",
      });
    }

    next();
  });
};

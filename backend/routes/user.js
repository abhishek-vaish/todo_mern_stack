const express = require("express");
const router = express.Router();

const {
  getUserById,
  createUser,
  signIn,
  signOut,
  getUser,
  isAuthenticated,
} = require("../controllers/user");

// params
router.param("userId", getUserById);

// routes
router.post("/register", createUser);
router.post("/signin", signIn);
router.get("/signout", signOut);
router.get("/getUser/:userId", getUser);
module.exports = router;

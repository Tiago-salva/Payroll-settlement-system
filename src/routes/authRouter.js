const { Router } = require("express");
const {
  createUserGet,
  createUserPost,
  loginUserGet,
  loginUserPost,
  logoutUser,
} = require("../controllers/authController");
const authRouter = new Router();

// Signup
authRouter.get("/signup", createUserGet);
authRouter.post("/signup", createUserPost);

// Login
authRouter.get("/login", loginUserGet);
authRouter.post("/login", loginUserPost);

// Logout
authRouter.post("/logout", logoutUser);

module.exports = authRouter;

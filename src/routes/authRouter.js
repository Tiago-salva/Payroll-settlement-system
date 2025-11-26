const passport = require("passport");
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

authRouter.get(
  "/p",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json(req.user);
  }
);

// Logout
// authRouter.get("/logout", logoutUser);

module.exports = authRouter;

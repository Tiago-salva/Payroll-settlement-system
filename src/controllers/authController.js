const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const { addUser } = require("../models/userModel");

async function createUserGet(req, res) {
  res.render("signup");
}

async function createUserPost(req, res) {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const newUser = await addUser(req.body, hashedPassword);
  res.redirect("/");
}

async function loginUserGet(req, res) {
  res.render("login");
}

async function loginUserPost(req, res, next) {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user)
      return res.status(401).json({ message: "Invalid email or password" });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({
      message: "Login successful",
      token: token,
      user: { id: user.id, email: user.email, role: user.role },
    });
  })(req, res, next);
}

// function logoutUser(req, res, next) {
//   req.logout(function (err) {
//     if (err) {
//       return next(err);
//     }
//     res.redirect("/login");
//   });
// }

module.exports = {
  createUserGet,
  createUserPost,
  loginUserGet,
  loginUserPost,
  //   logoutUser,
};

require("dotenv").config();

const path = require("node:path");
const express = require("express");
const passport = require("passport");

// Import custom config
const initializePassport = require("./config/passport-config");

// Import routers
const authRouter = require("./src/routes/authRouter");
const employeesRouter = require("./src/routes/employeesRouter");
const payrollRouter = require("./src/routes/payrollRouter");

// App
const app = express();

// App config
app.set("views", path.join(__dirname, "src", "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(express.static(__dirname));

// Passport
initializePassport(passport);

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

// Routes
app.get("/", (req, res) => {
  res.render("home");
});

app.use("/auth", authRouter);
app.use("/employees", employeesRouter);
app.use("/payroll", payrollRouter);

app.listen(process.env.PORT, () =>
  console.log(`App running on port ${process.env.PORT}`)
);
